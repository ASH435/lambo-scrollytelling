import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Experience from './components/Experience'
import Loader from './components/Loader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    function update(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Progress bar animation
    gsap.to('.progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <main>
      <Loader />
      {/* Visual Noise Overlay */}
      <div className="noise" />

      {/* Progress Bar */}
      <div className="progress-bar" />

      {/* 3D Scene Layer */}
      <div className="experience">
        <Experience />
      </div>

      {/* HTML Content Layer */}
      <div className="content">
        <section id="act-1">
          <h1>The Core</h1>
          <p>Driven by the hybrid heart. Abstract power deconstructed into pure mechanical energy.</p>
        </section>

        <section id="act-2">
          <h1>The Edge</h1>
          <p>Precision redefined. Every plane designed to slice through air with zero resistance.</p>
        </section>

        <section id="act-3">
          <h1>The Frame</h1>
          <p>Uncompromising structure. Carbon fiber lattice strength meeting technical mastery.</p>
        </section>

        <section id="act-4">
          <h1>The Brand</h1>
          <p>Legacy converged. The iconic silhouette of a legend, born from innovation.</p>
        </section>
      </div>
    </main>
  )
}

export default App
