/** @type {import('tailwindcss').Config} */
export default {
    content: ["index.html", "./src/**/*.{jsx,js}"],
    theme: {
        extend: {
            height: {
                360: "360px",
            },
            width: {
                270: "270px",
            },
        },
        fontFamily:{
            rob:['Inter', 'sans-serif']
        }
    },
    plugins: [],
};
