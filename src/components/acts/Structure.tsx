import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const Structure = () => {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = Math.sin(t * 0.3) * 0.2
    group.current.rotation.y = Math.cos(t * 0.3) * 0.2
  })

  return (
    <group ref={group}>
      {[...Array(5)].map((_, x) => (
        [...Array(5)].map((_, y) => (
          <mesh
            key={`${x}-${y}`}
            position={[
              (x - 2) * 1.8 + (y % 2) * 0.9,
              (y - 2) * 1.5,
              0
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[1, 1, 0.2, 6]} />
            <meshStandardMaterial color="#222" wireframe />
          </mesh>
        ))
      ))}
    </group>
  )
}

export default Structure
