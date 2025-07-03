# Dark Mode Implementation Guide

## Overview

This guide provides comprehensive instructions for implementing dark mode in the Fondation Botnar Dashboard design system. The implementation uses Tailwind CSS's class-based dark mode system for optimal performance and user experience.

## Table of Contents

1. [Configuration Setup](#configuration-setup)
2. [Component Patterns](#component-patterns)
3. [Theme Management](#theme-management)
4. [Color Guidelines](#color-guidelines)
5. [Testing and Validation](#testing-and-validation)
6. [Common Issues](#common-issues)

## Configuration Setup

### Tailwind Configuration

Enable dark mode in `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./design-system/**/*.{html,js}",
    "./examples/**/*.{html,js}",
    // ... other paths
  ],
  theme: {
    extend: {
      colors: {
        // All custom colors automatically get dark: variants
        'botnar-pink': {
          50: '#fce4ec',
          500: '#e91e63',
          600: '#d81b60',
          // ... full color scale
        }
      }
    }
  }
}
```

### CSS Custom Properties (Optional Enhancement)

Add dark mode custom properties in `base.css`:

```css
:root {
  /* Light mode variables */
  --color-bg-primary: #ffffff;
  --color-text-primary: #111827;
  --color-border: #e5e7eb;
}

.dark {
  /* Dark mode variables */
  --color-bg-primary: #111827;
  --color-text-primary: #f9fafb;
  --color-border: #374151;
}
```

## Component Patterns

### Basic Component Structure

Every component should include both light and dark mode styles:

```html
<!-- Card Component with Dark Mode -->
<div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
      Component Title
    </h3>
    <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
      <!-- Icon -->
    </button>
  </div>
  
  <!-- Content -->
  <div class="text-gray-600 dark:text-gray-300">
    <p>Component content that adapts to both themes</p>
  </div>
  
  <!-- Actions -->
  <div class="mt-4 flex gap-2">
    <button class="bg-botnar-pink-500 hover:bg-botnar-pink-600 dark:bg-botnar-pink-600 dark:hover:bg-botnar-pink-700 text-white px-4 py-2 rounded-md">
      Primary Action
    </button>
    <button class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md">
      Secondary Action
    </button>
  </div>
</div>
```

### Navigation Components

```html
<!-- Navigation with Dark Mode -->
<nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <span class="text-botnar-pink-500 font-bold text-xl">BOTNAR</span>
      </div>
      
      <!-- Navigation Links -->
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-botnar-blue-600 dark:hover:text-botnar-blue-400">
          Dashboard
        </a>
        <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-botnar-blue-600 dark:hover:text-botnar-blue-400">
          Reports
        </a>
      </div>
      
      <!-- Theme Toggle -->
      <button x-data="themeToggle()" @click="toggleTheme()" 
              class="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
        <!-- Theme icons (sun/moon) -->
        <svg x-show="theme === 'light'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <!-- Moon icon for light mode -->
        </svg>
        <svg x-show="theme === 'dark'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <!-- Sun icon for dark mode -->
        </svg>
      </button>
    </div>
  </div>
</nav>
```

### Form Components

```html
<!-- Form with Dark Mode Support -->
<form class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Email Address
    </label>
    <input type="email" 
           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-botnar-pink-500 focus:border-transparent">
  </div>
  
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Message
    </label>
    <textarea rows="4" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-botnar-pink-500 focus:border-transparent">
    </textarea>
  </div>
  
  <button type="submit" 
          class="w-full bg-botnar-pink-500 hover:bg-botnar-pink-600 dark:bg-botnar-pink-600 dark:hover:bg-botnar-pink-700 text-white py-2 px-4 rounded-md font-medium">
    Send Message
  </button>
</form>
```

### Chart Components

```html
<!-- Chart Container with Dark Mode -->
<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
  <!-- Chart Header -->
  <div class="flex items-center justify-between mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Grant Distribution
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        By country and program
      </p>
    </div>
    <div class="flex gap-2">
      <button class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
        <!-- Export icon -->
      </button>
    </div>
  </div>
  
  <!-- Chart -->
  <div class="relative h-64">
    <canvas id="chart-canvas"></canvas>
  </div>
  
  <!-- Chart Legend -->
  <div class="mt-4 flex flex-wrap gap-4 text-sm">
    <div class="flex items-center">
      <span class="w-3 h-3 bg-botnar-blue-500 rounded-full mr-2"></span>
      <span class="text-gray-700 dark:text-gray-300">Active Grants</span>
    </div>
    <div class="flex items-center">
      <span class="w-3 h-3 bg-botnar-pink-500 rounded-full mr-2"></span>
      <span class="text-gray-700 dark:text-gray-300">Completed Grants</span>
    </div>
  </div>
</div>
```

## Theme Management

### Alpine.js Theme Manager

Create a reusable theme management component:

```javascript
// Theme management component
function themeManager() {
  return {
    theme: 'light',
    
    init() {
      // Initialize theme from localStorage or system preference
      this.theme = this.getInitialTheme();
      this.applyTheme();
      
      // Listen for system theme changes
      this.watchSystemTheme();
    },
    
    getInitialTheme() {
      // Check localStorage first
      const savedTheme = localStorage.getItem('botnar-theme');
      if (savedTheme) return savedTheme;
      
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      
      return 'light';
    },
    
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.applyTheme();
      this.saveTheme();
    },
    
    setTheme(theme) {
      this.theme = theme;
      this.applyTheme();
      this.saveTheme();
    },
    
    applyTheme() {
      const html = document.documentElement;
      
      if (this.theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      
      // Update meta theme-color for mobile browsers
      this.updateMetaThemeColor();
    },
    
    saveTheme() {
      localStorage.setItem('botnar-theme', this.theme);
    },
    
    watchSystemTheme() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only update if no manual theme is saved
        if (!localStorage.getItem('botnar-theme')) {
          this.theme = e.matches ? 'dark' : 'light';
          this.applyTheme();
        }
      });
    },
    
    updateMetaThemeColor() {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.content = this.theme === 'dark' ? '#111827' : '#ffffff';
      }
    }
  }
}

// Global theme toggle component
function themeToggle() {
  return {
    theme: Alpine.store('theme')?.theme || 'light',
    
    init() {
      // Watch for theme changes
      this.$watch('$store.theme.theme', (value) => {
        this.theme = value;
      });
    },
    
    toggleTheme() {
      Alpine.store('theme').toggleTheme();
    }
  }
}

// Initialize global theme store
document.addEventListener('alpine:init', () => {
  Alpine.store('theme', themeManager());
});
```

### Theme Toggle Button

```html
<!-- Theme Toggle Button -->
<button x-data="themeToggle()" 
        @click="toggleTheme()" 
        class="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`">
  
  <!-- Sun Icon (shown in dark mode) -->
  <svg x-show="theme === 'dark'" 
       class="w-5 h-5 text-gray-600 dark:text-gray-300" 
       fill="none" 
       stroke="currentColor" 
       viewBox="0 0 24 24">
    <path stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
    </path>
  </svg>
  
  <!-- Moon Icon (shown in light mode) -->
  <svg x-show="theme === 'light'" 
       class="w-5 h-5 text-gray-600 dark:text-gray-300" 
       fill="none" 
       stroke="currentColor" 
       viewBox="0 0 24 24">
    <path stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
    </path>
  </svg>
</button>
```

## Color Guidelines

### Brand Colors in Dark Mode

Adjust brand colors for better contrast in dark mode:

```css
/* Light mode brand colors */
.bg-botnar-pink-500 { background-color: #e91e63; }
.text-botnar-blue-600 { color: #1976d2; }

/* Dark mode adjustments */
.dark .dark\:bg-botnar-pink-600 { background-color: #d81b60; }
.dark .dark\:text-botnar-blue-400 { color: #42a5f5; }
```

### Semantic Color Mapping

Create semantic color classes that adapt automatically:

```html
<!-- Semantic classes that work in both themes -->
<div class="bg-surface text-primary border-divider">
  <!-- Content automatically adapts -->
</div>
```

```css
/* Define semantic color utilities */
@layer utilities {
  .bg-surface {
    @apply bg-white dark:bg-gray-800;
  }
  
  .text-primary {
    @apply text-gray-900 dark:text-gray-100;
  }
  
  .text-secondary {
    @apply text-gray-600 dark:text-gray-300;
  }
  
  .border-divider {
    @apply border-gray-200 dark:border-gray-700;
  }
}
```

### Contrast Requirements

Ensure all color combinations meet WCAG contrast ratios:

| Context | Light Mode | Dark Mode | Contrast Ratio |
|---------|------------|-----------|----------------|
| Body text | #111827 on #ffffff | #f9fafb on #111827 | 4.5:1 minimum |
| Secondary text | #6b7280 on #ffffff | #d1d5db on #111827 | 4.5:1 minimum |
| Interactive elements | #e91e63 on #ffffff | #f472b6 on #111827 | 4.5:1 minimum |
| Focus indicators | #e91e63 outline | #f472b6 outline | 3:1 minimum |

## Testing and Validation

### Manual Testing Checklist

- [ ] All interactive elements are visible in both themes
- [ ] Text remains readable with sufficient contrast
- [ ] Focus indicators are clearly visible
- [ ] Brand colors maintain visual hierarchy
- [ ] Images and icons work in both themes
- [ ] Charts and data visualizations are legible
- [ ] Form elements are properly styled
- [ ] Loading states are visible

### Automated Testing

```javascript
// Test dark mode functionality
describe('Dark Mode', () => {
  it('should toggle between light and dark themes', () => {
    cy.visit('/dashboard');
    
    // Check initial light mode
    cy.get('html').should('not.have.class', 'dark');
    
    // Toggle to dark mode
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('have.class', 'dark');
    
    // Toggle back to light mode
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });
  
  it('should persist theme preference', () => {
    cy.visit('/dashboard');
    
    // Set dark mode
    cy.get('[data-testid="theme-toggle"]').click();
    
    // Reload page
    cy.reload();
    
    // Should still be in dark mode
    cy.get('html').should('have.class', 'dark');
  });
});
```

### Accessibility Testing

Use tools like axe-core to test color contrast:

```javascript
// Accessibility testing
describe('Dark Mode Accessibility', () => {
  it('should meet color contrast requirements in light mode', () => {
    cy.visit('/dashboard');
    cy.injectAxe();
    cy.checkA11y();
  });
  
  it('should meet color contrast requirements in dark mode', () => {
    cy.visit('/dashboard');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.injectAxe();
    cy.checkA11y();
  });
});
```

## Common Issues

### Issue: Dark Mode Classes Not Working

**Symptoms:**
- `dark:` prefixed classes have no effect
- Theme toggle doesn't change appearance

**Solutions:**
1. Verify `darkMode: 'class'` in `tailwind.config.js`
2. Rebuild CSS: `npm run build`
3. Check if `dark` class is added to `<html>` element
4. Ensure classes are included in Tailwind's content scanning

### Issue: Poor Contrast in Dark Mode

**Symptoms:**
- Text is hard to read
- Interactive elements are barely visible

**Solutions:**
1. Use lighter shades of brand colors in dark mode
2. Test with contrast ratio tools
3. Use semantic color classes instead of hard-coded values

### Issue: Images Don't Adapt to Dark Mode

**Symptoms:**
- Light images look wrong in dark mode
- Icons disappear in dark theme

**Solutions:**
```html
<!-- Use CSS filters for images -->
<img src="logo.png" class="dark:filter dark:invert">

<!-- Or use different images for each theme -->
<img x-show="theme === 'light'" src="logo-light.png">
<img x-show="theme === 'dark'" src="logo-dark.png">
```

### Issue: Theme Flicker on Page Load

**Symptoms:**
- Brief flash of wrong theme on page load
- Theme switches after JavaScript loads

**Solutions:**
```html
<!-- Inline script to prevent flash -->
<script>
  (function() {
    const theme = localStorage.getItem('botnar-theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

## Performance Considerations

### CSS Size Optimization

Dark mode adds CSS classes, monitor bundle size:

```bash
# Check compiled CSS size
ls -lh dist/botnar-design-system.css

# Analyze CSS composition
npm run build -- --analyze
```

### Runtime Performance

Minimize JavaScript overhead:

```javascript
// Efficient theme switching
function applyTheme(theme) {
  // Use classList for better performance
  document.documentElement.classList.toggle('dark', theme === 'dark');
  
  // Batch DOM updates
  requestAnimationFrame(() => {
    // Update meta tags, etc.
  });
}
```

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Next Review**: February 2025