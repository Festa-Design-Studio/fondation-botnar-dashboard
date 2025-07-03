# Fondation Botnar Dashboard - API Documentation

## Overview

This document describes the API endpoints and data structures used by the Fondation Botnar Dashboard. Currently, the system uses simulated data for demonstration purposes, but is designed for seamless integration with real API endpoints.

## Base Configuration

### API Base URL
```
Production: https://api.fondation-botnar.org/v1
Staging: https://staging-api.fondation-botnar.org/v1
Development: http://localhost:3000/api/v1
```

### Authentication
All API requests require authentication via Bearer token:
```
Authorization: Bearer <jwt_token>
```

### Content Type
All requests should use JSON content type:
```
Content-Type: application/json
```

## Authentication Endpoints

### POST /auth/login
Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "user@fondation-botnar.org",
  "password": "securePassword123",
  "rememberMe": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user123",
      "email": "user@fondation-botnar.org",
      "role": "analyst",
      "firstName": "John",
      "lastName": "Doe",
      "permissions": ["read", "write", "export"]
    },
    "expiresIn": 3600
  }
}
```

### POST /auth/forgot-password
Initiate password recovery process.

**Request Body:**
```json
{
  "email": "user@fondation-botnar.org"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password recovery email sent"
}
```

### POST /auth/reset-password
Reset user password with recovery token.

**Request Body:**
```json
{
  "token": "recovery_token_here",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## Dashboard Data Endpoints

### GET /dashboard/overview
Get main dashboard KPI data.

**Query Parameters:**
- `period` (optional): "7d", "30d", "90d", "1y" (default: "30d")
- `region` (optional): Region filter

**Response:**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "totalGrants": {
        "value": 147,
        "change": 8.2,
        "trend": "up"
      },
      "totalBeneficiaries": {
        "value": 2847629,
        "change": 15.3,
        "trend": "up"
      },
      "countriesReached": {
        "value": 34,
        "change": 2.9,
        "trend": "up"
      },
      "budgetAllocated": {
        "value": 98750000,
        "currency": "CHF",
        "change": 12.7,
        "trend": "up"
      }
    },
    "lastUpdated": "2025-01-20T10:30:00Z"
  }
}
```

### GET /dashboard/portfolio-growth
Get portfolio growth chart data.

**Query Parameters:**
- `period` (optional): "6m", "1y", "2y", "5y" (default: "1y")
- `granularity` (optional): "monthly", "quarterly" (default: "monthly")

**Response:**
```json
{
  "success": true,
  "data": {
    "chartData": {
      "labels": ["Jan 2024", "Feb 2024", "Mar 2024", "..."],
      "datasets": [
        {
          "label": "Cumulative Funding",
          "data": [15000000, 28000000, 42000000, "..."],
          "backgroundColor": "#0066CC",
          "borderColor": "#0066CC"
        },
        {
          "label": "New Grants",
          "data": [8, 12, 15, "..."],
          "backgroundColor": "#FF6B9D",
          "borderColor": "#FF6B9D"
        }
      ]
    },
    "summary": {
      "totalGrowth": 145.2,
      "averageMonthlyGrowth": 12.1,
      "peakMonth": "March 2024"
    }
  }
}
```

### GET /dashboard/geographic-distribution
Get geographic funding distribution data.

**Response:**
```json
{
  "success": true,
  "data": {
    "regions": [
      {
        "name": "Africa",
        "value": 35.2,
        "amount": 34650000,
        "grants": 52,
        "color": "#0066CC"
      },
      {
        "name": "Asia",
        "value": 28.8,
        "amount": 28420000,
        "grants": 41,
        "color": "#FF6B9D"
      },
      {
        "name": "Latin America",
        "value": 22.1,
        "amount": 21780000,
        "grants": 35,
        "color": "#00CC66"
      },
      {
        "name": "Global Programs",
        "value": 14.0,
        "amount": 13820000,
        "grants": 19,
        "color": "#FF9900"
      }
    ],
    "total": {
      "amount": 98670000,
      "grants": 147
    }
  }
}
```

### GET /dashboard/recent-activities
Get recent activities and milestones.

**Query Parameters:**
- `limit` (optional): Number of activities (default: 20)
- `type` (optional): Activity type filter

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "act123",
        "type": "grant_approved",
        "title": "Digital Health Initiative Approved",
        "description": "New grant for digital health solutions in Kenya",
        "amount": 1500000,
        "currency": "CHF",
        "date": "2025-01-19T14:30:00Z",
        "grantId": "grant456",
        "status": "completed"
      },
      {
        "id": "act124",
        "type": "milestone_reached",
        "title": "Education Program Milestone",
        "description": "50,000 children reached in Bangladesh program",
        "beneficiaries": 50000,
        "date": "2025-01-18T09:15:00Z",
        "programId": "prog789",
        "status": "completed"
      }
    ],
    "hasMore": true,
    "total": 156
  }
}
```

