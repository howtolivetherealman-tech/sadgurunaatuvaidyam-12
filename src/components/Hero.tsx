import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Flame, Sparkles, Youtube, CheckCircle2 } from 'lucide-react';
import { translations, Language } from '../data/translations.ts';

interface HeroProps {
  lang: Language;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenConsultation }) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0704] via-[#140b07] to-[#0d0805] text-amber-50 pt-10 pb-16 lg:py-20 border-b border-amber-900/30">
      {/* Background Sacred Geometric Mandala Watermark Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 800 800" className="w-[800px] h-[800px] text-amber-400 stroke-current fill-none stroke-[0.75]">
          <circle cx="400" cy="400" r="380" />
          <circle cx="400" cy="400" r="320" />
          <polygon points="400,60 700,600 100,600" />
          <polygon points="400,740 700,200 100,200" />
          <polygon points="400,100 660,650 140,650" />
          <polygon points="400,700 660,150 140,150" />
          <circle cx="400" cy="400" r="220" />
          <circle cx="400" cy="400" r="140" />
          <circle cx="400" cy="400" r="60" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Message and Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Spiritual Kicker (Unboxed text with bullet separator, no pills) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 tracking-wide">
              <span>శ్రీ గురుభ్యో నమః</span>
              <span aria-hidden="true">·</span>
              <span>సద్గురు నాటు వైద్యం యూట్యూబ్ ఛానల్</span>
              <span aria-hidden="true">·</span>
              <span>ఫోన్: 7093586539</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-100 tracking-tight leading-[1.2] font-serif">
              {t.hero.heading}
            </h1>

            <p className="text-base sm:text-lg text-amber-200/90 leading-relaxed">
              {t.hero.subheading}
            </p>

            {/* Specialties Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-amber-300/90 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>వశీకరణ & దాంపత్య ఐక్యమత్యం</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>అసలైన నాటు మరుగు మందు & విరుగుడు</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>చేతబడి నిర్మూలన, నిర్ధారణ & శాశ్వత రక్షణ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>పురుషుల అంగస్తంభన, శీఘ్రస్కలనం నాటు చికిత్స</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>మద్యపానం & చెడు అలవాట్ల నుండి విముక్తి</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>పరాయి వ్యామోహాల నుండి భర్త/భార్యను దారికి తేవడం</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>స్త్రీలలో వక్షోజాల పెరుగుదలకు సహజ సిద్ధ మూలికలు</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ఆనంద దాంపత్యం & సమగ్ర ఆరోగ్య పరిష్కారాలు</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="tel:7093586539"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-950/60 transition-all text-sm sm:text-base whitespace-nowrap"
              >
                <Phone className="w-5 h-5 fill-current" />
                <span>{t.hero.callNow}</span>
              </a>

              <a
                href={`https://wa.me/917093586539?text=${encodeURIComponent(
                  lang === 'te'
                    ? 'నమస్కారం శ్రీనివాస్ మహారాజ్ గారు, నాకు సద్గురు నాటు వైద్యం సెంటర్ నుండి సమస్య పరిష్కారం కొరకు వివరాలు కావాలి.'
                    : 'Namaste Srinivas Maharaj, I would like to consult you regarding problem resolution from Sadguru Natu Vaidyam Center.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md transition-all text-sm sm:text-base whitespace-nowrap"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t.hero.whatsappChat}</span>
              </a>

              <button
                onClick={onOpenConsultation}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-950/80 hover:bg-amber-900/90 text-amber-200 border border-amber-700/60 font-semibold rounded-xl transition-all text-sm whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.hero.bookAppointment}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Guru Srinivas Maharaj Card with Sacred Aura */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-amber-950/70 via-[#1e110a] to-[#120a06] border border-amber-800/40 p-6 shadow-2xl">
              {/* Corner sacred ornaments */}
              <div className="absolute top-2 left-2 text-amber-500/40 text-xs font-serif">卐</div>
              <div className="absolute top-2 right-2 text-amber-500/40 text-xs font-serif">ॐ</div>

              <div className="text-center flex flex-col items-center">
                {/* Spiritual Emblem & Portrait Frame */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 shadow-xl shadow-amber-950/80 mb-4">
                  <div className="w-full h-full rounded-full bg-[#180e08] flex flex-col items-center justify-center p-3 text-center border-2 border-amber-500/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial from-amber-600/20 via-transparent to-transparent pointer-events-none" />
                    <Flame className="w-12 h-12 text-amber-400 animate-pulse mb-1" />
                    <span className="text-xs font-serif font-bold text-amber-200 tracking-wider">
                      శ్రీనివాస్ మహారాజ్
                    </span>
                    <span className="text-[10px] text-amber-400/90 font-medium">
                      తంత్ర వైద్య నిపుణులు
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-amber-100 font-serif mb-1">
                  {lang === 'te' ? 'శ్రీనివాస్ మహారాజ్' : 'Srinivas Maharaj'}
                </h2>
                <div className="text-xs sm:text-sm text-amber-400/90 font-medium mb-3">
                  {lang === 'te'
                    ? 'తంత్ర వైద్యుడు · జ్యోతిష్య నిపుణుడు · సద్గురు నాటు వైద్యం'
                    : 'Tantra Healer · Vedic Astrologer · Sadguru Natu Vaidyam'}
                </div>

                <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed mb-4 text-center">
                  {lang === 'te'
                    ? '30 ఏళ్లకు పైగా సాధనా బలం, వనమూలికా పరిశోధనతో మీ సమస్యల మూలాన్ని కనిపెట్టి ప్రత్యక్ష ఫలితం చూపిస్తాము.'
                    : 'With over 30 years of disciplined sadhana and forest naturopathy research, providing root-cause spiritual and herbal solutions.'}
                </p>

                {/* Direct Contact Strip inside Card */}
                <div className="w-full bg-[#0d0704] border border-amber-900/50 rounded-xl p-3 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="text-[11px] text-amber-400/80 font-medium">
                      {lang === 'te' ? 'నేరుగా మాట్లాడండి' : 'Direct Helpline'}
                    </div>
                    <div className="text-base font-bold text-amber-100 font-mono tracking-wider">
                      7093586539
                    </div>
                  </div>
                  <a
                    href="tel:7093586539"
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
                  >
                    {lang === 'te' ? 'కాల్ చేయండి' : 'Call Now'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Pillar Trust Strip below Hero (Zero pills discipline) */}
        <div className="mt-12 pt-8 border-t border-amber-900/30 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-amber-100">{t.hero.trust1}</div>
              <div className="text-xs text-amber-300/70">
                {lang === 'te' ? 'మీ వ్యక్తిగత విషయాలు పూర్తి రహస్యం' : 'Complete client privacy'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-amber-100">{t.hero.trust2}</div>
              <div className="text-xs text-amber-300/70">
                {lang === 'te' ? 'మంత్ర ప్రతిష్టతో సిద్ధం చేసినవి' : 'Mantra-energized by hand'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-amber-100">{t.hero.trust3}</div>
              <div className="text-xs text-amber-300/70">
                {lang === 'te' ? 'అడవిలో సేకరించిన పవిత్ర వనస్పతి' : '100% Pure forest roots'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Youtube className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-amber-100">{t.hero.trust4}</div>
              <div className="text-xs text-amber-300/70">
                {lang === 'te' ? 'సద్గురు నాటు వైద్యం ఛానల్' : 'Sadguru Natu Vaidyam videos'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
