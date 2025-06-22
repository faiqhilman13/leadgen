import { Lead } from '../types';

// Get environment variables
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
// Try different possible sheet names (based on actual spreadsheet structure)
// Sheet4 contains the actual lead data
const POSSIBLE_SHEET_NAMES = ['Sheet4', 'Leads', 'Search URL', 'Website'];
const RANGE = 'A1:J1000'; // Start from A1 to include headers, up to 1000 rows (10 columns: A-J)

// Industry detection based on company name or website
const detectIndustry = (companyName: string, companyWebsite: string): string => {
  const text = (companyName + ' ' + companyWebsite).toLowerCase();
  
  // Healthcare-focused detection (since most of your leads are healthcare)
  if (/clinic|hospital|medical|health|dental|orthodontic|pharma|care|surgery|doctor|mayo/.test(text)) return 'Healthcare';
  if (/tech|software|app|digital|innovate/.test(text)) return 'Technology';
  if (/finance|bank|invest|capital|fund/.test(text)) return 'Finance';
  if (/retail|shop|store|market|commerce/.test(text)) return 'Retail';
  if (/education|university|school|academic/.test(text)) return 'Education';
  
  // Default to Healthcare since most of your data is healthcare-related
  return 'Healthcare';
};

// Fetch leads from Google Sheets
export const fetchLeadsFromGoogleSheets = async (): Promise<Lead[]> => {
  try {
    if (!API_KEY || !SPREADSHEET_ID) {
      console.error('Google Sheets API key or Spreadsheet ID not configured');
      throw new Error('Missing API key or Spreadsheet ID');
    }

    // SECURITY: Removed sensitive logging that exposed API keys
    if (import.meta.env.DEV) {
      console.log('Google Sheets API initialized');
      console.log('API Key configured:', !!API_KEY);
      console.log('Spreadsheet ID configured:', !!SPREADSHEET_ID);
    }

    let data;
    let sheetName = '';
    
    // Try different sheet names and ranges
    for (const possibleSheetName of POSSIBLE_SHEET_NAMES) {
      try {
        // Properly encode sheet name for URL
        const encodedSheetName = encodeURIComponent(possibleSheetName);
        
        // Try with default range first
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodedSheetName}!${RANGE}?key=${API_KEY}`;
        // SECURITY: Removed URL logging that exposed API key
        
        let response = await fetch(url);
        
        if (!response.ok) {
          // Try without range (get entire sheet)
          url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodedSheetName}?key=${API_KEY}`;
          // SECURITY: Removed URL logging that exposed API key
          response = await fetch(url);
        }
        
        if (response.ok) {
          data = await response.json();
          
          if (data.values && data.values.length > 0) {
            sheetName = possibleSheetName;
            if (import.meta.env.DEV) {
              console.log(`Successfully connected to sheet: ${sheetName}`);
              console.log(`Successfully fetched ${data.values?.length || 0} rows from ${sheetName}`);
            }
            break;
          }
        } else {
          if (import.meta.env.DEV) {
            const errorText = await response.text();
            console.log(`Failed to fetch from sheet "${possibleSheetName}": HTTP ${response.status}`);
            // SECURITY: Don't log full error response which may contain sensitive info
          }
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.log(`Failed to fetch from sheet "${possibleSheetName}"`);
          // SECURITY: Removed error details logging in production
        }
        continue;
      }
    }
    
    if (!data || !data.values || !data.values.length) {
      throw new Error('No data found in any sheet tab');
    }
    
    // Skip the header row and transform the data into Lead objects
    const leads: Lead[] = data.values.slice(1).map((row: string[], index: number) => {
      // More lenient check - skip only completely empty rows
      if (!row || row.length === 0 || (row.every(cell => !cell || cell.trim() === ''))) {
        return null;
      }
      
      // Column mapping for Sheet4:
      // A=first_name, B=last_name, C=linkedin_url, D=title, E=email, 
      // F=company name, G=company website, H=icebreaker, I=sent, J=follow up
      const company_name = row[5] || '';
      const company_website = row[6] || '';
      
      const lead = {
        id: (index + 1).toString(), // Start from 1 (since we skip header)
        first_name: row[0] || '',
        last_name: row[1] || '',
        linkedin_url: row[2] || '',
        title: row[3] || '',
        email: row[4] || '',
        company_name,
        company_website,
        multiline_icebreaker: row[7] || '',
        // Use actual values from the sheet for sent and follow_up
        sent: row[8] === 'TRUE' || row[8] === 'true' || row[8] === '1' || false,
        follow_up: row[9] === 'TRUE' || row[9] === 'true' || row[9] === '1' || false,
        created_at: new Date().toISOString().split('T')[0],
        // Additional fields - detect industry from company name/website
        industry: detectIndustry(company_name, company_website),
        status: 'Not Contacted' as const
      };
      
      return lead;
    }).filter(Boolean) as Lead[];
    
    if (import.meta.env.DEV) {
      console.log(`Successfully processed ${leads.length} leads from Google Sheets`);
    }
    
    return leads;
  } catch (error) {
    console.error('Error fetching leads from Google Sheets:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

// Update lead status (this would require additional setup for write access)
export const updateLeadStatus = async (leadId: string, newStatus: string): Promise<boolean> => {
  // This is a placeholder for future implementation
  // Updating Google Sheets requires OAuth2 authentication, which is more complex
  if (import.meta.env.DEV) {
    console.log(`Status update for lead ${leadId} to ${newStatus} would happen here`);
  }
  return true;
}; 