import Logo from '../assets/feelink.svg';

const Loading = () => (
  <div className="fixed top-5 left-5 z-50">
    <div className="w-12 h-12 border-6 border-transparent border-t-transparent rounded-full animate-spin">
    <img src={Logo} alt="Loading"/>
    </div>
  </div>
);

export default Loading;