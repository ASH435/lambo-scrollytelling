import { useThree } from '@react-three/fiber'
import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Engine from './acts/Engine'
import Aero from './acts/Aero'
import Structure from './acts/Structure'
import Silhouette from './acts/Silhouette'

const Scene = () => {
  const { camera } = useThree()
  const sceneRef = useRef<THREE.Group>(null!)
  const engineRef = useRef<THREE.Group>(null!)
  const aeroRef = useRef<THREE.Group>(null!)
  const structureRef = useRef<THREE.Group>(null!)
  const silhouetteRef = useRef<THREE.Group>(null!)

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    // Initial states
    gsap.set(aeroRef.current.scale, { x: 0, y: 0, z: 0 })
    gsap.set(structureRef.current.scale, { x: 0, y: 0, z: 0 })
    gsap.set(silhouetteRef.current.scale, { x: 0, y: 0, z: 0 })

    // Act 1 to Act 2
    tl.to(engineRef.current.position, { y: 15, duration: 1 })
    tl.to(engineRef.current.scale, { x: 0, y: 0, z: 0, duration: 1 }, '<')
    tl.to(engineRef.current.rotation, { x: Math.PI, duration: 1 }, '<')
    tl.to(aeroRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, '<')
    tl.to(camera.position, { z: 15, duration: 1 }, '<')
    tl.to(camera.rotation, { x: -0.2, duration: 1 }, '<')

    // Act 2 to Act 3
    tl.to(aeroRef.current.position, { x: -20, duration: 1 })
    tl.to(aeroRef.current.scale, { x: 0, y: 0, z: 0, duration: 1 }, '<')
    tl.to(structureRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 }, '<')
    tl.to(camera.position, { x: 8, z: 20, duration: 1 }, '<')
    tl.to(camera.rotation, { y: 0.3, duration: 1 }, '<')

    // Act 3 to Act 4
    tl.to(structureRef.current.position, { y: -20, duration: 1 })
    tl.to(structureRef.current.scale, { x: 0, y: 0, z: 0, duration: 1 }, '<')
    tl.to(silhouetteRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, '<')
    tl.to(camera.position, { x: 0, y: 2, z: 12, duration: 1 }, '<')
    tl.to(camera.rotation, { x: 0, y: 0, duration: 1 }, '<')

    return () => {
      if (ScrollTrigger.getById('main-scroll')) {
        ScrollTrigger.getById('main-scroll').kill()
      }
    }
  }, [camera])

  return (
    <group ref={sceneRef}>
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

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff6600" intensity={5} />
    </group>
  )
}

export default Scene
