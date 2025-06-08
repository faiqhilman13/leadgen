import React, { useState, useEffect } from 'react';
import { TableLoadingSkeleton } from './LoadingSpinner';

const LeadTable = ({ data = [], loading, error, onStatusUpdate }) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (data) {
      setLeads(data);
    }
  }, [data]);

  const handleStatusChange = async (leadId, newStatus) => {
    if (onStatusUpdate) {
      const result = await onStatusUpdate(leadId, newStatus);
      if (result.success) {
        setLeads(prev => prev.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
      }
    }
  };

  if (loading) {
    return <TableLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Recent Leads</h3>
        </div>
        <div className="p-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-800 text-sm">Error loading leads: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Recent Leads</h3>
        </div>
        <div className="p-6 text-center text-gray-500">
          No leads data available
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Recent Leads</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left" style={{minWidth: '1000px'}}>
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Company / Contact</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{lead.company}</div>
                    <div className="text-xs text-gray-500">{lead.name} - {lead.title}</div>
                    {lead.website && (
                      <a href={lead.website} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:text-blue-700">
                        {lead.website.replace('https://', '').replace('http://', '').split('/')[0]}
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`mailto:${lead.email}`} className="text-sm text-blue-600 hover:text-blue-900 block">
                    {lead.email}
                  </a>
                  <a href={lead.linkedin} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:text-blue-700">
                    LinkedIn Profile
                  </a>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <div className="text-xs text-gray-600 truncate" title={lead.notes}>
                    {lead.notes}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={lead.status} 
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className="text-xs rounded-md border-gray-300"
                    style={{'&:focus': {borderColor: '#BFD741', boxShadow: `0 0 0 1px #BFD741`}}}
                  >
                    <option>Not Contacted</option>
                    <option>Contacted</option>
                    <option>Replied</option>
                    <option>Booked Call</option>
                    <option>Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="text-xs font-medium px-2 py-1 rounded" 
                          style={{color: '#BFD741', border: '1px solid #BFD741'}}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#BFD741';
                            e.target.style.color = 'white';
                          }} 
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#BFD741';
                          }}>
                    Contact
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable; 