import { useLoader } from '@react-three/fiber'
import { RepeatWrapping, TextureLoader } from 'three'

function Image(props) {
  const texture = useLoader(TextureLoader, '/floor.png')
  if (texture) {
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.repeat.set(128, 128)
  }
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[4, 4]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  )
}

export default Image
