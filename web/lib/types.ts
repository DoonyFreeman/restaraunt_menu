// ChaiShopper — доменные типы.
// Форма совпадает с seed.ts — при переходе на WPGraphQL маппинг идёт 1:1.

export type MenuTag = 'veg' | 'spicy' | 'top';

// ─── Domain types ────────────────────────────────────────────────

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
  latitude: number;
  longitude: number;
  hiddenItems: number[];
  localItems: number[];
  /** Проценты для faux-карты (Sprint 5 заменит на Leaflet). */
  x?: number;
  y?: number;
}

/** «ChaiShopper на Покровке» → «на Покровке» для компактного отображения. */
export function shortName(name: string): string {
  return name.replace('ChaiShopper ', '');
}

export interface Ceremony {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  description: string;
  image: string;
}

export interface Reservation {
  id?: string;
  locationId: string;
  date: string;
  time: string;
  guests: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  notes: string;
  status: 'new' | 'confirmed' | 'cancelled';
}

// ─── WPGraphQL raw shapes ────────────────────────────────────────
// Сырые типы из GraphQL — маппинг → domain types в mappers.ts.

export interface WpMenuItem {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featuredImage: { node: { sourceUrl: string } } | null;
  menuItemFields: {
    price: number;
    tags: string[];
  } | null;
  menuCategories: {
    nodes: Array<{ slug: string; name: string }>;
  } | null;
}

export interface WpLocation {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  locationFields: {
    address: string;
    hours: string;
    phone: string;
    latitude: number;
    longitude: number;
    hiddenItems: { nodes: Array<{ id: string }> } | null;
    localItems: {
      nodes: Array<{
        menuItem: { nodes: Array<{ id: string }> };
      }>;
    } | null;
  } | null;
}

export interface WpCeremony {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featuredImage: { node: { sourceUrl: string } } | null;
  ceremonyFields: {
    durationMin: number;
    price: number;
  } | null;
}

export interface WpMenuCategory {
  id: string;
  name: string;
  slug: string;
}
