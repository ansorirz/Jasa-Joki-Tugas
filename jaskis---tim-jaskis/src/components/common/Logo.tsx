import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gradient';
  showSubbrand?: boolean;
  subbrandText?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'gradient',
  showSubbrand = true,
  subbrandText = 'TIM JASKIS',
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const subtextSizes = {
    sm: 'text-[8px]',
    md: 'text-[10.5px]',
    lg: 'text-[12px]',
    xl: 'text-[13px]'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Mark: Stylized J / Music Note Badge matching image.png */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm transition-transform group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="jaskisLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="jaskisLogoDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>

          {/* Rounded Squircle Badge */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            rx="28"
            fill={variant === 'dark' ? 'url(#jaskisLogoDarkGrad)' : 'url(#jaskisLogoGrad)'}
          />

          {/* White 'j' / Note Symbol with hole */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 58 28 H 42 V 52 C 42 48.5 37.5 46 32 46 C 22.5 46 15 53.5 15 63 C 15 72.5 22.5 80 32 80 C 41.5 80 49 72.5 49 63 V 44 H 58 V 28 Z M 30 72 C 25.5 72 22 68.5 22 64 C 22 59.5 25.5 56 30 56 C 34.5 56 38 59.5 38 64 C 38 68.5 34.5 72 30 72 Z"
            fill="#FFFFFF"
          />

          {/* Top-Right Square Pixel Accent */}
          <rect x="62" y="28" width="18" height="18" rx="4" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black uppercase tracking-tight font-montserrat ${textSizes[size]} ${
            variant === 'dark'
              ? 'text-white'
              : 'text-black dark:text-white'
          }`}
        >
          JASKIS
        </span>
        {showSubbrand && (
          <span
            className={`font-extrabold uppercase tracking-[0.2em] mt-1 font-poppins ${subtextSizes[size]} ${
              variant === 'dark'
                ? 'text-indigo-200'
                : 'text-indigo-600'
            }`}
          >
            {subbrandText}
          </span>
        )}
      </div>
    </div>
  );
};


