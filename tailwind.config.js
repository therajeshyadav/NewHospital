@@ .. @@
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
+      colors: {
+        // Healthcare color palette
+        medical: {
+          50: '#f0f9ff',
+          100: '#e0f2fe',
+          200: '#bae6fd',
+          300: '#7dd3fc',
+          400: '#38bdf8',
+          500: '#0ea5e9',
+          600: '#0284c7',
+          700: '#0369a1',
+          800: '#075985',
+          900: '#0c4a6e',
+        },
+        healthcare: {
+          primary: '#0ea5e9',
+          secondary: '#64748b',
+          accent: '#06b6d4',
+          success: '#10b981',
+          warning: '#f59e0b',
+          error: '#ef4444',
+          light: '#f8fafc',
+          dark: '#1e293b',
+        },
+      },
+      fontFamily: {
+        sans: ['Inter', 'system-ui', 'sans-serif'],
+        display: ['Poppins', 'system-ui', 'sans-serif'],
+      },
+      boxShadow: {
+        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
+        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
+        'elevated': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
+      },
+      animation: {
+        'fade-in': 'fadeIn 0.5s ease-in-out',
+        'slide-up': 'slideUp 0.3s ease-out',
+        'slide-down': 'slideDown 0.3s ease-out',
+        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
+      },
+      keyframes: {
+        fadeIn: {
+          '0%': { opacity: '0' },
+          '100%': { opacity: '1' },
+        },
+        slideUp: {
+          '0%': { transform: 'translateY(10px)', opacity: '0' },
+          '100%': { transform: 'translateY(0)', opacity: '1' },
+        },
+        slideDown: {
+          '0%': { transform: 'translateY(-10px)', opacity: '0' },
+          '100%': { transform: 'translateY(0)', opacity: '1' },
+        },
+        pulseSoft: {
+          '0%, 100%': { opacity: '1' },
+          '50%': { opacity: '0.8' },
+        },
+      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};