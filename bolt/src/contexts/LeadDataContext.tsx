import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Lead, DashboardStats } from '../types';
import { fetchLeadsFromGoogleSheets, updateLeadStatus } from '../data/googleSheetsApi';
import { mockLeads, calculateStats } from '../data/mockData';

interface LeadDataContextType {
  leads: Lead[];
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateStatus: (leadId: string, newStatus: string) => Promise<void>;
}

const LeadDataContext = createContext<LeadDataContextType | undefined>(undefined);

export const useLeadData = () => {
  const context = useContext(LeadDataContext);
  if (!context) {
    throw new Error('useLeadData must be used within a LeadDataProvider');
  }
  return context;
};

export const LeadDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate enhanced stats including industry and status breakdowns
  const stats = useMemo(() => {
    if (leads.length === 0) return calculateStats([]);
    
    const baseStats = calculateStats(leads);
    
    // Calculate industry breakdown
    const industryBreakdown: Record<string, number> = {};
    leads.forEach(lead => {
      const industry = lead.industry || 'Unknown';
      industryBreakdown[industry] = (industryBreakdown[industry] || 0) + 1;
    });
    
    // Calculate status breakdown
    const statusBreakdown: Record<string, number> = {};
    leads.forEach(lead => {
      const status = lead.status || 'Not Contacted';
      statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
    });
    
    return {
      ...baseStats,
      industryBreakdown,
      statusBreakdown
    };
  }, [leads]);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if Google Sheets API key is configured
      if (import.meta.env.VITE_GOOGLE_SHEETS_API_KEY && import.meta.env.VITE_SPREADSHEET_ID) {
        const sheetsData = await fetchLeadsFromGoogleSheets();
        setLeads(sheetsData);
      } else {
        // Fall back to mock data if API key is not configured
        console.warn('Google Sheets API key not configured, using mock data');
        setLeads(mockLeads);
      }
    } catch (err) {
      console.error('Error fetching lead data:', err);
      setError('Failed to load lead data. Please check your API key and spreadsheet settings.');
      // Fall back to mock data on error
      setLeads(mockLeads);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);
  
  // Update lead status
  const updateStatus = async (leadId: string, newStatus: string) => {
    try {
      // Try to update in Google Sheets (if configured)
      if (import.meta.env.VITE_GOOGLE_SHEETS_API_KEY) {
        await updateLeadStatus(leadId, newStatus);
      }
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId 
            ? { ...lead, status: newStatus as Lead['status'] } 
            : lead
        )
      );
    } catch (err) {
      console.error('Error updating lead status:', err);
      setError('Failed to update lead status.');
    }
  };
  
  const contextValue = useMemo(() => ({
    leads,
    stats,
    loading,
    error,
    refreshData: fetchData,
    updateStatus
  }), [leads, stats, loading, error]);
  
  return (
    <LeadDataContext.Provider value={contextValue}>
      {children}
    </LeadDataContext.Provider>
  );
}; 