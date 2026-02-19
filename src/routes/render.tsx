import { createFileRoute } from '@tanstack/react-router';
import Render from '../Render';


export const Route = createFileRoute('/render')({
  component: Render,
});

