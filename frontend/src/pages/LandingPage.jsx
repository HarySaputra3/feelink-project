import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/feelink.svg'
import Showcase from '../assets/dummy_showcase.mp4'
import { AlignJustify, X } from 'lucide-react'

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [menuOpen])

  return (
    <div className={`bg-secondary text-primary min-h-screen flex flex-col relative ${menuOpen ? 'overflow-hidden' : ''}`}>
      
      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Header */}
      <header className="top-0 left-0 right-0 bg-secondary flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full z-50">
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Feelink Logo"
            className="w-10 h-10"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <Link to="/" className="hover:underline">HOME</Link>
          <a href="#how" className="hover:underline">HOW IT WORKS</a>
          <a href="#about" className="hover:underline">ABOUT US</a>
          <Link
            to="/login"
            className="bg-primary text-secondary px-4 py-2 rounded transition-colors duration-300"
          >
            Login
          </Link>
        </nav>

      {/* Hamburger / Close Icon */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <AlignJustify size={24} />}
      </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed top-16 left-0 w-full bg-secondary px-6 pb-12 text-base font-semibold z-50 transition-all duration-300"
        >
          <Link
            to="/"
            className="block py-2 rounded hover:bg-secondary-darker transition-colors duration-300 ease-in-out text-center mx-auto text-xl"
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </Link>
          <a
            href="#how"
            className="block py-2 rounded hover:bg-secondary-darker transition-colors duration-300 ease-in-out text-center mx-auto text-xl"
            onClick={() => setMenuOpen(false)}
          >
            HOW IT WORKS
          </a>
          <a
            href="#about"
            className="block py-2 rounded hover:bg-secondary-darker transition-colors duration-300 ease-in-out text-center mx-auto text-xl"
            onClick={() => setMenuOpen(false)}
          >
            ABOUT US
          </a>
          <Link
            to="/login"
            className="block bg-primary text-secondary px-4 py-2 rounded hover:bg-primary/90 transition w-fit mx-auto mt-8"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-auto h-full pt-12 md:pt-24 pb-24 md:pb-48">
        <div className="relative z-10 space-y-8 max-w-[900px] mx-auto text-center md:text-left px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie quis velit nec scelerisque. Morbi non lacinia nulla.
          </h1>
          <Link
            to="/signup"
            className="inline-block bg-primary text-secondary px-6 py-2 rounded hover:bg-primary/90 transition text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Description Section */}
      <section id="description" className="bg-primary text-secondary px-6 py-32">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2">
            <div className="bg-accent rounded-lg h-48 sm:h-64 w-full"></div>
          </div>
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              molestie quis velit nec scelerisque. Morbi non lacinia nulla.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="text-center px-6 py-24 my-24 mx-auto space-y-24">
        <div className='max-w-2xl mx-auto space-y-4'>
          <h2 className="text-2xl md:text-3xl font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h2>
          <p className="text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie
            quis velit nec scelerisque. Morbi non lacinia nulla.
          </p>
        </div>
        <div className="max-w-[900px] shadow-2xl rounded-lg overflow-hidden">
          <video
            src={Showcase}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-secondary px-6 md:px-24 py-12 h-[500px] place-content-center">
        <div className="max-w-6xl lg:mx-auto flex flex-col-reverse md:flex-row justify-between gap-15">
          <div>
            <img src={Logo} alt="Feelink Logo" className="w-12 h-12 mb-24" />
            <div className="space-y-2">
              <p className="text-sm">All rights reserved</p>
              <p className="text-sm">Follow us on socials</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <Link to="" className="hover:underline cursor-pointer">HOME</Link>
            <a href="#how" className="hover:underline cursor-pointer">HOW IT WORKS</a>
            <a href="#about" className="hover:underline cursor-pointer">ABOUT US</a>
            <Link to="" className="hover:underline cursor-pointer">TERMS OF SERVICE</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
