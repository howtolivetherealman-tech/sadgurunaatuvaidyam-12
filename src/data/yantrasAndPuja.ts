export interface YantraItem {
  id: string;
  nameTe: string;
  nameEn: string;
  purposeTe: string;
  purposeEn: string;
  metalTe: string;
  metalEn: string;
  blessingTe: string;
  blessingEn: string;
  tagTe: string;
  tagEn: string;
  imageUrl?: string;
}

export function createYantraProduct(input: {
  nameTe: string;
  nameEn?: string;
  purposeTe: string;
  purposeEn?: string;
  metalTe?: string;
  metalEn?: string;
  blessingTe?: string;
  blessingEn?: string;
  tagTe?: string;
  tagEn?: string;
  imageUrl?: string;
}): YantraItem {
  const cleanNameTe = input.nameTe.trim();
  const cleanNameEn = (input.nameEn || input.nameTe).trim();
  const cleanPurposeTe = input.purposeTe.trim();
  const cleanPurposeEn = (input.purposeEn || input.purposeTe).trim();
  const cleanMetalTe = (input.metalTe || 'స్వచ్ఛమైన రాగి & పూజా ద్రవ్యం').trim();
  const cleanMetalEn = (input.metalEn || cleanMetalTe).trim();
  const cleanBlessingTe = (input.blessingTe || 'శ్రీనివాస్ మహారాజ్ గారి స్వహస్తాల మంత్ర ప్రాణప్రతిష్ట.').trim();
  const cleanBlessingEn = (input.blessingEn || cleanBlessingTe).trim();
  const cleanTagTe = (input.tagTe || 'సిద్ధ యంత్రం / పూజా ద్రవ్యం').trim();
  const cleanTagEn = (input.tagEn || cleanTagTe).trim();

  return {
    id: `yantra_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    nameTe: cleanNameTe,
    nameEn: cleanNameEn,
    purposeTe: cleanPurposeTe,
    purposeEn: cleanPurposeEn,
    metalTe: cleanMetalTe,
    metalEn: cleanMetalEn,
    blessingTe: cleanBlessingTe,
    blessingEn: cleanBlessingEn,
    tagTe: cleanTagTe,
    tagEn: cleanTagEn,
    imageUrl: input.imageUrl?.trim() || '',
  };
}

export function updateYantraImage(items: YantraItem[], id: string, imageUrl: string): YantraItem[] {
  return items.map((item) => (item.id === id ? { ...item, imageUrl } : item));
}

export const yantrasCatalog: YantraItem[] = [
  {
    id: 'sri-maha-yantra',
    nameTe: 'సంపూర్ణ శ్రీ మహా చక్ర యంత్రం',
    nameEn: 'Sri Maha Chakra Consecrated Plate',
    purposeTe: 'ఇంట్లో సకల ఐశ్వర్యం, లక్ష్మీదేవి స్థిర నివాసం, దరిద్ర నాశనం మరియు శాంతి.',
    purposeEn: 'Attracts perpetual abundance, destroys poverty, anchors divine Lakshmi energy.',
    metalTe: 'స్వచ్ఛమైన రాగి & బంగారు పూత (Copper & Gold foil)',
    metalEn: 'Pure Consecrated Copper with Gold Foil',
    blessingTe: '1,08,000 శ్రీసూక్త మంత్ర ప్రాణప్రతిష్ట చేయబడింది.',
    blessingEn: 'Energized with 1,08,000 Sri Sukta mantra recitations.',
    tagTe: 'అత్యంత విశిష్టమైనది',
    tagEn: 'Most Auspicious',
    imageUrl: '',
  },
  {
    id: 'sarva-vashikaran-yantra',
    nameTe: 'సర్వ వశీకరణ సిద్ధ యంత్రం',
    nameEn: 'Sarva Vashikaran Consecrated Yantra',
    purposeTe: 'భార్యాభర్తల అన్యోన్యత, ప్రేమికుల కలయిక, మరియు సర్వజన ఆకర్షణ.',
    purposeEn: 'Restores estranged lovers, aligns husband-wife affection, radiates magnetic harmony.',
    metalTe: 'భోజపత్రం / అష్టధాతువు (Ashtadhatu / Bhojpatra)',
    metalEn: 'Consecrated Bhojpatra & Ashtadhatu',
    blessingTe: 'కామబీజ మంత్ర సంపుటితో ప్రతిష్టించబడింది.',
    blessingEn: 'Infused with Kamabija attraction mantra currents.',
    tagTe: 'శీఘ్ర దాంపత్య శాంతి',
    tagEn: 'Marital Harmony',
    imageUrl: '',
  },
  {
    id: 'maha-sudarshana-raksha',
    nameTe: 'మహా సుదర్శన రక్షా చక్రం',
    nameEn: 'Maha Sudarshana Protection Yantra',
    purposeTe: 'చేతబడి, బాణామతి, నరదిష్టి, శత్రుపీడల నుండి 100% శాశ్వత రక్షణ.',
    purposeEn: 'Destroys black magic, sorcery, psychic hostility, and malevolent curses.',
    metalTe: 'పంచలోహం / గట్టి రాగి రేకు (Panchaloha)',
    metalEn: 'Sacred Panchaloha Plate',
    blessingTe: 'శ్రీనివాస్ మహారాజ్ గారి స్వహస్తాల సుదర్శన హోమ ప్రతిష్ట.',
    blessingEn: 'Energized directly during Sudarshana Maha Homa.',
    tagTe: 'శాశ్వత కవచం',
    tagEn: 'Lifetime Armor',
    imageUrl: '',
  },
  {
    id: 'kuber-dhanakarshana',
    nameTe: 'కుబేర ధనాకర్షణ యంత్రం',
    nameEn: 'Kubera Wealth Attraction Yantra',
    purposeTe: 'వ్యాపార వృద్ధి, అప్పుల విముక్తి, రావలసిన బాకీలు వసూలు కావడం.',
    purposeEn: 'Accelerates business profits, dissolves heavy debts, recovers frozen money.',
    metalTe: 'రాగి పలక (Energized Copper Plate)',
    metalEn: 'Solid Copper Yantra Plate',
    blessingTe: 'కుబేర గాయత్రి మంత్ర పూరితం.',
    blessingEn: 'Infused with Kubera Gayatri Mantras.',
    tagTe: 'వ్యాపార వృద్ధి',
    tagEn: 'Business Prosperity',
    imageUrl: '',
  },
  {
    id: 'manglik-kuja-yantra',
    nameTe: 'కుజ దోష నివారణ & కల్యాణ ప్రాప్తి యంత్రం',
    nameEn: 'Kuja Dosha & Marriage Manifestation Yantra',
    purposeTe: 'పెళ్లిలో ఆటంకాలు, జాతక దోషాలు తొలగి త్వరగా పెళ్లి కుదరడం.',
    purposeEn: 'Removes astrological impediments, Kuja Dosha, and secures early wedding.',
    metalTe: 'ఎర్ర రాగి పలక (Red Copper with Vermilion)',
    metalEn: 'Purified Red Copper Plate',
    blessingTe: 'మంగళ గ్రహ శాంతి హోమ రక్ష.',
    blessingEn: 'Consecrated during Kuja Shanti rituals.',
    tagTe: 'శీఘ్ర వివాహం',
    tagEn: 'Early Matrimony',
    imageUrl: '',
  },
  {
    id: 'original-rudraksha-puja',
    nameTe: 'అసలైన నేపాల్ రుద్రాక్షలు & పూజా వస్తువులు',
    nameEn: 'Genuine Himalayan Rudraksha & Sacred Puja Samagri',
    purposeTe: 'ఏకముఖి నుండి 14 ముఖి వరకు, స్ఫటిక మాల, దక్షిణావర్థి శంఖం, అరుదైన వనమూలికలు.',
    purposeEn: '1-14 Mukhi authentic Nepal Rudrakshas, crystal malas, natural conches, and rare herbs.',
    metalTe: '100% సహజసిద్ధమైన ప్రాకృతిక పవిత్ర ద్రవ్యాలు',
    metalEn: '100% Genuine Certified Forest Items',
    blessingTe: 'శివాభిషేక పూజ జరిపి సిద్ధం చేయబడినవి.',
    blessingEn: 'Purified through Rudrabhisheka rituals.',
    tagTe: 'సంపూర్ణ సామాగ్రి',
    tagEn: 'Complete Samagri',
    imageUrl: '',
  },
];
