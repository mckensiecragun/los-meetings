import { useState } from "react";

export default function ProfileScreen({ onSmartpenClick, darkMode, onToggleDarkMode }) {
  const [meetingProcessed, setMeetingProcessed] = useState(true);
  const [notesEnabled, setNotesEnabled] = useState(true);
  const [tasksEnabled, setTasksEnabled] = useState(true);
  const [timeEntriesEnabled, setTimeEntriesEnabled] = useState(false);

  return (
    <div className="profile-screen">
      {/* Avatar + name */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/Avatar.svg" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
        </div>
        <h2 className="profile-name">Alice Johnson</h2>
        <p className="profile-username">@product.filevineapp.com</p>
      </div>

      {/* Theme */}
      <div className="profile-card">
        <h3 className="profile-section-title">Theme</h3>
        <div className="profile-divider" />
        <div className="profile-row">
          <div className="theme-segmented">
            <button
              className={`theme-segment${!darkMode ? " theme-segment--active" : ""}`}
              onClick={() => darkMode && onToggleDarkMode()}
            >
              <span className="material-symbols-rounded" style={{ fontSize: "16px" }}>light_mode</span>
              Light
            </button>
            <button
              className={`theme-segment${darkMode ? " theme-segment--active" : ""}`}
              onClick={() => !darkMode && onToggleDarkMode()}
            >
              <span className="material-symbols-rounded" style={{ fontSize: "16px" }}>dark_mode</span>
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Filevine Smartpen */}
      <div className="profile-card">
        <button className="profile-row profile-row--link" onClick={onSmartpenClick}>
          <span className="profile-row-icon">
            <span className="material-symbols-rounded" style={{fontSize: "22px"}}>stylus_note</span>
          </span>
          <span className="profile-row-label">Filevine Smartpen</span>
          <span className="material-symbols-rounded profile-row-chevron" style={{fontSize: "20px"}}>chevron_right</span>
        </button>
      </div>

      {/* Push Notifications */}
      <div className="profile-card">
        <h3 className="profile-section-title">Notifications</h3>
        <div className="profile-divider" />
        <div className="profile-row">
          <div className="profile-row-text">
            <span className="profile-row-label">Meeting processed</span>
            <span className="profile-row-sublabel">Get notified when a meeting finishes processing</span>
          </div>
          <span
            className={`toggle-switch profile-toggle ${meetingProcessed ? "toggle-switch--on" : ""}`}
            onClick={() => setMeetingProcessed(v => !v)}
          >
            <span className="toggle-thumb" />
          </span>
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="profile-card">
        <h3 className="profile-section-title">Suggested Actions</h3>
        <p className="profile-section-subtitle">Choose which Filevine actions to suggest after a meeting is processed.</p>
        <div className="profile-divider" />
        <div className="profile-row">
          <span className="profile-row-label">Notes</span>
          <span
            className={`toggle-switch profile-toggle ${notesEnabled ? "toggle-switch--on" : ""}`}
            onClick={() => setNotesEnabled(v => !v)}
          >
            <span className="toggle-thumb" />
          </span>
        </div>
        <div className="profile-divider" />
        <div className="profile-row">
          <span className="profile-row-label">Tasks</span>
          <span
            className={`toggle-switch profile-toggle ${tasksEnabled ? "toggle-switch--on" : ""}`}
            onClick={() => setTasksEnabled(v => !v)}
          >
            <span className="toggle-thumb" />
          </span>
        </div>
        <div className="profile-divider" />
        <div className="profile-row">
          <span className="profile-row-label">Time entries</span>
          <span
            className={`toggle-switch profile-toggle ${timeEntriesEnabled ? "toggle-switch--on" : ""}`}
            onClick={() => setTimeEntriesEnabled(v => !v)}
          >
            <span className="toggle-thumb" />
          </span>
        </div>
      </div>

      {/* Help center */}
      <div className="profile-card">
        <button className="profile-row profile-row--link">
          <span className="profile-row-icon">
            <span className="material-symbols-rounded" style={{fontSize: "22px"}}>help</span>
          </span>
          <span className="profile-row-label">Help center</span>
        </button>
      </div>

      {/* Logout */}
      <div className="profile-card">
        <button className="profile-row profile-row--logout">
          <span className="profile-row-icon profile-row-icon--red">
            <span className="material-symbols-rounded" style={{fontSize: "22px"}}>logout</span>
          </span>
          <span className="profile-row-label profile-row-label--red">Logout</span>
        </button>
      </div>
    </div>
  );
}
