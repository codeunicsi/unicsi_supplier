import { useState, useEffect, useRef } from "react";
import api from "../../api";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch unread count on mount
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      if (res.data?.success) {
        setUnreadCount(res.data.data.unread_count);
      }
    } catch (err) {
      // silent fail
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notifications?limit=10");
      if (res.data?.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!open) {
      fetchNotifications();
    }
    setOpen(!open);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === id ? { ...n, is_read: true } : n
        )
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      // silent fail
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      // silent fail
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "ORDER":
        return "📦";
      case "PAYMENT":
        return "💰";
      case "PRODUCT":
        return "🏷️";
      case "RETURN":
        return "↩️";
      case "NDR":
        return "🚫";
      case "SHIPPING":
        return "🚚";
      case "KYC":
        return "📋";
      default:
        return "🔔";
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-150 sm:h-9 sm:w-9"
        style={{
          background: open ? GRADIENT : "#f0fafc",
          border: open ? "1px solid transparent" : "1px solid #b8e8f0",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = GRADIENT;
          e.currentTarget.style.border = "1px solid transparent";
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = "#f0fafc";
            e.currentTarget.style.border = "1px solid #b8e8f0";
          }
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0196 3.41016C8.7196 3.41016 6.0196 6.11016 6.0196 9.41016V12.2802C6.0196 12.8502 5.7596 13.7202 5.4496 14.2002L4.2996 16.0602C3.5896 17.2202 4.0796 18.5102 5.3796 18.9602C9.6896 20.3802 14.3396 20.3802 18.6496 18.9602C19.8596 18.5502 20.3896 17.1402 19.7296 16.0602L18.5796 14.2002C18.2796 13.7202 18.0196 12.8502 18.0196 12.2802V9.41016C18.0196 6.12016 15.3096 3.41016 12.0196 3.41016Z"
            stroke={open ? "#fff" : "#292D32"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M13.8699 3.70078C13.5599 3.61078 13.2399 3.54078 12.9099 3.50078C11.9499 3.38078 11.0299 3.45078 10.1699 3.70078C10.4599 2.96078 11.1799 2.44078 12.0199 2.44078C12.8599 2.44078 13.5799 2.96078 13.8699 3.70078Z"
            stroke={open ? "#fff" : "#292D32"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.0195 19.3398C15.0195 20.9998 13.6795 22.3398 12.0195 22.3398C11.1995 22.3398 10.4395 21.9898 9.89953 21.4498C9.35953 20.9098 9.01953 20.1498 9.01953 19.3398"
            stroke={open ? "#fff" : "#292D32"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
        </svg>
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ background: "#ef4444" }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 z-[1200] mt-2 w-80 origin-top-right rounded-xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid #d0eef3",
            boxShadow: "0 8px 24px rgba(0,151,178,0.12)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0f4f7]">
            <h3 className="text-sm font-semibold text-gray-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-medium hover:underline"
                style={{ color: "#0097b2", border: "none", background: "none", cursor: "pointer" }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div
                  className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
                  style={{ borderColor: "#0097b2", borderTopColor: "transparent" }}
                />
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.notification_id}
                  onClick={() => !n.is_read && handleMarkAsRead(n.notification_id)}
                  className="flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer hover:bg-[#f0fafc]"
                  style={{
                    background: n.is_read ? "transparent" : "#f0fafc",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <span className="text-lg mt-0.5">{getTypeIcon(n.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {timeAgo(n.created_at)}
                    </p>
                  </div>
                  {!n.is_read && (
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: "#0097b2" }}
                    />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-[#e0f4f7] px-4 py-2 text-center">
              <a
                href="/notifications"
                className="text-xs font-medium hover:underline"
                style={{ color: "#0097b2" }}
              >
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
