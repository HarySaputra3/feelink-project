import Logo from '../assets/feelink.svg';

const GlobalLoading = () => {
  return (
    <div className="flex items-center justify-center text-accent-lighter">
      <div className="animate-spin flex items-center justify-center">
        <img src={Logo} alt="Loading" />
      </div>
    </div>
  );
};

export default GlobalLoading;