// frontend/src/pages/notifications/NotificationsPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          "http://localhost:3000/api/notifications/unread",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setNotifications(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await fetch(
        `http://localhost:3000/api/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (err) {
      setError(err.message);
    }
  };

  const getIcon = (type) => {
    const icons = {
      consultation: "🔬",
      vaccination: "💉",
      appointment: "📅",
      prescription: "💊",
      billing: "📄",
      alert: "⚠️",
    };
    return icons[type] || "📬";
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-primary-600 hover:text-primary mb-4"
          >
            ← Retour
          </button>
          <h1 className="text-headline-l">Notifications</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="card-lg p-6 text-center">
            <p className="text-body-l text-text-secondary">
              Aucune notification non lue
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="card p-6 border border-gray-200 bg-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <span className="text-2xl">
                      {getIcon(notification.type)}
                    </span>
                    <div>
                      <h3 className="text-title-m">{notification.title}</h3>
                      <p className="text-body text-text-secondary mt-2">
                        {notification.message}
                      </p>
                      <p className="text-body-s text-text-secondary mt-3">
                        {new Date(notification.createdAt).toLocaleString(
                          "fr-FR",
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="btn btn-sm btn-ghost"
                  >
                    ✓ Marquer comme lue
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
