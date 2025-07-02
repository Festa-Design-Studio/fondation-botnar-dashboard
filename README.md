# Fondation Botnar Data Visualization Dashboard

## Project Overview

This repository contains the implementation of an accessible, interactive data visualization dashboard system for Fondation Botnar's Strategic Learning and Evaluation (SLE) function. Built using atomic design principles, the dashboard transforms complex data into digestible insights for diverse stakeholders worldwide.

### Project Information
- **Client**: Fondation Botnar (Swiss philanthropic foundation)
- **Purpose**: Strategic Learning and Evaluation data visualization
- **Design & Development**: Festa Design Studio
- **Status**: In Development

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **Tailwind CSS**: Utility-first CSS framework with custom Botnar design tokens
- **Alpine.js**: Lightweight reactive framework for dashboard interactivity
- **Chart.js**: Data visualization library with accessibility plugins

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
├── documentation/         # Project documentation
├── examples/             # Usage examples
└── tests/               # Test suites
```

## Design System Architecture

This project follows the atomic design methodology:

1. **Atoms**: Colors, typography, buttons, icons, form elements
2. **Molecules**: KPI cards, chart components, filter controls, data tables
3. **Organisms**: Chart containers, navigation systems, filter panels
4. **Templates**: Portfolio overview, grant performance, evaluation dashboards
5. **Pages**: Complete, production-ready dashboard implementations

## Key Features

- **Accessibility First**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Visualizations**: Dynamic charts with real-time filtering and data exploration
- **Performance Optimized**: Lightweight implementation with fast load times
- **Component Showcase**: Interactive documentation system for all components

## Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Node.js and npm (for development tooling)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd fondation-botnar-dashboard

# Install dependencies (when configured)
npm install
```

### Development
```bash
# Start development server (to be configured)
npm run dev

# Build for production (to be configured)
npm run build

# Run tests (to be configured)
npm test
```

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
**Version**: 0.1.0