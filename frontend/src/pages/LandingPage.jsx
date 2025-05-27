import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/feelink.svg'

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-secondary text-primary min-h-screen flex flex-col gap-24">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
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
            className="bg-primary text-secondary px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            Login
          </Link>
        </nav>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pb-4 space-y-2 text-sm font-semibold"
        >
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>HOME</Link>
          <a href="#how" className="block hover:underline" onClick={() => setMenuOpen(false)}>HOW IT WORKS</a>
          <a href="#about" className="block hover:underline" onClick={() => setMenuOpen(false)}>ABOUT US</a>
          <Link
            to="/login"
            className="block bg-primary text-secondary px-4 py-2 rounded hover:bg-blue-900 transition w-fit"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto h-full my-24">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl font-bold leading-snug">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie quis velit nec scelerisque. Morbi non lacinia nulla.
          </h1>
          <Link
            to="/signup"
            className="inline-block bg-primary text-secondary px-6 py-2 rounded hover:bg-blue-900 transition text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section id="description" className="bg-primary text-secondary px-6 py-16">
        <div className="h-[400px] flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-12">
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
      <section id="how" className="text-center px-6 py-12 mx-auto space-y-4">
        <div className='max-w-2xl mx-auto space-y-4'>
          <h2 className="text-2xl md:text-3xl font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h2>
          <p className="text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie
            quis velit nec scelerisque. Morbi non lacinia nulla.
          </p>
        </div>
        <div className="my-12 mx-auto bg-accent rounded-lg shadow-md w-full max-w-[900px] min-h-[200px] flex items-center justify-center text-lg sm:text-xl font-bold">
          showcase
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-secondary px-6 md:px-24 py-12 h-[500px] place-content-center">
        <div className="max-w-6xl lg:mx-auto flex flex-col-reverse md:flex-row justify-between gap-15">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <img src={Logo} alt="Feelink Logo" className="w-12 h-12" />
            </div>
            <p className="text-sm">All rights reserved</p>
            <p className="text-sm">Follow us on socials</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="hover:underline cursor-pointer">HOME</p>
            <p className="hover:underline cursor-pointer">HOW IT WORKS</p>
            <p className="hover:underline cursor-pointer">ABOUT US</p>
            <p className="hover:underline cursor-pointer">TERMS OF SERVICE</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage