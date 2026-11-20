import { useState } from "react";
import { ArrowLeftIcon } from "../components/Icons";

function RegisterPage({ onSubmit, onLogin, onBack }) {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").toString().trim();
    const email = formData.get("email").toString().trim();
    const phone = formData.get("phone").toString().trim();
    const password = formData.get("password").toString();
    const confirmPassword = formData.get("confirmPassword").toString();

    if (!name || !email || !phone) {
      setError("Barcha maydonlarni to‘ldiring.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parollar bir-biriga mos kelmadi.");
      return;
    }

    setError("");
    onSubmit({
      name,
      email,
      phone,
    });
  }

  return (
    <div className="auth-card">
      <div className="auth-card-top">
        <span className="auth-badge">Ro‘yxatdan o‘tish</span>
        <button type="button" className="auth-back-btn" onClick={onBack}>
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </button>
      </div>

      <h3 className="auth-title">Yangi hisob yaratish</h3>
      <p className="auth-desc">
        Tezkor buyurtma berish va sevimlilarni saqlash uchun ro‘yxatdan o‘ting.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="register-name">
            To‘liq ism
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            className="auth-input"
            placeholder="Azizbek Karimov"
            autoComplete="name"
            minLength={2}
            required
          />
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-email">
              Elektron pochta
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              className="auth-input"
              placeholder="azizbek@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-phone">
              Telefon raqam
            </label>
            <input
              id="register-phone"
              name="phone"
              type="tel"
              className="auth-input"
              placeholder="+998 90 123 45 67"
              autoComplete="tel"
              required
            />
          </div>
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-password">
              Parol
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              className="auth-input"
              placeholder="Kamida 6 ta belgi"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-confirm">
              Parolni tasdiqlang
            </label>
            <input
              id="register-confirm"
              name="confirmPassword"
              type="password"
              className="auth-input"
              placeholder="Parolni qayta kiriting"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="auth-submit-btn">
          Ro‘yxatdan o‘tish
        </button>
      </form>

      <p className="auth-switch">
        Allaqachon hisobingiz bormi?{" "}
        <button type="button" className="auth-switch-link" onClick={onLogin}>
          Kirish
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
