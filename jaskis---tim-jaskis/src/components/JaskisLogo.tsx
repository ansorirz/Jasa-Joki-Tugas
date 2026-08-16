import React from 'react';

interface JaskisLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gradient';
  showSubbrand?: boolean;
}

export const JaskisLogo: React.FC<JaskisLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'gradient',
  showSubbrand = true,
}) => {
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
    xl: 'h-14',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tight',
    xl: 'text-3xl tracking-tight',
  };

  const subTextSizeClasses = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-[12px]',
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold select-none ${className}`}>
      {/* JASKIS Geometric Emblem Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]} aspect-square`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <linearGradient id="jaskisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="jaskisDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>

          {/* Background rounded squircle */}
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            rx="24"
            fill={variant === 'dark' ? 'url(#jaskisDarkGrad)' : 'url(#jaskisGrad)'}
          />

          {/* Geometric J Symbol */}
          <path
            d="M 58 26 L 74 26 L 74 42 L 58 42 L 58 54 L 42 54 L 42 38 L 58 38 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <path
            d="M 58 42 L 58 66 C 58 72 52 76 44 76 C 36 76 28 70 28 62 C 28 54 36 48 46 48 L 46 60 C 42 60 38 62 38 64 C 38 66 41 68 44 68 C 47 68 50 66 50 62 L 50 42 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold ${textSizeClasses[size]} ${
            variant === 'dark'
              ? 'text-white'
              : 'text-gray-900'
          }`}
        >
          JASKIS
        </span>
        {showSubbrand && (
          <span
            className={`font-bold ${subTextSizeClasses[size]} tracking-widest uppercase mt-0.5 ${
              variant === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
            }`}
          >
            TIM JASKIS
          </span>
        )}
      </div>
    </div>
  );
};
