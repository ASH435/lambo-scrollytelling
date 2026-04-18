import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import Scene from './Scene'

const Experience = () => {
  return (
    <Canvas
      dpr={[1, 2]} // Performance optimization for high-density screens
      gl={{ 
        antialias: false, // Performance win with post-processing
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={null}>
        <Scene />
        <Environment preset="city" />
        
        <EffectComposer {...({ disableNormalPass: true } as any)}>
          <Bloom 
            intensity={1.5} 
            luminanceThreshold={0.9} 
            luminanceSmoothing={0.025} 
          />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Suspense>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
    </Canvas>
  )
}

export default Experience
