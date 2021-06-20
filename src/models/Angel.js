import React, { useRef } from "react";
import CrystalRing from "./CrystalRing";
import Eye from "./Eye";

export default function Model(props) {
  const group = useRef();

  return (
    <group ref={group} {...props} dispose={null}>
      <CrystalRing
        position={[0, 0, 0]}
        speed={0.01}
        radius={110}
        color="#76428a"
      />
      <CrystalRing
        position={[0, 0, 0]}
        speed={-0.015}
        radius={138}
        color="#007899"
      />
      <Eye position={[0, 0, 0]} />
    </group>
  );
}
