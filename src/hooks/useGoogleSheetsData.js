import { useState, useEffect } from 'react';
import googleSheetsService from '../services/googleSheetsService.js';

// Custom hook for fetching and managing Google Sheets data
export const useGoogleSheetsData = () => {
  const [data, setData] = useState({
    leads: [],
    stats: null,
    outreachData: null,
    insights: null,
  });
  
  const [loading, setLoading] = useState({
    leads: true,
    stats: true,
    outreachData: true,
    insights: true,
  });
  
  const [error, setError] = useState({
    leads: null,
    stats: null,
    outreachData: null,
    insights: null,
  });

  // Fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(prev => ({ ...prev, leads: true, stats: true, outreachData: true, insights: true }));
      
      const [leads, stats, outreachData, insights] = await Promise.all([
        googleSheetsService.getLeads(),
        googleSheetsService.getStats(),
        googleSheetsService.getOutreachData(),
        googleSheetsService.getInsights(),
      ]);

      setData({ leads, stats, outreachData, insights });
      setError({ leads: null, stats: null, outreachData: null, insights: null });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(prev => ({ ...prev, general: err.message }));
    } finally {
      setLoading({ leads: false, stats: false, outreachData: false, insights: false });
    }
  };

  // Fetch leads only
  const fetchLeads = async () => {
    try {
      setLoading(prev => ({ ...prev, leads: true }));
      setError(prev => ({ ...prev, leads: null }));
      
      const leads = await googleSheetsService.getLeads();
      setData(prev => ({ ...prev, leads }));
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(prev => ({ ...prev, leads: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, leads: false }));
    }
  };

  // Fetch stats only
  const fetchStats = async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      setError(prev => ({ ...prev, stats: null }));
      
      const stats = await googleSheetsService.getStats();
      setData(prev => ({ ...prev, stats }));
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(prev => ({ ...prev, stats: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  // Update lead status
  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await googleSheetsService.updateLeadStatus(leadId, newStatus);
      
      // Update local state
      setData(prev => ({
        ...prev,
        leads: prev.leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      }));
      
      return { success: true };
    } catch (err) {
      console.error('Error updating lead status:', err);
      return { success: false, error: err.message };
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    data,
    loading,
    error,
    refreshAll: fetchAllData,
    refreshLeads: fetchLeads,
    refreshStats: fetchStats,
    updateLeadStatus,
  };
};

// Hook for individual data types
export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await googleSheetsService.getLeads();
      setLeads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, loading, error, refresh: fetchLeads };
};

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await googleSheetsService.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refresh: fetchStats };
}; 