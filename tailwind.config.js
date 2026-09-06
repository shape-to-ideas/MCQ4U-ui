/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2e3f22',
                    50: '#f2f5ee',
                    100: '#e1e8d6',
                    200: '#c3d1ad',
                    300: '#a5ba85',
                    400: '#87a35c',
                    500: '#5f7a3c',
                    600: '#47602d',
                    700: '#2e3f22',
                    800: '#232f1a',
                    900: '#181f11',
                },
                secondary: {
                    DEFAULT: '#b2d66a',
                    50: '#f6fbec',
                    100: '#ebf5d3',
                    200: '#d9edac',
                    300: '#b2d66a',
                    400: '#9cc74a',
                    500: '#82ab36',
                    600: '#64842a',
                },
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
