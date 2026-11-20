import { CartIcon, HeartIcon, SearchIcon, UserIcon } from "./Icons";
import ProfileDropdown from "./ProfileDropdown";

function Header({
  query,
  onSearch,
  cartCount,
  favoriteCount,
  user,
  onHome,
  onCart,
  onFavorites,
  onOrders,
  onLogin,
  onRegister,
  onLogout,
}) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button type="button" className="brand" onClick={onHome} aria-label="Bosh sahifa">
          <span className="brand-mark">TB</span>
          <span>
            <span className="brand-title">TexnoBozor</span>
            <span className="brand-subtitle">Zamonaviy texnika do‘koni</span>
          </span>
        </button>

        <div className="header-search">
          <span className="header-search-icon">
            <SearchIcon />
          </span>
          <input
            type="search"
            className="header-search-input"
            placeholder="Mahsulot nomi bo‘yicha qidirish..."
            aria-label="Mahsulot qidirish"
            value={query}
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>

        <div className="header-actions">
          <button type="button" className="header-pill" onClick={onFavorites}>
            <HeartIcon filled />
            <span>Sevimlilar</span>
            <span className="pill-count">{favoriteCount}</span>
          </button>

          <button
            type="button"
            className="header-pill header-pill--dark"
            onClick={onCart}
          >
            <CartIcon />
            <span>Savat</span>
            <span className="pill-count">{cartCount}</span>
          </button>

          <div className="header-divider" aria-hidden="true" />

          {user ? (
            <ProfileDropdown
              user={user}
              onLogout={onLogout}
              onHome={onHome}
              onOrders={onOrders}
              onFavorites={onFavorites}
            />
          ) : (
            <>
              <button type="button" className="header-pill" onClick={onLogin}>
                <UserIcon />
                <span>Kirish</span>
              </button>
              <button type="button" className="header-pill header-pill--brand" onClick={onRegister}>
                <span>Ro‘yxatdan o‘tish</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
