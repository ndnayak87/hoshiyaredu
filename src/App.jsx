import { useEffect, useMemo, useState } from "react";
import {
  admitCards,
  currentAffairs,
  exams,
  gkQuestions,
  jobs,
  results,
  studyMaterial,
  tickerItems,
} from "./data";

const PAGES = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "current", label: "Current Affairs", icon: "📰" },
  { id: "jobs", label: "Sarkari Jobs", icon: "🏛️" },
  { id: "exams", label: "Competitive Exams", icon: "📝" },
  { id: "study", label: "Study Material", icon: "📚" },
  { id: "gk", label: "GK & MCQ", icon: "🧠" },
  { id: "admit", label: "Admit Card", icon: "📅" },
  { id: "results", label: "Results", icon: "🏆" },
];

function Badge({ children, tone = "blue" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Header({ page, setPage, query, setQuery }) {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return (
    <header className="header">
      <div className="topbar">
        <span>“शिक्षा मिले हर बच्चे को”</span>
        <span className="topbar-right">{dateStr} • {timeStr}</span>
      </div>
      <div className="mainbar">
        <button className="logo" onClick={() => setPage("home")}>
          <span className="logo-mark">हो</span>
          <span className="logo-text">
            Hoshiyar<b>Edu</b>
            <small>Current Affairs • Jobs • Exams</small>
          </span>
        </button>
        <div className="search">
          <span>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: SSC GD, RRB NTPC, GK, Current Affairs…"
          />
          {query && <button onClick={() => setQuery("")}>✕</button>}
        </div>
        <button className="icon-btn" title="Alerts ON karein" onClick={async () => {
          if (!("Notification" in window)) { alert("Ye browser notifications support nahi karta"); return; }
          if (Notification.permission === "granted") { alert("Alerts pehle se ON hain 🔔"); return; }
          const p = await Notification.requestPermission();
          try { localStorage.setItem("he_notify", p); } catch { /* ignore */ }
          if (p === "granted") new Notification("HoshiyarEdu 🔔", { body: "Alerts ON! Jobs, Admit Card aur Results ki suchna milegi." });
          else alert("Blocked hai — browser ki site settings se Allow karo");
        }}>🔔</button>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      <nav className={`nav ${open ? "open" : ""}`}>
        {PAGES.map((p) => (
          <button
            key={p.id}
            className={page === p.id ? "active" : ""}
            onClick={() => {
              setPage(p.id);
              setOpen(false);
              window.scrollTo({ top: 0 });
            }}
          >
            <span>{p.icon}</span> {p.label}
          </button>
        ))}
      </nav>
      <div className="ticker">
        <span className="ticker-label">🔴 LIVE</span>
        <div className="ticker-track">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i}>• {t} &nbsp;&nbsp;</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <Badge tone="green">✨ 100% Free • No Login Needed</Badge>
          <h1>
            Sarkari Naukri, Exams aur GK — <span>सब कुछ एक जगह</span>
          </h1>
          <p>
            HoshiyarEdu पर रोज़ाना Current Affairs, नई भर्तियां, Admit Card, Results,
            Free PDF Notes और Daily GK Quiz — Hindi + English में।
          </p>
          <div className="hero-btns">
            <button className="btn primary" onClick={() => setPage("jobs")}>
              🏛️ Latest Jobs देखें
            </button>
            <button className="btn ghost" onClick={() => setPage("gk")}>
              🧠 Daily Quiz खेलें
            </button>
          </div>
          <div className="hero-stats">
            <div><b>500+</b><span>Free PDFs</span></div>
            <div><b>10K+</b><span>MCQs</span></div>
            <div><b>Daily</b><span>Current Affairs</span></div>
            <div><b>7</b><span>Sections</span></div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card">
            <h3>📌 आज का Top Update</h3>
            <p className="big">SSC GD 39,481 पद — Last Date 14 Oct!</p>
            <div className="row">
              <button className="btn small primary" onClick={() => setPage("jobs")}>Apply Details</button>
              <button className="btn small ghost" onClick={() => setPage("admit")}>Admit Card</button>
            </div>
            <ul>
              <li>✅ CGL Tier-I Result Declared</li>
              <li>✅ IBPS PO Admit Card Out</li>
              <li>✅ Sep Current Affairs PDF Free</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="sec-title">Explore 7 Sections <small>अपनी तैयारी चुनें</small></h2>
        <div className="grid cards-4">
          {[
            { id: "current", icon: "📰", t: "Current Affairs", d: "रोज़ाना Hindi/English updates + Monthly PDF", c: "c1" },
            { id: "jobs", icon: "🏛️", t: "Sarkari Jobs", d: "SSC, Railway, Police, Bank — सभी भर्तियां", c: "c2" },
            { id: "exams", icon: "📝", t: "Competitive Exams", d: "UPSC, SSC, NEET, CTET pattern + syllabus", c: "c3" },
            { id: "study", icon: "📚", t: "Study Material", d: "NCERT Notes, Formulas, Vocab Free PDF", c: "c4" },
            { id: "gk", icon: "🧠", t: "GK & MCQ", d: "Daily Quiz + 10,000 Practice Questions", c: "c5" },
            { id: "admit", icon: "📅", t: "Admit Card", d: "सभी Hall Ticket download alerts", c: "c6" },
            { id: "results", icon: "🏆", t: "Results", d: "Cutoff, Merit List, Counselling updates", c: "c7" },
          ].map((c) => (
            <button key={c.id} className={`cat-card ${c.c}`} onClick={() => setPage(c.id)}>
              <span className="cat-icon">{c.icon}</span>
              <b>{c.t}</b>
              <p>{c.d}</p>
              <span className="go">Open →</span>
            </button>
          ))}
          <div className="cat-card quote">
            <span className="cat-icon">💡</span>
            <b>आज का सुविचार</b>
            <p>“मेहनत इतनी खामोशी से करो कि सफलता शोर मचा दे।”</p>
          </div>
        </div>
      </section>

      <section className="split">
        <div>
          <h2 className="sec-title">📰 Latest Current Affairs</h2>
          <div className="list">
            {currentAffairs.slice(0, 4).map((n) => (
              <article key={n.id} className="news-item">
                <div><Badge tone="orange">{n.category}</Badge> <small>{n.date}</small></div>
                <b>{n.title}</b>
                <p>{n.summary}</p>
              </article>
            ))}
          </div>
          <button className="btn ghost" onClick={() => setPage("current")}>सभी पढ़ें →</button>
        </div>
        <div>
          <h2 className="sec-title">🏛️ Latest Jobs</h2>
          <div className="list">
            {jobs.slice(0, 4).map((j) => (
              <article key={j.id} className="job-mini">
                <b>{j.org}</b>
                <p>{j.posts} • Last: {j.lastDate}</p>
                {j.hot && <Badge tone="red">🔥 Hot</Badge>}
              </article>
            ))}
          </div>
          <button className="btn ghost" onClick={() => setPage("jobs")}>सभी भर्तियां →</button>
        </div>
        <div>
          <h2 className="sec-title">📅 Admit Card + 🏆 Results</h2>
          <div className="list">
            {admitCards.slice(0, 2).map((a) => (
              <article key={a.id} className="job-mini"><b>{a.exam}</b><p>{a.status} • {a.examDate}</p></article>
            ))}
            {results.slice(0, 2).map((r) => (
              <article key={r.id} className="job-mini"><b>{r.exam}</b><p>{r.status} • {r.declared}</p></article>
            ))}
          </div>
          <div className="row">
            <button className="btn ghost" onClick={() => setPage("admit")}>Admit Card →</button>
            <button className="btn ghost" onClick={() => setPage("results")}>Results →</button>
          </div>
        </div>
      </section>
    </>
  );
}

function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = gkQuestions[idx];
  const total = gkQuestions.length;

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= total) setDone(true);
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };
  const restart = () => {
    setIdx(0); setPicked(null); setScore(0); setDone(false);
  };

  if (done)
    return (
      <div className="quiz-box center">
        <h2>🏆 Quiz Complete!</h2>
        <p className="score">{score} / {total}</p>
        <p>{score >= 8 ? "Outstanding! आप Exam Ready हो 🎉" : score >= 5 ? "Good! थोड़ी और practice करें 💪" : "कोई बात नहीं, Notes पढ़ें और फिर try करें 📚"}</p>
        <button className="btn primary" onClick={restart}>🔄 फिर से खेलें</button>
      </div>
    );

  return (
    <div className="quiz-box">
      <div className="quiz-top">
        <span>Q {idx + 1} / {total}</span>
        <span>Score: {score}</span>
      </div>
      <div className="progress"><div style={{ width: `${((idx) / total) * 100}%` }} /></div>
      <h3>{q.q}</h3>
      <div className="opts">
        {q.options.map((o, i) => {
          let cls = "";
          if (picked !== null) {
            if (i === q.answer) cls = "correct";
            else if (i === picked) cls = "wrong";
          }
          return (
            <button key={i} className={`opt ${cls}`} onClick={() => pick(i)} disabled={picked !== null}>
              <span className="opt-letter">{["A", "B", "C", "D"][i]}</span> {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="explain">
          {picked === q.answer ? "✅ सही!" : "❌ गलत!"} {q.explain}
          <button className="btn primary" onClick={next}>{idx + 1 >= total ? "Result देखें" : "Next →"}</button>
        </div>
      )}
    </div>
  );
}

function NotifyPrompt() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "default") return;
    if (localStorage.getItem("he_notify")) return;
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);
  const close = (v) => {
    try { localStorage.setItem("he_notify", v); } catch { /* ignore */ }
    setShow(false);
  };
  const allow = async () => {
    try {
      const p = await Notification.requestPermission();
      close(p);
      if (p === "granted") {
        new Notification("HoshiyarEdu 🔔", {
          body: "Alerts ON! Jobs, Admit Card aur Results ki suchna milegi.",
        });
      }
    } catch {
      close("error");
    }
  };
  if (!show) return null;
  return (
    <div className="notify-overlay">
      <div className="notify-box">
        <span className="notify-bell">🔔</span>
        <b>HoshiyarEdu Alerts</b>
        <p>Sarkari Jobs, Admit Card aur Results ki turant suchna payein?</p>
        <div className="row center">
          <button className="btn primary" onClick={allow}>Allow</button>
          <button className="btn ghost" onClick={() => close("later")}>Baad me</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  useEffect(() => {
    const meta = {
      home: ["HoshiyarEdu — Sarkari Jobs, Current Affairs, Exams, GK Quiz, Results", "Sarkari Naukri, Current Affairs, Free PDF Notes, Daily GK Quiz, Admit Card aur Results — Hindi + English में।"],
      current: ["Current Affairs in Hindi 2026 — Daily Updates | HoshiyarEdu", "रोज़ाना Current Affairs Hindi + English में: National, Economy, Sports, Science, Polity. Monthly PDF free download."],
      jobs: ["Sarkari Jobs 2026 — SSC, Railway, Police, Bank Bharti | HoshiyarEdu", "Latest Sarkari Naukri: SSC GD, RRB NTPC, UP Police, IBPS PO. Posts, योग्यता, fees aur last date सहित."],
      exams: ["Competitive Exams Pattern & Syllabus — UPSC, SSC, NEET | HoshiyarEdu", "UPSC, SSC CGL, RRB NTPC, NEET, CTET, CUET — exam pattern, syllabus aur dates."],
      study: ["Free Study Material PDF — NCERT Notes, GK, Maths | HoshiyarEdu", "Free PDF notes: NCERT History, Polity, Geography, Maths formulas, English vocab, Lucent GK."],
      gk: ["GK Quiz & MCQ Practice in Hindi — Daily Test | HoshiyarEdu", "Daily GK Quiz, 10,000+ MCQs: History, Polity, Geography, Science. Free practice test."],
      admit: ["Admit Card Download 2026 — Hall Ticket Alerts | HoshiyarEdu", "SSC, Railway, UP Police, IBPS, CTET, UPSC admit card download links aur exam dates."],
      results: ["Sarkari Result 2026 — Cutoff & Merit List | HoshiyarEdu", "Latest results: SSC CGL, UP Board, Railway, IBPS, CTET, NEET counselling. Cutoff सहित."],
    };
    const [t, d] = meta[page] || meta.home;
    document.title = t;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", d);
  }, [page]);

  const q = query.trim().toLowerCase();
  const match = (s) => !q || s.toLowerCase().includes(q);

  const filteredNews = useMemo(
    () => currentAffairs.filter((n) => (catFilter === "All" || n.category === catFilter) && match(n.title + n.summary + n.category)),
    [catFilter, q]
  );
  const filteredJobs = useMemo(() => jobs.filter((j) => match(j.org + j.posts + j.qual)), [q]);
  const filteredExams = useMemo(() => exams.filter((e) => match(e.name + e.syllabus)), [q]);
  const filteredStudy = useMemo(() => studyMaterial.filter((s) => match(s.title)), [q]);

  const cats = ["All", ...new Set(currentAffairs.map((n) => n.category))];

  return (
    <div className="app">
      <Header page={page} setPage={setPage} query={query} setQuery={setQuery} />

      <main className="main">
        {q && page === "home" && (
          <section className="search-results">
            <h2>🔍 “{query}” के लिए परिणाम</h2>
            <div className="grid cards-3">
              {filteredJobs.map((j) => (
                <div key={j.id} className="card"><Badge tone="red">Job</Badge><b>{j.org}</b><p>{j.posts}</p></div>
              ))}
              {filteredNews.map((n) => (
                <div key={n.id} className="card"><Badge tone="orange">News</Badge><b>{n.title}</b></div>
              ))}
              {filteredStudy.map((s) => (
                <div key={s.id} className="card"><Badge tone="green">PDF</Badge><b>{s.title}</b></div>
              ))}
              {filteredExams.map((e) => (
                <div key={e.id} className="card"><Badge tone="blue">Exam</Badge><b>{e.name}</b></div>
              ))}
              {filteredJobs.length + filteredNews.length + filteredStudy.length + filteredExams.length === 0 && (
                <p>कोई परिणाम नहीं मिला। “SSC”, “Railway”, “GK” try करें।</p>
              )}
            </div>
          </section>
        )}

        {(page === "home" || (q && false)) && <Home setPage={setPage} />}

        {page === "current" && (
          <section>
            <h2 className="sec-title">📰 Current Affairs <small>Sep 2026 • रोज़ अपडेट</small></h2>
            <div className="filters">
              {cats.map((c) => (
                <button key={c} className={catFilter === c ? "active" : ""} onClick={() => setCatFilter(c)}>{c}</button>
              ))}
            </div>
            <div className="grid cards-2">
              {filteredNews.map((n) => (
                <article key={n.id} className="card news">
                  <div className="row between"><Badge tone="orange">{n.category}</Badge><small>{n.date}</small></div>
                  <h3><a className="news-link" href={n.link} target="_blank" rel="noreferrer">{n.title}</a></h3>
                  <p>{n.summary}</p>
                  <div className="row"><Badge>{n.tag}</Badge><span className="link">Exam Point ✓</span></div>
                </article>
              ))}
            </div>
            <div className="cta-strip">
              <b>📥 September 2026 Monthly PDF (60 Pages, Hindi)</b>
              <button className="btn primary" onClick={() => alert("Demo: PDF download जल्द जुड़ेगा!")}>Free Download</button>
            </div>
          </section>
        )}

        {page === "jobs" && (
          <section>
            <h2 className="sec-title">🏛️ Sarkari Jobs <small>Active भर्तियां 2026</small></h2>
            <div className="grid cards-3">
              {filteredJobs.map((j) => (
                <article key={j.id} className="card job">
                  <div className="row between">
                    <Badge tone={j.hot ? "red" : "blue"}>{j.status}</Badge>
                    {j.hot && <Badge tone="green">🔥 Hot</Badge>}
                  </div>
                  <h3>{j.org}</h3>
                  <ul>
                    <li><b>पद:</b> {j.posts}</li>
                    <li><b>योग्यता:</b> {j.qual}</li>
                    <li><b>आयु:</b> {j.age}</li>
                    <li><b>फीस:</b> {j.fee}</li>
                    <li><b>Last Date:</b> <span className="red">{j.lastDate}</span></li>
                  </ul>
                  <div className="row">
                    <a className="btn small primary" href={j.link} target="_blank" rel="noreferrer">Apply Online</a>
                    <a className="btn small ghost" href={j.link} target="_blank" rel="noreferrer">Official Website</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="note">⚠️ हमेशा official website (ssc.gov.in, rrbcdg.gov.in, uppbpb.gov.in) से ही apply करें। फर्जी links से बचें।</p>
          </section>
        )}

        {page === "exams" && (
          <section>
            <h2 className="sec-title">📝 Competitive Exams <small>Pattern + Syllabus</small></h2>
            <div className="grid cards-3">
              {filteredExams.map((e) => (
                <article key={e.id} className="card">
                  <Badge tone="blue">{e.date}</Badge>
                  <h3>{e.name}</h3>
                  <p><b>Pattern:</b> {e.pattern}</p>
                  <p><b>Syllabus:</b> {e.syllabus}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "study" && (
          <section>
            <h2 className="sec-title">📚 Study Material <small>Free PDF Notes</small></h2>
            <div className="grid cards-4">
              {filteredStudy.map((s) => (
                <article key={s.id} className="card pdf">
                  <span className="pdf-icon">📄</span>
                  <b>{s.title}</b>
                  <a className="btn small primary" href={s.link} target="_blank" rel="noreferrer">PDF खोलें ↗</a>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "gk" && (
          <section>
            <h2 className="sec-title">🧠 GK & MCQ <small>Daily Practice Quiz</small></h2>
            <div className="gk-wrap">
              <Quiz />
              <div className="gk-side">
                <h3>📌 Quick Revision One-Liners</h3>
                <ul>
                  <li>भारत की राजधानी — <b>नई दिल्ली</b></li>
                  <li>राष्ट्रीय गान — <b>जन गण मन</b></li>
                  <li>सबसे बड़ा महासागर — <b>प्रशांत</b></li>
                  <li>संविधान लागू — <b>26 Jan 1950</b></li>
                  <li>पहला विश्व युद्ध — <b>1914–1918</b></li>
                  <li>ताजमहल — <b>आगरा, शाहजहां</b></li>
                  <li>1 मील = <b>1.609 km</b></li>
                  <li>विटामिन C स्रोत — <b>आंवला</b></li>
                </ul>
                <h3>📊 Topic-wise MCQs</h3>
                <div className="chips">
                  {["History 1200+", "Polity 900+", "Geography 800+", "Science 1100+", "UP GK 500+", "Maths 2000+", "English 1500+"].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "admit" && (
          <section>
            <h2 className="sec-title">📅 Admit Card <small>Hall Ticket Alerts</small></h2>
            <div className="table-wrap">
              <table>
                <thead><tr><th>परीक्षा</th><th>Exam Date</th><th>Status</th><th>Download</th></tr></thead>
                <tbody>
                  {admitCards.map((a) => (
                    <tr key={a.id}>
                      <td><b>{a.exam}</b><small>{a.site}</small></td>
                      <td>{a.examDate}</td>
                      <td><Badge tone={a.status === "Released" ? "green" : a.status === "Soon" ? "orange" : "blue"}>{a.status}</Badge></td>
                      <td><a className="btn small primary" href={a.link} target="_blank" rel="noreferrer">Download</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note">📝 Admit Card download के लिए Registration No + DOB चाहिए। Exam से 7–10 दिन पहले जारी होता है।</p>
          </section>
        )}

        {page === "results" && (
          <section>
            <h2 className="sec-title">🏆 Results <small>Cutoff + Merit List</small></h2>
            <div className="grid cards-3">
              {results.map((r) => (
                <article key={r.id} className="card">
                  <Badge tone={r.status === "Declared" ? "green" : "orange"}>{r.status}</Badge>
                  <h3>{r.exam}</h3>
                  <p><b>Declared:</b> {r.declared}</p>
                  <p><b>Cutoff:</b> {r.cutoff}</p>
                  <a className="btn small primary" href={r.link} target="_blank" rel="noreferrer">Check Result</a>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="foot-grid">
          <div>
            <b>📚 HoshiyarEdu</b>
            <p>छात्रों के लिए Free शिक्षा पोर्टल — Jobs, Current Affairs, Notes, Quiz।</p>
          </div>
          <div>
            <b>Sections</b>
            {PAGES.slice(1).map((p) => (
              <button key={p.id} className="foot-link" onClick={() => setPage(p.id)}>{p.icon} {p.label}</button>
            ))}
          </div>
          <div>
            <b>🏛️ Govt Useful Links</b>
            <a className="foot-link" href="https://upsc.gov.in" target="_blank" rel="noreferrer">UPSC — upsc.gov.in</a>
            <a className="foot-link" href="https://ssc.gov.in" target="_blank" rel="noreferrer">SSC — ssc.gov.in</a>
            <a className="foot-link" href="https://www.rrbcdg.gov.in" target="_blank" rel="noreferrer">Railway RRB — rrbcdg.gov.in</a>
            <a className="foot-link" href="https://www.ibps.in" target="_blank" rel="noreferrer">IBPS — ibps.in</a>
            <a className="foot-link" href="https://www.upsc.gov.in/external-links/state-public-service-commissions" target="_blank" rel="noreferrer">State Public Service Commissions</a>
            <a className="foot-link" href="https://rojgarsamachar.gov.in/newrs/home.aspx" target="_blank" rel="noreferrer">Rojgar Samachar</a>
            <a className="foot-link" href="https://igod.gov.in/sg/states" target="_blank" rel="noreferrer">State / UT Government</a>
          </div>
          <div>
            <b>📩 Daily Updates पाएं</b>
            <p>Telegram / WhatsApp Channel जल्द!</p>
            <div className="row">
              <button className="btn small primary">Telegram Join</button>
              <button className="btn small ghost">WhatsApp</button>
            </div>
          </div>
        </div>
        <div className="copy">© 2026 HoshiyarEdu • All Rights Reserved</div>
      </footer>
      <NotifyPrompt />
    </div>
  );
}
