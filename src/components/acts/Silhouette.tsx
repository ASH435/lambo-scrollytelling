import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Float, Text, MeshDistortMaterial } from '@react-three/drei'

const Silhouette = () => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.2
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <boxGeometry args={[10, 0.2, 5]} />
          <MeshDistortMaterial
            color="#050505"
            speed={2}
            distort={0.2}
            metalness={1}
            roughness={0}
          />
        </mesh>
        
        {/* Kinetic Light Trails */}
        {[...Array(4)].map((_, i) => (
          <mesh key={i} position={[0, 0.2 * i, 0]}>
            <boxGeometry args={[12, 0.01, 0.05]} />
            <meshStandardMaterial
              color="#ff6600"
              emissive="#ff6600"
              emissiveIntensity={10}
            />
          </mesh>
        ))}

        {/* Headlight Beams */}
        <group position={[5, 0, 1.5]}>
          <mesh rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.5, 4, 32]} />
            <meshStandardMaterial
              color="#ff6600"
              transparent
              opacity={0.3}
              emissive="#ff6600"
              emissiveIntensity={5}
            />
          </mesh>
        </group>
        <group position={[5, 0, -1.5]}>
          <mesh rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.5, 4, 32]} />
            <meshStandardMaterial
              color="#ff6600"
              transparent
              opacity={0.3}
              emissive="#ff6600"
              emissiveIntensity={5}
            />
          </mesh>
        </group>
      </Float>

      <Text
        position={[0, -3, 0]}
        fontSize={1.5}
        color="#ff6600"
        font="https://fonts.gstatic.com/s/orbitron/v30/y73V471Mf6Xv6bt3AgpX6Oug.woff"
        letterSpacing={0.5}
      >
        REVUELTO
      </Text>
    </group>
  )
}

export default Silhouette
