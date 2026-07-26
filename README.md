# AI Dashboard Builder

> An AI-powered dashboard generator that transforms natural language prompts into interactive business dashboards with realistic KPIs, charts, and layouts.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Recharts](https://img.shields.io/badge/Recharts-2.13-8884d8)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## About

AI Dashboard Builder is a full-stack application that converts natural language descriptions into complete business dashboards.

Using Groq's large language model, the application automatically generates realistic KPIs, interactive charts, and dashboard layouts adapted to various business domains such as sales, human resources, SaaS, finance, marketing, and web analytics.

The project demonstrates prompt engineering, AI integration, modern React development, Express APIs, and dynamic data visualization.

---

## Technology Stack

| Category | Technology           |
| -------- | -------------------- |
| Frontend | React 18 + Vite      |
| Backend  | Express.js           |
| AI       | Groq (Llama 3.3 70B) |
| Charts   | Recharts             |
| Styling  | Tailwind CSS         |

---

## Features

| Feature                   | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| AI Dashboard Generation   | Generate complete dashboards from natural language prompts  |
| Dashboard Refinement      | Modify an existing dashboard using follow-up instructions   |
| Interactive Charts        | Automatically generate charts using Recharts                |
| Dynamic KPIs              | Generate realistic KPIs and business metrics                |
| Multiple Business Domains | Sales, HR, SaaS, Marketing, Finance, Web Analytics and more |
| JSON Export               | Export generated dashboard configurations                   |
| Responsive Interface      | Optimized for desktop and tablet devices                    |

---

## Example Prompts

| User Prompt                                    | Generated Dashboard                                                               |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| "E-commerce sales dashboard with monthly KPIs" | Revenue KPIs, Orders, Average Order Value, Regional Bar Chart, Category Pie Chart |
| "HR dashboard for employee satisfaction"       | Headcount, Turnover, Satisfaction Radar Chart, Recruitment Bar Chart              |
| "Website analytics dashboard"                  | Sessions, Conversion Rate, Traffic Area Chart, Funnel, Traffic Sources Pie Chart  |

---

## Project Structure

```text
ai-dashboard-builder/
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── routes/
│       │   └── dashboard.js
│       └── services/
│           └── groqService.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── Generator.jsx
│           ├── DashboardPreview.jsx
│           ├── KPICard.jsx
│           ├── ChartRenderer.jsx
│           └── LoadingState.jsx
│
├── package.json
└── .env.example
```

---

## Architecture

```text
User Prompt
      │
      ▼
React Frontend
      │
      ▼
Express REST API
      │
      ▼
Prompt Engineering
      │
      ▼
Groq API
      │
      ▼
Structured Dashboard JSON
      │
      ▼
React Renderer
      │
      ▼
Interactive Dashboard
```

---

## Prerequisites

- Node.js 18 or later
- Groq API Key

Create a free API key at:

https://console.groq.com

---

## Installation

Clone the repository:

```bash
git clone https://github.com/jospindev-stack/ai-dashboard-builder.git

cd ai-dashboard-builder
```

Install all dependencies:

```bash
npm run install:all
```

Configure the backend environment:

Linux/macOS

```bash
cp .env.example backend/.env
```

Windows

```powershell
copy .env.example backend\.env
```

Edit:

```env
GROQ_API_KEY=your_api_key

GROQ_MODEL=llama-3.3-70b-versatile

PORT=3001
```

---

## Running the Project

Start both services:

```bash
npm run dev
```

Or individually:

Backend

```bash
npm run dev:backend
```

Frontend

```bash
npm run dev:frontend
```

Application:

```
http://localhost:5173
```

---

## Usage

1. Enter a dashboard description.
2. Click **Generate Dashboard**.
3. Wait a few seconds while Groq creates the dashboard.
4. Explore the generated KPIs and charts.
5. Refine the dashboard with additional instructions.
6. Export the dashboard configuration as JSON.

---

## API

### Generate Dashboard

```http
POST /api/dashboard/generate
```

Request

```json
{
  "description": "Sales dashboard with monthly KPIs"
}
```

---

### Refine Dashboard

```http
POST /api/dashboard/refine
```

Request

```json
{
  "currentConfig": {},
  "instruction": "Add a radar chart and switch to a green theme."
}
```

---

## Supported Chart Types

| Type     | Component     | Purpose                      |
| -------- | ------------- | ---------------------------- |
| Line     | LineChart     | Time series                  |
| Bar      | BarChart      | Category comparison          |
| Area     | AreaChart     | Trend analysis               |
| Pie      | PieChart      | Distribution                 |
| Radar    | RadarChart    | Multi-dimensional comparison |
| Composed | ComposedChart | Combined visualizations      |

---

## Dashboard Layout

| Size  | Grid        |
| ----- | ----------- |
| Full  | col-span-12 |
| Half  | col-span-6  |
| Third | col-span-4  |

---

## Security

The application includes:

- Environment variable management
- Server-side AI requests
- Prompt isolation
- Structured JSON responses
- Configurable API endpoints

---

## Environment Variables

| Variable     | Description         |
| ------------ | ------------------- |
| GROQ_API_KEY | Groq API Key        |
| GROQ_MODEL   | AI model            |
| PORT         | Backend server port |

---

## Deployment

### Backend

Deploy to:

- Railway
- Render

Start command:

```bash
node src/index.js
```

Required variables:

- GROQ_API_KEY
- PORT

---

### Frontend

Deploy to:

- Vercel
- Netlify

```bash
cd frontend

npm run build
```

Output:

```
frontend/dist
```

Configure `VITE_API_URL` or proxy `/api/*` requests to the backend.

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
- Unit tests
- Integration tests

---

## License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute it under the terms of the license.

---

## Author

**Jospin Meka**

Software Developer

- GitHub: https://github.com/jospindev-stack
