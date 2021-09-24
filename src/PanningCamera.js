import { PerspectiveCamera } from '@react-three/drei'
import { atom } from 'jotai'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { keycode, mouseButton, useButtonHeld } from 'use-control/lib'
import KEYS from './useInput/keys'
import { useProjectedMousePosition } from './input/useProjectedMousePosition'

export const target = atom([0, 0, 5])
const offset = new Vector3(0, -0.15, 0)
const speed = 0.07
const maxSpeed = 5

function clamp(val, min, max) {
  return Math.max(Math.min(val, max), min)
}

const inputMap = {
  buttons: {
    left: [keycode(KEYS.a), keycode(KEYS.left_arrow)],
    right: [keycode(KEYS.d), keycode(KEYS.right_arrow)],
    up: [keycode(KEYS.w), keycode(KEYS.up_arrow)],
    down: [keycode(KEYS.s), keycode(KEYS.down_arrow)],
    go: [mouseButton('left')],
  },
}

function PanningCamera(props) {
  const camera = useRef()

  const { projected } = useProjectedMousePosition(0)

  useButtonHeld(inputMap, 'left', 16, () => {
    camera.current.position.x -= speed * 2
  })

  useButtonHeld(inputMap, 'right', 16, () => {
    camera.current.position.x += speed * 2
  })

  useButtonHeld(inputMap, 'up', 16, () => {
    camera.current.position.y += speed * 2
  })

  useButtonHeld(inputMap, 'down', 16, () => {
    camera.current.position.y -= speed * 2
  })

  useButtonHeld(inputMap, 'go', 1000 / 60, () => {
    const gap = projected.current.sub(camera.current.position.add(offset))
    camera.current.position.x += clamp(gap.x * speed, -maxSpeed, maxSpeed)
    camera.current.position.y += clamp(gap.y * speed, -maxSpeed, maxSpeed)
  })

  return (
    // <group ref={group}>
    <PerspectiveCamera
      ref={camera}
      makeDefault
      position={[0, 0, 5]}
      rotation={[0.3, 0, 0]}
      fov={70}
      far={1000}
      near={0.1}
    />
    // </group>
  )
}

export default PanningCamera
