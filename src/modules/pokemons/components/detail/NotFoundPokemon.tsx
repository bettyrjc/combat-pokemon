import { Link } from "react-router-dom";

interface NotFoundPokemonProps {
  error: string;
}

const NotFoundPokemon: React.FC<NotFoundPokemonProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full">
      <h1 className="text-2xl text-primary">No se encontro este pokemon</h1>
      <p className="text-gray-400">Error: {error}</p>
      <Link to="/" className="underline text-secondary">Volver a la lista</Link>
    </div>
  )
}

export default NotFoundPokemon