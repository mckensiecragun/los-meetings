import { useState, useEffect, useRef } from "react";

export default function NewMeetingSheet({
  visible,
  onClose,
  onRecord,
  selectedProject,
  onProjectFieldClick,
  onClearProject,
}) {
  const [meetingName, setMeetingName] = useState("");
  const [animating, setAnimating] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [nameActive, setNameActive] = useState(false);
  const nameInputRef = useRef(null);

  // Swipe-to-dismiss
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragHandleRef = useRef(null);
  const dragStartY = useRef(null);
  const dragOffsetRef = useRef(0);
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  // Attach non-passive touch listeners so we can preventDefault and block scroll
  useEffect(() => {
    const handle = dragHandleRef.current;
    if (!handle) return;

    function onTouchStart(e) {
      dragStartY.current = e.touches[0].clientY;
      setIsDragging(true);
    }

    function onTouchMove(e) {
      if (dragStartY.current === null) return;
      const delta = e.touches[0].clientY - dragStartY.current;
      if (delta > 0) {
        e.preventDefault(); // block browser scroll while dragging sheet down
        dragOffsetRef.current = delta;
        setDragOffset(delta);
      }
    }

    function onTouchEnd() {
      if (dragOffsetRef.current > 100) {
        onCloseRef.current();
      } else {
        setDragOffset(0);
      }
      dragOffsetRef.current = 0;
      dragStartY.current = null;
      setIsDragging(false);
    }

    handle.addEventListener("touchstart", onTouchStart, { passive: true });
    handle.addEventListener("touchmove", onTouchMove, { passive: false });
    handle.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      handle.removeEventListener("touchstart", onTouchStart);
      handle.removeEventListener("touchmove", onTouchMove);
      handle.removeEventListener("touchend", onTouchEnd);
    };
  }, [rendered]); // re-attach when sheet mounts/unmounts

  useEffect(() => {
    if (visible) {
      setRendered(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimating(true);
          setNameActive(true);
          // preventScroll stops iOS from scrolling the sheet out of view
          nameInputRef.current?.focus({ preventScroll: true });
        })
      );
    } else {
      setAnimating(false);
      const t = setTimeout(() => {
        setRendered(false);
        setMeetingName("");
        setNameActive(false);
        setDragOffset(0);
        setIsDragging(false);
        dragOffsetRef.current = 0;
      }, 320);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!rendered) return null;

  return (
    <div
      className={`sheet-backdrop ${animating ? "sheet-backdrop--visible" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`sheet-panel sheet-panel--tall ${animating ? "sheet-panel--visible" : ""}`}
        style={{
          transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
          transition: isDragging ? "none" : undefined,
        }}
      >
        {/* Drag handle */}
        <div className="sheet-drag-handle-area" ref={dragHandleRef}>
          <div className="sheet-drag-handle" />
        </div>

        {/* Header */}
        <div className="sheet-header">
          <span className="sheet-title">New Meeting</span>
        </div>
        <div className="sheet-divider" />

        {/* Form fields */}
        <div className="sheet-body">
          <div className="field-group">
            <label className="field-label">Meeting name</label>
            <input
              ref={nameInputRef}
              className={`field-input ${nameActive ? "field-input--focused" : ""}`}
              type="text"
              placeholder="New Meeting"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              onFocus={() => setNameActive(true)}
              onBlur={() => setNameActive(false)}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Project</label>

            {selectedProject ? (
              <div
                className="selected-project-field"
                onClick={() => {
                  setNameActive(false);
                  onProjectFieldClick();
                }}
              >
                <div className="selected-project-avatar" style={{ background: selectedProject.color }}>
                  {selectedProject.initials}
                </div>
                <span className="selected-project-name">{selectedProject.name}</span>
                <button
                  className="project-clear-btn"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onClearProject();
                  }}
                >
                  <span className="material-symbols-rounded" style={{fontSize: "16px"}}>close</span>
                </button>
              </div>
            ) : (
              <div
                className="search-field"
                onClick={() => {
                  setNameActive(false);
                  onProjectFieldClick();
                }}
              >
                <span className="material-symbols-rounded search-icon" style={{fontSize: "18px"}}>search</span>
                <span className="search-placeholder-text">Search for project</span>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="sheet-actions">
          <button className="btn-record" onClick={() => onRecord?.(meetingName)}>
            <span className="material-symbols-rounded" style={{fontSize: "20px"}}>mic</span>
            Record
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
