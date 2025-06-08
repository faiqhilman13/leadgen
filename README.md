# 🎯 Lead Generation Command Dashboard

A responsive React dashboard for managing lead generation activities with AI-powered automation features.

## ✨ Features

- **Lead Intelligence Overview**: High-level stats showing weekly, monthly, and all-time lead counts
- **CRM-Style Lead Table**: Comprehensive lead management with status updates and automation triggers
- **Outreach Automation Status**: Real-time monitoring of email campaigns and workflows
- **Performance Insights**: Analytics on industry performance, responsive titles, and template effectiveness
- **🚀 Google Sheets Integration**: Real-time data sync with your Google Sheets (NEW!)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LeadOverview.jsx     # High-level stats and KPIs
│   ├── LeadTable.jsx        # CRM-style lead management table
│   ├── OutreachStatus.jsx   # Automation status and metrics
│   ├── Insights.jsx         # Performance analytics
│   ├── LoadingSpinner.jsx   # Loading states and skeletons
│   └── Sidebar.jsx          # Collapsible navigation sidebar
├── services/
│   └── googleSheetsService.js  # Google Sheets API integration
├── hooks/
│   └── useGoogleSheetsData.js  # Custom hooks for data management
├── data/
│   └── mockData.js          # Mock data for development (fallback)
├── App.jsx                  # Main app component
├── index.css               # Global styles with Tailwind
└── main.jsx                # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Google Sheets API credentials
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### 🔗 Google Sheets Setup

For detailed instructions on setting up Google Sheets integration, see [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)

## 🎨 Technology Stack

- **React 18** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **Modern JavaScript (ES6+)** - Language features

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- 🖥️ Desktop (1024px+)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (320px - 767px)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Dashboard Sections

### 1. Lead Overview
- Total leads (week, month, all-time)
- Lead sources breakdown
- Outreach funnel status

### 2. Lead Table
- Comprehensive lead information
- Interactive status updates
- Direct contact links
- Automation triggers

### 3. Outreach Status
- Active workflow monitoring
- Email metrics (sent, replies, bounces)
- Response rate calculations
- Warning alerts

### 4. Insights & Analytics
- Top performing industries
- Most responsive job titles
- Template performance metrics
- Average response times

## 🔄 Data Management

### Google Sheets Integration
- **Real-time sync**: Data updates automatically from your Google Sheets
- **Status updates**: Lead statuses can be updated directly from the dashboard
- **Error handling**: Graceful fallbacks when data can't be loaded
- **Loading states**: Smooth loading animations while fetching data

### Fallback to Mock Data
If Google Sheets integration isn't configured, the dashboard will use mock data for demonstration purposes.

## 🎯 Next Steps

- [x] ✅ Google Sheets integration
- [x] ✅ Real-time data updates  
- [x] ✅ Interactive status management
- [ ] Add filtering and search functionality
- [ ] Export functionality (CSV, PDF)
- [ ] Create detailed lead profile pages
- [ ] Add data validation and bulk operations 