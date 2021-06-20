import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { atom } from 'jotai'
import { useRef } from 'react'
import { Vector3 } from 'three'
import KEYS from './useInput/keys'
import MOUSE from './useInput/mouse'
import { useInput } from './useInput/useInput'
import { useMousePosition } from './useInput/useMousePosition'

export const target = atom([0, 0, 5])
const offset = new Vector3(0, -0.15, 0)
const speed = 0.07
const maxSpeed = 5

function clamp(val, min, max) {
  return Math.max(Math.min(val, max), min)
}

function PanningCamera(props) {
  const camera = useRef()

  const { projected } = useMousePosition(0)

  const { left, right, up, down, go } = useInput({
    left: [KEYS.a, KEYS.left_arrow],
    right: [KEYS.d, KEYS.right_arrow],
    up: [KEYS.w, KEYS.up_arrow],
    down: [KEYS.s, KEYS.down_arrow],
    go: [MOUSE.LMB],
  })

  useFrame((_, delta) => {
    // group.current.position.addScaledVector(gap, props.speed)

    if (left.held) {
      camera.current.position.x -= speed * 2
    }
    if (right.held) {
      camera.current.position.x += speed * 2
    }
    if (down.held) {
      camera.current.position.y -= speed * 2
    }
    if (up.held) {
      camera.current.position.y += speed * 2
    }

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
      fov={50}
      far={1000}
      near={0.1}
    />
    // </group>
  )
}

export default PanningCamera
