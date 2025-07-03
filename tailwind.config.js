/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./design-system/**/*.{html,js}",
    "./examples/**/*.{html,js}",
    "./documentation/**/*.{html,js}",
    "./showcase/**/*.{html,js}",
    "./test-charts.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'botnar-pink': {
          50: '#fce4ec',
          100: '#f8bbd9', 
          200: '#f48fb1',
          300: '#f06292',
          400: '#ec407a',
          500: '#e91e63', // Primary brand color
          600: '#d81b60',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f'
        },
        'botnar-blue': {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9', 
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1976d2', // Primary data color
          700: '#1565c0',
          800: '#0d47a1',
          900: '#0a3d7c'
        },
        
        // Status Colors
        'success': {
          50: '#e8f5e8',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c', // Success green
          800: '#2e7d32',
          900: '#1b5e20'
        },
        'warning': {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',
          600: '#ffb300',
          700: '#f57c00', // Warning orange
          800: '#ef6c00',
          900: '#e65100'
        },
        'error': {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f', // Error red
          800: '#c62828',
          900: '#b71c1c'
        },
        'info': {
          50: '#e1f5fe',
          100: '#b3e5fc',
          200: '#81d4fa',
          300: '#4fc3f7',
          400: '#29b6f6',
          500: '#03a9f4',
          600: '#039be5',
          700: '#0288d1', // Info cyan
          800: '#0277bd',
          900: '#01579b'
        },
        
        // Categorical Colors for Charts
        'category': {
          1: '#1976d2', // Primary blue
          2: '#e91e63', // Primary pink
          3: '#388e3c', // Green
          4: '#f57c00', // Orange
          5: '#9c27b0', // Purple
          6: '#00796b', // Teal
          7: '#5d4037', // Brown
          8: '#616161'  // Gray
        },
        
        // Enhanced Grays
        'neutral': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        }
      },
      
      fontSize: {
        // Dashboard-specific typography scale
        'dashboard-title': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }], // 32px
        'section-title': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],   // 24px
        'widget-title': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }], // 18px
        'kpi-large': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],   // 28px
        'data-medium': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],     // 16px
        'data-small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }], // 14px
        'axis-label': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],     // 12px
        'tooltip': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],    // 14px
        
        // Responsive variants
        'responsive-xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px mobile → 24px desktop
        'responsive-lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px mobile → 20px desktop
        'responsive-base': ['1rem', { lineHeight: '1.5rem' }], // 16px mobile → 18px desktop
        'responsive-sm': ['0.875rem', { lineHeight: '1.25rem' }] // 14px mobile → 16px desktop
      },
      
      spacing: {
        // Dashboard-specific spacing tokens
        'dashboard-margin': '2rem',    // 32px - Page margins
        'section-gap': '1.5rem',       // 24px - Section spacing
        'component-gap': '1rem',       // 16px - Component margins
        'element-gap': '0.5rem',       // 8px - Icon spacing
        'micro-gap': '0.25rem',        // 4px - Element padding
        
        // Touch targets
        'touch-target': '2.75rem',     // 44px - Minimum touch target
        'button-padding-x': '1rem',    // 16px - Button horizontal padding
        'button-padding-y': '0.5rem',  // 8px - Button vertical padding
        
        // Chart spacing
        'chart-padding': '1.5rem',     // 24px - Chart container padding
        'chart-margin': '1rem',        // 16px - Chart margins
        'legend-gap': '0.75rem',       // 12px - Legend item spacing
        
        // Card spacing
        'card-padding': '1.5rem',      // 24px - Card internal padding
        'card-gap': '1.5rem',          // 24px - Gap between cards
        
        // Grid spacing
        'grid-gap': '1.5rem',          // 24px - Grid gap
        'grid-margin': '2rem'          // 32px - Grid container margin
      },
      
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace']
      },
      
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'chart': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'focus-ring': '0 0 0 3px rgba(233, 30, 99, 0.1)' // Botnar pink focus ring
      },
      
      borderRadius: {
        'card': '0.5rem',        // 8px - Standard card radius
        'button': '0.375rem',    // 6px - Button radius
        'input': '0.375rem',     // 6px - Input radius
        'chart': '0.5rem'        // 8px - Chart container radius
      },
      
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite'
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      
      screens: {
        'xs': '475px',
        'dashboard-sm': '640px',
        'dashboard-md': '768px', 
        'dashboard-lg': '1024px',
        'dashboard-xl': '1280px',
        'dashboard-2xl': '1440px'
      }
    },
  },
  plugins: [
    // Add forms plugin for better form styling
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    
    // Custom plugin for dashboard-specific utilities
    function({ addUtilities, theme }) {
      addUtilities({
        '.dashboard-container': {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.dashboard-margin'),
          paddingRight: theme('spacing.dashboard-margin')
        },
        '.card-base': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.card'),
          boxShadow: theme('boxShadow.card'),
          padding: theme('spacing.card-padding')
        },
        '.focus-ring': {
          '&:focus': {
            outline: 'none',
            boxShadow: theme('boxShadow.focus-ring')
          }
        },
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0'
        }
      })
    }
  ],
}