import { Canvas, extend } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { Text } from 'troika-three-text'
import { DIMENSIONS } from './const'
import CursorFollow from './CursorFollow'
import DungeonGenerator from './DungeonGenerator'
import Effects from './Effects'
import Floor from './models/Floor'
import PanningCamera from './PanningCamera'
import Player from './Player'

extend({ Text })

export default function Viewer() {
  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      dpr={1}
      style={{
        width: DIMENSIONS.width + 'px',
        height: DIMENSIONS.height + 'px',
        imageRendering: 'pixelated',
      }}
      camera={{ fov: 50 }}
    >
      <fog attach="fog" args={['red', 0, 125]} />
      <color attach="background" args={['black']} />

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
        {/* <Mandala position={[-6, 0, -10]} scale={[0.01, 0.01, 0.01]} /> */}
        {/* <Bard position={[0, 0, -10]} scale={[1, 1, 1]} /> */}
        <Floor position={[0, 0, -11]} scale={[128, 128, 1]} />
        {/* <Gif position={[0, 0, -10]} scale={[1, 1, 1]} /> */}
        <CursorFollow />
        <Player position={[0, 0, -10.9]} speed={0.09} color="#76428a" />
        <DungeonGenerator position={[0, 0, -11]} />
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

        {/* <Watermark position={[0, 5]} /> */}
        {/* <text
          position={[0, -1.7, -10]}
          rotation={[0, 0, 0]}
          text={'press (X) to start'}
          font={fonts['m5x7']}
          fontSize={1}
          fontWeight={'bold'}
          outlineColor="black"
          outlineWidth={0.1}
          anchorX="center"
          anchorY="middle"
        >
          <meshPhongMaterial attach="material" color={'#AAA'} />
        </text> */}
      </Suspense>
      <PanningCamera />
      {/* <OrbitControls ref={ref} camera={myCamera.current} autoRotate /> */}
      <Effects />
    </Canvas>
  )
}
