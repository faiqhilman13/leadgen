# Lead Generation Dashboard - Project Planning

## Project Overview
A responsive React dashboard for managing lead generation activities with AI-powered automation features.

## Architecture
- **Frontend**: React + Tailwind CSS
- **Structure**: Component-based modular architecture
- **Responsive**: Desktop-first with mobile-responsive design

## Component Structure
```
src/
├── components/
│   ├── LeadOverview.jsx     # High-level stats and KPIs
│   ├── LeadTable.jsx        # CRM-style lead management table
│   ├── OutreachStatus.jsx   # Automation status and metrics
│   └── Insights.jsx         # Performance analytics
├── data/
│   └── mockData.js          # Mock data for development
├── App.jsx                  # Main app component
├── index.css               # Global styles with Tailwind
└── main.jsx                # React entry point
```

## Design Goals
- **Command Center**: Single-view dashboard for lead management decisions
- **Responsive**: Works on desktop, tablet, and mobile
- **Actionable**: Direct actions from the interface (status updates, triggers)
- **Insightful**: Performance metrics and optimization recommendations

## Technology Stack
- React 18
- Tailwind CSS
- Vite (build tool)
- Modern JavaScript (ES6+)

## Style Guidelines
- Use Tailwind utility classes
- Responsive grid layouts
- Consistent spacing and typography
- Professional color scheme (grays, blues for links/actions)

## File Size Limits
- Max 500 lines per file
- Components should be focused and single-purpose
- Extract reusable utilities when needed

# CURSOR GLOBAL RULES
This is a React dashboard app.
- Components = modular and focused
- Use Tailwind for styling
- Responsive design patterns
- No external dependencies unless approved 