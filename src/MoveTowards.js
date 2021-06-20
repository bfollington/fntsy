import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Vector3 } from 'three'
import { useMousePosition } from './useInput/useMousePosition'
import DebugText from './DebugText'
import { printv3 } from './v3'

export default function Model(props) {
  const group = useRef()
  const text = useRef()

  const { projected } = useMousePosition(-10)

  useFrame(() => {
    const gap = new Vector3().copy(projected.current).sub(group.current.position)

    group.current.position.addScaledVector(gap, props.speed)
    text.current.text = `${printv3(group.current.position)}`
  })

  return (
    <group ref={group} dispose={null}>
      <mesh castShadow receiveShadow>
        <sphereBufferGeometry args={[0.3, 1, 5]} />
        <meshLambertMaterial color={props.color} />
      </mesh>
      <DebugText ref={text} position={[0.5, -0.5, 0]} value={`hi`} />
    </group>
  )
}
