import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'

const Aero = () => {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.1
    group.current.rotation.x = Math.sin(t * 0.5) * 0.2
  })

  return (
    <group ref={group}>
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            position={[
              Math.sin((i / 8) * Math.PI * 2) * 4,
              Math.cos((i / 8) * Math.PI * 2) * 4,
              (Math.random() - 0.5) * 2
            ]}
          >
            <boxGeometry args={[4, 0.05, 1.5]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={1}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.1}
              temporalDistortion={0.1}
              color="#ffffff"
            />
          </mesh>
        ))}
        
        {/* Central Kinetic Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={4} />
        </mesh>
      </Float>
    </group>
  )
}

export default Aero
