import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const Engine = () => {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.5
    
    // Pumping motion for "pistons"
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 2 + i) * 0.5
    })
  })

  return (
    <group ref={group}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[(i - 2.5) * 1.5, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
          <meshStandardMaterial color="#ff6600" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.1, 16, 100]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

export default Engine
