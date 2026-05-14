// frontend/src/pages/smartcards/SmartCardPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SmartCardPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("scan"); // 'scan' or 'generate'
  const [qrCode, setQrCode] = useState("");
  const [cardData, setCardData] = useState(null);
  const [newbornId, setNewbornId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScanQR = async () => {
    if (!qrCode.trim()) {
      setError("Veuillez entrer un code QR");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:3000/api/smartcards/qr/${qrCode}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!res.ok) throw new Error("Carte non trouvée");

      const data = await res.json();
      setCardData(data.data);
      setQrCode("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCard = async () => {
    if (!newbornId.trim()) {
      setError("Veuillez entrer un ID bébé");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/smartcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newbornId, facilityId: "facility1" }),
      });

      if (!res.ok) throw new Error("Failed to generate");

      const data = await res.json();
      setCardData(data.data);
      setNewbornId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = (qrCode) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:image/svg+xml," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
          <text x="50" y="100" font-size="16">${qrCode}</text>
          </svg>`,
        ),
    );
    element.setAttribute("download", "smartcard.svg");
    element.click();
  };

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
          <h1 className="text-headline-l">Cartes intelligentes</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error rounded text-error">
            {error}
          </div>
        )}

        <div className="mb-8 flex gap-4">
          <button
            onClick={() => {
              setMode("scan");
              setCardData(null);
            }}
            className={`btn ${mode === "scan" ? "btn-primary" : "btn-ghost"}`}
          >
            📱 Scanner
          </button>
          <button
            onClick={() => {
              setMode("generate");
              setCardData(null);
            }}
            className={`btn ${mode === "generate" ? "btn-primary" : "btn-ghost"}`}
          >
            ➕ Générer
          </button>
        </div>

        {mode === "scan" && (
          <div className="card-lg p-6 mb-8">
            <h2 className="text-title-l mb-4">Scanner une carte</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-label mb-2">Code QR</label>
                <input
                  type="text"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  placeholder="Entrez le code QR"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={handleScanQR}
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? "Recherche..." : "Rechercher la carte"}
              </button>
            </div>
          </div>
        )}

        {mode === "generate" && (
          <div className="card-lg p-6 mb-8">
            <h2 className="text-title-l mb-4">Générer une nouvelle carte</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-label mb-2">ID du bébé</label>
                <input
                  type="text"
                  value={newbornId}
                  onChange={(e) => setNewbornId(e.target.value)}
                  placeholder="ID unique du bébé"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={handleGenerateCard}
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? "Génération..." : "Générer la carte"}
              </button>
            </div>
          </div>
        )}

        {cardData && (
          <div className="card-lg p-6">
            <h2 className="text-title-l mb-4">Détails de la carte</h2>
            <div className="space-y-4">
              <div>
                <p className="text-body-s text-text-secondary">
                  Numéro de carte
                </p>
                <p className="text-title-m font-mono">{cardData.cardNumber}</p>
              </div>

              <div>
                <p className="text-body-s text-text-secondary">Code QR</p>
                <p className="text-title-m font-mono break-all">
                  {cardData.qrCode}
                </p>
                <button
                  onClick={() => downloadQRCode(cardData.qrCode)}
                  className="btn btn-sm btn-primary mt-2"
                >
                  ↓ Télécharger QR
                </button>
              </div>

              <div>
                <p className="text-body-s text-text-secondary">Code NFC</p>
                <p className="text-title-m font-mono">{cardData.nfcCode}</p>
              </div>

              <div>
                <p className="text-body-s text-text-secondary">Statut</p>
                <span className="badge badge-success">{cardData.status}</span>
              </div>

              {cardData.newborn && (
                <div className="p-4 bg-blue-50 rounded">
                  <p className="text-body-s text-text-secondary">
                    Bébé associé
                  </p>
                  <p className="text-title-m">
                    {cardData.newborn.firstName} {cardData.newborn.lastName}
                  </p>
                  <p className="text-body-s text-text-secondary">
                    Né:{" "}
                    {new Date(cardData.newborn.dateOfBirth).toLocaleDateString(
                      "fr-FR",
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
