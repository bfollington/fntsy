import * as React from 'react'
import { useCallback, useEffect } from 'react'

export const TICK = 16

type Mapping = {
  [action: string]: number[]
}

type MappingT = {
  [keyCode: number]: string[]
}

type InputCallbackMap<M extends Mapping> = {
  [Property in keyof Partial<M>]: {
    onPressed: () => void
    onReleased: () => void
  }
}

function tryGet<U, V extends { [k: string]: U }>(data: V, key: keyof V, def: U) {
  if (data[key]) {
    return data[key]
  } else {
    ;(data as any)[key] = def
    return data[key]
  }
}
function transposeMapping(mapping: Mapping): MappingT {
  const t: any = {}
  for (let action in mapping) {
    const keyCodes = mapping[action]
    keyCodes.forEach((k) => tryGet(t, k, []).push(action))
  }
  return t
}
type InputState = {
  pressed: boolean
  released: boolean
  held: boolean
}
type InputMapState<T> = {
  [Property in keyof T]: InputState
}
function createInputMap<M extends Mapping>(mapping: M) {
  const keys = Object.keys(mapping)
  const map = {} as any

  for (const k of keys) {
    map[k] = { pressed: false, released: false, held: false }
  }

  return map as InputMapState<M>
}
type InputAction<M extends Mapping> =
  | { type: 'pressed'; action: keyof M }
  | { type: 'released'; action: keyof M }
  | { type: 'released-timeout'; action: keyof M }
  | { type: 'pressed-timeout'; action: keyof M }
function inputReducer<M extends Mapping>(
  state: InputMapState<M>,
  action: InputAction<M>
) {
  switch (action.type) {
    case 'pressed':
      return {
        ...state,
        [action.action]: { pressed: true, released: false, held: true },
      }
    case 'released':
      return {
        ...state,
        [action.action]: { released: true, pressed: false, held: false },
      }
    case 'released-timeout':
      return {
        ...state,
        [action.action]: { ...state[action.action], released: false },
      }
    case 'pressed-timeout':
      return {
        ...state,
        [action.action]: { ...state[action.action], pressed: false },
      }
  }
}
export function useInput<M extends Mapping>(mapping: M, callbacks?: InputCallbackMap<M>) {
  callbacks = callbacks || ({} as any)
  const mappingT = React.useMemo(() => transposeMapping(mapping), [mapping])

  const [state, dispatch] = React.useReducer(
    inputReducer,
    React.useMemo(() => createInputMap(mapping), [mapping])
  )

  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (mappingT[ev.keyCode] && !ev.repeat) {
        mappingT[ev.keyCode].forEach((a) => {
          dispatch({ type: 'pressed', action: a })
          setTimeout(() => {
            dispatch({ type: 'pressed-timeout', action: a })
          }, TICK)
          if (callbacks && callbacks[a]?.onPressed) {
            callbacks[a].onPressed()
          }
        })
      }
    },
    [dispatch, mappingT, callbacks]
  )
  const onKeyUp = useCallback(
    (ev: KeyboardEvent) => {
      if (mappingT[ev.keyCode] && !ev.repeat) {
        mappingT[ev.keyCode].forEach((a) => {
          dispatch({ type: 'released', action: a })
          setTimeout(() => {
            dispatch({ type: 'released-timeout', action: a })
          }, TICK)

          if (callbacks && callbacks[a]?.onReleased) {
            callbacks[a].onReleased()
          }
        })
      }
    },
    [dispatch, mappingT, callbacks]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [onKeyDown, onKeyUp])

  return state
}
