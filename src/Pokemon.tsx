import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';


const fetchPokemon = async(id:number) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, 
		{
			'headers': {
			'content-type': 'application/json',    
		},
		'method': 'GET',
		}
	);

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	

	return response.json();
};

const usePokemon = (id:number) => {
	return useQuery({
		queryKey: [id],
		queryFn: () => fetchPokemon(id),
		staleTime: 1000 * 60 * 5
	});
};


const Pokemon = () => {
	const { id } = useParams({ from: '/pokemon/$id' });
	const pokemonId = Number(id);
	const {data, error, isLoading, isFetching} = usePokemon(pokemonId);
	
	if (isLoading) {
		return (<div>loading</div>);
	}

	if (isFetching) {
		return(<div>fetching</div>);
	}

	if (error) {
		return (
			<div>
				<p>
					error, try <Link className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline decoration-transparent hover:decoration-blue-800 underline-offset-4" to="/pokemon/$id" params={{ id: '1' }}>View first pokemon</Link>
				</p>
			</div>
			);
	}

	if (data) {
		const {
			name,
			id,
			sprites: {
				front_default
			}
		} = data;

		const nextPokemonId = pokemonId + 1;
		const previousPokemonId = pokemonId - 1;


		return (
		<div>
			<h2>{name}</h2>
			<h3>{id}</h3>
			<img src={front_default} />

			<div>
				 
				 {previousPokemonId > 0 && <Link className="block text-blue-600 hover:text-blue-800 transition-colors duration-200 underline decoration-transparent hover:decoration-blue-800 underline-offset-4" to="/pokemon/$id" params={{ id: previousPokemonId.toString() }}>Previous pokemon</Link>}
				 {nextPokemonId && <Link className="block text-blue-600 hover:text-blue-800 transition-colors duration-200 underline decoration-transparent hover:decoration-blue-800 underline-offset-4" to="/pokemon/$id" params={{ id: nextPokemonId.toString() }}>Next pokemon</Link>}
			</div>
		</div>);
	}

	return <></>;
};

export default Pokemon;