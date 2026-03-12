import { createFileRoute } from '@tanstack/react-router';
import Wordle from '../Wordle';

export const Route = createFileRoute('/wordle')({
	component: Wordle,
});
