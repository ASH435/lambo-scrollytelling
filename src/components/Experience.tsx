import { useScroll, Text, Image, Float, Environment, ContactShadows } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const Experience = () => {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const offset = scroll.offset
    
    // Simple direct scroll mapping
    if (groupRef.current) {
      groupRef.current.position.z = offset * 50
    }
    
    // Basic camera movement
    state.camera.position.x = state.mouse.x * 2
    state.camera.position.y = 1 + state.mouse.y
    state.camera.lookAt(0, 0, -20 + offset * 50)
  })

  return (
    <>
      {/* Background color so we KNOW the canvas is rendering */}
      <color attach="background" args={['#111']} />
      <Environment preset="city" />
      
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <group ref={groupRef}>
        {/* PAGE 1 */}
        <group position={[0, 0, 0]}>
          <Text
            fontSize={width * 0.1}
            color="#D0FF00"
            position={[0, 2, -5]}
          >
            REVUELTO
          </Text>
          <Image 
            url="/images/car1.png" 
            scale={[width * 0.7, height * 0.5]} 
            position={[0, 0, -3]} 
            transparent
          />
        </group>

        {/* PAGE 2 */}
        <group position={[0, 0, -15]}>
          <Text
            fontSize={width * 0.05}
            color="#D0FF00"
            position={[-width * 0.2, 2, 0]}
          >
            THE CORE
          </Text>
          <Image 
            url="/images/img1.png" 
            scale={[width * 0.5, height * 0.5]} 
            position={[width * 0.2, 0, -2]} 
          />
        </group>

        {/* PAGE 3 */}
        <group position={[0, 0, -30]}>
          <Text
            fontSize={width * 0.05}
            color="#D0FF00"
            position={[0, 3, 0]}
          >
            THE EDGE
          </Text>
          <Image 
            url="/images/img2.png" 
            scale={[width * 0.8, height * 0.5]} 
            position={[0, 0, -5]} 
          />
        </group>

        {/* PAGE 4 */}
        <group position={[0, 0, -45]}>
          <Text
            fontSize={width * 0.1}
            color="#D0FF00"
            position={[0, 2, -5]}
          >
            LEGACY
          </Text>
          <Image 
            url="/images/car2.png" 
            scale={[width * 0.6, height * 0.4]} 
            position={[0, -1, -2]} 
            transparent
          />
        </group>

        {/* Floor to give perspective */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -25]}>
          <planeGeometry args={[100, 200]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
      </group>
    </>
  )
}

export default Experience
