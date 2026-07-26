"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Accueil", "Compétences", "Projets", "Expérience", "Contact"];

const SKILLS = {
  "Frontend": ["React.js", "Next.js", "TypeScript", "HTML/CSS", "Tailwind CSS", "Responsive Design"],
  "Backend": ["Node.js", "Express.js", "PHP", "REST API"],
  "Base de données": ["PostgreSQL", "MySQL", "Prisma ORM", "Supabase", "Row Level Security"],
  "Outils & DevOps": ["Git / GitHub", "Vercel", "Postman", "Figma"],
};

const PROJECTS = [
  {
    id: 1,
    name: "TerangaLearn",
    tag: "EdTech · En ligne",
    tagColor: "#2563eb",
    desc: "Plateforme e-learning gamifiée pour les élèves sénégalais préparant le BFEM et le BAC. Cours conformes au programme national, coach IA disponible 24h/24, classements nationaux, système d'XP et de séries, et suivi de progression intelligent.",
    stack: ["Next.js 15", "TypeScript", "Prisma", "Supabase", "PostgreSQL", "IA"],
    links: { demo: "https://terangalearn-sandy.vercel.app", github: null },
    highlight: true,
  },
  {
    id: 2,
    name: "icagi.sn",
    tag: "Client · Livré en production",
    tagColor: "#059669",
    desc: "Refonte complète du site institutionnel de l'ICAGI, migré de WordPress vers Next.js 15. Recherche mobile, galerie avec lightbox, animations Framer Motion, gestion du consentement cookies et déploiement DNS.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    links: { demo: "https://icagi.sn", github: null },
    highlight: false,
  },
  {
    id: 3,
    name: "AVG HOUSE",
    tag: "Client · E-commerce · Livré",
    tagColor: "#059669",
    desc: "Boutique en ligne artisanale pour un client basé en France. Catalogue produits dynamique, panier multi-produits, commande relayée par WhatsApp, et back-office avec gestion des photos.",
    stack: ["JavaScript", "Supabase", "PostgreSQL", "Vercel"],
    links: { demo: "https://avghouse.com", github: null },
    highlight: false,
  },
  {
    id: 4,
    name: "ODION Technologie",
    tag: "Client · Vitrine · Livré",
    tagColor: "#059669",
    desc: "Site vitrine pour une entreprise de sécurité électronique et domotique à Dakar. Design et développement complets : présentation des services, solutions par secteur (résidentiel, commercial, industriel) et formulaire de devis.",
    stack: ["Next.js", "CSS", "Vercel"],
    links: { demo: "https://www.odion-technologie.com", github: null },
    highlight: false,
  },
  {
    id: 5,
    name: "SunuGestion",
    tag: "SaaS · En développement actif",
    tagColor: "#7c3aed",
    desc: "Plateforme SaaS multi-tenant de gestion pour les PME sénégalaises. Architecture robuste avec gestion des rôles, isolation des données par tenant, comptabilité SYSCOHADA et tableau de bord analytique.",
    stack: ["Next.js 16", "PostgreSQL 16", "Prisma", "Supabase", "RLS", "TypeScript"],
    links: { demo: null, github: null },
    highlight: false,
  },
  {
    id: 6,
    name: "SamaBus",
    tag: "Application · Projet de fin d'études",
    tagColor: "#059669",
    desc: "Application web de suivi en temps réel des bus Dakar Dem Dikk. Couvre 5 lignes et 10 bus avec un chatbot IA intégré (Groq), un backend PHP simulateur et la géolocalisation via Nominatim.",
    stack: ["React.js", "PHP", "Groq AI", "Nominatim", "Leaflet.js"],
    links: { demo: null, github: "https://github.com/francisdiene" },
    highlight: false,
  },
  {
    id: 7,
    name: "Heritage Connecté",
    tag: "Hackathon · 48h",
    tagColor: "#7c3aed",
    desc: "Application de guidage interactif pour musée développée en 48h lors d'un hackathon. Scanner QR Code fonctionnel, gestion des favoris et interface immersive de navigation.",
    stack: ["React.js", "JavaScript", "Vercel", "LocalStorage"],
    links: { demo: "https://heritage-connecte-final.vercel.app", github: "https://github.com/francisdiene/Heritage-Connecte-Final" },
    highlight: false,
  },
];

