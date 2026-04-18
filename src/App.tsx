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
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    function update(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    lenis.on('scroll', ScrollTrigger.update)

    // Progress bar animation
    gsap.to('.progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
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
      <div className="noise" />
      <div className="progress-bar" />

      <div className="experience">
        <Experience />
      </div>

      <div className="content">
        <section className="section" id="act-1">
          <div className="glass-panel">
            <div className="stats">V12 HYBRID · 1015 CV</div>
            <h1>The Core</h1>
            <p>
              The deconstructed heart of innovation. A high-performance 
              hybrid powertrain that merges internal combustion heritage 
              with electric velocity.
            </p>
          </div>
        </section>

        <section className="section" id="act-2">
          <div className="glass-panel">
            <div className="stats">DRAG COEFF · 0.23 CD</div>
            <h1>The Edge</h1>
            <p>
              Precision geometry cutting through the void. Aerodynamic 
              purity where every line serves a thermal and 
              dynamic purpose.
            </p>
          </div>
        </section>

        <section className="section" id="act-3">
          <div className="glass-panel">
            <div className="stats">MONOFUSELAGE · CARBON</div>
            <h1>The Frame</h1>
            <p>
              An uncompromising structural lattice. Carbon fiber 
              braided with structural integrity to form a 
              weightless yet invincible chassis.
            </p>
          </div>
        </section>

        <section className="section" id="act-4">
          <div className="glass-panel">
            <div className="stats">ICONIC · SINCE 1963</div>
            <h1>The Brand</h1>
            <p>
              The convergence of geometry and soul. A legacy 
              transformed into a digital silhouette, 
              defining the future of speed.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
