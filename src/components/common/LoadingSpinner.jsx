import { ClipLoader } from 'react-spinners';

export default function LoadingSpinner({ fullPage = false, size = 50, color = "#465542" }) {
  return (
    <div className={`flex justify-center items-center ${fullPage ? 'min-h-[60vh]' : 'py-10'}`}>
      <ClipLoader 
        color={color}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
