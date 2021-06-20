import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import fonts from './fonts/fonts'

const offset = new Vector3(0, 0, -1)

function Watermark({ position: [x, y] }) {
  const { camera } = useThree()
  const text = useRef()
  offset.set(x, y, -5)

  useFrame(() => {
    if (text.current) {
      text.current.position.set(
        camera.position.x + offset.x,
        camera.position.y + offset.y,
        offset.z
      )
    }

    text.current.rotation.x = text.current.rotation.y += 0.003
    text.current.rotation.z += 0.01
  })

  return (
    <text
      ref={text}
      position={[x, y, -2]}
      rotation={[0, 0, 0]}
      text={'FNTSY'}
      font={fonts['SpaceAge']}
      fontSize={1}
      fontWeight={'bold'}
      outlineColor="black"
      outlineWidth={0.05}
      anchorX="center"
      anchorY="middle"
    >
      <meshPhongMaterial attach="material" color={'#AAA'} />
    </text>
  )
}

export default Watermark
