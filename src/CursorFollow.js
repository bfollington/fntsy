import { animated, useSpring } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { Vector3 } from 'three'
import fonts from './fonts/fonts'
import { target } from './PanningCamera'
import DebugText from './DebugText'
import { useMousePosition } from './useInput/useMousePosition'
import { printv3 } from './v3'

export default function Model(props) {
  const group = useRef()
  const text = useRef()

  const [targetPoint] = useAtom(target)
  const three = useThree()

  const [styles, api] = useSpring(() => ({
    from: { position: new Vector3(0, 0, 0) },
    config: {
      damping: 10,
      tensions: 0.0001,
      clamp: false,
    },
  }))

  const { mouse, projected } = useMousePosition(-10)

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
