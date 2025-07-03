# Modal Dialog Systems - Organisms

Accessible modal dialog systems with comprehensive focus management, backdrop handling, and ARIA patterns designed for complex user interactions in the Fondation Botnar dashboard ecosystem.

## Overview

Modal dialog systems represent sophisticated organisms that provide overlay interfaces for critical user interactions. These components ensure accessibility compliance while maintaining intuitive user experiences across all dashboard applications within the Fondation Botnar ecosystem.

## Component Structure

```
modals/
├── index.html              # Complete modal systems showcase
├── README.md               # This documentation file
└── modal-utilities.css     # Specialized CSS for modal components
```

## Modal Variants

### 1. Alert Dialogs
**Purpose**: Single-action dialogs for important messages and system notifications
**Role**: `alertdialog`
**Key Features**:
- Informational alerts for user guidance
- Warning alerts for potential issues
- Error alerts for critical problems
- Success alerts for positive confirmations
- Automatic focus management
- Single dismissal action

**Use Cases**:
- System notifications and status updates
- Validation error messages
- Confirmation of completed actions
- Important announcements

### 2. Confirmation Dialogs
**Purpose**: Two-action dialogs for user confirmation of destructive or important actions
**Role**: `dialog`
**Key Features**:
- Clear action descriptions
- Prominent cancel options
- Destructive action warnings
- Contextual button styling
- Escape key handling

**Use Cases**:
- Delete confirmations with clear consequences
- Save/discard change prompts
- Action confirmations requiring explicit consent
- Data loss prevention warnings

### 3. Content Modals
**Purpose**: Full-featured dialogs for complex content, forms, and detailed information
**Role**: `dialog`
**Key Features**:
- Variable sizing (small, medium, large, extra-large)
- Header with title and close button
- Scrollable content areas
- Footer with action buttons
- Form integration capabilities

**Use Cases**:
- Data entry forms and wizards
- Detailed information displays
- Image galleries and media viewers
- Multi-step processes

### 4. Drawer Panels
**Purpose**: Slide-out panels for contextual content and navigation
**Role**: `dialog`
**Key Features**:
- Four-directional positioning (left, right, top, bottom)
- Responsive sizing
- Overlay backdrop
- Smooth slide animations
- Persistent state management

**Use Cases**:
- Navigation menus and sidebars
- Filter panels and search interfaces
- Secondary forms and settings
- Contextual help and documentation

## Technical Implementation

### Focus Management
All modal components implement comprehensive focus management:

```javascript
// Focus trap implementation
x-trap="modalShow"

// Initial focus setting
this.$nextTick(() => {
    this.$refs.primaryButton?.focus();
});

// Return focus on close
const triggerElement = document.activeElement;
// ... modal interaction ...
triggerElement?.focus();
```

### ARIA Implementation
Proper ARIA roles and attributes for accessibility:

```html
<!-- Alert Dialog -->
<div role="alertdialog" 
     aria-labelledby="alert-title"
     aria-describedby="alert-description">

<!-- Confirmation Dialog -->
<div role="dialog" 
     aria-labelledby="confirm-title"
     aria-describedby="confirm-description">

<!-- Content Modal -->
<div role="dialog" 
     aria-labelledby="modal-title"
     aria-modal="true">
```

### State Management
Modal state is managed through Alpine.js reactive data:

```javascript
{
  // Alert dialog state
  alertModal: {
    show: false,
    type: 'info',      // info, warning, error, success
    title: '',
    message: ''
  },
  
  // Confirmation dialog state
  confirmModal: {
    show: false,
    type: 'delete',    // delete, save, discard
    title: '',
    message: '',
    actionText: '',
    callback: null
  },
  
  // Content modal state
  contentModal: {
    show: false,
    type: 'form',      // form, details, gallery
    title: '',
    size: 'medium'     // small, medium, large, extra-large
  },
  
  // Drawer panel state
  drawer: {
    show: false,
    position: 'left'   // left, right, top, bottom
  }
}
```

### Animation and Transitions
Smooth animations using Alpine.js transitions:

```html
<!-- Fade in/out for backdrop -->
<div x-transition:enter="transition ease-out duration-300"
     x-transition:enter-start="opacity-0"
     x-transition:enter-end="opacity-100"
     x-transition:leave="transition ease-in duration-200"
     x-transition:leave-start="opacity-100"
     x-transition:leave-end="opacity-0">

<!-- Scale and slide for modal content -->
<div x-transition:enter="transition ease-out duration-300"
     x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
     x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100">
```

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Focus Management**: Comprehensive focus trap and restoration
- **Keyboard Navigation**: Full keyboard accessibility with intuitive shortcuts
- **Screen Reader Support**: Proper ARIA roles, labels, and descriptions
- **Color Contrast**: High contrast ratios maintained across all themes
- **Semantic Structure**: Logical heading hierarchy and content organization

### Keyboard Navigation
- **Escape Key**: Closes modal (configurable)
- **Tab/Shift+Tab**: Navigate between interactive elements
- **Enter**: Activates primary action button
- **Space**: Activates focused button
- **Arrow Keys**: Navigate between options in confirmation dialogs

### Screen Reader Features
```html
<!-- Live region for announcements -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
    <span x-text="announcement"></span>
</div>

<!-- Descriptive labels -->
<button aria-label="Close modal" 
        aria-describedby="close-help">
    <span id="close-help" class="sr-only">
        Press Escape key or click to close
    </span>
</button>
```

## Performance Considerations

### Lazy Loading
- Modal content loaded only when needed
- Dynamic content generation for complex modals
- Image lazy loading in gallery modals

