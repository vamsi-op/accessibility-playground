import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

const mockMatchMedia = (matches: boolean) => {
    let listeners: ((e: { matches: boolean }) => void)[] = [];
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches,
            media: query,
            onchange: null,
            addEventListener: vi.fn((event, listener) => {
                if (event === 'change') {
                    listeners.push(listener);
                }
            }),
            removeEventListener: vi.fn((event, listener) => {
                if (event === 'change') {
                    listeners = listeners.filter(l => l !== listener);
                }
            }),
            dispatchEvent: vi.fn((event: Event) => {
                if (event.type === 'change') {
                    // This is a simplified dispatch for testing purposes
                    listeners.forEach(listener => listener({ matches }));
                }
                return true;
            }),
        })),
    });
    return {
        simulateChange: (newMatches: boolean) => {
            matches = newMatches;
            listeners.forEach(listener => listener({ matches }));
        }
    };
};


describe('ThemeToggle', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        vi.clearAllMocks();
    });

    test('initializes with system theme (light)', () => {
        mockMatchMedia(false);
        render(<ThemeToggle />);
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
        expect(screen.getByText(/theme set to system preference \(light mode\)/i)).toBeInTheDocument();
    });

    test('initializes with system theme (dark)', () => {
        mockMatchMedia(true);
        render(<ThemeToggle />);
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
        expect(screen.getByText(/theme set to system preference \(dark mode\)/i)).toBeInTheDocument();
    });

    test('initializes with theme from localStorage', () => {
        mockMatchMedia(false);
        localStorage.setItem('theme', 'dark');
        render(<ThemeToggle />);
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(screen.getByRole('button', { name: /switch to system preference/i })).toBeInTheDocument();
        expect(screen.getByText(/theme set to dark mode/i)).toBeInTheDocument();
    });

    test('toggles through themes and persists to localStorage', () => {
        mockMatchMedia(false);
        render(<ThemeToggle />);
        const button = screen.getByRole('button');

        // Initial: system (light) -> click -> light
        fireEvent.click(button);
        expect(localStorage.getItem('theme')).toBe('light');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(button).toHaveAccessibleName('Switch to dark mode');
        expect(screen.getByText(/theme set to light mode/i)).toBeInTheDocument();

        // light -> click -> dark
        fireEvent.click(button);
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(button).toHaveAccessibleName('Switch to system preference');
        expect(screen.getByText(/theme set to dark mode/i)).toBeInTheDocument();

        // dark -> click -> system
        fireEvent.click(button);
        expect(localStorage.getItem('theme')).toBe('system');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light'); // Assumes system is light
        expect(button).toHaveAccessibleName('Switch to light mode');
        expect(screen.getByText(/theme set to system preference \(light mode\)/i)).toBeInTheDocument();
    });

    test('responds to system theme changes', () => {
        const { simulateChange } = mockMatchMedia(false); // Start with light
        render(<ThemeToggle />);
        
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');

        act(() => {
            simulateChange(true); // Change system to dark
        });

        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(screen.getByText(/system preference changed to dark mode/i)).toBeInTheDocument();
    });
});