import React, { useState, useEffect, useCallback } from 'react';
import './ThemeToggle.css';

type Theme = 'light' | 'dark' | 'system';

const themeIcons: Record<Theme, string> = {
    light: '☀️',
    dark: '🌙',
    system: '💻',
};

const themeLabels: Record<Theme, string> = {
    light: 'Switch to dark mode',
    dark: 'Switch to system preference',
    system: 'Switch to light mode',
};

const themeSequence: Theme[] = ['light', 'dark', 'system'];

export const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('system');
    const [statusMessage, setStatusMessage] = useState('');

    const applyTheme = useCallback((t: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', t);
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        const initialTheme = storedTheme || 'system';
        setTheme(initialTheme);

        if (initialTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            setStatusMessage(`Theme set to system preference (${systemTheme} mode).`);
        } else {
            applyTheme(initialTheme);
            setStatusMessage(`Theme set to ${initialTheme} mode.`);
        }
    }, [applyTheme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
                const newColorScheme = e.matches ? 'dark' : 'light';
                applyTheme(newColorScheme);
                setStatusMessage(`System preference changed to ${newColorScheme} mode.`);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [applyTheme]);

    const handleToggle = () => {
        const currentIndex = themeSequence.indexOf(theme);
        const nextTheme = themeSequence[(currentIndex + 1) % themeSequence.length];
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);

        if (nextTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            setStatusMessage(`Theme set to system preference (${systemTheme} mode).`);
        } else {
            applyTheme(nextTheme);
            setStatusMessage(`Theme set to ${nextTheme} mode.`);
        }
    };

    return (
        <>
            <button
                className="theme-toggle"
                onClick={handleToggle}
                aria-label={themeLabels[theme]}
                title={themeLabels[theme]}
            >
                {themeIcons[theme]}
            </button>
            <div aria-live="polite" aria-atomic="true" className="visually-hidden">
                {statusMessage}
            </div>
        </>
    );
};