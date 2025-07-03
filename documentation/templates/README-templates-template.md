# [Template Name] Page Template

[Brief description of this template's purpose and the type of page it creates]

## Overview

[Comprehensive explanation of the template's role in the application, the user journeys it supports, and the business objectives it fulfills. Include information about the target audience and use cases.]

## Template Structure

### Layout Regions
```
┌─────────────────────────────────────────┐
│          Header (Navigation)            │
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────────────────────┐ │
│ │         │ │                         │ │
│ │ Sidebar │ │     Main Content        │ │
│ │         │ │                         │ │
│ │         │ ├─────────────────────────┤ │
│ │         │ │   Supporting Content    │ │
│ └─────────┘ └─────────────────────────┘ │
├─────────────────────────────────────────┤
│              Footer                     │
└─────────────────────────────────────────┘
```

### Component Composition
```
[Template Name]
├── Header Organism
│   ├── Navigation Molecule
│   ├── User Menu Molecule
│   └── Branding Atoms
├── Main Content Area
│   ├── Page Title Molecule
│   ├── Primary Content Organism(s)
│   └── Supporting Organisms
├── Sidebar (Optional)
│   ├── Filter Panel Molecule
│   ├── Quick Actions Molecule
│   └── Context Info Molecule
└── Footer Organism
    ├── Links Molecule
    └── Copyright Atom
```

## Implementation

### Base HTML Structure

```html
<!DOCTYPE html>
<html lang="en" class="h-full" x-data="{ theme: 'light' }">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ pageTitle }} - Fondation Botnar Dashboard</title>
    
    <!-- Design System CSS -->
    <link rel="stylesheet" href="/dist/botnar-design-system.css">
    
    <!-- Template-specific CSS -->
    <style>
        /* Template-specific styles if needed */
    </style>
</head>

<body class="h-full bg-gray-50 dark:bg-gray-900" x-data="templateController()">
    <!-- Skip Navigation -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Header -->
    <header class="template-header">
        <!-- Navigation Organism -->
    </header>
    
    <!-- Main Layout -->
    <div class="template-layout">
        <!-- Optional Sidebar -->
        <aside class="template-sidebar" x-show="sidebarVisible">
            <!-- Sidebar Content -->
        </aside>
        
        <!-- Main Content -->
        <main id="main-content" class="template-main">
            <!-- Page Header -->
            <div class="page-header">
                <h1>{{ pageTitle }}</h1>
                <!-- Breadcrumbs -->
            </div>
            
            <!-- Primary Content -->
            <div class="primary-content">
                <!-- Main organisms go here -->
            </div>
            
            <!-- Supporting Content -->
            <div class="supporting-content">
                <!-- Additional organisms -->
            </div>
        </main>
    </div>
    
    <!-- Footer -->
    <footer class="template-footer">
        <!-- Footer Content -->
    </footer>
    
    <!-- Scripts -->
    <script src="/dist/alpine.min.js"></script>
    <script src="/dist/chart.min.js"></script>
    <script src="/dist/template-controller.js"></script>
</body>
</html>
```

### Alpine.js Controller

```javascript
function templateController() {
  return {
    // -- Page State --
    pageTitle: 'Dashboard Overview',
    currentView: 'default',
    sidebarVisible: true,
    
    // -- Data Management --
    pageData: {},
    loading: true,
    error: null,
    
    // -- User Preferences --
    userPrefs: {
      layout: localStorage.getItem('layout-preference') || 'default',
      theme: localStorage.getItem('theme') || 'light',
      compactMode: false
    },
    
    // -- Lifecycle --
    async init() {
      // Initialize page
      await this.loadPageData();
      this.setupEventListeners();
      this.applyUserPreferences();
      
      // Mark page as ready
      this.$nextTick(() => {
        this.announcePageReady();
      });
    },
    
    // -- Data Loading --
    async loadPageData() {
      try {
        this.loading = true;
        
        // Parallel data fetching
        const [primaryData, secondaryData] = await Promise.all([
          this.fetchPrimaryData(),
          this.fetchSecondaryData()
        ]);
        
        this.pageData = {
          primary: primaryData,
          secondary: secondaryData
        };
        
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    
    // -- Layout Management --
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
      this.saveLayoutPreference();
    },
    
    switchView(viewName) {
      this.currentView = viewName;
      this.$dispatch('view-changed', { view: viewName });
    },
    
    // -- Responsive Behavior --
    handleResize() {
      const width = window.innerWidth;
      
      // Auto-hide sidebar on mobile
      if (width < 768) {
        this.sidebarVisible = false;
      } else if (width >= 1024) {
        this.sidebarVisible = true;
      }
    },
    
    // -- Accessibility --
    announcePageReady() {
      const announcement = `${this.pageTitle} page loaded and ready`;
      this.$dispatch('announce', { message: announcement });
    }
  }
}
```

## Configuration Options

### Template Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `pageTitle` | string | Yes | Main page title |
| `showSidebar` | boolean | No | Display sidebar (default: true) |
| `layout` | string | No | Layout variant (default, compact, wide) |
| `organisms` | array | Yes | List of organisms to include |
| `permissions` | object | No | User permission flags |

### Layout Variants

#### Default Layout
- Standard sidebar + main content
- Balanced information density
- Suitable for most use cases

#### Compact Layout
- Minimized sidebar
- Maximized content area
- Higher information density

#### Wide Layout
- No sidebar
- Full-width content
- Maximum space utilization

#### Dashboard Layout
- Multiple content regions
- Grid-based arrangement
- Optimized for data visualization

## Responsive Design

### Breakpoint Strategy

```css
/* Mobile First Approach */

/* Base: Mobile (<768px) */
.template-layout {
  display: block;
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
  .template-layout {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .template-layout {
    grid-template-columns: 250px 1fr;
  }
}

/* Wide Desktop (≥1440px) */
@media (min-width: 1440px) {
  .template-layout {
    max-width: 1440px;
    margin: 0 auto;
  }
}
```

### Adaptive Components

- **Mobile**: Stack vertically, hide secondary content
- **Tablet**: Show sidebar, compress charts
- **Desktop**: Full layout, expanded visualizations
- **Wide**: Maximum content width, enhanced spacing

## Data Flow

### Page Data Architecture

```javascript
// Data structure for template
const pageDataStructure = {
  // Metadata
  meta: {
    title: 'Page Title',
    description: 'Page description',
    lastUpdated: '2025-01-01T00:00:00Z'
  },
  
  // Primary content data
  primary: {
    kpis: [],
    charts: [],
    tables: []
  },
  
  // Supporting data
  secondary: {
    filters: {},
    actions: [],
    notifications: []
  },
  
  // User context
  user: {
    permissions: [],
    preferences: {},
    recentActivity: []
  }
};
```

### State Management Pattern

```javascript
// Centralized state management
Alpine.store('pageState', {
  // Shared state
  filters: {},
  selectedItems: [],
  viewMode: 'grid',
  
  // Methods
  updateFilters(newFilters) {
    this.filters = { ...this.filters, ...newFilters };
  },
  
  clearSelection() {
    this.selectedItems = [];
  }
});
```

## Performance Optimization

### Loading Strategy

```javascript
// Progressive enhancement
async initializePage() {
  // 1. Critical content first
  await this.loadCriticalContent();
  this.renderAboveFold();
  
  // 2. Secondary content
  this.loadSecondaryContent().then(() => {
    this.renderBelowFold();
  });
  
  // 3. Enhancement features
  requestIdleCallback(() => {
    this.loadEnhancements();
  });
}
```

### Resource Management

```javascript
// Lazy load heavy components
const lazyLoadComponent = async (componentName) => {
  const module = await import(`./components/${componentName}.js`);
  return module.default;
};

// Intersection Observer for viewport loading
const viewportLoader = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadComponent(entry.target);
    }
  });
});
```

## Accessibility Features

### Page Structure
- Semantic HTML5 landmarks
- Proper heading hierarchy (h1 → h6)
- Skip navigation links
- ARIA live regions

### Keyboard Navigation
- Full keyboard accessibility
- Focus management between regions
- Keyboard shortcuts for common actions
- Visible focus indicators

### Screen Reader Support
- Page title announcements
- Dynamic content updates
- Form validation messages
- Loading state announcements

## SEO Considerations

### Meta Tags
```html
<head>
  <!-- Basic SEO -->
  <title>{{ pageTitle }} - Fondation Botnar Dashboard</title>
  <meta name="description" content="{{ pageDescription }}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="{{ pageTitle }}">
  <meta property="og:description" content="{{ pageDescription }}">
  <meta property="og:type" content="website">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="{{ canonicalUrl }}">
</head>
```

### Structured Data
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{ pageTitle }}",
  "description": "{{ pageDescription }}",
  "url": "{{ pageUrl }}"
}
</script>
```

## Security Implementation

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
               style-src 'self' 'unsafe-inline';">
```