## Grant Portfolio Endpoints

### GET /grants
Get paginated list of grants with filtering and search.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Grant status filter
- `region` (optional): Region filter
- `minAmount` (optional): Minimum funding amount
- `maxAmount` (optional): Maximum funding amount
- `search` (optional): Search term
- `sortBy` (optional): Sort field (default: "dateCreated")
- `sortOrder` (optional): "asc" or "desc" (default: "desc")

**Response:**
```json
{
  "success": true,
  "data": {
    "grants": [
      {
        "id": "grant123",
        "title": "Digital Health Solutions for Rural Communities",
        "organization": "TechHealth Kenya",
        "amount": 1500000,
        "currency": "CHF",
        "status": "active",
        "region": "Africa",
        "country": "Kenya",
        "startDate": "2024-03-15",
        "endDate": "2027-03-14",
        "progress": 35.2,
        "beneficiaries": 125000,
        "programType": "health",
        "lastUpdate": "2025-01-19T10:30:00Z",
        "keyMetrics": {
          "clinicsEstablished": 15,
          "healthWorkersTrained": 450,
          "patientsServed": 12500
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalItems": 147,
      "itemsPerPage": 20,
      "hasNext": true,
      "hasPrevious": false
    },
    "filters": {
      "availableStatuses": ["active", "completed", "under_review", "paused"],
      "availableRegions": ["Africa", "Asia", "Latin America", "Europe"],
      "amountRange": {
        "min": 50000,
        "max": 5000000
      }
    }
  }
}
```

### GET /grants/{grantId}
Get detailed information for a specific grant.

**Response:**
```json
{
  "success": true,
  "data": {
    "grant": {
      "id": "grant123",
      "title": "Digital Health Solutions for Rural Communities",
      "organization": {
        "name": "TechHealth Kenya",
        "contact": "Dr. Sarah Mwangi",
        "email": "s.mwangi@techhealth.ke",
        "phone": "+254 700 123 456"
      },
      "funding": {
        "amount": 1500000,
        "currency": "CHF",
        "disbursed": 525000,
        "remaining": 975000,
        "nextDisbursement": "2025-03-15"
      },
      "timeline": {
        "startDate": "2024-03-15",
        "endDate": "2027-03-14",
        "duration": 36,
        "progress": 35.2
      },
      "impact": {
        "targetBeneficiaries": 125000,
        "currentBeneficiaries": 44000,
        "regions": ["Nairobi", "Kisumu", "Eldoret"],
        "keyMetrics": {
          "clinicsEstablished": 15,
          "targetClinics": 50,
          "healthWorkersTrained": 450,
          "targetHealthWorkers": 1000
        }
      },
      "documents": [
        {
          "id": "doc123",
          "name": "Grant Agreement",
          "type": "contract",
          "url": "/documents/grant123/agreement.pdf",
          "uploadDate": "2024-03-01"
        }
      ],
      "milestones": [
        {
          "id": "milestone123",
          "title": "Pilot Clinic Establishment",
          "description": "Establish 5 pilot clinics",
          "dueDate": "2024-09-15",
          "status": "completed",
          "completionDate": "2024-09-10"
        }
      ]
    }
  }
}
```

## Impact Assessment Endpoints

### GET /impact/overview
Get impact assessment overview data.

**Query Parameters:**
- `period` (optional): Assessment period
- `programs` (optional): Comma-separated program IDs

