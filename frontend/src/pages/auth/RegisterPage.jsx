// frontend/src/pages/auth/RegisterPage.jsx - Registration page

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    role: "PARENT",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      // Validation
      const newErrors = {};
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.passwordConfirm) {
        newErrors.passwordConfirm = "Passwords do not match";
      }
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      // Register
      await register(formData);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setErrors({
        submit: err.message || "Registration failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-8">
      <div className="w-full max-w-md px-4">
        <div className="card-lg">
          <h1 className="text-headline-l text-center mb-2">GeniDoc Hayat</h1>
          <p className="text-center text-text-secondary mb-8 text-body">
            Créer un nouveau compte
          </p>

          {(errors.submit || authError) && (
            <div className="mb-6 p-3 bg-error/10 border border-error rounded text-error text-body-s">
              {errors.submit || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-label mb-2">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className={`w-full px-3 py-2 border rounded bg-white text-sm ${
                    errors.firstName ? "border-error" : "border-gray-300"
                  }`}
                  disabled={isSubmitting || loading}
                />
                {errors.firstName && (
                  <p className="text-error text-body-s mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-label mb-2">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                  className={`w-full px-3 py-2 border rounded bg-white text-sm ${
                    errors.lastName ? "border-error" : "border-gray-300"
                  }`}
                  disabled={isSubmitting || loading}
                />
                {errors.lastName && (
                  <p className="text-error text-body-s mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

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
              <label className="block text-label mb-2">
                Téléphone (optionnel)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+212600000000"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
                disabled={isSubmitting || loading}
              />
            </div>

            <div>
              <label className="block text-label mb-2">Type de compte</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
                disabled={isSubmitting || loading}
              >
                <option value="PARENT">Parent/Tuteur</option>
                <option value="PEDIATRICIAN">Pédiatre</option>
              </select>
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
              <p className="text-caption text-text-muted mt-1">
                Min 8 caractères, majuscule, minuscule, chiffre et caractère
                spécial
              </p>
            </div>

            <div>
              <label className="block text-label mb-2">
                Confirmer mot de passe
              </label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border rounded bg-white ${
                  errors.passwordConfirm ? "border-error" : "border-gray-300"
                }`}
                disabled={isSubmitting || loading}
              />
              {errors.passwordConfirm && (
                <p className="text-error text-body-s mt-1">
                  {errors.passwordConfirm}
                </p>
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
                  Inscription en cours...
                </span>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted text-body-s">
              Vous avez déjà un compte?{" "}
              <a
                href="/auth/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
