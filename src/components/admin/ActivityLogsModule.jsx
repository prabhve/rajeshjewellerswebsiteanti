import React, { useState } from 'react';
import { History, Search, Filter, ShieldCheck, Clock } from 'lucide-react';

const ActivityLogsModule = ({
  activityLogs = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.event?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">22. Activity Logs &amp; Audit Trail</h2>
          <p className="admin-pane-desc">
            Immutable system audit trail recording all gold rate changes, product edits, gallery uploads, and website publications.
          </p>
        </div>
      </div>

      <div className="admin-card-surface p-4 mb-4 flex items-center justify-between gap-3">
        <div className="relative min-w-[260px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search activity logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input-field pl-8"
          />
        </div>
        <span className="text-xs text-amber-300 font-mono">
          Total Recorded Log Events: {filteredLogs.length}
        </span>
      </div>

      <div className="admin-card-surface overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/60 text-amber-300 font-serif uppercase tracking-wider border-b border-amber-600/20">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Event Type</th>
              <th className="p-3">User / Role</th>
              <th className="p-3">Event Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition">
                <td className="p-3 whitespace-nowrap text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-amber-400" />
                    <span>{log.timestamp}</span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50 font-bold">
                    {log.event}
                  </span>
                </td>
                <td className="p-3 whitespace-nowrap font-bold text-white">
                  {log.user || 'Owner'}
                </td>
                <td className="p-3 text-gray-300">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(ActivityLogsModule);