const EXPERIENCES = [
  {
    role: "Agent Commercial",
    company: "SunuCode",
    period: "2025",
    desc: "Développement commercial des solutions logicielles de l'agence (Semplio, ImmoPay, Yobali, TikTak). Prospection terrain sur le marché dakarois, présentation produit et suivi des dossiers partenaires.",
  },
  {
    role: "Développeur Freelance",
    company: "Teranga Dev",
    period: "2025 — Présent",
    desc: "Conception et livraison de plateformes web pour clients locaux et internationaux : e-commerce, sites institutionnels, panels d'administration, intégrations API et paiement mobile.",
  },
  {
    role: "Instructeur — Camp d'été de codage",
    company: "ICAGI · Dakar",
    period: "Été 2026",
    desc: "Conception et animation de deux modules d'initiation à la programmation (Scratch, Python, HTML/CSS) pour un public lycéen, supports pédagogiques inclus.",
  },
  {
    role: "Étudiant en Génie Logiciel",
    company: "ICAGI Amadou Mactar Mbow · Dakar",
    period: "2023 — 2026",
    desc: "Formation en développement logiciel, dernière année. Mémoire de fin d'études soutenu en 2026 sur une plateforme e-learning adaptative pour l'enseignement au Sénégal.",
  },
];

const LIGHT_THEME = {
  "--bg": "#f8f9fc",
  "--bg-alt": "#ffffff",
  "--surface": "#ffffff",
  "--surface-alt": "#f8f9fc",
  "--chip-bg": "#f1f5f9",
  "--border": "#e5e7eb",
  "--text": "#111827",
  "--text-muted": "#6b7280",
  "--text-faint": "#9ca3af",
  "--accent": "#2563eb",
  "--accent-hover": "#1d4ed8",
  "--accent-bg": "#eff6ff",
  "--accent-border": "#bfdbfe",
  "--accent-border-hover": "#dbeafe",
  "--success": "#16a34a",
  "--success-bg": "#f0fdf4",
  "--nav-bg": "rgba(255,255,255,0.92)",
  "--scrollbar-track": "#f1f5f9",
  "--scrollbar-thumb": "#cbd5e1",
  "--highlight-grad": "linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)",
  "--shadow-soft": "0 8px 40px rgba(0,0,0,0.06)",
  "--shadow-card": "0 8px 32px rgba(37,99,235,0.1)",
};

