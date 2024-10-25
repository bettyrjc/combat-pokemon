import { useEffect, useRef, useState } from 'react';
import { httpInstance } from '../../../assets/api';
import { PokemonDetail } from '../../interfaces/Pokemons.interface';

const LazyImage = ({ url, name }: PokemonDetail) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);
  //optimazed this -separe for more readability
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // do the petition only when the image is in viewport
          const response = await httpInstance.get(url);
          const pokemonDetail = await response.data;
          setImageSrc(pokemonDetail.sprites.other.dream_world.front_default);
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
        <figure className="flex items-center justify-center w-52 h-52">
          <img src={imageSrc} alt={name} loading="lazy" className="w-52 h-52" />
        </figure>
      ) : (
        <div className="w-52 h-52 skeleton bg-orange-50"></div> // show a loading message while the image is loading
      )}
    </div>
  );
};

export default LazyImage;
