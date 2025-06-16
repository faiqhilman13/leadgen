import React, { useState, useMemo, useCallback } from 'react';
import { Search, ExternalLink, Mail, Clock, CheckCircle, AlertCircle, MoreHorizontal } from 'lucide-react';
import { Lead } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useLeadData } from '../contexts/LeadDataContext';

interface ModernLeadTableProps {
  leads: Lead[];
}

export const ModernLeadTable: React.FC<ModernLeadTableProps> = React.memo(({ leads }) => {
  const { isDark } = useTheme();
  const { updateStatus } = useLeadData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'pending' | 'follow-up' | 'contacted' | 'replied' | 'booked' | 'closed'>('all');
  const [showStatusMenu, setShowStatusMenu] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = searchTerm === '' || 
        lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'sent' && lead.sent) ||
        (statusFilter === 'pending' && !lead.sent) ||
        (statusFilter === 'follow-up' && lead.follow_up) ||
        (statusFilter === 'contacted' && lead.status === 'Contacted') ||
        (statusFilter === 'replied' && lead.status === 'Replied') ||
        (statusFilter === 'booked' && lead.status === 'Booked Call') ||
        (statusFilter === 'closed' && lead.status === 'Closed');

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as any);
  }, []);

  const handleStatusUpdate = useCallback((leadId: string, newStatus: string) => {
    updateStatus(leadId, newStatus);
    setShowStatusMenu(null);
  }, [updateStatus]);

  const getStatusBadge = useCallback((lead: Lead) => {
    // Use the new status field if available
    if (lead.status) {
      switch (lead.status) {
        case 'Not Contacted':
          return (
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${isDark 
                ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' 
                : 'bg-gray-100/80 text-gray-600 border border-gray-200/50'
              }
            `}>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5"></div>
              Not Contacted
            </span>
          );
        case 'Contacted':
          return (
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${isDark 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                : 'bg-blue-100/80 text-blue-700 border border-blue-200/50'
              }
            `}>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></div>
              Contacted
            </span>
          );
        case 'Replied':
          return (
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${isDark 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                : 'bg-amber-100/80 text-amber-700 border border-amber-200/50'
              }
            `}>
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></div>
              Replied
            </span>
          );
        case 'Booked Call':
          return (
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${isDark 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                : 'bg-purple-100/80 text-purple-700 border border-purple-200/50'
              }
            `}>
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5"></div>
              Booked Call
            </span>
          );
        case 'Closed':
          return (
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${isDark 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-green-100/80 text-green-700 border border-green-200/50'
              }
            `}>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
              Closed
            </span>
          );
      }
    }

    // Fall back to the old status indicators
    if (lead.follow_up) {
      return (
        <span className={`
          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${isDark 
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
            : 'bg-amber-100/80 text-amber-700 border border-amber-200/50'
          }
        `}>
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5 animate-pulse"></div>
          Recording
        </span>
      );
    } else if (lead.sent) {
      return (
        <span className={`
          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${isDark 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
            : 'bg-green-100/80 text-green-700 border border-green-200/50'
          }
        `}>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
          Online
        </span>
      );
    } else {
      return (
        <span className={`
          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${isDark 
            ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' 
            : 'bg-gray-100/80 text-gray-600 border border-gray-200/50'
          }
        `}>
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5"></div>
          Away
        </span>
      );
    }
  }, [isDark]);

  // Memoize location mapping
  const getLocationFromWebsite = useCallback((website: string | undefined) => {
    if (!website) return 'Unknown';
    if (website.includes('techcorp')) return 'San Francisco';
    if (website.includes('growthco')) return 'New York';
    if (website.includes('startup')) return 'Austin';
    if (website.includes('innovate')) return 'Seattle';
    if (website.includes('digital')) return 'Los Angeles';
    return 'Boston';
  }, []);

  const tableContainerClass = useMemo(() => `
    relative rounded-2xl transition-colors
    ${isDark 
      ? 'bg-slate-800/70 border border-slate-700/60' 
      : 'bg-white/40 border border-white/20'
    }
    shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
  `, [isDark]);

  return (
    <div className={tableContainerClass}>
      <div className="relative z-10">
        <div className={`p-6 border-b ${isDark ? 'border-slate-700/60' : 'border-white/20'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Lead Management
              </h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                {filteredLeads.length} active leads
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-white/40' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={`
                    pl-10 pr-4 py-2 rounded-lg text-sm
                    ${isDark 
                      ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-purple-400/50' 
                      : 'bg-white/50 border border-white/30 text-gray-900 placeholder-gray-500 focus:border-purple-400/50'
                    }
                    focus:outline-none focus:ring-1 focus:ring-purple-500/20
                  `}
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className={`
                  px-4 py-2 rounded-lg text-sm
                  ${isDark 
                    ? 'bg-white/10 border border-white/20 text-white focus:border-purple-400/50' 
                    : 'bg-white/50 border border-white/30 text-gray-900 focus:border-purple-400/50'
                  }
                  focus:outline-none focus:ring-1 focus:ring-purple-500/20
                `}
              >
                <option value="all">All Status</option>
                <option value="sent">Online</option>
                <option value="pending">Away</option>
                <option value="follow-up">Recording</option>
                <option value="contacted">Contacted</option>
                <option value="replied">Replied</option>
                <option value="booked">Booked Call</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={`${isDark ? 'bg-white/5' : 'bg-white/20'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Lead
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Genre
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Location
                </th>
                <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-white/20'}`}>
              {filteredLeads.map((lead, index) => (
                <tr key={lead.id} className={`
                  ${index % 2 === 0 ? (isDark ? 'bg-white/2' : 'bg-white/10') : ''}
                `}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                            {lead.first_name[0]}{lead.last_name[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {lead.first_name} {lead.last_name}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lead.title}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {lead.company_name}
                      {lead.industry && (
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                          isDark ? 'bg-white/10 text-white/80' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.industry}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(lead)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {getLocationFromWebsite(lead.company_website)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative">
                      <button 
                        onClick={() => setShowStatusMenu(showStatusMenu === lead.id ? null : lead.id)}
                        className={`
                          p-2 rounded-lg
                          ${isDark 
                            ? 'text-white/60 hover:text-white hover:bg-white/10' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-white/30'
                          }
                        `}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {showStatusMenu === lead.id && (
                        <div className={`
                          absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10
                          ${isDark ? 'bg-slate-800 border border-white/10' : 'bg-white border border-gray-200'}
                        `}>
                          <div className="py-1">
                            <div className={`px-4 py-2 text-xs font-medium ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                              Update Status
                            </div>
                            {['Not Contacted', 'Contacted', 'Replied', 'Booked Call', 'Closed'].map(status => (
                              <button
                                key={status}
                                onClick={() => handleStatusUpdate(lead.id, status)}
                                className={`
                                  block w-full text-left px-4 py-2 text-sm
                                  ${lead.status === status ? 
                                    (isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700') : 
                                    (isDark ? 'text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100')
                                  }
                                `}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              No leads found matching your criteria
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

// Add display name for React DevTools
ModernLeadTable.displayName = 'ModernLeadTable';