import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Float, Text } from '@react-three/drei'

const Silhouette = () => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <boxGeometry args={[8, 0.5, 4]} />
          <meshStandardMaterial color="#111" metalness={1} roughness={0} />
        </mesh>
        
        {/* Abstract "eyes" or headlights */}
        <mesh position={[3.5, 0.3, 1.5]}>
          <boxGeometry args={[0.5, 0.1, 0.8]} />
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={5} />
        </mesh>
        <mesh position={[3.5, 0.3, -1.5]}>
          <boxGeometry args={[0.5, 0.1, 0.8]} />
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={5} />
        </mesh>
      </Float>

      <Text
        position={[0, -2, 0]}
        fontSize={1}
        color="#ff6600"
        font="https://fonts.gstatic.com/s/orbitron/v30/y73V471Mf6Xv6bt3AgpX6Oug.woff"
      >
        LEGEND
      </Text>
    </group>
  )
}

export default Silhouette
