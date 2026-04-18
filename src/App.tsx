import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Experience from './components/Experience'
import Loader from './components/Loader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

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

    // Image Parallax / Reveals
    gsap.utils.toArray('.parallax-image').forEach((img: any) => {
      gsap.to(img, {
        y: -100,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
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
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass-panel"
          >
            <div className="stats">V12 HYBRID · 1015 CV</div>
            <h1>The Core</h1>
            <p>
              The deconstructed heart of innovation. A high-performance 
              hybrid powertrain that merges internal combustion heritage 
              with electric velocity.
            </p>
          </motion.div>
        </section>

        <div className="image-portal">
          <img 
            src="/images/img1.png" 
            className="parallax-image" 
            alt="Mechanical Core" 
          />
        </div>

        <section className="section" id="act-2">
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass-panel"
          >
            <div className="stats">DRAG COEFF · 0.23 CD</div>
            <h1>The Edge</h1>
            <p>
              Precision geometry cutting through the void. Aerodynamic 
              purity where every line serves a thermal and 
              dynamic purpose.
            </p>
          </motion.div>
        </section>

        <div className="image-portal">
          <img 
            src="/images/img2.png" 
            className="parallax-image" 
            alt="Aerodynamics" 
          />
        </div>

        <section className="section" id="act-3">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass-panel"
          >
            <div className="stats">MONOFUSELAGE · CARBON</div>
            <h1>The Frame</h1>
            <p>
              An uncompromising structural lattice. Carbon fiber 
              braided with structural integrity to form a 
              weightless yet invincible chassis.
            </p>
          </motion.div>
        </section>

        <div className="image-portal">
          <img 
            src="/images/img3.png" 
            className="parallax-image" 
            alt="Chassis" 
          />
        </div>

        <section className="section" id="act-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass-panel"
          >
            <div className="stats">ICONIC · SINCE 1963</div>
            <h1>The Brand</h1>
            <p>
              The convergence of geometry and soul. A legacy 
              transformed into a digital silhouette, 
              defining the future of speed.
            </p>
          </motion.div>
          <motion.img 
            src="/images/car1.png"
            className="floating-car car-1"
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </section>

        <div className="image-portal">
          <img 
            src="/images/car2.png" 
            className="parallax-image contain" 
            alt="Lamborghini Perspective" 
          />
        </div>

        <section className="section" id="act-5">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass-panel full-width"
          >
            <div className="stats">ULTIMATE · PERFORMANCE</div>
            <h1>The Legacy</h1>
            <p>
              Experience the pinnacle of automotive engineering. 
              Built for those who refuse to follow.
            </p>
            <button className="cta-button">EXPLORE MORE</button>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

export default App