**Response:**
```json
{
  "success": true,
  "data": {
    "overallImpact": {
      "livesImpacted": 2847629,
      "healthOutcomes": {
        "mortality_reduction": 23.5,
        "access_improvement": 67.8,
        "quality_increase": 45.2
      },
      "educationalAdvancement": {
        "enrollment_increase": 34.7,
        "completion_rate": 78.5,
        "learning_outcomes": 42.3
      },
      "technologyAdoption": {
        "digital_literacy": 56.8,
        "tool_usage": 73.2,
        "innovation_adoption": 38.9
      },
      "sustainabilityScore": 7.3
    },
    "programComparisons": [
      {
        "programId": "prog123",
        "name": "Digital Health Initiative",
        "impactScore": 8.2,
        "costEffectiveness": 6.7,
        "sustainability": 7.8
      }
    ]
  }
}
```

### GET /impact/programs/{programId}/assessment
Get detailed impact assessment for a specific program.

**Response:**
```json
{
  "success": true,
  "data": {
    "program": {
      "id": "prog123",
      "name": "Digital Health Initiative",
      "description": "Improving healthcare access through digital solutions"
    },
    "assessment": {
      "methodology": "Mixed Methods Evaluation",
      "evaluationPeriod": {
        "start": "2024-01-01",
        "end": "2024-12-31"
      },
      "keyFindings": [
        {
          "indicator": "Health Access",
          "baseline": 34.2,
          "current": 67.8,
          "target": 75.0,
          "unit": "percentage",
          "trend": "improving"
        }
      ],
      "outcomes": {
        "short_term": {
          "achieved": 8,
          "planned": 10,
          "percentage": 80.0
        },
        "medium_term": {
          "achieved": 5,
          "planned": 8,
          "percentage": 62.5
        },
        "long_term": {
          "achieved": 2,
          "planned": 5,
          "percentage": 40.0
        }
      },
      "recommendations": [
        "Increase community engagement activities",
        "Expand digital literacy training",
        "Strengthen local partnerships"
      ]
    }
  }
}
```

## Financial Reports Endpoints

### GET /financial/budget-analysis
Get budget vs actual spending analysis.

**Query Parameters:**
- `year` (optional): Fiscal year (default: current year)
- `quarter` (optional): Specific quarter
- `category` (optional): Budget category filter

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalBudget": 100000000,
      "totalSpent": 78500000,
      "remaining": 21500000,
      "utilizationRate": 78.5,
      "variance": -2.3
    },
    "categories": [
      {
        "name": "Program Grants",
        "budgeted": 75000000,
        "spent": 58750000,
        "remaining": 16250000,
        "variance": -1.7,
        "status": "on_track"
      },
      {
        "name": "Administrative Costs",
        "budgeted": 15000000,
        "spent": 12200000,
        "remaining": 2800000,
        "variance": +2.1,
        "status": "under_budget"
      }
    ],
    "monthlyTrends": {
      "labels": ["Jan", "Feb", "Mar", "..."],
      "budgeted": [8333333, 16666666, 25000000, "..."],
      "actual": [7850000, 15920000, 24100000, "..."]
    }
  }
}
```

### GET /financial/cost-per-beneficiary
Get cost per beneficiary analysis.

**Query Parameters:**
- `programs` (optional): Comma-separated program IDs
- `period` (optional): Analysis period

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "averageCostPerBeneficiary": 34.67,
      "totalBeneficiaries": 2847629,
      "totalCosts": 98750000,
      "currency": "CHF"
    },
    "programs": [
      {
        "id": "prog123",
        "name": "Digital Health Initiative",
        "totalCost": 1500000,
        "beneficiaries": 125000,
        "costPerBeneficiary": 12.00,
        "directCosts": 1200000,
        "indirectCosts": 300000,
        "efficiency": "high"
      }
    ],
    "benchmarks": {
      "industryAverage": 42.30,
      "bestPractice": 28.50,
      "organizationTarget": 35.00
    }
  }
}
```

## Program Analysis Endpoints

### GET /programs
Get list of programs with basic information.

**Response:**
```json
{
  "success": true,
  "data": {
    "programs": [
      {
        "id": "prog123",
        "name": "Digital Health Initiative",
        "type": "health",
        "status": "active",
        "region": "Africa",
        "startDate": "2024-01-15",
        "budget": 5000000,
        "beneficiaries": 250000
      }
    ]
  }
}
```

### GET /programs/{programId}/analysis
Get detailed program analysis data.

