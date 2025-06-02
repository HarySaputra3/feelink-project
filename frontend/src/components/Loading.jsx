import Logo from '../assets/feelink.svg';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-12 h-12 border-6 border-transparent border-t-transparent rounded-full animate-spin">
        <img src={Logo} alt="Loading" />
      </div>
    </div>
  )
}

export default Loading;