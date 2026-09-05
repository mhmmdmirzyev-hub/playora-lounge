/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink:    { 950:'#050509', 900:'#0a0a12', 800:'#13131f', 700:'#1c1c2e' },
        blue:   { 300:'#93c5fd', 400:'#60a5fa', 500:'#3b82f6', 600:'#2563eb' },
        violet: { 300:'#c4b5fd', 400:'#a78bfa', 500:'#8b5cf6', 600:'#7c3aed' },
        cyan:   { 300:'#67e8f9', 400:'#22d3ee', 500:'#06b6d4' },
        pink:   { 400:'#f472b6', 500:'#ec4899', 600:'#db2777' },
        base:   { 900:'#0b0c14' }
      },
      fontFamily: {
        display: ['Rajdhani','ui-sans-serif','system-ui','sans-serif'],
        body: ['"Plus Jakarta Sans"','ui-sans-serif','system-ui','sans-serif']
      }
    }
  },
  plugins: []
};
