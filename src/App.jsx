import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, Braces, Database, Globe, Send, CheckCircle2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const skills = [
  { name: "HTML5", detail: "Semantic structure & accessible layouts", icon: Globe, level: "Learning & building", width: "78%" },
  { name: "CSS3", detail: "Responsive layouts & visual styling", icon: Code2, level: "Learning & building", width: "70%" },
  { name: "JavaScript", detail: "Core concepts & interactive UI", icon: Braces, level: "Currently improving", width: "52%" },
  { name: "React.js", detail: "Components, props, hooks & routing basics", icon: Code2, level: "Currently learning", width: "38%" },
  { name: "Node.js", detail: "Building server-side applications", icon: Braces, level: "Currently learning", width: "30%" },
  { name: "MongoDB", detail: "Working with document databases", icon: Database, level: "Learning & building", width: "35%" },
];

const fallbackProjects = [
  {
    number: "01", type: "COLLEGE PROJECT", title: "Surat Event Management System",
    description: "A platform concept where users can explore Surat events, view event details and register online, while admins manage event listings.",
    stack: ["PHP", "MongoDB", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/deepakprajapati9936"
  },
  {
    number: "02", type: "PERSONAL WEBSITE", title: "Personal Portfolio",
    description: "A responsive personal portfolio to introduce myself, highlight my skills and make it easy to connect.",
    stack: ["React.js", "CSS", "Node.js"],
    link: "https://github.com/deepakprajapati9936"
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState(fallbackProjects);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => { if (Array.isArray(data) && data.length) setProjects(data); })
      .catch(() => {});
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submitContact(event) {
    event.preventDefault();
    setSending(true);
    setNotice("");
    try {
      const response = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send message.");
      setNotice("Thanks! Your message has been sent.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setNotice(`${error.message} Make sure the backend and MongoDB are running.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="header">
        <nav className="nav wrap">
          <a className="logo" href="#home" onClick={closeMenu}>DP<span>.</span></a>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) =>
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
            )}
          </div>
          <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
        </nav>
      </header>

      <main>
        <section className="hero wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><i/> AVAILABLE FOR INTERNSHIPS & OPPORTUNITIES</p>
            <h1>Hi, I'm <span>Dipak</span>.<br/>Building things for<br/>the <em>web.</em></h1>
            <p className="hero-desc">BCA student and aspiring Full Stack Developer. I enjoy turning ideas into clean, responsive and useful web experiences.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#projects">Explore my work <ArrowUpRight size={16}/></a>
              <a className="btn secondary" href="#contact">Get in touch</a>
            </div>
            <div className="quick-stats">
              <div><b>01</b><span>Curious learner</span></div><div><b>02</b><span>Web development</span></div><div><b>03</b><span>Surat, India</span></div>
            </div>
          </div>
          <div className="hero-art portrait-stage">
            <div className="code-rain" aria-hidden="true"><span>const future = build();</span><span>npm run create</span><span>function innovate() { }</span><span>git commit -m "dream"</span><span>01 1010 001</span></div>
            <div className="portrait-frame"><img src="/dipak-profile.jpg" alt="Dipak Prajapati" /></div>
            <div className="floating-terminal"><div className="terminal-head"><i/><i/><i/><span>~/dipak-portfolio</span></div><p><b>const</b> developer = <em>"Dipak"</em>;</p><p><b>while</b> (learning) {'{'}</p><p className="terminal-indent">buildSomethingGreat();</p><p>{'}'}</p><div className="terminal-status"><i/> SYSTEM READY <span>● REACT + NODE.JS</span></div></div>
            <span className="float-tag html">REACT.JS</span><span className="float-tag css">NODE.JS</span><span className="float-tag js">MONGODB</span>
            <div className="stamp">CODE<br/>CREATE<br/>REPEAT ✳</div>
          </div>
        </section>

        <section className="section about" id="about"><div className="wrap split">
          <div><p className="kicker">01 / ABOUT ME</p><h2>A little about<br/><span>who I am.</span></h2></div>
          <div className="about-copy">
            <p className="lead">I'm Dipak Prajapati, a BCA student at Udhana Citizen College and an aspiring Full Stack Developer.</p>
            <p>I'm building my foundation in frontend development and learning backend technologies to create complete web applications. I value consistency, practical learning and solving real-world problems through technology.</p>
            <div className="facts">
              <div><small>EDUCATION</small><b>BCA — Semester 6</b></div><div><small>COLLEGE</small><b>Udhana Citizen College</b></div>
              <div><small>LOCATION</small><b>Surat, Gujarat, India</b></div><div><small>CAREER GOAL</small><b>Full Stack Developer</b></div>
            </div>
          </div>
        </div></section>

        <section className="section wrap" id="skills">
          <p className="kicker">02 / MY TOOLKIT</p><div className="section-heading"><h2>Skills I'm <span>growing.</span></h2><p>My current toolkit — improving with every project.</p></div>
          <div className="skills-grid">{skills.map(({name, detail, icon: Icon, level, width}) =>
            <article className="skill-card" key={name}><div className="skill-icon"><Icon size={20}/></div><h3>{name}</h3><p>{detail}</p><div className="track"><i style={{width}}/></div><small>{level}</small></article>
          )}</div>
          <p className="fineprint">Skill indicators are illustrative learning progress, not formal test scores.</p>
        </section>

        <section className="section projects" id="projects"><div className="wrap">
          <p className="kicker">03 / SELECTED WORK</p><div className="section-heading"><h2>Things I've <span>worked on.</span></h2><p>Projects that show what I'm learning and building.</p></div>
          <div className="projects-grid">{projects.map((project, index) =>
            <article className="project-card" key={project._id || project.number || index}>
              <div className={`project-art art-${index % 2}`}><div className="project-art-label">{project.type || "WEB DEVELOPMENT"}</div><strong>{index === 0 ? "Surat Events." : "My Digital Space."}</strong><div className="art-lines"><i/><i/><i/></div></div>
              <div className="project-body"><div className="project-meta"><span>{project.number || `0${index + 1}`} / PROJECT</span><span>{project.type || "WEB APP"}</span></div>
                <h3>{project.title}</h3><p>{project.description}</p>
                <div className="chips">{(project.stack || []).map((tech) => <span key={tech}>{tech}</span>)}</div>
                {project.link && <a className="project-link" href={project.link} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14}/></a>}
              </div>
            </article>
          )}</div>
          <p className="github-line">More code on <a href="https://github.com/deepakprajapati9936" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a></p>
        </div></section>

        <section className="contact section" id="contact"><div className="wrap contact-grid">
          <div><p className="kicker">04 / GET IN TOUCH</p><h2>Have an idea?<br/><span>Let's build it.</span></h2><p className="contact-desc">I'm open to internships, learning opportunities and collaborations. Send me a message.</p>
            <div className="direct-links"><a href="mailto:dipak968043@gmail.com"><Mail size={17}/> dipak968043@gmail.com</a><a href="tel:+919936241650">☎ +91 99362 41650</a></div>
            <div className="socials"><a href="https://github.com/deepakprajapati9936" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href="https://www.linkedin.com/in/dipak-prajapati-6b4181404/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a></div>
          </div>
          <form className="contact-form" onSubmit={submitContact}>
            <h3>Send a message</h3><label>Your name<input name="name" value={form.name} onChange={updateForm} placeholder="Enter your name" required minLength="2"/></label>
            <label>Email address<input type="email" name="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required/></label>
            <label>Message<textarea name="message" value={form.message} onChange={updateForm} placeholder="Tell me about your idea..." rows="4" required minLength="10"/></label>
            <button className="btn primary send-btn" disabled={sending}>{sending ? "Sending..." : "Send message"} <Send size={15}/></button>
            {notice && <p className="form-notice"><CheckCircle2 size={15}/>{notice}</p>}
          </form>
        </div></section>
      </main>
      <footer className="footer"><div className="wrap footer-inner"><a className="logo" href="#home">DP<span>.</span></a><p>Designed & built by Dipak Prajapati</p><a href="#home">Back to top ↑</a><small>© {new Date().getFullYear()} Dipak Prajapati</small></div></footer>
    </>
  );
}
export default App;
