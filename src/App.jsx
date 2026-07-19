import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechnicalSkills from './components/TechnicalSkills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    })
  }, [])

  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <TechnicalSkills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}

export default App
