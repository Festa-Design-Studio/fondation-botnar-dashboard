# Form Elements Atom

Comprehensive form components designed for the Fondation Botnar dashboard, providing accessible, validated form inputs with consistent styling and interaction patterns that follow WCAG 2.1 AA guidelines.

## Overview

The form system provides a complete set of form elements including text inputs, selects, textareas, checkboxes, and radio buttons. Each component includes multiple states (default, focus, error, success, disabled) and comprehensive accessibility features.

### Key Features
- **8+ input types** with consistent styling
- **4 validation states** (default, success, error, warning)
- **Full accessibility** with ARIA support and screen reader compatibility
- **Dark mode support** with automatic theme adaptation
- **Interactive validation** with real-time feedback
- **CSS utilities** for consistent form layouts and styling

## Form Elements

### Input Types

#### Text Input
Basic text input for general text entry.
```html
<div class="form-group">
    <label for="text-input" class="form-label">
        Text Input
        <span class="text-red-500" aria-label="required">*</span>
    </label>
    <input type="text" 
           id="text-input"
           name="text"
           class="form-input"
           placeholder="Enter text..."
           aria-describedby="text-help"
           required>
    <div id="text-help" class="form-help">
        Enter your information here
    </div>
</div>
```

#### Email Input
Email input with built-in validation.
```html
<div class="form-group">
    <label for="email-input" class="form-label">Email Address</label>
    <input type="email" 
           id="email-input"
           name="email"
           class="form-input"
           placeholder="your.email@example.com"
           aria-describedby="email-help">
    <div id="email-help" class="form-help">
        We'll never share your email with anyone else
    </div>
</div>
```

#### Password Input
Password input with security considerations.
```html
<div class="form-group">
    <label for="password-input" class="form-label">Password</label>
    <input type="password" 
           id="password-input"
           name="password"
           class="form-input"
           placeholder="Enter password..."
           aria-describedby="password-help">
    <div id="password-help" class="form-help">
        Must be at least 8 characters long
    </div>
</div>
```

#### Number Input
Number input for numeric values.
```html
<div class="form-group">
    <label for="number-input" class="form-label">Age</label>
    <input type="number" 
           id="number-input"
           name="age"
           class="form-input"
           min="0"
           max="120"
           placeholder="25">
</div>
```

#### Telephone Input
Telephone input for phone numbers.
```html
<div class="form-group">
    <label for="tel-input" class="form-label">Phone Number</label>
    <input type="tel" 
           id="tel-input"
           name="phone"
           class="form-input"
           placeholder="+1 (555) 123-4567">
</div>
```

### Select Elements

#### Single Select
Dropdown select for single choice selection.
```html
<div class="form-group">
    <label for="single-select" class="form-label">Organization Type</label>
    <select id="single-select" 
            name="organization"
            class="form-select"
            aria-describedby="select-help">
        <option value="">Choose an option</option>
        <option value="nonprofit">Non-profit Organization</option>
        <option value="academic">Academic Institution</option>
        <option value="government">Government Agency</option>
        <option value="private">Private Company</option>
    </select>
    <div id="select-help" class="form-help">
        Select the option that best describes your organization
    </div>
</div>
```

#### Multiple Select
Select element allowing multiple choices.
```html
<div class="form-group">
    <label for="multi-select" class="form-label">Areas of Interest</label>
    <select id="multi-select" 
            name="interests"
            class="form-select"
            multiple
            size="4">
        <option value="health">Child Health</option>
        <option value="education">Education</option>
        <option value="technology">Technology</option>
        <option value="research">Research</option>
    </select>
</div>
```

### Textarea Elements

#### Basic Textarea
Multi-line text input for longer content.
```html
<div class="form-group">
    <label for="textarea" class="form-label">Message</label>
    <textarea id="textarea"
              name="message"
              class="form-textarea"
              rows="4"
              placeholder="Enter your message..."
              aria-describedby="textarea-help"></textarea>
    <div id="textarea-help" class="form-help">
        Maximum 500 characters
    </div>
</div>
```

### Checkbox Elements

#### Single Checkbox
Individual checkbox for binary choices.
```html
<div class="form-group">
    <div class="form-checkbox-group">
        <input type="checkbox" 
               id="newsletter"
               name="newsletter"
               class="form-checkbox">
        <label for="newsletter" class="form-checkbox-label">
            Subscribe to newsletter updates
        </label>
    </div>
</div>
```

