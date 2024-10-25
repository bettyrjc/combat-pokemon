/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useRef, useState } from 'react';
import { httpInstance } from '../../../assets/api';
import { PokemonDetail } from '../../interfaces/Pokemons.interface';

const LazyImage = ({ url, name }: PokemonDetail) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // do the petition only when the image is in viewport
          const response = await httpInstance.get(url);
          const pokemonDetail = await response.data;
          setImageSrc(pokemonDetail.sprites.front_default);
          observer.unobserve(imgRef.current!); // stop to observer when image is loaded
        }
      },
      {
        threshold: 0.1, // 10% of the image is visible
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [url]);

  return (
    <div ref={imgRef}>
      {imageSrc ? (
        <img src={imageSrc} alt={name} loading="lazy" />
      ) : (
        <p>Loading...</p> // show a loading message while the image is loading
      )}
    </div>
  );
};

export default LazyImage;
