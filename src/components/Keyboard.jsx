import { useState } from "react";

const ROW1 = ['q','w','e','r','t','y','u','i','o','p'];
const ROW2 = ['a','s','d','f','g','h','j','k','l'];
const ROW3 = ['z','x','c','v','b','n','m'];

const ALL_WORDS = [
  'Meeting', 'Mediation', 'Motion', 'Memo',
  'Deposition', 'Discovery', 'Draft', 'Discussion',
  'Witness', 'Waiver', 'Workshop',
  'Settlement', 'Summary', 'Strategy', 'Session',
  'Prep', 'Pre-Trial', 'Presentation',
  'Conference', 'Contract', 'Consultation', 'Call',
  'Hearing', 'Huddle',
  'Negotiation', 'Notice',
  'Interview', 'Injunction',
  'Review', 'Report',
  'Trial', 'Testimony',
];

function getSuggestions(value) {
  const lastWord = value.split(' ').pop().toLowerCase();
  if (!lastWord) return ['Meeting', 'Conference', 'Settlement'];
  const matches = ALL_WORDS.filter(
    (w) => w.toLowerCase().startsWith(lastWord) && w.toLowerCase() !== lastWord
  );
  if (matches.length >= 3) return matches.slice(0, 3);
  const defaults = ['Meeting', 'Conference', 'Settlement'].filter((w) => !matches.includes(w));
  return [...matches, ...defaults].slice(0, 3);
}

export default function Keyboard({ value, onChange }) {
  const [shifted, setShifted] = useState(true);

  function pressLetter(k) {
    onChange(value + (shifted ? k.toUpperCase() : k));
    if (shifted) setShifted(false);
  }

  function pressBackspace() {
    onChange(value.slice(0, -1));
  }

  function pressSpace() {
    onChange(value + ' ');
    setShifted(false);
  }

  function applySuggestion(word) {
    const parts = value.split(' ');
    parts[parts.length - 1] = word;
    onChange(parts.join(' ') + ' ');
    setShifted(false);
  }

  const sugg = getSuggestions(value);

  // Use onMouseDown + e.preventDefault() so the input never loses focus
  function md(fn) {
    return (e) => { e.preventDefault(); fn(); };
  }

  return (
    <div className="keyboard">
      {/* Suggestions bar */}
      <div className="kb-suggestions">
        {sugg.map((s, i) => (
          <button key={i} className="kb-suggestion" onMouseDown={md(() => applySuggestion(s))}>
            "{s}"
          </button>
        ))}
      </div>

      <div className="kb-rows">
        {/* Row 1 */}
        <div className="kb-row">
          {ROW1.map((k) => (
            <button key={k} className="kb-key kb-key--letter" onMouseDown={md(() => pressLetter(k))}>
              {shifted ? k.toUpperCase() : k}
            </button>
          ))}
        </div>

        {/* Row 2 — inset */}
        <div className="kb-row kb-row--inset">
          {ROW2.map((k) => (
            <button key={k} className="kb-key kb-key--letter" onMouseDown={md(() => pressLetter(k))}>
              {shifted ? k.toUpperCase() : k}
            </button>
          ))}
        </div>

        {/* Row 3 — shift · letters · backspace */}
        <div className="kb-row">
          <button
            className={`kb-key kb-key--action${shifted ? ' kb-key--action-on' : ''}`}
            style={{ flex: 1.5 }}
            onMouseDown={md(() => setShifted((s) => !s))}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
              <path d="M7.5 0L0 8h4.5v7h6V8H15L7.5 0z" />
            </svg>
          </button>

          <div className="kb-spacer" />

          {ROW3.map((k) => (
            <button key={k} className="kb-key kb-key--letter" onMouseDown={md(() => pressLetter(k))}>
              {shifted ? k.toUpperCase() : k}
            </button>
          ))}

          <div className="kb-spacer" />

          <button
            className="kb-key kb-key--action"
            style={{ flex: 1.5 }}
            onMouseDown={md(pressBackspace)}
          >
            <svg width="20" height="15" viewBox="0 0 20 15" fill="currentColor">
              <path d="M8 0L0 7.5 8 15h12V0H8zm2.7 11.1L9.3 12.5 6.5 9.7 3.7 12.5 2.3 11.1l2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8z" />
            </svg>
          </button>
        </div>

        {/* Row 4 — bottom bar */}
        <div className="kb-row">
          <button className="kb-key kb-key--action" style={{ flex: 2 }} onMouseDown={(e) => e.preventDefault()}>
            123
          </button>
          <button className="kb-key kb-key--space" onMouseDown={md(pressSpace)}>
            space
          </button>
          <button className="kb-key kb-key--action" style={{ flex: 2.5 }} onMouseDown={(e) => e.preventDefault()}>
            return
          </button>
        </div>
      </div>
    </div>
  );
}