#### Checkbox Group
Multiple related checkboxes.
```html
<div class="form-group">
    <fieldset>
        <legend class="form-label">Communication Preferences</legend>
        <div class="space-y-2">
            <div class="form-checkbox-group">
                <input type="checkbox" id="email-updates" name="preferences" value="email" class="form-checkbox">
                <label for="email-updates" class="form-checkbox-label">Email updates</label>
            </div>
            <div class="form-checkbox-group">
                <input type="checkbox" id="sms-updates" name="preferences" value="sms" class="form-checkbox">
                <label for="sms-updates" class="form-checkbox-label">SMS notifications</label>
            </div>
            <div class="form-checkbox-group">
                <input type="checkbox" id="mail-updates" name="preferences" value="mail" class="form-checkbox">
                <label for="mail-updates" class="form-checkbox-label">Postal mail</label>
            </div>
        </div>
    </fieldset>
</div>
```

### Radio Button Elements

#### Radio Group
Mutually exclusive options.
```html
<div class="form-group">
    <fieldset>
        <legend class="form-label">
            Preferred Contact Method
            <span class="text-red-500" aria-label="required">*</span>
        </legend>
        <div class="space-y-2">
            <div class="form-radio-group">
                <input type="radio" id="contact-email" name="contact-method" value="email" class="form-radio" required>
                <label for="contact-email" class="form-radio-label">Email</label>
            </div>
            <div class="form-radio-group">
                <input type="radio" id="contact-phone" name="contact-method" value="phone" class="form-radio" required>
                <label for="contact-phone" class="form-radio-label">Phone</label>
            </div>
            <div class="form-radio-group">
                <input type="radio" id="contact-mail" name="contact-method" value="mail" class="form-radio" required>
                <label for="contact-mail" class="form-radio-label">Postal Mail</label>
            </div>
        </div>
    </fieldset>
</div>
```

## Validation States

### Success State
Indicates successful validation.
```html
<div class="form-group">
    <label for="success-input" class="form-label">Valid Field</label>
    <input type="text" 
           id="success-input"
           class="form-input form-input-success"
           value="Valid input">
    <div class="form-success">This field is valid</div>
</div>
```

### Error State
Indicates validation errors.
```html
<div class="form-group">
    <label for="error-input" class="form-label">Invalid Field</label>
    <input type="text" 
           id="error-input"
           class="form-input form-input-error"
           value="Invalid input"
           aria-describedby="error-message"
           aria-invalid="true">
    <div id="error-message" class="form-error">
        This field is required
    </div>
</div>
```

### Warning State
Indicates warnings or suggestions.
```html
<div class="form-group">
    <label for="warning-input" class="form-label">Warning Field</label>
    <input type="text" 
           id="warning-input"
           class="form-input form-input-warning"
           value="Weak password">
    <div class="form-warning">
        Consider using a stronger password
    </div>
</div>
```

### Disabled State
Non-interactive disabled fields.
```html
<div class="form-group">
    <label for="disabled-input" class="form-label">Disabled Field</label>
    <input type="text" 
           id="disabled-input"
           class="form-input"
           value="Cannot edit"
           disabled>
</div>
```

## Properties & Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | string | `md` | Field size (sm, md, lg) |
| `state` | string | `default` | Validation state (default, success, error, warning) |
| `disabled` | boolean | `false` | Disable field interaction |
| `required` | boolean | `false` | Mark field as required |
| `readonly` | boolean | `false` | Make field read-only |

## CSS Classes

### Layout Classes
```css
.form-group          /* Form field wrapper */
.form-inline         /* Inline form layout */
.form-grid           /* Grid form layout */
.form-grid-2         /* 2-column grid */
.form-grid-3         /* 3-column grid */
```

### Field Classes
```css
.form-label          /* Field labels */
.form-input          /* Text inputs */
.form-select         /* Select elements */
.form-textarea       /* Textarea elements */
.form-checkbox       /* Checkbox inputs */
.form-radio          /* Radio inputs */
```

### State Classes
```css
.form-input-success  /* Success state */
.form-input-error    /* Error state */
.form-input-warning  /* Warning state */
.form-input-sm       /* Small size */
.form-input-lg       /* Large size */
```

### Message Classes
```css
.form-help           /* Help text */
.form-success        /* Success messages */
.form-error          /* Error messages */
.form-warning        /* Warning messages */
```

## Accessibility

### ARIA Support
All form elements include proper ARIA attributes for screen reader compatibility:

- `aria-describedby` - Links help text and error messages
- `aria-invalid` - Indicates validation state
- `aria-required` - Marks required fields
- `role` and `aria-label` - Provides context for screen readers

### Keyboard Navigation
- Tab order follows logical sequence
- All interactive elements are keyboard accessible
- Focus indicators are clearly visible
- Enter and Space keys work as expected

### Screen Reader Support
- Labels are properly associated with form controls
- Error messages are announced when validation fails
- Help text provides additional context
- Required fields are clearly identified

