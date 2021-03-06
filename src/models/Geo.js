/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { MeshDistortMaterial, useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/geo.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus_Knot_2.geometry}
        position={[309.71, 2, -194]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
      >
        <MeshDistortMaterial
          attach="material"
          color="#334455"
          speed={1}
          distort={0.8}
          radius={0.5}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus_Knot_3.geometry}
        position={[315.81, 0.02, 299.99]}
        rotation={[-Math.PI, 0, -Math.PI]}
      >
        <MeshDistortMaterial
          attach="material"
          color="#ffffdd"
          speed={1}
          distort={0.8}
          radius={0.1}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus_Knot.geometry}
        position={[309.71, 0, 148.99]}
        rotation={[-Math.PI, 0, -Math.PI]}
      >
        <MeshDistortMaterial
          attach="material"
          color="#779988"
          speed={1}
          distort={0.4}
          radius={0.5}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Helix.geometry}
        position={[318.41, 1.8, 90.92]}
        rotation={[-0.31, -0.29, 0.74]}
        scale={[1, 1, 1]}
      >
        <MeshDistortMaterial
          attach="material"
          color="#6c4824"
          speed={1}
          distort={0.4}
          radius={0.5}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/geo.gltf')
