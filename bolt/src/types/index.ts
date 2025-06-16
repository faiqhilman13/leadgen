export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  linkedin_url: string;
  title: string;
  email: string;
  company_name: string;
  company_website: string;
  multiline_icebreaker: string;
  sent: boolean;
  follow_up: boolean;
  created_at: string;
  industry?: string;
  status?: 'Not Contacted' | 'Contacted' | 'Replied' | 'Booked Call' | 'Closed';
}

export interface DashboardStats {
  totalLeads: number;
  emailsSent: number;
  followUpsNeeded: number;
  conversionRate: number;
  responseRate: number;
  industryBreakdown?: Record<string, number>;
  statusBreakdown?: Record<string, number>;
}