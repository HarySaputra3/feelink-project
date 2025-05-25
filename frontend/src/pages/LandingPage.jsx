import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex flex-row">
          <li>
            <Link to="/" className="px-6 py-4 hover:bg-gray-900">Home</Link>
          </li>
          <li>
            <Link to="/login" className="px-6 py-4 hover:bg-gray-900">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="px-6 py-4 hover:bg-gray-900">Signup</Link>
          </li>
        </ul>
      </nav>
      <div>LandingPage</div>
    </>
  )
}

export default LandingPage