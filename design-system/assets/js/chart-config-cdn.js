/**
 * Fondation Botnar Dashboard - Chart.js Configuration (CDN Version)
 * 
 * This file provides Chart.js configuration for use with CDN loading.
 * For production, use the ES6 module version (chart-config.js) with proper build tools.
 */

// Wait for Chart.js to be loaded from CDN
function initializeBotnarCharts() {
  if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded. Please include Chart.js CDN before this script.');
    return;
  }
  
  console.log('Initializing Botnar Charts with Chart.js version:', Chart.version);

  /**
   * Botnar Design System Colors
   */
  window.BotnarColors = {
    // Primary Brand Colors
    pink: {
      50: '#fce4ec',
      100: '#f8bbd9',
      200: '#f48fb1',
      300: '#f06292',
      400: '#ec407a',
      500: '#e91e63', // Primary
      600: '#d81b60',
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f'
    },
    blue: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1976d2', // Primary data color
      700: '#1565c0',
      800: '#0d47a1',
      900: '#0a3d7c'
    },
    
    // Status Colors
    success: {
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c' // Success green
    },
    warning: {
      600: '#ffb300',
      700: '#f57c00', // Warning orange (use with caution)
      800: '#ef6c00'  // WCAG AA compliant orange
    },
    error: {
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f' // Error red
    },
    info: {
      600: '#039be5',
      700: '#0288d1' // Info cyan
    },
    
    // Categorical Colors for Charts
    categorical: [
      '#1976d2', // Primary blue
      '#e91e63', // Primary pink
      '#388e3c', // Green
      '#ef6c00', // Orange (accessible)
      '#9c27b0', // Purple
      '#00796b', // Teal
      '#5d4037', // Brown
      '#616161'  // Gray
    ],
    
    // Sequential Palettes
    blueSequential: [
      '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', 
      '#42a5f5', '#2196f3', '#1976d2'
    ],
    pinkSequential: [
      '#fce4ec', '#f8bbd9', '#f48fb1', '#f06292', 
      '#ec407a', '#e91e63', '#c2185b'
    ],
    graySequential: [
      '#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', 
      '#bdbdbd', '#9e9e9e', '#757575'
    ],
    
    // Text and Background Colors
    text: {
      primary: '#212121',
      secondary: '#757575',
      muted: '#9e9e9e',
      inverse: '#ffffff'
    },
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5'
    },
    border: {
      light: '#e0e0e0',
      medium: '#bdbdbd',
      dark: '#757575'
    }
  };

  /**
   * Utility Functions
   */
  window.BotnarChartUtils = {
    // Format numeric values for display
    formatValue: function(value) {
      if (typeof value !== 'number') return value;
      
      // Format large numbers
      if (Math.abs(value) >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (Math.abs(value) >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      
      // Format decimals
      if (value % 1 !== 0) {
        return value.toFixed(2);
      }
      
      return value.toLocaleString();
    },

    // Format currency values
    formatCurrency: function(value, currency = 'CHF') {
      if (typeof value !== 'number') return value;
      
      const formatted = this.formatValue(value);
      return `${currency} ${formatted}`;
    },

    // Format percentage values
    formatPercentage: function(value) {
      if (typeof value !== 'number') return value;
      return `${value.toFixed(1)}%`;
    },

    // Generate dataset with Botnar colors
    createDataset: function(label, data, options = {}) {
      const defaults = {
        label: label,
        data: data,
        backgroundColor: window.BotnarColors.categorical[0],
        borderColor: window.BotnarColors.categorical[0],
        borderWidth: 2,
        ...options
      };
      
      return defaults;
    },

    // Generate multiple datasets with categorical colors
    createMultipleDatasets: function(datasets) {
      const self = this;
      return datasets.map(function(dataset, index) {
        const colorIndex = index % window.BotnarColors.categorical.length;
        return self.createDataset(dataset.label, dataset.data, {
          backgroundColor: window.BotnarColors.categorical[colorIndex],
          borderColor: window.BotnarColors.categorical[colorIndex],
          ...dataset.options
        });
      });
    },

    // Announce text to screen readers
    announceToScreen: function(text) {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = text;
      document.body.appendChild(announcement);
      
      setTimeout(function() {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }
  };

  /**
   * Base Chart.js Configuration
   */
  window.BotnarChartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    
    // Plugin configurations
    plugins: {
      // Disable default legend (use custom Alpine.js legends)
      legend: {
        display: false
      },
      
      // Custom tooltip styling
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: window.BotnarColors.text.primary,
        bodyColor: window.BotnarColors.text.secondary,
        borderColor: window.BotnarColors.border.light,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        footerFont: {
          size: 12
        },
        // Custom tooltip callbacks for better accessibility
        callbacks: {
          title: function(context) {
            return context[0].label || '';
          },
          label: function(context) {
            const dataset = context.dataset;
            const value = context.parsed.y !== null ? context.parsed.y : context.parsed;
            return `${dataset.label}: ${window.BotnarChartUtils.formatValue(value)}`;
          },
          afterLabel: function(context) {
            // Custom handling for screen reader announcements
            const dataset = context.dataset;
            const value = context.parsed.y !== null ? context.parsed.y : context.parsed;
            const announcement = `${dataset.label}: ${window.BotnarChartUtils.formatValue(value)}`;
            
            // Delay announcement to avoid overwhelming screen readers
            setTimeout(function() {
              window.BotnarChartUtils.announceToScreen(announcement);
            }, 100);
            
            return '';
          }
        }
      },
      
      // Title configuration
      title: {
        display: false // Handled by HTML structure for better accessibility
      }
    },
    
    // Scale configurations
    scales: {
      x: {
        grid: {
          display: false,
          color: window.BotnarColors.border.light
        },
        ticks: {
          color: window.BotnarColors.text.secondary,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          maxRotation: 45,
          minRotation: 0
        },
        title: {
          display: false // Handled by HTML for accessibility
        }
      },
      y: {
        grid: {
          display: true,
          color: window.BotnarColors.border.light,
          lineWidth: 1
        },
        ticks: {
          color: window.BotnarColors.text.secondary,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          callback: function(value) {
            return window.BotnarChartUtils.formatValue(value);
          }
        },
        title: {
          display: false // Handled by HTML for accessibility
        }
      }
    },
    
    // Animation settings optimized for dashboard performance
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    
    // Interaction settings for accessibility
    interaction: {
      intersect: false,
      mode: 'index'
    },
    
    // Events for keyboard navigation support
    onHover: function(event, activeElements, chart) {
      // Custom hover handling for accessibility
      if (activeElements.length > 0) {
        const element = activeElements[0];
        chart.canvas.style.cursor = 'pointer';
        
        // Dispatch custom event for Alpine.js components
        const customEvent = new CustomEvent('chart:hover', {
          detail: {
            element: element,
            data: chart.data.datasets[element.datasetIndex].data[element.index],
            label: chart.data.labels[element.index],
            dataset: chart.data.datasets[element.datasetIndex]
          }
        });
        chart.canvas.dispatchEvent(customEvent);
      } else {
        chart.canvas.style.cursor = 'default';
      }
    },
    
    onClick: function(event, activeElements, chart) {
      if (activeElements.length > 0) {
        const element = activeElements[0];
        
        // Dispatch custom event for Alpine.js components
        const customEvent = new CustomEvent('chart:click', {
          detail: {
            element: element,
            data: chart.data.datasets[element.datasetIndex].data[element.index],
            label: chart.data.labels[element.index],
            dataset: chart.data.datasets[element.datasetIndex]
          }
        });
        chart.canvas.dispatchEvent(customEvent);
      }
    }
  };

  /**
   * Chart Type Specific Configurations
   */

  // Bar Chart Configuration
  window.BotnarBarChartConfig = function() {
    return {
      type: 'bar',
      options: {
        ...window.BotnarChartDefaults,
        scales: {
          ...window.BotnarChartDefaults.scales,
          x: {
            ...window.BotnarChartDefaults.scales.x,
            categoryPercentage: 0.8,
            barPercentage: 0.9
          }
        }
      }
    };
  };

  // Line Chart Configuration
  window.BotnarLineChartConfig = function() {
    return {
      type: 'line',
      options: {
        ...window.BotnarChartDefaults,
        elements: {
          line: {
            tension: 0.1,
            borderWidth: 2
          },
          point: {
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
            backgroundColor: window.BotnarColors.background.primary
          }
        },
        scales: {
          ...window.BotnarChartDefaults.scales,
          x: {
            ...window.BotnarChartDefaults.scales.x,
            type: 'category'
          }
        }
      }
    };
  };

  // Pie Chart Configuration
  window.BotnarPieChartConfig = function() {
    return {
      type: 'pie',
      options: {
        ...window.BotnarChartDefaults,
        plugins: {
          ...window.BotnarChartDefaults.plugins,
          tooltip: {
            ...window.BotnarChartDefaults.plugins.tooltip,
            callbacks: {
              title: function(context) {
                return context[0].label || '';
              },
              label: function(context) {
                const dataset = context.dataset;
                const total = dataset.data.reduce(function(a, b) { return a + b; }, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ${window.BotnarChartUtils.formatValue(context.parsed)} (${percentage}%)`;
              }
            }
          }
        },
        elements: {
          arc: {
            borderWidth: 2,
            borderColor: window.BotnarColors.background.primary
          }
        }
      }
    };
  };

  // Doughnut Chart Configuration
  window.BotnarDoughnutChartConfig = function() {
    const config = window.BotnarPieChartConfig();
    config.type = 'doughnut';
    config.options.cutout = '50%';
    return config;
  };

  /**
   * Accessibility Plugin for Chart.js
   */
  const BotnarAccessibilityPlugin = {
    id: 'botnarAccessibility',
    
    beforeInit: function(chart) {
      // Add keyboard event listeners
      chart.canvas.setAttribute('tabindex', '0');
      chart.canvas.setAttribute('role', 'img');
      chart.canvas.setAttribute('aria-label', 'Interactive chart');
      
      // Add keyboard navigation
      chart.canvas.addEventListener('keydown', function(event) {
        handleChartKeyboard(event, chart);
      });
    },
    
    afterUpdate: function(chart) {
      // Update ARIA description with chart data summary
      const description = generateChartDescription(chart);
      chart.canvas.setAttribute('aria-describedby', chart.canvas.id + '-description');
      
      // Create or update description element
      let descElement = document.getElementById(chart.canvas.id + '-description');
      if (!descElement) {
        descElement = document.createElement('div');
        descElement.id = chart.canvas.id + '-description';
        descElement.className = 'sr-only';
        chart.canvas.parentNode.appendChild(descElement);
      }
      descElement.textContent = description;
    }
  };

  // Register the accessibility plugin
  Chart.register(BotnarAccessibilityPlugin);

  // Keyboard navigation handler
  function handleChartKeyboard(event, chart) {
    const activeElements = chart.getActiveElements();
    
    switch(event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();
        navigateDataPoints(chart, event.key === 'ArrowRight' ? 1 : -1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (activeElements.length > 0) {
          // Trigger click event
          chart.options.onClick(event, activeElements, chart);
        }
        break;
      case 'Escape':
        event.preventDefault();
        chart.setActiveElements([]);
        chart.update('none');
        break;
    }
  }

  // Navigate between data points with keyboard
  function navigateDataPoints(chart, direction) {
    const datasets = chart.data.datasets;
    const labels = chart.data.labels;
    
    if (datasets.length === 0 || labels.length === 0) return;
    
    const activeElements = chart.getActiveElements();
    let currentIndex = 0;
    
    if (activeElements.length > 0) {
      currentIndex = activeElements[0].index;
    }
    
    const newIndex = Math.max(0, Math.min(labels.length - 1, currentIndex + direction));
    
    chart.setActiveElements([{
      datasetIndex: 0,
      index: newIndex
    }]);
    
    chart.update('none');
    
    // Announce to screen readers
    const value = datasets[0].data[newIndex];
    const label = labels[newIndex];
    window.BotnarChartUtils.announceToScreen(`${label}: ${window.BotnarChartUtils.formatValue(value)}`);
  }

  // Generate accessible chart description
  function generateChartDescription(chart) {
    const { data } = chart;
    const datasetCount = data.datasets.length;
    const pointCount = data.labels ? data.labels.length : 0;
    
    let description = `Chart with ${datasetCount} data series and ${pointCount} data points. `;
    
    if (data.datasets.length > 0) {
      const firstDataset = data.datasets[0];
      const total = firstDataset.data.reduce(function(a, b) { return a + b; }, 0);
      description += `Total value: ${window.BotnarChartUtils.formatValue(total)}. `;
    }
    
    description += 'Use arrow keys to navigate data points, Enter to select, Escape to clear selection.';
    
    return description;
  }

  // Performance monitoring
  window.BotnarChartUtils.measureChartPerformance = function(chartInstance, chartType) {
    const startTime = performance.now();
    
    chartInstance.update();
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`Chart ${chartType} render time: ${renderTime.toFixed(2)}ms`);
    
    // Store performance data for monitoring
    if (!window.chartPerformance) {
      window.chartPerformance = [];
    }
    
    window.chartPerformance.push({
      type: chartType,
      renderTime: renderTime,
      timestamp: new Date().toISOString(),
      dataPoints: chartInstance.data.datasets.reduce(function(total, dataset) {
        return total + dataset.data.length;
      }, 0)
    });
    
    return renderTime;
  };

  // Make Chart.js globally available for components
  window.BotnarChart = Chart;

  console.log('Botnar Chart.js configuration loaded successfully');
}

// Initialize when DOM is loaded and Chart.js is available
document.addEventListener('DOMContentLoaded', function() {
  // Try immediate initialization
  if (typeof Chart !== 'undefined') {
    initializeBotnarCharts();
  } else {
    // Wait for Chart.js to load
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds
    const checkForChart = setInterval(() => {
      attempts++;
      if (typeof Chart !== 'undefined') {
        clearInterval(checkForChart);
        initializeBotnarCharts();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkForChart);
        console.error('Chart.js failed to load within timeout period');
      }
    }, 100);
  }
});

// Also try on window load as fallback
window.addEventListener('load', function() {
  if (typeof Chart !== 'undefined' && typeof window.BotnarColors === 'undefined') {
    console.log('Fallback initialization on window load');
    initializeBotnarCharts();
  }
});