# Documentation System Setup Instructions

This guide provides step-by-step instructions for setting up and using the Fondation Botnar Dashboard documentation system.

## Prerequisites

Before starting, ensure you have:
- Node.js 16+ and npm installed
- Git for version control
- A code editor (VS Code recommended)
- Basic knowledge of Markdown
- Access to the project repository

## Initial Setup

### 1. Clone the Repository

```bash
# Clone the project
git clone [repository-url]
cd fondation-botnar-dashboard

# Install dependencies
npm install
```

### 2. Documentation Structure

Verify the documentation structure is in place:

```
/fondation-botnar-dashboard/
├── /documentation/
│   ├── /templates/           # README templates for each level
│   │   ├── README-atoms-template.md
│   │   ├── README-molecules-template.md
│   │   ├── README-organisms-template.md
│   │   ├── README-templates-template.md
│   │   └── README-pages-template.md
│   ├── documentation-guidelines.md
│   ├── implementation-tracking-guide.md
│   ├── setup-instructions.md (this file)
│   └── /guides/             # Additional guides
├── /design-system/
│   ├── /atoms/
│   ├── /molecules/
│   ├── /organisms/
│   ├── /templates/
│   └── /pages/
└── botnar_implementation_tracker.md
```

### 3. Install Documentation Tools

```bash
# Install documentation dependencies
npm install --save-dev \
  markdown-lint \
  markdown-link-check \
  prettier \
  husky \
  lint-staged

# Setup git hooks for documentation
npx husky install
```

### 4. Configure Documentation Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "docs:lint": "markdownlint 'documentation/**/*.md' 'design-system/**/*.md'",
    "docs:links": "markdown-link-check documentation/**/*.md",
    "docs:format": "prettier --write '**/*.md'",
    "docs:check": "npm run docs:lint && npm run docs:links",
    "docs:serve": "npx http-server ./documentation -p 8080",
    "docs:new": "node scripts/create-component-docs.js"
  }
}
```

## Creating Component Documentation

### Step 1: Choose the Correct Template

Based on your component type:
- **Atoms**: Use `README-atoms-template.md`
- **Molecules**: Use `README-molecules-template.md`
- **Organisms**: Use `README-organisms-template.md`
- **Templates**: Use `README-templates-template.md`
- **Pages**: Use `README-pages-template.md`

### Step 2: Create Component Folder

```bash
# Example for a new button atom
mkdir -p design-system/atoms/buttons
cd design-system/atoms/buttons
```

### Step 3: Copy and Customize Template

```bash
# Copy the appropriate template
cp ../../../documentation/templates/README-atoms-template.md ./README.md

# Edit with your preferred editor
code README.md
```

### Step 4: Fill in Component Information

Replace all template placeholders:
- `[Component Name]` → Actual component name
- `[Brief description]` → One-line component description
- `[Detailed explanation]` → Comprehensive overview
- Remove any sections not applicable
- Add component-specific sections as needed

### Step 5: Add Code Examples

Write actual, working code examples:

```markdown
## Usage

### Basic Implementation

```html
<!-- Real, tested code -->
<button class="btn-primary" type="button">
  Click Me
</button>
```

### With Alpine.js

```html
<button class="btn-primary" 
        x-data="{ clicked: false }"
        @click="clicked = true"
        :class="{ 'btn-success': clicked }">
  <span x-text="clicked ? 'Clicked!' : 'Click Me'"></span>
</button>
```
```

### Step 6: Document Accessibility

Always include accessibility information:

```markdown
## Accessibility

### WCAG Compliance
✅ Level AA compliant
- Color contrast ratio: 7.5:1 (exceeds 4.5:1 requirement)
- Touch target size: 44×44px minimum
- Focus indicator: 2px solid outline

### Keyboard Support
| Key | Action |
|-----|--------|
| `Tab` | Focus button |
| `Enter` | Activate button |
| `Space` | Activate button |

### Screen Reader
- Announces button label
- Announces state changes
- Provides action feedback
```

### Step 7: Create Component Files

Implement the actual component:

```bash
# Create component HTML
touch primary-buttons.html

# Create any necessary JavaScript
touch button-component.js

# Create component-specific styles (if needed)
touch button-overrides.css
```

### Step 8: Create Showcase Page

Every component needs a showcase page:

```bash
# Use the showcase template generator
npm run generate:showcase -- --name="Primary Buttons" --type="atom"

# Or create manually
cp ../../../design-system/templates/showcase-template.html ./showcase.html
```

### Step 9: Test Documentation

Run quality checks:

```bash
# Lint markdown files
npm run docs:lint

# Check for broken links
npm run docs:links

# Format documentation
npm run docs:format
```

### Step 10: Update Implementation Tracker

Update `botnar_implementation_tracker.md`:

```markdown
### Task 2.3: Button System Implementation
**Status**: ✅ COMPLETED  
**Completion Date**: 2025-01-20  
**Completed By**: [Your Name]  
**Deliverables**: 
- Button component implementation
- README documentation
- Showcase page
- Accessibility compliance

**Verification**: 
- [x] All button variants implemented
- [x] Documentation complete
- [x] Showcase page functional
- [x] Accessibility tested
```

## Documentation Workflow

### 1. Planning Phase

Before coding:
1. Review design specifications
2. Check implementation tracker
3. Identify dependencies
4. Plan documentation needs

### 2. Development Phase

While coding:
1. Write inline code comments
2. Note design decisions
3. Track accessibility features
4. Capture examples

### 3. Documentation Phase

After coding:
1. Create README using template
2. Add all code examples
3. Document API/props
4. Include accessibility info
5. Add troubleshooting section

### 4. Review Phase

Before marking complete:
1. Run documentation linters
2. Test all code examples
3. Verify links work
4. Check accessibility claims
5. Peer review if possible

### 5. Maintenance Phase

Ongoing:
1. Update when code changes
2. Add new examples from usage
3. Document reported issues
4. Keep dependencies current

## Common Documentation Tasks

### Adding a New Example

```markdown
### Example: Loading State Button

