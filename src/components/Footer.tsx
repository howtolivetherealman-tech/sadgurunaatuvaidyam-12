import React from 'react';
import { Phone, MessageSquare, MapPin, Youtube, ShieldCheck, Heart } from 'lucide-react';
import { translations, Language } from '../data/translations.ts';

interface FooterProps {
  lang: Language;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenAdmin }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#080503] text-amber-100 border-t border-amber-900/40 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-amber-900/30">
          {/* Col 1: Center & Maharaj */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold font-serif text-amber-200">
                {lang === 'te' ? 'సద్గురు నాటు వైద్యం' : 'Sadguru Natu Vaidyam'}
              </span>
            </div>
            <p className="text-xs text-amber-300/80 leading-relaxed mb-4">
              {lang === 'te'
                ? 'శ్రీనివాస్ మహారాజ్ గారి దివ్య మార్గదర్శకత్వంలో వశీకరణ, దాంపత్య సమస్యలు, మూలికా నాటు వైద్యం, చేతబడి నివారణ మరియు శక్తివంతమైన యంత్ర పరిష్కారాలు.'
                : 'Under the divine guidance of Srinivas Maharaj: Sacred Tantra, Vashikaran, Naturopathy, Black magic removal, and consecrated Yantra remedies.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'te' ? '100% నమ్మకమైన సేవలు' : '100% Genuine Remedies'}</span>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              {lang === 'te' ? 'ప్రత్యక్ష సంప్రదింపు' : 'Direct Helpline'}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-amber-200/90">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:7093586539" className="font-bold text-amber-100 text-sm hover:text-amber-300 font-mono">
                  7093586539
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/917093586539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-emerald-300"
                >
                  WhatsApp: 7093586539
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href="https://www.youtube.com/channel/UCrcgWWGv5nrSeP2y79nt3GQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-amber-200 hover:text-red-400"
                >
                  Sadguru Natu Vaidyam Channel
                </a>
              </div>
              <div className="flex items-start gap-2 mt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'te'
                    ? 'హైదరాబాద్ / తిరుపతి, ఆంధ్రప్రదేశ్ & తెలంగాణ'
                    : 'Hyderabad / Tirupati, Andhra Pradesh & Telangana'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              {lang === 'te' ? 'ముఖ్యమైన విభాగాలు' : 'Quick Links'}
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-amber-300/80">
              <li>
                <a href="#services" className="hover:text-amber-100 transition-colors">
                  {lang === 'te' ? 'వశీకరణ & దాంపత్య శాంతి' : 'Vashikaran & Marriage'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-100 transition-colors">
                  {lang === 'te' ? 'అసలైన మరుగు మందు & మర్ల మందు' : 'Marugu & Marla Mandu'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-100 transition-colors">
                  {lang === 'te' ? 'చేతబడి నిర్మూలన & రక్షణ' : 'Black Magic Cleansing'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-100 transition-colors">
                  {lang === 'te' ? 'పురుషుల నాటు వైద్యం (నరాల బలం)' : "Men's Vitality Herbs"}
                </a>
              </li>
              <li>
                <a href="#yantras" className="hover:text-amber-100 transition-colors">
                  {lang === 'te' ? 'సిద్ధ యంత్రాలు & పూజా ద్రవ్యాలు' : 'Energized Yantras'}
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-amber-100 transition-colors">
                  {lang === 'te' ? 'యూట్యూబ్ ఛానల్ వీడియోలు' : 'YouTube Videos'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Sacred Assurance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              {lang === 'te' ? 'ఆధ్యాత్మిక నిబద్ధత' : 'Spiritual Assurance'}
            </h4>
            <p className="text-xs text-amber-300/80 leading-relaxed mb-3">
              {lang === 'te'
                ? 'శ్రీనివాస్ మహారాజ్ గారు ప్రతి ఒక్కరి సమస్యను స్వయంగా విని, ప్రాచీన గురుపరంపర ప్రకారం పరిశీలించి పరిష్కారం సూచిస్తారు.'
                : 'Every devotee is consulted personally with empathy and complete confidentiality.'}
            </p>
            <button
              onClick={onOpenAdmin}
              className="text-xs text-amber-400 hover:text-white underline"
            >
              {lang === 'te' ? 'అడ్మిన్ పోర్టల్ లాగిన్' : 'Admin Portal Login'}
            </button>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-500/70 gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Sadguru Natu Vaidyam - Srinivas Maharaj. All rights reserved.
          </div>
          <div>
            Helpline: <a href="tel:7093586539" className="text-amber-300 font-mono">7093586539</a> · 100% Confidential
          </div>
        </div>
      </div>
    </footer>
  );
};