const DARK_THEME = {
  "--bg": "#0a0e17",
  "--bg-alt": "#0f1420",
  "--surface": "#131a2a",
  "--surface-alt": "#0f1420",
  "--chip-bg": "#1b2436",
  "--border": "#232d42",
  "--text": "#f1f5f9",
  "--text-muted": "#94a3b8",
  "--text-faint": "#64748b",
  "--accent": "#3b82f6",
  "--accent-hover": "#60a5fa",
  "--accent-bg": "rgba(59,130,246,0.14)",
  "--accent-border": "rgba(59,130,246,0.4)",
  "--accent-border-hover": "rgba(59,130,246,0.6)",
  "--success": "#4ade80",
  "--success-bg": "rgba(74,222,128,0.12)",
  "--nav-bg": "rgba(10,14,23,0.85)",
  "--scrollbar-track": "#0f1420",
  "--scrollbar-thumb": "#2a3550",
  "--highlight-grad": "linear-gradient(135deg, #131a2a 0%, #16203a 100%)",
  "--shadow-soft": "0 8px 40px rgba(0,0,0,0.4)",
  "--shadow-card": "0 8px 32px rgba(59,130,246,0.15)",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Le thème doit être lu après le montage : localStorage et matchMedia
  // n'existent pas côté serveur, et l'initialiser en amont provoquerait
  // une erreur d'hydratation. Ce setState post-montage est volontaire.
  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(stored ? stored === "dark" : prefersDark);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("francoisdiene306@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionMap = {
    "Accueil": "hero",
    "Compétences": "skills",
    "Projets": "projects",
    "Expérience": "experience",
    "Contact": "contact",
  };

  const themeVars = dark ? DARK_THEME : LIGHT_THEME;

  return (
    <div
      style={{
        ...themeVars,
        fontFamily: "'Sora', 'DM Sans', sans-serif",
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
        ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 3px; }
        a { text-decoration: none; color: inherit; }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--accent);
          background: var(--accent-bg);
        }

        .theme-toggle {
          height: 36px;
          padding: 0 14px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          color: var(--text);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.78rem;
          font-weight: 600;
          transition: border-color 0.2s, transform 0.15s;
        }
        .theme-toggle:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.3);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          color: var(--text);
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid var(--border);
          transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .btn-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-1px);
          box-shadow: var(--shadow-soft);
        }

        .skill-tag {
          display: inline-block;
          background: var(--surface);
          border: 1.5px solid var(--border);
          color: var(--text);
          border-radius: 8px;
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .skill-tag:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-2px);
        }

        .project-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .project-card:hover {
          border-color: var(--accent-border);
          box-shadow: var(--shadow-card);
          transform: translateY(-3px);
        }
        .project-card.highlight {
          border-color: var(--accent-border);
          background: var(--highlight-grad);
        }

        .exp-item {
          display: flex;
          gap: 24px;
          position: relative;
        }
        .exp-item::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 40px;
          bottom: -24px;
          width: 1px;
          background: var(--border);
        }
        .exp-item:last-child::before { display: none; }

        .link-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-bg);
          border: 1px solid var(--accent-border);
          padding: 5px 12px;
          border-radius: 6px;
          transition: background 0.2s, transform 0.15s;
        }
        .link-chip:hover {
          background: var(--accent-border-hover);
          transform: translateY(-1px);
        }
        .link-chip.disabled {
          color: var(--text-faint);
          background: var(--surface-alt);
          border-color: var(--border);
          cursor: default;
        }
        .link-chip.disabled:hover { transform: none; }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 20px 24px;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .contact-item:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-card);
        }

        .mobile-toggle { display: none; }
        .mobile-menu { display: none; }

        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
          .mobile-menu { display: ${menuOpen ? "flex" : "none"} !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", color: "var(--text)" }}>
            François<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <span
                key={link}
                className={`nav-link ${active === link ? "active" : ""}`}
                onClick={() => { setActive(link); scrollTo(sectionMap[link]); }}
              >{link}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              className="theme-toggle"
              onClick={() => setDark(d => !d)}
              aria-label="Changer de thème"
              title={dark ? "Passer en mode clair" : "Passer en mode sombre"}
            >{dark ? "Clair" : "Sombre"}</button>
            <button
              className="btn-primary desktop-nav"
              style={{ padding: "8px 18px", fontSize: "0.8rem" }}
              onClick={() => scrollTo("contact")}
            >Me contacter</button>
            <button
              className="theme-toggle mobile-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Ouvrir le menu"
            >{menuOpen ? "Fermer" : "Menu"}</button>
          </div>
        </div>
        <div className="mobile-menu" style={{ flexDirection: "column", padding: "8px 0 20px", gap: 4 }}>
          {NAV_LINKS.map(link => (
            <span
              key={link}
              className={`nav-link ${active === link ? "active" : ""}`}
              style={{ textAlign: "center", padding: "12px" }}
              onClick={() => { setActive(link); scrollTo(sectionMap[link]); }}
            >{link}</span>
          ))}
          <button
            className="btn-primary"
            style={{ margin: "8px 16px 0", justifyContent: "center" }}
            onClick={() => scrollTo("contact")}
          >Me contacter</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 24px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--accent-bg)", border: "1px solid var(--accent-border)",
                borderRadius: 20, padding: "6px 14px", marginBottom: 24,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }}></span>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--accent)" }}>Disponible pour des missions</span>
              </div>

              <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>
                François Codé<br />
                <span style={{ color: "var(--accent)" }}>Diene</span>
              </h1>

              <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "var(--text-muted)", marginBottom: 12 }}>
                Développeur Full-Stack · CEO Teranga Dev
              </p>

              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
                Développeur full-stack basé à Dakar, en dernière année de Génie Logiciel, je conçois des solutions web modernes avec{" "}
                <strong style={{ color: "var(--text)" }}>Next.js, TypeScript, Prisma et PostgreSQL</strong>.
                Je construis <strong style={{ color: "var(--text)" }}>TerangaLearn</strong>, une plateforme e-learning gamifiée pour les élèves sénégalais.
              </p>

              <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("projects")}>
                  Voir mes projets →
                </button>
                <a href="mailto:francoisdiene306@gmail.com" className="btn-secondary">
                  francoisdiene306@gmail.com
                </a>
              </div>

              <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
                {[["3+", "Années d'XP"], ["15+", "Projets livrés"], ["3", "Rôles actifs"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>{n}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-faint)", fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar / Card décoratif */}
            <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{
                width: 320, background: "var(--surface)", border: "1.5px solid var(--border)",
                borderRadius: 20, padding: 32, boxShadow: "var(--shadow-soft)",
              }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg, #2563eb, #7c3aed)", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>FD</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4, color: "var(--text)" }}>François Codé Diene</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 20 }}>Dakar, Sénégal</div>
                {["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase"].map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }}></div>
                    <span style={{ fontSize: "0.82rem", color: "var(--text)", fontWeight: 500 }}>{s}</span>
                  </div>
                ))}
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
                  <a href="https://github.com/francisdiene" target="_blank" rel="noreferrer"
                    style={{ flex: 1, background: "var(--surface-alt)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px", textAlign: "center", fontSize: "0.78rem", fontWeight: 600, color: "var(--text)", transition: "all 0.2s" }}>
                    GitHub
                  </a>
                  <button onClick={() => scrollTo("contact")}
                    style={{ flex: 1, background: "var(--accent)", border: "none", borderRadius: 8, padding: "8px", fontSize: "0.78rem", fontWeight: 600, color: "#fff", cursor: "pointer", transition: "all 0.2s" }}>
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section id="skills" style={{ padding: "100px 24px", background: "var(--bg-alt)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Stack technique</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Compétences</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 56, maxWidth: 500 }}>
              Mon écosystème technique pour créer des applications web robustes, du frontend au backend.
            </p>
          </FadeIn>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.1}>
                <div style={{ background: "var(--surface-alt)", border: "1.5px solid var(--border)", borderRadius: 16, padding: 28 }}>
                  <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 18, color: "var(--text)" }}>{cat}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projects" style={{ padding: "100px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Réalisations</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Projets</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 56, maxWidth: 500 }}>
              Des projets concrets qui reflètent mes compétences en développement full-stack.
            </p>
          </FadeIn>
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.12}>
                <div className={`project-card ${p.highlight ? "highlight" : ""}`}>
                  {p.highlight && (
                    <div style={{ position: "absolute", top: 20, right: 20, background: "var(--accent)", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                      Featured
                    </div>
                  )}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.tagColor, display: "inline-block" }}></span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: p.tagColor }}>{p.tag}</span>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: 12, letterSpacing: "-0.01em", color: "var(--text)" }}>{p.name}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                    {p.stack.map(t => (
                      <span key={t} style={{ background: "var(--chip-bg)", color: "var(--text-muted)", fontSize: "0.72rem", fontWeight: 600, padding: "3px 10px", borderRadius: 6 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {p.links.demo
                      ? <a href={p.links.demo} target="_blank" rel="noreferrer" className="link-chip">Voir le projet</a>
                      : <span className="link-chip disabled">Privé / En cours</span>
                    }
                    {p.links.github
                      ? <a href={p.links.github} target="_blank" rel="noreferrer" className="link-chip">GitHub</a>
                      : null
                    }
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPÉRIENCE */}
      <section id="experience" style={{ padding: "100px 24px", background: "var(--bg-alt)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Parcours</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 56 }}>Expérience</h2>
          </FadeIn>
          <div style={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 32 }}>
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="exp-item">
                  <div style={{ flex: "0 0 40px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent-bg)", border: "1.5px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div style={{ flex: 1, paddingBottom: i < EXPERIENCES.length - 1 ? 32 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                      <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{exp.role}</h3>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", background: "var(--chip-bg)", padding: "2px 10px", borderRadius: 20 }}>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)", marginBottom: 8 }}>{exp.company}</div>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{exp.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Travaillons ensemble</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 48, lineHeight: 1.7 }}>
              Disponible pour des missions freelance, des collaborations ou des opportunités full-time. N&apos;hésitez pas à me contacter.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="contact-item" onClick={copyEmail}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)", flex: "0 0 44px" }}>
                  @
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-faint)", fontWeight: 500, marginBottom: 2 }}>Email</div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>francoisdiene306@gmail.com</div>
                </div>
                <span style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 600 }}>
                  {copied ? "Copié !" : "Copier"}
                </span>
              </div>

              <a href="https://github.com/francisdiene" target="_blank" rel="noreferrer" className="contact-item" style={{ textDecoration: "none" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--chip-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: "var(--text)", flex: "0 0 44px" }}>
                  GH
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-faint)", fontWeight: 500, marginBottom: 2 }}>GitHub</div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>github.com/francisdiene</div>
                </div>
                <span style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 600 }}>Visiter →</span>
              </a>

              <div className="contact-item" style={{ cursor: "default" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--success-bg)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 44px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }}></div>
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-faint)", fontWeight: 500, marginBottom: 2 }}>Localisation</div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>Dakar, Sénégal</div>
                </div>
                <span style={{ fontSize: "0.78rem", color: "var(--success)", fontWeight: 600 }}>Disponible</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-alt)", padding: "28px 24px", textAlign: "center" }}>
        <span style={{ fontSize: "0.82rem", color: "var(--text-faint)" }}>
          © 2026 François Codé Diene · Développé avec React à Dakar
        </span>
      </footer>
    </div>
  );
}
