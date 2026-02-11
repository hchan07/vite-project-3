import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
	it('Should render component', () => {
		render(<Header />);
		expect(screen.getByText(/header/i)).toBeInTheDocument();
	})
})