### Color and Contrast
- All text meets WCAG AA contrast requirements
- Validation states use multiple indicators (color, icons, text)
- Focus indicators are highly visible
- Dark mode maintains accessibility standards

## Interactive Showcase

### [Form Elements Showcase](./index.html)
Interactive form demonstration with real-time validation and accessibility features.

**Features:**
- Complete form with all input types
- Real-time validation feedback
- Accessibility demonstrations
- Dark mode support
- Keyboard navigation testing
- Screen reader announcements

## Form Layout Examples

### Basic Form
```html
<form class="space-y-6">
    <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" class="form-input" required>
    </div>
    
    <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-input" required>
    </div>
    
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</form>
```

### Grid Layout Form
```html
<form class="form-grid form-grid-2">
    <div class="form-group">
        <label for="first-name" class="form-label">First Name</label>
        <input type="text" id="first-name" class="form-input">
    </div>
    
    <div class="form-group">
        <label for="last-name" class="form-label">Last Name</label>
        <input type="text" id="last-name" class="form-input">
    </div>
    
    <div class="form-group" style="grid-column: 1 / -1;">
        <label for="address" class="form-label">Address</label>
        <input type="text" id="address" class="form-input">
    </div>
</form>
```

### Inline Form
```html
<form class="form-inline">
    <div class="form-group">
        <label for="search" class="form-label">Search</label>
        <input type="text" id="search" class="form-input" placeholder="Enter search term">
    </div>
    
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Search</button>
    </div>
</form>
```

## Best Practices

### Do's
✅ Always include proper labels for form fields  
✅ Use aria-describedby for help text and error messages  
✅ Mark required fields clearly with visual and programmatic indicators  
✅ Provide clear, helpful error messages  
✅ Group related fields using fieldsets  
✅ Test with keyboard navigation and screen readers  

### Don'ts
❌ Use placeholder text as the only label  
❌ Rely solely on color to indicate validation states  
❌ Make forms longer than necessary  
❌ Use generic error messages  
❌ Forget to test accessibility features  
❌ Override focus indicators without providing alternatives  

## JavaScript Integration

### Basic Validation Example
```javascript
function validateForm(formData) {
    const errors = {};
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    return errors;
}
```

### Alpine.js Integration
```javascript
function formComponent() {
    return {
        formData: {
            name: '',
            email: ''
        },
        errors: {},
        
        validateField(field) {
            // Clear previous error
            this.errors[field] = '';
            
            // Validate specific field
            if (field === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.formData.email)) {
                    this.errors.email = 'Invalid email format';
                }
            }
        },
        
        getFieldClass(field) {
            if (this.errors[field]) return 'form-input-error';
            if (this.formData[field]) return 'form-input-success';
            return '';
        }
    }
}
```

## Related Components
- **[Buttons](../buttons/README.md)**: Form submission and action buttons
- **[Icons](../icons/README.md)**: Form field icons and validation indicators
- **[Colors](../colors/README.md)**: Form element color schemes
- **[Typography](../typography/README.md)**: Form text and label styling

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Full HTML5 form validation support
- CSS custom properties supported

## Testing Checklist

### Accessibility Testing
- [ ] All form fields have proper labels
- [ ] Required fields are marked both visually and programmatically
- [ ] Error messages are announced by screen readers
- [ ] Keyboard navigation works throughout the form
- [ ] Focus indicators are clearly visible
- [ ] Color contrast meets WCAG AA standards

### Functionality Testing
- [ ] Form validation works correctly
- [ ] Error states display appropriate messages
- [ ] Success states provide positive feedback
- [ ] Disabled states prevent interaction
- [ ] Form submission handles all scenarios

### Visual Testing
- [ ] Forms render correctly across browsers
- [ ] Dark mode variations display properly
- [ ] Responsive layouts adapt to screen sizes
- [ ] Spacing and alignment are consistent
- [ ] Interactive states provide clear feedback

## Files

- **[index.html](./index.html)** - Interactive form elements showcase
- **[form-utilities.css](./form-utilities.css)** - Complete CSS utility classes
- **[README.md](./README.md)** - This documentation file

## Migration Notes
When updating from previous form systems:
- Update class names to follow new utility patterns
- Add proper ARIA attributes for accessibility
- Test all validation states and feedback
- Verify keyboard navigation functionality
- Ensure dark mode compatibility

## Changelog
| Version | Date | Changes |
|---------|------|---------| 
| 1.0.0 | 2025-01-20 | Initial form elements implementation with full accessibility |

---

**Component Status**: Production Ready  
**Last Updated**: 2025-01-20  
**Maintainer**: Design System Team