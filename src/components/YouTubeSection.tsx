import React, { useState } from 'react';
import { Youtube, Plus, Play, ExternalLink, Sparkles, X, Filter } from 'lucide-react';
import { YouTubeVideo, createYouTubeVideo, prependVideo } from '../utils/youtube.ts';
import { translations, Language } from '../data/translations.ts';

interface YouTubeSectionProps {
  lang: Language;
  videos: YouTubeVideo[];
  onAddVideo: (video: YouTubeVideo) => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({
  lang,
  videos,
  onAddVideo,
  isAdmin,
  onOpenAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<string>('Naturopathy & Vitality');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const t = translations[lang];

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const newVideo = createYouTubeVideo({
        url: urlInput,
        title: titleInput || 'సద్గురు నాటు వైద్యం - తాజా వీడియో',
        titleTe: titleInput || 'సద్గురు నాటు వైద్యం - తాజా వీడియో',
        category: categoryInput,
        categoryTe: categoryInput,
        featured: true,
      });
      onAddVideo(newVideo);
      setUrlInput('');
      setTitleInput('');
      setIsAddModalOpen(false);
    } catch (err: any) {
      setErrorMessage(
        lang === 'te'
          ? 'సరైన యూట్యూబ్ లింక్ నమోదు చేయండి (ఉదా: https://youtube.com/watch?v=... లేదా https://youtu.be/...)'
          : 'Please enter a valid YouTube video URL or ID (e.g. https://youtu.be/...)'
      );
    }
  };

  const filteredVideos = videos.filter((v) => {
    if (selectedCategory === 'all') return true;
    return (
      v.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (v.categoryTe && v.categoryTe.toLowerCase().includes(selectedCategory.toLowerCase()))
    );
  });

