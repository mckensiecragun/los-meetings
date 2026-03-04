function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function BottomNav({ onPlusClick, activePage, activeMeeting, seconds, paused, isProcessing, onActiveMeetingClick, onHomeClick, onProfileClick }) {
  return (
    <nav className="bottom-nav">
      <button className={`nav-btn ${activePage === "home" ? "nav-btn--active" : ""}`} onClick={onHomeClick}>
        <span className="material-symbols-rounded" style={{fontSize: "26px", fontVariationSettings: activePage === "home" ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>home</span>
      </button>

      {activeMeeting && !isProcessing ? (
        <button className="nav-btn nav-btn--recording-pill" onClick={onActiveMeetingClick}>
          {isProcessing ? (
            <span className="processing-dot" />
          ) : paused ? (
            <span className="material-symbols-rounded" style={{fontSize: "14px", color: "#6b6b6b"}}>pause</span>
          ) : (
            <span className="nav-recording-dot" />
          )}
          <span className="nav-recording-timer">
            {isProcessing ? "Processing..." : formatTime(seconds)}
          </span>
        </button>
      ) : (
        <button className="nav-btn nav-btn--plus" onClick={onPlusClick}>
          <span className="material-symbols-rounded" style={{fontSize: "26px"}}>add</span>
        </button>
      )}

      <button className={`nav-btn ${activePage === "profile" ? "nav-btn--active" : ""}`} onClick={onProfileClick}>
        <span className="material-symbols-rounded" style={{fontSize: "26px", fontVariationSettings: activePage === "profile" ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>person</span>
      </button>
    </nav>
  );
}
