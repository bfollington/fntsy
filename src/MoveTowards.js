import { animated, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Vector3 } from "three";
import fonts from "./fonts/fonts";
import { useMousePosition } from "./useInput/useMousePosition";

export default function Model(props) {
  const group = useRef();

  const { projected } = useMousePosition(-10);

  useFrame(() => {
    const gap = new Vector3()
      .copy(projected.current)
      .sub(group.current.position);

    group.current.position.addScaledVector(gap, props.speed);
  });

  return (
    <group ref={group} dispose={null}>
      <mesh castShadow receiveShadow>
        <sphereBufferGeometry args={[0.3, 1, 5]} />
        <meshLambertMaterial color={props.color} />
      </mesh>
    </group>
  );
}
