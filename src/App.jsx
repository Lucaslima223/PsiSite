import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, MessageCircle, ChevronDown, Phone, Mail, Video, Clock,
  Instagram, ShieldCheck, Heart, Users, Brain, CloudRain, Sparkles,
  Sun, Leaf, ArrowRight
} from 'lucide-react';
import fotoPerfil from './images/DSC00038.png';

/* ------------------------------------------------------------------
   CONFIGURAÇÃO — troque pelos dados reais antes de publicar
------------------------------------------------------------------- */
const NOME = 'Vanessa de Campos Francisco';
const CRP = 'CRP 06/43399';
const WHATSAPP_NUMBER = '5511987136847'; // formato: 55 + DDD + número, sem espaços/símbolos
const HERO_VIDEO = '/videos/hero.mp4'; // arquivo em public/videos/ — sem ele, o hero usa um fundo animado
const VIDEO_FADE = 2; // segundos de transição entre o fim e o recomeço do vídeo

function waLink(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

function reduzMovimento() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ------------------------------------------------------------------
   Palavra que cicla suavemente (eyebrow do hero)
------------------------------------------------------------------- */
function PalavraCiclica({ palavras, intervalo = 2800 }) {
  const [atual, setAtual] = useState(0);
  const [anterior, setAnterior] = useState(-1);
  useEffect(() => {
    const t = setInterval(() => {
      setAtual((i) => {
        setAnterior(i);
        return (i + 1) % palavras.length;
      });
    }, intervalo);
    return () => clearInterval(t);
  }, [palavras.length, intervalo]);

  return (
    <span className="ciclo">
      <span className="sr-only">{palavras.join(', ')}</span>
      {palavras.map((p, i) => (
        <span
          key={p}
          aria-hidden="true"
          className={`ciclo-palavra ${i === atual ? 'ciclo-palavra--ativa' : ''} ${i === anterior ? 'ciclo-palavra--saindo' : ''}`}
        >
          {p}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   Tela de carregamento — um respiro antes de entrar no site
------------------------------------------------------------------- */
function Loader({ saindo }) {
  return (
    <div className={`loader ${saindo ? 'loader--saindo' : ''}`} role="status" aria-label="Carregando o site">
      <div className="loader-respiro">
        <Leaf size={28} strokeWidth={1.4} />
      </div>
      <span className="loader-nome">{NOME}</span>
      <span className="loader-frase">Respire fundo</span>
    </div>
  );
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
        <Leaf size={size === 'lg' ? 20 : 13} strokeWidth={1.6} className="selo-leaf" />
        <span className="selo-label">CRP</span>
        <span className="selo-num">{CRP.replace('CRP ', '')}</span>
      </div>
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
    desc: 'Nos conhecemos com calma: você compartilha sua história e alinhamos juntos como o processo vai funcionar.'
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
    a: 'A primeira sessão é um momento de acolhimento: conversamos sobre o que te trouxe à terapia, sua história e suas expectativas. A partir daí, construímos juntos um plano de acompanhamento que faça sentido para você.'
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
  const [carregado, setCarregado] = useState(false);
  const [loaderVisivel, setLoaderVisivel] = useState(true);
  const [videoPronto, setVideoPronto] = useState(false);
  const [foraDoHero, setForaDoHero] = useState(false);
  const [videoAtivo, setVideoAtivo] = useState(0);
  const [videoSaindo, setVideoSaindo] = useState(null);
  const videoRef = useRef(null);
  const video2Ref = useRef(null);
  const heroRef = useRef(null);
  const headerRef = useRef(null);

  // Sempre abre no topo (o navegador costuma restaurar a rolagem anterior ao recarregar)
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  // Espera o vídeo e a fonte (com tempo mínimo e máximo) antes de abrir o site
  useEffect(() => {
    let ativo = true;
    const video = videoRef.current;
    const esperaVideo = new Promise((resolve) => {
      if (!video || video.readyState >= 3) return resolve();
      video.addEventListener('canplay', resolve, { once: true });
      video.addEventListener('error', resolve, { once: true });
      video.querySelector('source')?.addEventListener('error', resolve, { once: true });
    });
    const esperaFonte = document.fonts ? document.fonts.ready : Promise.resolve();
    const minimo = new Promise((r) => setTimeout(r, reduzMovimento() ? 0 : 1800));
    const maximo = new Promise((r) => setTimeout(r, 5000));

    Promise.all([minimo, Promise.race([Promise.all([esperaVideo, esperaFonte]), maximo])])
      .then(() => { if (ativo) setCarregado(true); });
    return () => { ativo = false; };
  }, []);

  // Ao abrir: o vídeo recomeça do início e o loader sai de cena
  useEffect(() => {
    document.body.style.overflow = carregado ? '' : 'hidden';
    if (!carregado) return;
    if (!window.location.hash) window.scrollTo(0, 0);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      if (reduzMovimento()) video.pause();
      else video.play().catch(() => {});
    }
    const t = setTimeout(() => setLoaderVisivel(false), 1500);
    return () => clearTimeout(t);
  }, [carregado]);

  // Loop sem corte: perto do fim, a outra cópia recomeça por cima e aparece aos poucos
  useEffect(() => {
    if (!carregado || reduzMovimento()) return;
    const videos = [videoRef.current, video2Ref.current];
    if (videos.some((v) => !v)) return;
    let ativo = 0;
    let trocando = false;
    let timer;

    const aoAvancar = (i) => () => {
      const atual = videos[i];
      if (i !== ativo || trocando || !atual.duration) return;
      if (atual.currentTime < atual.duration - VIDEO_FADE - 0.3) return;
      trocando = true;
      const proximo = videos[1 - i];
      proximo.currentTime = 0;
      proximo.play().catch(() => {});
      ativo = 1 - i;
      setVideoSaindo(i);
      setVideoAtivo(ativo);
      timer = setTimeout(() => {
        atual.pause();
        setVideoSaindo(null);
        trocando = false;
      }, VIDEO_FADE * 1000 + 300);
    };

    const ouvintes = videos.map((v, i) => {
      const fn = aoAvancar(i);
      v.addEventListener('timeupdate', fn);
      return fn;
    });
    return () => {
      clearTimeout(timer);
      videos.forEach((v, i) => v.removeEventListener('timeupdate', ouvintes[i]));
    };
  }, [carregado]);

  // A nav fica transparente enquanto estiver sobre o hero
  useEffect(() => {
    const aoRolar = () => {
      const hero = heroRef.current;
      const header = headerRef.current;
      if (!hero || !header) return;
      setForaDoHero(hero.getBoundingClientRect().bottom <= header.offsetHeight);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => {
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
    };
  }, []);

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
        .psi-site {
          --paper: #FAF8F4;
          --paper-deep: #F0ECE4;
          --cream-card: #FEFDFB;
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
          --calma: cubic-bezier(.22,.61,.36,1);
          font-family: 'Playfair Display', serif;
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
          font-family: 'Playfair Display', serif;
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

        h1, h2, h3 { font-family: 'Playfair Display', serif; margin: 0; color: var(--ink); }
        h1 { font-weight: 600; letter-spacing: -0.01em; }
        h2 { font-weight: 600; letter-spacing: -0.005em; }
        p { line-height: 1.7; color: var(--ink-soft); margin: 0; }

        .section { padding: 4.5rem 0; position: relative; overflow: hidden; }
        @media (min-width: 768px) { .section { padding: 6.5rem 0; } }
        .section > .wrap { position: relative; z-index: 1; }
        .section-alt { background: var(--cream-card); }
        .section-sand { background: var(--paper-deep); }
        .psi-site section { scroll-margin-top: 80px; }

        /* ---------- reveal ---------- */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(4px);
          transition: opacity 1.4s var(--calma), transform 1.4s var(--calma), filter 1.4s ease;
        }
        .reveal-visible { opacity: 1; transform: translateY(0); filter: none; }
        .reveal .eyebrow::before {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.6s var(--calma) .5s;
        }
        .reveal-visible .eyebrow::before { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; filter: none; transition: none; }
          .reveal .eyebrow::before { transform: none; transition: none; }
        }

        /* ---------- luzes suaves de fundo ---------- */
        .orbe {
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          z-index: 0;
          animation: flutua 26s ease-in-out infinite alternate;
        }
        .orbe--areia { background: rgba(227,213,180,0.55); }
        .orbe--verde { background: rgba(85,105,76,0.16); animation-duration: 32s; animation-direction: alternate-reverse; }
        .orbe--rosa { background: rgba(169,103,122,0.12); animation-duration: 30s; }
        .orbe--luz { background: rgba(227,213,180,0.12); width: 520px; height: 520px; }
        @keyframes flutua {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, -40px) scale(1.15); }
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
          transition: transform .5s var(--calma), box-shadow .5s ease, background .5s ease, color .5s ease, border-color .5s ease;
          white-space: nowrap;
        }
        .psi-site .btn-whatsapp {
          background: var(--whatsapp);
          color: #fff;
          box-shadow: 0 10px 24px rgba(37,211,102,0.32);
        }
        .btn-whatsapp:hover { background: var(--whatsapp-deep); transform: translateY(-2px); }
        .psi-site .btn-outline {
          background: transparent;
          border: 1.5px solid var(--ink);
          color: var(--ink);
        }
        .btn-outline:hover { background: var(--ink); color: var(--paper); }
        .psi-site .btn-cream {
          background: var(--cream-on-dusk);
          color: var(--forest-deep);
        }
        .btn-cream:hover { background: #fff; transform: translateY(-2px); }
        .btn-sm { padding: 0.7rem 1.3rem; font-size: 0.85rem; }

        /* ---------- header ---------- */
        .header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: rgba(250,248,244,0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(42,46,37,0.08);
          transition: background .9s ease, border-color .9s ease, backdrop-filter .9s ease,
                      opacity 1.8s ease 1.2s, transform 1.8s var(--calma) 1.2s;
        }
        .header--sobre-hero {
          background: transparent;
          border-bottom-color: transparent;
          backdrop-filter: none;
        }
        .header--oculto { opacity: 0; transform: translateY(-14px); }
        .brand-name, .brand-tag, .nav-link, .menu-btn { transition: color .9s ease; }
        .header--sobre-hero .brand-name,
        .header--sobre-hero .nav-link,
        .header--sobre-hero .menu-btn { color: var(--cream-on-dusk); }
        .header--sobre-hero .brand-tag { color: var(--sand); }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.1rem;
          padding-bottom: 1.6rem;
          gap: 1.5rem;
        }
        @media (min-width: 1080px) {
          .header-inner {
            max-width: 1280px;
            display: grid;
            grid-template-columns: minmax(max-content, 1fr) auto minmax(max-content, 1fr);
          }
          .header-cta { justify-self: end; }
        }
        /* o nome alinha com o menu; a tag fica pendurada logo abaixo, fora do alinhamento */
        .brand { position: relative; display: block; text-decoration: none; }
        .brand-name { display: block; font-family: 'Playfair Display', serif; font-weight: 600; font-size: 1rem; line-height: 1.2; }
        .brand-tag {
          position: absolute; left: 0; top: calc(100% + 0.2rem);
          white-space: nowrap;
          font-size: 0.66rem; color: var(--forest); font-weight: 600; letter-spacing: 0.04em;
        }
        .nav-desktop { display: none; align-items: center; justify-content: center; gap: 1.75rem; }
        @media (min-width: 1080px) { .nav-desktop { display: flex; } }
        .nav-link {
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--ink);
          position: relative;
          padding-bottom: 3px;
          text-align: center;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute; left: 0; right: 100%; bottom: 0;
          height: 1.5px; background: var(--mauve);
          transition: right .6s var(--calma);
        }
        .nav-link:hover::after { right: 0; }
        .header-cta { display: none; }
        @media (min-width: 1080px) { .header-cta { display: inline-flex; } }
        .menu-btn {
          display: inline-flex;
          background: none; border: none; cursor: pointer;
          padding: 0.4rem; color: var(--ink);
        }
        @media (min-width: 1080px) { .menu-btn { display: none; } }

        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height .6s var(--calma);
          background: var(--cream-card);
        }
        .mobile-menu.open { max-height: 420px; border-bottom: 1px solid rgba(42,46,37,0.08); }
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

        /* ---------- tela de carregamento ---------- */
        .loader {
          position: fixed; inset: 0; z-index: 100;
          background: var(--paper);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1.3rem;
          text-align: center;
          padding: 1.5rem;
          transition: opacity 1.4s ease, visibility 1.4s;
        }
        .loader--saindo { opacity: 0; visibility: hidden; }
        .loader-respiro {
          position: relative;
          width: 84px; height: 84px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--forest);
          background: var(--cream-card);
          border: 1.5px solid rgba(85,105,76,0.35);
          margin-bottom: 0.6rem;
          animation: respira 5s ease-in-out infinite;
        }
        .loader-respiro::before {
          content: '';
          position: absolute; inset: -16px;
          border-radius: 50%;
          border: 1px solid rgba(169,103,122,0.4);
          animation: respira-anel 5s ease-in-out infinite;
        }
        @keyframes respira {
          0%, 100% { transform: scale(0.92); }
          50% { transform: scale(1.08); }
        }
        @keyframes respira-anel {
          0%, 100% { transform: scale(0.88); opacity: 0.15; }
          50% { transform: scale(1.18); opacity: 0.9; }
        }
        .loader-nome { font-size: 1.2rem; font-weight: 500; color: var(--ink); }
        .loader-frase {
          font-size: 0.74rem; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--forest);
          animation: respira-texto 5s ease-in-out infinite;
        }
        @keyframes respira-texto {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        /* ---------- hero ---------- */
        .hero {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex; align-items: center; justify-content: center;
          padding: 7rem 0 4.8rem;
          overflow: hidden;
          text-align: center;
          background: var(--dusk);
        }
        .hero-fundo { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .hero-midia {
          position: absolute; inset: 0;
          transform: scale(1.04);
          transition: filter 4.5s cubic-bezier(.4,0,.2,1) .9s, transform 14s ease-out;
        }
        .hero--ativo .hero-midia { filter: blur(10px) saturate(1.05); transform: scale(1.14); }
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          z-index: 1;
        }
        /* a cópia que entra aparece por cima; a que sai continua visível por baixo até sumir */
        .hero-video--ativo { opacity: 1; z-index: 2; transition: opacity 2s ease-in-out; }
        .hero-video--saindo { opacity: 1; z-index: 1; }
        .hero-fallback {
          position: absolute; inset: -10%;
          background:
            radial-gradient(38% 48% at 22% 28%, rgba(227,213,180,0.85), transparent 70%),
            radial-gradient(42% 52% at 78% 22%, rgba(150,170,125,0.9), transparent 70%),
            radial-gradient(50% 60% at 62% 82%, rgba(85,105,76,0.95), transparent 70%),
            radial-gradient(34% 44% at 12% 88%, rgba(169,103,122,0.35), transparent 70%),
            linear-gradient(160deg, #71876A 0%, #3D4C37 100%);
          animation: deriva 30s ease-in-out infinite alternate;
        }
        @keyframes deriva {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, 2%) scale(1.06); }
          100% { transform: translate(2%, -2%) scale(1.03); }
        }
        .hero-veu {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(30,37,25,0.42) 0%, rgba(30,37,25,0.38) 45%, rgba(30,37,25,0.62) 100%);
          opacity: 0.3;
          transition: opacity 4.5s ease .9s;
        }
        .hero--ativo .hero-veu { opacity: 1; }

        .hero-conteudo {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
        }
        .hero-item {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(8px);
          transition: opacity 2s ease, transform 2s var(--calma), filter 2s ease;
          transition-delay: var(--d, 0s);
        }
        .hero--ativo .hero-item { opacity: 1; transform: none; filter: none; }

        .hero .eyebrow {
          color: var(--sand);
          max-width: 62ch;
          line-height: 1.7;
          font-size: 0.7rem;
          justify-content: center;
        }
        .hero .eyebrow::before { display: none; }
        .hero .eyebrow { display: block; max-width: 92ch; }
        .hero .eyebrow .ciclo { margin-left: 0.5em; }

        .ciclo { display: inline-grid; text-align: left; }
        .ciclo-palavra {
          grid-area: 1 / 1;
          color: var(--cream-on-dusk);
          opacity: 0;
          transform: translateY(0.7em);
          filter: blur(4px);
          transition: opacity 1s ease, transform 1s var(--calma), filter 1s ease;
        }
        .ciclo-palavra--ativa { opacity: 1; transform: none; filter: none; transition-delay: .25s; }
        .ciclo-palavra--saindo { transform: translateY(-0.7em); }
        .sr-only {
          position: absolute; width: 1px; height: 1px;
          overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
        }

        .hero h1 {
          color: var(--cream-on-dusk);
          font-weight: 500;
          font-size: clamp(2.6rem, 5.6vw + 1rem, 5.2rem);
          line-height: 1.06;
          max-width: 16ch;
          margin: 1rem 0 1.3rem;
          text-shadow: 0 2px 30px rgba(20,26,16,0.25);
        }
        .hero-sub {
          font-size: 1.1rem;
          max-width: 46ch;
          margin: 0 auto 2.3rem;
          color: rgba(241,236,220,0.88);
        }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 0.9rem; align-items: center; justify-content: center; }
        .psi-site .hero .btn-outline {
          border-color: rgba(241,236,220,0.7);
          color: var(--cream-on-dusk);
          background: rgba(241,236,220,0.06);
          backdrop-filter: blur(4px);
        }
        .psi-site .hero .btn-outline:hover { background: var(--cream-on-dusk); color: var(--ink); }
        .hero-trust {
          display: flex; align-items: center; gap: 0.8rem;
          margin-top: 2.1rem; padding-top: 1.5rem;
          border-top: 1px solid rgba(241,236,220,0.22);
          text-align: left;
        }
        .hero-trust-icon { color: var(--sand); flex-shrink: 0; }
        .hero-trust-text { font-size: 0.82rem; color: rgba(241,236,220,0.78); line-height: 1.4; }
        .hero-trust-text strong { color: var(--cream-on-dusk); font-weight: 600; }

        .hero-scroll {
          position: absolute; z-index: 2;
          left: 50%; bottom: 1.8rem;
          width: 26px; height: 44px; margin-left: -13px;
          border: 1.5px solid rgba(241,236,220,0.55);
          border-radius: 999px;
        }
        .hero-scroll-ponto {
          position: absolute; left: 50%; top: 8px;
          width: 3px; height: 8px; margin-left: -1.5px;
          border-radius: 2px;
          background: var(--cream-on-dusk);
          animation: desce 3s ease-in-out infinite;
        }
        @keyframes desce {
          0% { opacity: 0; transform: translateY(0); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translateY(16px); }
        }
        @media (max-height: 640px) { .hero-scroll { display: none; } }
        @media (max-width: 640px) {
          .hero { padding: 6.5rem 0 3rem; }
          .hero .eyebrow { display: none; }
          .hero-sub { font-size: 1rem; margin-bottom: 1.8rem; }
          .hero-trust { margin-top: 1.6rem; }
          .hero-scroll { display: none; }
        }

        /* ---------- retrato (sobre) ---------- */
        .retrato { position: relative; }
        .retrato-foto {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 42% 42% 14px 14px;
          display: block;
        }
        .retrato .selo { position: absolute; right: -0.5rem; bottom: -1rem; z-index: 3; }
        @media (min-width: 640px) { .retrato .selo { right: 0.5rem; bottom: -1.2rem; } }
        .retrato-halo {
          position: absolute;
          width: 112%; height: 112%;
          top: -6%; left: -6%;
          background: radial-gradient(circle at 30% 30%, var(--sand), transparent 65%);
          border-radius: 50%;
          z-index: 0;
          animation: breathe 9s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

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
          font-family: 'Playfair Display', serif; font-weight: 700;
          letter-spacing: 0.08em; color: var(--ink); font-size: 0.72rem;
        }
        .selo-lg .selo-label { font-size: 0.85rem; }
        .selo-num {
          font-family: 'Playfair Display', serif; font-weight: 500;
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
        .crp-card h3 { font-size: 1rem; font-family: 'Playfair Display', serif; font-weight: 700; margin-bottom: 0.2rem; }
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
          transition: transform .8s var(--calma), box-shadow .8s ease, border-color .8s ease;
        }
        .ajuda-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(42,46,37,0.08);
          border-color: rgba(85,105,76,0.18);
        }
        .ajuda-icon {
          width: 46px; height: 46px; border-radius: 13px;
          background: var(--paper-deep);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.1rem; color: var(--forest);
          transition: background .8s ease, transform .8s var(--calma);
        }
        .ajuda-card:hover .ajuda-icon { background: var(--sand); transform: scale(1.06); }
        .ajuda-card h3 { font-family: 'Playfair Display', serif; font-size: 1.02rem; font-weight: 700; margin-bottom: 0.55rem; line-height: 1.3; }
        .ajuda-card p { font-size: 0.9rem; }

        /* ---------- processo ---------- */
        .processo-grid {
          margin-top: 3rem;
          display: grid; grid-template-columns: 1fr; gap: 2.4rem;
        }
        @media (min-width: 768px) { .processo-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; } }
        .etapa-num {
          font-family: 'Playfair Display', serif; font-size: 2.6rem; font-weight: 500;
          color: var(--sand); line-height: 1; margin-bottom: 0.8rem;
        }
        .etapa-linha {
          display: block;
          width: 48px; height: 1.5px;
          background: var(--mauve);
          margin-bottom: 1.1rem;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.8s var(--calma) .6s;
        }
        .reveal-visible .etapa-linha { transform: scaleX(1); }
        .etapa h3 { font-family: 'Playfair Display', serif; font-size: 1.08rem; font-weight: 700; margin-bottom: 0.5rem; }
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
          font-family: 'Playfair Display', serif; font-weight: 600; font-size: 1rem;
          color: var(--ink);
        }
        .faq-question span { transition: color .6s ease; }
        .faq-question:hover span { color: var(--forest-deep); }
        .faq-chevron { transition: transform .6s var(--calma); flex-shrink: 0; color: var(--forest); }
        .faq-open .faq-chevron { transform: rotate(180deg); }
        .faq-answer-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .7s var(--calma); }
        .faq-answer-inner p { opacity: 0; transition: opacity .7s ease; }
        .faq-open .faq-answer-inner p { opacity: 1; transition-delay: .15s; }
        .faq-open .faq-answer-wrap { grid-template-rows: 1fr; }
        .faq-answer-inner { overflow: hidden; }
        .faq-answer-inner p { font-size: 0.93rem; padding: 0 0.2rem 1.4rem; max-width: 62ch; }

        /* ---------- CTA final ---------- */
        .cta-final {
          background: linear-gradient(160deg, var(--dusk) 0%, var(--dusk-2) 100%);
          color: var(--cream-on-dusk);
          padding: 5rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-final > .wrap { position: relative; z-index: 1; }
        .cta-final .cta-label {
          color: var(--sand);
          text-decoration: underline;
          text-decoration-color: var(--mauve);
          text-decoration-thickness: 1px;
        }
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
          font-family: 'Playfair Display', serif; font-weight: 700; font-size: 0.82rem;
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
          box-shadow: 0 10px 26px rgba(37,211,102,0.4);
          transition: opacity 1.4s ease 4.5s, transform 1.4s var(--calma) 4.5s;
        }
        .wa-float--oculto { opacity: 0; transform: scale(0.8); pointer-events: none; }
        .wa-float::before {
          content: '';
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--whatsapp);
          animation: pulse-ring 4s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        /* ---------- movimento reduzido ---------- */
        @media (prefers-reduced-motion: reduce) {
          .hero-item, .hero-midia, .hero-veu, .header, .wa-float, .loader { transition: none !important; }
          .hero-fallback, .orbe, .retrato-halo, .hero-scroll-ponto, .wa-float::before,
          .loader-respiro, .loader-respiro::before, .loader-frase { animation: none !important; }
          .etapa-linha { transform: none; transition: none; }
          .ciclo-palavra { transition: none; transform: none !important; filter: none !important; }
        }
      `}</style>

      {loaderVisivel && <Loader saindo={carregado} />}

      {/* ---------------- HEADER ---------------- */}
      <header
        ref={headerRef}
        className={`header ${!foraDoHero && !menuAberto ? 'header--sobre-hero' : ''} ${carregado ? '' : 'header--oculto'}`}
      >
        <div className="wrap header-inner">
          <a href="#topo" className="brand">
            <span className="brand-name">{NOME}</span>
            <span className="brand-tag">Psicóloga Clínica · {CRP}</span>
          </a>

          <nav className="nav-desktop">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>

          <a
            href={waLink(`Olá! Gostaria de agendar uma conversa inicial.`)}
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
              href={waLink(`Olá! Gostaria de agendar uma conversa inicial.`)}
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
      <section ref={heroRef} className={`hero ${carregado ? 'hero--ativo' : ''}`} id="topo">
        <div className="hero-fundo" aria-hidden="true">
          <div className="hero-midia">
            <div className="hero-fallback" />
            {[videoRef, video2Ref].map((ref, i) => (
              <video
                key={i}
                ref={ref}
                className={`hero-video ${videoPronto && videoAtivo === i ? 'hero-video--ativo' : ''} ${videoSaindo === i ? 'hero-video--saindo' : ''}`}
                autoPlay={i === 0}
                muted
                loop={reduzMovimento()}
                playsInline
                preload="auto"
                onPlaying={i === 0 ? () => setVideoPronto(true) : undefined}
              >
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
            ))}
          </div>
          <div className="hero-veu" />
        </div>

        <div className="wrap hero-conteudo">
          <span className="eyebrow hero-item" style={{ '--d': '1.4s' }}>
            <span>Consulta Psicológica Particular | Atendimento para</span>
            <PalavraCiclica palavras={['Ansiedade', 'Depressão', 'Transtornos', 'Enlutados']} />
          </span>
          <h1 className="hero-item" style={{ '--d': '2s' }}>
            Construa uma vida com propósito hoje
          </h1>
          <p className="hero-sub hero-item" style={{ '--d': '2.8s' }}>
            Através da terapia online criamos um ambiente acolhedor, confidencial e sem julgamentos. Porque florescemos quando encontramos um lugar seguro para existir.
          </p>
          <div className="hero-ctas hero-item" style={{ '--d': '3.4s' }}>
            <a
              href={waLink(`Olá, ${NOME}! Gostaria de agendar uma conversa inicial.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={19} /> Fale comigo hoje
            </a>
            <a href="#ajuda" className="btn btn-outline">
              Ver como posso ajudar <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-trust hero-item" style={{ '--d': '3.9s' }}>
            <ShieldCheck size={28} className="hero-trust-icon" />
            <p className="hero-trust-text">
              <strong>Atendimento sigiloso</strong><br />
              Psicóloga registrada no Conselho Regional de Psicologia — {CRP}
            </p>
          </div>
        </div>

        <a href="#sobre" className="hero-scroll hero-item" style={{ '--d': '4.6s' }} aria-label="Ir para a próxima seção">
          <span className="hero-scroll-ponto" />
        </a>
      </section>

      {/* ---------------- SOBRE ---------------- */}
      <section className="section section-alt" id="sobre">
        <div className="wrap sobre-grid">
          <Reveal>
            <div className="retrato">
              <div className="retrato-halo" />
              <img
                src={fotoPerfil}
                alt={`Foto profissional de ${NOME}`}
                className="retrato-foto"
                loading="lazy"
              />
              <Selo size="lg" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Sobre mim</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 2.6vw + 1rem, 2.5rem)', marginTop: '0.9rem', marginBottom: '1.2rem' }}>
              Psicologia com escuta, ética e presença.
            </h2>
            <p style={{ fontSize: '1rem' }}>
              Sou psicóloga, especialista em Terapia Cognitivo-Comportamental ( TCC).<br></br><br></br>Ao longo da minha trajetória, encontrei na Terapia de Aceitação e Compromisso (ACT) uma forma de ampliar meu olhar sobre o sofrimento humano e fortalecer uma prática clínica mais sensível, presente e comprometida com aquilo que realmente importa para cada pessoa.
              <br></br><br></br>Acredito que a terapia é um espaço de encontro, acolhimento e transformação. Não se trata de eliminar o sofrimento, buscar a perfeição ou encontrar respostas prontas para tudo. Trata-se de desenvolver recursos para lidar de maneira mais consciente, flexível e compassiva com as dores, as incertezas e os desafios que fazem parte da vida.
              <br></br><br></br>Se você busca um espaço seguro para compreender melhor suas emoções, fortalecer sua autonomia e construir uma vida mais significativa, será um prazer caminhar ao seu lado nessa jornada.
            </p>

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
        <div className="orbe orbe--areia" style={{ top: '-8%', right: '-10%' }} aria-hidden="true" />
        <div className="orbe orbe--verde" style={{ bottom: '-12%', left: '-14%' }} aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Como posso ajudar</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw + 1rem, 2.7rem)', marginTop: '0.9rem' }}>
              Como a terapia pode te ajudar
            </h2>
            <p className="ajuda-intro">
              Cada processo terapêutico é único. Estas são algumas das questões que costumam
              trazer as pessoas até a terapia — talvez você se reconheça em uma, em várias,
              ou em nenhuma delas. Tudo bem: o primeiro passo é só conversar.
            </p>
          </Reveal>

          <div className="ajuda-grid">
            {ajudaCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 130}>
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
              <Reveal key={etapa.n} delay={i * 220}>
                <div className="etapa">
                  <div className="etapa-num">{etapa.n}</div>
                  <span className="etapa-linha" />
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
        <div className="orbe orbe--rosa" style={{ top: '10%', left: '-12%' }} aria-hidden="true" />
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
        <div className="orbe orbe--luz" style={{ top: '-30%', left: '20%' }} aria-hidden="true" />
        <div className="wrap">
          <Reveal>
            <span className="cta-label">Dê o primeiro passo</span>
            <h2>Buscar ajuda também é um ato de cuidado com você mesmo(a).</h2>
            <p>
              Marque uma conversa inicial sem compromisso. É por ali que muitos processos
              terapêuticos começam.
            </p>
            <a
              href={waLink(`Olá! Gostaria de agendar minha conversa inicial.`)}
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
                  <a href="mailto:contato@vanessacampos.com.br">contato@vanessacampos.com.br</a>
                </li>
                <li>
                  <Instagram size={16} />
                  <a href="#" target="_blank" rel="noopener noreferrer">@psicologa_vanessacampos</a>
                </li>
              </ul>
            </div>

            <div>
              <h4>Atendimento</h4>
              <ul className="footer-list">
                <li><Video size={16} /> Atendimento online por videochamada</li>
                <li><Clock size={16} /> Segunda a quinta, das 8h às 19h</li>
                <li><Clock size={16} /> Sexta, das 8h às 17h</li>
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
        className={`wa-float ${carregado ? '' : 'wa-float--oculto'}`}
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle size={27} />
      </a>
    </div>
  );
}
