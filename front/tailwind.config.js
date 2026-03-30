/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                kinr: {
                    primary: '#53FC18',
                    secondary: '#53FC18',
                    accent: '#53FC18',
                    neutral: '#1f232b',
                    'base-100': '#282a36',
                    'base-200': '#1e1f29',
                    'base-300': '#16171e',
                    'base-content': '#f8f8f2',
                    info: '#8be9fd',
                    success: '#50fa7b',
                    warning: '#f1fa8c',
                    error: '#ff5555',
                },
            },
        ],
    },
};
