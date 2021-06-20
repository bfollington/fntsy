import { animated, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Vector3 } from "three";
import fonts from "./fonts/fonts";
import { useMousePosition } from "./useInput/useMousePosition";

export default function Model(props) {
  const group = useRef();
  const text = useRef();

  const [styles, api] = useSpring(() => ({
    from: { position: new Vector3(0, 0, 0) },
    config: {
      damping: 10,
      tensions: 0.0001,
      clamp: false
    }
  }));

  const { mouse, projected } = useMousePosition(-10);

  useFrame(() => {
    api.start({
      position: projected.current
    });

    text.current.text = `${mouse.current.x.toFixed(
      2
    )}, ${mouse.current.y.toFixed(2)}`;
  });

  return (
    <animated.group {...styles} ref={group} dispose={null}>
      <mesh castShadow receiveShadow>
        <sphereBufferGeometry args={[0.3, 1, 5]} />
        <meshLambertMaterial color={"magenta"} />
      </mesh>
      <text
        ref={text}
        position={[0.5, -0.5, 0]}
        rotation={[0, 0, 0]}
        text={`hi`}
        font={fonts["m5x7"]}
        fontSize={1.5}
        fontWeight={"bold"}
        outlineColor="black"
        outlineWidth={0.1}
        anchorX="left"
        anchorY="middle"
      >
        <meshPhongMaterial attach="material" color={"#AAA"} />
      </text>
    </animated.group>
  );
}
