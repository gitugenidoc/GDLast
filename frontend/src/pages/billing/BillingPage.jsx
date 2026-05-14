// frontend/src/pages/billing/BillingPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BillingPage() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    currency: "USD",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          "http://localhost:3000/api/billing/invoices/facility1",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setInvoices(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/billing/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ facilityId: "facility1", ...formData }),
      });

      if (!res.ok) throw new Error("Failed to create");

      const data = await res.json();
      setInvoices((prev) => [data.data, ...prev]);
      setFormData({ amount: "", currency: "USD", description: "" });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const downloadInvoice = (invoiceNumber) => {
    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,Invoice: ${invoiceNumber}`;
    link.download = `${invoiceNumber}.txt`;
    link.click();
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
          <h1 className="text-headline-l">Facturation</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? "✕ Annuler" : "+ Créer une facture"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 card-lg p-6">
            <h2 className="text-title-l mb-4">Nouvelle facture</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-label mb-2">Montant</label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-label mb-2">Devise</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="TND">TND</option>
                </select>
              </div>

              <div>
                <label className="block text-label mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description des services"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting ? "Création..." : "Créer la facture"}
              </button>
            </form>
          </div>
        )}

        <div>
          <h2 className="text-title-l mb-4">Factures récentes</h2>
          {invoices.length === 0 ? (
            <div className="card-lg p-6 text-center">
              <p className="text-body text-text-secondary">Aucune facture</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="card p-6 border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-title-m">{invoice.invoiceNumber}</h3>
                      <p className="text-body-s text-text-secondary mt-2">
                        {invoice.amount} {invoice.currency}
                      </p>
                      <p className="text-body-s text-text-secondary">
                        {invoice.description}
                      </p>
                      <p className="text-body-s text-text-secondary mt-2">
                        Créé:{" "}
                        {new Date(invoice.createdAt).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`badge ${
                          invoice.status === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {invoice.status === "paid" ? "Payée" : "En attente"}
                      </span>
                      <button
                        onClick={() => downloadInvoice(invoice.invoiceNumber)}
                        className="btn btn-sm btn-ghost mt-2"
                      >
                        ↓ Télécharger
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
