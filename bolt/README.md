# Bolt Lead Management Dashboard

A modern, responsive dashboard for lead management with Google Sheets integration.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file in the root directory with the following:
   ```
   # Google Sheets API Configuration
   VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
   VITE_SPREADSHEET_ID=your_spreadsheet_id_here
   
   # Stagewise UI Editing Toolbar Configuration
   VITE_STAGEWISE_ENABLED=true
   ```

3. Follow the instructions in `SIMPLE_SETUP.md` to set up your Google Sheet and get your API key.

4. Start the development server:
   ```
   npm run dev
   ```

## Google Sheets Integration

This dashboard integrates with Google Sheets to load lead data. The integration follows these steps:

1. Create a Google Sheet with a tab named "Leads"
2. Add these column headers in the first row:
   ```
   first_name  last_name  linkedin_url  title  email  company name  company website  multiline_icebreaker
   ```
3. Make the sheet publicly viewable (Share → "Anyone with link can view")
4. Get an API key from Google Cloud Console
5. Add your API key and spreadsheet ID to the `.env.local` file

If the Google Sheets API is not configured, the dashboard will fall back to using mock data.

## Features

- Modern, responsive UI with dark/light mode
- Lead management with status updates
- Analytics dashboard with key metrics
- Industry detection based on company name
- Status tracking for leads

## Troubleshooting

If you're having issues with the Google Sheets integration:

1. Check that your API key is correct
2. Verify that your spreadsheet is publicly viewable
3. Ensure your sheet is named exactly "Leads"
4. Check the browser console for any error messages 