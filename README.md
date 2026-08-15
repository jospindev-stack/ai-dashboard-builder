# AI Dashboard Builder

> An AI-powered dashboard generator that transforms natural language prompts into interactive business dashboards with realistic KPIs, charts, and layouts.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Recharts](https://img.shields.io/badge/Recharts-2.13-8884d8)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-orange)
[![CI](https://github.com/jospindev-stack/ai-dashboard-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/jospindev-stack/ai-dashboard-builder/actions/workflows/ci.yml)
![License](https://img.shields.io/badge/License-MIT-green)

---

## About

AI Dashboard Builder is a full-stack application that converts natural language descriptions into complete business dashboards.

Using Groq's large language model, the application automatically generates realistic KPIs, interactive charts, and dashboard layouts adapted to various business domains such as sales, human resources, SaaS, finance, marketing, and web analytics.

The project demonstrates prompt engineering, AI integration, modern React development, Express APIs, dynamic data visualization, automated backend testing, and continuous integration.

---

## Technology Stack

| Category | Technology |
| --- | --- |
| Frontend | React 18 + Vite |
| Backend | Express.js |
| AI | Groq (Llama 3.3 70B) |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Testing | Node.js test runner |
| CI | GitHub Actions |

---

## Features

| Feature | Description |
| --- | --- |
| AI Dashboard Generation | Generate complete dashboards from natural language prompts |
| Dashboard Refinement | Modify an existing dashboard using follow-up instructions |
| Interactive Charts | Automatically generate charts using Recharts |
| Dynamic KPIs | Generate realistic KPIs and business metrics |
| Multiple Business Domains | Sales, HR, SaaS, Marketing, Finance, Web Analytics and more |
| JSON Export | Export generated dashboard configurations |
| Responsive Interface | Optimized for desktop and tablet devices |

---

## Testing and CI

The backend includes automated API tests using Node.js' built-in test runner. External AI behavior is injected and mocked so the suite runs deterministically without making real Groq requests.

Covered scenarios include:

- dashboard description validation
- maximum prompt length validation
- successful dashboard generation and input trimming
- safe handling of AI provider failures
- refinement request validation
- successful dashboard refinement
- safe handling of refinement provider failures

Run the tests locally:

```bash
cd backend
npm test
```

GitHub Actions runs the backend test suite automatically on pushes to `main`, test branches, and pull requests targeting `main` using Node.js 20.

---

## Example Prompts

| User Prompt | Generated Dashboard |
| --- | --- |
| "E-commerce sales dashboard with monthly KPIs" | Revenue KPIs, Orders, Average Order Value, Regional Bar Chart, Category Pie Chart |
| "HR dashboard for employee satisfaction" | Headcount, Turnover, Satisfaction Radar Chart, Recruitment Bar Chart |
| "Website analytics dashboard" | Sessions, Conversion Rate, Traffic Area Chart, Funnel, Traffic Sources Pie Chart |

---

## Architecture

```text
User Prompt
      |
      v
React Frontend
      |
      v
Express REST API
      |
      v
Prompt Engineering
      |
      v
Groq API
      |
      v
Structured Dashboard JSON
      |
      v
React Renderer
      |
      v
Interactive Dashboard
```

---

## Prerequisites

- Node.js 18 or later
- Groq API Key

---

## Installation

```bash
git clone https://github.com/jospindev-stack/ai-dashboard-builder.git
cd ai-dashboard-builder
npm run install:all
```

Configure the backend environment from `.env.example` and set `GROQ_API_KEY`.

---

## Running the Project

Start both services:

```bash
npm run dev
```

Application:

```text
http://localhost:5173
```

---

## API

### Generate Dashboard

```http
POST /api/dashboard/generate
```

### Refine Dashboard

```http
POST /api/dashboard/refine
```

---

## Security

The application includes environment-based API key management, server-side AI requests, input validation, structured JSON responses, and generic client-facing errors for AI provider failures.

---

## Roadmap

Planned improvements:

- Authentication
- Dashboard templates
- Theme editor
- CSV import
- PDF export
- Dashboard sharing
- Docker support
- Frontend component tests
- End-to-end tests

---

## License

This project is licensed under the MIT License.

---

## Author

**Jospin Meka**

Software Developer

- GitHub: https://github.com/jospindev-stack