**Response:**
```json
{
  "success": true,
  "data": {
    "program": {
      "id": "prog123",
      "name": "Digital Health Initiative",
      "description": "Comprehensive digital health program for rural communities"
    },
    "performance": {
      "overallScore": 8.2,
      "outputIndicators": {
        "clinics_established": {
          "target": 50,
          "achieved": 35,
          "percentage": 70.0,
          "trend": "on_track"
        },
        "staff_trained": {
          "target": 1000,
          "achieved": 750,
          "percentage": 75.0,
          "trend": "on_track"
        }
      },
      "outcomeIndicators": {
        "health_access_improvement": {
          "baseline": 34.2,
          "current": 67.8,
          "target": 75.0,
          "achievement": 90.4
        }
      },
      "riskFactors": [
        {
          "category": "operational",
          "level": "medium",
          "description": "Staff retention challenges"
        }
      ]
    },
    "timeline": {
      "milestones": [
        {
          "id": "milestone123",
          "title": "Phase 1 Completion",
          "date": "2024-06-30",
          "status": "completed",
          "progress": 100
        }
      ]
    }
  }
}
```

## Error Handling

### Error Response Format
All error responses follow this format:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    },
    "timestamp": "2025-01-20T10:30:00Z",
    "requestId": "req_123456"
  }
}
```

### Common Error Codes

#### Authentication Errors
- `UNAUTHORIZED` (401): Invalid or missing authentication token
- `FORBIDDEN` (403): User lacks required permissions
- `TOKEN_EXPIRED` (401): Authentication token has expired

#### Validation Errors
- `VALIDATION_ERROR` (400): Invalid request parameters
- `MISSING_REQUIRED_FIELD` (400): Required field not provided
- `INVALID_FORMAT` (400): Data format is incorrect

#### Resource Errors
- `NOT_FOUND` (404): Requested resource does not exist
- `CONFLICT` (409): Resource already exists or conflicting state
- `GONE` (410): Resource has been permanently deleted

#### Server Errors
- `INTERNAL_SERVER_ERROR` (500): Unexpected server error
- `SERVICE_UNAVAILABLE` (503): Temporary service unavailability
- `RATE_LIMIT_EXCEEDED` (429): Too many requests

## Rate Limiting

### Default Limits
- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour
- **Bulk operations**: 50 requests per hour

### Rate Limit Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 985
X-RateLimit-Reset: 1642687200
```

## Data Export Endpoints

### POST /export/grants
Export grant data in various formats.

**Request Body:**
```json
{
  "format": "excel",
  "filters": {
    "status": ["active", "completed"],
    "region": ["Africa", "Asia"],
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    }
  },
  "fields": ["title", "organization", "amount", "status", "progress"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "export_123",
    "downloadUrl": "https://api.fondation-botnar.org/downloads/export_123.xlsx",
    "expiresAt": "2025-01-21T10:30:00Z",
    "recordCount": 147
  }
}
```

## Webhook Integration

### Webhook Events
The system can send webhooks for the following events:
- `grant.created`: New grant added
- `grant.updated`: Grant information updated
- `grant.status_changed`: Grant status modified
- `milestone.reached`: Program milestone achieved
- `assessment.completed`: Impact assessment finished

### Webhook Payload Format
```json
{
  "event": "grant.status_changed",
  "timestamp": "2025-01-20T10:30:00Z",
  "data": {
    "grantId": "grant123",
    "oldStatus": "under_review",
    "newStatus": "active",
    "changedBy": "user456"
  },
  "signature": "sha256=abc123..."
}
```

## SDK and Integration Examples

### JavaScript/Node.js Example
```javascript
const BotnarAPI = require('@fondation-botnar/api-client');

const client = new BotnarAPI({
  baseURL: 'https://api.fondation-botnar.org/v1',
  apiKey: 'your_api_key'
});

// Get dashboard overview
const overview = await client.dashboard.getOverview({
  period: '30d'
});

// Search grants
const grants = await client.grants.search({
  status: 'active',
  region: 'Africa',
  limit: 20
});
```

### Python Example
```python
from fondation_botnar import BotnarAPI

client = BotnarAPI(
    base_url='https://api.fondation-botnar.org/v1',
    api_key='your_api_key'
)

# Get impact assessment
assessment = client.impact.get_overview(
    period='1y',
    programs=['prog123', 'prog456']
)

# Export financial data
export = client.financial.export_data(
    format='excel',
    year=2024,
    categories=['grants', 'operations']
)
```

---

**API Version**: 1.0.0  
**Last Updated**: January 2025  
**Support**: api-support@fondation-botnar.org  
**Rate Limits**: See rate limiting section above