  return (
    <section id="videos" className="py-16 bg-[#0c0805] text-amber-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-amber-900/30">
          <div>
            <a
              href="https://www.youtube.com/channel/UCrcgWWGv5nrSeP2y79nt3GQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-400 uppercase tracking-wider mb-2"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>{lang === 'te' ? 'సద్గురునాటువైద్యం యూట్యూబ్ ఛానల్' : 'Sadguru Natu Vaidyam YouTube'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
              {t.videos.title}
            </h2>
            <p className="mt-2 text-sm text-amber-200/80 max-w-2xl">
              {t.videos.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.youtube.com/channel/UCrcgWWGv5nrSeP2y79nt3GQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#1c100a] hover:bg-amber-950 text-amber-200 border border-amber-800/80 rounded-lg transition-colors whitespace-nowrap"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>{lang === 'te' ? 'ఛానల్ చూడండి (YouTube)' : 'Visit YouTube Channel'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors shadow-md shadow-red-950/50 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'te' ? 'వీడియో లింక్ పేస్ట్ చేయండి (+)' : 'Paste YouTube Link (+)'}</span>
            </button>
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12 text-amber-300/60 bg-[#140b07] rounded-xl border border-amber-900/30">
            <Youtube className="w-12 h-12 mx-auto mb-3 opacity-40 text-red-400" />
            <p>{t.videos.noVideos}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, idx) => {
              const isFirst = idx === 0;
              return (
                <div
                  key={video.id}
                  className={`group relative rounded-xl overflow-hidden bg-gradient-to-b from-[#180e08] to-[#100804] border ${
                    isFirst
                      ? 'border-red-500/70 shadow-lg shadow-red-950/40 ring-1 ring-red-500/30'
                      : 'border-amber-900/40 hover:border-amber-700/60'
                  } transition-all duration-200 flex flex-col justify-between`}
                >
                  {/* Thumbnail / Video Preview Slot with Zero Broken Images */}
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="relative aspect-video w-full bg-gradient-to-br from-[#1a0e08] via-[#2a170d] to-[#120a06] cursor-pointer overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Styled fallback if image fails: hide broken img icon and show background styling
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-500 transition-all">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Prominent badge for the FIRST / LATEST video as explicitly requested */}
                    {isFirst && (
                      <div className="absolute top-2 left-2 px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold rounded shadow-md flex items-center gap-1.5 uppercase tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{t.videos.latestBadge}</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[11px] font-mono text-amber-200 rounded">
                      YouTube HD
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Unboxed category metadata (Zero-pill discipline) */}
                      <div className="text-[11px] text-amber-400 font-medium mb-1.5 flex items-center gap-2">
                        <span>{lang === 'te' ? video.categoryTe || video.category : video.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{new Date(video.addedAt).toLocaleDateString()}</span>
                      </div>

                      <h3
                        onClick={() => setActiveVideo(video)}
                        className="text-sm font-semibold text-amber-100 hover:text-amber-300 cursor-pointer line-clamp-2 leading-snug"
                        title={video.title}
                      >
                        {lang === 'te' ? video.titleTe || video.title : video.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-900/30 flex items-center justify-between text-xs text-amber-300/80">
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="flex items-center gap-1 text-amber-300 hover:text-white font-medium"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{t.videos.playVideo}</span>
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-red-400 hover:text-red-300"
                        title={t.videos.watchOnYouTube}
                      >
                        <span>{t.videos.watchOnYouTube}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* More Videos / Go to YouTube Channel Bottom CTA */}
        <div className="mt-10 pt-8 border-t border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#180d08] via-[#22110a] to-[#180d08] p-5 sm:p-6 rounded-2xl border border-red-900/40 shadow-xl">
          <div className="flex items-center gap-3.5 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-amber-100">
                {lang === 'te'
                  ? 'మరిన్ని వీడియోల కోసం మా యూట్యూబ్ ఛానల్‌కి వెళ్ళండి'
                  : 'Watch More Videos on Our Official YouTube Channel'}
              </h3>
              <p className="text-xs sm:text-sm text-amber-300/80 mt-0.5">
                {lang === 'te'
                  ? 'సద్గురు నాటు వైద్యం & శ్రీనివాస్ మహారాజ్ గారి అన్ని వీడియోలు చూడటానికి క్రింది బటన్ పై క్లిక్ చేయండి'
                  : 'Click below to visit Sadguru Natu Vaidyam YouTube Channel for all herbal remedies & spiritual videos'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://www.youtube.com/channel/UCrcgWWGv5nrSeP2y79nt3GQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-950/60 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
            >
              <Youtube className="w-5 h-5" />
              <span>
                {lang === 'te'
                  ? 'మరిన్ని వీడియోలు / ఛానల్‌కి వెళ్ళండి (More Videos · Go to Channel)'
                  : 'More Videos / Go to Channel'}
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-[#150d08] border border-amber-800/60 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 border-b border-amber-900/40 bg-[#1c100a]">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-200 truncate pr-4">
                <Youtube className="w-5 h-5 text-red-500 shrink-0" />
                <span className="truncate">
                  {lang === 'te' ? activeVideo.titleTe || activeVideo.title : activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 text-amber-300 hover:text-white hover:bg-amber-900/40 rounded-lg transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`${activeVideo.embedUrl}&autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 bg-[#120a06] flex items-center justify-between flex-wrap gap-4 text-xs text-amber-300/80">
              <div>
                {lang === 'te'
                  ? 'సద్గురు నాటు వైద్యం - శ్రీనివాస్ మహారాజ్ ప్రత్యక్ష పరిష్కారాలు. ఫోన్: 7093586539'
                  : 'Sadguru Natu Vaidyam - Srinivas Maharaj remedies. Phone: 7093586539'}
              </div>
              <a
                href="tel:7093586539"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors"
              >
                {lang === 'te' ? 'మహారాజ్ గారిని సంప్రదించండి' : 'Consult Maharaj Now'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Paste YouTube Link Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#150d08] border border-amber-800/80 rounded-2xl p-6 shadow-2xl text-amber-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-900/40">
              <div className="flex items-center gap-2 text-base font-bold text-amber-200">
                <Youtube className="w-5 h-5 text-red-500" />
                <span>
                  {lang === 'te'
                    ? 'యూట్యూబ్ వీడియో లింక్ జోడించండి (1st స్థానంలో కనిపిస్తుంది)'
                    : 'Paste YouTube Video Link (Appears 1st)'}
                </span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-amber-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAdd} className="flex flex-col gap-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te'
                    ? 'యూట్యూబ్ వీడియో లింక్ లేదా షార్ట్స్ URL (Paste URL here) *'
                    : 'YouTube Video URL or Shorts Link *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0e0805] border border-amber-800/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
                <span className="text-[11px] text-amber-400/60 mt-1 block">
                  {lang === 'te'
                    ? 'గమనిక: కొత్తగా జోడించిన వీడియో మొదటి స్థానంలో (1st) ప్రదర్శించబడుతుంది.'
                    : 'Note: Any newly added video automatically appears at the very top (1st).'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te' ? 'వీడియో శీర్షిక (Title)' : 'Video Title'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'te' ? 'ఉదా: వశీకరణ & నాటు వైద్యం విధానం' : 'e.g., Tantra & Naturopathy Remedy'}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0e0805] border border-amber-800/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te' ? 'విభాగం (Category)' : 'Category'}
                </label>
                <select
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e0805] border border-amber-800/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                >
                  <option value="Tantra & Vashikaran">Tantra & Vashikaran (వశీకరణ)</option>
                  <option value="Naturopathy & Vitality">Naturopathy & Vitality (నాటు వైద్యం)</option>
                  <option value="Marugu & Marla Mandu">Marugu & Marla Mandu (మరుగు/మర్ల మందు)</option>
                  <option value="Black Magic & Protection">Black Magic & Protection (చేతబడి నివారణ)</option>
                  <option value="Lakshmi & Wealth">Lakshmi & Wealth (లక్ష్మీ కటాక్షం)</option>
                  <option value="De-addiction">De-addiction (మద్యపాన వ్యసనం)</option>
                </select>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-lg">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-amber-300 hover:text-white"
                >
                  {lang === 'te' ? 'రద్దు' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg shadow-md transition-colors"
                >
                  {lang === 'te' ? 'వీడియోను 1st స్థానంలో జోడించండి' : 'Add to Top (1st)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
