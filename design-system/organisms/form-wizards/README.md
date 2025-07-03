# Form Wizards & Multi-step Flows - Organisms

Complex multi-step forms with validation, progress tracking, and conditional logic flows designed for comprehensive data collection and user onboarding in the Fondation Botnar dashboard ecosystem.

## Overview

Form wizards represent sophisticated organisms that guide users through complex multi-step processes with validation, progress tracking, and conditional logic. These components ensure accessibility compliance while maintaining intuitive user experiences across all dashboard applications within the Fondation Botnar ecosystem.

## Component Structure

```
form-wizards/
├── index.html                    # Complete form wizard showcase
├── README.md                     # This documentation file
└── form-wizard-utilities.css     # Specialized CSS for wizard components
```

## Wizard Variants

### 1. Program Creation Wizard
**Purpose**: Comprehensive 5-step program setup workflow
**Key Features**:
- Program information collection
- Impact measurement setup
- Partner selection and management
- Budget planning and allocation
- Review and confirmation process
- Field-level and step-level validation

**Steps**:
1. **Program Details**: Basic program information, objectives, and timeline
2. **Impact Metrics**: KPIs, measurement methods, and success criteria
3. **Partners**: Partner selection, roles, and collaboration setup
4. **Budget**: Financial planning, allocation, and resource management
5. **Review**: Comprehensive review and final confirmation

### 2. Impact Evaluation Wizard
**Purpose**: Structured impact assessment and evaluation workflow
**Key Features**:
- Evaluation methodology selection
- Data collection setup
- Analysis framework configuration
- Reporting template creation
- Timeline and milestone planning

**Use Cases**:
- Program impact assessments
- Grant evaluation processes
- Performance measurement setup
- Outcome tracking configuration

### 3. Partnership Setup Wizard
**Purpose**: Partner onboarding and collaboration establishment
**Key Features**:
- Partner profile creation
- Collaboration agreement setup
- Communication channel configuration
- Role and responsibility assignment
- Integration and workflow setup

**Use Cases**:
- New partner onboarding
- Collaboration agreement setup
- Multi-stakeholder project initialization
- Partnership management workflows

## Technical Implementation

### State Management
Form wizard state is managed through Alpine.js reactive data:

```javascript
{
  // Current wizard state
  currentStep: 1,
  totalSteps: 5,
  wizard: 'program',  // program, evaluation, partnership
  
  // Form data for each step
  formData: {
    step1: {
      programName: '',
      description: '',
      startDate: '',
      endDate: '',
      objectives: []
    },
    step2: {
      kpis: [],
      measurementMethods: [],
      successCriteria: ''
    },
    // ... additional steps
  },
  
  // Validation state
  validation: {
    step1: { isValid: false, errors: {} },
    step2: { isValid: false, errors: {} },
    // ... validation for each step
  },
  
  // Progress tracking
  completedSteps: [],
  canProceed: false
}
```

### Progress Tracking
Visual progress indication with step completion status:

```html
<!-- Progress Bar -->
<div class="flex items-center justify-between mb-8">
    <template x-for="step in totalSteps" :key="step">
        <div class="flex items-center">
            <!-- Step Indicator -->
            <div class="flex items-center justify-center w-10 h-10 rounded-full"
                 :class="{
                     'bg-botnar-pink-500 text-white': step <= currentStep,
                     'bg-gray-200 dark:bg-gray-700 text-gray-400': step > currentStep
                 }">
                <span x-text="step"></span>
            </div>
            
            <!-- Step Connector -->
            <div x-show="step < totalSteps" 
                 class="w-full h-1 mx-4"
                 :class="{
                     'bg-botnar-pink-500': step < currentStep,
                     'bg-gray-200 dark:bg-gray-700': step >= currentStep
                 }">
            </div>
        </div>
    </template>
</div>
```

### Validation System
Comprehensive validation with field-level and step-level validation:

```javascript
// Field validation
validateField(field, value, rules) {
    const errors = [];
    
    if (rules.required && !value.trim()) {
        errors.push(`${field} is required`);
    }
    
    if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
    }
    
    if (rules.email && !this.isValidEmail(value)) {
        errors.push(`${field} must be a valid email address`);
    }
    
    return errors;
},

// Step validation
validateStep(stepNumber) {
    const stepData = this.formData[`step${stepNumber}`];
    const validation = this.validation[`step${stepNumber}`];
    
    validation.errors = {};
    validation.isValid = true;
    
    // Validate each field in the step
    Object.keys(stepData).forEach(field => {
        const rules = this.getValidationRules(stepNumber, field);
        const errors = this.validateField(field, stepData[field], rules);
        
        if (errors.length > 0) {
            validation.errors[field] = errors;
            validation.isValid = false;
        }
    });
    
    return validation.isValid;
}
```

### Navigation System
Intuitive navigation with validation-gated progression:

