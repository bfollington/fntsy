import { animated, useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Vector3 } from 'three'
import { useMousePosition } from './useInput/useMousePosition'

export default function Model(props) {
  const group = useRef()

  const [styles, api] = useSpring(() => ({
    from: { position: new Vector3(0, 0, 0) },
    config: {
      damping: 10,
      tensions: 0.0001,
      clamp: false,
    },
  }))

  const { projected } = useMousePosition(-10)

  useFrame(() => {
    api.start({
      position: projected.current,
    })

    // text.current.text = `0x0000`
  })

  return (
    <animated.group {...styles} ref={group} dispose={null}>
      {/* <mesh castShadow receiveShadow>
        <sphereBufferGeometry args={[0.3, 1, 5]} />
        <meshLambertMaterial color={'magenta'} />
      </mesh> */}
      {/* <DebugText ref={text} position={[1, -1, 0]} value={`hi`} /> */}
    </animated.group>
  )
}
