import Groq from 'groq-sdk'

const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert dashboard designer and data scientist. Generate complete, production-ready dashboard configurations based on user descriptions.

RESPOND WITH VALID JSON ONLY. No markdown fences, no explanations, no text outside the JSON object.

Return exactly this structure:
{
  "title": "Dashboard Title",
  "subtitle": "Short description of what this dashboard tracks",
  "theme": "blue|green|purple|orange|red",
  "period": "Time period (e.g., 'Last 12 months' or 'Q1 2024')",
  "kpis": [
    {
      "id": "unique_snake_case_id",
      "label": "Metric Name",
      "value": "Formatted value with symbol (e.g., $124,500 or 94.2% or 1,234)",
      "change": "Change vs previous (e.g., +12.5% vs last month)",
      "trend": "up|down|neutral",
      "icon": "dollar|users|chart|target|clock|trending_up|activity|star|zap|package"
    }
  ],
  "charts": [
    {
      "id": "unique_snake_case_id",
      "type": "line|bar|area|pie|radar|composed",
      "title": "Chart Title",
      "description": "What this chart shows",
      "size": "full|half|third",
      "xAxisKey": "key_for_x_axis (omit for pie)",
      "yAxisUnit": "$ or € or % or empty string",
      "data": [],
      "dataKeys": [
        {
          "key": "data_field_name",
          "name": "Display Label",
          "color": "#hexcolor",
          "chartType": "line|bar|area (only for composed type)"
        }
      ]
    }
  ]
}

DATA FORMAT RULES — strictly follow these per chart type:
- line / bar / area: data = [{"month":"Jan","revenue":12000,"target":10000}, ...]
- composed: same as line/bar/area — each dataKey has a "chartType" field
- pie: data = [{"name":"Category A","value":40},{"name":"Category B","value":30}, ...]
  dataKeys = [{"key":"value","name":"Share","color":"#3b82f6"}]
- radar: data = [{"subject":"Sales","score":85},{"subject":"Support","score":72}, ...]
  xAxisKey = "subject", dataKeys use key = "score"

DESIGN RULES:
- Generate exactly 3–5 KPIs most relevant to the topic
- Generate exactly 3–5 charts of VARIED types (never all the same type)
- Always include at least one "full" size line or area chart for trend
- Use "half" for 2-column charts, "third" for 3-column charts
- Generate 12 realistic monthly data points for trends, 7 for weekly, 5 for categories
- Numbers must be realistic (proper ranges, logical growth, seasonal patterns)
- Colors (pick contrasting ones): #3b82f6 #10b981 #f59e0b #ef4444 #8b5cf6 #06b6d4 #f97316 #84cc16
- Theme: blue→tech/sales, green→health/environment, purple→finance, orange→marketing, red→alerts`

export async function generateDashboard(description) {
  const response = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Generate a complete, realistic dashboard for this use case: "${description}"\n\nMake the data specific to this domain with realistic values, proper trends, and a fitting visual theme.`,
      },
    ],
    temperature: 0.6,
    max_tokens: 4096,
    response_format: { type: 'json_object' },
  })

  const raw = response.choices[0].message.content
  return JSON.parse(raw)
}

export async function refineDashboard(currentConfig, instruction) {
  const response = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Here is the current dashboard configuration:\n${JSON.stringify(currentConfig, null, 2)}\n\nApply this modification: "${instruction}"\n\nReturn the complete updated dashboard JSON.`,
      },
    ],
    temperature: 0.4,
    max_tokens: 4096,
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content)
}