When showing asynchronous operations:

```html
<button class="btn-primary" 
        x-data="{ loading: false }"
        @click="loading = true; saveData()"
        :disabled="loading">
  <span x-show="!loading">Save</span>
  <span x-show="loading" class="flex items-center">
    <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
      <!-- spinner SVG -->
    </svg>
    Saving...
  </span>
</button>
```

**When to use**: 
- Form submissions
- Data operations
- Any action taking >1 second
```

### Documenting Breaking Changes

```markdown
## Migration Guide

### Version 2.0 Breaking Changes

The button component API has changed:

#### Old API (v1.x)
```html
<button class="primary-button" data-variant="large">
  Click Me
</button>
```

#### New API (v2.0)
```html
<button class="btn-primary btn-lg">
  Click Me
</button>
```

#### Migration Steps:
1. Replace `primary-button` with `btn-primary`
2. Replace `data-variant="large"` with `btn-lg`
3. Update any JavaScript references
```

### Creating Visual Documentation

Include diagrams when helpful:

```markdown
## Component Anatomy

```
┌─────────────────────────┐
│  ┌──┐                   │ ← Button Container
│  │📎│  Button Text      │ ← Icon + Label
│  └──┘                   │
└─────────────────────────┘
         ↑
    Focus Ring (on focus)
```

## Visual Breakdown:
- **Container**: Provides click target and padding
- **Icon**: Optional leading/trailing icon
- **Label**: Main button text
- **Focus Ring**: Accessibility indicator
```

## Documentation Best Practices

### 1. Write for Your Audience

**For Developers**:
- Include implementation details
- Show edge cases
- Explain technical decisions

**For Designers**:
- Show visual examples
- Explain constraints
- Document variations

**For Users**:
- Focus on when/why to use
- Provide clear examples
- Avoid technical jargon

### 2. Keep Documentation DRY

Don't Repeat Yourself:
- Link to existing docs instead of duplicating
- Use shared templates
- Reference central guides
- Create reusable snippets

### 3. Version Everything

Track changes:
```markdown
## Changelog

### [1.2.0] - 2025-01-20
#### Added
- Loading state support
- Keyboard shortcuts

#### Changed
- Improved focus styles
- Updated color contrast

#### Fixed
- Memory leak in event handlers
```

### 4. Make Examples Realistic

Bad example:
```html
<button>Button</button>
```

Good example:
```html
<button class="btn-primary" 
        type="button"
        aria-label="Save profile changes"
        @click="saveProfile">
  Save Changes
</button>
```

### 5. Include Anti-Patterns

Show what NOT to do:

```markdown
## Common Mistakes

### ❌ Don't disable buttons without explanation
```html
<!-- Bad: User doesn't know why button is disabled -->
<button class="btn-primary" disabled>Submit</button>
```

### ✅ Do provide context for disabled states
```html
<!-- Good: Clear feedback about why button is disabled -->
<button class="btn-primary" 
        :disabled="!formValid"
        :title="!formValid ? 'Please fill all required fields' : ''">
  Submit
</button>
<p x-show="!formValid" class="text-sm text-red-600">
  Please complete all required fields
</p>
```
```

## Troubleshooting

### Common Issues

#### Documentation not formatting correctly
- Check markdown syntax
- Verify code block languages specified
- Ensure proper indentation

#### Links broken after restructuring
- Run `npm run docs:links`
- Update relative paths
- Use root-relative paths when possible

#### Examples not working
- Test in actual browser
- Check for missing dependencies
- Verify Alpine.js syntax

#### Template not fitting component
- Adapt template as needed
- Add custom sections
- Remove irrelevant sections
- Keep consistent structure

### Getting Help

1. Check documentation guidelines
2. Review existing component docs
3. Ask in team channel
4. Create issue for documentation bugs

## Documentation Checklist

Before marking documentation complete:

### Content
- [ ] Overview provides context
- [ ] All features documented
- [ ] API/props complete
- [ ] Examples are practical
- [ ] Accessibility documented

### Quality
- [ ] No spelling errors
- [ ] Code examples tested
- [ ] Links verified
- [ ] Formatting consistent
- [ ] Images optimized

### Technical
- [ ] Markdown valid
- [ ] Code syntax correct
- [ ] File paths accurate
- [ ] Version info current
- [ ] Dependencies listed

### Process
- [ ] Template used correctly
- [ ] Peer reviewed
- [ ] Tracker updated
- [ ] Committed to git
- [ ] Team notified

## Advanced Documentation

### Interactive Documentation

For complex components, consider:
- CodePen examples
- Embedded demos
- Video walkthroughs
- Interactive playgrounds

### API Documentation

For components with complex APIs:
- Use TypeScript definitions
- Generate from code comments
- Include type information
- Show method signatures

### Performance Documentation

For performance-critical components:
- Include benchmarks
- Document optimization
- Show performance tips
- Explain trade-offs

## Maintenance Schedule

### Daily
- Update task progress
- Fix reported doc bugs

### Weekly
- Review new components
- Update examples
- Check for broken links

### Monthly
- Audit documentation coverage
- Update templates if needed
- Archive old documentation
- Review metrics

### Quarterly
- Major documentation review
- Update setup instructions
- Revise guidelines
- Plan improvements

---

**Setup Guide Version**: 1.0.0  
**Last Updated**: 2025-01-20  
**Maintained By**: Documentation Team  
**Questions**: docs@botnar.org