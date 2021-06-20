import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Vector3 } from 'three'
import { useMousePosition } from './useInput/useMousePosition'
import DebugText from './DebugText'
import { Icosahedron } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const obj = useRef()

  const { projected } = useMousePosition(-10)

  useFrame((_, delta) => {
    const gap = new Vector3()
      .copy(projected.current)
      .setZ(group.current.position.z)
      .sub(group.current.position)
    group.current.position.addScaledVector(gap, props.speed)

    obj.current.rotation.x = obj.current.rotation.y += 0.008
    obj.current.rotation.z += Math.sin(delta) * 0.03
  })

  return (
    <group {...props} ref={group} dispose={null}>
      <Icosahedron ref={obj} castShadow receiveShadow>
        <meshPhongMaterial attach="material" color={props.color} />
      </Icosahedron>
      <DebugText position={[1, -1, 0]} value={`(ben)`} />
    </group>
  )
}
