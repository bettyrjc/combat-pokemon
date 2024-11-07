/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

type LazyImageProps = {
  url: string;  
  name: string;
};

const LazyImage = ({ url, name }: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(imgRef.current!);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div ref={imgRef}>
      {isVisible ? (
        <figure className="flex items-center justify-center w-52 h-52">
          <img 
            src={url} 
            alt={name} 
            loading="lazy" 
            className="w-52 h-52" 
          />
        </figure>
      ) : (
        <div className="w-52 h-52 skeleton bg-orange-50" />
      )}
    </div>
  );
};

export default LazyImage;