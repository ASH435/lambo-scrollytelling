import { useScroll, Text, Environment } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const Experience = () => {
  const scroll = useScroll()
  const { width } = useThree((state) => state.viewport)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const offset = scroll.offset
    
    if (groupRef.current) {
      groupRef.current.position.z = offset * 50
    }
    
    state.camera.position.x += (state.mouse.x * 2 - state.camera.position.x) * 0.05
    state.camera.position.y += (state.mouse.y * 2 - state.camera.position.y) * 0.05
    state.camera.lookAt(0, 0, -20 + offset * 50)
  })

  return (
    <>
      <color attach="background" args={['#101010']} />
      <Environment preset="city" />
      
      <group ref={groupRef}>
        {/* Page 1: HERO REVEAL */}
        <group position={[0, 0, 0]}>
          <Text
            fontSize={width * 0.12}
            color="#D0FF00"
            position={[0, 0, -5]}
            maxWidth={width}
            textAlign="center"
          >
            REVUELTO
          </Text>
          <mesh position={[0, -2, -5]}>
             <boxGeometry args={[width * 0.8, 0.5, 2]} />
             <meshStandardMaterial color="#333" metalness={1} roughness={0} />
          </mesh>
        </group>

        {/* Page 2: DEBUG CUBE */}
        <group position={[0, 0, -25]}>
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#D0FF00" emissive="#D0FF00" emissiveIntensity={0.5} />
          </mesh>
          <Text
            fontSize={width * 0.06}
            color="white"
            position={[0, 4, 0]}
          >
            SCROLL TO EXPLORE
          </Text>
        </group>

        {/* Global Particles */}
        {[...Array(100)].map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, -i * 1]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#D0FF00" emissive="#D0FF00" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#D0FF00" />
      <spotLight position={[0, 10, 0]} intensity={5} color="white" />
    </>
  )
}

export default Experience
