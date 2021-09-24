import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { atom } from 'jotai'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { mouseButton, useButtonHeld, keycode } from 'use-control/lib'
import { useProjectedMousePosition } from './input/useProjectedMousePosition'
import KEYS from './useInput/keys'
import MOUSE from './useInput/mouse'
import { useInput } from './useInput/useInput'

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

  const { go } = useInput({
    go: [MOUSE.LMB],
  })

  useButtonHeld(inputMap, 'left', 1000 / 60, () => {
    camera.current.position.x -= speed * 2
  })
  useButtonHeld(inputMap, 'right', 1000 / 60, () => {
    camera.current.position.x += speed * 2
  })
  useButtonHeld(inputMap, 'down', 1000 / 60, () => {
    camera.current.position.y -= speed * 2
  })
  useButtonHeld(inputMap, 'up', 1000 / 60, () => {
    camera.current.position.y += speed * 2
  })

  useFrame((_, delta) => {
    // group.current.position.addScaledVector(gap, props.speed)

    // TODO(ben): there's a bug with mixing useFrame and my polling loops for use-control
    if (go.held) {
      const gap = projected.current.sub(camera.current.position.add(offset))
      camera.current.position.x += clamp(gap.x * speed, -maxSpeed, maxSpeed)
      camera.current.position.y += clamp(gap.y * speed, -maxSpeed, maxSpeed)
    }
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
