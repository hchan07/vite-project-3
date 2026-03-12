import sum from './sum.ts';

describe('sum', () => {
	it('add two numbers correctly', () => {
		const test = 'test';
		expect(sum(1, 2)).toBe(3);
	});
});
