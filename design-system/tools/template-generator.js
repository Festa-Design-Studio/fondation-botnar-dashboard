/**
 * Fondation Botnar Dashboard - Template Generator
 * 
 * This script generates component showcase pages from the master template
 * by replacing template variables with component-specific data.
 */

const fs = require('fs');
const path = require('path');

/**
 * Template Generator Class
 */
class TemplateGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, '../templates/showcase-template.html');
    this.outputDir = path.join(__dirname, '../../showcase');
    this.template = null;
    
    this.loadTemplate();
    this.ensureOutputDirectory();
  }
  
  /**
   * Load the master template
   */
  loadTemplate() {
    try {
      this.template = fs.readFileSync(this.templatePath, 'utf8');
      console.log('✅ Template loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load template:', error.message);
      process.exit(1);
    }
  }
  
  /**
   * Ensure output directory exists
   */
  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    
    // Create category directories
    const categories = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
    categories.forEach(category => {
      const categoryDir = path.join(this.outputDir, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }
    });
  }
  
  /**
   * Generate a component showcase page
   * @param {Object} componentData - Component configuration
   */
  generateComponent(componentData) {
    try {
      // Validate component data
      this.validateComponentData(componentData);
      
      // Replace template variables
      let html = this.template;
      html = this.replaceVariables(html, componentData);
      
      // Generate output path
      const outputPath = this.getOutputPath(componentData);
      
      // Write file
      fs.writeFileSync(outputPath, html, 'utf8');
      
      console.log(`✅ Generated: ${outputPath}`);
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Failed to generate component ${componentData.name}:`, error.message);
      throw error;
    }
  }
  
  /**
   * Replace template variables with component data
   * @param {string} html - Template HTML
   * @param {Object} data - Component data
   * @returns {string} Processed HTML
   */
  replaceVariables(html, data) {
    // Simple template variable replacement
    // In a production system, you might want to use a proper template engine
    
    // Flatten nested objects for easier replacement
    const flatData = this.flattenObject(data, 'component');
    
    // Replace all {{variable}} patterns
    Object.keys(flatData).forEach(key => {
      const placeholder = `{{${key}}}`;
      const value = flatData[key];
      
      // Handle different data types
      if (typeof value === 'string') {
        html = html.replaceAll(placeholder, this.escapeHtml(value));
      } else if (typeof value === 'object') {
        html = html.replaceAll(placeholder, JSON.stringify(value));
      } else {
        html = html.replaceAll(placeholder, String(value));
      }
    });
    
    // Handle conditional sections
    html = this.processConditionals(html, data);
    
    // Handle loops/iterations
    html = this.processLoops(html, data);
    
    return html;
  }
  
  /**
   * Flatten nested object for template replacement
   * @param {Object} obj - Object to flatten
   * @param {string} prefix - Key prefix
   * @returns {Object} Flattened object
   */
  flattenObject(obj, prefix = '') {
    const flattened = {};
    
    Object.keys(obj).forEach(key => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    });
    
    return flattened;
  }
  
  /**
   * Process conditional sections in template
   * @param {string} html - HTML content
   * @param {Object} data - Component data
   * @returns {string} Processed HTML
   */
  processConditionals(html, data) {
    // Handle x-show conditions based on data
    if (data.variations && data.variations.length > 0) {
      html = html.replace(/x-show="hasVariations"/g, 'x-show="true"');
    } else {
      html = html.replace(/x-show="hasVariations"/g, 'x-show="false"');
    }
    
    // Handle code section visibility
    if (data.code.css) {
      html = html.replace(/x-show="component\.code\.css"/g, 'x-show="true"');
    } else {
      html = html.replace(/x-show="component\.code\.css"/g, 'x-show="false"');
    }
    
    if (data.code.js) {
      html = html.replace(/x-show="component\.code\.js"/g, 'x-show="true"');
    } else {
      html = html.replace(/x-show="component\.code\.js"/g, 'x-show="false"');
    }
    
    return html;
  }
  
  /**
   * Process template loops
   * @param {string} html - HTML content
   * @param {Object} data - Component data
   * @returns {string} Processed HTML
   */
  processLoops(html, data) {
    // This is a simplified implementation
    // In a real system, you'd want more sophisticated loop processing
    
    // Inject data into Alpine.js component
    const alpineDataInjection = `
      // Inject component data
      this.component = ${JSON.stringify(data, null, 2)};
      this.variations = ${JSON.stringify(data.variations || [], null, 2)};
      this.hasVariations = ${(data.variations && data.variations.length > 0)};
    `;
    
    // Insert data injection into the init() method
    html = html.replace(
      /init\(\) \{[\s\S]*?this\.\$nextTick\(\(\) => \{/,
      `init() {
        ${alpineDataInjection}
        
        this.$nextTick(() => {`
    );
    
    return html;
  }
  
  /**
   * Escape HTML characters
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Get output file path for component
   * @param {Object} componentData - Component data
   * @returns {string} Output file path
   */
  getOutputPath(componentData) {
    const category = componentData.category.toLowerCase();
    const filename = `${componentData.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    return path.join(this.outputDir, category, filename);
  }
  
  /**
   * Validate component data structure
   * @param {Object} data - Component data to validate
   */
  validateComponentData(data) {
    const required = [
      'name', 'title', 'description', 'category', 'status', 'version',
      'preview', 'code', 'accessibility', 'usage', 'design'
    ];
    
    required.forEach(field => {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    });
    
    // Validate nested objects
    if (!data.code.html) {
      throw new Error('Component must have HTML code');
    }
    
    if (!data.accessibility.score) {
      throw new Error('Component must have accessibility score');
    }
  }
  
  /**
   * Generate all components from a configuration file
   * @param {string} configPath - Path to components configuration
   */
  generateAll(configPath) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const results = [];
      
      config.components.forEach(componentData => {
        try {
          const outputPath = this.generateComponent(componentData);
          results.push({ success: true, component: componentData.name, path: outputPath });
        } catch (error) {
          results.push({ success: false, component: componentData.name, error: error.message });
        }
      });
      
      // Generate summary
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      console.log(`\n📊 Generation Summary:`);
      console.log(`✅ Successful: ${successful}`);
      console.log(`❌ Failed: ${failed}`);
      
      if (failed > 0) {
        console.log(`\n❌ Failed components:`);
        results.filter(r => !r.success).forEach(r => {
          console.log(`   ${r.component}: ${r.error}`);
        });
      }
      
      return results;
      
    } catch (error) {
      console.error('❌ Failed to load configuration:', error.message);
      throw error;
    }
  }
  
  /**
   * Generate index pages for each category
   */
  generateIndexPages() {
    const categories = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
    
    categories.forEach(category => {
      const indexPath = path.join(this.outputDir, category, 'index.html');
      const indexContent = this.generateCategoryIndex(category);
      fs.writeFileSync(indexPath, indexContent, 'utf8');
      console.log(`✅ Generated index: ${indexPath}`);
    });
    
    // Generate main index
    const mainIndexPath = path.join(this.outputDir, 'index.html');
    const mainIndexContent = this.generateMainIndex();
    fs.writeFileSync(mainIndexPath, mainIndexContent, 'utf8');
    console.log(`✅ Generated main index: ${mainIndexPath}`);
  }
  
  /**
   * Generate category index page
   * @param {string} category - Category name
   * @returns {string} HTML content
   */
  generateCategoryIndex(category) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category.charAt(0).toUpperCase() + category.slice(1)} - Fondation Botnar Design System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-6 py-4">
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600 font-medium">fondation</span>
                    <span class="text-lg text-pink-500 font-bold uppercase tracking-wide">BOTNAR</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-gray-700 font-medium">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </div>
            </div>
        </header>
        
        <main class="max-w-7xl mx-auto px-6 py-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">${category.charAt(0).toUpperCase() + category.slice(1)} Components</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Component cards will be populated here -->
            </div>
        </main>
    </div>
</body>
</html>`;
  }
  
  /**
   * Generate main index page
   * @returns {string} HTML content
   */
  generateMainIndex() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fondation Botnar Design System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-6 py-4">
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600 font-medium">fondation</span>
                    <span class="text-lg text-pink-500 font-bold uppercase tracking-wide">BOTNAR</span>
                    <span class="text-gray-400 ml-4">Design System</span>
                </div>
            </div>
        </header>
        
        <main class="max-w-7xl mx-auto px-6 py-12">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Design System</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Component library for Fondation Botnar's data visualization dashboard, 
                    built with accessibility and consistency in mind.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <a href="atoms/index.html" class="group block">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group-hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Atoms</h3>
                        <p class="text-gray-600">Basic building blocks like buttons, inputs, and icons.</p>
                    </div>
                </a>
                
                <a href="molecules/index.html" class="group block">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group-hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Molecules</h3>
                        <p class="text-gray-600">Simple groups of atoms functioning together.</p>
                    </div>
                </a>
                
                <a href="organisms/index.html" class="group block">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group-hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Organisms</h3>
                        <p class="text-gray-600">Complex components with multiple molecules.</p>
                    </div>
                </a>
                
                <a href="templates/index.html" class="group block">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group-hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Templates</h3>
                        <p class="text-gray-600">Page-level layouts and structures.</p>
                    </div>
                </a>
                
                <a href="pages/index.html" class="group block">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group-hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Pages</h3>
                        <p class="text-gray-600">Complete page examples and implementations.</p>
                    </div>
                </a>
                
                <a href="documentation/index.html" class="group block">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group-hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Documentation</h3>
                        <p class="text-gray-600">Guidelines, patterns, and best practices.</p>
                    </div>
                </a>
            </div>
        </main>
    </div>
</body>
</html>`;
  }
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TemplateGenerator;
}

// CLI usage
if (require.main === module) {
  const generator = new TemplateGenerator();
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: node template-generator.js [command] [options]

Commands:
  generate <config.json>    Generate all components from config file
  single <component.json>   Generate single component
  indexes                   Generate index pages only

Examples:
  node template-generator.js generate components.json
  node template-generator.js single button.json
  node template-generator.js indexes
    `);
    process.exit(0);
  }
  
  const command = args[0];
  
  try {
    switch (command) {
      case 'generate':
        if (args.length < 2) {
          console.error('❌ Please provide configuration file path');
          process.exit(1);
        }
        generator.generateAll(args[1]);
        generator.generateIndexPages();
        break;
        
      case 'single':
        if (args.length < 2) {
          console.error('❌ Please provide component file path');
          process.exit(1);
        }
        const componentData = JSON.parse(fs.readFileSync(args[1], 'utf8'));
        generator.generateComponent(componentData);
        break;
        
      case 'indexes':
        generator.generateIndexPages();
        break;
        
      default:
        console.error(`❌ Unknown command: ${command}`);
        process.exit(1);
    }
    
    console.log('\n🎉 Template generation completed!');
    
  } catch (error) {
    console.error('\n💥 Template generation failed:', error.message);
    process.exit(1);
  }
}