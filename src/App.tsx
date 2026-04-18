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
    gsap.to('.progress-hud-fill', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'main',
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
    <div className="text-[#f9f5f8] font-body selection:bg-[#ff915d] selection:text-black min-h-screen relative">
      <Loader />
      
      {/* 3D Experience Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Experience />
      </div>

      {/* Visual Noise Overlay */}
      <div className="noise" />

      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-zinc-950/60 backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex justify-between items-center px-10 h-24">
        <div className="text-2xl font-black text-zinc-100 tracking-[-0.06em] font-headline uppercase">REVUELTO</div>        
        <nav className="hidden md:flex gap-12 font-headline tracking-[-0.05em] uppercase">
          <a className="text-zinc-400 font-medium hover:text-orange-400 transition-colors duration-300" href="#">AERODYNAMICS</a>
          <a className="text-zinc-400 font-medium hover:text-orange-400 transition-colors duration-300" href="#">PERFORMANCE</a>
          <a className="text-zinc-400 font-medium hover:text-orange-400 transition-colors duration-300" href="#">HYBRID</a>   
          <a className="text-zinc-400 font-medium hover:text-orange-400 transition-colors duration-300" href="#">MONOCOCQUE</a>
        </nav>
        <div className="flex items-center gap-6">
          <button className="bg-[#ff7936] text-black px-6 py-2 font-headline font-bold text-sm tracking-tighter hover:bg-[#ff915d] transition-all scale-95 active:opacity-80">CONFIGURE</button>
        </div>
      </header>

      {/* Side HUD */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 rounded-md bg-zinc-900/40 backdrop-blur-[20px] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col gap-4 p-4 items-center z-40 hidden md:flex">
        <div className="mb-4 text-center">
          <div className="font-headline text-[8px] tracking-[0.2em] text-orange-600 font-bold">TECHNICAL_HUD</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-orange-600 text-black p-3 rounded-sm cursor-crosshair">
            <span className="material-symbols-outlined text-sm">query_stats</span>
          </div>
          <div className="text-zinc-500 p-3 hover:text-zinc-100 cursor-crosshair transition-all hover:bg-zinc-800/50">
            <span className="material-symbols-outlined text-sm">earth_engine</span>
          </div>
        </div>
      </aside>

      {/* Progress Indicator */}
      <div className="fixed right-10 top-0 h-full w-[2px] bg-zinc-800 z-50">
        <div className="progress-hud-fill absolute top-0 w-full h-0 bg-[#ff915d] shadow-[0_0_15px_#ff915d]"></div>
      </div>

      <main className="relative z-10">
        {/* SECTION 1: THE CORE */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
          <div className="relative z-10 w-full px-10 md:px-24">
            <div className="flex flex-col items-start gap-0">
              <span className="font-label text-xs tracking-[0.5em] text-[#ff915d] mb-4">01_THE_CORE</span>
              <h1 className="font-headline text-[12vw] leading-[0.8] font-black tracking-[-0.08em] uppercase -ml-4 opacity-20">REVUELTO</h1>
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="mt-12 glass-panel p-8 max-w-xl self-end border-l-4 border-[#ff6600]"
              >
                <div className="flex gap-10 items-end mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase">Engine Type</span>
                    <span className="text-3xl font-bold">V12 HYBRID</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase">Power Output</span>
                    <span className="text-3xl font-bold text-[#ff915d]">1015 CV</span>
                  </div>
                </div>
                <p className="text-zinc-400 leading-relaxed max-w-sm">The first High Performance Electrified Vehicle. A new benchmark in performance and driving pleasure.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE EDGE */}
        <section className="relative min-h-screen flex flex-col justify-center px-10 md:px-24 overflow-hidden bg-zinc-950/20">
          <div className="grid grid-cols-12 gap-6 relative z-10">
            <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
              <span className="font-label text-xs tracking-[0.5em] text-[#ff915d] mb-4">02_THE_EDGE</span>
              <h2 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tight mb-8">ACTIVE<br/>AERO</h2>
              <p className="text-zinc-400 text-lg max-w-md">Every element is shaped by the wind. Air is not just a medium, it is a tool for stability.</p>
            </div>
            <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/60 backdrop-blur-xl p-6 border-l-2 border-[#ff915d]/30">
                <span className="text-[10px] text-zinc-500">SYSTEM_ID_044</span>
                <div className="text-4xl font-bold mt-2">66%</div>
                <div className="text-xs text-zinc-400 mt-1">INCREASED DOWNFORCE</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE FRAME */}
        <section className="relative min-h-screen flex items-center justify-end px-10 md:px-24">
          <div className="relative z-10 text-right">
            <span className="font-label text-xs tracking-[0.5em] text-[#ff915d] mb-4">03_THE_FRAME</span>
            <h2 className="font-headline text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6">MONOCOCQUE</h2>       
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="glass-panel p-10 max-w-lg ml-auto border-r-4 border-[#ff6600]"
            >
              <h3 className="text-xl font-bold mb-4 text-[#ff915d]">MONOFUSELAGE ARCHITECTURE</h3>
              <p className="text-zinc-400 leading-relaxed text-sm mb-8">Chassis inspired by aviation. Made of Forged Composites for superior energy absorption.</p>
              <div className="flex justify-end gap-12">
                <div className="text-center">
                  <div className="text-2xl font-bold">-10%</div>
                  <div className="text-[10px] text-zinc-500">WEIGHT</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">+25%</div>
                  <div className="text-[10px] text-zinc-500">STIFFNESS</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: THE LEGACY */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-10 py-32 bg-zinc-950/40">
          <div className="max-w-4xl w-full text-center mb-24">
            <span className="font-label text-xs tracking-[0.5em] text-[#ff915d] mb-6 block">04_THE_LEGACY</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-12 uppercase">REDEFINING<br/>THE SPECIES</h2>   
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-4">
              <div className="h-64 overflow-hidden relative group">
                <img src="/images/img1.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Legacy 1" />
              </div>
              <div className="h-64 overflow-hidden relative group">
                <img src="/images/car1.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Legacy 2" />
              </div>
              <div className="h-64 overflow-hidden relative group">
                <img src="/images/img3.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Legacy 3" />
              </div>
            </div>
          </div>
          <button className="px-12 py-5 bg-transparent border border-[#ff915d] text-[#ff915d] font-black tracking-widest hover:bg-[#ff915d] hover:text-black transition-all">
            DISCOVER THE HERITAGE
          </button>
        </section>
      </main>

      <footer className="bg-zinc-950 w-full py-12 border-t border-white/5 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-6 text-[10px] tracking-widest text-zinc-500">
          <div className="text-zinc-100 font-bold">REVUELTO</div>
          <div className="flex gap-8">
            <a href="#">PRIVACY_POLICY</a>
            <a href="#">LEGAL</a>
            <a href="#">CONTACT</a>
          </div>
          <div className="opacity-50">© 2024 AUTOMOBILI LAMBORGHINI S.P.A.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
