# Atoms - Fondation Botnar Design System

Atoms are the basic building blocks of our design system. These are the foundational HTML elements styled with Botnar's design tokens.

## Overview

Atoms include:
- **Typography**: Headings, paragraphs, labels, captions
- **Colors**: Brand colors, semantic colors, backgrounds
- **Buttons**: Primary, secondary, ghost, icon buttons
- **Form Elements**: Inputs, selects, checkboxes, radio buttons
- **Icons**: UI icons, status indicators, brand icons
- **Spacing**: Margins, paddings, gaps
- **Borders**: Radius, widths, styles

## Naming Convention

Atom components should follow this structure:
```
atoms/
├── buttons/
│   ├── primary-button.html
│   ├── secondary-button.html
│   └── README.md
├── typography/
│   ├── headings.html
│   ├── body-text.html
│   └── README.md
└── ...
```

## Implementation Guidelines

### Accessibility Requirements
- All atoms must meet WCAG 2.1 AA standards
- Minimum 4.5:1 color contrast ratio
- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

### Code Standards
- Use Tailwind CSS utility classes
- Follow BEM naming for custom classes
- Include Alpine.js directives where needed
- Validate HTML structure

### Documentation Requirements
Each atom must include:
1. **Usage Examples**: Basic implementation code
2. **Variations**: Different states and styles
3. **Accessibility Notes**: Screen reader labels, keyboard shortcuts
4. **Design Tokens**: Colors, spacing, typography used
5. **Browser Support**: Compatibility information

## Testing Checklist

- [ ] Visual regression testing
- [ ] Accessibility audit (WAVE, axe)
- [ ] Cross-browser compatibility
- [ ] Responsive behavior
- [ ] Color contrast validation
- [ ] Keyboard navigation testing
- [ ] Screen reader testing

## Status Tracking

| Component | Status | Accessibility | Documentation | Tests |
|-----------|--------|---------------|---------------|-------|
| Primary Button | ✅ | ✅ | ✅ | ✅ |
| Typography | ✅ | ✅ | ✅ | ✅ |
| Form Elements | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Icons | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Colors | ✅ | ✅ | ✅ | ✅ |

**Legend**: ✅ Complete | 🔄 In Progress | ⏸️ Not Started | ❌ Failed

---

**Last Updated**: January 2025  
**Next Review**: Phase 2 Development