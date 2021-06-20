import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useResource,
  useThree
} from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import Blob from "./Blob";
import Effects from "./Effects";
import Menu from "./Menu";
import Angel from "./models/Angel";
import Mind from "./models/Mind";
import Mandala from "./models/Mandala";
import Bard from "./models/Bard";
import Gif from "./models/Gif";
import CursorFollow from "./CursorFollow";
import MoveTowards from "./MoveTowards";
import { Text } from "troika-three-text";
import fonts from "./fonts/fonts";
import { DIMENSIONS } from "./const";

extend({ Text });

export default function Viewer() {
  const ref = useRef();
  const myCamera = useRef();

  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={1}
      style={{
        width: DIMENSIONS.width + "px",
        height: DIMENSIONS.height + "px",
        imageRendering: "pixelated"
      }}
      camera={{ fov: 50 }}
    >
      <fog attach="fog" args={["red", 0, 125]} />
      <color attach="background" args={["black"]} />

      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -5, -20]} color="#76428a" intensity={2.5} />
      {/* <pointLight position={[10, 5, 20]} color="#76428a" intensity={1.5} /> */}

      <Suspense fallback={null}>
        {/* <Menu position={[-1.8, 1.5, 0]} /> */}
        {/* <Angel position={[0, 0, -500]} /> */}
        {/* <Mind position={[0, 0, -7]} scale={[0.8, 0.8, 0.8]} /> */}
        {/* <Mandala position={[-6, 0, -20]} scale={[0.02, 0.02, 0.02]} /> */}
        {/* <Bard position={[0, 0, -10]} scale={[1, 1, 1]} /> */}
        {/* <Gif position={[0, 0, -10]} scale={[1, 1, 1]} /> */}
        <CursorFollow />
        <MoveTowards speed={0.05} color="blue" />
        <MoveTowards speed={0.01} color="yellow" />
        <MoveTowards speed={0.005} color="red" />
        {/* <text
          position={[-45, 44.5, -100]}
          rotation={[0, 0, 0]}
          text={"./SPARK"}
          font={fonts["m5x7"]}
          fontSize={8}
          fontWeight={"bold"}
          outlineColor="red"
          // outlineWidth={0.2}
          anchorX="left"
          anchorY="middle"
        >
          <meshPhongMaterial attach="material" color={"#AAA"} />
        </text> */}

        {/* <text
          position={[0, 1, -10]}
          rotation={[0, 0, 0]}
          text={"KOSM"}
          font={fonts["SpaceAge"]}
          fontSize={2}
          fontWeight={"bold"}
          outlineColor="black"
          outlineWidth={0.2}
          anchorX="center"
          anchorY="middle"
        >
          <meshPhongMaterial attach="material" color={"#AAA"} />
        </text>
        <text
          position={[0, -1.7, -10]}
          rotation={[0, 0, 0]}
          text={"press (X) to start"}
          font={fonts["m5x7"]}
          fontSize={1}
          fontWeight={"bold"}
          outlineColor="black"
          outlineWidth={0.1}
          anchorX="center"
          anchorY="middle"
        >
          <meshPhongMaterial attach="material" color={"#AAA"} />
        </text> */}
      </Suspense>
      <PerspectiveCamera
        ref={myCamera}
        position={[0, 0, 100]}
        far={50000}
        near={-50000}
      />
      {/* <OrbitControls ref={ref} camera={myCamera.current} autoRotate /> */}
      <Effects />
    </Canvas>
  );
}