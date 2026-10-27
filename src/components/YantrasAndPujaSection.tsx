import React from 'react';
import { Phone, MessageSquare, Sparkles, ImagePlus, Plus } from 'lucide-react';
import { YantraItem, yantrasCatalog } from '../data/yantrasAndPuja.ts';
import { translations, Language } from '../data/translations.ts';

interface YantrasAndPujaSectionProps {
  lang: Language;
  items?: YantraItem[];
  isAdmin?: boolean;
  onOpenAdminYantras?: (editId?: string) => void;
}

export const YantrasAndPujaSection: React.FC<YantrasAndPujaSectionProps> = ({
  lang,
  items = yantrasCatalog,
  isAdmin = false,
  onOpenAdminYantras,
}) => {
  const t = translations[lang];

  return (
    <section id="yantras" className="py-16 scroll-mt-24 bg-[#0d0805] text-amber-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 tracking-wider mb-2">
            <span>సిద్ధ యంత్ర ప్రతిష్ట</span>
            <span aria-hidden="true">·</span>
            <span>పూజా విశేష ద్రవ్యాలు</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-100">
            {t.yantras.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 leading-relaxed">
            {t.yantras.subtitle}
          </p>

          {isAdmin && onOpenAdminYantras && (
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => onOpenAdminYantras()}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {lang === 'te'
                    ? '+ కొత్త యంత్రం / పూజా ప్రొడక్ట్ జోడించండి & ఫోటోలు ఎడిట్ చేయండి (Admin)'
                    : '+ Add New Product & Edit Yantra Images (Admin)'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Yantras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const name = lang === 'te' ? item.nameTe : item.nameEn || item.nameTe;
            const purpose = lang === 'te' ? item.purposeTe : item.purposeEn || item.purposeTe;
            const metal = lang === 'te' ? item.metalTe : item.metalEn || item.metalTe;
            const blessing = lang === 'te' ? item.blessingTe : item.blessingEn || item.blessingTe;
            const tag = lang === 'te' ? item.tagTe : item.tagEn || item.tagTe;

            const whatsappText = encodeURIComponent(
              lang === 'te'
                ? `నమస్కారం శ్రీనివాస్ మహారాజ్ గారు, నాకు "${item.nameTe}" ఆర్డర్ / వివరాలు కావాలి.`
                : `Namaste Srinivas Maharaj garu, I want to inquire/order "${item.nameEn || item.nameTe}".`
            );

            return (
              <div
                key={item.id}
                className="bg-gradient-to-b from-[#180e08] to-[#120a06] border border-amber-800/40 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-amber-600/60 transition-all"
              >
                <div>
                  {/* Sacred Yantra Visual / Custom Product Image */}
                  <div className="relative aspect-video w-full rounded-lg bg-[#0e0704] border border-amber-900/60 flex items-center justify-center overflow-hidden mb-4">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 100 100"
                        className="w-24 h-24 text-amber-400 stroke-current fill-none stroke-[1.2] opacity-80 m-4"
                      >
                        <polygon points="50,15 85,75 15,75" />
                        <polygon points="50,85 85,25 15,25" />
                        <polygon points="50,25 75,70 25,70" />
                        <polygon points="50,75 75,30 25,30" />
                        <circle cx="50" cy="50" r="42" />
                        <circle cx="50" cy="50" r="48" />
                        <circle cx="50" cy="50" r="4" className="fill-amber-400" />
                      </svg>
                    )}

                    <div className="absolute bottom-2 left-2 text-[11px] font-medium text-amber-200 bg-black/80 px-2.5 py-0.5 rounded border border-amber-800/50">
                      {metal}
                    </div>

                    {isAdmin && onOpenAdminYantras && (
                      <button
                        type="button"
                        onClick={() => onOpenAdminYantras(item.id)}
                        className="absolute top-2 right-2 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] rounded-md shadow-md flex items-center gap-1"
                      >
                        <ImagePlus className="w-3.5 h-3.5" />
                        <span>{lang === 'te' ? 'ఫోటో / వివరాలు మార్చండి' : 'Edit Image / Product'}</span>
                      </button>
                    )}
                  </div>

                  {/* Top Tag & Name */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold font-serif text-amber-100 leading-snug">
                      {name}
                    </h3>
                    <span className="text-[11px] text-amber-400 shrink-0 font-medium">
                      {tag}
                    </span>
                  </div>

                  {/* Purpose */}
                  <p className="text-xs text-amber-200/80 leading-relaxed mb-3">
                    {purpose}
                  </p>

                  {/* Blessing Note */}
                  <div className="text-[11px] text-amber-300/90 bg-[#0e0704] p-2.5 rounded-lg border border-amber-900/40 mb-4 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{blessing}</span>
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/917093586539?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.yantras.orderNow}</span>
                  </a>

                  <a
                    href="tel:7093586539"
                    className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>7093586539</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
