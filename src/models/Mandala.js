import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import Geo from './Geo'

export default function Model(props) {
  const group = useRef()

  useFrame(({ clock }, delta) => {
    const g = group.current

    g.rotation.x = 0.1 * Math.sin(clock.elapsedTime * 0.5)
    g.rotation.y = 0.1 * Math.cos(clock.elapsedTime * 0.5)
    // g.rotation.z = 0.1 * Math.cos(clock.elapsedTime * 0.5);
    // g.scale.x = 0.1 * Math.sin(clock.elapsedTime * 0.5);
    // g.scale.y = 0.1 * Math.sin(clock.elapsedTime * 0.5);
    // g.scale.z = 0.1 * Math.cos(clock.elapsedTime * 0.5);
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Geo position={[0, 0, 0]} />
    </group>
  )
}
