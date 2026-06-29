// Mock content for the ChaiShopper website UI kit. Real atmospheric photos
// (free Unsplash, downloaded into assets/) for hero + dim-sum; warm gradients elsewhere.
const PH = '../../assets/photo-teapot-dark.jpg';
const PG = '../../assets/photo-gyoza-dark.jpg';

window.CHAI = {
  photos: { teapot: PH, gyoza: PG },
  ceremonies: [
    { id: 'gongfu', name: 'Гунфу Ча', durationMin: 60, price: 2400,
      description: 'Классическая церемония пролива — внимание к каждому настою улуна.',
      image: 'linear-gradient(180deg, rgba(20,15,12,0.30), rgba(20,15,12,0.62)), url(' + PH + ')' },
    { id: 'matcha', name: 'Тядо · Матча', durationMin: 45, price: 1900,
      description: 'Взбивание маття венчиком тясэн в тишине и неспешности.',
      image: 'linear-gradient(160deg,#3a4636,#15130f)' },
    { id: 'puer', name: 'Вечерний Пуэр', durationMin: 75, price: 2800,
      description: 'Глубокий выдержанный чай для медленного завершения дня.',
      image: 'linear-gradient(160deg,#43332a,#120f0c)' },
  ],
  categories: [
    { id: 'all', name: 'Всё' },
    { id: 'tea', name: 'Чай' },
    { id: 'hot', name: 'Горячее' },
    { id: 'dim', name: 'Дим-сам' },
    { id: 'sweet', name: 'Десерты' },
  ],
  menu: [
    { id: 1, cat: 'tea', name: 'Улун с горным мёдом', price: 480, tags: ['veg','top'],
      description: 'Полуферментированный чай с тёплыми нотами и долгим послевкусием.',
      image: 'linear-gradient(150deg,#6b5b4e,#2a2520)' },
    { id: 2, cat: 'tea', name: 'Маття церемониальная', price: 520, tags: ['veg'],
      description: 'Каменный помол, насыщенный умами и мягкая горчинка.',
      image: 'linear-gradient(150deg,#5d6b4e,#222a20)' },
    { id: 3, cat: 'dim', name: 'Хар Гао с креветкой', price: 590, tags: ['top'],
      description: 'Полупрозрачное тесто, сочная начинка, подача на пару.',
      image: 'url(' + PG + ')' },
    { id: 4, cat: 'hot', name: 'Лапша Дан-Дан', price: 640, tags: ['spicy'],
      description: 'Пшеничная лапша, кунжутный соус и сычуаньский перец.',
      image: 'linear-gradient(150deg,#7a4f3e,#2a1a14)' },
    { id: 5, cat: 'dim', name: 'Баоцзы с уткой', price: 560, tags: [],
      description: 'Пышные паровые булочки с томлёной уткой и хойсин.',
      image: 'url(' + PG + ')' },
    { id: 6, cat: 'sweet', name: 'Моти с кунжутом', price: 380, tags: ['veg','top'],
      description: 'Рисовое тесто и чёрный кунжут — мягкий, тягучий десерт.',
      image: 'linear-gradient(150deg,#5a5048,#1f1b16)' },
  ],
  locations: [
    { id: 'pokrovka', name: 'ChaiShopper на Покровке', slug: 'pokrovka',
      address: 'Покровка, 12, Москва', hours: 'Пн–Вс · 10:00–23:00', phone: '+7 495 120-44-10',
      x: 62, y: 40 },
    { id: 'patriki', name: 'ChaiShopper на Патриках', slug: 'patriki',
      address: 'Малая Бронная, 24, Москва', hours: 'Пн–Вс · 09:00–24:00', phone: '+7 495 120-44-12',
      x: 38, y: 33 },
    { id: 'gorky', name: 'ChaiShopper в Парке Горького', slug: 'gorky',
      address: 'Крымский Вал, 9, Москва', hours: 'Пн–Вс · 11:00–22:00', phone: '+7 495 120-44-15',
      x: 51, y: 64 },
  ],
};
