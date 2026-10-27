/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { YouTubeSection } from './components/YouTubeSection.tsx';
import { YantrasAndPujaSection } from './components/YantrasAndPujaSection.tsx';
import { PrivateAdsSection } from './components/PrivateAdsSection.tsx';
import { GoogleAdBanner } from './components/GoogleAdBanner.tsx';
import { ConsultationForm, ConsultationLead } from './components/ConsultationForm.tsx';
import { AdminModal } from './components/AdminModal.tsx';
import { SubmitAdModal } from './components/SubmitAdModal.tsx';
import { Footer } from './components/Footer.tsx';
import { initialYouTubeVideos } from './data/initialVideos.ts';
import { initialPrivateAds } from './data/initialAds.ts';
import { YouTubeVideo, prependVideo } from './utils/youtube.ts';
import { PrivateAd, GoogleAdsConfig } from './utils/ads.ts';
import { SpiritualService, servicesData } from './data/services.ts';
import { YantraItem, yantrasCatalog } from './data/yantrasAndPuja.ts';
import {
  addServiceToList,
  removeServiceFromList,
  resetServicesToDefault,
} from './utils/serviceManagement.ts';
import { Language } from './data/translations.ts';

export default function App() {
  // Language State (Defaults to Telugu as requested: "ఈ వెబ్సైటు ఇంగ్లీష్ అండ్ తెలుగులో కావలెను")
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('snv_lang');
    return saved === 'en' ? 'en' : 'te';
  });

  // Videos State (Persistent, newest appears 1st)
  const [videos, setVideos] = useState<YouTubeVideo[]>(() => {
    try {
      const saved = localStorage.getItem('snv_videos');
      return saved ? JSON.parse(saved) : initialYouTubeVideos;
    } catch {
      return initialYouTubeVideos;
    }
  });

  // Private Ads State (Persistent)
  const [ads, setAds] = useState<PrivateAd[]>(() => {
    try {
      const saved = localStorage.getItem('snv_ads');
      return saved ? JSON.parse(saved) : initialPrivateAds;
    } catch {
      return initialPrivateAds;
    }
  });

  // Google Ads Config State (Persistent)
  const [googleAdsConfig, setGoogleAdsConfig] = useState<GoogleAdsConfig>(() => {
    try {
      const saved = localStorage.getItem('snv_google_ads');
      return saved
        ? JSON.parse(saved)
        : {
            enabled: false,
            adClient: 'ca-pub-7093586539000000',
            adSlotBanner: '1234567890',
            customHtmlSnippet: '',
          };
    } catch {
      return {
        enabled: false,
        adClient: 'ca-pub-7093586539000000',
        adSlotBanner: '1234567890',
        customHtmlSnippet: '',
      };
    }
  });

  // Services State (Persistent, customizable by Admin)
  const [services, setServices] = useState<SpiritualService[]>(() => {
    try {
      const v2 = localStorage.getItem('snv_services_v2');
      if (v2) {
        const parsed = JSON.parse(v2);
        if (Array.isArray(parsed) && parsed.length >= 24) return parsed;
      }
      const saved = localStorage.getItem('snv_services_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 24) return parsed;
      }
      return servicesData;
    } catch {
      return servicesData;
    }
  });

  // Yantras & Puja Products State (Persistent, customizable by Admin)
  const [yantras, setYantras] = useState<YantraItem[]>(() => {
    try {
      const saved = localStorage.getItem('snv_yantras');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return yantrasCatalog;
    } catch {
      return yantrasCatalog;
    }
  });

  // Leads State
  const [leads, setLeads] = useState<ConsultationLead[]>(() => {
    try {
      const saved = localStorage.getItem('snv_leads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Authentication
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'videos' | 'services' | 'yantras' | 'ads' | 'googleAds' | 'leads' | 'bigrock'>('videos');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isSubmitAdOpen, setIsSubmitAdOpen] = useState(false);
  const [selectedConsultProblem, setSelectedConsultProblem] = useState<string | undefined>();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('snv_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('snv_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('snv_services_v2', JSON.stringify(services));
    localStorage.setItem('snv_services_v1', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('snv_yantras', JSON.stringify(yantras));
  }, [yantras]);

  useEffect(() => {
    localStorage.setItem('snv_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('snv_google_ads', JSON.stringify(googleAdsConfig));
  }, [googleAdsConfig]);

  useEffect(() => {
    localStorage.setItem('snv_leads', JSON.stringify(leads));
  }, [leads]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'te' ? 'en' : 'te'));
  };

  const handleAddVideo = (newVideo: YouTubeVideo) => {
    // Ensures new video appears 1st on the site!
    setVideos((prev) => prependVideo(prev, newVideo));
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  const handleAddService = (newService: SpiritualService) => {
    setServices((prev) => addServiceToList(prev, newService));
  };

  const handleDeleteService = (serviceId: string) => {
    setServices((prev) => removeServiceFromList(prev, serviceId));
  };

  const handleResetServices = () => {
    setServices(resetServicesToDefault());
  };

  const handleUserSubmitAd = (newAd: PrivateAd) => {
    // Added to ads list with status: 'pending' (requires admin approval)
    setAds((prev) => [newAd, ...prev]);
  };

  const handleNewLead = (newLead: ConsultationLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleSelectServiceForConsult = (service: any) => {
    setSelectedConsultProblem(lang === 'te' ? service.titleTe : service.titleEn);
    const consultSection = document.getElementById('consultation');
    if (consultSection) {
      consultSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090503] text-amber-50 font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenConsultation={() => {
          const el = document.getElementById('consultation');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenConsultation={() => {
            const el = document.getElementById('consultation');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Optional Google Ad placement below Hero */}
        <GoogleAdBanner config={googleAdsConfig} slotType="horizontal" />

        {/* YouTube Channel Video Gallery (Newest is 1st) */}
        <YouTubeSection
          lang={lang}
          videos={videos}
          onAddVideo={handleAddVideo}
          isAdmin={isAdminAuthenticated}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Services & Remedies Catalog (18+ conditions) */}
        <ServicesSection
          lang={lang}
          services={services}
          isAdmin={isAdminAuthenticated}
          onOpenAdminServices={() => {
            setAdminTab('services');
            setIsAdminOpen(true);
          }}
          onSelectServiceForConsultation={handleSelectServiceForConsult}
        />

        {/* Consecrated Yantras & Puja Items */}
        <YantrasAndPujaSection
          lang={lang}
          items={yantras}
          isAdmin={isAdminAuthenticated}
          onOpenAdminYantras={() => {
            setAdminTab('yantras');
            setIsAdminOpen(true);
          }}
        />

        {/* Private Ads / Community Classifieds */}
        <PrivateAdsSection
          lang={lang}
          ads={ads}
          onOpenSubmitModal={() => setIsSubmitAdOpen(true)}
          isAdmin={isAdminAuthenticated}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Optional Google Ad placement above consultation */}
        <GoogleAdBanner config={googleAdsConfig} slotType="horizontal" />

        {/* Confidential Consultation Booking Form */}
        <ConsultationForm
          lang={lang}
          onNewLead={handleNewLead}
          initialProblem={selectedConsultProblem}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Dashboard Modal */}
      <AdminModal
        lang={lang}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAdminAuthenticated={isAdminAuthenticated}
        onAuthenticate={setIsAdminAuthenticated}
        videos={videos}
        onAddVideo={handleAddVideo}
        onDeleteVideo={handleDeleteVideo}
        services={services}
        onAddService={handleAddService}
        onDeleteService={handleDeleteService}
        onResetServices={handleResetServices}
        yantras={yantras}
        onUpdateYantras={setYantras}
        ads={ads}
        onUpdateAds={setAds}
        googleAdsConfig={googleAdsConfig}
        onUpdateGoogleAds={setGoogleAdsConfig}
        leads={leads}
        initialTab={adminTab}
      />

      {/* Submit Private Ad Modal for Public */}
      <SubmitAdModal
        lang={lang}
        isOpen={isSubmitAdOpen}
        onClose={() => setIsSubmitAdOpen(false)}
        onSubmit={handleUserSubmitAd}
      />

      {/* Floating Action Bar (Responsive Mobile/Desktop - Under 15% height cap) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#180e08]/90 text-amber-300 border border-amber-800/80 shadow-lg flex items-center justify-center hover:text-white hover:bg-amber-950 transition-all"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href="https://wa.me/917093586539"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl transition-all text-xs font-bold"
          title="WhatsApp Srinivas Maharaj"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <a
          href="tel:7093586539"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 rounded-full shadow-xl transition-all text-xs font-bold font-mono"
          title="Direct Phone Call"
          aria-label="Call Srinivas Maharaj"
        >
          <Phone className="w-4 h-4 fill-current" />
          <span>7093586539</span>
        </a>
      </div>
    </div>
  );
}
