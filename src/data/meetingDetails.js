export const meetingDetails = {
  // ── 1 · Witness Interview · Williams v State Bank ─────────────────────────
  1: {
    summary: [
      {
        heading: "Witness background established",
        bullets: [
          "Witness confirmed employment at State Bank from 2019 to 2022, working as a loan officer in the commercial lending division.",
          "Witness has direct knowledge of the Williams account and was involved in processing the disputed transactions.",
          "No prior criminal history or adverse employment actions were disclosed during the interview.",
        ],
      },
      {
        heading: "Account discrepancies identified",
        bullets: [
          "Witness acknowledged reviewing the Williams account in March 2021 and noted irregularities in the posted transaction dates.",
          "Bank's internal records show a three-day delay in posting that does not align with the timestamps on the original wire confirmation.",
          "Witness was unable to explain the discrepancy and indicated the issue may have been flagged internally but never formally resolved.",
        ],
      },
      {
        heading: "Key admissions made",
        bullets: [
          "Witness admitted that standard procedure was not followed when the disputed hold was placed on the Williams account.",
          "Confirmed that supervisor approval was required but was not obtained for holds exceeding $50,000.",
        ],
      },
    ],
    transcript: [
      { speaker: 1, time: "0:04", text: "Good morning. Thank you for coming in. I'd like to start by having you state your name and your role at State Bank for the record." },
      { speaker: 2, time: "0:12", text: "Sure. My name is Daniel Marsh. I was a senior loan officer in the commercial lending department from 2019 through early 2022." },
      { speaker: 1, time: "0:28", text: "Were you personally involved with the Williams account during that time?" },
      { speaker: 2, time: "0:34", text: "Yes, I handled the account for most of 2021. I processed several of the wire transfers in question." },
      { speaker: 1, time: "0:48", text: "Can you walk me through what happened in March of 2021 when the hold was placed on the account?" },
      { speaker: 2, time: "1:02", text: "There was an internal flag that came up. I don't remember the exact reason now, but a hold was placed. I assumed my supervisor had signed off on it." },
      { speaker: 1, time: "1:18", text: "But supervisor approval was actually required for holds over $50,000, correct?" },
      { speaker: 2, time: "1:24", text: "That's correct, yes. That was standard procedure. I may not have followed the proper escalation in that instance." },
    ],
    notes: [
      { id: 1, type: "typed", time: "10:02 AM", text: "Marsh seemed nervous when asked about the hold. His recollection of March 2021 was vague — worth pressing harder at deposition." },
      { id: 2, type: "image", time: "10:44 AM" },
      { id: 3, type: "smartpen", time: "11:15 AM" },
    ],
  },

  // ── 2 · Settlement Negotiation · Macy Johnson vs Thompson Corp ────────────
  2: {
    summary: [
      {
        heading: "Opening positions presented",
        bullets: [
          "Counsel for both parties participated in a settlement negotiation meeting to discuss potential resolution of the matter.",
          "Each side outlined their respective positions regarding liability and damages.",
          "The defense presented a preliminary settlement offer, and the plaintiff responded with a counter-proposal supported by recent case developments.",
        ],
      },
      {
        heading: "Damages discussion",
        bullets: [
          "Plaintiff's counsel presented an updated economic damages analysis totaling $1.2M, including lost wages and medical expenses.",
          "Defense disputed the future earnings projection methodology and proposed an independent economic expert review.",
          "Both parties agreed that non-economic damages would be the primary point of contention at trial.",
        ],
      },
      {
        heading: "Next steps agreed",
        bullets: [
          "Parties agreed to exchange updated damages calculations within 10 days.",
          "A follow-up session was scheduled for the following month pending review of plaintiff's medical records.",
        ],
      },
    ],
    transcript: [
      { speaker: 1, time: "0:05", text: "Thanks for joining today. We're hoping to have a productive discussion and see whether there's a path toward resolution without further litigation." },
      { speaker: 2, time: "0:25", text: "Absolutely. We appreciate the opportunity to talk this through and understand your position more fully." },
      { speaker: 1, time: "0:41", text: "From our perspective, liability is well supported by the existing evidence, particularly the recent documentation produced in discovery. Based on that, we believe settlement at this stage makes sense for both sides." },
      { speaker: 2, time: "0:58", text: "We understand your view, though we continue to dispute liability. That said, we're open to discussing a resolution that avoids the cost and uncertainty of trial." },
      { speaker: 1, time: "1:20", text: "We're glad to hear that. Our client has authorized us to present an opening settlement figure, which we believe reflects the strength of our case and the damages sustained." },
      { speaker: 2, time: "1:38", text: "We'll consider any reasonable number. What figure does your client have in mind?" },
    ],
    notes: [
      { id: 1, type: "typed", time: "9:52 AM", text: "Thompson Corp's attorney mentioned potential insurance coverage limitations. Need to verify policy caps with claims adjuster before next session." },
      { id: 2, type: "image", time: "10:14 AM" },
      { id: 3, type: "smartpen", time: "10:31 AM" },
    ],
  },

  // ── 3 · Discovery Review Meeting · Williams v State Bank ──────────────────
  3: {
    summary: [
      {
        heading: "Documents reviewed",
        bullets: [
          "Team reviewed 847 pages of documents produced by State Bank in response to the second set of discovery requests.",
          "Key exhibits identified include internal compliance reports from Q1 2021 and escalation emails that were previously withheld.",
          "Several documents appear to have been produced in redacted form without a corresponding privilege log entry.",
        ],
      },
      {
        heading: "Gaps and deficiencies noted",
        bullets: [
          "No communications between the risk management department and the commercial lending division were produced for the relevant period.",
          "The bank's loan servicing system audit trail is missing entries for March 14–16, 2021 — precisely the dates at issue.",
          "A motion to compel may be necessary if supplemental production is not received within 30 days.",
        ],
      },
      {
        heading: "Action items assigned",
        bullets: [
          "Paralegal to draft a privilege log challenge letter by end of week.",
          "Associate to prepare interrogatories targeting the missing audit trail entries.",
          "Lead counsel to confer with opposing counsel regarding the supplemental production timeline.",
        ],
      },
    ],
    transcript: [
      { speaker: 1, time: "0:03", text: "Alright, let's work through the production. I want to flag anything that looks improperly redacted before we send the privilege log letter." },
      { speaker: 2, time: "0:15", text: "I've gone through the first 400 pages. The compliance reports are interesting — there's a flagged entry in February 2021 that references the Williams account by name." },
      { speaker: 1, time: "0:29", text: "That's significant. If they flagged it internally two months before the hold was placed, that undercuts their position that this was a routine action." },
      { speaker: 2, time: "0:44", text: "Agreed. I also noticed the audit trail has a three-day gap right in the middle of the dispute period. I don't think that's a coincidence." },
      { speaker: 1, time: "1:01", text: "It's not. We need to make that gap a centerpiece of the motion to compel if they don't supplement. What about emails between risk and lending?" },
      { speaker: 2, time: "1:14", text: "Nothing produced. That's the biggest hole. Those communications almost certainly exist and would be directly relevant." },
    ],
    notes: [
      { id: 1, type: "typed", time: "2:07 PM", text: "Flag the February compliance report entry — opposing counsel may not realize we noticed the Williams account reference. Hold this for deposition questioning." },
      { id: 2, type: "smartpen", time: "2:38 PM" },
    ],
  },

  // ── 4 · Pre-Trial Conference · John Davis v Healthcare Systems ─────────────
  4: {
    summary: [
      {
        heading: "Scheduling and trial logistics confirmed",
        bullets: [
          "The Court confirmed a trial date of April 14, 2026, with a final pretrial conference scheduled for March 31, 2026.",
          "Judge noted that trial is expected to last 5–7 days based on the witness list submitted by both parties.",
          "Jury selection will begin the morning of April 14 with voir dire limited to 90 minutes per side.",
        ],
      },
      {
        heading: "Motions in limine argued",
        bullets: [
          "Plaintiff moved to exclude evidence of prior medical history unrelated to the incident, which the Court took under advisement.",
          "Defense motion to limit expert testimony on causation was denied without prejudice pending supplemental briefing.",
          "All motions in limine must be filed by March 10, 2026, with responses due March 20.",
        ],
      },
      {
        heading: "Exhibit and witness disputes",
        bullets: [
          "Both parties were directed to exchange exhibit lists and deposition designations by February 28, 2026.",
          "Defendant objected to the inclusion of two expert witnesses not previously disclosed during the discovery period.",
          "Court set a briefing schedule with a ruling expected before the final pretrial conference.",
        ],
      },
    ],
    transcript: [
      { speaker: 1, time: "0:06", text: "We're here for the pretrial conference in Davis v. Healthcare Systems. I'll hear from both sides on any outstanding issues before we lock in the trial schedule." },
      { speaker: 2, time: "0:19", text: "Thank you, Your Honor. Plaintiff is prepared for trial on April 14. We do have a pending motion in limine regarding prior medical history." },
      { speaker: 3, time: "0:35", text: "Defense is also ready to proceed. We oppose the exclusion motion and intend to file a response. We also have concerns about two experts disclosed after the discovery cutoff." },
      { speaker: 1, time: "0:52", text: "I'll take the exclusion motion under advisement. On the expert disclosure issue, I want supplemental briefing. Plaintiff, you'll have 10 days to respond to the defense's objection." },
      { speaker: 2, time: "1:08", text: "Understood, Your Honor. We believe the disclosures were timely and consistent with the scheduling order as modified by stipulation." },
      { speaker: 1, time: "1:22", text: "I'll review the stipulation. In the meantime, the trial date stands. Any issues with the exhibit exchange deadline of February 28?" },
    ],
    notes: [
      { id: 1, type: "typed", time: "9:14 AM", text: "Judge seemed skeptical about the late expert disclosures. Pull the stipulation language and confirm our position is defensible before the response brief is due." },
      { id: 2, type: "typed", time: "10:45 AM", text: "Defense flagged Dr. Reyes by name as one of the disputed experts. Research whether her report was served within the extended deadline." },
    ],
  },

  // ── 5 · Conversation with Megan Brinkerhoff · Macy Johnson vs Thompson Corp
  5: {
    summary: [
      {
        heading: "Case status update provided",
        bullets: [
          "Client was briefed on the outcome of the settlement negotiation meeting held on January 13th.",
          "Counsel explained that Thompson Corp's latest offer remains below the acceptable range and that litigation preparation is continuing.",
          "Client expressed frustration with the pace of the process but confirmed willingness to proceed to trial if necessary.",
        ],
      },
      {
        heading: "Client concerns addressed",
        bullets: [
          "Client raised questions about the independent economic expert review proposed by defense counsel during negotiations.",
          "Counsel explained the process, timeline, and potential cost implications of the proposed review.",
          "Client authorized counsel to respond to defense's expert proposal and to proceed with the damages exchange.",
        ],
      },
      {
        heading: "Next steps confirmed",
        bullets: [
          "Client to provide updated pay stubs and employment records by January 20th to support the revised damages calculation.",
          "Follow-up call scheduled for February 3rd to review the updated economic analysis before submission to opposing counsel.",
        ],
      },
    ],
    transcript: [
      { speaker: 1, time: "0:02", text: "Hi Megan, thanks for making time today. I wanted to walk you through what happened in the negotiation and get your direction on next steps." },
      { speaker: 2, time: "0:11", text: "Of course. I've been anxious to hear. How did it go?" },
      { speaker: 1, time: "0:16", text: "It was productive, but they're not where we need them to be yet. Their opening offer was significantly below what we think is fair given the damages. We responded, and they've asked for more time." },
      { speaker: 2, time: "0:34", text: "How much more time are we talking? I feel like this has been going on forever." },
      { speaker: 1, time: "0:40", text: "I understand the frustration. We've asked for a response within two weeks. If they don't move meaningfully, we shift focus entirely to trial prep." },
      { speaker: 2, time: "0:54", text: "Okay. And they want an independent expert to look at my lost wages calculation — what does that actually mean for me?" },
    ],
    notes: [
      { id: 1, type: "typed", time: "11:03 AM", text: "Megan is emotionally invested and getting impatient. Set a clear decision point on the next call. She needs to hear a concrete timeline, not more 'it depends.'" },
    ],
  },

  // ── 6 · Deposition Prep · John Davis v Healthcare Systems ─────────────────
  6: {
    summary: [
      {
        heading: "Deposition overview and ground rules",
        bullets: [
          "Client was briefed on the deposition process, expected duration (4–6 hours), and rules of conduct during questioning.",
          "Counsel reviewed key documents client will likely be questioned about, including intake forms, discharge paperwork, and follow-up appointment records.",
          "Client was advised to answer only what is asked, pause before responding, and request clarification when questions are unclear.",
        ],
      },
      {
        heading: "Anticipated questions rehearsed",
        bullets: [
          "Practiced questions about the timeline of symptoms, when client first noticed the alleged misdiagnosis, and prior medical history.",
          "Reviewed responses to questions about the gap in follow-up care between November and February.",
          "Client was coached on handling compound questions and hypothetical scenarios opposing counsel may introduce.",
        ],
      },
      {
        heading: "Areas of concern identified",
        bullets: [
          "Client's account of the initial consultation differs slightly from the treating physician's notes — this must be reconciled before deposition.",
          "Client tends to over-explain answers under pressure; reinforced the importance of concise, direct responses.",
          "Deposition is scheduled for January 22, 2026, at 9:00 AM at opposing counsel's office.",
        ],
      },
    ],
    transcript: [
      { speaker: 1, time: "0:04", text: "John, we have about an hour and a half today to get you ready for the deposition on the 22nd. The most important thing: simple is better. Answer what's asked, nothing more." },
      { speaker: 2, time: "0:17", text: "Okay. I tend to want to explain myself though. Is that a problem?" },
      { speaker: 1, time: "0:23", text: "It can be. Opposing counsel will use any extra detail you give them. If the answer is yes or no, let it be yes or no. If you need to clarify, we'll have redirect." },
      { speaker: 2, time: "0:36", text: "That makes sense. What about the gap between my November visit and when I went back in February? They're definitely going to ask about that." },
      { speaker: 1, time: "0:47", text: "They will. Your answer is straightforward — you followed the discharge instructions as you understood them and returned when your condition worsened. Don't speculate about what you should have done differently." },
      { speaker: 2, time: "1:02", text: "And what if they ask about the notes from the first visit? I remember things differently than what the doctor wrote down." },
      { speaker: 1, time: "1:10", text: "You can only testify to your own recollection. If what you remember differs from the record, say so clearly — 'That's not how I remember it.' Don't try to reconcile it on the spot." },
    ],
    notes: [
      { id: 1, type: "typed", time: "3:15 PM", text: "John is a good witness but talks too much when nervous. The November–February gap is the weakest part of the timeline. Run through that section again before the 22nd." },
      { id: 2, type: "typed", time: "3:52 PM", text: "Reconcile the discrepancy between John's account of the initial consult and Dr. Patel's notes. Consider requesting a supplemental declaration from Dr. Patel if the gap is material." },
      { id: 3, type: "smartpen", time: "4:10 PM" },
    ],
  },
};
