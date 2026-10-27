import React from 'react';
import { GoogleAdsConfig } from '../utils/ads.ts';

interface GoogleAdBannerProps {
  config: GoogleAdsConfig;
  slotType: 'horizontal' | 'square';
}

export const GoogleAdBanner: React.FC<GoogleAdBannerProps> = ({ config, slotType }) => {
  if (!config.enabled) {
    return null;
  }

  // If user pasted a custom raw HTML script snippet from Google Ads
  if (config.customHtmlSnippet && config.customHtmlSnippet.trim().length > 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 my-6">
        <div className="text-[10px] text-amber-500/50 uppercase tracking-widest text-center mb-1">
          Advertisement / ప్రకటన
        </div>
        <div
          className="overflow-hidden flex justify-center bg-[#120a06]/40 p-2 border border-amber-900/20 rounded-lg"
          dangerouslySetInnerHTML={{ __html: config.customHtmlSnippet }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="text-[10px] text-amber-500/50 uppercase tracking-widest text-center mb-1">
        Google Ads Placement / ప్రకటన
      </div>
      <div
        className={`w-full ${
          slotType === 'horizontal' ? 'h-24 sm:h-28' : 'h-64'
        } bg-gradient-to-r from-[#120a06] via-[#1a0e08] to-[#120a06] border border-dashed border-amber-900/50 rounded-xl flex flex-col items-center justify-center p-4 text-center`}
      >
        <span className="text-xs font-mono text-amber-400/80">
          Google AdSense Client: {config.adClient || 'ca-pub-configured'}
        </span>
        <span className="text-[11px] text-amber-300/50 mt-1">
          Slot: {config.adSlotBanner || 'Responsive Banner Slot'}
        </span>
      </div>
    </div>
  );
};
