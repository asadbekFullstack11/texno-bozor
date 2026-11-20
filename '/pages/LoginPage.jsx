import { ArrowLeftIcon } from "../components/Icons";

function LoginPage({ onSubmit, onRegister, onBack }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      email: formData.get("email").toString().trim(),
      password: formData.get("password").toString(),
    });
  }

  return (
    <div className="auth-card">
      <div className="auth-card-top">
        <span className="auth-badge">Kirish</span>
        <button type="button" className="auth-back-btn" onClick={onBack}>
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </button>
      </div>

      <h3 className="auth-title">Hisobga kirish</h3>
      <p className="auth-desc">
        Buyurtmalar tarixi va savatingizni ko‘rish uchun hisobingizga kiring.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="login-email">
            Elektron pochta
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            className="auth-input"
            placeholder="azizbek@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="auth-field-group">
          <label className="auth-label" htmlFor="login-password">
            Parol
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            className="auth-input"
            placeholder="Parolingizni kiriting"
            autoComplete="current-password"
            minLength={6}
            required
          />
        </div>

        <button type="submit" className="auth-submit-btn">
          Kirish
        </button>
      </form>

      <p className="auth-switch">
        Hali hisobingiz yo‘qmi?{" "}
        <button type="button" className="auth-switch-link" onClick={onRegister}>
          Ro‘yxatdan o‘tish
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
