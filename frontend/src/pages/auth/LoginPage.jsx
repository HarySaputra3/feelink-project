import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen'>
        <Link to="/" className='px-4 py-2 bg-gray-100 hover:bg-gray-200'>{'<'}</Link>
        <div>LoginPage</div>
        <Link to="/dashboard" className="px-4 py-2 bg-gray-100 hover:bg-gray-200">Login</Link>
      </main>
    </>
  )
}

export default LoginPage