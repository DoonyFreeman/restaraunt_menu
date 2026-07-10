// ChaiShopper — GraphQL queries для WPGraphQL.
// Числовые id берём из databaseId (поле id в WPGraphQL — непрозрачный Relay global ID).

import { gql } from './client';
import type {
  WpMenuItem,
  WpLocation,
  WpCeremony,
  WpMenuCategory,
  MenuItem,
  Location,
  Ceremony,
  Category,
} from '../types';

// ─── Queries ─────────────────────────────────────────────────────

const MENU_ITEM_FIELDS = `
  databaseId
  title
  slug
  excerpt
  featuredImage {
    node {
      sourceUrl
    }
  }
  dishFields {
    price
    tags
  }
  menuCategories {
    nodes {
      slug
      name
    }
  }
`;

const LOCATION_FIELDS = `
  databaseId
  title
  slug
  locationFields {
    address
    hours
    phone
    latitude
    longitude
    hiddenItems {
      nodes {
        databaseId
      }
    }
    localItems {
      nodes {
        databaseId
      }
    }
  }
`;

const ALL_MENU_ITEMS = `
  query AllMenuItems {
    dishes(first: 100) {
      nodes {
        ${MENU_ITEM_FIELDS}
      }
    }
  }
`;

const ALL_LOCATIONS = `
  query AllLocations {
    locations(first: 50) {
      nodes {
        ${LOCATION_FIELDS}
      }
    }
  }
`;

const LOCATION_BY_SLUG = `
  query LocationBySlug($slug: ID!) {
    location(id: $slug, idType: SLUG) {
      ${LOCATION_FIELDS}
    }
  }
`;

const ALL_CEREMONIES = `
  query AllCeremonies {
    ceremonies(first: 50) {
      nodes {
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        ceremonyFields {
          durationMin
          price
        }
      }
    }
  }
`;

const ALL_MENU_CATEGORIES = `
  query AllMenuCategories {
    menuCategories(first: 50) {
      nodes {
        name
        slug
      }
    }
  }
`;

// ─── Mappers: WPGraphQL → Domain ─────────────────────────────────

/** WP отдаёт excerpt как HTML (<p>…</p>) — вырезаем теги. */
function stripHtml(html: string | null): string {
  return (html ?? '').replace(/<[^>]*>/g, '').trim();
}

function mapMenuItem(wp: WpMenuItem): MenuItem {
  return {
    id: wp.databaseId,
    cat: wp.menuCategories?.nodes?.[0]?.slug ?? '',
    name: wp.title,
    price: wp.dishFields?.price ?? 0,
    tags: (wp.dishFields?.tags ?? []) as MenuItem['tags'],
    description: stripHtml(wp.excerpt),
    image: wp.featuredImage?.node?.sourceUrl ? `url(${wp.featuredImage.node.sourceUrl})` : '',
  };
}

/** Аппроксимация lat/lng → проценты x/y для faux-карты Москвы (Sprint 5: Leaflet). */
function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  // Центр Москвы ≈ 55.75, 37.62; охват ±0.08°
  const x = Math.round(((lng - 37.54) / 0.16) * 100);
  const y = Math.round(((55.83 - lat) / 0.16) * 100);
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
}

function mapLocation(wp: WpLocation): Location {
  const lat = wp.locationFields?.latitude ?? 55.75;
  const lng = wp.locationFields?.longitude ?? 37.62;
  const { x, y } = latLngToXY(lat, lng);

  return {
    id: String(wp.databaseId),
    name: wp.title,
    slug: wp.slug,
    address: wp.locationFields?.address ?? '',
    hours: wp.locationFields?.hours ?? '',
    phone: wp.locationFields?.phone ?? '',
    latitude: lat,
    longitude: lng,
    hiddenItems: wp.locationFields?.hiddenItems?.nodes?.map((n) => n.databaseId) ?? [],
    localItems: wp.locationFields?.localItems?.nodes?.map((n) => n.databaseId) ?? [],
    x,
    y,
  };
}

function mapCeremony(wp: WpCeremony): Ceremony {
  return {
    id: String(wp.databaseId),
    name: wp.title,
    durationMin: wp.ceremonyFields?.durationMin ?? 0,
    price: wp.ceremonyFields?.price ?? 0,
    description: stripHtml(wp.excerpt),
    image: wp.featuredImage?.node?.sourceUrl ? `url(${wp.featuredImage.node.sourceUrl})` : '',
  };
}

function mapCategory(wp: WpMenuCategory): Category {
  return {
    id: wp.slug,
    name: wp.name,
  };
}

// ─── Fetch functions ─────────────────────────────────────────────

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const data = await gql<{ dishes: { nodes: WpMenuItem[] } }>(ALL_MENU_ITEMS);
  return data.dishes.nodes.map(mapMenuItem);
}

export async function fetchLocations(): Promise<Location[]> {
  const data = await gql<{ locations: { nodes: WpLocation[] } }>(ALL_LOCATIONS);
  return data.locations.nodes.map(mapLocation);
}

export async function fetchLocationBySlug(slug: string): Promise<Location | null> {
  const data = await gql<{ location: WpLocation | null }>(LOCATION_BY_SLUG, { slug });
  return data.location ? mapLocation(data.location) : null;
}

export async function fetchCeremonies(): Promise<Ceremony[]> {
  const data = await gql<{ ceremonies: { nodes: WpCeremony[] } }>(ALL_CEREMONIES);
  return data.ceremonies.nodes.map(mapCeremony);
}

export async function fetchMenuCategories(): Promise<Category[]> {
  const data = await gql<{ menuCategories: { nodes: WpMenuCategory[] } }>(ALL_MENU_CATEGORIES);
  return [
    { id: 'all', name: 'Всё' },
    ...data.menuCategories.nodes.map(mapCategory),
  ];
}

// createReservation придёт в Sprint 6: кастомная мутация на стороне WP
// (register_graphql_mutation) + Route Handler с серверным токеном.
