import { ArrowUpRight, FileText, MessageCircle, Phone } from 'lucide-react'
import FigmaBuild from '@/components/figma-build'
import { Capabilities, LocalClock, CopyEmail, Frame, Journey, StretchName, Toolbar, YouTag, type Capability } from '@/components/portfolio-ui'

const EMAIL = 'itdhanush68@gmail.com'

const capabilities: Capability[] = [
  { name: 'Backend and architecture', line: 'Multi-tenant platforms and REST APIs with clean data isolation between clients.', tech: ['NestJS', '.NET Core Web API', 'Microservices', 'RESTful APIs', 'Multi-tenant architecture'] },
  { name: 'Frontend and mobile', line: 'Web and cross-platform mobile apps with strict typing to catch errors before production.', tech: ['React', 'TypeScript', 'React Native', 'Angular', 'State management'] },
  { name: 'Databases and real-time', line: 'Relational schemas built for consistency, plus event-driven data syncing over MQTT.', tech: ['MySQL', 'Schema design', 'MQTT'] },
  { name: 'Security and operations', line: 'Secure access, role control and hands-on deployment ownership.', tech: ['JWT authentication', 'RBAC', 'Plesk hosting', 'Git'] },
  { name: 'Logging and observability', line: 'Structured logs that make live diagnostics straightforward.', tech: ['Winston', 'Serilog'] },
  { name: 'AI-augmented engineering', line: 'AI-driven solution design and rapid delivery, with data integrity and type safety kept intact.', tech: ['Claude Code', 'Codex', 'Open Code', 'Ollama', 'Stitch', 'Antigravity'] },
]

const journey = [
  {
    dates: 'Feb 2026 to present',
    role: 'Full-Stack Engineer',
    company: 'Trofeo Solutions, Coimbatore',
    points: [
      'Built an Inventory Management platform on NestJS and MySQL, with schema indices designed for real-time stock tracking.',
      'Developed a React Native app for sales and field agents, using strict TypeScript to reduce runtime errors during order capture and checkout.',
      'Designed a multi-module Company Management system for resource allocation, employee tracking and cross-department operations.',
      'Built AI-driven features into business applications to automate workflows and reduce manual effort.',
      'Introduced AI-assisted development workflows (Claude Code, Codex, Open Code, Ollama) to speed up delivery.',
      'Owned end-to-end deployments on Plesk and worked directly with stakeholders on architecture decisions.',
    ],
  },
  {
    dates: 'Nov 2024 to Dec 2025',
    role: 'Program Analyst',
    company: 'QwickSoft Solutions Pvt Ltd, Chennai',
    points: [
      'Developed and maintained production-scale SaaS web and mobile apps on an Angular frontend and .NET Core backend.',
      'Implemented JWT authentication and role-based access control for multi-tenant security.',
      'Contributed to an event-driven microservices setup on MQTT for real-time data syncing.',
      'Worked across frontend and backend teams to optimise SQL queries and improve API response times.',
    ],
  },
]

const strengths = [
  { title: 'AI-integrated applications', body: 'Integrated AI capabilities into business apps and used AI coding tools (Claude Code, Codex, Ollama) to ship features faster.' },
  { title: 'Multi-tenant SaaS architecture', body: 'Designed data-isolation layers and secure session handling with JWT authentication for multi-tenant client platforms.' },
  { title: 'Real-time systems and microservices', body: 'Built asynchronous, event-driven services with real-time data syncing and structured logging for live diagnostics.' },
  { title: 'Database and schema design', body: 'Modelled one-to-many and many-to-many relational entities to keep data consistent across high-volume transactions.' },
  { title: 'Cross-platform mobile engineering', body: 'Delivered React Native apps with strict TypeScript typing to minimise runtime errors in production.' },
]

function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.95 0-1.72.78-1.72 1.73s.77 1.73 1.72 1.73a1.73 1.73 0 0 0 1.73-1.73c0-.95-.78-1.73-1.73-1.73Z" /></svg>
}
function GithubIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
}

