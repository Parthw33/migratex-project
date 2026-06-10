import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'site-bg': '#050a18',
        'card-bg': '#0d1425',
        'element-bg': '#1e293b',
        'primary': '#3b82f6',
        'primary-dark': '#2563eb',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'text-dimmed': '#475569',
        'border-subtle': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'container': '900px',
      },
    },
  },
  plugins: [],
}
export default config