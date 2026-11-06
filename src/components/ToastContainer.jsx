import React from 'react';
import { useJewellery } from '../context/JewelleryContext';
import { CheckCircle2, AlertCircle, Info, Heart, ShoppingBag, Sparkles, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, dismissToast } = useJewellery();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let badgeType = 'success';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          badgeType = 'error';
        } else if (toast.type === 'info') {
          Icon = Info;
          badgeType = 'info';
        } else if (toast.message.includes('Wishlist')) {
          Icon = Heart;
          badgeType = 'wishlist';
        } else if (toast.message.includes('Bag') || toast.message.includes('Cart')) {
          Icon = ShoppingBag;
          badgeType = 'cart';
        } else if (toast.message.includes('MCX') || toast.message.includes('Bullion')) {
          Icon = Sparkles;
          badgeType = 'gold';
        }

        return (
          <div
            key={toast.id}
            className={`toast-message toast-${badgeType}`}
            onClick={() => dismissToast && dismissToast(toast.id)}
            role="alert"
          >
            <div className="toast-shimmer-sweep" />
            <div className="toast-icon-wrap">
              <Icon size={18} className="toast-icon-svg" />
            </div>
            <div className="toast-body">
              <span className="toast-text">{toast.message}</span>
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                dismissToast && dismissToast(toast.id);
              }}
              aria-label="Dismiss notification"
            >
              <X size={13} />
            </button>
            <div className="toast-progress-bar" />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ToastContainer);
