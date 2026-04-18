import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { Suspense } from 'react'
import Experience from './components/Experience'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <div className="noise" />
      
      {/* Minimal HUD */}
      <div className="hud">
        <div className="hud-top">
          <span>AERO_FLIGHT // V.26</span>
          <span>LAMBORGHINI REVUELTO</span>
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<color attach="background" args={['#202020']} />}>
          <ScrollControls pages={6} damping={0.1}>
            <Experience />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
