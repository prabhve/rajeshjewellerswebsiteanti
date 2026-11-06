import React, { useState } from 'react';
import { Shield, Lock, Users, Key, CheckCircle2 } from 'lucide-react';

const AdminUsersSecurityModule = ({
  adminUsers = [],
  setAdminUsers = () => {},
  changeAdminPasscode = () => {},
  showToast = () => {}
}) => {
  const [passcodeForm, setPasscodeForm] = useState({
    currentPasscode: '',
    newPasscode: '',
    confirmPasscode: ''
  });

  const handleChangePIN = (e) => {
    e.preventDefault();
    if (passcodeForm.newPasscode !== passcodeForm.confirmPasscode) {
      showToast('New passcodes do not match.', 'error');
      return;
    }
    const ok = changeAdminPasscode(passcodeForm.newPasscode);
    if (ok) {
      setPasscodeForm({ currentPasscode: '', newPasscode: '', confirmPasscode: '' });
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">20. Admin Users, Security &amp; Role Permissions</h2>
          <p className="admin-pane-desc">
            Manage authorized showroom staff access, change Master Passcode PIN, and review role-based access control matrix.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Passcode Security */}
        <form onSubmit={handleChangePIN} className="admin-card-surface p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-amber-600/20">
            <Lock size={16} className="text-amber-400" />
            <h3 className="font-bold text-white text-sm">Change Showroom Master Passcode PIN</h3>
          </div>

          <div>
            <label className="admin-label">New 4-Digit Master PIN</label>
            <input
              type="password"
              maxLength={8}
              value={passcodeForm.newPasscode}
              onChange={(e) => setPasscodeForm({ ...passcodeForm, newPasscode: e.target.value })}
              placeholder="e.g. 1994"
              className="admin-input-field font-mono font-bold"
              required
            />
          </div>

          <div>
            <label className="admin-label">Confirm New Master PIN</label>
            <input
              type="password"
              maxLength={8}
              value={passcodeForm.confirmPasscode}
              onChange={(e) => setPasscodeForm({ ...passcodeForm, confirmPasscode: e.target.value })}
              placeholder="e.g. 1994"
              className="admin-input-field font-mono font-bold"
              required
            />
          </div>

          <button type="submit" className="admin-btn-primary w-full justify-center">
            <CheckCircle2 size={16} />
            <span>Update Master PIN Security</span>
          </button>
        </form>

        {/* Roles Table */}
        <div className="admin-card-surface p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-amber-600/20">
            <Users size={16} className="text-amber-400" />
            <h3 className="font-bold text-white text-sm">Role-Based Access Control Matrix</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded bg-black/40 border border-amber-600/20 flex justify-between">
              <div>
                <strong className="text-white block">OWNER (Full Control)</strong>
                <span className="text-gray-400">Products, Rates, CMS, Security & Users</span>
              </div>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>

            <div className="p-3 rounded bg-black/40 border border-amber-600/20 flex justify-between">
              <div>
                <strong className="text-white block">MANAGER</strong>
                <span className="text-gray-400">Products, Rates, Inventory & Leads</span>
              </div>
              <span className="text-amber-300 font-bold">Authorized</span>
            </div>

            <div className="p-3 rounded bg-black/40 border border-amber-600/20 flex justify-between">
              <div>
                <strong className="text-white block">CONTENT EDITOR</strong>
                <span className="text-gray-400">Homepage, Media, Gallery & Banners</span>
              </div>
              <span className="text-amber-300 font-bold">Authorized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminUsersSecurityModule);