```javascript
// Navigate to next step
nextStep() {
    if (this.validateStep(this.currentStep)) {
        if (!this.completedSteps.includes(this.currentStep)) {
            this.completedSteps.push(this.currentStep);
        }
        
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.scrollToTop();
        }
    }
},

// Navigate to previous step
prevStep() {
    if (this.currentStep > 1) {
        this.currentStep--;
        this.scrollToTop();
    }
},

// Jump to specific step (only if accessible)
goToStep(stepNumber) {
    if (stepNumber <= Math.max(...this.completedSteps) + 1) {
        this.currentStep = stepNumber;
        this.scrollToTop();
    }
}
```

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Form Structure**: Proper fieldset and legend elements for step grouping
- **Keyboard Navigation**: Full keyboard accessibility with intuitive tab order
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Error Handling**: Clear error messages with proper associations
- **Progress Indication**: Accessible progress tracking with screen reader announcements

### Keyboard Navigation
- **Tab/Shift+Tab**: Navigate between form fields and buttons
- **Enter**: Submit current step or activate focused button
- **Space**: Activate checkboxes and buttons
- **Arrow Keys**: Navigate between radio button options
- **Escape**: Cancel current action or close help text

### Screen Reader Features
```html
<!-- Step Progress Announcement -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
    <span x-text="`Step ${currentStep} of ${totalSteps}: ${getCurrentStepTitle()}`"></span>
</div>

<!-- Form Field with Error Association -->
<div class="form-group">
    <label for="program-name" class="form-label">Program Name</label>
    <input id="program-name" 
           type="text" 
           class="form-input"
           :aria-describedby="validation.step1.errors.programName ? 'program-name-error' : null"
           :aria-invalid="validation.step1.errors.programName ? 'true' : 'false'">
    
    <div x-show="validation.step1.errors.programName" 
         id="program-name-error" 
         class="form-error" 
         role="alert">
        <span x-text="validation.step1.errors.programName?.[0]"></span>
    </div>
</div>
```

## Advanced Features

### Conditional Logic
Dynamic form behavior based on user selections:

```javascript
// Conditional field display
showBudgetDetails() {
    return this.formData.step4.budgetType === 'detailed';
},

// Dynamic step requirements
getRequiredSteps() {
    const required = [1, 2, 5]; // Always required
    
    if (this.formData.step1.hasPartners) {
        required.push(3); // Partners step
    }
    
    if (this.formData.step1.hasBudget) {
        required.push(4); // Budget step
    }
    
    return required.sort();
}
```

### Auto-Save Functionality
Automatic form data persistence:

```javascript
// Auto-save implementation
init() {
    this.loadSavedData();
    
    // Auto-save every 30 seconds
    setInterval(() => {
        this.autoSave();
    }, 30000);
    
    // Save on field changes
    this.$watch('formData', () => {
        this.debouncedSave();
    });
},

autoSave() {
    const saveData = {
        currentStep: this.currentStep,
        formData: this.formData,
        completedSteps: this.completedSteps,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('wizard-autosave', JSON.stringify(saveData));
}
```

### Data Validation Rules
Comprehensive validation rule system:

```javascript
validationRules: {
    step1: {
        programName: { required: true, minLength: 3, maxLength: 100 },
        description: { required: true, minLength: 10, maxLength: 500 },
        startDate: { required: true, type: 'date', futureDate: true },
        endDate: { required: true, type: 'date', afterField: 'startDate' }
    },
    step2: {
        kpis: { required: true, minItems: 1, maxItems: 10 },
        measurementFrequency: { required: true, enum: ['monthly', 'quarterly', 'annually'] }
    }
    // ... additional step rules
}
```

## Performance Considerations

### Lazy Loading
- Step content loaded only when accessed
- Dynamic import of validation rules
- Conditional loading of partner/budget components

### Memory Management
- Cleanup of event listeners on component destruction
- Debounced auto-save to prevent excessive storage operations
- Efficient re-rendering with Alpine.js reactivity

### Form Data Optimization
- Structured data organization for efficient validation
- Minimal DOM manipulation during step transitions
- Optimized progress tracking calculations

## Security Considerations

### Data Validation
- Server-side validation mirror for all client-side rules
- Input sanitization for user-generated content
- XSS prevention in dynamic content rendering

### Data Privacy
- No sensitive data logged to console
- Secure handling of form data during transmission
- Clear data retention policies for auto-saved content

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Dependencies

- **Alpine.js**: 3.x (reactive framework and form handling)
- **Tailwind CSS**: 3.x (utility classes)
- **Inter Font**: Variable font for typography

## Usage Examples

### Basic Program Creation Wizard
```javascript
// Initialize program creation wizard
this.wizard = 'program';
this.currentStep = 1;
this.totalSteps = 5;
this.resetFormData();

// Handle step navigation
this.nextStep(); // Validates current step before proceeding
this.prevStep(); // No validation required for backward navigation
```

### Custom Validation Rules
```javascript
// Add custom validation rule
this.addValidationRule('step1', 'programName', {
    custom: (value) => {
        return value.toLowerCase() !== 'test' || 'Program name cannot be "test"';
    }
});

// Validate specific field
const isValid = this.validateField('programName', this.formData.step1.programName, {
    required: true,
    minLength: 3,
    custom: this.validationRules.step1.programName.custom
});
```

