'use client'

import React from 'react'
import Image, { ImageProps } from 'next/image'

const ALLOWED_DOMAINS = [
  'localhost',
  'prestige-realty.s3.amazonaws.com',
  'images.unsplash.com',
  'bgcpmratuuggjhlnmlxp.supabase.co'
]

const ALLOWED_WILDCARDS = [
  'bing.net',
  'unsplash.com',
  'amazonaws.com',
  'googleusercontent.com',
  'yahoo.com',
  'rediff.com'
]

function isConfiguredImageDomain(url: string | undefined): boolean {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('data:') || url.startsWith('.')) return true;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    
    if (ALLOWED_DOMAINS.includes(hostname)) return true;
    
    return ALLOWED_WILDCARDS.some(domain => hostname === domain || hostname.endsWith('.' + domain));
  } catch (e) {
    return false;
  }
}

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | undefined;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop',
  alt = '',
  fill,
  className,
  style,
  ...props
}: SafeImageProps) {
  const targetSrc = src || fallbackSrc;
  const [imgSrc, setImgSrc] = React.useState<string>(targetSrc);
  const [useFallbackTag, setUseFallbackTag] = React.useState<boolean>(false);

  // Determine whether to use standard <img> tag or next/image
  React.useEffect(() => {
    const activeSrc = src || fallbackSrc;
    setImgSrc(activeSrc);
    if (!isConfiguredImageDomain(activeSrc)) {
      setUseFallbackTag(true);
    } else {
      setUseFallbackTag(false);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      if (!isConfiguredImageDomain(fallbackSrc)) {
        setUseFallbackTag(true);
      }
    }
  };

  if (useFallbackTag) {
    // Return standard img tag for non-configured domains to prevent next/image runtime crashes
    return (
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        style={fill ? { objectFit: className?.includes('cover') ? 'cover' : 'contain', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 } : style}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      fill={fill}
      className={className}
      style={style}
      src={imgSrc}
      onError={handleError}
    />
  );
}
