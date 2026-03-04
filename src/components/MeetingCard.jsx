export default function MeetingCard({ meeting, onClick }) {
  return (
    <div className="meeting-card" onClick={onClick} style={onClick ? { cursor: "pointer" } : {}}>
      <div className="meeting-card-header">
        <h2 className="meeting-title">{meeting.title}</h2>
      </div>
      <p className="meeting-case">{meeting.case}</p>
      <div className="meeting-meta">
        {meeting.hasActivity && <span className="activity-dot" />}
        <span className={meeting.hasActivity ? "meeting-date active" : "meeting-date"}>
          {meeting.date}
        </span>
        <span className="meta-separator">|</span>
        <span className="meeting-duration">{meeting.duration}</span>
        {meeting.suggestedActions > 0 && (
          <span className="suggested-actions-text">
            {meeting.suggestedActions} suggested actions
          </span>
        )}
      </div>
    </div>
  );
}
