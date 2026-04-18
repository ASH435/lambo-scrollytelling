import { useScroll, Text, Image, Float, Environment, Sparkles, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'

const Experience = () => {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const offset = scroll.offset
    const t = state.clock.getElapsedTime()
    
    // Smooth scroll position
    if (groupRef.current) {
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, offset * 60, 0.1)
    }
    
    // Parallax camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 3, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2 + state.mouse.y * 2, 0.05)
    state.camera.lookAt(0, 0, -20 + offset * 60)
  })

  return (
    <>
      <color attach="background" args={['#020202']} />
      <Environment preset="night" />
      
      <group ref={groupRef}>
        {/* LIGHTING */}
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={10} color="#D0FF00" castShadow />
        <pointLight position={[-10, 5, -10]} intensity={5} color="#D0FF00" />
        <pointLight position={[10, 5, -10]} intensity={2} color="#ffffff" />

        {/* PAGE 1: THE REVEAL */}
        <group position={[0, 0, 0]}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Text
              fontSize={width * 0.12}
              font="https://fonts.gstatic.com/s/orbitron/v30/y73V471Mf6Xv6bt3AgpX6Oug.woff"
              color="#D0FF00"
              position={[0, 1.5, -5]}
              maxWidth={width}
              textAlign="center"
              fillOpacity={0.1}
              strokeWidth={0.01}
              strokeColor="#D0FF00"
            >
              REVUELTO
            </Text>
            <Image 
              url="/images/car1.png" 
              scale={[width * 0.8, height * 0.7]} 
              position={[0, -0.5, -3]} 
              transparent
            />
          </Float>
        </group>

        {/* PAGE 2: THE CORE */}
        <group position={[0, 0, -15]}>
          <Float speed={3} rotationIntensity={1} floatIntensity={2}>
            <Image 
              url="/images/img1.png" 
              scale={[width * 0.6, height * 0.6]} 
              position={[width * 0.25, 0, -2]} 
            />
          </Float>
          <Text
            fontSize={width * 0.05}
            color="#D0FF00"
            position={[-width * 0.2, 2, 0]}
            maxWidth={width * 0.4}
            font="https://fonts.gstatic.com/s/orbitron/v30/y73V471Mf6Xv6bt3AgpX6Oug.woff"
          >
            THE CORE
          </Text>
          <Text
            fontSize={width * 0.015}
            color="white"
            position={[-width * 0.2, 0.5, 0]}
            maxWidth={width * 0.3}
          >
            V12 HYBRID HEART. 1015 CV OF UNCOMPROMISING POWER.
          </Text>
          <Sparkles count={100} scale={[10, 10, 10]} size={3} color="#D0FF00" />
        </group>

        {/* PAGE 3: THE EDGE */}
        <group position={[0, 0, -30]}>
          <Image 
            url="/images/img2.png" 
            scale={[width * 0.8, height * 0.5]} 
            position={[-width * 0.1, 0, -5]} 
          />
          <group position={[width * 0.2, 0, 0]}>
            <Text fontSize={width * 0.04} color="white" position={[0, 0.8, 0]}>ACTIVE AERO</Text>
            <Text fontSize={width * 0.08} color="#D0FF00" position={[0, -0.5, 0]}>+66%</Text>
            <Text fontSize={width * 0.01} color="white" position={[0, -1.5, 0]}>FRONT DOWNFORCE GAIN</Text>
          </group>
        </group>

        {/* PAGE 4: THE LEGACY */}
        <group position={[0, 0, -45]}>
          <Float speed={4} rotationIntensity={0.5}>
            <Image 
              url="/images/car2.png" 
              scale={[width * 0.7, height * 0.5]} 
              position={[0, 0, -5]} 
              transparent
            />
          </Float>
          <Text
            fontSize={width * 0.1}
            color="#D0FF00"
            position={[0, 3, -10]}
            fillOpacity={0.05}
            strokeWidth={0.005}
            strokeColor="#D0FF00"
          >
            LEGACY
          </Text>
        </group>

        {/* FLOOR & REFLECTIONS */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, -20]}>
          <planeGeometry args={[100, 200]} />
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
        </mesh>
        <ContactShadows 
          position={[0, -3.4, 0]} 
          opacity={0.4} 
          scale={40} 
          blur={2} 
          far={10} 
          color="#D0FF00" 
        />

        {/* KINETIC SPEED LINES */}
        {[...Array(30)].map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, -i * 3]}>
            <boxGeometry args={[0.01, 0.01, 5]} />
            <meshStandardMaterial color="#D0FF00" emissive="#D0FF00" emissiveIntensity={4} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* POST PROCESSING */}
      <EffectComposer {...({ disableNormalPass: true } as any)}>
        <Bloom 
          intensity={1.5} 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.002, 0.002)} 
        />
        <Vignette eskil={false} offset={0.1} darkness={1.3} />
      </EffectComposer>
    </>
  )
}

export default Experience
