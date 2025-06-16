import { Lead } from '../types';

// Get environment variables
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const SHEET_NAME = 'Leads';
const RANGE = 'A2:H1000'; // Start from A2 to skip headers, up to 1000 rows

// Industry detection based on company name or website
const detectIndustry = (companyName: string, companyWebsite: string): string => {
  const text = (companyName + ' ' + companyWebsite).toLowerCase();
  
  if (/tech|software|app|digital|innovate/.test(text)) return 'Technology';
  if (/finance|bank|invest|capital|fund/.test(text)) return 'Finance';
  if (/health|medical|pharma|care|clinic/.test(text)) return 'Healthcare';
  if (/retail|shop|store|market|commerce/.test(text)) return 'Retail';
  
  return 'Other';
};

// Fetch leads from Google Sheets
export const fetchLeadsFromGoogleSheets = async (): Promise<Lead[]> => {
  try {
    if (!API_KEY || !SPREADSHEET_ID) {
      console.error('Google Sheets API key or Spreadsheet ID not configured');
      throw new Error('Missing API key or Spreadsheet ID');
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.values || !data.values.length) {
      console.warn('No data found in the Google Sheet');
      return [];
    }
    
    // Transform the data into Lead objects
    const leads: Lead[] = data.values.map((row: string[], index: number) => {
      if (!row[0]) return null; // Skip empty rows
      
      const company_name = row[5] || '';
      const company_website = row[6] || '';
      
      return {
        id: (index + 1).toString(),
        first_name: row[0] || '',
        last_name: row[1] || '',
        linkedin_url: row[2] || '',
        title: row[3] || '',
        email: row[4] || '',
        company_name,
        company_website,
        multiline_icebreaker: row[7] || '',
        // Default values for fields not in the sheet
        sent: false,
        follow_up: false,
        created_at: new Date().toISOString().split('T')[0],
        // Additional fields based on SIMPLE_SETUP.md
        industry: detectIndustry(company_name, company_website),
        status: 'Not Contacted'
      };
    }).filter(Boolean) as Lead[];
    
    return leads;
  } catch (error) {
    console.error('Error fetching leads from Google Sheets:', error);
    throw error;
  }
};

// Update lead status (this would require additional setup for write access)
export const updateLeadStatus = async (leadId: string, newStatus: string): Promise<boolean> => {
  // This is a placeholder for future implementation
  // Updating Google Sheets requires OAuth2 authentication, which is more complex
  console.log(`Status update for lead ${leadId} to ${newStatus} would happen here`);
  return true;
}; 