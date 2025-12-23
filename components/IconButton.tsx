
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
      className={`${colorClass} ${pulse ? 'animate-pulse' : ''} active:scale-95 transition-all text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg flex flex-col items-center justify-center gap-1 border-4 border-white`}
    >
      <i className={`fas ${icon} text-xl md:text-2xl`}></i>
      {label && <span className="text-[10px] font-bold uppercase">{label}</span>}
    </button>
  );
};

export default IconButton;
