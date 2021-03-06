/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import Crystal from './Crystal'

export default function Model(props) {
  const group = useRef()

  const r = props.radius || 128
  const nodes = 12
  const spacing = (2 * Math.PI) / nodes
  const indices = [...Array(nodes).keys()]

  const speed = props.speed || 0.01

  useFrame(({ delta, clock }) => {
    const g = group.current

    g.rotation.x += speed
    g.rotation.y += speed
    // g.rotation.z -= 0.01;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {indices.map((i) => {
        return (
          <Crystal
            key={i}
            offset={i * spacing}
            scale={[0.35, 0.35, 0.35]}
            position={[r * Math.sin(i * spacing), r * Math.cos(i * spacing), 0]}
            color={props.color}
          />
        )
      })}
    </group>
  )
}
