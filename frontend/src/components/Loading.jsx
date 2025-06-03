import Logo from '../assets/feelink.svg';

const Loading = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-12 h-12 border-6 border-transparent border-t-transparent rounded-full animate-spin">
      <img src={Logo} alt="Loading" />
    </div>
  )
}

export default Loading;