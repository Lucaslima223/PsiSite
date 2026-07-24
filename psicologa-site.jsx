import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, MessageCircle, ChevronDown, Phone, Mail, MapPin, Clock,
  Instagram, ShieldCheck, Heart, Users, Brain, CloudRain, Sparkles,
  Sun, Leaf, ArrowRight, Image as ImageIcon
} from 'lucide-react';

/* ------------------------------------------------------------------
   CONFIGURAÇÃO — troque pelos dados reais antes de publicar
------------------------------------------------------------------- */
const NOME = 'Helena Duarte';
const CRP = 'CRP 06/123456';
const WHATSAPP_NUMBER = '5511999999999'; // formato: 55 + DDD + número, sem espaços/símbolos

function waLink(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

/* ------------------------------------------------------------------
   Reveal on scroll
------------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Selo do CRP — elemento assinatura, reaparece pelo site
------------------------------------------------------------------- */
function Selo({ size = 'md' }) {
  return (
    <div className={`selo selo-${size}`} role="img" aria-label={`Selo de registro profissional, ${CRP}`}>
      <div className="selo-ring">
        <Leaf size={size === 'lg' ? 22 : 13} strokeWidth={1.6} className="selo-leaf" />
        <span className="selo-label">CRP</span>
        <span className="selo-num">{CRP.replace('CRP ', '')}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Placeholder de imagem
------------------------------------------------------------------- */
function ImagePlaceholder({ label, ratio = '4 / 5', shape = 'arch', className = '' }) {
  return (
    <div
      className={`img-placeholder img-placeholder--${shape} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <ImageIcon size={26} strokeWidth={1.4} />
      <span>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   FAQ
------------------------------------------------------------------- */
function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-open' : ''}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{q}</span>
        <ChevronDown size={19} className="faq-chevron" />
      </button>
      <div className="faq-answer-wrap">
        <div className="faq-answer-inner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Dados de conteúdo
------------------------------------------------------------------- */
const ajudaCards = [
  {
    icon: CloudRain,
    title: 'Ansiedade e pensamentos acelerados',
    desc: 'Entender o que dispara a ansiedade e construir formas mais leves de lidar com o dia a dia.'
  },
  {
    icon: Heart,
    title: 'Autoestima e autoconhecimento',
    desc: 'Reconstruir a relação com você mesmo(a), com mais clareza sobre quem você é e o que você quer.'
  },
  {
    icon: Users,
    title: 'Relacionamentos e vínculos',
    desc: 'Compreender padrões que se repetem em relações afetivas, familiares e no trabalho.'
  },
  {
    icon: Brain,
    title: 'Estresse e sobrecarga emocional',
    desc: 'Criar limites mais saudáveis e recuperar espaço mental em rotinas exigentes.'
  },
  {
    icon: Sun,
    title: 'Luto e perdas significativas',
    desc: 'Um espaço seguro para elaborar perdas, no seu tempo, sem pressa e sem julgamento.'
  },
  {
    icon: Sparkles,
    title: 'Transições de vida',
    desc: 'Mudanças de carreira, maternidade/paternidade, mudanças de cidade — apoio para decidir com mais segurança.'
  }
];

const etapas = [
  {
    n: '01',
    title: 'Primeiro contato',
    desc: 'Você me chama no WhatsApp e conta, em poucas palavras, o que te trouxe até aqui. Combinamos o melhor horário.'
  },
  {
    n: '02',
    title: 'Sessão de acolhimento',
    desc: 'Nos conhecemos com calma: você compartilha sua história e alinhamos juntas como o processo vai funcionar.'
  },
  {
    n: '03',
    title: 'Acompanhamento contínuo',
    desc: 'Sessões semanais ou quinzenais, no seu ritmo, construindo clareza emocional e ferramentas para o dia a dia.'
  }
];

const perguntas = [
  {
    q: 'Como funciona a primeira sessão?',
    a: 'A primeira sessão é um momento de acolhimento: conversamos sobre o que te trouxe à terapia, sua história e suas expectativas. A partir daí, construímos juntas um plano de acompanhamento que faça sentido para você.'
  },
  {
    q: 'O atendimento é presencial ou online?',
    a: 'Ofereço as duas modalidades. O atendimento presencial acontece no consultório, e o atendimento online é feito por videochamada, com a mesma qualidade e sigilo do presencial.'
  },
  {
    q: 'Qual a frequência e a duração das sessões?',
    a: 'Normalmente as sessões acontecem semanalmente e duram cerca de 50 minutos. A frequência pode ser ajustada ao longo do processo, de acordo com a sua necessidade.'
  },
  {
    q: 'O sigilo das informações é garantido?',
    a: 'Sim. O sigilo profissional é um princípio ético fundamental da psicologia, previsto no Código de Ética Profissional e fiscalizado pelo Conselho Regional de Psicologia. Tudo o que é dito em sessão permanece confidencial.'
  },
  {
    q: 'Como faço para agendar minha sessão?',
    a: 'É simples: clique em um dos botões de WhatsApp espalhados pelo site e me conte um pouco sobre o que você procura. Eu respondo o quanto antes para combinarmos o melhor horário.'
  },
  {
    q: 'Vocês emitem recibo para reembolso de plano de saúde?',
    a: 'Sim, emito recibos com os dados profissionais e o número de registro no Conselho Regional de Psicologia, que podem ser usados para solicitar reembolso junto ao seu plano de saúde.'
  }
];

const credenciais = [
  'Graduação em Psicologia — Universidade de São Paulo (USP)',
  'Especialização em Terapia Cognitivo-Comportamental',
  'Abordagem humanista, com escuta ativa e acolhimento',
  'Mais de 8 anos de experiência em atendimento clínico'
];

/* ------------------------------------------------------------------
   Componente principal
------------------------------------------------------------------- */
export default function PsicologaSite() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [faqAberta, setFaqAberta] = useState(0);

  const navLinks = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#ajuda', label: 'Como posso ajudar' },
    { href: '#processo', label: 'Como funciona' },
    { href: '#faq', label: 'Perguntas frequentes' },
    { href: '#contato', label: 'Contato' }
  ];

  return (
    <div className="psi-site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&display=swap');

        .psi-site {
          --paper: #F4EFE3;
          --paper-deep: #EBE2CC;
          --cream-card: #FBF8F1;
          --sand: #E3D5B4;
          --ink: #2A2E25;
          --ink-soft: rgba(42,46,37,0.72);
          --forest: #55694C;
          --forest-deep: #3D4C37;
          --dusk: #262F20;
          --dusk-2: #1E2519;
          --mauve: #A9677A;
          --mauve-deep: #8E4F61;
          --cream-on-dusk: #F1ECDC;
          --whatsapp: #25D366;
          --whatsapp-deep: #1DA851;
          font-family: 'Work Sans', sans-serif;
          background: var(--paper);
          color: var(--ink);
          overflow-x: hidden;
        }
        .psi-site * { box-sizing: border-box; }
        .psi-site img { max-width: 100%; display: block; }
        .psi-site a { color: inherit; }
        .psi-site button { font-family: inherit; }
        .psi-site :focus-visible {
          outline: 2.5px solid var(--mauve);
          outline-offset: 3px;
          border-radius: 4px;
        }

        .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding-left: 1.4rem;
          padding-right: 1.4rem;
        }
        @media (min-width: 768px) {
          .wrap { padding-left: 2.5rem; padding-right: 2.5rem; }
        }

        .eyebrow {
          font-family: 'Work Sans', sans-serif;
          font-weight: 600;
          font-size: 0.74rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--forest);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .eyebrow::before {
          content: '';
          width: 22px;
          height: 1.5px;
          background: var(--mauve);
        }

        h1, h2, h3 { font-family: 'Fraunces', serif; margin: 0; color: var(--ink); }
        h1 { font-weight: 600; letter-spacing: -0.01em; }
        h2 { font-weight: 600; letter-spacing: -0.005em; }
        p { line-height: 1.7; color: var(--ink-soft); margin: 0; }

        .section { padding: 4.5rem 0; }
        @media (min-width: 768px) { .section { padding: 6.5rem 0; } }
        .section-alt { background: var(--cream-card); }
        .section-sand { background: var(--paper-deep); }

        /* ---------- reveal ---------- */
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
        }

        /* ---------- botões ---------- */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.95rem 1.7rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
          white-space: nowrap;
        }
        .btn-whatsapp {
          background: var(--whatsapp);
          color: #fff;
          box-shadow: 0 10px 24px rgba(37,211,102,0.32);
        }
        .btn-whatsapp:hover { background: var(--whatsapp-deep); transform: translateY(-2px); }
        .btn-outline {
          background: transparent;
          border: 1.5px solid var(--ink);
          color: var(--ink);
        }
        .btn-outline:hover { background: var(--ink); color: var(--paper); }
        .btn-cream {
          background: var(--cream-on-dusk);
          color: var(--dusk-2);
        }
        .btn-cream:hover { background: #fff; transform: translateY(-2px); }
        .btn-sm { padding: 0.7rem 1.3rem; font-size: 0.85rem; }

        /* ---------- header ---------- */
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(244,239,227,0.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(42,46,37,0.08);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 0;
        }
        .brand { display: flex; align-items: center; gap: 0.7rem; text-decoration: none; }
        .brand-name { font-family: 'Fraunces', serif; font-weight: 600; font-size: 1.15rem; line-height: 1.1; }
        .brand-tag { font-size: 0.72rem; color: var(--forest); font-weight: 600; letter-spacing: 0.04em; }
        .nav-desktop { display: none; align-items: center; gap: 2rem; }
        @media (min-width: 900px) { .nav-desktop { display: flex; } }
        .nav-link {
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--ink);
          position: relative;
          padding-bottom: 3px;
        }
        .nav-link::after {
          content: '';
          position: absolute; left: 0; right: 100%; bottom: 0;
          height: 1.5px; background: var(--mauve);
          transition: right .25s ease;
        }
        .nav-link:hover::after { right: 0; }
        .header-cta { display: none; }
        @media (min-width: 900px) { .header-cta { display: inline-flex; } }
        .menu-btn {
          display: inline-flex;
          background: none; border: none; cursor: pointer;
          padding: 0.4rem; color: var(--ink);
        }
        @media (min-width: 900px) { .menu-btn { display: none; } }

        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height .35s ease;
          background: var(--cream-card);
          border-bottom: 1px solid rgba(42,46,37,0.08);
        }
        .mobile-menu.open { max-height: 420px; }
        .mobile-menu-inner {
          display: flex; flex-direction: column;
          padding: 1rem 1.4rem 1.6rem;
          gap: 0.9rem;
        }
        .mobile-menu-inner a {
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          color: var(--ink);
          padding: 0.35rem 0;
        }

        /* ---------- hero ---------- */
        .hero {
          padding: 3rem 0 4.5rem;
          position: relative;
        }
        @media (min-width: 900px) { .hero { padding: 5rem 0 6rem; } }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.8rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1.05fr 0.95fr; gap: 3.5rem; }
        }
        .hero h1 { font-size: clamp(2.1rem, 4.6vw + 0.8rem, 3.6rem); line-height: 1.08; margin: 1rem 0 1.3rem; }
        .hero-sub { font-size: 1.06rem; max-width: 46ch; margin-bottom: 1.9rem; }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 0.9rem; align-items: center; }
        .hero-trust {
          display: flex; align-items: center; gap: 0.8rem;
          margin-top: 2rem; padding-top: 1.7rem;
          border-top: 1px solid rgba(42,46,37,0.12);
        }
        .hero-trust-text { font-size: 0.82rem; color: var(--ink-soft); line-height: 1.4; }
        .hero-trust-text strong { color: var(--ink); font-weight: 600; }

        .hero-visual { position: relative; }
        .hero-visual .selo { position: absolute; right: -0.5rem; bottom: -1rem; z-index: 3; }
        @media (min-width: 640px) { .hero-visual .selo { right: 0.5rem; bottom: -1.2rem; } }
        .hero-blob {
          position: absolute;
          width: 112%; height: 112%;
          top: -6%; left: -6%;
          background: radial-gradient(circle at 30% 30%, var(--sand), transparent 65%);
          border-radius: 50%;
          z-index: 0;
          animation: breathe 7s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.045); }
        }
        @media (prefers-reduced-motion: reduce) { .hero-blob { animation: none; } }

        /* ---------- placeholders de imagem ---------- */
        .img-placeholder {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
          background: var(--cream-card);
          border: 1.5px dashed rgba(42,46,37,0.3);
          color: var(--ink-soft);
          text-align: center;
          font-size: 0.82rem;
          padding: 1.5rem;
        }
        .img-placeholder svg { opacity: 0.55; }
        .img-placeholder--arch { border-radius: 42% 42% 14px 14px; }
        .img-placeholder--tile { border-radius: 18px; }

        /* ---------- selo (CRP) ---------- */
        .selo { display: inline-flex; }
        .selo-ring {
          position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          border-radius: 50%;
          background: var(--cream-card);
          border: 2px solid var(--forest);
          box-shadow: 0 8px 20px rgba(42,46,37,0.18), inset 0 0 0 5px var(--paper);
          gap: 1px;
        }
        .selo-ring::before {
          content: '';
          position: absolute; inset: 8px;
          border: 1px dashed var(--mauve);
          border-radius: 50%;
        }
        .selo-md .selo-ring { width: 92px; height: 92px; }
        .selo-lg .selo-ring { width: 132px; height: 132px; }
        .selo-leaf { color: var(--forest); margin-bottom: 1px; }
        .selo-label {
          font-family: 'Work Sans', sans-serif; font-weight: 700;
          letter-spacing: 0.08em; color: var(--ink); font-size: 0.72rem;
        }
        .selo-lg .selo-label { font-size: 0.85rem; }
        .selo-num {
          font-family: 'Work Sans', sans-serif; font-weight: 500;
          font-size: 0.62rem; color: var(--ink-soft);
        }
        .selo-lg .selo-num { font-size: 0.75rem; }

        /* ---------- sobre ---------- */
        .sobre-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.6rem; align-items: start;
        }
        @media (min-width: 900px) {
          .sobre-grid { grid-template-columns: 0.85fr 1.15fr; gap: 3.5rem; }
        }
        .credencial-list { list-style: none; padding: 0; margin: 1.6rem 0 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .credencial-list li {
          display: flex; align-items: flex-start; gap: 0.65rem;
          font-size: 0.94rem; color: var(--ink-soft);
        }
        .credencial-list li::before {
          content: ''; flex-shrink: 0; margin-top: 0.5rem;
          width: 6px; height: 6px; border-radius: 50%; background: var(--mauve);
        }
        .crp-card {
          margin-top: 1.8rem;
          display: flex; align-items: center; gap: 1.1rem;
          background: var(--paper-deep);
          border: 1px solid rgba(85,105,76,0.25);
          border-radius: 18px;
          padding: 1.3rem 1.5rem;
        }
        .crp-card h3 { font-size: 1rem; font-family: 'Work Sans', sans-serif; font-weight: 700; margin-bottom: 0.2rem; }
        .crp-card p { font-size: 0.85rem; }
        .crp-card svg { color: var(--forest); flex-shrink: 0; }

        /* ---------- cards de ajuda ---------- */
        .ajuda-intro { max-width: 62ch; margin-top: 1rem; font-size: 1.03rem; }
        .ajuda-grid {
          margin-top: 3rem;
          display: grid; grid-template-columns: 1fr; gap: 1.3rem;
        }
        @media (min-width: 640px) { .ajuda-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .ajuda-grid { grid-template-columns: repeat(3, 1fr); } }
        .ajuda-card {
          background: var(--cream-card);
          border-radius: 20px;
          padding: 1.8rem 1.6rem;
          border: 1px solid rgba(42,46,37,0.07);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .ajuda-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(42,46,37,0.1); }
        .ajuda-icon {
          width: 46px; height: 46px; border-radius: 13px;
          background: var(--paper-deep);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.1rem; color: var(--forest);
        }
        .ajuda-card h3 { font-family: 'Work Sans', sans-serif; font-size: 1.02rem; font-weight: 700; margin-bottom: 0.55rem; line-height: 1.3; }
        .ajuda-card p { font-size: 0.9rem; }

        /* ---------- galeria ---------- */
        .galeria-grid {
          margin-top: 2.8rem;
          display: grid; grid-template-columns: 1fr; gap: 1.1rem;
        }
        @media (min-width: 768px) { .galeria-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ---------- processo ---------- */
        .processo-grid {
          margin-top: 3rem;
          display: grid; grid-template-columns: 1fr; gap: 2.4rem;
        }
        @media (min-width: 768px) { .processo-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; } }
        .etapa-num {
          font-family: 'Fraunces', serif; font-size: 2.6rem; font-weight: 500;
          color: var(--sand); line-height: 1; margin-bottom: 0.9rem;
        }
        .etapa h3 { font-family: 'Work Sans', sans-serif; font-size: 1.08rem; font-weight: 700; margin-bottom: 0.5rem; }
        .etapa p { font-size: 0.92rem; }

        /* ---------- FAQ ---------- */
        .faq-list { margin-top: 2.6rem; display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid rgba(42,46,37,0.13); }
        .faq-item:first-child { border-top: 1px solid rgba(42,46,37,0.13); }
        .faq-question {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          background: none; border: none; cursor: pointer;
          padding: 1.35rem 0.2rem;
          text-align: left;
          font-family: 'Work Sans', sans-serif; font-weight: 600; font-size: 1rem;
          color: var(--ink);
        }
        .faq-chevron { transition: transform .3s ease; flex-shrink: 0; color: var(--forest); }
        .faq-open .faq-chevron { transform: rotate(180deg); }
        .faq-answer-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
        .faq-open .faq-answer-wrap { grid-template-rows: 1fr; }
        .faq-answer-inner { overflow: hidden; }
        .faq-answer-inner p { font-size: 0.93rem; padding: 0 0.2rem 1.4rem; max-width: 62ch; }

        /* ---------- CTA final ---------- */
        .cta-final {
          background: linear-gradient(160deg, var(--dusk) 0%, var(--dusk-2) 100%);
          color: var(--cream-on-dusk);
          padding: 5rem 0;
          text-align: center;
        }
        .cta-final .eyebrow { color: var(--sand); }
        .cta-final .eyebrow::before { background: var(--mauve); }
        .cta-final h2 { color: var(--cream-on-dusk); font-size: clamp(1.8rem, 3.4vw + 1rem, 2.9rem); max-width: 22ch; margin: 1rem auto 1.1rem; }
        .cta-final p { color: rgba(241,236,220,0.78); max-width: 52ch; margin: 0 auto 2.2rem; }

        /* ---------- footer ---------- */
        .footer { background: var(--dusk-2); color: var(--cream-on-dusk); padding: 4rem 0 2rem; }
        .footer-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.6rem;
          padding-bottom: 2.8rem; border-bottom: 1px solid rgba(241,236,220,0.14);
        }
        @media (min-width: 768px) { .footer-grid { grid-template-columns: 1.1fr 1fr 1fr; gap: 2rem; } }
        .footer-brand { display: flex; align-items: center; gap: 1rem; }
        .footer-brand h3 { color: var(--cream-on-dusk); font-size: 1.25rem; }
        .footer-brand p { color: rgba(241,236,220,0.65); font-size: 0.85rem; margin-top: 0.2rem; }
        .footer h4 {
          font-family: 'Work Sans', sans-serif; font-weight: 700; font-size: 0.82rem;
          text-transform: uppercase; letter-spacing: 0.1em; color: var(--sand);
          margin-bottom: 1.1rem;
        }
        .footer-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-list li { display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: rgba(241,236,220,0.85); }
        .footer-list a { text-decoration: none; color: inherit; }
        .footer-list a:hover { color: #fff; }
        .footer-list svg { flex-shrink: 0; color: var(--mauve); }
        .footer-bottom {
          display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;
          padding-top: 1.8rem; font-size: 0.78rem; color: rgba(241,236,220,0.55);
        }

        /* ---------- botão flutuante whatsapp ---------- */
        .wa-float {
          position: fixed;
          right: 1.2rem;
          bottom: calc(1.2rem + env(safe-area-inset-bottom, 0px));
          z-index: 60;
          width: 58px; height: 58px;
          border-radius: 50%;
          background: var(--whatsapp);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          box-shadow: 0 10px 26px rgba(37,211,102,0.45);
        }
        .wa-float::before {
          content: '';
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--whatsapp);
          animation: pulse-ring 2.2s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .wa-float::before { animation: none; } }
      `}</style>

      {/* ---------------- HEADER ---------------- */}
      <header className="header">
        <div className="wrap header-inner">
          <a href="#topo" className="brand">
            <Selo size="md" />
            <span>
              <span className="brand-name" style={{ display: 'block' }}>{NOME}</span>
              <span className="brand-tag">Psicóloga Clínica · {CRP}</span>
            </span>
          </a>

          <nav className="nav-desktop">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>

          <a
            href={waLink(`Olá, ${NOME}! Gostaria de agendar uma conversa inicial.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm header-cta"
          >
            <MessageCircle size={17} /> Agendar conversa
          </a>

          <button
            className="menu-btn"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((v) => !v)}
          >
            {menuAberto ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <div className={`mobile-menu ${menuAberto ? 'open' : ''}`}>
          <div className="mobile-menu-inner">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuAberto(false)}>{l.label}</a>
            ))}
            <a
              href={waLink(`Olá, ${NOME}! Gostaria de agendar uma conversa inicial.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ marginTop: '0.4rem', justifyContent: 'center' }}
            >
              <MessageCircle size={18} /> Agendar conversa
            </a>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="hero" id="topo">
        <div className="wrap hero-grid">
          <Reveal>
            <span className="eyebrow">Psicoterapia individual · Presencial e online</span>
            <h1>Um espaço só seu para se escutar com cuidado.</h1>
            <p className="hero-sub">
              Sou {NOME}, psicóloga clínica, e ofereço acompanhamento acolhedor para quem
              busca entender melhor os próprios sentimentos, escolhas e histórias — no seu
              tempo, sem pressa.
            </p>
            <div className="hero-ctas">
              <a
                href={waLink(`Olá, ${NOME}! Gostaria de agendar uma conversa inicial.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={19} /> Conversar no WhatsApp
              </a>
              <a href="#ajuda" className="btn btn-outline">
                Ver como posso ajudar <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-trust">
              <ShieldCheck size={30} color="#55694C" style={{ flexShrink: 0 }} />
              <p className="hero-trust-text">
                <strong>Atendimento sigiloso</strong><br />
                Psicóloga registrada no Conselho Regional de Psicologia — {CRP}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="hero-visual">
              <div className="hero-blob" />
              <ImagePlaceholder
                label="Foto profissional — retrato (proporção 4:5)"
                ratio="4 / 5"
                shape="arch"
              />
              <Selo size="lg" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SOBRE ---------------- */}
      <section className="section section-alt" id="sobre">
        <div className="wrap sobre-grid">
          <Reveal>
            <ImagePlaceholder label="Foto no consultório ou em atendimento" ratio="4 / 5" shape="arch" />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Sobre mim</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 2.6vw + 1rem, 2.5rem)', marginTop: '0.9rem', marginBottom: '1.2rem' }}>
              Psicologia com escuta, ética e presença.
            </h2>
            <p style={{ fontSize: '1rem' }}>
              Acredito que a terapia é, antes de tudo, um encontro: um espaço onde você pode
              falar sem medo de ser julgado(a) e ser ouvido(a) com atenção genuína. Trabalho
              com uma abordagem humanista, com influências da Terapia Cognitivo-Comportamental,
              sempre respeitando o tempo e a história de cada pessoa.
            </p>
            <ul className="credencial-list">
              {credenciais.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <div className="crp-card">
              <ShieldCheck size={32} />
              <div>
                <h3>Registro profissional ativo — {CRP}</h3>
                <p>Inscrita no Conselho Regional de Psicologia, em conformidade com o Código de Ética Profissional.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- COMO A TERAPIA PODE AJUDAR ---------------- */}
      <section className="section" id="ajuda">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Como posso ajudar</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw + 1rem, 2.7rem)', marginTop: '0.9rem' }}>
              Como a terapia pode te ajudar
            </h2>
            <p className="ajuda-intro">
              Cada processo terapêutico é único. Estas são algumas das questões que costumam
              trazer as pessoas até o consultório — talvez você se reconheça em uma, em várias,
              ou em nenhuma delas. Tudo bem: o primeiro passo é só conversar.
            </p>
          </Reveal>

          <div className="ajuda-grid">
            {ajudaCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 70}>
                  <div className="ajuda-card">
                    <div className="ajuda-icon"><Icon size={22} strokeWidth={1.7} /></div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- GALERIA / ESPAÇO ---------------- */}
      <section className="section section-sand" id="espaco">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">O espaço</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 2.6vw + 1rem, 2.5rem)', marginTop: '0.9rem', maxWidth: '20ch' }}>
              Um ambiente pensado para o seu conforto.
            </h2>
          </Reveal>
          <div className="galeria-grid">
            <Reveal><ImagePlaceholder label="Sala de atendimento" ratio="1 / 1" shape="tile" /></Reveal>
            <Reveal delay={80}><ImagePlaceholder label="Recepção / sala de espera" ratio="1 / 1" shape="tile" /></Reveal>
            <Reveal delay={160}><ImagePlaceholder label="Detalhe do ambiente" ratio="1 / 1" shape="tile" /></Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- PROCESSO ---------------- */}
      <section className="section section-alt" id="processo">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Como funciona</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 2.6vw + 1rem, 2.5rem)', marginTop: '0.9rem', maxWidth: '24ch' }}>
              Da primeira mensagem ao seu processo terapêutico.
            </h2>
          </Reveal>
          <div className="processo-grid">
            {etapas.map((etapa, i) => (
              <Reveal key={etapa.n} delay={i * 100}>
                <div className="etapa">
                  <div className="etapa-num">{etapa.n}</div>
                  <h3>{etapa.title}</h3>
                  <p>{etapa.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section" id="faq">
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw + 1rem, 2.7rem)', marginTop: '0.9rem' }}>
              Perguntas Frequentes
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="faq-list">
              {perguntas.map((item, i) => (
                <FaqItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  isOpen={faqAberta === i}
                  onToggle={() => setFaqAberta(faqAberta === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div style={{ marginTop: '2.6rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '1.2rem' }}>Não encontrou sua dúvida?</p>
              <a
                href={waLink('Olá! Tenho uma dúvida sobre o atendimento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} /> Perguntar no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA FINAL ---------------- */}
      <section className="cta-final">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Dê o primeiro passo</span>
            <h2>Buscar ajuda também é um ato de cuidado com você mesmo(a).</h2>
            <p>
              Marque uma conversa inicial sem compromisso. É por ali que muitos processos
              terapêuticos começam.
            </p>
            <a
              href={waLink(`Olá, ${NOME}! Gostaria de agendar minha conversa inicial.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cream"
            >
              <MessageCircle size={19} /> Agendar minha conversa inicial
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer" id="contato">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <Selo size="lg" />
                <div>
                  <h3>{NOME}</h3>
                  <p>Psicóloga Clínica<br />{CRP}</p>
                </div>
              </div>
            </div>

            <div>
              <h4>Contato</h4>
              <ul className="footer-list">
                <li>
                  <Phone size={16} />
                  <a href={waLink(`Olá, ${NOME}!`)} target="_blank" rel="noopener noreferrer">
                    (11) 99999-9999 · WhatsApp
                  </a>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:contato@helenaduarte.com.br">contato@helenaduarte.com.br</a>
                </li>
                <li>
                  <Instagram size={16} />
                  <a href="#" target="_blank" rel="noopener noreferrer">@helenaduarte.psi</a>
                </li>
              </ul>
            </div>

            <div>
              <h4>Atendimento</h4>
              <ul className="footer-list">
                <li><MapPin size={16} /> Rua Exemplo, 123 — São Paulo/SP (e online)</li>
                <li><Clock size={16} /> Segunda a sexta, 8h às 19h</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {NOME} — Psicóloga. {CRP}.</span>
            <span>Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>

      {/* ---------------- BOTÃO FLUTUANTE ---------------- */}
      <a
        href={waLink(`Olá, ${NOME}! Gostaria de agendar uma conversa.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle size={27} />
      </a>
    </div>
  );
}
