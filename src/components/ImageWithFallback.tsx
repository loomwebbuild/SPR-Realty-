import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  overlay?: boolean;
  overlayClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  overlay = false,
  overlayClass = 'bg-gradient-to-t from-black/85 via-black/40 to-black/20',
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#1E2024] ${className}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1E2024] to-[#141518] text-[#8C909A] p-6 text-center">
          <svg
            className="w-10 h-10 mb-3 text-[#105652] opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m7.5-18v18M2.25 9h19.5m-19.5 6h19.5"
            />
          </svg>
          <span className="text-xs tracking-widest uppercase font-mono text-[#A0A4AE]">
            SPR Realty · Chennai
          </span>
        </div>
      )}

      {overlay && (
        <div
          className={`absolute inset-0 pointer-events-none ${overlayClass}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
