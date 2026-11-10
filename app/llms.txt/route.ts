import { SITE, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

const body = `# ${SITE.name}

> ${SITE.description}

Dhanush S is a Full-Stack Engineer currently working at Trofeo Solutions, Coimbatore (Feb 2026 to present). Previously Program Analyst at QwickSoft Solutions Pvt Ltd, Chennai (Nov 2024 to Dec 2025). Open to backend and full-stack roles.

## Skills
- Backend: NestJS, .NET Core Web API, microservices, REST APIs, multi-tenant architecture
- Frontend and mobile: React, TypeScript, React Native, Angular
- Data and real-time: MySQL, schema design, MQTT
- Security and ops: JWT authentication, RBAC, Plesk, Git
- AI-augmented engineering: Claude Code, Codex, Ollama

## Links
- Portfolio: ${SITE_URL}
- Resume: ${SITE_URL}/Dhanush_S_Resume.pdf
- LinkedIn: ${SITE.linkedin}
- GitHub: ${SITE.github}
- Email: ${SITE.email}
`

export function GET() {
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
