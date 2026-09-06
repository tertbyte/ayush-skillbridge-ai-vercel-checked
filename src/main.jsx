import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowRight, Award, BarChart3, Bell, BriefcaseBusiness, Building2,
  CheckCircle2, Clock3, FileCheck2, FileText, LayoutDashboard, LocateFixed, LogOut,
  Menu, Search, ShieldCheck, Sparkles, Target, Users, X
} from "lucide-react";
import "./styles.css";

const students = [
  { id: "ASB-001", name: "Ananya Menon", college: "Govt. Ayurveda College, Thrissur", skills: ["Panchakarma", "Clinical Documentation", "Marma"], hours: 420, match: 92, status: "Ready" },
  { id: "ASB-002", name: "Rahul Nair", college: "Amrita School of Ayurveda", skills: ["Dravyaguna", "Quality Control", "Pharmacy"], hours: 380, match: 88, status: "Ready" },
  { id: "ASB-003", name: "Meera Krishnan", college: "Sri Dharmasthala Manjunatheshwara College", skills: ["Panchakarma", "Yoga Therapy"], hours: 315, match: 76, status: "In internship" },
  { id: "ASB-004", name: "Arjun Varma", college: "Rajiv Gandhi University of Health Sciences", skills: ["Herb Standardization", "QC"], hours: 290, match: 69, status: "In internship" }
];

const jobs = [
  { id: 1, title: "Clinical Intern — Panchakarma", org: "AyurWell Hospitals", location: "Kochi, Kerala", type: "Internship", skills: ["Panchakarma", "Clinical Documentation"], score: 92 },
  { id: 2, title: "Quality Control Trainee", org: "HerbalLife Manufacturing", location: "Bengaluru, Karnataka", type: "Trainee", skills: ["Quality Control", "Herb Standardization"], score: 88 },
  { id: 3, title: "Ayurveda Wellness Associate", org: "Svastha Wellness Centre", location: "Goa", type: "Full-time", skills: ["Panchakarma", "Yoga Therapy"], score: 76 }
];

const initialLogs = [
  { id: 101, student: "Ananya Menon", date: "06 Sep 2026", activity: "Panchakarma — Abhyanga & Swedana", hours: 6, location: "AyurWell Hospital, Kochi", status: "Approved", verifier: "Dr. Kavya Nair" },
  { id: 102, student: "Ananya Menon", date: "05 Sep 2026", activity: "Clinical case documentation — Case #A-184", hours: 5, location: "AyurWell Hospital, Kochi", status: "Pending", verifier: "Dr. Kavya Nair" },
  { id: 103, student: "Rahul Nair", date: "06 Sep 2026", activity: "Chyawanprash batch QC — Batch CP-26-091", hours: 7, location: "HerbalLife Plant, Bengaluru", status: "Approved", verifier: "S. Ramesh" }
];

