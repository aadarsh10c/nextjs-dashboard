import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDateToLocal, generateYAxis, generatePagination } from './utils';

describe('formatCurrency', () => {
    it('should format number to USD currency', () => {
        expect(formatCurrency(123456)).toBe('$1,234.56');
    });
});

describe('formatDateToLocal', () => {
    it('should format date string to local date format', () => {
        expect(formatDateToLocal('2023-10-05')).toBe('Oct 5, 2023');
    });

    it('should format date string to local date format with custom locale', () => {
        expect(formatDateToLocal('2023-10-05', 'de-DE')).toBe('5. Okt. 2023');
    });
});

describe('generateYAxis', () => {
    it('should generate y-axis labels based on revenue data', () => {
        const revenue = [
            { month: 'January', revenue: 5000 },
            { month: 'February', revenue: 10000 },
            { month: 'March', revenue: 15000 },
        ];
        const { yAxisLabels, topLabel } = generateYAxis(revenue);
        expect(yAxisLabels).toEqual(['$15K', '$14K', '$13K', '$12K', '$11K', '$10K', '$9K', '$8K', '$7K', '$6K', '$5K', '$4K', '$3K', '$2K', '$1K', '$0K']);
        expect(topLabel).toBe(15000);
    });
});

describe('generatePagination', () => {
    it('should generate pagination for total pages less than or equal to 7', () => {
        expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should generate pagination for current page among first 3 pages', () => {
        expect(generatePagination(2, 10)).toEqual([1, 2, 3, '...', 9, 10]);
    });

    it('should generate pagination for current page among last 3 pages', () => {
        expect(generatePagination(9, 10)).toEqual([1, 2, '...', 8, 9, 10]);
    });

    it('should generate pagination for current page in the middle', () => {
        expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
    });
});