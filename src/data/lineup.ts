export interface Stage {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  emoji: string;
}

export interface Show {
  id: number;
  artist: string;
  stage: string;
  start: string;
  end: string;
  genre: string;
  bio: string;
}

export const STAGES: Stage[] = [
  { id: "budweiser", name: "Palco Budweiser", color: "#FFB3B3", bgColor: "#FFF0F0", emoji: "🔥" },
  { id: "samsung", name: "Palco Samsung Galaxy", color: "#B3D4FF", bgColor: "#F0F5FF", emoji: "💎" },
  { id: "flyingfish", name: "Palco Flying Fish", color: "#B3FFD9", bgColor: "#F0FFF5", emoji: "🐟" },
  { id: "perrys", name: "Palco Perry's by Fiat", color: "#FFE0B3", bgColor: "#FFFAF0", emoji: "⚡" },
];

export const SHOWS: Show[] = [
  // Palco Budweiser
  { id: 1, artist: "Papisa", stage: "budweiser", start: "12:45", end: "13:40", genre: "Rap BR", bio: "Rap pesado com flow certeiro. Representatividade feminina no hip hop brasileiro 🎤🔥" },
  { id: 2, artist: "Mundo Livre S/A", stage: "budweiser", start: "14:45", end: "15:45", genre: "Manguebeat", bio: "Lenda do manguebeat direto de Recife. Mistura rock, funk e ritmos nordestinos desde os 90s 🌊" },
  { id: 3, artist: "Djo", stage: "budweiser", start: "16:55", end: "17:55", genre: "Indie/Psych Rock", bio: "Joe Keery (sim, o Steve de Stranger Things) fazendo indie psicodélico absurdamente bom 🍦" },
  { id: 4, artist: "Turnstile", stage: "budweiser", start: "19:05", end: "20:05", genre: "Hardcore/Punk", bio: "Hardcore que até quem não curte hardcore ama. Energia insana ao vivo, mosh pit garantido 🤘" },
  { id: 5, artist: "Tyler, The Creator", stage: "budweiser", start: "21:30", end: "22:45", genre: "Hip Hop/Art Pop", bio: "Gênio criativo. Cada álbum é um universo. IGOR mudou o jogo. Headliner absoluto 👑" },

  // Palco Samsung Galaxy
  { id: 6, artist: "Jonabug", stage: "samsung", start: "12:00", end: "12:45", genre: "Indie Pop", bio: "Pop indie fresquinho com letras que grudam. Promessa do cenário alternativo 🌻" },
  { id: 7, artist: "Nina Maia", stage: "samsung", start: "13:40", end: "14:40", genre: "Rock/Blues", bio: "Guitarrista absurda. Blues, rock e soul com uma presença de palco magnética 🎸" },
  { id: 8, artist: "Royel Otis", stage: "samsung", start: "15:50", end: "16:50", genre: "Indie Rock", bio: "Dupla australiana. Rock de praia com pegada 70s, perfeito pra tarde de sol ☀️" },
  { id: 9, artist: "Addison Rae", stage: "samsung", start: "18:00", end: "19:00", genre: "Pop", bio: "De TikToker a popstar. Guilty pleasure oficial de 2026, ninguém tá preparado 💅" },
  { id: 10, artist: "Lorde", stage: "samsung", start: "20:10", end: "21:25", genre: "Art Pop", bio: "Melodrama é obra-prima. Solar Power dividiu opiniões. Ao vivo é transcendental ✨" },

  // Palco Flying Fish
  { id: 11, artist: "Papangu", stage: "flyingfish", start: "12:45", end: "13:40", genre: "Psych Rock", bio: "Rock psicodélico pesado de Recife. Pra quem curte Tame Impala mas quer mais peso 🌀" },
  { id: 12, artist: "Balu Brigada", stage: "flyingfish", start: "14:45", end: "15:45", genre: "Electro Pop", bio: "Irmãos suecos-brasileiros. Electro pop dançante que funciona tanto no fone quanto ao vivo 💃" },
  { id: 13, artist: "Oruã", stage: "flyingfish", start: "16:55", end: "17:55", genre: "Noise/Shoegaze", bio: "Shoegaze brasileiro que faz barulho bonito. Parede de som hipnotizante 🎆" },
  { id: 14, artist: "FBC", stage: "flyingfish", start: "19:05", end: "20:05", genre: "Rap/R&B", bio: "Rap melódico com R&B. Letra afiada, flow suave. Um dos melhores do rap BR atual 🎶" },
  { id: 15, artist: "Katseye", stage: "flyingfish", start: "21:30", end: "22:30", genre: "K-Pop/Pop", bio: "Girl group global formado por reality show. Coreografia impecável, hits chiclete 🐱" },

  // Palco Perry's by Fiat
  { id: 16, artist: "Flávia Durante", stage: "perrys", start: "12:00", end: "12:45", genre: "House/Techno", bio: "DJ brasileira raiz. House e techno que faz o Perry's tremer desde cedo 🔊" },
  { id: 17, artist: "Entropia", stage: "perrys", start: "13:00", end: "13:45", genre: "Bass/Electronic", bio: "Bass music pesada. Grave que você sente no peito, não só no ouvido 🫀" },
  { id: 18, artist: "Analu", stage: "perrys", start: "14:00", end: "15:00", genre: "Pop/R&B", bio: "Pop brasileiro com pegada R&B. Voz suave, letras que conectam 🌸" },
  { id: 19, artist: "Alírio", stage: "perrys", start: "15:15", end: "16:15", genre: "Electronic/Afro", bio: "Batidas eletrônicas com raiz afro-brasileira. Faz qualquer um dançar 🪘" },
  { id: 20, artist: "Idlibra", stage: "perrys", start: "16:30", end: "17:30", genre: "Electronic", bio: "Produtor de eletrônica experimental que tá chamando atenção no underground 🎛️" },
  { id: 21, artist: "Zopelar", stage: "perrys", start: "17:45", end: "18:45", genre: "Afro House", bio: "Afro house que mistura samples brasileiros com batida sul-africana. Hipnotizante 🌍" },
  { id: 22, artist: "Róz", stage: "perrys", start: "19:00", end: "20:00", genre: "Electronic/Pop", bio: "Pop eletrônico dançante. Energia boa e visual impecável ✨" },
  { id: 23, artist: "¥ousuke ¥uk1matsu", stage: "perrys", start: "20:15", end: "21:30", genre: "Electronic/Bass", bio: "DJ japonês radicado no Brasil. Bass music com influência asiática, set imprevisível 🇯🇵" },
  { id: 24, artist: "Peggy Gou", stage: "perrys", start: "21:45", end: "23:15", genre: "House/Techno", bio: "A DJ mais hypada do mundo. House groovy que fecha qualquer festival com chave de ouro 🪩" },
];
