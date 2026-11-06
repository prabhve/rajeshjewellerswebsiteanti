import React, { useState } from 'react';
import { CalendarCheck, Search, Filter, Phone, MessageSquare, CheckCircle2, Clock, User } from 'lucide-react';

const BookingsLeadsModule = ({
  leads = [],
  updateLeadStatus = () => {},
  showToast = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeads = leads.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch =
      item.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactNumber?.includes(searchQuery) ||
      item.inquiryType?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">16. VIP Bookings &amp; Customer Inquiries</h2>
          <p className="admin-pane-desc">
            Central lead dashboard for VIP showroom lounge visits, WhatsApp video shopping requests, and product inquiries.
          </p>
        </div>
      </div>

      {/* Filter Header */}
      <div className="admin-card-surface p-4 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['All', 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                statusFilter === st ? 'bg-amber-500 text-black' : 'bg-black/40 text-gray-300 border border-amber-600/20'
              }`}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by customer or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input-field pl-8"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="admin-card-surface overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/60 text-amber-300 font-serif uppercase tracking-wider border-b border-amber-600/20">
            <tr>
              <th className="p-3">Customer Details</th>
              <th className="p-3">Inquiry Type</th>
              <th className="p-3">Product Reference</th>
              <th className="p-3">Preferred Time</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition">
                <td className="p-3">
                  <strong className="text-white block">{lead.customerName}</strong>
                  <span className="text-[10px] text-amber-300">{lead.contactNumber}</span>
                  {lead.email && <span className="text-[10px] text-gray-400 block">{lead.email}</span>}
                </td>

                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50 font-bold">
                    {lead.inquiryType}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">{lead.source}</span>
                </td>

                <td className="p-3">
                  <span className="text-gray-300">{lead.productReference || 'General Consultation'}</span>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-1 text-gray-300">
                    <Clock size={12} className="text-amber-400" />
                    <span>{lead.preferredDate || 'Flexible'} {lead.preferredTime || ''}</span>
                  </div>
                </td>

                <td className="p-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className="bg-black/60 border border-amber-600/30 rounded px-2 py-1 text-xs font-bold text-amber-300"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="p-3 text-right">
                  <a
                    href={`https://wa.me/${lead.contactNumber?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Namaste ${lead.customerName}, Rajesh Jewellers Mirzapur showroom confirming your ${lead.inquiryType}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-bold"
                  >
                    <MessageSquare size={12} />
                    <span>WhatsApp</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(BookingsLeadsModule);