export default function Page() {
  return (
    <main className="canvas">
      <FigmaBuild />
      <YouTag />
      <Toolbar />

      <div className="wordmark">Dhanush S</div>

      <Frame id="top" label="Intro" className="w-full">
        <div className="hero">
          <div data-build="hero" className="hero-name"><StretchName text="DHANUSH" /></div>
          <div className="hero-body">
            <div className="hero-copy">
              <p className="lead" data-build="hero">Full-stack engineer building multi-tenant SaaS, real-time systems and cross-platform mobile apps.</p>
              <div className="actions" data-build="hero">
                <a href="#capabilities" className="btn btn-solid">See what I work with</a>
                <a href="/Dhanush_S_Resume.pdf" download className="btn btn-line">Download resume</a>
              </div>
            </div>
            <figure className="portrait" data-build="hero">
              <img src="/dhanush-avatar.png" alt="Illustrated portrait of Dhanush sitting with a laptop" />
              <figcaption>
                <span className="status"><span className="dot" />Open to new roles</span>
                <LocalClock place="Sathy, Erode" />
              </figcaption>
            </figure>
          </div>
        </div>
      </Frame>

      <Frame id="about" label="About" className="w-92">
        <div className="about">
          <h2 data-build="scroll">I build the systems behind business software, end to end.</h2>
          <div className="about-side">
            <div className="about-copy" data-build="scroll">
              <p>I&apos;m Dhanush, a full-stack engineer with 1.5+ years of hands-on experience across multi-tenant SaaS platforms, real-time microservices, cross-platform mobile apps and AI-integrated applications.</p>
              <p>I deliver end to end, from backend frameworks like NestJS and .NET Core to React, React Native and Angular, and I use AI-assisted engineering to move faster while keeping data integrity and type safety.</p>
            </div>
            <dl className="facts" data-build="scroll">
              <div><dt>Years of experience</dt><dd>1.5+</dd></div>
              <div><dt>Companies</dt><dd>2</dd></div>
              <div><dt>Based in</dt><dd className="fact-text">Sathy, Erode</dd></div>
            </dl>
          </div>
        </div>
      </Frame>

      <Frame id="capabilities" label="Capabilities" className="w-full">
        <div className="cap">
          <div className="cap-head">
            <h2 data-build="scroll">What I build with</h2>
            <p data-build="scroll">The stack I use day to day, grouped by what it does. Open a row to see the tools.</p>
          </div>
          <Capabilities items={capabilities} />
        </div>
      </Frame>

      <Frame id="journey" label="Journey" className="w-84 push-right">
        <div className="journey-wrap">
          <h2 data-build="scroll">Where I&apos;ve worked</h2>
          <Journey>
            {journey.map((j) => (
              <article key={j.dates} className="journey-item" data-build="scroll">
                <span className="journey-dot" />
                <p className="journey-years">{j.dates}</p>
                <h3>{j.role}</h3>
                <p className="journey-company">{j.company}</p>
                <ul className="journey-points">{j.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </article>
            ))}
          </Journey>
        </div>
      </Frame>

      <Frame id="strengths" label="Strengths" className="w-92">
        <div className="approach">
          <h2 data-build="scroll">Where I add impact</h2>
          <div className="principles">
            {strengths.map((a) => (
              <div key={a.title} className="principle" tabIndex={0} data-build="scroll">
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Frame>

      <Frame id="contact" label="Contact" className="w-full night">
        <div className="contact">
          <h2 data-build="scroll">Have something to build?</h2>
          <p className="contact-lead" data-build="scroll">I&apos;m looking for backend and full-stack roles. If you have one, or something you want built, email me.</p>
          <div data-build="scroll"><CopyEmail email={EMAIL} /></div>
          <div className="contact-links" data-build="scroll">
            <a href="https://wa.me/916374431152" target="_blank" rel="noreferrer"><MessageCircle />WhatsApp<ArrowUpRight className="out" /></a>
            <a href="tel:+916374431152"><Phone />+91 63744 31152</a>
            <a href="/Dhanush_S_Resume.pdf" download><FileText />Resume (PDF)</a>
            <a href="https://www.linkedin.com/in/dhanush-s-full-stack-engineer" target="_blank" rel="noreferrer"><LinkedinIcon />LinkedIn<ArrowUpRight className="out" /></a>
            <a href="https://github.com/DhanushSelvarajDev" target="_blank" rel="noreferrer"><GithubIcon />GitHub<ArrowUpRight className="out" /></a>
          </div>
          <div className="contact-foot" data-build="scroll">
            <span>© 2026 Dhanush S</span>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </Frame>
    </main>
  )
}
