export default function SmartpenScreen({ onBack }) {
  return (
    <div className="smartpen-screen">

      {/* Nav */}
      <div className="smartpen-nav">
        <button className="smartpen-back" onClick={onBack}>
          <span className="material-symbols-rounded" style={{ fontSize: "28px" }}>chevron_left</span>
        </button>
        <h1 className="smartpen-title">Filevine Smartpen</h1>
        <div style={{ width: 40 }} />
      </div>

      {/* Content */}
      <div className="smartpen-content">
        <div className="smartpen-image-area">
          <div className="smartpen-image-placeholder" />
        </div>

        <div className="smartpen-text">
          <h2 className="smartpen-heading">Connect your Filevine Smartpen</h2>
          <p className="smartpen-description">
            Don't have one yet? Purchase a pen at{" "}
            <a href="https://filevine.com" className="smartpen-link">filevine.com</a>
            {" "}to get started.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="smartpen-footer">
        <button className="btn-connect">Connect</button>
      </div>

    </div>
  );
}
