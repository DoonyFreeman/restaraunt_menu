// ChaiShopper — доменные типы (форма задана дизайн-китом ui_kits/website/data.js).
// WP-ответы приводятся к этим типам мапперами в lib/graphql/queries.ts.

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
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: { node: { sourceUrl: string } } | null;
  dishFields: {
    price: number | null;
    tags: string[] | null;
  } | null;
  menuCategories: {
    nodes: Array<{ slug: string; name: string }>;
  } | null;
}

export interface WpLocation {
  databaseId: number;
  title: string;
  slug: string;
  locationFields: {
    address: string | null;
    hours: string | null;
    phone: string | null;
    latitude: number | null;
    longitude: number | null;
    hiddenItems: { nodes: Array<{ databaseId: number }> } | null;
    localItems: { nodes: Array<{ databaseId: number }> } | null;
  } | null;
}

export interface WpCeremony {
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: { node: { sourceUrl: string } } | null;
  ceremonyFields: {
    durationMin: number | null;
    price: number | null;
  } | null;
}

export interface WpMenuCategory {
  name: string;
  slug: string;
}
