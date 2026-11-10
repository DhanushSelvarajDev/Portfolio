// Set NEXT_PUBLIC_SITE_URL in the hosting env vars to your real domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dhanush-s-full-stack-engineer-pages.pages.dev').replace(/\/$/, '')

export const SITE = {
  name: 'Dhanush S',
  title: 'Dhanush S — Full-Stack Engineer (NestJS, .NET Core, React, React Native)',
  description:
    'Dhanush S is a full-stack engineer from Sathy, Erode, Tamil Nadu with 1.5+ years of experience in multi-tenant SaaS, real-time microservices, cross-platform mobile apps and AI-integrated applications.',
  email: 'itdhanush68@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dhanush-s-full-stack-engineer',
  github: 'https://github.com/DhanushSelvarajDev',
}
