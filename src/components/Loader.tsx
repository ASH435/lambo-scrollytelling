import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'
import gsap from 'gsap'

const Loader = () => {
  const { progress } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setShow(false)
      })
      
      tl.to('.loader', {
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.5
      })
    }
  }, [progress])

  if (!show) return null

  return (
    <div className="loader">
      <div className="loader-content">
        <div className="loader-logo">LAMBORGHINI</div>
        <div className="loader-bar-container">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-percentage">{Math.round(progress)}%</div>
      </div>
    </div>
  )
}

export default Loader