### Progress Tracking
```javascript
// Get completion percentage
getCompletionPercentage() {
    return Math.round((this.completedSteps.length / this.totalSteps) * 100);
}

// Check if wizard can be submitted
canSubmit() {
    return this.completedSteps.length === this.totalSteps &&
           this.currentStep === this.totalSteps &&
           this.validateStep(this.totalSteps);
}
```

## Integration Patterns

### API Integration
```javascript
// Submit wizard data
async submitWizard() {
    if (!this.canSubmit()) return;
    
    this.isSubmitting = true;
    
    try {
        const response = await fetch('/api/programs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`
            },
            body: JSON.stringify(this.formData)
        });
        
        if (response.ok) {
            this.showSuccessMessage();
            this.resetWizard();
        } else {
            this.showErrorMessage('Failed to create program. Please try again.');
        }
    } catch (error) {
        this.showErrorMessage('Network error. Please check your connection.');
    } finally {
        this.isSubmitting = false;
    }
}
```

### Validation Integration
```javascript
// Server-side validation integration
async validateStepOnServer(stepNumber) {
    const stepData = this.formData[`step${stepNumber}`];
    
    try {
        const response = await fetch(`/api/validate/step${stepNumber}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stepData)
        });
        
        const validation = await response.json();
        
        if (!validation.isValid) {
            this.validation[`step${stepNumber}`].errors = validation.errors;
            this.validation[`step${stepNumber}`].isValid = false;
        }
        
        return validation.isValid;
    } catch (error) {
        console.error('Server validation failed:', error);
        return true; // Fallback to client-side validation
    }
}
```

## Customization Options

### Step Configuration
```javascript
// Custom step configuration
stepConfig: {
    1: {
        title: 'Program Details',
        subtitle: 'Basic information about your program',
        icon: 'document-text',
        required: true
    },
    2: {
        title: 'Impact Metrics',
        subtitle: 'Define success measurements',
        icon: 'chart-bar',
        required: true,
        conditional: (data) => data.step1.trackImpact
    }
    // ... additional step configurations
}
```

### Theme Customization
```css
/* Custom wizard themes */
.wizard-theme-compact .wizard-step {
    @apply py-4 px-6;
}

.wizard-theme-detailed .wizard-step {
    @apply py-8 px-12;
}

.wizard-theme-minimal .wizard-progress {
    @apply hidden;
}
```

## Testing Strategy

### Unit Testing
```javascript
// Example test cases
describe('Form Wizard', () => {
    test('should validate required fields', () => {
        const wizard = new FormWizard();
        wizard.formData.step1.programName = '';
        
        const isValid = wizard.validateStep(1);
        expect(isValid).toBe(false);
        expect(wizard.validation.step1.errors.programName).toBeDefined();
    });
    
    test('should prevent navigation with invalid data', () => {
        const wizard = new FormWizard();
        wizard.currentStep = 1;
        wizard.formData.step1.programName = '';
        
        wizard.nextStep();
        expect(wizard.currentStep).toBe(1); // Should not advance
    });
});
```

### Accessibility Testing
- Screen reader navigation testing
- Keyboard-only interaction validation
- Form submission with assistive technology
- Error announcement verification
- Progress tracking accessibility

### Integration Testing
- Multi-step form completion flows
- Auto-save and recovery testing
- Server validation integration
- Cross-browser compatibility
- Performance under large datasets

## Troubleshooting

### Common Issues

1. **Validation Not Working**
   - Verify validation rules are properly defined
   - Check Alpine.js reactivity bindings
   - Ensure proper error message associations

2. **Navigation Issues**
   - Validate step completion tracking
   - Check conditional navigation logic
   - Verify keyboard navigation handlers

3. **Auto-Save Problems**
   - Check localStorage availability
   - Verify JSON serialization of form data
   - Test data recovery on page reload

### Debug Mode
Enable debug logging for wizard interactions:

```javascript
// Debug mode activation
if (new URLSearchParams(window.location.search).get('debug') === 'wizard') {
    console.log('Wizard Debug Mode Enabled');
    // Additional debugging output
}
```

## Contributing

When extending form wizard systems:

1. **Follow Validation Patterns**: Maintain consistent validation across all steps
2. **Test Accessibility**: Verify screen reader compatibility and keyboard navigation
3. **Performance First**: Optimize for large forms and complex validation
4. **Document Changes**: Update README and inline comments
5. **Cross-browser Testing**: Verify compatibility across supported browsers

## Related Components

- **Atoms**: Button Components, Form Elements, Typography
- **Molecules**: Card Components, Navigation Components
- **Organisms**: Dashboard Layouts (wizard integration), Modal Systems

---

**Component Status**: ✅ Production Ready  
**Last Updated**: July 2025  
**Version**: 1.0.0  
**Complexity**: 🔴 HIGH (5-7 days implementation)