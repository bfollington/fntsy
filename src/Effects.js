import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { CrtShader } from './CrtShader'

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
  AfterimagePass,
  GlitchPass,
})

export default function Effects() {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(512, 512), [])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />

      <afterimagePass attachArray="passes" args={[0.75]} scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.5, 0.2, 0]} />
      {/* <glitchPass
        attachArray="passes"
        args={[0.1]}
        scene={scene}
        camera={camera}
      /> */}
      <shaderPass attachArray="passes" args={[CrtShader]} scene={scene} camera={camera} />
    </effectComposer>
  )
}

// const blendPass = new THREE.ShaderPass(THREE.BlendShader, "tDiffuse1");
// blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
// blendPass.uniforms["mixRatio"].value = 0.8;
