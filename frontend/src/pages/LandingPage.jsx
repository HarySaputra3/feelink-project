import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/feelink.svg"
import { AlignJustify, X } from "lucide-react"
import Menggila from "../components/_menggila"
import { motion, AnimatePresence, useInView } from "framer-motion"
import GlobalModal from "../components/ModalLight"

const ScrollFadeIn = ({ children, custom = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: custom * 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const hero = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie quis velit nec scelerisque. Morbi non lacinia nulla."

  // Lazy-load video when in view
  const videoRef = useRef(null)
  const videoInView = useInView(videoRef, { once: true })
  const [showVideo, setShowVideo] = useState(false)
  const [Showcase, setShowcase] = useState(null)
  const [modalOrigin, setModalOrigin] = useState(null);
  const [modalContentType, setModalContentType] = useState(null);

  const handleOpenModal = (e, type) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setModalOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setModalContentType(type);
  };

  useEffect(() => {
    if (videoInView && !Showcase) {
      import('../assets/dummy_showcase.mp4').then(mod => {
        setShowcase(mod.default)
        setShowVideo(true)
      })
    }
  }, [videoInView, Showcase])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [menuOpen])

  return (
    <div className={`bg-secondary text-primary min-h-screen flex flex-col relative ${menuOpen ? 'overflow-hidden' : ''}`}>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            className="fixed inset-0 bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="top-0 left-0 right-0 z-30 fixed w-full bg-secondary shadow-md">  
        <div className='bg-secondary flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full '>
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Feelink Logo" className="w-10 h-10" />
          </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <Menggila />
          <Link to="/" className="hover:underline">HOME</Link>
          <a href="#how" className="hover:underline">HOW IT WORKS</a>
          <a onClick={(e) => handleOpenModal(e, 'about')} className="hover:underline cursor-pointer">ABOUT US</a>
          <Link to="/login" className="bg-primary text-secondary px-4 py-2 rounded">Login</Link>
        </nav>

          {/* Toggle Mobile Menu Button */}
          <button className="md:hidden cursor-pointer" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <AlignJustify size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="md:hidden fixed top-18 left-0 w-full bg-secondary px-6 pb-12 text-base font-semibold z-20"
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            exit={{ y: -300 }}
            transition={{ duration: 0.15 }}
          >
            <Link to="/" className="block py-2 text-center text-xl" onClick={() => setMenuOpen(false)}>HOME</Link>
            <a href="#how" className="block py-2 text-center text-xl" onClick={() => setMenuOpen(false)}>HOW IT WORKS</a>
            <a href="#about" className="block py-2 text-center text-xl" onClick={() => setMenuOpen(false)}>ABOUT US</a>
            <Link to="/login" className="block bg-primary text-secondary px-4 py-2 rounded w-fit mx-auto mt-8" onClick={() => setMenuOpen(false)}>Login</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[70vh] pt-24 md:pt-24 pb-24 md:pb-48 px-6">
        <div className="relative space-y-8 max-w-[900px] mx-auto text-center md:text-left px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-snug flex flex-wrap gap-x-3 text-pretty text-center md:text-left">
            {hero.split(' ').map((word, i) => (
              <ScrollFadeIn key={i} custom={i}>
                <span className="inline-block">{word}</span>
              </ScrollFadeIn>
            ))}
          </h1>
          <ScrollFadeIn custom={hero.split(' ').length}>
            <Link to="/signup" className="inline-block bg-primary text-secondary px-6 py-2 rounded text-sm sm:text-base">
              Sign Up
            </Link>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Description Section */}
      <section id="description" className="bg-primary text-secondary px-6 py-32">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2">
            <ScrollFadeIn custom={2}>
              <div className="bg-secondary-darker rounded-lg h-48 sm:h-64 w-full"></div>
            </ScrollFadeIn>
          </div>
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <ScrollFadeIn custom={3}>
              <h2 className="text-2xl font-bold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </h2>
            </ScrollFadeIn>
            <ScrollFadeIn custom={4}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie quis velit nec scelerisque. Morbi non lacinia nulla.
              </p>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="text-center px-6 py-24 my-24 mx-auto space-y-24">
        <div className="max-w-2xl mx-auto space-y-4">
          <ScrollFadeIn custom={2}>
            <h2 className="text-2xl md:text-3xl font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h2>
          </ScrollFadeIn>
          <ScrollFadeIn custom={3}>
            <p className="text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie quis velit nec scelerisque. Morbi non lacinia nulla.
            </p>
          </ScrollFadeIn>
        </div>
        <ScrollFadeIn custom={4}>
          <div
            className="max-w-[900px] shadow-2xl rounded-lg overflow-hidden"
            ref={videoRef}
          >
            {showVideo && Showcase ? (
              <video
                src={Showcase}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <div className="w-full h-[360px] flex items-center justify-center rounded-lg bg-secondary-darker" />
            )}
          </div>
        </ScrollFadeIn>
      </section>

      <GlobalModal open={!!modalOrigin} origin={modalOrigin} onClose={() => {
        setModalOrigin(null);
        setModalContentType(null);
      }}>
        {modalContentType === 'about' && (
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p>Ware ware wa ningen de aru</p>
          </div>
        )}
        {modalContentType === 'privacy' && (
          <div className="text-left space-y-6 max-h-[70vh] overflow-y-auto text-sm md:text-base px-4">
            <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
            <p>At <strong>Feelink</strong>, we value your privacy. This policy outlines how we collect, use, and protect your data when using our mood tracking app and services.</p>

            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Story Content:</strong> The text you submit for emotional analysis.</li>
              <li><strong>Emotional Results:</strong> Emotions returned by our ML model based on your story.</li>
              <li><strong>User Metadata:</strong> User ID (for associating data with your account), timestamps, and related data.</li>
            </ul>

            <h2 className="text-xl font-semibold">2. How We Use Your Data</h2>
            <p>We use your data to analyze mood patterns, store entries for reflection, and display visual insights in your dashboard. We do <strong>not</strong> sell or share your personal data with third parties for advertising.</p>

            <h2 className="text-xl font-semibold">3. Data Security</h2>
            <p>Your data is securely stored in our database. Access is restricted and authenticated to protect against misuse.</p>

            <h2 className="text-xl font-semibold">4. Machine Learning Privacy</h2>
            <p>Stories are sent to an internal ML model endpoint for analysis. This endpoint is private and not exposed publicly.</p>

            <h2 className="text-xl font-semibold">5. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your data</li>
              <li>Request deletion of mood entries</li>
              <li>Withdraw consent to processing</li>
            </ul>
          </div>
        )}
      </GlobalModal>

      {/* Footer */}
      <footer className="bg-primary text-secondary px-6 md:px-24 py-12 h-[500px] place-content-center">
        <div className="max-w-6xl lg:mx-auto flex flex-col-reverse md:flex-row justify-between gap-15">
          <div>
            <img src={Logo} alt="Feelink Logo" className="w-12 h-12 mb-24" />
            <div className="space-y-2 text-sm">
              <p>&copy; 2025 Feelink | All rights reserved</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <Link to="" className="hover:underline cursor-pointer">HOME</Link>
            <a href="#how" className="hover:underline cursor-pointer">HOW IT WORKS</a>
            <a onClick={(e) => handleOpenModal(e, 'about')} className="hover:underline cursor-pointer">ABOUT US</a>
            <a onClick={(e) => handleOpenModal(e, 'privacy')} className="hover:underline cursor-pointer">PRIVARY POLICY</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
