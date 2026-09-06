import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowRight, Award, BarChart3, Bell, BriefcaseBusiness, Building2,
  CheckCircle2, ChevronDown, Clock3, FileCheck2, FileText, GraduationCap,
  LayoutDashboard, LocateFixed, LogOut, MapPin, Menu, MessageSquare,
  Search, ShieldCheck, Sparkles, Target, Users, X, Zap
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
    if (role === "Student") return <StudentView page={page} checkedIn={checkedIn} setCheckedIn={setCheckedIn} logs={logs} setModal={setModal} showToast={showToast} jobs={jobs} />;
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
        <div className="role-card">
          <div className="eyebrow">DEMO ROLE</div>
          <select value={role} onChange={e => { setRole(e.target.value); setPage("Dashboard"); setMobileOpen(false); }}>
            <option>Student</option><option>Institution</option><option>Industry</option><option>Ministry Admin</option>
          </select>
        </div>
        <nav>
          {nav.map(item => <button key={item} className={page === item ? "nav-item active" : "nav-item"} onClick={() => { setPage(item); setMobileOpen(false); }}>
            {iconFor(item)} <span>{item}</span>
          </button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="secure-note"><ShieldCheck size={18}/><div><b>Demo-safe mode</b><span>No patient identifiers stored</span></div></div>
          <button className="nav-item"><LogOut size={18}/><span>Sign out</span></button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={22}/></button>
          <div className="crumb"><span>Portal</span><ArrowRight size={14}/><b>{page}</b></div>
          <div className="top-actions">
            <div className="demo-pill"><span className="pulse"></span> Live prototype</div>
            <button className="icon-btn"><Bell size={19}/><i></i></button>
            <div className="avatar">AM</div>
          </div>
        </header>
        <div className="content">{content}</div>
      </main>

      {modal === "log" && <LogModal onClose={() => setModal(null)} onSubmit={addLog}/>}
      {modal === "vacancy" && <VacancyModal onClose={() => setModal(null)} onSubmit={() => { setModal(null); showToast("Vacancy published to the SkillBridge network."); }}/>}
      <AIAssistant role={role} page={page}/>
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

function Header({ eyebrow, title, subtitle, action }) {
  return <div className="page-head"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function Stat({ label, value, hint, icon: Icon, positive=true }) {
  return <div className="stat-card"><div className="stat-icon"><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong><small className={positive ? "positive" : ""}>{hint}</small></div></div>;
}

function StudentView({ page, checkedIn, setCheckedIn, logs, setModal, showToast, jobs }) {
  if (page === "Dashboard") return <><Header eyebrow="STUDENT • AYUSH SKILL PASSPORT" title="Good morning, Ananya." subtitle="Your verified internship journey, skills and opportunities in one place." action={<button className="btn primary" onClick={() => setModal("log")}><FileText size={17}/> Add logbook entry</button>}/>
    <div className="stats-grid"><Stat label="Verified hours" value="420 hrs" hint="+28 this week" icon={Clock3}/><Stat label="Skill score" value="86 / 100" hint="+6 this month" icon={Award}/><Stat label="Attendance" value="94%" hint="Excellent" icon={LocateFixed}/><Stat label="AI matches" value="12" hint="3 strong matches" icon={Target}/></div>
    <div className="grid-2">
      <section className="card hero-card"><div className="card-head"><div><span className="eyebrow">TODAY'S INTERNSHIP</span><h2>AyurWell Hospital</h2><p>Kochi, Kerala • Panchakarma Unit</p></div><span className="status green">Active</span></div>
        <div className="checkin-box"><div className="map-ring"><LocateFixed size={28}/></div><div><b>{checkedIn ? "Attendance verified" : "Check in at internship site"}</b><span>{checkedIn ? "GPS + device validation passed • 09:14 AM" : "Within 150m of approved internship geofence"}</span></div><button className={checkedIn ? "btn success" : "btn primary"} onClick={() => { setCheckedIn(true); showToast("Attendance verified using GPS + device binding."); }}>{checkedIn ? <><CheckCircle2 size={16}/> Checked in</> : <><LocateFixed size={16}/> Verify & check in</>}</button></div>
        <div className="mini-grid"><div><span>Supervisor</span><b>Dr. Kavya Nair</b></div><div><span>Internship</span><b>01 Aug — 31 Oct 2026</b></div><div><span>Verified days</span><b>42 / 66</b></div></div>
      </section>
      <section className="card"><div className="card-head"><div><span className="eyebrow">SKILL PROGRESS</span><h2>Competency snapshot</h2></div><button className="text-btn">View passport <ArrowRight size={15}/></button></div>
        <SkillBar name="Panchakarma" value={92}/><SkillBar name="Clinical Documentation" value={84}/><SkillBar name="Marma Therapy" value={76}/><SkillBar name="Patient Communication" value={71}/>
      </section>
    </div>
    <section className="card"><div className="card-head"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Verified internship log</h2></div><button className="text-btn" onClick={() => setModal("log")}>Add entry <ArrowRight size={15}/></button></div><LogTable logs={logs.slice(0,4)}/></section>
  </>;

  if (page === "Attendance") return <><Header eyebrow="SMART INTERNSHIP TRACKER" title="Geo-verified attendance" subtitle="Preventing proxy attendance with location, device and supervisor validation."/><div className="attendance-layout">
    <section className="card checkin-large"><div className="location-visual"><div className="geo-dot"><LocateFixed size={36}/></div><div className="geo-wave one"></div><div className="geo-wave two"></div></div><div className="verified-label">{checkedIn ? "VERIFIED" : "READY TO VERIFY"}</div><h2>{checkedIn ? "You are checked in" : "AyurWell Hospital — Panchakarma Unit"}</h2><p>Approved geofence radius: <b>150 metres</b></p><button className={checkedIn ? "btn success wide" : "btn primary wide"} onClick={() => {setCheckedIn(true); showToast("Location, timestamp and device verified.");}}>{checkedIn ? "Attendance recorded" : "Verify current location"}</button></section>
    <section className="card"><span className="eyebrow">VALIDATION LAYERS</span><h2>Trust signals</h2><div className="trust-list"><Trust icon={LocateFixed} title="GPS geofence" text="Location is inside approved internship site" ok={checkedIn}/><Trust icon={ShieldCheck} title="Device binding" text="Registered student device detected" ok={checkedIn}/><Trust icon={Clock3} title="Timestamp" text="Server-side attendance time captured" ok={checkedIn}/><Trust icon={Users} title="Supervisor verification" text="Exception review available to mentor" ok={false}/></div></section>
  </div></>;

  if (page === "Digital Logbook") return <><Header eyebrow="DIGITAL CLINICAL / INDUSTRIAL LOGBOOK" title="Evidence-backed practical work" subtitle="Record real activities, hours and supervisor verification without storing unnecessary patient identifiers." action={<button className="btn primary" onClick={() => setModal("log")}><FileText size={17}/> New entry</button>}/><section className="card"><LogTable logs={logs} onApprove={() => {}} studentMode/></section></>;

  if (page === "Skill Passport") return <><Header eyebrow="VERIFIED SKILL PASSPORT" title="Ananya Menon's competency profile" subtitle="A portable record built from verified hours, approved activities and assessments."/><div className="passport-head card"><div className="avatar xl">AM</div><div><h2>Ananya Menon</h2><p>BAMS • Govt. Ayurveda College, Thrissur</p><div className="tag-row"><span className="tag">Panchakarma</span><span className="tag">Clinical Practice</span><span className="tag">Marma</span></div></div><div className="passport-score"><span>Skill score</span><b>86</b><small>/100</small></div></div><div className="grid-2"><section className="card"><div className="card-head"><h2>Verified competencies</h2><span className="status green">6 verified</span></div><SkillBar name="Panchakarma" value={92}/><SkillBar name="Clinical Documentation" value={84}/><SkillBar name="Marma Therapy" value={76}/><SkillBar name="Patient Communication" value={71}/><SkillBar name="Ayurvedic Pharmacology" value={68}/></section><section className="card"><div className="card-head"><h2>Credential timeline</h2></div><Timeline title="Internship started" text="AyurWell Hospital • 01 Aug 2026"/><Timeline title="420 hours verified" text="Supervisor-approved practical exposure"/><Timeline title="Panchakarma competency" text="Assessment completed • 92/100"/></section></div></>;

  return <Matchmaker jobs={jobs} showToast={showToast}/>;
}

function InstitutionView({ page, logs, approveLog, search, setSearch }) {
  if (page === "Dashboard") return <><Header eyebrow="INSTITUTION COMMAND CENTER" title="Institution overview" subtitle="Monitor internship quality, attendance and graduate readiness across your students."/><div className="stats-grid"><Stat label="Active interns" value="128" hint="+14 this month" icon={Users}/><Stat label="Verified hours" value="18,460" hint="+8.2% vs last month" icon={Clock3}/><Stat label="Pending approvals" value="17" hint="Needs review" icon={FileCheck2} positive={false}/><Stat label="Placement rate" value="78%" hint="+11% this year" icon={BriefcaseBusiness}/></div><div className="grid-2"><section className="card"><div className="card-head"><h2>Internship health</h2><span className="status green">On track</span></div><div className="big-number">91<span>%</span></div><p>Students with verified attendance and current logbook activity.</p><div className="progress"><i style={{width:"91%"}}/></div></section><section className="card"><div className="card-head"><h2>Skill gaps</h2><button className="text-btn">View analysis <ArrowRight size={15}/></button></div><Gap name="Clinical Documentation" value="High demand / medium supply"/><Gap name="Herb Standardization" value="High demand / low supply"/><Gap name="Panchakarma" value="High demand / high supply"/></section></div></>;
  if (page === "Students") return <><Header eyebrow="STUDENT REGISTRY" title="Students & internship status" subtitle="Track verified activity and readiness at a glance."/><section className="card"><div className="toolbar"><div className="search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search students..." /></div><button className="btn secondary">Export</button></div><StudentTable search={search}/></section></>;
  if (page === "Attendance") return <><Header eyebrow="ATTENDANCE MONITOR" title="Live internship attendance" subtitle="Exception-based review for location and device validation signals."/><section className="card"><div className="attendance-row"><div className="status-dot live"></div><div><b>42 students checked in today</b><span>4 exceptions flagged for review</span></div><span className="status amber">4 exceptions</span></div><div className="table"><div className="tr th"><span>Student</span><span>Site</span><span>Time</span><span>Verification</span></div>{students.map(s=><div className="tr" key={s.id}><span><b>{s.name}</b><small>{s.id}</small></span><span>AyurWell Hospital</span><span>09:{Math.floor(Math.random()*40+10)} AM</span><span className="status green">GPS + Device</span></div>)}</div></section></>;
  if (page === "Logbook Review") return <><Header eyebrow="SUPERVISOR WORK QUEUE" title="Logbook approvals" subtitle="Approve verified practical work and keep the Skill Passport trustworthy."/><section className="card"><LogTable logs={logs} onApprove={approveLog} reviewMode/></section></>;
  return <><Header eyebrow="PLACEMENT ANALYTICS" title="Industry demand vs student supply" subtitle="Turn verified internship activity into curriculum and placement intelligence."/><div className="grid-2"><section className="card chart-card"><h2>Top requested skills</h2><Bar label="Panchakarma" value={82}/><Bar label="Quality Control" value={68}/><Bar label="Herb Standardization" value={61}/><Bar label="Clinical Documentation" value={55}/><Bar label="Yoga Therapy" value={42}/></section><section className="card"><h2>Placement funnel</h2><Funnel n="Eligible students" v="128"/><Funnel n="AI matched" v="96"/><Funnel n="Shortlisted" v="63"/><Funnel n="Offers" v="38"/></section></div></>;
}

function IndustryView({ page, showToast, search, setSearch, setModal }) {
  if (page === "Dashboard") return <><Header eyebrow="INDUSTRY PARTNER" title="Recruitment workspace" subtitle="Find pre-vetted AYUSH talent using verified skills and internship evidence." action={<button className="btn primary" onClick={() => setModal("vacancy")}>Post vacancy</button>}/><div className="stats-grid"><Stat label="Active vacancies" value="8" hint="+2 this week" icon={BriefcaseBusiness}/><Stat label="Matched candidates" value="146" hint="Across 8 roles" icon={Target}/><Stat label="Pending verifications" value="11" hint="Review required" icon={FileCheck2} positive={false}/><Stat label="Time to shortlist" value="1.8 days" hint="↓ 32% vs manual" icon={Zap}/></div><section className="card"><div className="card-head"><div><span className="eyebrow">AI-MATCHED TALENT</span><h2>Top candidates for your open roles</h2></div><span className="status blue">Explainable scoring</span></div><CandidateTable/></section></>;
  if (page === "Vacancies") return <><Header eyebrow="OPPORTUNITY MANAGEMENT" title="Your vacancies" subtitle="Publish skill-based internships and jobs to the AYUSH network." action={<button className="btn primary" onClick={() => setModal("vacancy")}>+ New vacancy</button>}/><section className="card"><div className="table"><div className="tr th"><span>Role</span><span>Location</span><span>Applications</span><span>Status</span></div>{jobs.map(j=><div className="tr" key={j.id}><span><b>{j.title}</b><small>{j.type}</small></span><span>{j.location}</span><span>{j.id===1?42:j.id===2?31:18}</span><span className="status green">Active</span></div>)}</div></section></>;
  if (page === "Candidate Search") return <><Header eyebrow="CANDIDATE SEARCH" title="Search verified talent" subtitle="Filter by skills, verified hours, competency and internship exposure."/><section className="card"><div className="toolbar"><div className="search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Try “Panchakarma”, “QC”, or a candidate name..." /></div></div><CandidateTable filter={search}/></section></>;
  if (page === "Verifications") return <><Header eyebrow="ACTIVITY VERIFICATION" title="Sign off practical exposure" subtitle="Industry supervisors can verify student work completed at your facility."/><section className="card"><LogTable logs={initialLogs} reviewMode onApprove={(id)=>showToast("Industry verification recorded.")}/></section></>;
  return <Matchmaker jobs={jobs} showToast={showToast} industry/>;
}

function MinistryView({ page }) {
  if (page === "Dashboard") return <><Header eyebrow="MINISTRY OF AYUSH • NATIONAL VIEW" title="AYUSH skills intelligence" subtitle="A prototype command center for internship quality, skills demand and employment outcomes."/><div className="stats-grid"><Stat label="Institutions" value="286" hint="+18 onboarded" icon={Building2}/><Stat label="Active students" value="24,680" hint="Across pilot network" icon={Users}/><Stat label="Industry partners" value="1,140" hint="+94 this quarter" icon={BriefcaseBusiness}/><Stat label="Placement rate" value="81.4%" hint="+9.6% YoY" icon={BarChart3}/></div><div className="grid-2"><section className="card"><div className="card-head"><h2>National skill demand</h2><span className="status green">Updated today</span></div><Bar label="Panchakarma" value={88}/><Bar label="Quality Control" value={74}/><Bar label="Herb Standardization" value={67}/><Bar label="Clinical Documentation" value={62}/></section><section className="card"><div className="card-head"><h2>Program outcomes</h2></div><Outcome label="Verified internship hours" value="3.2M" change="+18%"/><Outcome label="Approved practical logs" value="92.7%" change="+6.2%"/><Outcome label="Industry placements" value="11,420" change="+14%"/></section></div></>;
  if (page === "Institutions") return <><Header eyebrow="NATIONAL NETWORK" title="Participating institutions" subtitle="Monitor coverage and internship quality across the pilot network."/><section className="card"><StudentTable search="" institutions/></section></>;
  if (page === "Industry Network") return <><Header eyebrow="INDUSTRY ECOSYSTEM" title="AYUSH employer network" subtitle="Hospitals, wellness centres and manufacturing units contributing to the skill pipeline."/><div className="grid-3"><Stat label="Hospitals" value="540" hint="47% of network" icon={Building2}/><Stat label="Wellness centres" value="382" hint="34% of network" icon={Activity}/><Stat label="Manufacturing units" value="218" hint="19% of network" icon={BriefcaseBusiness}/></div></>;
  if (page === "Skill Demand") return <><Header eyebrow="CURRICULUM INTELLIGENCE" title="Skill demand map" subtitle="Use employer demand to identify curriculum and training priorities."/><section className="card chart-card"><h2>Demand index by AYUSH skill</h2><Bar label="Panchakarma" value={88}/><Bar label="Quality Control" value={74}/><Bar label="Herb Standardization" value={67}/><Bar label="Clinical Documentation" value={62}/><Bar label="Yoga Therapy" value={51}/><Bar label="Regulatory Affairs" value={44}/></section></>;
  return <><Header eyebrow="NATIONAL ANALYTICS" title="From verified activity to policy insight" subtitle="Prototype analytics showing how the platform can support evidence-based skill planning."/><div className="grid-2"><section className="card"><h2>Pipeline conversion</h2><Funnel n="Enrolled students" v="24,680"/><Funnel n="Active internships" v="18,920"/><Funnel n="Verified completions" v="15,740"/><Funnel n="Placed / recruited" v="11,420"/></section><section className="card"><h2>Trust & quality</h2><Outcome label="Attendance verification" value="97.2%" change="High confidence"/><Outcome label="Supervisor approval rate" value="92.7%" change="Healthy"/><Outcome label="AI match acceptance" value="84.1%" change="Human-reviewed"/></section></div></>;
}

function Matchmaker({ jobs, showToast, industry }) {
  return <><Header eyebrow="AI-MATCHMAKER PLACEMENT ENGINE" title={industry ? "Match talent to your roles" : "Opportunities matched to you"} subtitle="Hybrid skill scoring combines verified hours, competencies, specializations and job requirements. AI recommends — humans decide."/><div className="ai-banner"><div className="ai-icon"><Sparkles size={23}/></div><div><b>Explainable matching is enabled</b><span>Scores are based on job-relevant verified evidence — never sensitive personal attributes.</span></div><span className="status purple">Hybrid AI + rules</span></div><div className="job-grid">{jobs.map(j=><div className="job-card" key={j.id}><div className="job-top"><span className="company-logo">{j.org.slice(0,2).toUpperCase()}</span><span className="match-score">{j.score}%<small>match</small></span></div><h2>{j.title}</h2><p>{j.org} • {j.location}</p><div className="tag-row">{j.skills.map(s=><span className="tag" key={s}>{s}</span>)}</div><div className="match-reasons"><b>Why this matches</b><span>✓ Verified skill evidence</span><span>✓ Internship hours align</span><span>✓ Relevant specialization</span></div><button className="btn secondary wide" onClick={() => showToast("Application added to your shortlist.")}>{industry ? "Review candidates" : "View opportunity"}</button></div>)}</div></>;
}

function SkillBar({name,value}) { return <div className="skill-row"><div><span>{name}</span><b>{value}%</b></div><div className="progress"><i style={{width:`${value}%`}}/></div></div>; }
function Bar({label,value}) { return <div className="bar-row"><div><span>{label}</span><b>{value}</b></div><div className="progress"><i style={{width:`${value}%`}}/></div></div>; }
function Gap({name,value}) { return <div className="gap"><div className="gap-icon"><Target size={16}/></div><div><b>{name}</b><span>{value}</span></div></div>; }
function Trust({icon:Icon,title,text,ok}) { return <div className="trust"><div className={ok?"trust-icon ok":"trust-icon"}><Icon size={17}/></div><div><b>{title}</b><span>{text}</span></div><span className={ok?"status green":"status gray"}>{ok?"Passed":"Review"}</span></div>; }
function Timeline({title,text}) { return <div className="timeline"><div className="timeline-dot"></div><div><b>{title}</b><span>{text}</span></div></div>; }
function Outcome({label,value,change}) { return <div className="outcome"><span>{label}</span><b>{value}</b><small>{change}</small></div>; }
function Funnel({n,v}) { return <div className="funnel"><span>{n}</span><b>{v}</b></div>; }

function LogTable({logs,onApprove,reviewMode=false}) {
  return <div className="table"><div className="tr th"><span>Student / Date</span><span>Activity</span><span>Hours</span><span>Verification</span>{reviewMode&&<span>Action</span>}</div>{logs.map(l=><div className="tr" key={l.id}><span><b>{l.student}</b><small>{l.date} • {l.location}</small></span><span>{l.activity}</span><span>{l.hours} hrs</span><span><span className={l.status==="Approved"?"status green":"status amber"}>{l.status}</span></span>{reviewMode&&<span>{l.status==="Pending"?<button className="mini-btn" onClick={()=>onApprove(l.id)}><CheckCircle2 size={15}/> Approve</button>:<span className="verified-text"><ShieldCheck size={15}/> Verified</span>}</span>}</div>)}</div>;
}
function StudentTable({search, institutions=false}) {
  const filtered = students.filter(s => !search || `${s.name} ${s.college} ${s.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="table"><div className="tr th"><span>{institutions?"Institution":"Student"}</span><span>Skills</span><span>Verified hours</span><span>Readiness</span></div>{filtered.map(s=><div className="tr" key={s.id}><span><b>{institutions?s.college:s.name}</b><small>{institutions?s.id:s.college}</small></span><span>{s.skills.slice(0,2).join(" • ")}</span><span>{s.hours} hrs</span><span className="status green">{s.status}</span></div>)}</div>;
}
function CandidateTable({filter=""}) {
  const rows = students.filter(s=>!filter||`${s.name} ${s.skills.join(" ")}`.toLowerCase().includes(filter.toLowerCase()));
  return <div className="table"><div className="tr th"><span>Candidate</span><span>Verified skills</span><span>Hours</span><span>AI match</span></div>{rows.map(s=><div className="tr" key={s.id}><span><b>{s.name}</b><small>{s.college}</small></span><span>{s.skills.join(" • ")}</span><span>{s.hours}</span><span><strong className="score">{s.match}%</strong> <small>Explainable</small></span></div>)}</div>;
}

function LogModal({onClose,onSubmit}) {
  const [activity,setActivity]=useState(""); const [hours,setHours]=useState("4");
  return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">NEW LOGBOOK ENTRY</span><h2>Record practical activity</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><label>Activity description<input value={activity} onChange={e=>setActivity(e.target.value)} placeholder="e.g. Panchakarma procedure / batch QC step"/></label><label>Verified hours<input type="number" min="1" max="12" value={hours} onChange={e=>setHours(e.target.value)}/></label><div className="privacy-box"><ShieldCheck size={17}/><span>Use anonymized case references only. Do not enter patient names, phone numbers or addresses.</span></div><div className="modal-actions"><button className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!activity.trim()} onClick={()=>onSubmit({activity,hours})}>Submit for approval</button></div></div></div>;
}
function VacancyModal({onClose,onSubmit}) {
  return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">INDUSTRY</span><h2>Post a vacancy</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><label>Role title<input placeholder="e.g. Quality Control Trainee"/></label><label>Required skills<input placeholder="e.g. Quality Control, Herb Standardization"/></label><label>Location<input placeholder="City, State"/></label><div className="modal-actions"><button className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary" onClick={onSubmit}>Publish vacancy</button></div></div></div>;
}


function AIAssistant({ role, page }) {
  const [open,setOpen]=useState(false), [input,setInput]=useState(""), [busy,setBusy]=useState(false);
  const [messages,setMessages]=useState([{from:"ai",text:"Hi! I'm SkillBridge AI. Ask me about internships, skills, your Skill Passport or opportunities."}]);
  const ask=async(preset)=>{const text=(preset??input).trim();if(!text||busy)return;setInput("");setMessages(m=>[...m,{from:"user",text}]);setBusy(true);try{const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,context:{role,page,demo:true}})});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error);setMessages(m=>[...m,{from:"ai",text:d.answer}]);}catch(e){setMessages(m=>[...m,{from:"ai",text:"AI is not connected yet. Deploy to Vercel and add OPENAI_API_KEY under Project Settings → Environment Variables."}]);}finally{setBusy(false);}};
  return <div className={`ai-assistant ${open?"open":""}`}>
    {open&&<div className="ai-panel"><div className="ai-panel-head"><div><div className="ai-avatar"><Sparkles size={16}/></div><div><b>SkillBridge AI</b><span>Internship & career assistant</span></div></div><button className="icon-btn" onClick={()=>setOpen(false)}><X size={16}/></button></div>
    <div className="ai-messages">{messages.map((m,i)=><div key={i} className={`ai-message ${m.from}`}>{m.text}</div>)}{busy&&<div className="ai-message ai">Thinking…</div>}</div>
    <div className="ai-prompts"><button onClick={()=>ask("How can I improve my Skill Passport?")}>Improve Skill Passport</button><button onClick={()=>ask("Explain internship verification")}>Explain verification</button></div>
    <div className="ai-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask SkillBridge AI..."/><button onClick={()=>ask()} disabled={busy||!input.trim()}><ArrowRight size={16}/></button></div></div>}
    <button className="ai-launch" onClick={()=>setOpen(v=>!v)}><Sparkles size={18}/><span>SkillBridge AI</span></button>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
