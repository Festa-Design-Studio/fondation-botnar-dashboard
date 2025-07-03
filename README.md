# Fondation Botnar Dashboard - Design System

A comprehensive design system for Fondation Botnar's data visualization dashboard, built with accessibility, consistency, and scalability in mind.

## 🏗️ Overview

This design system follows **Atomic Design** principles to create a cohesive set of components for dashboard applications. Built with modern web technologies and accessibility best practices, it provides everything needed to create consistent, accessible data visualization interfaces.

### Project Information

- **Client**: Fondation Botnar (Swiss philanthropic foundation)
- **Purpose**: Strategic Learning and Evaluation data visualization
- **Design & Development**: Festa Design Studio
- **Status**: Phase 1-6 Complete - Full Dashboard with Authentication ✅

### Technology Stack

- **HTML5** - Semantic markup with accessibility features
- **Tailwind CSS** - Utility-first CSS framework with custom Botnar tokens (locally compiled)
- **Alpine.js** - Lightweight reactive framework for interactivity
- **Chart.js** - Data visualization with accessibility enhancements
- **Prism.js** - Code syntax highlighting for documentation
- **PostCSS** - CSS processing with autoprefixer for browser compatibility

## Project Structure

```
fondation-botnar-dashboard/
├── design-system/          # Atomic design components
│   ├── atoms/             # Basic building blocks
│   ├── molecules/         # Simple components
│   ├── organisms/         # Complex components
│   ├── templates/         # Page layouts
│   ├── pages/            # Complete dashboard views
│   └── assets/           # CSS, JS, and image resources
│       ├── css/          # Source CSS files
│       │   └── base.css  # Main CSS entry point
│       └── js/           # JavaScript components
├── dist/                 # Compiled CSS output
│   └── botnar-design-system.css
├── documentation/         # Project documentation
├── examples/             # Usage examples
├── tests/               # Test suites
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json         # Dependencies and build scripts
```

## Design System Architecture

This project follows the atomic design methodology:

1. **Atoms**: ✅ Colors, typography, buttons, icons, form elements (Complete)
2. **Molecules**: ✅ Cards, navigation, charts, filters (Complete)  
3. **Organisms**: ✅ Chart containers, navigation systems, filter panels (Complete)
4. **Templates**: ✅ Portfolio overview, grant performance, evaluation dashboards (Complete)
5. **Pages**: ✅ Complete, production-ready dashboard implementations (Complete)
6. **Authentication**: ✅ Secure login system with enterprise-grade UX (Complete)

## Key Features

- **Accessibility First**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Visualizations**: Dynamic charts with real-time filtering and data exploration
- **Performance Optimized**: Lightweight implementation with fast load times
- **Component Showcase**: Interactive documentation system for all components
- **Dark Mode Support**: Built-in theme switching with proper contrast ratios
- **Local CSS Compilation**: Optimized Tailwind CSS build for production performance
- **Enterprise Authentication**: Secure login system with password validation and session management
- **Complete Dashboard Pages**: 5 fully functional dashboard pages with real-time data simulation

## Dashboard Pages & Authentication

### Completed Dashboard Pages

1. **Dashboard Home** (`/pages/dashboard-home/`) - Strategic overview with KPIs and charts
2. **Grant Portfolio** (`/pages/grant-portfolio/`) - Portfolio management interface
3. **Impact Assessment** (`/pages/impact-assessment/`) - Program evaluation metrics
4. **Financial Reports** (`/pages/financial-reports/`) - Budget tracking and analysis
5. **Program Analysis** (`/pages/program-analysis/`) - Performance insights and analytics

### Authentication System

Complete authentication flow with enterprise-grade security:

- **Login Page** (`/pages/auth/login.html`) - Main authentication interface
- **Forgot Password** (`/pages/auth/forgot-password.html`) - Password reset flow
- **Reset Password** (`/pages/auth/reset-password.html`) - New password creation

#### Demo Credentials
```
Demo User: demo@fondation-botnar.org / dashboard2025
Administrator: admin@fondation-botnar.org / admin123
Analyst: analyst@fondation-botnar.org / analyst123
```

## 🌐 Live Demonstrations

### GitHub Pages Deployment

**🔗 Live Project**: [https://festa-design-studio.github.io/fondation-botnar-dashboard/](https://festa-design-studio.github.io/fondation-botnar-dashboard/)

**🚀 Dashboard Demo**: [https://festa-design-studio.github.io/fondation-botnar-dashboard/design-system/pages/auth/login.html](https://festa-design-studio.github.io/fondation-botnar-dashboard/design-system/pages/auth/login.html)

**📚 Design System**: [https://festa-design-studio.github.io/fondation-botnar-dashboard/design-system/](https://festa-design-studio.github.io/fondation-botnar-dashboard/design-system/)

#### Demo Credentials for Dashboard
```
Demo User: demo@fondation-botnar.org / dashboard2025
Administrator: admin@fondation-botnar.org / admin123
Analyst: analyst@fondation-botnar.org / analyst123
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Node.js 16+ and npm (for CSS compilation and development tooling)
- Basic knowledge of HTML, CSS, JavaScript, and Tailwind CSS

### Installation

```bash
# Clone the repository
git clone https://github.com/Festa-Design-Studio/fondation-botnar-dashboard.git

# Navigate to project directory
cd fondation-botnar-dashboard

# Install dependencies
npm install

# Build CSS for the first time
npm run build
```

### Development

```bash
# Watch for CSS changes during development
npm run dev

# Build optimized CSS for production
npm run build

# Build CSS for development (unminified)
npm run build:dev

# Run tests (to be configured)
npm test
```

### CSS Development Workflow

The project uses a local Tailwind CSS compilation setup:

1. **Source CSS**: Edit `design-system/assets/css/base.css`
2. **Configuration**: Modify `tailwind.config.js` for design tokens
3. **Output**: Compiled CSS is generated in `dist/botnar-design-system.css`
4. **Watch Mode**: Use `npm run dev` to automatically rebuild CSS on changes

#### Dark Mode Development
- Dark mode is enabled with `darkMode: 'class'` in Tailwind config
- Toggle dark mode by adding/removing `dark` class on `<html>` element
- All components support dark mode variants using `dark:` prefixes

#### Troubleshooting CSS Build Issues
- Ensure Node.js 16+ is installed
- Run `npm install` to update dependencies
- Check `tailwind.config.js` for syntax errors
- Verify input file path in build scripts matches `design-system/assets/css/base.css`

## Documentation

Comprehensive documentation is available in the parent directory:

- `botnar_implementation_plan.md` - Complete implementation roadmap
- `botnar_dashboard_atomic_design.md` - Design system specifications
- `botnar_implementation_tracker.md` - Current progress and task status

## Accessibility Standards

All components meet or exceed WCAG 2.1 AA standards:

- Minimum 4.5:1 color contrast ratios
- Full keyboard navigation support
- Comprehensive ARIA labels and descriptions
- Screen reader optimized content
- Focus indicators and skip links

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This is a client project developed by Festa Design Studio. For questions or support, please contact the development team.

## License

This project is proprietary to Fondation Botnar and Festa Design Studio. All rights reserved.

---

**Last Updated**: January 2025  
**Version**: 0.6.0 (Phases 1-6 Complete - Full Dashboard & Authentication)
