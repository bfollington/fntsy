import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { useMouseMove } from 'use-control/lib/input/mouse'
import { DIMENSIONS } from '../const'

export function useProjectedMousePosition(targetZ: number) {
  const { camera } = useThree()

  const mousePos = useRef(new Vector3(0, 0, 0))
  const vec = useRef(new Vector3(0, 0, 0))
  const projectedPos = useRef(new Vector3(0, 0, 0))

  useMouseMove(([x, y]) => {
    mousePos.current.set(
      (x / DIMENSIONS.width) * 2 - 1,
      -(y / DIMENSIONS.height) * 2 + 1,
      0.5
    )
    console.log(mousePos.current)
  }, 16)

  useFrame(() => {
    vec.current.copy(mousePos.current)
    vec.current.unproject(camera)
    vec.current.sub(camera.position).normalize()

    var distance = (targetZ - camera.position.z) / vec.current.z

    // Note: we want to avoid new-ing here if we can
    projectedPos.current = new Vector3()
      .copy(camera.position)
      .add(vec.current.multiplyScalar(distance))
  })

  return { mouse: mousePos, projected: projectedPos }
}
