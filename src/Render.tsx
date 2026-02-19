import { useQuery } from "@tanstack/react-query";


const fetchRender = async() => {
	const response = await fetch(import.meta.env.VITE_API_URL, 
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

const useRender = () => {
	return useQuery({
		queryKey: ['render'],
		queryFn: fetchRender,
		staleTime: 1000 * 60 * 5
	});
};


const Render = () => {
	const {data, error, isLoading, isFetching} = useRender();
	
	if (isLoading) {
		return (<div>loading</div>);
	}

	if (isFetching) {
		return(<h3>fetching</h3>);
	}

	if (error) {
		return (
			<h3>Error</h3>
			);
	}

	if (data) {
		const {
			fruits
		} = data;

		
		return (
			<>
			<h1 className="font-bold text-lg underline first-letter:uppercase mb1">fruits</h1>
		<ul>
			{
				fruits.map( (fruit: string) => {
					return <li key={fruit}>{fruit}</li>
				})
			}
		</ul>
		</>
		);
	}

	return <></>;
};

export default Render;