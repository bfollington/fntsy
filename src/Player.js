import { Icosahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import DebugText from './DebugText'
import { useProjectedMousePosition } from './input/useProjectedMousePosition'
import { chan } from './multiplayer'

export default function Model(props) {
  const group = useRef()
  const obj = useRef()

  const { projected } = useProjectedMousePosition(-10)

  useFrame((_, delta) => {
    const gap = new Vector3()
      .copy(projected.current)
      .setZ(group.current.position.z)
      .sub(group.current.position)
    group.current.position.addScaledVector(gap, props.speed)

    obj.current.rotation.x = obj.current.rotation.y += 0.008
    obj.current.rotation.z += Math.sin(delta) * 0.03
  })

  useEffect(() => {
    const t = setInterval(() => {
      // TODO: any amount of useful error checking
      chan.emit('chat message', JSON.stringify({ position: group.current.position }))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <group {...props} ref={group} dispose={null}>
      <Icosahedron ref={obj} castShadow receiveShadow>
        <meshPhongMaterial attach="material" color={props.color} />
      </Icosahedron>
      <DebugText position={[1, -1, 0]} value={`(ben)`} />
    </group>
  )
}
