import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const Structure = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const tempObject = useMemo(() => new THREE.Object3D(), [])

  const positions = useMemo(() => {
    const pos = []
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 5; y++) {
        pos.push([
          (x - 3.5) * 2.2 + (y % 2) * 1.1,
          (y - 2) * 1.9,
          0
        ])
      }
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    positions.forEach((pos, i) => {
      const x = pos[0]
      const y = pos[1]
      const z = Math.sin(t + x * 0.5 + y * 0.5) * 0.5
      
      tempObject.position.set(x, y, z)
      tempObject.rotation.set(0, 0, Math.PI / 2)
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.3
  })

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
        <cylinderGeometry args={[1, 1, 0.1, 6]} />
        <meshStandardMaterial
          color="#111111"
          metalness={1}
          roughness={0.1}
          wireframe={false}
        />
      </instancedMesh>
      
      {/* Orange Structural Highlights */}
      <instancedMesh args={[undefined, undefined, positions.length]}>
        <cylinderGeometry args={[1.05, 1.05, 0.05, 6]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={2}
          wireframe
        />
      </instancedMesh>
    </group>
  )
}

export default Structure