### Memory Management
- Proper cleanup of event listeners
- DOM element removal on modal close
- State reset to prevent memory leaks

### Animation Performance
- CSS transforms for smooth animations
- Hardware acceleration for better performance
- Reduced motion support for accessibility

## Security Considerations

### Content Security
- Sanitized HTML content in dynamic modals
- XSS prevention in user-generated content
- Secure handling of external content

### Data Privacy
- No sensitive data logged to console
- Secure transmission of form data
- Proper validation of user inputs

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Dependencies

- **Alpine.js**: 3.x (reactive framework and focus trap)
- **Tailwind CSS**: 3.x (utility classes)
- **Inter Font**: Variable font for typography

## Usage Examples

### Basic Alert Dialog
```javascript
// Show an informational alert
showAlert('info');

// Alert with custom content
this.alertModal = {
    show: true,
    type: 'warning',
    title: 'Data Sync Warning',
    message: 'Your local data may be out of sync. Please refresh to get the latest information.'
};
```

### Confirmation Dialog
```javascript
// Delete confirmation
showConfirmation('delete');

// Custom confirmation with callback
this.confirmModal = {
    show: true,
    type: 'save',
    title: 'Save Changes',
    message: 'Do you want to save your changes before leaving this page?',
    actionText: 'Save',
    callback: () => {
        this.saveData();
        this.navigate('/dashboard');
    }
};
```

### Content Modal
```javascript
// Form modal
this.contentModal = {
    show: true,
    type: 'form',
    title: 'Create New Program',
    size: 'large'
};

// Details modal
this.contentModal = {
    show: true,
    type: 'details',
    title: 'Program Information',
    size: 'medium'
};
```

### Drawer Panel
```javascript
// Left sidebar drawer
this.drawer = {
    show: true,
    position: 'left'
};

// Bottom notification drawer
this.drawer = {
    show: true,
    position: 'bottom'
};
```

## Integration Patterns

### Form Integration
```html
<!-- Modal with form -->
<div class="modal-content">
    <form @submit.prevent="submitForm()" class="space-y-6">
        <div>
            <label class="block text-sm font-medium mb-2">Program Name</label>
            <input x-model="formData.name" type="text" class="form-input" required>
        </div>
        <!-- More form fields -->
        <div class="flex justify-end space-x-3">
            <button type="button" @click="closeModal()" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
        </div>
    </form>
</div>
```

### API Integration
```javascript
// Modal with API data loading
async openDetailsModal(programId) {
    this.contentModal = {
        show: true,
        type: 'details',
        title: 'Loading...',
        size: 'medium'
    };
    
    try {
        const program = await this.fetchProgram(programId);
        this.contentModal.title = program.name;
        this.programData = program;
    } catch (error) {
        this.showAlert('error');
        this.closeContentModal();
    }
}
```

## Customization Options

### Sizing Configuration
```javascript
// Custom modal sizes
const modalSizes = {
    'extra-small': 'max-w-sm',
    'small': 'max-w-md',
    'medium': 'max-w-2xl',
    'large': 'max-w-4xl',
    'extra-large': 'max-w-6xl',
    'full-screen': 'max-w-full h-full'
};
```

### Theme Customization
```css
/* Custom modal themes */
.modal-theme-danger {
    @apply border-l-4 border-red-500;
}

.modal-theme-warning {
    @apply border-l-4 border-yellow-500;
}

.modal-theme-success {
    @apply border-l-4 border-green-500;
}
```

## Testing Strategy

### Unit Testing
```javascript
// Example test cases
describe('Modal Systems', () => {
    test('should show alert modal', () => {
        const component = new ModalSystem();
        component.showAlert('info');
        expect(component.alertModal.show).toBe(true);
    });
    
    test('should handle keyboard navigation', () => {
        const component = new ModalSystem();
        component.showAlert('info');
        
        // Simulate Escape key press
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);
        
        expect(component.alertModal.show).toBe(false);
    });
});
```

### Accessibility Testing
- Screen reader navigation testing
- Keyboard-only interaction validation
- Focus trap verification
- ARIA attribute compliance
- Color contrast validation

### Integration Testing
- Modal stacking behavior
- Form submission handling
- API integration testing
- Cross-browser compatibility

## Troubleshooting

### Common Issues

1. **Focus Trap Not Working**
   - Verify Alpine.js version (3.x required)
   - Check for conflicting JavaScript
   - Ensure proper x-trap directive usage

2. **Modal Not Closing on Backdrop Click**
   - Verify click event handler placement
   - Check for event propagation issues
   - Ensure backdrop element positioning

3. **Accessibility Issues**
   - Validate ARIA roles and properties
   - Test keyboard navigation flow
   - Verify screen reader announcements

### Debug Mode
Enable debug logging for modal interactions:

```javascript
// Debug mode activation
if (new URLSearchParams(window.location.search).get('debug') === 'modals') {
    console.log('Modal Debug Mode Enabled');
    // Additional debugging output
}
```

## Contributing

When extending modal systems:

1. **Follow Accessibility Patterns**: Maintain WCAG 2.1 AA compliance
2. **Test with Assistive Technology**: Verify screen reader compatibility
3. **Performance First**: Optimize animations and interactions
4. **Document Changes**: Update README and inline comments
5. **Cross-browser Testing**: Verify compatibility across supported browsers

## Related Components

- **Atoms**: Button Components, Form Elements, Typography
- **Molecules**: Card Components, Navigation Components
- **Organisms**: Dashboard Layouts (modal integration)

---

**Component Status**: ✅ Production Ready  
**Last Updated**: July 2025  
**Version**: 1.0.0  
**Complexity**: 🟡 MEDIUM (4-5 days implementation)