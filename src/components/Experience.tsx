import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import * as THREE from 'three'
import { Environment, PerspectiveCamera, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import Scene from './Scene'

const Experience = () => {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      dpr={dpr}
      gl={{ 
        antialias: false,
        powerPreference: "high-performance"
      }}
    >
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      <Suspense fallback={null}>
        <Scene />
        <Environment preset="city" />
        
        <EffectComposer {...({ disableNormalPass: true } as any)}>
          <Bloom 
            intensity={2} 
            luminanceThreshold={0.8} 
            luminanceSmoothing={0.1} 
          />
          <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Suspense>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
    </Canvas>
  )
}

export default Experience
