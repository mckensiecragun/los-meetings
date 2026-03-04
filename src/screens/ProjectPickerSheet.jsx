import { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";

function filterProjects(list, query) {
  if (!query.trim()) return list;
  const q = query.toLowerCase();
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.contact.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default function ProjectPickerSheet({ visible, onClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [animating, setAnimating] = useState(false);
  const [rendered, setRendered] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimating(true);
          // Focus the native input so the mobile keyboard opens
          setTimeout(() => inputRef.current?.focus(), 50);
        })
      );
    } else {
      setAnimating(false);
      const t = setTimeout(() => {
        setRendered(false);
        setSearchTerm("");
      }, 320);
      return () => clearTimeout(t);
    }
  }, [visible]);

  function handleClose() {
    setAnimating(false);
    setTimeout(() => {
      setRendered(false);
      setSearchTerm("");
      onClose();
    }, 320);
  }

  if (!rendered) return null;

  const filtered = filterProjects(projects, searchTerm);

  return (
    <div
      className={`sheet-backdrop sheet-backdrop--picker ${animating ? "sheet-backdrop--visible" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className={`sheet-panel sheet-panel--tall ${animating ? "sheet-panel--visible" : ""}`}>
        {/* Header */}
        <div className="sheet-header sheet-header--row">
          <span className="sheet-title">Project</span>
          <button className="sheet-close-btn" onClick={handleClose}>
            <span className="material-symbols-rounded" style={{ fontSize: "22px" }}>close</span>
          </button>
        </div>
        <div className="sheet-divider" />

        {/* Search field */}
        <div className="picker-search">
          <div className="search-field search-field--active">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              className="picker-search-input"
              type="text"
              placeholder="Search for project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Project list */}
        <div className="picker-list">
          {filtered.map((project, i) => (
            <button
              key={project.id + "-" + i}
              className="picker-item"
              onClick={() => onSelect(project)}
            >
              <div className="picker-avatar" style={{ background: project.color }}>
                {project.initials}
              </div>
              <div className="picker-item-info">
                <div className="picker-item-name">{project.name}</div>
                <div className="picker-item-meta">
                  {project.contact} ({project.handle}) · {project.type} · {project.date} · {project.event} · {project.category} · {project.tags.join(", ")}
                </div>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="picker-empty">No projects found</div>
          )}
        </div>
      </div>
    </div>
  );
}
