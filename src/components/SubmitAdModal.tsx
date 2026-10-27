import React, { useState } from 'react';
import { X, Megaphone, CheckCircle2, AlertCircle, ImagePlus, Youtube, Trash2 } from 'lucide-react';
import { validatePrivateAdSubmission, createPendingPrivateAd, PrivateAd } from '../utils/ads.ts';
import { extractYouTubeId } from '../utils/youtube.ts';
import { translations, Language } from '../data/translations.ts';

interface SubmitAdModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ad: PrivateAd) => void;
}

function compressImageFile(file: File, maxDim = 800, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(String(e.target?.result || ''));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = String(e.target?.result || '');
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export const SubmitAdModal: React.FC<SubmitAdModalProps> = ({
  lang,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Puja Samagri / పూజా సామాగ్రి');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const detectedYtId = youtubeUrl.trim() ? extractYouTubeId(youtubeUrl.trim()) : null;

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingPhotos(true);
    setError(null);
    try {
      const remainingSlots = Math.max(0, 4 - photos.length);
      const toProcess = files.slice(0, remainingSlots);
      const compressed = await Promise.all(toProcess.map((f) => compressImageFile(f)));
      setPhotos((prev) => [...prev, ...compressed.filter(Boolean)].slice(0, 4));
    } catch {
      setError(
        lang === 'te'
          ? 'ఫోటో అప్‌లోడ్ చేయడంలో లోపం జరిగింది. దయచేసి వేరొక ఫోటో ఎంచుకోండి.'
          : 'Could not process selected photo. Please try another image.'
      );
    } finally {
      setUploadingPhotos(false);
      e.target.value = '';
    }
  };

  const removePhotoAt = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validatePrivateAdSubmission({
      title,
      description,
      contactNumber,
      youtubeUrl,
      photos,
    });

    if (!validation.isValid) {
      setError(validation.error || 'Please fill required fields properly');
      return;
    }

    const newAd = createPendingPrivateAd({
      title,
      category,
      description,
      contactNumber,
      city,
      youtubeUrl,
      photos,
    });

    onSubmit(newAd);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setTitle('');
      setDescription('');
      setContactNumber('');
      setCity('');
      setYoutubeUrl('');
      setPhotos([]);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#160d08] border border-amber-800/80 rounded-2xl p-6 shadow-2xl text-amber-100 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-900/50">
          <div className="flex items-center gap-2 text-base font-bold text-amber-200">
            <Megaphone className="w-5 h-5 text-amber-400" />
            <span>
              {lang === 'te'
                ? 'మీ ప్రైవేట్ ప్రకటనను సమర్పించండి (ఫోటోలు & యూట్యూబ్ లింక్ తో)'
                : 'Submit Private Ad (With Photos, YouTube Link & Full Description)'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-amber-400 hover:text-white rounded-lg hover:bg-amber-950/60"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
            <h4 className="text-lg font-bold text-amber-100 mb-2">
              {lang === 'te' ? 'ప్రకటన విజయవంతంగా సమర్పించబడింది!' : 'Advertisement Submitted!'}
            </h4>
            <p className="text-xs text-amber-300/80 max-w-xs text-center">
              {t.pvtAds.pendingNotice}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
            {error && (
              <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                {lang === 'te' ? 'ప్రకటన శీర్షిక (Ad Title) *' : 'Ad Title *'}
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'te' ? 'ఉదా: ఒరిజినల్ ఆయుర్వేద మూలికల షాప్' : 'e.g. Natural Ayurvedic Herb Center'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te' ? 'విభాగం (Category)' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                >
                  <option value="Puja Samagri / పూజా సామాగ్రి">Puja Samagri / పూజా సామాగ్రి</option>
                  <option value="Herbal Medicine / నాటు వైద్యం">Herbal Medicine / నాటు వైద్యం</option>
                  <option value="Vedic Astrology / జ్యోతిష్యం">Vedic Astrology / జ్యోతిష్యం</option>
                  <option value="Real Estate & Business / వ్యాపారం">Real Estate & Business / వ్యాపారం</option>
                  <option value="Services / సేవలు">Services / సేవలు</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te' ? 'ఊరు / నగరం (City)' : 'City / Location'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'te' ? 'ఉదా: హైదరాబాద్ / తిరుపతి' : 'e.g. Hyderabad / Vijayawada'}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te' ? 'సంప్రదించాల్సిన ఫోన్ నంబర్ *' : 'Contact Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs font-mono"
                />
              </div>
            </div>

            {/* YouTube Video Link Input */}
            <div className="p-3.5 bg-[#110905] border border-amber-900/50 rounded-xl">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>
                  {lang === 'te'
                    ? 'యూట్యూబ్ వీడియో లింక్ (YouTube Video / Shorts Link - ఐచ్ఛికం)'
                    : 'YouTube Video / Shorts Link (Optional)'}
                </span>
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0503] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs font-mono"
              />
              {detectedYtId && (
                <div className="mt-2.5 flex items-center gap-3 p-2 bg-[#1a0f09] rounded-lg border border-amber-800/40">
                  <img
                    src={`https://img.youtube.com/vi/${detectedYtId}/hqdefault.jpg`}
                    alt="YouTube preview"
                    className="w-20 h-12 object-cover rounded shrink-0"
                  />
                  <div className="text-xs text-emerald-400 font-medium">
                    {lang === 'te'
                      ? `✓ యూట్యూబ్ వీడియో సిద్ధంగా ఉంది (ID: ${detectedYtId})`
                      : `✓ YouTube Video Attached (ID: ${detectedYtId})`}
                  </div>
                </div>
              )}
            </div>

            {/* Upload Photos from Desktop or Mobile Gallery */}
            <div className="p-3.5 bg-[#110905] border border-amber-900/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <ImagePlus className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'te'
                      ? 'డెస్క్‌టాప్ లేదా మొబైల్ గ్యాలరీ నుండి ఫోటోలు అప్‌లోడ్ చేయండి (గరిష్టంగా 4 ఫోటోలు)'
                      : 'Upload Photos from Desktop or Mobile Gallery (Up to 4 Photos)'}
                  </span>
                </label>
                <span className="text-[11px] text-amber-400/80 font-mono">{photos.length}/4</span>
              </div>

              {photos.length < 4 && (
                <label className="flex flex-col items-center justify-center w-full py-4 px-3 border-2 border-dashed border-amber-800/70 hover:border-amber-500 rounded-xl bg-[#0a0503] cursor-pointer transition-colors text-center">
                  <ImagePlus className="w-6 h-6 text-amber-400 mb-1" />
                  <span className="text-xs font-semibold text-amber-200">
                    {uploadingPhotos
                      ? lang === 'te'
                        ? 'ఫోటో ప్రాసెస్ అవుతోంది...'
                        : 'Processing photos...'
                      : lang === 'te'
                      ? '+ ఫోటోలను ఎంచుకోండి (Desktop / Mobile Gallery)'
                      : '+ Choose Photos from Desktop or Mobile Gallery'}
                  </span>
                  <span className="text-[11px] text-amber-400/70 mt-0.5">
                    JPG, PNG, WEBP · Auto-optimized for fast loading
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </label>
              )}

              {photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                  {photos.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative group aspect-video rounded-lg overflow-hidden border border-amber-700/60 bg-black"
                    >
                      <img src={src} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhotoAt(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600/90 hover:bg-red-500 text-white rounded-md shadow"
                        aria-label={`Remove photo ${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                {lang === 'te'
                  ? 'ప్రకటన పూర్తి వివరాలు (Full Detailed Description) *'
                  : 'Full Detailed Description *'}
              </label>
              <textarea
                required
                rows={5}
                placeholder={
                  lang === 'te'
                    ? 'మీ వ్యాపారం, సేవలు, వస్తువులు, ధరలు, చిరునామా మరియు ప్రత్యేకతల పూర్తి వివరాలను వివరంగా రాయండి...'
                    : 'Write the complete details of your products, services, pricing, address, and highlights...'
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-amber-900/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-amber-400 hover:text-white"
              >
                {lang === 'te' ? 'రద్దు' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                {lang === 'te' ? 'ప్రకటనను సమర్పించండి' : 'Submit for Approval'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
