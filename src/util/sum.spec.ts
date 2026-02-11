import sum from './sum.ts';

describe('sum', () => {
	it('add two numbers correctly', () => {
		expect(sum(1,2)).toBe(3);
	});
});