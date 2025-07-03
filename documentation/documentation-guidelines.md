# Documentation Guidelines - Fondation Botnar Design System

This guide establishes the documentation standards and practices for the Fondation Botnar Dashboard design system. All contributors should follow these guidelines to ensure consistent, comprehensive, and maintainable documentation.

## Documentation Philosophy

Our documentation serves multiple audiences:
- **Developers** implementing components
- **Designers** understanding system capabilities
- **Product Managers** planning features
- **QA Engineers** testing implementations
- **Future Maintainers** updating the system

Write documentation that is:
- **Clear**: Use simple, direct language
- **Complete**: Cover all aspects thoroughly
- **Consistent**: Follow established patterns
- **Current**: Keep synchronized with code
- **Contextual**: Provide real-world examples

## Documentation Structure

### 1. Atomic Design Hierarchy

Each level of the atomic design system has specific documentation requirements:

```
/design-system/
├── /atoms/
│   └── README.md (uses README-atoms-template.md)
├── /molecules/
│   └── README.md (uses README-molecules-template.md)
├── /organisms/
│   └── README.md (uses README-organisms-template.md)
├── /templates/
│   └── README.md (uses README-templates-template.md)
└── /pages/
    └── README.md (uses README-pages-template.md)
```

### 2. Component Documentation Requirements

#### For Atoms (Smallest Building Blocks)
- **Focus**: Individual element behavior and styling
- **Required Sections**:
  - Basic usage and HTML structure
  - CSS classes and utilities
  - Accessibility attributes
  - Design tokens used
  - Browser compatibility

#### For Molecules (Simple Component Groups)
- **Focus**: How atoms combine to form functional units
- **Required Sections**:
  - Component anatomy (which atoms are used)
  - Interaction patterns
  - State management with Alpine.js
  - Responsive behavior
  - Integration examples

#### For Organisms (Complex Components)
- **Focus**: Business logic and complex interactions
- **Required Sections**:
  - Architecture and data flow
  - Performance considerations
  - API integration patterns
  - Error handling strategies
  - Testing approaches

#### For Templates (Page Layouts)
- **Focus**: Page structure and content regions
- **Required Sections**:
  - Layout variations
  - Responsive strategies
  - SEO considerations
  - Performance optimization
  - Customization options

#### For Pages (Specific Instances)
- **Focus**: Actual implementation and business context
- **Required Sections**:
  - User journeys and workflows
  - Data sources and APIs
  - Analytics and tracking
  - Deployment configuration
  - Maintenance procedures

## Writing Style Guide

### 1. Language and Tone

**Do:**
- Use active voice: "The component displays data" not "Data is displayed by the component"
- Be concise: Remove unnecessary words
- Be specific: "Click the Submit button" not "Click the button"
- Use present tense: "Returns an array" not "Will return an array"

**Don't:**
- Use jargon without explanation
- Assume prior knowledge beyond basics
- Use ambiguous pronouns (it, this, that)
- Include opinions or preferences

### 2. Code Examples

#### General Rules
- Provide runnable examples whenever possible
- Include comments explaining non-obvious code
- Show both basic and advanced usage
- Highlight important lines with comments

#### Example Format
```html
<!-- Basic Button Example -->
<button class="btn-primary" 
        type="button"
        aria-label="Save changes">
  Save
</button>

<!-- Advanced Button with Loading State -->
<button class="btn-primary" 
        type="button"
        x-data="{ loading: false }"
        @click="loading = true; saveData()"
        :disabled="loading"
        aria-label="Save changes"
        aria-busy="loading">
  <span x-show="!loading">Save</span>
  <span x-show="loading">Saving...</span>
</button>
```

### 3. Formatting Standards

#### Headings
- Use sentence case for all headings
- Keep headings descriptive but concise
- Maintain logical hierarchy (never skip levels)
- Use heading levels consistently across documents

#### Lists
- Use bullet points for unordered information
- Use numbered lists for sequential steps
- Keep list items parallel in structure
- Start each item with a capital letter

#### Tables
- Use tables for structured data comparison
- Include descriptive headers
- Keep cell content concise
- Provide caption or introduction for context

#### Code Blocks
- Specify language for syntax highlighting
- Keep line length under 80 characters when possible
- Use 2-space indentation for HTML/CSS
- Use 2-space indentation for JavaScript

## Component Documentation Template

### Structure Overview

