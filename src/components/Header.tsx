import React from 'react';
import { Phone, Lock, Globe, Menu, X, Sparkles } from 'lucide-react';
import { translations, Language } from '../data/translations.ts';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenAdmin: () => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenAdmin,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0906]/95 backdrop-blur-md border-b border-amber-900/30 text-amber-50">
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 py-1.5 px-4 text-center text-xs font-medium text-amber-200 border-b border-amber-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 mx-auto">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              {lang === 'te'
                ? 'శ్రీనివాస్ మహారాజ్ గారితో ప్రత్యక్ష సంభాషణకు సంప్రదించండి: '
                : 'Direct Spiritual Consultation with Srinivas Maharaj: '}
              <a href="tel:7093586539" className="font-bold underline text-amber-100 hover:text-white">
                7093586539
              </a>
            </span>
          </div>
          <button
            onClick={onToggleLang}
            className="hidden sm:flex items-center gap-1.5 text-xs text-amber-300 hover:text-white px-2 py-0.5 rounded border border-amber-700/50 hover:bg-amber-800/40 transition-colors"
            title="Change Language / భాషను మార్చండి"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'English' : 'తెలుగు'}</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#f3d27a] via-[#d4a338] to-[#8c5e14] p-0.5 shadow-lg shadow-black/60 shrink-0">
            <div className="w-full h-full rounded-full bg-[#2b5319] flex items-center justify-center overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <radialGradient id="snvInnerGlowReact" cx="50%" cy="48%" r="48%">
                    <stop offset="0%" stopColor="#fae29c" />
                    <stop offset="65%" stopColor="#e2af52" />
                    <stop offset="100%" stopColor="#b5771e" />
                  </radialGradient>
                  <linearGradient id="snvGreenRingReact" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d6c27" />
                    <stop offset="50%" stopColor="#2c521b" />
                    <stop offset="100%" stopColor="#1e3b11" />
                  </linearGradient>
                  <linearGradient id="snvStoneReact" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6e5d4b" />
                    <stop offset="45%" stopColor="#afa08c" />
                    <stop offset="100%" stopColor="#4e4031" />
                  </linearGradient>
                  <path id="snvTopTextArcReact" d="M 23,100 A 77,77 0 1,1 177,100" />
                  <path id="snvBotTextArcReact" d="M 178,104 A 78,78 0 0,1 22,104" />
                </defs>
                <circle cx="100" cy="100" r="98" fill="#c9932b" stroke="#69460b" strokeWidth="2" />
                <circle cx="100" cy="100" r="93" fill="url(#snvGreenRingReact)" stroke="#e7be5a" strokeWidth="2.5" />
                <circle cx="100" cy="100" r="64" fill="url(#snvInnerGlowReact)" stroke="#8c5b12" strokeWidth="2.5" />
                <circle cx="100" cy="100" r="61" fill="none" stroke="#f7d883" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M128,96 C128,84 132,78 134,74 C124,74 120,66 127,60 C132,54 146,54 152,61 C156,66 154,74 144,75 C146,80 149,88 153,96 Z" fill="#a66b1c" opacity="0.45" />
                <text fill="#fbe29b" stroke="#182e0d" strokeWidth="0.8" fontFamily="Georgia, serif" fontSize="15.5" fontWeight="bold" letterSpacing="1.2">
                  <textPath href="#snvTopTextArcReact" startOffset="50%" textAnchor="middle">SADGURU NAATU VAIDYA</textPath>
                </text>
                <text fill="#f7da86" fontFamily="sans-serif" fontSize="8.7" fontWeight="bold" letterSpacing="0.9">
                  <textPath href="#snvBotTextArcReact" startOffset="50%" textAnchor="middle">TRADITIONAL | NATURAL | AYURVEDA</textPath>
                </text>
                <g stroke="#1b3d0e" strokeWidth="1">
                  <path d="M92,88 C82,74 78,58 83,46 C92,55 96,70 94,88 Z" fill="#3a7d22" />
                  <path d="M97,86 C94,68 98,52 106,44 C111,56 108,72 101,86 Z" fill="#52992e" />
                  <path d="M86,90 C72,82 63,72 62,62 C74,64 83,74 88,88 Z" fill="#468c28" />
                  <path d="M104,88 C112,74 122,66 131,64 C128,76 118,84 106,90 Z" fill="#36731f" />
                  <path d="M68,118 C54,110 46,98 48,86 C58,92 66,104 70,116 Z" fill="#498f2a" />
                  <path d="M132,118 C146,110 154,98 152,86 C142,92 134,104 130,116 Z" fill="#3d7d22" />
                </g>
                <path d="M106,92 L124,62 C127,57 135,61 133,67 L116,94 Z" fill="url(#snvStoneReact)" stroke="#3b2e20" strokeWidth="1.5" />
                <path d="M68,90 L132,90 C134,108 124,122 100,122 C76,122 66,108 68,90 Z" fill="url(#snvStoneReact)" stroke="#3b2e20" strokeWidth="1.8" />
                <ellipse cx="100" cy="90" rx="33" ry="6.5" fill="#8f7e6a" stroke="#3b2e20" strokeWidth="1.6" />
                <ellipse cx="100" cy="90" rx="27" ry="4" fill="#3d3022" />
                <circle cx="75" cy="126" r="7.5" fill="#8ec235" stroke="#2f5210" strokeWidth="1.2" />
                <circle cx="85" cy="122" r="6.5" fill="#a4d448" stroke="#2f5210" strokeWidth="1.2" />
                <path d="M85,126 L115,126 C116,136 110,143 100,143 C90,143 84,136 85,126 Z" fill="url(#snvStoneReact)" stroke="#3b2e20" strokeWidth="1.4" />
                <g fill="#d68347" stroke="#59290c" strokeWidth="1.5" strokeLinejoin="round">
                  <path d="M56,112 C52,124 58,138 72,147 L96,156 L98,146 C84,140 72,132 65,115 C62,110 58,109 56,112 Z" />
                  <path d="M144,112 C148,124 142,138 128,147 L104,156 L102,146 C116,140 128,132 135,115 C138,110 142,109 144,112 Z" />
                </g>
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-amber-200 font-serif leading-tight group-hover:text-amber-100 transition-colors">
              {lang === 'te' ? 'సద్గురు నాటు వైద్యం' : 'Sadguru Natu Vaidyam'}
            </span>
            <span className="text-[11px] text-amber-400/80 font-medium tracking-wide">
              {lang === 'te' ? 'శ్రీనివాస్ మహారాజ్' : 'Srinivas Maharaj'}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-amber-200/90">
          <a href="#services" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.services}
          </a>
          <a href="#videos" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.videos}
          </a>
          <a href="#yantras" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.yantras}
          </a>
          <a href="#private-ads" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.pvtAds}
          </a>
          <a href="#consultation" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.consult}
          </a>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 text-xs text-amber-300 px-2 py-1 rounded border border-amber-800 bg-amber-950/60 hover:bg-amber-900/60 transition-colors"
            aria-label="Toggle language"
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold">{lang === 'te' ? 'EN' : 'తెలుగు'}</span>
          </button>

          <a
            href="tel:7093586539"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1a0f08] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-900/40 whitespace-nowrap shrink-0"
            title="Call Srinivas Maharaj: 7093586539"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            <span className="hidden xs:inline sm:inline">7093586539</span>
            <span className="xs:hidden sm:hidden">{lang === 'te' ? 'కాల్' : 'Call'}</span>
          </a>

          <button
            onClick={onOpenAdmin}
            className="p-1.5 sm:p-2 text-amber-400 hover:text-amber-200 hover:bg-amber-950/60 rounded-lg border border-amber-900/50 transition-colors"
            title={lang === 'te' ? 'అడ్మిన్ లాగిన్' : 'Admin Login'}
            aria-label="Admin portal login"
          >
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-amber-300 hover:text-white rounded-lg border border-amber-900/50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#120a06] border-b border-amber-900/40 px-6 py-4 flex flex-col gap-3 text-sm">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.services}
          </a>
          <a
            href="#videos"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.videos}
          </a>
          <a
            href="#yantras"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.yantras}
          </a>
          <a
            href="#private-ads"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.pvtAds}
          </a>
          <a
            href="#consultation"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.consult}
          </a>
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 px-4 text-center font-bold text-amber-950 bg-amber-400 rounded-lg"
            >
              {t.hero.bookAppointment}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
