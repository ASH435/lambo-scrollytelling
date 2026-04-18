import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Float } from '@react-three/drei'

const Aero = () => {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.z = t * 0.2
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {[...Array(12)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 12) * Math.PI * 2) * 5,
              Math.sin((i / 12) * Math.PI * 2) * 5,
              0
            ]}
            rotation={[0, 0, (i / 12) * Math.PI * 2]}
          >
            <coneGeometry args={[0.5, 3, 3]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </Float>
    </group>
  )
}

export default Aero