```markdown
# Component Name

Brief one-line description

## Overview
Detailed explanation (2-3 paragraphs)

## Usage
### Basic Implementation
### Advanced Features
### Common Patterns

## API Reference
### Properties/Props
### Methods
### Events
### Slots/Children

## Styling
### CSS Classes
### CSS Variables
### Theming

## Accessibility
### WCAG Compliance
### Keyboard Support
### Screen Reader Support

## Examples
### Example 1: Basic Usage
### Example 2: With Interactions
### Example 3: Edge Cases

## Best Practices
### Do's
### Don'ts

## Troubleshooting
### Common Issues
### FAQ

## Related Components
### See Also
### Used By
### Dependencies

## Changelog
```

## Documentation Types

### 1. API Documentation

Focus on technical implementation details:

```markdown
## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | string | '' | No | The component title |
| `variant` | enum | 'default' | No | Visual variant: 'default', 'compact', 'expanded' |
| `onSave` | function | null | Yes | Callback fired when save is clicked |

### Methods

#### `reset()`
Resets the component to initial state.

**Parameters:** None  
**Returns:** `void`  
**Example:**
```javascript
componentInstance.reset();
```
```

### 2. Usage Documentation

Focus on practical implementation:

```markdown
## Common Use Cases

### Dashboard Integration
Use this component for displaying real-time metrics:

```html
<div x-data="metricsDisplay({ 
  endpoint: '/api/metrics',
  refreshInterval: 5000 
})">
  <!-- Component markup -->
</div>
```

### Form Integration
Combine with form elements for data input:

```html
<form @submit.prevent="handleSubmit">
  <component-name 
    :data="formData"
    @change="updateFormData">
  </component-name>
</form>
```
```

### 3. Concept Documentation

Explain the why and how:

```markdown
## Understanding State Management

The dashboard uses Alpine.js for state management following these principles:

1. **Local State**: Component-specific data lives in the component
2. **Global State**: Shared data uses Alpine.store()
3. **State Flow**: Data flows down, events flow up

### Example: Filter State Synchronization

When a user changes filters, the state updates flow through the system:

```
User Action → Local Component → Global Store → All Listening Components
```

This ensures all visualizations update simultaneously while maintaining performance.
```

## Accessibility Documentation

### Required Sections

1. **Compliance Level**: Specify WCAG 2.1 AA compliance
2. **Keyboard Support**: Document all keyboard interactions
3. **Screen Reader**: Explain announcements and labels
4. **Color Contrast**: Verify ratios for all states
5. **Focus Management**: Describe focus flow

### Example Format

```markdown
## Accessibility

### WCAG 2.1 Compliance
✅ Level AA compliant  
✅ Level AAA compliant for color contrast

### Keyboard Navigation

| Key | Action | Notes |
|-----|--------|-------|
| `Tab` | Move focus forward | Skips disabled items |
| `Shift+Tab` | Move focus backward | - |
| `Enter` | Activate focused item | Same as click |
| `Escape` | Close/cancel | Returns focus to trigger |
| `Arrow Keys` | Navigate options | In select components |

### Screen Reader Support

The component announces:
- Label and current value on focus
- Value changes immediately
- Error messages when they appear
- Success confirmation after save

### Implementation Example
```html
<div role="region" 
     aria-labelledby="section-title"
     aria-describedby="section-help">
  <h2 id="section-title">Section Title</h2>
  <p id="section-help">Help text</p>
  <!-- Component content -->
</div>
```
```

## Testing Documentation

### Test Coverage Requirements

Document these test categories:
1. **Unit Tests**: Component logic
2. **Integration Tests**: Component interactions
3. **Visual Tests**: Appearance across states
4. **Accessibility Tests**: WCAG compliance
5. **Performance Tests**: Load and runtime

### Example Test Documentation

```markdown
## Testing

### Unit Tests
Located in: `__tests__/component-name.test.js`

```javascript
describe('ComponentName', () => {
  it('initializes with default props', () => {
    const component = new ComponentName();
    expect(component.value).toBe('');
  });
});
```

### Visual Regression Tests
Snapshots captured for:
- Default state
- All interactive states
- All size variants
- Light and dark themes
- Mobile and desktop views

### Manual Testing Checklist
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announces all changes
- [ ] Touch interactions work on mobile
- [ ] No JavaScript errors in console
- [ ] Performance is acceptable (< 100ms response)
```

## Version Documentation

### Changelog Format

Use semantic versioning and clear change descriptions:

