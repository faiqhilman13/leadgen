import { Lead } from '../types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    first_name: 'Sarah',
    last_name: 'Johnson',
    linkedin_url: 'https://linkedin.com/in/sarahjohnson',
    title: 'Marketing Director',
    email: 'sarah.johnson@techcorp.com',
    company_name: 'TechCorp Solutions',
    company_website: 'https://techcorp.com',
    multiline_icebreaker: 'Hi Sarah, I noticed your recent post about digital transformation challenges. Our lead generation platform has helped similar companies in tech increase qualified leads by 300%.',
    sent: true,
    follow_up: false,
    created_at: '2024-01-15'
  },
  {
    id: '2',
    first_name: 'Michael',
    last_name: 'Chen',
    linkedin_url: 'https://linkedin.com/in/michaelchen',
    title: 'VP of Sales',
    email: 'michael.chen@growthco.com',
    company_name: 'GrowthCo Marketing',
    company_website: 'https://growthco.com',
    multiline_icebreaker: 'Michael, your company\'s focus on scaling B2B sales aligns perfectly with what we do. I\'d love to share how we\'ve helped similar agencies generate $2M+ in new revenue.',
    sent: true,
    follow_up: true,
    created_at: '2024-01-14'
  },
  {
    id: '3',
    first_name: 'Emily',
    last_name: 'Rodriguez',
    linkedin_url: 'https://linkedin.com/in/emilyrodriguez',
    title: 'CEO',
    email: 'emily@startupventures.com',
    company_name: 'Startup Ventures',
    company_website: 'https://startupventures.com',
    multiline_icebreaker: 'Emily, congratulations on your recent funding round! As you scale, lead generation becomes crucial. We\'ve helped 50+ startups build predictable sales pipelines.',
    sent: false,
    follow_up: false,
    created_at: '2024-01-13'
  },
  {
    id: '4',
    first_name: 'David',
    last_name: 'Thompson',
    linkedin_url: 'https://linkedin.com/in/davidthompson',
    title: 'Head of Business Development',
    email: 'david.thompson@innovatetech.com',
    company_name: 'InnovateTech',
    company_website: 'https://innovatetech.com',
    multiline_icebreaker: 'David, I saw your presentation on revenue growth strategies. Our lead gen system could complement your existing efforts and help you hit those ambitious targets.',
    sent: true,
    follow_up: false,
    created_at: '2024-01-12'
  },
  {
    id: '5',
    first_name: 'Lisa',
    last_name: 'Wang',
    linkedin_url: 'https://linkedin.com/in/lisawang',
    title: 'CMO',
    email: 'lisa.wang@digitalfirst.com',
    company_name: 'Digital First Agency',
    company_website: 'https://digitalfirst.com',
    multiline_icebreaker: 'Lisa, your agency\'s client success stories are impressive. I believe our lead generation expertise could help you attract even more high-value clients.',
    sent: false,
    follow_up: true,
    created_at: '2024-01-11'
  },
  {
    id: '6',
    first_name: 'James',
    last_name: 'Parker',
    linkedin_url: 'https://linkedin.com/in/jamesparker',
    title: 'Sales Manager',
    email: 'james.parker@salesforce.com',
    company_name: 'SalesForce Pro',
    company_website: 'https://salesforcepro.com',
    multiline_icebreaker: 'James, with your experience in sales optimization, you\'ll appreciate our data-driven approach to lead generation. We\'ve helped teams like yours reduce sales cycles by 40%.',
    sent: true,
    follow_up: true,
    created_at: '2024-01-10'
  }
];

export const calculateStats = (leads: Lead[]) => {
  const totalLeads = leads.length;
  const emailsSent = leads.filter(lead => lead.sent).length;
  const followUpsNeeded = leads.filter(lead => lead.follow_up).length;
  const conversionRate = totalLeads > 0 ? Math.round((emailsSent / totalLeads) * 100) : 0;
  const responseRate = emailsSent > 0 ? Math.round(((emailsSent - followUpsNeeded) / emailsSent) * 100) : 0;

  return {
    totalLeads,
    emailsSent,
    followUpsNeeded,
    conversionRate,
    responseRate
  };
};