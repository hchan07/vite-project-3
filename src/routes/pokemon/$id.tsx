import { createFileRoute } from '@tanstack/react-router';
import Pokemon from '../../Pokemon';

export const Route = createFileRoute('/pokemon/$id')({
	component: Pokemon,
});