```markdown
## Changelog

### [2.1.0] - 2025-01-20
#### Added
- Real-time data updates via WebSocket
- Export to PDF functionality
- Keyboard shortcut for refresh (Ctrl+R)

#### Changed
- Improved loading state animations
- Updated color contrast for better accessibility

#### Fixed
- Memory leak in chart component
- Focus trap in modal dialogs

#### Breaking Changes
- Renamed `onUpdate` prop to `onChange`
- Removed deprecated `legacyMode` option

### [2.0.0] - 2025-01-01
Complete rewrite with Alpine.js v3
```

## Maintenance Documentation

### Required Information

1. **Dependencies**: List all external dependencies
2. **Update Procedures**: Step-by-step update guide
3. **Common Issues**: Known problems and solutions
4. **Performance Notes**: Optimization opportunities
5. **Security Considerations**: Security best practices

### Example Format

```markdown
## Maintenance

### Dependencies
- Alpine.js v3.13+ (required)
- Chart.js v4.4+ (required for charts)
- Tailwind CSS v3.0+ (styling)

### Updating Dependencies

1. Check compatibility in CHANGELOG
2. Update package.json versions
3. Run test suite
4. Test in all supported browsers
5. Update documentation if needed

### Performance Optimization

Monitor these metrics:
- Bundle size (keep under 50KB)
- Initial render time (target < 100ms)
- Memory usage (watch for leaks)
- Re-render frequency (minimize)

### Security Checklist
- [ ] Sanitize all user inputs
- [ ] Use CSP headers
- [ ] Validate API responses
- [ ] Handle errors gracefully
- [ ] No sensitive data in code
```

## Documentation Review Process

### Before Publishing

1. **Technical Review**
   - Code examples work correctly
   - API documentation is accurate
   - No broken links
   - Proper syntax highlighting

2. **Content Review**
   - Clear and understandable
   - Complete information
   - Consistent terminology
   - Proper grammar

3. **Accessibility Review**
   - Examples include ARIA attributes
   - Color contrast documented
   - Keyboard support explained
   - Screen reader notes included

### Review Checklist

```markdown
### Documentation Review Checklist

#### Content
- [ ] Overview provides context
- [ ] All features documented
- [ ] Examples are practical
- [ ] Edge cases covered
- [ ] Troubleshooting included

#### Technical Accuracy
- [ ] Code examples tested
- [ ] Props/API accurate
- [ ] Dependencies listed
- [ ] Version info current
- [ ] Links work correctly

#### Style Guide
- [ ] Follows writing guidelines
- [ ] Consistent formatting
- [ ] Proper heading hierarchy
- [ ] Code properly formatted
- [ ] Tables readable

#### Accessibility
- [ ] WCAG info included
- [ ] Keyboard docs complete
- [ ] Screen reader covered
- [ ] Examples show ARIA
- [ ] Focus management explained
```

## Documentation Tools

### Recommended Tools

1. **Markdown Editors**
   - VS Code with Markdown Preview
   - Typora for WYSIWYG editing
   - MacDown for Mac users

2. **Diagramming**
   - Mermaid for flow charts
   - draw.io for architecture
   - Figma for visual layouts

3. **Code Examples**
   - CodePen for interactive demos
   - JSFiddle for quick tests
   - Local development server

4. **Validation**
   - Markdown linters
   - Link checkers
   - Spell checkers

### Automation

Use these scripts for documentation tasks:

```bash
# Generate component documentation
npm run docs:generate

# Check for broken links
npm run docs:check-links

# Build documentation site
npm run docs:build

# Serve documentation locally
npm run docs:serve
```

## Contributing to Documentation

### Process

1. **Identify Gap**: Find missing or outdated documentation
2. **Create Issue**: File issue describing needed updates
3. **Write Draft**: Follow templates and guidelines
4. **Submit PR**: Include examples and review checklist
5. **Address Feedback**: Update based on review
6. **Merge**: Documentation goes live

### Commit Messages

Use clear commit messages for documentation:

```
docs: add accessibility section to button component
docs: update chart.js integration examples
docs: fix broken links in navigation guide
docs: clarify Alpine.js state management patterns
```

## Documentation Metrics

Track documentation quality with these metrics:

1. **Coverage**: % of components documented
2. **Freshness**: Days since last update
3. **Completeness**: Required sections present
4. **Accuracy**: Bug reports about docs
5. **Usability**: Time to find information

### Quality Goals

- 100% component documentation coverage
- Update within 7 days of code changes
- All examples tested and working
- Zero broken links
- 90% user satisfaction rating

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-01-20  
**Next Review**: 2025-04-20  
**Maintained By**: Design System Team