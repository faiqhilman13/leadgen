# Simple Google Sheets Setup

## Quick Start (5 minutes)

### 1. Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select project → Enable "Google Sheets API"
3. Create API Key in "Credentials" section

### 2. Prepare Your Sheet
1. Create a Google Sheet with a tab named **"Leads"**
2. Add these column headers in the first row:
```
first_name	last_name	linkedin_url	title	email	company name	company website	multiline_icebreaker
```
3. Make sheet publicly viewable (Share → "Anyone with link can view")

### 3. Configure App
Add to your `.env` file:
```env
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_SPREADSHEET_ID=your_spreadsheet_id_here
```

## Sample Data

Copy-paste this into your "Leads" sheet:

```
first_name	last_name	linkedin_url	title	email	company name	company website	multiline_icebreaker
John	Smith	https://linkedin.com/in/johnsmith	CEO	john@techcorp.com	TechCorp Inc	https://techcorp.com	Interested in lead automation tools
Sarah	Johnson	https://linkedin.com/in/sarahjohnson	CTO	sarah@startupx.io	StartupX	https://startupx.io	Looking for AI-powered solutions
Mike	Chen	https://linkedin.com/in/mikechen	Marketing Director	mike@growthco.com	GrowthCo	https://growthco.com	Wants to scale outreach campaigns
Lisa	Wong	https://linkedin.com/in/lisawong	VP Sales	lisa@salesforce.com	SalesForce Pro	https://salesforcepro.com	Needs better lead tracking system
```

## How It Works

The dashboard will automatically:
- ✅ Load your leads from the "Leads" sheet
- ✅ Calculate stats from your actual data (total leads, status distribution)
- ✅ Generate outreach metrics based on lead statuses
- ✅ Create insights from industry/title patterns
- ✅ Allow status updates directly from the dashboard

## Expected Features

### Stats Generation
- **Total Leads**: Counts all rows in your sheet
- **Weekly/Monthly**: Simulated percentages of total
- **Status Distribution**: Counts by lead status (defaults to "Not Contacted")

### Industry Detection
Automatically categorizes companies based on name:
- Tech/Software/App → Technology  
- Finance/Bank/Invest → Finance
- Health/Medical/Pharma → Healthcare
- Retail/Shop/Store → Retail
- Everything else → Other

### Lead Status Options
You can update leads to these statuses:
- Not Contacted (default)
- Contacted  
- Replied
- Booked Call
- Closed

## Troubleshooting

**Can't see data?**
- Check browser console (F12) for errors
- Verify sheet is publicly viewable
- Confirm API key is correct
- Ensure sheet is named exactly "Leads"

**Wrong data showing?**
- Check column headers match exactly
- Click "Refresh Data" button in dashboard
- Verify no empty rows at the top 