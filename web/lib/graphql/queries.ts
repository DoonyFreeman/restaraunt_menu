// ChaiShopper — GraphQL queries для WPGraphQL.

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

const ALL_MENU_ITEMS = `
  query AllMenuItems {
    menuItems(first: 100) {
      nodes {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        menuItemFields {
          price
          tags
        }
        menuCategories {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`;

const ALL_LOCATIONS = `
  query AllLocations {
    locations(first: 50) {
      nodes {
        id
        title
        slug
        content
        locationFields {
          address
          hours
          phone
          latitude
          longitude
          hiddenItems {
            nodes {
              id
            }
          }
          localItems {
            nodes {
              menuItem {
                nodes {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ALL_CEREMONIES = `
  query AllCeremonies {
    ceremonies(first: 50) {
      nodes {
        id
        title
        slug
        content
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
        id
        name
        slug
      }
    }
  }
`;

const LOCATION_BY_SLUG = `
  query LocationBySlug($slug: String!) {
    locationBy(uri: $slug) {
      id
      title
      slug
      content
      locationFields {
        address
        hours
        phone
        latitude
        longitude
        hiddenItems {
          nodes {
            id
          }
        }
        localItems {
          nodes {
            menuItem {
              nodes {
                id
                title
                slug
                content
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                menuItemFields {
                  price
                  tags
                }
                menuCategories {
                  nodes {
                    slug
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_RESERVATION = `
  mutation CreateReservation(
    $locationId: ID!
    $date: String!
    $time: String!
    $guests: Int!
    $guestName: String!
    $guestPhone: String!
    $guestEmail: String!
    $notes: String
  ) {
    createReservation(input: {
      title: $guestName
      status: NEW
      locationId: $locationId
      reservationFields: {
        date: $date
        time: $time
        guests: $guests
        guestName: $guestName
        guestPhone: $guestPhone
        guestEmail: $guestEmail
        notes: $notes
      }
    }) {
      reservation {
        id
      }
    }
  }
`;

// ─── Mappers: WPGraphQL → Domain ─────────────────────────────────

function mapMenuItem(wp: WpMenuItem): MenuItem {
  const catSlug = wp.menuCategories?.nodes?.[0]?.slug ?? '';
  const tags = (wp.menuItemFields?.tags ?? []) as MenuItem['tags'];

  return {
    id: parseInt(wp.id.replace('post-', ''), 10),
    cat: catSlug,
    name: wp.title,
    price: wp.menuItemFields?.price ?? 0,
    tags,
    description: wp.content ?? '',
    image: wp.featuredImage?.node?.sourceUrl ?? '',
  };
}

/** Аппроксимация lat/lng → проценты x/y для faux-карты Москвы. */
function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  // Центр Москвы ≈ 55.75, 37.62; охват ±0.08°
  const x = Math.round(((lng - 37.54) / 0.16) * 100);
  const y = Math.round(((55.83 - lat) / 0.16) * 100);
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
}

function mapLocation(wp: WpLocation): Location {
  const hidden = wp.locationFields?.hiddenItems?.nodes?.map((n) =>
    parseInt(n.id.replace('post-', ''), 10),
  ) ?? [];

  const local = wp.locationFields?.localItems?.nodes?.flatMap((n) =>
    n.menuItem.nodes.map((mi) => parseInt(mi.id.replace('post-', ''), 10)),
  ) ?? [];

  const lat = wp.locationFields?.latitude ?? 55.75;
  const lng = wp.locationFields?.longitude ?? 37.62;
  const { x, y } = latLngToXY(lat, lng);

  return {
    id: wp.id.replace('post-', ''),
    name: wp.title,
    slug: wp.slug,
    address: wp.locationFields?.address ?? '',
    hours: wp.locationFields?.hours ?? '',
    phone: wp.locationFields?.phone ?? '',
    latitude: lat,
    longitude: lng,
    hiddenItems: hidden,
    localItems: local,
    x,
    y,
  };
}

function mapCeremony(wp: WpCeremony): Ceremony {
  return {
    id: wp.id.replace('post-', ''),
    name: wp.title,
    durationMin: wp.ceremonyFields?.durationMin ?? 0,
    price: wp.ceremonyFields?.price ?? 0,
    description: wp.content ?? '',
    image: wp.featuredImage?.node?.sourceUrl ?? '',
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
  const data = await gql<{ menuItems: { nodes: WpMenuItem[] } }>(ALL_MENU_ITEMS);
  return data.menuItems.nodes.map(mapMenuItem);
}

export async function fetchLocations(): Promise<Location[]> {
  const data = await gql<{ locations: { nodes: WpLocation[] } }>(ALL_LOCATIONS);
  return data.locations.nodes.map(mapLocation);
}

export async function fetchLocationBySlug(slug: string): Promise<Location | null> {
  const data = await gql<{ locationBy: WpLocation | null }>(LOCATION_BY_SLUG, { slug });
  return data.locationBy ? mapLocation(data.locationBy) : null;
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

export async function createReservation(input: {
  locationId: string;
  date: string;
  time: string;
  guests: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  notes?: string;
}): Promise<{ id: string } | null> {
  const data = await gql<{
    createReservation: { reservation: { id: string } } | null;
  }>(CREATE_RESERVATION, input);
  return data.createReservation?.reservation ?? null;
}
