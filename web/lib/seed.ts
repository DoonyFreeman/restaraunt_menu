// Временные статические данные ChaiShopper (форма повторяет ui_kits/website/data.js).
// Sprint 2–3 заменят это на WPGraphQL — типы и форма останутся те же.

export type MenuTag = 'veg' | 'spicy' | 'top';

export interface Ceremony {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  description: string;
  image: string;
}

export interface MenuItem {
  id: number;
  cat: string;
  name: string;
  price: number;
  tags: MenuTag[];
  description: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  address: string;
  hours: string;
  phone: string;
  /** Проценты для faux-карты; Sprint 5 заменит на реальные lat/lng + Leaflet. */
  x: number;
  y: number;
}

const TEAPOT = '/design/photo-teapot-dark.jpg';
const GYOZA = '/design/photo-gyoza-dark.jpg';

export const photos = { teapot: TEAPOT, gyoza: GYOZA };

export const ceremonies: Ceremony[] = [
  { id: 'gongfu', name: 'Гунфу Ча', durationMin: 60, price: 2400,
    description: 'Классическая церемония пролива — внимание к каждому настою улуна.',
    image: `linear-gradient(180deg, rgba(20,15,12,0.30), rgba(20,15,12,0.62)), url(${TEAPOT})` },
  { id: 'matcha', name: 'Тядо · Матча', durationMin: 45, price: 1900,
    description: 'Взбивание маття венчиком тясэн в тишине и неспешности.',
    image: 'linear-gradient(160deg,#3a4636,#15130f)' },
  { id: 'puer', name: 'Вечерний Пуэр', durationMin: 75, price: 2800,
    description: 'Глубокий выдержанный чай для медленного завершения дня.',
    image: 'linear-gradient(160deg,#43332a,#120f0c)' },
  { id: 'sencha', name: 'Сэнтя · Зелёный полдень', durationMin: 40, price: 1600,
    description: 'Лёгкий японский зелёный чай и пауза среди дня.',
    image: 'linear-gradient(160deg,#3f4a39,#14130f)' },
  { id: 'milk-oolong', name: 'Молочный улун', durationMin: 50, price: 2100,
    description: 'Сливочные ноты и мягкое тепло в несколько проливов.',
    image: 'linear-gradient(160deg,#4a4030,#15120d)' },
  { id: 'tie-guan-yin', name: 'Те Гуань Инь', durationMin: 65, price: 2600,
    description: 'Глубокий улун «Железная богиня милосердия».',
    image: 'linear-gradient(160deg,#46372c,#120f0b)' },
];

export const categories: Category[] = [
  { id: 'all', name: 'Всё' },
  { id: 'tea', name: 'Чай' },
  { id: 'hot', name: 'Горячее' },
  { id: 'dim', name: 'Дим-сам' },
  { id: 'sweet', name: 'Десерты' },
];

export const menu: MenuItem[] = [
  { id: 1, cat: 'tea', name: 'Улун с горным мёдом', price: 480, tags: ['veg', 'top'],
    description: 'Полуферментированный чай с тёплыми нотами и долгим послевкусием.',
    image: 'linear-gradient(150deg,#6b5b4e,#2a2520)' },
  { id: 2, cat: 'tea', name: 'Маття церемониальная', price: 520, tags: ['veg'],
    description: 'Каменный помол, насыщенный умами и мягкая горчинка.',
    image: 'linear-gradient(150deg,#5d6b4e,#222a20)' },
  { id: 3, cat: 'dim', name: 'Хар Гао с креветкой', price: 590, tags: ['top'],
    description: 'Полупрозрачное тесто, сочная начинка, подача на пару.',
    image: `url(${GYOZA})` },
  { id: 4, cat: 'hot', name: 'Лапша Дан-Дан', price: 640, tags: ['spicy'],
    description: 'Пшеничная лапша, кунжутный соус и сычуаньский перец.',
    image: 'linear-gradient(150deg,#7a4f3e,#2a1a14)' },
  { id: 5, cat: 'dim', name: 'Баоцзы с уткой', price: 560, tags: [],
    description: 'Пышные паровые булочки с томлёной уткой и хойсин.',
    image: `url(${GYOZA})` },
  { id: 6, cat: 'sweet', name: 'Моти с кунжутом', price: 380, tags: ['veg', 'top'],
    description: 'Рисовое тесто и чёрный кунжут — мягкий, тягучий десерт.',
    image: 'linear-gradient(150deg,#5a5048,#1f1b16)' },
];

export const locations: Location[] = [
  { id: 'pokrovka', name: 'ChaiShopper на Покровке', slug: 'pokrovka',
    address: 'Покровка, 12, Москва', hours: 'Пн–Вс · 10:00–23:00', phone: '+7 495 120-44-10', x: 62, y: 40 },
  { id: 'patriki', name: 'ChaiShopper на Патриках', slug: 'patriki',
    address: 'Малая Бронная, 24, Москва', hours: 'Пн–Вс · 09:00–24:00', phone: '+7 495 120-44-12', x: 38, y: 33 },
  { id: 'gorky', name: 'ChaiShopper в Парке Горького', slug: 'gorky',
    address: 'Крымский Вал, 9, Москва', hours: 'Пн–Вс · 11:00–22:00', phone: '+7 495 120-44-15', x: 51, y: 64 },
];

export function locationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
