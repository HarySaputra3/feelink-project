import { LoaderCircle } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center text-accent-lighter text-secondary-lighter">
      <div className="animate-spin flex items-center justify-center">
        <LoaderCircle />
        {/* <img src={Logo} alt="Loading" /> */}
      </div>
    </div>
  );
};

export default Loading;