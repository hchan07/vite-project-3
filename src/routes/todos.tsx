import { createFileRoute } from '@tanstack/react-router';
import Todos from '../Todos';

export const Route = createFileRoute('/todos')({
  component: Todos,
});

