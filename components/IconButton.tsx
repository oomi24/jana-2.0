
import React from 'react';

interface IconButtonProps {
  icon: string;
  onClick: () => void;
  label?: string;
  colorClass?: string;
  pulse?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, label, colorClass = "bg-pink-500", pulse }) => {
  return (
    <button
      onClick={onClick}
      className={`${colorClass} ${pulse ? 'animate-pulse' : ''} active:scale-95 transition-all text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex flex-col items-center justify-center gap-0.5 border-4 border-white flex-shrink-0`}
    >
      <i className={`fas ${icon} text-lg md:text-xl`}></i>
      {label && <span className="text-[8px] font-bold uppercase">{label}</span>}
    </button>
  );
};

export default IconButton;
