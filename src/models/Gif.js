import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Image(props) {
  return (
    <group {...props}>
      <Html sprite>
        <img
          src="https://media4.giphy.com/media/8Ry7iAVwKBQpG/giphy.gif?cid=ecf05e47inswmaetae86aujg3i99rnw61jzn7sp1hfthkfop&rid=giphy.gif&ct=g"
          alt="ok"
        />
      </Html>
    </group>
  );
}

export default Image;
