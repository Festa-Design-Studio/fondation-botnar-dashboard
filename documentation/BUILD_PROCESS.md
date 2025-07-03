# Build Process Documentation

## Overview

This document details the CSS compilation and build process for the Fondation Botnar Dashboard design system. The project uses a local Tailwind CSS compilation setup for optimal performance, customization, and maintainability.

## Table of Contents

1. [Build System Architecture](#build-system-architecture)
2. [Development Workflow](#development-workflow)
3. [Production Builds](#production-builds)
4. [File Structure](#file-structure)
5. [Configuration Files](#configuration-files)
6. [Performance Optimization](#performance-optimization)
7. [Troubleshooting](#troubleshooting)
8. [Deployment](#deployment)

## Build System Architecture

### Overview

The build system transforms source CSS files into optimized, production-ready stylesheets:

```
Source Files → Tailwind CSS → PostCSS → Optimized CSS
```

### Build Pipeline

1. **Source Processing**: Read `base.css` with Tailwind directives
2. **Content Scanning**: Scan HTML/JS files for used classes
3. **CSS Generation**: Generate utility classes and components
4. **PostCSS Processing**: Apply autoprefixer and optimizations
5. **Output Generation**: Create final CSS file in `dist/`

### Technology Stack

- **Tailwind CSS 3.4+**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Browser compatibility
- **Node.js**: Build environment

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Verify Tailwind CLI installation
npx tailwindcss --help
```

### Development Commands

```bash
# Watch mode for active development
npm run dev

# Single build for development (unminified)
npm run build:dev

# Production build (minified)
npm run build

# Clean and rebuild
rm -rf dist/ && npm run build
```

### Watch Mode Details

The `npm run dev` command starts a file watcher:

```bash
tailwindcss -i ./design-system/assets/css/base.css -o ./dist/botnar-design-system.css --watch
```

**What it watches:**
- Source CSS file: `design-system/assets/css/base.css`
- Configuration: `tailwind.config.js`
- Content files: All HTML/JS files in configured paths

**Automatic rebuilds when:**
- CSS source files change
- Tailwind configuration changes
- New classes are added to HTML files
- Files are added/removed from content paths

### Development Best Practices

1. **Always use watch mode** during development: `npm run dev`
2. **Check console output** for build errors and warnings
3. **Verify file generation** by checking `dist/` directory
4. **Test in browser** with hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
5. **Monitor file size** during development

## Production Builds

### Build Command

```bash
npm run build
```

This executes:
```bash
tailwindcss -i ./design-system/assets/css/base.css -o ./dist/botnar-design-system.css --minify
```

### Production Optimizations

1. **CSS Minification**: Removes whitespace and optimizes selectors
2. **Unused CSS Removal**: Only includes classes found in content files
3. **Vendor Prefixes**: Adds browser-specific prefixes
4. **Comments Removal**: Strips development comments

### Build Output

```
dist/
└── botnar-design-system.css    # Minified production CSS (~50-200KB)
```

### Performance Metrics

| Build Type | File Size | Gzip Size | Build Time |
|------------|-----------|-----------|------------|
| Development | ~500KB | ~80KB | 1-2 seconds |
| Production | ~150KB | ~25KB | 2-3 seconds |

## File Structure

### Source Files

```
design-system/assets/css/
├── base.css                    # Main entry point
├── components.css              # Custom components (optional)
└── utilities.css               # Custom utilities (optional)
```

### Configuration Files

```
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration (optional)
├── package.json                # Build scripts and dependencies
└── .gitignore                  # Exclude node_modules, etc.
```

### Output Files

```
dist/
├── botnar-design-system.css    # Compiled CSS
└── botnar-design-system.css.map # Source map (if enabled)
```

## Configuration Files

### package.json Scripts

```json
{
  "scripts": {
    "dev": "tailwindcss -i ./design-system/assets/css/base.css -o ./dist/botnar-design-system.css --watch",
    "build": "tailwindcss -i ./design-system/assets/css/base.css -o ./dist/botnar-design-system.css --minify",
    "build:dev": "tailwindcss -i ./design-system/assets/css/base.css -o ./dist/botnar-design-system.css",
    "clean": "rm -rf dist/",
    "analyze": "tailwindcss -i ./design-system/assets/css/base.css -o ./dist/botnar-design-system.css --minify --verbose"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "@tailwindcss/forms": "^0.5.7",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### tailwind.config.js

```javascript
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
      // Custom theme configuration
      colors: {
        'botnar-pink': {
          // Color scale definitions
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
}
```

### base.css (Source)

```css
/**
 * Fondation Botnar Dashboard - Base CSS
 * Entry point for Tailwind CSS compilation
 */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@layer base {
  /* CSS custom properties */
  :root {
    --color-botnar-pink: #e91e63;
    --color-botnar-blue: #1976d2;
    /* ... other design tokens */
  }
  
  /* Base element styles */
  html {
    font-family: 'Inter', sans-serif;
  }
}

@layer components {
  /* Custom component styles */
  .btn-primary {
    @apply bg-botnar-pink-500 text-white px-4 py-2 rounded-md hover:bg-botnar-pink-600;
  }
}

@layer utilities {
  /* Custom utility classes */
  .text-balance {
    text-wrap: balance;
  }
}
```

### postcss.config.js (Optional)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

## Performance Optimization

### Content Configuration

Optimize build performance by properly configuring content paths:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    // Be specific about which files to scan
    "./design-system/**/*.{html,js}",
    "./examples/**/*.{html,js}",
    
    // Avoid overly broad patterns
    // "./src/**/*" (too broad)
    
    // Include specific files when needed
    "./test-charts.html"
  ]
}
```

### Build Optimization Strategies

1. **Selective Imports**: Only import needed Tailwind layers
2. **Plugin Optimization**: Only include required plugins
3. **Content Scanning**: Precise file path configuration
4. **Caching**: Leverage build system caching

### Bundle Size Analysis

```bash
# Analyze CSS composition
npm run build -- --verbose

# Check file sizes
ls -lh dist/

# Gzip size estimation
gzip -c dist/botnar-design-system.css | wc -c
```

### Performance Monitoring

Monitor build performance metrics:

```javascript
// package.json script for performance tracking
{
  "scripts": {
    "build:perf": "time npm run build && ls -lh dist/"
  }
}
```

## Troubleshooting

### Common Build Issues

#### 1. Build Fails - File Not Found

**Error:**
```
error ENOENT: no such file or directory, open 'design-system/assets/css/base.css'
```

**Solution:**
```bash
# Verify file exists
ls -la design-system/assets/css/base.css

# Check package.json script paths
cat package.json | grep -A 5 "scripts"
```

#### 2. CSS Not Updating

**Error:**
Changes not reflected in browser

**Solution:**
```bash
# Stop watch process
Ctrl+C

# Clear cache and rebuild
rm -rf dist/ && npm run build

# Restart watch mode
npm run dev
```

#### 3. Classes Not Generated

**Error:**
Tailwind classes not appearing in compiled CSS

**Solution:**
1. Check content paths in `tailwind.config.js`
2. Verify classes exist in scanned files
3. Rebuild CSS: `npm run build`

#### 4. Build Performance Issues

**Error:**
Slow build times

**Solution:**
```javascript
// Optimize content configuration
module.exports = {
  content: [
    // More specific paths
    "./design-system/components/**/*.html",
    "./design-system/templates/**/*.html",
    // Avoid scanning unnecessary files
  ]
}
```

### Debug Commands

```bash
# Verbose build output
npx tailwindcss -i ./design-system/assets/css/base.css -o ./dist/debug.css --verbose

# Check configuration
npx tailwindcss --help

# Validate config file
node -e "console.log(require('./tailwind.config.js'))"
```

### Error Log Analysis

Common error patterns and solutions:

```bash
# Parse CSS errors
npm run build 2>&1 | grep -E "(error|Error)"

# Check for missing dependencies
npm list tailwindcss

# Verify Node.js version
node --version  # Should be 16+
```

## Deployment

### Pre-deployment Checklist

- [ ] Run production build: `npm run build`
- [ ] Verify CSS file exists: `ls -la dist/botnar-design-system.css`
- [ ] Test file size is reasonable (< 500KB)
- [ ] Validate CSS syntax
- [ ] Test in production environment

### Deployment Scripts

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "npm run predeploy && ./deploy.sh",
    "postdeploy": "echo 'Deployment complete - verify CSS loading'"
  }
}
```

### CI/CD Integration

#### GitHub Actions Example

```yaml
name: Build CSS
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: ls -la dist/
```

### Production Environment

```bash
# Verify build in production
curl -I https://your-domain.com/dist/botnar-design-system.css

# Check file size
curl -s https://your-domain.com/dist/botnar-design-system.css | wc -c

# Validate CSS
curl -s https://your-domain.com/dist/botnar-design-system.css | head -10
```

### Cache Management

Configure appropriate cache headers:

```nginx
# Nginx configuration
location /dist/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Rollback Strategy

Keep previous builds for quick rollback:

```bash
# Version CSS builds
cp dist/botnar-design-system.css dist/botnar-design-system-$(date +%Y%m%d).css

# Rollback if needed
cp dist/botnar-design-system-20250101.css dist/botnar-design-system.css
```

## Maintenance

### Regular Tasks

1. **Update Dependencies**: Monthly Tailwind CSS updates
2. **Performance Audit**: Quarterly build performance review
3. **Size Monitoring**: Track CSS bundle size over time
4. **Configuration Review**: Semi-annual config optimization

### Monitoring

```bash
# Track build metrics
echo "$(date): $(ls -lh dist/botnar-design-system.css | awk '{print $5}')" >> build-history.log

# Performance benchmarking
time npm run build > build-perf.log 2>&1
```

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Next Review**: February 2025  
**Maintained By**: Development Team