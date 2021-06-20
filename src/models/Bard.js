import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Image(props) {
  const texture = useLoader(TextureLoader, "/bard.png");
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[4, 4]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  );
}

export default Image;
