import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Grid } from '@react-three/drei'
import Engine from './acts/Engine'
import Aero from './acts/Aero'
import Structure from './acts/Structure'
import Silhouette from './acts/Silhouette'

const Scene = () => {
  const { camera, mouse } = useThree()
  const sceneRef = useRef<THREE.Group>(null!)
  const engineRef = useRef<THREE.Group>(null!)
  const aeroRef = useRef<THREE.Group>(null!)
  const structureRef = useRef<THREE.Group>(null!)
  const silhouetteRef = useRef<THREE.Group>(null!)

  // Mouse tracking for subtle parallax
  useFrame(() => {
    // Smoothly follow mouse
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Smoother scrub
      },
    })

    // Initial states
    gsap.set(aeroRef.current.scale, { x: 0, y: 0, z: 0 })
    gsap.set(structureRef.current.scale, { x: 0, y: 0, z: 0 })
    gsap.set(silhouetteRef.current.scale, { x: 0, y: 0, z: 0 })

    // Act 1 to Act 2
    tl.to(engineRef.current.position, { y: 20, duration: 1 })
    tl.to(engineRef.current.scale, { x: 0, y: 0, z: 0, duration: 1 }, '<')
    tl.to(aeroRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, '<')
    tl.to(camera.position, { y: 2, z: 15, duration: 1 }, '<')
    tl.to(camera.rotation, { x: -0.1, duration: 1 }, '<')

    // Act 2 to Act 3
    tl.to(aeroRef.current.position, { x: -25, duration: 1 })
    tl.to(aeroRef.current.scale, { x: 0, y: 0, z: 0, duration: 1 }, '<')
    tl.to(structureRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, '<')
    tl.to(camera.position, { x: 10, y: 5, z: 20, duration: 1 }, '<')
    tl.to(camera.rotation, { y: 0.4, duration: 1 }, '<')

    // Act 3 to Act 4
    tl.to(structureRef.current.position, { y: -25, duration: 1 })
    tl.to(structureRef.current.scale, { x: 0, y: 0, z: 0, duration: 1 }, '<')
    tl.to(silhouetteRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, '<')
    tl.to(camera.position, { x: 0, y: 0, z: 12, duration: 1 }, '<')
    tl.to(camera.rotation, { x: 0, y: 0, duration: 1 }, '<')

    return () => {
      ScrollTrigger.getById('main-scroll')?.kill()
    }
  }, [camera])

  return (
    <group ref={sceneRef}>
      <Grid
        position={[0, -5, 0]}
        args={[100, 100]}
        sectionSize={5}
        sectionColor="#27272a"
        cellColor="#18181b"
        fadeDistance={50}
        infiniteGrid
      />
      
      <group ref={engineRef}>
        <Engine />
      </group>
      <group ref={aeroRef}>
        <Aero />
      </group>
      <group ref={structureRef}>
        <Structure />
      </group>
      <group ref={silhouetteRef}>
        <Silhouette />
      </group>

      <ambientLight intensity={0.2} />
      <spotLight position={[20, 20, 10]} angle={0.15} penumbra={1} intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#ff6600" intensity={10} />
      <pointLight position={[10, 10, 10]} color="#ffffff" intensity={5} />
    </group>
  )
}

export default Scene
