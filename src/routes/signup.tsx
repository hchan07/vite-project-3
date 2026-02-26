import { createFileRoute } from '@tanstack/react-router';
import Signup from '../Signup';

export const Route = createFileRoute('/signup')({
  component: Signup,
});
