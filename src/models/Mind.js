import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import Cube from './Cube'

const xs = [-2, -1, 0, 1, 2]
const ys = [-2, -1, 0, 1, 2]
const zs = [-2, -1, 0, 1, 2]
const spots = xs.flatMap((x) => ys.flatMap((y) => zs.map((z) => [x, y, z])))

function swapRandom(list) {
  const a = Math.floor(Math.random() * list.length)
  const b = Math.floor(Math.random() * list.length)

  const t = list[a]
  list[a] = list[b]
  list[b] = t
}

export default function Model(props) {
  const group = useRef()

  useFrame((_, delta) => {
    // console.log(clock);
    group.current.rotation.x = group.current.rotation.y += 0.003
    group.current.rotation.z += Math.sin(delta) * 0.01
  })

  const [cubes, setCubes] = useState(spots)

  useEffect(() => {
    const i = setInterval(() => {
      const cubesP = cubes.slice()
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)
      swapRandom(cubesP)

      setCubes(cubesP)
    }, 100)
    return () => clearInterval(i)
  }, [setCubes, cubes])

  return (
    <group ref={group} {...props} dispose={null}>
      {cubes.map((c, i) => (
        <Cube position={c} key={i} />
      ))}
    </group>
  )
}
