import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Float, Sparkles, Stars } from '@react-three/drei'

const Engine = () => {
  const points = useRef<THREE.Points>(null!)
  
  const particleCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    points.current.rotation.y = t * 0.1
    points.current.rotation.z = t * 0.05
    
    // Pulsing effect
    const scale = 1 + Math.sin(t * 2) * 0.1
    points.current.scale.set(scale, scale, scale)
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color="#ff6600"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
        
        {/* Core Glow */}
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial
            color="#ff6600"
            emissive="#ff6600"
            emissiveIntensity={2}
            transparent
            opacity={0.2}
          />
        </mesh>
        
        <Sparkles 
          count={100} 
          scale={5} 
          size={2} 
          speed={0.4} 
          color="#ffaa00" 
        />
      </Float>
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

export default Engine
