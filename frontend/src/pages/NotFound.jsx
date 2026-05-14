// frontend/src/pages/NotFound.jsx - 404 Page

import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-display text-primary-600 mb-4">404</h1>
        <p className="text-headline-m text-text-secondary mb-8">
          Page non trouvée
        </p>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
