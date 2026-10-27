import React, { useState } from 'react';
import { Megaphone, Plus, Phone, CheckCircle, Play, Youtube, Image as ImageIcon, X, MessageSquare } from 'lucide-react';
import { PrivateAd } from '../utils/ads.ts';
import { translations, Language } from '../data/translations.ts';

interface PrivateAdsSectionProps {
  lang: Language;
  ads: PrivateAd[];
  onOpenSubmitModal: () => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const PrivateAdsSection: React.FC<PrivateAdsSectionProps> = ({
  lang,
  ads,
  onOpenSubmitModal,
  onOpenAdmin,
}) => {
  const t = translations[lang];
  const [selectedAd, setSelectedAd] = useState<PrivateAd | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showVideoInModal, setShowVideoInModal] = useState(false);

  const approvedAds = ads.filter((ad) => ad.status === 'approved');

  const openFullAdModal = (ad: PrivateAd, startWithVideo = false) => {
    setSelectedAd(ad);
    setActivePhotoIndex(0);
    setShowVideoInModal(startWithVideo && Boolean(ad.youtubeId));
  };

  return (
    <section id="private-ads" className="py-16 bg-[#0a0604] text-amber-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-amber-900/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Megaphone className="w-4 h-4" />
              <span>
                {lang === 'te'
                  ? 'కమ్యూనిటీ & వ్యాపార ప్రకటనలు · ఫోటోలు & యూట్యూబ్ వీడియోలతో'
                  : 'Community & Business Classifieds · With Photos, YouTube Video & Full Details'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
              {t.pvtAds.title}
            </h2>
            <p className="mt-2 text-sm text-amber-200/80 max-w-2xl">
              {t.pvtAds.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSubmitModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-950/60 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{t.pvtAds.submitAdBtn}</span>
            </button>
          </div>
        </div>

        {/* Ads Cards Grid */}
        {approvedAds.length === 0 ? (
          <div className="text-center py-12 bg-[#120a06] border border-amber-900/30 rounded-xl text-amber-300/70">
            <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-40 text-amber-500" />
            <p className="text-sm">
              {lang === 'te'
                ? 'ప్రస్తుతం ఆమోదించబడిన ప్రకటనలు లేవు. మీ ప్రకటనను ఇవ్వడానికి పై బటన్ నొక్కండి.'
                : 'No approved private ads yet. Click the button above to submit your advertisement.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedAds.map((ad) => {
              const adPhotos =
                Array.isArray(ad.photos) && ad.photos.length > 0
                  ? ad.photos
                  : ad.imageUrl
                  ? [ad.imageUrl]
                  : ad.youtubeId
                  ? [`https://img.youtube.com/vi/${ad.youtubeId}/hqdefault.jpg`]
                  : [];
              const primaryMedia = adPhotos[0] || '';

              return (
                <div
                  key={ad.id}
                  className="bg-gradient-to-b from-[#160d08] to-[#100804] border border-amber-900/40 rounded-xl overflow-hidden shadow-md flex flex-col justify-between hover:border-amber-700/60 transition-all"
                >
                  <div>
                    {/* Media Banner (Uploaded Photo or YouTube Thumbnail) */}
                    {primaryMedia && (
                      <div
                        onClick={() => openFullAdModal(ad, Boolean(ad.youtubeId && (!ad.photos || ad.photos.length === 0)))}
                        className="relative aspect-video w-full bg-[#090503] border-b border-amber-900/40 overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={primaryMedia}
                          alt={ad.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {ad.youtubeId && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openFullAdModal(ad, true);
                            }}
                            className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-red-600/95 hover:bg-red-500 text-white text-[11px] font-bold rounded-md shadow-lg"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{lang === 'te' ? 'వీడియో చూడండి' : 'Watch Video'}</span>
                          </button>
                        )}

                        {adPhotos.length > 1 && (
                          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 bg-black/75 text-amber-200 text-[11px] font-mono rounded">
                            <ImageIcon className="w-3 h-3 text-amber-400" />
                            <span>{adPhotos.length} Photos</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-5">
                      {/* Clean unboxed metadata */}
                      <div className="flex items-center justify-between text-xs text-amber-400/90 mb-2 font-medium">
                        <span>{ad.category}</span>
                        {ad.city && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{ad.city}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-amber-100 font-serif mb-2.5 leading-snug">
                        {ad.title}
                      </h3>

                      {/* Full Description with preserved line breaks */}
                      <div className="text-xs text-amber-200/85 leading-relaxed whitespace-pre-line mb-4">
                        {ad.description}
                      </div>

                      {/* Thumbnail strip if multiple photos uploaded */}
                      {adPhotos.length > 1 && (
                        <div className="grid grid-cols-4 gap-1.5 mb-3">
                          {adPhotos.slice(0, 4).map((photoUrl, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSelectedAd(ad);
                                setActivePhotoIndex(idx);
                                setShowVideoInModal(false);
                              }}
                              className="aspect-video rounded overflow-hidden border border-amber-800/50 hover:border-amber-400"
                            >
                              <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={() => openFullAdModal(ad, false)}
                          className="text-xs font-semibold text-amber-400 hover:text-amber-200 underline"
                        >
                          {lang === 'te' ? 'పూర్తి వివరాలు & ఫోటోలు చూడండి →' : 'View Full Details & Photos →'}
                        </button>
                        {ad.youtubeId && (
                          <button
                            type="button"
                            onClick={() => openFullAdModal(ad, true)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300"
                          >
                            <Youtube className="w-3.5 h-3.5" />
                            <span>{lang === 'te' ? 'యూట్యూబ్ వీడియో' : 'YouTube Video'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-[#120905] border-t border-amber-900/30 flex items-center justify-between gap-2">
                    <div className="text-xs text-amber-300 whitespace-nowrap">
                      <span>{lang === 'te' ? 'ఫోన్:' : 'Phone:'}</span> <strong className="text-amber-100 font-mono">{ad.contactNumber}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`https://wa.me/91${ad.contactNumber.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(`నమస్కారం, సద్గురు నాటు వైద్యం వెబ్‌సైట్ లో మీ "${ad.title}" ప్రకటన చూశాను.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors whitespace-nowrap"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${ad.contactNumber}`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" />
                        <span>{lang === 'te' ? 'కాల్' : 'Call'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Verification policy footer notice */}
        <div className="mt-8 p-3.5 rounded-xl bg-[#120a06] border border-amber-900/40 flex items-center justify-between text-xs text-amber-300/80 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {lang === 'te'
                ? 'ప్రైవేట్ ప్రకటనలన్నీ అడ్మిన్ (శ్రీనివాస్ మహారాజ్) పరిశీలించి ఆమోదించిన తర్వాతే కనిపిస్తాయి.'
                : 'All private advertisements are moderated and approved by Admin (Srinivas Maharaj) before display.'}
            </span>
          </div>

          <button
            onClick={onOpenAdmin}
            className="text-amber-400 hover:underline font-semibold"
          >
            {lang === 'te' ? 'అడ్మిన్ లాగిన్ →' : 'Admin Approval Portal →'}
          </button>
        </div>
      </div>

      {/* Full Private Ad Details Modal (Photos + YouTube Video + Full Description) */}
      {selectedAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#160d08] border border-amber-800/80 rounded-2xl overflow-hidden shadow-2xl text-amber-100 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/50 bg-[#1c100a] shrink-0">
              <div className="min-w-0 pr-4">
                <div className="text-xs text-amber-400 font-medium">
                  {selectedAd.category} {selectedAd.city ? `· ${selectedAd.city}` : ''}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-amber-100 truncate">
                  {selectedAd.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAd(null)}
                className="p-1.5 text-amber-400 hover:text-white rounded-lg"
                aria-label="Close ad details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {/* Toggle between Photos and YouTube Video if both exist */}
              {selectedAd.youtubeId && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowVideoInModal(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      !showVideoInModal
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-[#0e0704] text-amber-300 border border-amber-800/60'
                    }`}
                  >
                    {lang === 'te' ? 'ఫోటో గ్యాలరీ (Photos)' : 'Photos Gallery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVideoInModal(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      showVideoInModal
                        ? 'bg-red-600 text-white'
                        : 'bg-[#0e0704] text-red-400 border border-red-900/60'
                    }`}
                  >
                    <Youtube className="w-4 h-4" />
                    <span>{lang === 'te' ? 'యూట్యూబ్ వీడియో చూడండి' : 'Watch YouTube Video'}</span>
                  </button>
                </div>
              )}

              {showVideoInModal && selectedAd.youtubeId ? (
                <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-amber-800/60">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedAd.youtubeId}?rel=0&autoplay=1`}
                    title={selectedAd.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                (() => {
                  const modalPhotos =
                    Array.isArray(selectedAd.photos) && selectedAd.photos.length > 0
                      ? selectedAd.photos
                      : selectedAd.imageUrl
                      ? [selectedAd.imageUrl]
                      : selectedAd.youtubeId
                      ? [`https://img.youtube.com/vi/${selectedAd.youtubeId}/hqdefault.jpg`]
                      : [];
                  if (modalPhotos.length === 0) return null;
                  const currentPhoto = modalPhotos[activePhotoIndex] || modalPhotos[0];
                  return (
                    <div className="space-y-2.5">
                      <div className="aspect-video w-full bg-[#090503] rounded-xl overflow-hidden border border-amber-900/60 flex items-center justify-center">
                        <img
                          src={currentPhoto}
                          alt={selectedAd.title}
                          className="w-full h-full object-contain max-h-[420px]"
                        />
                      </div>
                      {modalPhotos.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          {modalPhotos.map((pUrl, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActivePhotoIndex(i)}
                              className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 ${
                                i === activePhotoIndex ? 'border-amber-400' : 'border-amber-900/40 opacity-70'
                              }`}
                            >
                              <img src={pUrl} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()
              )}

              {/* Full Description Block */}
              <div className="p-4 bg-[#100804] border border-amber-900/50 rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {lang === 'te' ? 'ప్రకటన పూర్తి వివరాలు (Full Description)' : 'Full Advertisement Description'}
                </h4>
                <div className="text-sm text-amber-100/95 leading-relaxed whitespace-pre-line">
                  {selectedAd.description}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#120a06] border-t border-amber-900/50 flex items-center justify-between flex-wrap gap-3 shrink-0">
              <div className="text-xs text-amber-300">
                <span>{t.pvtAds.contactLabel}:</span> <strong className="text-amber-100 text-sm font-mono">{selectedAd.contactNumber}</strong>
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/91${selectedAd.contactNumber.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(`నమస్కారం, సద్గురు నాటు వైద్యం వెబ్‌సైట్ లో మీ "${selectedAd.title}" ప్రకటన చూశాను.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${selectedAd.contactNumber}`}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>{lang === 'te' ? 'ఇప్పుడే కాల్ చేయండి' : 'Call Now'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
