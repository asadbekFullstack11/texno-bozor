import { BagIcon, ChevronDownIcon, HeartIcon, LogoutIcon, UserIcon } from "./Icons";

function ProfileDropdown({ user, onLogout, onHome, onOrders, onFavorites }) {
  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toLocaleUpperCase())
    .join("");

  return (
    <details className="profile-dropdown">
      <summary className="profile-trigger">
        <span className="profile-avatar-sm">{initials || "U"}</span>
        <span className="profile-trigger-name">{user.name}</span>
        <span className="profile-trigger-chevron">
          <ChevronDownIcon />
        </span>
      </summary>

      <div className="profile-menu">
        <div className="profile-menu-head">
          <span className="profile-avatar-lg">{initials || "U"}</span>
          <div className="profile-user-info">
            <p className="profile-user-name">{user.name}</p>
            <p className="profile-user-email">{user.email}</p>
            {user.phone && <p className="profile-user-email">{user.phone}</p>}
          </div>
        </div>

        <div className="profile-menu-list">
          <button type="button" className="profile-menu-item is-active" onClick={onHome}>
            <span className="profile-menu-left">
              <UserIcon />
              <span>Bosh sahifa</span>
            </span>
          </button>

          <button type="button" className="profile-menu-item" onClick={onOrders}>
            <span className="profile-menu-left">
              <BagIcon />
              <span>Buyurtmalarim</span>
            </span>
          </button>

          <button type="button" className="profile-menu-item" onClick={onFavorites}>
            <span className="profile-menu-left">
              <HeartIcon />
              <span>Sevimlilarim</span>
            </span>
          </button>
        </div>

        <div className="profile-menu-footer">
          <button type="button" className="profile-menu-item is-danger" onClick={onLogout}>
            <span className="profile-menu-left">
              <LogoutIcon />
              <span>Chiqish</span>
            </span>
          </button>
        </div>
      </div>
    </details>
  );
}

export default ProfileDropdown;