### XSS Prevention
```javascript
// Sanitize user input
sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Safe HTML rendering
renderHTML(content) {
  return DOMPurify.sanitize(content);
}
```

## Testing Checklist

### Functional Testing
- [ ] All organisms load correctly
- [ ] Data fetching works
- [ ] User interactions functional
- [ ] Navigation works properly
- [ ] Forms submit correctly

### Visual Testing
- [ ] Responsive layouts verified
- [ ] Dark mode compatibility
- [ ] Print styles functional
- [ ] Loading states display correctly
- [ ] Error states handle gracefully

### Performance Testing
- [ ] Page load time < 3s
- [ ] Time to Interactive < 5s
- [ ] No memory leaks
- [ ] Smooth animations (60fps)
- [ ] Efficient re-renders

### Accessibility Testing
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] Color contrast passing
- [ ] Focus indicators visible
- [ ] ARIA implementation correct

## Common Customizations

### Adding New Sections
```javascript
// Register new section
addSection(sectionConfig) {
  this.sections.push({
    id: sectionConfig.id,
    component: sectionConfig.component,
    data: sectionConfig.data,
    position: sectionConfig.position || 'main'
  });
  
  this.reorderSections();
}
```

### Custom Layouts
```javascript
// Switch layout mode
setLayout(layoutName) {
  this.currentLayout = layoutName;
  document.body.className = `layout-${layoutName}`;
  this.reorganizeContent();
}
```

## Troubleshooting

### Common Issues

#### Slow Page Load
- Check data fetching efficiency
- Verify lazy loading implementation
- Review resource bundle sizes

#### Layout Breaking
- Verify responsive CSS
- Check organism compatibility
- Test with different content lengths

#### Data Not Updating
- Verify state connections
- Check event propagation
- Review data binding syntax

## Migration Notes

### From Previous Version
1. Update Alpine.js syntax (v2 → v3)
2. Replace old component names
3. Update data structure format
4. Migrate user preferences

## Related Resources

- **Design System**: [Component Library Link]
- **API Documentation**: [Backend API Docs]
- **User Guide**: [End User Documentation]
- **Figma Designs**: [Design Files Link]

## Changelog

| Version | Date | Changes | Notes |
|---------|------|---------|-------|
| 2.0.0 | YYYY-MM-DD | New template system | Breaking changes |
| 1.2.0 | YYYY-MM-DD | Added dashboard layout | |
| 1.0.0 | YYYY-MM-DD | Initial release | |

---

**Template Status**: [Development/Production]  
**Last Updated**: YYYY-MM-DD  
**Maintained By**: [Team Name]  
**Questions**: [Contact Email]