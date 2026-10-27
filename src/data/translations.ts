export type Language = 'te' | 'en';

export interface TranslationDictionary {
  siteTitle: string;
  guruName: string;
  guruRole: string;
  centerName: string;
  phoneLabel: string;
  phoneNumber: string;
  whatsappLabel: string;
  nav: {
    services: string;
    videos: string;
    yantras: string;
    pvtAds: string;
    consult: string;
    admin: string;
  };
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    callNow: string;
    whatsappChat: string;
    bookAppointment: string;
    trust1: string;
    trust2: string;
    trust3: string;
    trust4: string;
  };
  services: {
    title: string;
    subtitle: string;
    allTab: string;
    tantraTab: string;
    herbalTab: string;
    relationshipTab: string;
    astrologyTab: string;
    searchPlaceholder: string;
    consultBtn: string;
  };
  videos: {
    title: string;
    subtitle: string;
    addNewVideo: string;
    latestBadge: string;
    watchOnYouTube: string;
    playVideo: string;
    noVideos: string;
  };
  yantras: {
    title: string;
    subtitle: string;
    orderNow: string;
    energizedGuarantee: string;
  };
  pvtAds: {
    title: string;
    subtitle: string;
    submitAdBtn: string;
    categoryLabel: string;
    contactLabel: string;
    pendingNotice: string;
  };
  form: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    problemType: string;
    problemDetails: string;
    submit: string;
    successMessage: string;
  };
  admin: {
    title: string;
    loginTitle: string;
    enterPin: string;
    loginBtn: string;
    logoutBtn: string;
    tabs: {
      videos: string;
      services: string;
      ads: string;
      googleAds: string;
      leads: string;
      bigrock: string;
    };
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  te: {
    siteTitle: 'సద్గురు నాటు వైద్యం & తంత్ర కేంద్రం',
    guruName: 'శ్రీనివాస్ మహారాజ్',
    guruRole: 'ప్రసిద్ధ తంత్ర వైద్యులు & ఆస్ట్రాలజీ నిపుణులు',
    centerName: 'సద్గురు నాటు వైద్యం సెంటర్',
    phoneLabel: 'ఫోన్ నంబర్',
    phoneNumber: '7093586539',
    whatsappLabel: 'వాట్సాప్ లో మాట్లాడండి',
    nav: {
      services: 'సేవలు & పరిస్కారాలు',
      videos: 'యూట్యూబ్ వీడియోలు',
      yantras: 'యంత్రాలు & పూజా ద్రవ్యాలు',
      pvtAds: 'ప్రైవేట్ ప్రకటనలు',
      consult: 'సంప్రదించండి',
      admin: 'అడ్మిన్ లాగిన్',
    },
    hero: {
      badge: '100% నమ్మకమైన తంత్ర నాటు వైద్యం & జ్యోతిష్య పరిష్కారాలు',
      heading: 'ఎంతటి క్లిష్టమైన సమస్యకైనా శాశ్వత పరిష్కారం',
      subheading: 'శ్రీనివాస్ మహారాజ్ గారి ఆధ్వర్యంలో వశీకరణ, భార్యాభర్తల అన్యోన్యత, ఆర్థిక ఇబ్బందులు, మరుగు మందు, చేతబడి నివారణ, పురుషుల సమస్యలకు ప్రాచీన మూలికా వైద్యం.',
      callNow: 'తక్షణమే కాల్ చేయండి: 7093586539',
      whatsappChat: 'వాట్సాప్ లో మెసేజ్ చేయండి',
      bookAppointment: 'సమస్యను పరిష్కరించుకోండి',
      trust1: 'రహస్య సమాచారం గోప్యత 100%',
      trust2: 'శక్తిమంతమైన సిద్ధ యంత్రాలు',
      trust3: 'సహజసిద్ధ మూలికా చికిత్స',
      trust4: 'యూట్యూబ్ లో ప్రత్యక్ష రుజువులు',
    },
    services: {
      title: 'సమస్యల సంపూర్ణ నివారణ సేవలు',
      subtitle: 'తంత్ర శాస్త్రం, మూలికా నాటు వైద్యం మరియు జ్యోతిష్య విజ్ఞానంతో సమస్యల మూలాల నుండి పరిష్కారం',
      allTab: 'అన్నీ (All)',
      tantraTab: 'తంత్ర & వశీకరణ',
      herbalTab: 'నాటు వైద్యం & ఆరోగ్యం',
      relationshipTab: 'కుటుంబం & సంబంధాలు',
      astrologyTab: 'జ్యోతిష్యం & దోషాలు',
      searchPlaceholder: 'సమస్య లేదా సేవను వెతకండి...',
      consultBtn: 'పరిష్కారం కోసం మాట్లాడండి',
    },
    videos: {
      title: 'సద్గురు నాటు వైద్యం - యూట్యూబ్ ఛానల్',
      subtitle: 'తాజా వీడియోలు నేరుగా ఇక్కడ వీక్షించండి. కొత్తగా అప్లోడ్ చేసిన ప్రతి వీడియో మొదటగా కనిపిస్తుంది.',
      addNewVideo: 'కొత్త వీడియో లింక్ జోడించండి (అడ్మిన్)',
      latestBadge: 'తాజా వీడియో (LATEST)',
      watchOnYouTube: 'యూట్యూబ్ లో చూడండి',
      playVideo: 'ప్లే చేయండి',
      noVideos: 'వీడియోలు ఏవీ లభించలేదు.',
    },
    yantras: {
      title: 'సిద్ధ యంత్రాలు & పూజా విశేష వస్తువులు',
      subtitle: 'శ్రీనివాస్ మహారాజ్ స్వహస్తాలతో పూజించి, ప్రాణప్రతిష్ట చేసిన అత్యంత శక్తివంతమైన యంత్రాలు & పూజా ద్రవ్యాలు లభించును',
      orderNow: 'ఆర్డర్ / వివరాలు కోరండి',
      energizedGuarantee: '100% మంత్రోచ్ఛారణలతో ప్రాణ ప్రతిష్ట చేయబడినవి',
    },
    pvtAds: {
      title: 'ప్రైవేట్ ప్రకటనలు (Community Ads)',
      subtitle: 'మీ వ్యాపారం, సేవల ప్రకటనలను ఇక్కడ ఇవ్వవచ్చు. అడ్మిన్ ఆమోదం పొందిన తర్వాత మాత్రమే ప్రదర్శించబడతాయి.',
      submitAdBtn: 'కొత్త ప్రకటన ఇవ్వండి (+)',
      categoryLabel: 'విభాగం',
      contactLabel: 'సంప్రదించాల్సిన నంబర్',
      pendingNotice: 'ప్రకటన సమర్పించబడింది! అడ్మిన్ ఆమోదించిన తర్వాత వెబ్సైట్లో కనిపిస్తుంది.',
    },
    form: {
      title: 'శ్రీనివాస్ మహారాజ్ గారిని సంప్రదించండి',
      subtitle: 'మీ సమస్యను మాకు తెలియజేయండి. మీ వివరాలు సంపూర్ణంగా గోప్యంగా ఉంచబడును.',
      name: 'మీ పూర్తి పేరు',
      phone: 'ఫోన్ నంబర్',
      problemType: 'సమస్య విభాగం',
      problemDetails: 'సమస్య పూర్తి వివరాలు',
      submit: 'పరిష్కారం కోసం అభ్యర్థించండి',
      successMessage: 'మీ అభ్యర్థన విజయవంతంగా చేరింది! శ్రీనివాస్ మహారాజ్ గారు త్వరలోనే మిమ్మల్ని సంప్రదిస్తారు.',
    },
    admin: {
      title: 'శ్రీనివాస్ మహారాజ్ - అడ్మిన్ పోర్టల్',
      loginTitle: 'అడ్మిన్ లాగిన్',
      enterPin: 'అడ్మిన్ పాస్వర్డ్ / పిన్ నమోదు చేయండి',
      loginBtn: 'లాగిన్ అవ్వండి',
      logoutBtn: 'లాగౌట్',
      tabs: {
        videos: 'వీడియోల నిర్వహణ',
        services: 'సేవలు & పరిహారాలు (+/-)',
        ads: 'ప్రైవేట్ యాడ్స్ ఆమోదం',
        googleAds: 'గూగుల్ యాడ్స్',
        leads: 'వచ్చిన అభ్యర్థనలు',
        bigrock: 'Hostinger / cPanel / BigRock',
      },
    },
  },
  en: {
    siteTitle: 'Sadguru Natu Vaidyam & Tantra Center',
    guruName: 'Srinivas Maharaj',
    guruRole: 'Renowned Tantra Healer & Vedic Astrology Expert',
    centerName: 'Sadguru Natu Vaidyam Center',
    phoneLabel: 'Phone Number',
    phoneNumber: '7093586539',
    whatsappLabel: 'Chat on WhatsApp',
    nav: {
      services: 'Services & Remedies',
      videos: 'YouTube Channel',
      yantras: 'Sacred Yantras & Puja',
      pvtAds: 'Private Ads',
      consult: 'Contact Us',
      admin: 'Admin Login',
    },
    hero: {
      badge: '100% Genuine Tantra, Naturopathy & Astrology Remedies',
      heading: 'Permanent Solutions for the Most Complex Life Challenges',
      subheading: 'Under the divine guidance of Srinivas Maharaj: Vashikaran, marital harmony, financial relief, traditional Marugu Mandu, evil eye & black magic removal, and natural herbal remedies for men\'s vitality.',
      callNow: 'Direct Call: 7093586539',
      whatsappChat: 'Message on WhatsApp',
      bookAppointment: 'Get Solution Now',
      trust1: '100% Confidential & Private',
      trust2: 'Consecrated Energized Yantras',
      trust3: 'Rare Herbal Healing Roots',
      trust4: 'Live YouTube Demonstrations',
    },
    services: {
      title: 'Holistic Remedial Services',
      subtitle: 'Root-cause resolution through Sacred Tantra, Naturopathic Herbs, and Vedic Astrology',
      allTab: 'All Services',
      tantraTab: 'Tantra & Vashikaran',
      herbalTab: 'Naturopathy & Vitality',
      relationshipTab: 'Family & Relationships',
      astrologyTab: 'Astrology & Doshas',
      searchPlaceholder: 'Search service or problem...',
      consultBtn: 'Consult Maharaj',
    },
    videos: {
      title: 'Sadguru Natu Vaidyam - YouTube Channel',
      subtitle: 'Watch our video remedies. Any newly uploaded video automatically appears first.',
      addNewVideo: 'Add New Video Link (Admin)',
      latestBadge: 'LATEST VIDEO',
      watchOnYouTube: 'Watch on YouTube',
      playVideo: 'Play Video',
      noVideos: 'No videos found.',
    },
    yantras: {
      title: 'Consecrated Yantras & Sacred Puja Articles',
      subtitle: 'Hand-energized with authentic Vedic mantras by Srinivas Maharaj for prosperity, protection, and harmony.',
      orderNow: 'Inquire / Order',
      energizedGuarantee: '100% Mantra-Energized & Consecrated',
    },
    pvtAds: {
      title: 'Community Classifieds & Private Ads',
      subtitle: 'Post your business or service ad here. Ads appear publicly upon Admin approval.',
      submitAdBtn: 'Post Private Ad (+)',
      categoryLabel: 'Category',
      contactLabel: 'Contact Phone',
      pendingNotice: 'Ad submitted successfully! It will be published upon Admin review.',
    },
    form: {
      title: 'Consult Srinivas Maharaj Directly',
      subtitle: 'Share your problem in confidence. Your identity and information remain strictly private.',
      name: 'Full Name',
      phone: 'Phone Number',
      problemType: 'Problem Category',
      problemDetails: 'Describe your situation',
      submit: 'Request Urgent Remedy',
      successMessage: 'Your inquiry has been submitted! Srinivas Maharaj will contact you shortly.',
    },
    admin: {
      title: 'Srinivas Maharaj - Admin Portal',
      loginTitle: 'Admin Authentication',
      enterPin: 'Enter Admin Password / PIN',
      loginBtn: 'Login',
      logoutBtn: 'Logout',
      tabs: {
        videos: 'Manage Videos',
        services: 'Manage Services (+/-)',
        ads: 'Approve Pvt Ads',
        googleAds: 'Google Ads',
        leads: 'Inquiries',
        bigrock: 'Hostinger / cPanel / BigRock',
      },
    },
  },
};
