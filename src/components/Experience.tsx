import { useScroll, Image, Text, Float, Environment, Sparkles } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

const Experience = () => {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const offset = scroll.offset
    
    // Move the entire scene group based on scroll
    // We move it from z: 0 to z: 50 to pass by objects
    groupRef.current.position.z = offset * 60

    // Subtle breathing/floating motion
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    
    // Smooth camera look-at/tilt based on mouse
    state.camera.position.x += (state.mouse.x * 2 - state.camera.position.x) * 0.05
    state.camera.position.y += (state.mouse.y * 2 - state.camera.position.y) * 0.05
    state.camera.lookAt(0, 0, -20 + offset * 60)
  })

  return (
    <>
      <color attach="background" args={['#000']} />
      <Environment preset="night" />
      
      <group ref={groupRef}>
        {/* Page 1: HERO REVEAL */}
        <group position={[0, 0, 0]}>
          <Text
            fontSize={width * 0.15}
            font="https://fonts.gstatic.com/s/orbitron/v30/y73V471Mf6Xv6bt3AgpX6Oug.woff"
            color="#D0FF00"
            position={[0, 0, -5]}
            maxWidth={width}
            textAlign="center"
          >
            REVUELTO
          </Text>
          <Image 
            url="/images/car1.png" 
            scale={[width * 0.8, height * 0.6]} 
            position={[0, -2, -8]} 
            transparent 
            opacity={1}
          />
        </group>

        {/* Page 2: THE CORE */}
        <group position={[0, 0, -15]}>
          <Text
            fontSize={width * 0.05}
            color="#D0FF00"
            position={[-width * 0.2, 2, -2]}
            maxWidth={width * 0.4}
          >
            THE CORE
          </Text>
          <Text
            fontSize={width * 0.02}
            color="white"
            position={[-width * 0.2, 0.5, -2]}
            maxWidth={width * 0.3}
          >
            V12 HYBRID HEART. 1015 CV OF RAW ANALOG POWER.
          </Text>
          <Image 
            url="/images/img1.png" 
            scale={[width * 0.5, height * 0.5]} 
            position={[width * 0.2, 0, -5]} 
          />
          <Sparkles count={200} scale={[10, 10, 10]} size={2} color="#D0FF00" />
        </group>

        {/* Page 3: THE EDGE */}
        <group position={[0, 0, -30]}>
          <Text
            fontSize={width * 0.05}
            color="#D0FF00"
            position={[width * 0.2, 2, -2]}
            textAlign="right"
          >
            THE EDGE
          </Text>
          <Image 
            url="/images/img2.png" 
            scale={[width * 0.6, height * 0.4]} 
            position={[-width * 0.2, 0, -5]} 
          />
          <group position={[width * 0.2, 0, -2]}>
            <Text fontSize={width * 0.03} color="white" position={[0, 0.5, 0]}>66% GAIN</Text>
            <Text fontSize={width * 0.01} color="#D0FF00" position={[0, -0.5, 0]}>FRONT DOWNFORCE</Text>
          </group>
        </group>

        {/* Page 4: THE FRAME */}
        <group position={[0, 0, -45]}>
          <Text
            fontSize={width * 0.05}
            color="#D0FF00"
            position={[0, 3, -5]}
          >
            THE FRAME
          </Text>
          <Image 
            url="/images/img3.png" 
            scale={[width, height * 0.8]} 
            position={[0, 0, -10]} 
            opacity={0.5}
          />
          <Text
            fontSize={width * 0.02}
            color="white"
            position={[0, -2, -5]}
            maxWidth={width * 0.6}
            textAlign="center"
          >
            CARBON FIBER MONOFUSELAGE. AVIATION-GRADE STRENGTH.
          </Text>
        </group>

        {/* Page 5: THE LEGACY */}
        <group position={[0, 0, -60]}>
          <Text
            fontSize={width * 0.08}
            color="#D0FF00"
            position={[0, 2, -10]}
          >
            LEGACY
          </Text>
          <Image 
            url="/images/car2.png" 
            scale={[width * 0.7, height * 0.5]} 
            position={[0, -1, -15]} 
            transparent
          />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
             <mesh position={[0, -5, -20]}>
                <boxGeometry args={[width * 2, 0.1, 100]} />
                <meshStandardMaterial color="#D0FF00" emissive="#D0FF00" emissiveIntensity={0.5} wireframe />
             </mesh>
          </Float>
        </group>

        {/* Atmospheric elements throughout */}
        {[...Array(20)].map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -i * 5]}>
            <boxGeometry args={[0.02, 0.02, 2]} />
            <meshStandardMaterial color="#D0FF00" emissive="#D0FF00" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      <EffectComposer {...({ disableNormalPass: true } as any)}>
        <Bloom 
          intensity={1.5} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D0FF00" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
    </>
  )
}

export default Experience
