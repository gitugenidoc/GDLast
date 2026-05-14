// frontend/src/pages/auth/LoginPage.jsx - Login page with real authentication

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Basic validation
      const newErrors = {};
      if (!formData.email) {
        newErrors.email = "Email is required";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      // Call login
      await login(formData.email, formData.password);

      // Redirect to dashboard or previous page
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from);
    } catch (err) {
      setErrors({
        submit: err.message || "Login failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="card-lg">
          <h1 className="text-headline-l text-center mb-2">GeniDoc Hayat</h1>
          <p className="text-center text-text-secondary mb-8 text-body">
            Gestion intelligente des dossiers de santé du nouveau-né
          </p>

          {(errors.submit || authError) && (
            <div className="mb-6 p-3 bg-error/10 border border-error rounded text-error text-body-s">
              {errors.submit || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-label mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className={`w-full px-3 py-2 border rounded bg-white ${
                  errors.email ? "border-error" : "border-gray-300"
                }`}
                disabled={isSubmitting || loading}
              />
              {errors.email && (
                <p className="text-error text-body-s mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-label mb-2">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border rounded bg-white ${
                  errors.password ? "border-error" : "border-gray-300"
                }`}
                disabled={isSubmitting || loading}
              />
              {errors.password && (
                <p className="text-error text-body-s mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Connexion en cours...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted text-body-s mb-4">
              Pas encore de compte?{" "}
              <a
                href="/auth/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
