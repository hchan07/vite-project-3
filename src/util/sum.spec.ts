import sum from './sum.ts';
import React from 'react';

describe('sum', () => {
	it('add two numbers correctly', () => {
		expect(sum(1, 2)).toBe(3);
	});
});
