import React, { useState } from 'react';
import {
  Flame,
  HeartHandshake,
  Heart,
  ShieldCheck,
  Scale,
  Coins,
  Briefcase,
  Ban,
  Gavel,
  Leaf,
  Sparkles,
  ShieldAlert,
  Compass,
  Crown,
  Sun,
  Zap,
  UserCheck,
  EyeOff,
  Package,
  Search,
  MessageSquare,
  Phone,
  ArrowRight,
  Plus,
  X,
} from 'lucide-react';
import { SpiritualService, servicesData } from '../data/services.ts';
import { translations, Language } from '../data/translations.ts';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForConsultation: (service: SpiritualService) => void;
  services?: SpiritualService[];
  isAdmin?: boolean;
  onOpenAdminServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForConsultation,
  services,
  isAdmin,
  onOpenAdminServices,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'tantra' | 'herbal' | 'relationship' | 'astrology'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<SpiritualService | null>(null);

  const t = translations[lang];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-pink-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-indigo-400" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-300" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'Ban':
        return <Ban className="w-5 h-5 text-red-400" />;
      case 'Gavel':
        return <Gavel className="w-5 h-5 text-amber-500" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-green-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-300" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-teal-400" />;
      case 'EyeOff':
        return <EyeOff className="w-5 h-5 text-amber-400" />;
      case 'Package':
        return <Package className="w-5 h-5 text-amber-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const serviceCatalog = services && services.length > 0 ? services : servicesData;

  const filteredServices = serviceCatalog.filter((s) => {
    const matchesTab = selectedTab === 'all' || s.category === selectedTab;
    const matchesSearch =
      searchQuery.trim() === '' ||
      s.titleTe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescTe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="services" className="py-16 bg-[#090503] text-amber-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 tracking-wider mb-2">
            <span>శ్రీ సద్గురు నాటు వైద్యం</span>
            <span aria-hidden="true">·</span>
            <span>శ్రీనివాస్ మహారాజ్ ప్రత్యేక సేవలు</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-100">
            {t.services.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 leading-relaxed">
            {t.services.subtitle}
          </p>

          {onOpenAdminServices && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={onOpenAdminServices}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-amber-600/60 bg-amber-950/70 text-xs font-semibold text-amber-300 hover:text-white hover:bg-amber-900/60 transition-all shadow-sm cursor-pointer"
                title="Admin: Add or Delete Spiritual Services"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lang === 'te'
                    ? '+ సేవలను జోడించండి & తొలగించండి (Admin Service Settings)'
                    : '+ Manage & Add / Remove Services (Admin)'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/70" />
            <input
              type="text"
              placeholder={t.services.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#140b07] border border-amber-900/50 rounded-lg text-xs sm:text-sm text-amber-100 placeholder-amber-500/50 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Segmented Filter Control (Functional button tabs) */}
          <div className="flex items-center gap-1 p-1 bg-[#150d08] border border-amber-900/50 rounded-xl overflow-x-auto w-full md:w-auto scrollbar-none">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedTab === 'all'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              {t.services.allTab}
            </button>
            <button
              onClick={() => setSelectedTab('tantra')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedTab === 'tantra'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              {t.services.tantraTab}
            </button>
            <button
              onClick={() => setSelectedTab('herbal')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedTab === 'herbal'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              {t.services.herbalTab}
            </button>
            <button
              onClick={() => setSelectedTab('relationship')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedTab === 'relationship'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              {t.services.relationshipTab}
            </button>
            <button
              onClick={() => setSelectedTab('astrology')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedTab === 'astrology'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              {t.services.astrologyTab}
            </button>
          </div>
        </div>

        {/* Services Grid (Single-elevation depth, no pill badge sandwiches) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-gradient-to-b from-[#160d08] to-[#100804] border border-amber-900/40 hover:border-amber-700/60 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Quiet Category/Status Text (Zero Pills) */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#20120b] border border-amber-800/40 flex items-center justify-center shrink-0">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {/* Clean unboxed metadata with dot separator */}
                  <div className="text-[11px] font-medium text-amber-400/90 text-right">
                    <span>{lang === 'te' ? service.badgeTe : service.badgeEn}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-amber-100 font-serif leading-snug group-hover:text-amber-300 transition-colors mb-2">
                  {lang === 'te' ? service.titleTe : service.titleEn}
                </h3>

                <p className="text-xs text-amber-200/80 leading-relaxed line-clamp-3 mb-4">
                  {lang === 'te' ? service.shortDescTe : service.shortDescEn}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-amber-900/30 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs text-amber-300 hover:text-amber-100 font-semibold flex items-center gap-1 group-hover:underline"
                >
                  <span>{lang === 'te' ? 'పూర్తి వివరాలు' : 'Read Remedy'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://wa.me/917093586539?text=${encodeURIComponent(
                      `నమస్కారం శ్రీనివాస్ మహారాజ్ గారు, నాకు "${service.titleTe}" కొరకు పరిష్కారం కావాలి.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md transition-colors"
                    title="WhatsApp"
                    aria-label={`WhatsApp for ${service.titleEn}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="tel:7093586539"
                    className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-md transition-colors whitespace-nowrap"
                  >
                    {lang === 'te' ? 'కాల్: 7093586539' : 'Call: 7093586539'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#170e09] border border-amber-800/80 rounded-2xl p-6 shadow-2xl text-amber-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-900/50 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#23140c] border border-amber-700/60 flex items-center justify-center shrink-0">
                  {getServiceIcon(activeModalService.iconName)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-100">
                    {lang === 'te' ? activeModalService.titleTe : activeModalService.titleEn}
                  </h3>
                  <div className="text-xs text-amber-400 font-medium">
                    {lang === 'te' ? activeModalService.badgeTe : activeModalService.badgeEn}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-1.5 text-amber-400 hover:text-white rounded-lg hover:bg-amber-900/30"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-sm leading-relaxed text-amber-200/90 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  {lang === 'te' ? 'సమస్య వివరణ & స్వభావం' : 'Situation & Diagnosis'}
                </h4>
                <p>{lang === 'te' ? activeModalService.fullDescTe : activeModalService.fullDescEn}</p>
              </div>

              <div className="p-4 bg-[#100804] border border-amber-900/60 rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'te' ? 'శ్రీనివాస్ మహారాజ్ గారి పరిష్కార విధానం' : 'Remedy & Ritual Procedure'}</span>
                </h4>
                <p className="text-xs text-amber-200">
                  {lang === 'te' ? activeModalService.remedyTe : activeModalService.remedyEn}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-amber-900/50 flex-wrap">
              <div className="text-xs text-amber-400/90 font-medium">
                {lang === 'te' ? '100% గోప్యత హామీ · ఫోన్: 7093586539' : '100% Confidential · Phone: 7093586539'}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/917093586539?text=${encodeURIComponent(
                    `నమస్కారం శ్రీనివాస్ మహారాజ్ గారు, నాకు "${activeModalService.titleTe}" పరిష్కారం కొరకు వెంటనే మాట్లాడాలి.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'te' ? 'వాట్సాప్ మెసేజ్' : 'WhatsApp'}</span>
                </a>

                <a
                  href="tel:7093586539"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>{lang === 'te' ? 'కాల్ చేయండి' : 'Call Now'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