function App() {
  const [role, setRole] = useState("Student");
  const [page, setPage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [logs, setLogs] = useState(initialLogs);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };

  const rolePages = {
    Student: ["Dashboard", "Attendance", "Digital Logbook", "Skill Passport", "AI Matchmaker"],
    Institution: ["Dashboard", "Students", "Attendance", "Logbook Review", "Placement Analytics"],
    Industry: ["Dashboard", "Vacancies", "Candidate Search", "Verifications", "AI Matchmaker"],
    "Ministry Admin": ["Dashboard", "Institutions", "Industry Network", "Skill Demand", "National Analytics"]
  };

  const nav = rolePages[role];

  const approveLog = (id) => {
    setLogs(prev => prev.map(x => x.id === id ? { ...x, status: "Approved" } : x));
    showToast("Logbook entry verified. Skill Passport updated.");
  };

  const addLog = (data) => {
    setLogs(prev => [{
      id: Date.now(), student: "Ananya Menon", date: "06 Sep 2026",
      activity: data.activity, hours: Number(data.hours), location: "AyurWell Hospital, Kochi",
      status: "Pending", verifier: "Dr. Kavya Nair"
    }, ...prev]);
    setModal(null);
    showToast("Logbook submitted for supervisor approval.");
  };

  const content = useMemo(() => {
    if (role === "Student") return <StudentView page={page} checkedIn={checkedIn} setCheckedIn={setCheckedIn} logs={logs} setModal={setModal} showToast={showToast} jobs={jobs} setPage={setPage} />;
    if (role === "Institution") return <InstitutionView page={page} logs={logs} approveLog={approveLog} search={search} setSearch={setSearch} />;
    if (role === "Industry") return <IndustryView page={page} showToast={showToast} search={search} setSearch={setSearch} setModal={setModal} />;
    return <MinistryView page={page} />;
  }, [role, page, checkedIn, logs, search]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <img src="/logo.svg" alt="Ayush SkillBridge" />
          <div><strong>Ayush SkillBridge</strong><span>SIH26044 • Prototype</span></div>
          <button className="icon-btn mobile-close" onClick={() => setMobileOpen(false)}><X size={19}/></button>
        </div>
        <div className="role-card"><div className="eyebrow">DEMO ROLE</div><select value={role} onChange={e => { setRole(e.target.value); setPage("Dashboard"); setMobileOpen(false); }}><option>Student</option><option>Institution</option><option>Industry</option><option>Ministry Admin</option></select></div>
        <nav>{nav.map(item => <button key={item} className={page === item ? "nav-item active" : "nav-item"} onClick={() => { setPage(item); setMobileOpen(false); }}>{iconFor(item)} <span>{item}</span></button>)}</nav>
        <div className="sidebar-bottom"><div className="secure-note"><ShieldCheck size={18}/><div><b>Demo-safe mode</b><span>No patient identifiers stored</span></div></div><button className="nav-item"><LogOut size={18}/><span>Sign out</span></button></div>
      </aside>
      <main className="main"><header className="topbar"><button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={22}/></button><div className="crumb"><span>Portal</span><ArrowRight size={14}/><b>{page}</b></div><div className="top-actions"><div className="demo-pill"><span className="pulse"></span> Live prototype</div><button className="icon-btn"><Bell size={19}/><i></i></button><div className="avatar">AM</div></div></header><div className="content">{content}</div></main>
      {modal === "log" && <LogModal onClose={() => setModal(null)} onSubmit={addLog}/>} 
      {modal === "vacancy" && <VacancyModal onClose={() => setModal(null)} onSubmit={() => { setModal(null); showToast("Vacancy published to the SkillBridge network."); }}/>} 
      {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
    </div>
  );
}

function iconFor(item) {
  const props = { size: 18 };
  if (item.includes("Dashboard")) return <LayoutDashboard {...props}/>;
  if (item.includes("Attendance")) return <LocateFixed {...props}/>;
  if (item.includes("Logbook")) return <FileText {...props}/>;
  if (item.includes("Passport")) return <Award {...props}/>;
  if (item.includes("Matchmaker")) return <Sparkles {...props}/>;
  if (item.includes("Students")) return <Users {...props}/>;
  if (item.includes("Placement") || item.includes("Analytics") || item.includes("Demand")) return <BarChart3 {...props}/>;
  if (item.includes("Vacancies")) return <BriefcaseBusiness {...props}/>;
  if (item.includes("Candidate")) return <Search {...props}/>;
  if (item.includes("Verification")) return <FileCheck2 {...props}/>;
  if (item.includes("Institution") || item.includes("Industry")) return <Building2 {...props}/>;
  return <Activity {...props}/>;
}
function Header({ eyebrow, title, subtitle, action }) { return <div className="page-head"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>; }
function Stat({ label, value, hint, icon: Icon, positive=true }) { return <div className="stat-card"><div className="stat-icon"><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong><small className={positive ? "positive" : ""}>{hint}</small></div></div>; }

function StudentView({ page, checkedIn, setCheckedIn, logs, setModal, showToast, jobs, setPage }) {
  if (page === "Dashboard") return <><Header eyebrow="STUDENT • AYUSH SKILL PASSPORT" title="Good morning, Ananya." subtitle="Your verified internship journey, skills and opportunities in one place." action={<button className="btn primary" onClick={() => setModal("log")}><FileText size={17}/> Add logbook entry</button>}/><div className="stats-grid"><Stat label="Verified hours" value="420 hrs" hint="+28 this week" icon={Clock3}/><Stat label="Skill score" value="86 / 100" hint="+6 this month" icon={Award}/><Stat label="Attendance" value="94%" hint="Excellent" icon={LocateFixed}/><Stat label="Matches" value="12" hint="3 strong matches" icon={Target}/></div><div className="grid-2"><section className="card hero-card"><div className="card-head"><div><span className="eyebrow">TODAY'S INTERNSHIP</span><h2>AyurWell Hospital</h2><p>Kochi, Kerala • Panchakarma Unit</p></div><span className="status green">Active</span></div><div className="checkin-box"><div className="map-ring"><LocateFixed size={28}/></div><div><b>{checkedIn ? "Attendance verified" : "Check in at internship site"}</b><span>{checkedIn ? "GPS + device validation passed • 09:14 AM" : "Within 150m of approved internship geofence"}</span></div><button className={checkedIn ? "btn success" : "btn primary"} onClick={() => { setCheckedIn(true); showToast("Attendance verified using GPS + device binding."); }}>{checkedIn ? <><CheckCircle2 size={16}/> Checked in</> : <><LocateFixed size={16}/> Verify & check in</>}</button></div><div className="mini-grid"><div><span>Supervisor</span><b>Dr. Kavya Nair</b></div><div><span>Internship</span><b>01 Aug — 31 Oct 2026</b></div><div><span>Verified days</span><b>42 / 66</b></div></div></section><section className="card"><div className="card-head"><div><span className="eyebrow">SKILL PROGRESS</span><h2>Competency snapshot</h2></div><button className="text-btn" onClick={() => setPage("Skill Passport")}>View passport <ArrowRight size={15}/></button></div><SkillBar name="Panchakarma" value={92}/><SkillBar name="Clinical Documentation" value={84}/><SkillBar name="Marma Therapy" value={76}/><SkillBar name="Patient Communication" value={71}/></section></div><section className="card"><div className="card-head"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Verified internship log</h2></div><button className="text-btn" onClick={() => setModal("log")}>Add entry <ArrowRight size={15}/></button></div><LogTable logs={logs.slice(0,4)}/></section></>;
  if (page === "Attendance") return <><Header eyebrow="SMART INTERNSHIP TRACKER" title="Geo-verified attendance" subtitle="Preventing proxy attendance with location, device and supervisor validation."/><div className="attendance-layout"><section className="card checkin-large"><div className="location-visual"><div className="geo-dot"><LocateFixed size={36}/></div></div><div className="verified-label">{checkedIn ? "VERIFIED" : "READY TO VERIFY"}</div><h2>{checkedIn ? "You are checked in" : "AyurWell Hospital — Panchakarma Unit"}</h2><p>Approved geofence radius: <b>150 metres</b></p><button className={checkedIn ? "btn success wide" : "btn primary wide"} onClick={() => {setCheckedIn(true); showToast("Location, timestamp and device verified.");}}>{checkedIn ? "Attendance recorded" : "Verify current location"}</button></section><section className="card"><span className="eyebrow">VALIDATION LAYERS</span><h2>Trust signals</h2><div className="trust-list"><Trust icon={LocateFixed} title="GPS geofence" text="Location is inside approved internship site" ok={checkedIn}/><Trust icon={ShieldCheck} title="Device binding" text="Registered student device detected" ok={checkedIn}/><Trust icon={Clock3} title="Timestamp" text="Server-side attendance time captured" ok={checkedIn}/><Trust icon={Users} title="Supervisor verification" text="Exception review available to mentor" ok={false}/></div></section></div></>;
  if (page === "Digital Logbook") return <><Header eyebrow="DIGITAL CLINICAL / INDUSTRIAL LOGBOOK" title="Evidence-backed practical work" subtitle="Record activities, hours and supervisor verification without storing unnecessary patient identifiers." action={<button className="btn primary" onClick={() => setModal("log")}><FileText size={17}/> New entry</button>}/><section className="card"><LogTable logs={logs} studentMode/></section></>;
  if (page === "Skill Passport") return <><Header eyebrow="VERIFIED SKILL PASSPORT" title="Ananya Menon's competency profile" subtitle="A portable record built from verified hours, approved activities and assessments."/><div className="passport-head card"><div className="avatar xl">AM</div><div><h2>Ananya Menon</h2><p>BAMS • Govt. Ayurveda College, Thrissur</p><div className="tag-row"><span className="tag">Panchakarma</span><span className="tag">Clinical Practice</span><span className="tag">Marma</span></div></div><div className="passport-score"><span>Skill score</span><b>86</b><small>/100</small></div></div><div className="grid-2"><section className="card"><div className="card-head"><h2>Verified competencies</h2><span className="status green">6 verified</span></div><SkillBar name="Panchakarma" value={92}/><SkillBar name="Clinical Documentation" value={84}/><SkillBar name="Marma Therapy" value={76}/><SkillBar name="Patient Communication" value={71}/></section><section className="card"><div className="card-head"><h2>Evidence timeline</h2></div><div className="timeline"><span className="timeline-dot"></span><div><b>Supervisor approved Panchakarma activity</b><span>06 Sep 2026 • 6 verified hours</span></div></div><div className="timeline"><span className="timeline-dot"></span><div><b>Clinical documentation completed</b><span>05 Sep 2026 • 5 hours pending approval</span></div></div></section></div></>;
  if (page === "AI Matchmaker") return <><Header eyebrow="PLACEMENT ENGINE" title="Opportunities matched to your verified skills" subtitle="Job-relevant evidence is compared with industry requirements. AI recommends; employers decide."/><div className="ai-banner"><div className="ai-icon"><Sparkles size={20}/></div><div><b>Explainable matching</b><span>Verified skills, hours, specialization, internship exposure and assessments drive the score.</span></div></div><div className="job-grid">{jobs.map(job => <JobCard key={job.id} job={job}/>)}</div></>;
  return <div className="card"><h2>Page ready</h2><p>This module is available in the prototype navigation.</p></div>;
}

function InstitutionView({ page, logs, approveLog, search, setSearch }) { const filtered = students.filter(s => (s.name+s.college+s.skills.join(" ")).toLowerCase().includes(search.toLowerCase())); if (page === "Dashboard") return <><Header eyebrow="INSTITUTION COMMAND CENTER" title="Monitor internship quality" subtitle="Track students, approvals, skill development and placement outcomes."/><div className="stats-grid"><Stat label="Active students" value="128" hint="8 new this week" icon={Users}/><Stat label="Pending approvals" value="14" hint="6 due today" icon={FileCheck2}/><Stat label="Completion rate" value="91%" hint="+4% vs last month" icon={CheckCircle2}/><Stat label="Placed" value="74" hint="58% placement rate" icon={Target}/></div><div className="grid-2"><section className="card"><div className="card-head"><div><span className="eyebrow">REVIEW QUEUE</span><h2>Recent logbook submissions</h2></div></div><LogTable logs={logs} onApprove={approveLog}/></section><section className="card"><div className="card-head"><div><span className="eyebrow">SKILL GAPS</span><h2>Industry demand vs curriculum</h2></div></div><div className="gap"><div className="gap-icon">QC</div><div><b>Quality Control</b><span>26 students need more exposure</span></div></div><div className="gap"><div className="gap-icon">PS</div><div><b>Panchakarma</b><span>Strong supply across 4 colleges</span></div></div></section></div></>; if (page === "Students") return <><Header eyebrow="STUDENT REGISTRY" title="Students & competencies" subtitle="Search the verified student network."/><div className="toolbar"><div className="search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student, college or skill..."/></div></div><section className="card"><div className="table"><div className="tr th"><span>Student</span><span>College</span><span>Skills</span><span>Hours</span></div>{filtered.map(s=><div className="tr" key={s.id}><div><b>{s.name}</b><small>{s.id}</small></div><div><b>{s.college}</b><small>{s.status}</small></div><div>{s.skills.map(x=><span className="tag" key={x}>{x}</span>)}</div><div><b className="score">{s.hours}h</b></div></div>)}</div></section></>; if (page === "Logbook Review") return <><Header eyebrow="SUPERVISOR REVIEW" title="Approve evidence-backed activity" subtitle="Only approved activities contribute to verified competency."/><section className="card"><LogTable logs={logs} onApprove={approveLog}/></section></>; return <div className="card"><Header eyebrow={page.toUpperCase()} title={page} subtitle="Institution analytics module."/><div className="outcome"><span>Current view</span><b>Operational insight</b><small>Prototype analytics are based on demonstration data.</small></div></div>; }

function IndustryView({ page, search, setSearch, setModal }) { if(page === "Dashboard") return <><Header eyebrow="INDUSTRY WORKSPACE" title="Hire from verified AYUSH talent" subtitle="Find candidates with evidence-backed skills and internship experience." action={<button className="btn primary" onClick={() => setModal("vacancy")}><BriefcaseBusiness size={16}/> Post vacancy</button>}/><div className="stats-grid"><Stat label="Open roles" value="18" hint="5 internships" icon={BriefcaseBusiness}/><Stat label="Shortlisted" value="42" hint="12 new today" icon={Users}/><Stat label="Verified candidates" value="1,284" hint="Across pilot network" icon={ShieldCheck}/><Stat label="Avg. match" value="84%" hint="Job-relevant evidence" icon={Target}/></div><div className="job-grid">{jobs.map(j=><JobCard key={j.id} job={j}/>)}</div></>; if(page === "Vacancies") return <><Header eyebrow="VACANCIES" title="Your open opportunities" subtitle="Manage internship and placement openings." action={<button className="btn primary" onClick={() => setModal("vacancy")}><BriefcaseBusiness size={16}/> New vacancy</button>}/><div className="job-grid">{jobs.map(j=><JobCard key={j.id} job={j}/>)}</div></>; if(page === "Candidate Search") return <><Header eyebrow="CANDIDATE SEARCH" title="Verified talent search" subtitle="Filter candidates by verified skills and experience."/><div className="toolbar"><div className="search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search candidate or skill..."/></div></div><section className="card"><div className="table"><div className="tr th"><span>Candidate</span><span>Verified skills</span><span>Hours</span><span>Match</span></div>{students.filter(s=>(s.name+s.skills.join(" ")).toLowerCase().includes(search.toLowerCase())).map(s=><div className="tr" key={s.id}><div><b>{s.name}</b><small>{s.college}</small></div><div>{s.skills.map(x=><span className="tag" key={x}>{x}</span>)}</div><div><b>{s.hours}</b><small>verified</small></div><div><b className="score">{s.match}%</b></div></div>)}</div></section></>; return <div className="card"><Header eyebrow={page.toUpperCase()} title={page} subtitle="Industry workflow module."/><div className="outcome"><span>Current view</span><b>Operational insight</b><small>Prototype data shown for demonstration.</small></div></div>; }

function MinistryView({ page }) { return <><Header eyebrow="MINISTRY OF AYUSH • OVERSIGHT" title="SkillBridge network intelligence" subtitle="Pilot-level view of institutions, industry participation, skill demand and outcomes."/><div className="stats-grid"><Stat label="Institutions" value="36" hint="12 states represented" icon={Building2}/><Stat label="Students" value="8,420" hint="2,180 active internships" icon={Users}/><Stat label="Industry partners" value="214" hint="38 new this month" icon={BriefcaseBusiness}/><Stat label="Placement rate" value="67%" hint="+9% year on year" icon={BarChart3}/></div><div className="grid-3"><section className="card chart-card"><span className="eyebrow">TOP SKILL DEMAND</span><h2>Industry requirements</h2><div className="outcome"><span>Panchakarma</span><b>31%</b><small>of active openings</small></div><div className="outcome"><span>Quality Control</span><b>24%</b><small>of active openings</small></div></section><section className="card chart-card"><span className="eyebrow">INTERNSHIP QUALITY</span><h2>Verification health</h2><div className="big-number">94<span>%</span></div><p>Attendance and logbook records passing validation checks.</p></section><section className="card chart-card"><span className="eyebrow">SKILL GAPS</span><h2>Curriculum signals</h2><div className="gap"><div className="gap-icon">QC</div><div><b>Quality Control</b><span>High unmet demand</span></div></div><div className="gap"><div className="gap-icon">HS</div><div><b>Herb Standardization</b><span>Moderate unmet demand</span></div></div></section></div><section className="card"><div className="card-head"><div><span className="eyebrow">NATIONAL ANALYTICS</span><h2>{page}</h2></div></div><p>Prototype analytics use demonstration data and are not connected to live government systems.</p></section></>; }

function SkillBar({name,value}) { return <div className="skill-row"><div><span>{name}</span><b>{value}%</b></div><div className="progress"><i style={{width:`${value}%`}}></i></div></div>; }
function LogTable({logs,onApprove,studentMode=false}) { return <div className="table"><div className="tr th"><span>Student / date</span><span>Activity</span><span>Hours</span><span>Verification</span></div>{logs.map(l=><div className="tr" key={l.id}><div><b>{l.student}</b><small>{l.date} • {l.location}</small></div><div><b>{l.activity}</b><small>{l.verifier}</small></div><div><b>{l.hours} hrs</b></div><div>{l.status === "Approved" ? <span className="verified-text"><CheckCircle2 size={14}/> Approved</span> : studentMode ? <span className="status amber">Pending</span> : <button className="mini-btn" onClick={() => onApprove?.(l.id)}><CheckCircle2 size={13}/> Approve</button>}</div></div>)}</div>; }
function Trust({icon:Icon,title,text,ok}) { return <div className="trust"><div className={`trust-icon ${ok ? "ok" : ""}`}><Icon size={16}/></div><div><b>{title}</b><span>{text}</span></div><span className={ok ? "status green" : "status gray"}>{ok ? "Passed" : "Review"}</span></div>; }
function JobCard({job}) { return <article className="job-card"><div className="job-top"><div className="company-logo">ASB</div><div className="match-score">{job.score}%<small>match</small></div></div><h2>{job.title}</h2><p>{job.org} • {job.location}</p><div className="tag-row">{job.skills.map(s=><span className="tag" key={s}>{s}</span>)}</div><div className="match-reasons"><b>Why this match?</b><span>✓ Verified relevant skills</span><span>✓ Internship exposure aligned</span><span>✓ Evidence-backed profile</span></div><button className="btn secondary wide">View opportunity <ArrowRight size={14}/></button></article>; }
function LogModal({onClose,onSubmit}) { const [activity,setActivity]=useState(""); const [hours,setHours]=useState("6"); return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">NEW LOGBOOK ENTRY</span><h2>Record practical activity</h2></div><button className="icon-btn" onClick={onClose}><X size={17}/></button></div><label>Activity<input value={activity} onChange={e=>setActivity(e.target.value)} placeholder="e.g. Panchakarma observation"/></label><label>Hours<input type="number" min="1" max="12" value={hours} onChange={e=>setHours(e.target.value)}/></label><div className="privacy-box"><ShieldCheck size={16}/><span>Use anonymized case references only. Do not enter patient names or contact information.</span></div><div className="modal-actions"><button className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!activity.trim()} onClick={() => onSubmit({activity,hours})}>Submit for approval</button></div></div></div>; }
function VacancyModal({onClose,onSubmit}) { const [title,setTitle]=useState(""); const [skills,setSkills]=useState(""); return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">NEW VACANCY</span><h2>Publish an opportunity</h2></div><button className="icon-btn" onClick={onClose}><X size={17}/></button></div><label>Role title<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Panchakarma Clinical Intern"/></label><label>Required skills<input value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Panchakarma, Clinical Documentation"/></label><label>Location<input placeholder="City, State"/></label><div className="modal-actions"><button className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!title.trim()} onClick={onSubmit}>Publish vacancy</button></div></div></div>; }

createRoot(document.getElementById("root")).render(<App />);
