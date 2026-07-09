// ChaiShopper — GraphQL client для WPGraphQL.
// Использует native fetch (без внешних библиотек).

const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_INTERNAL || process.env.NEXT_PUBLIC_WP_GRAPHQL || '';

export class GraphQLError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: unknown,
  ) {
    super(message);
    this.name = 'GraphQLError';
  }
}

export async function gql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!WP_GRAPHQL_URL) {
    throw new Error('WP_GRAPHQL_URL is not set. Add NEXT_PUBLIC_WP_GRAPHQL or WP_GRAPHQL_INTERNAL to .env');
  }

  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new GraphQLError(
      `GraphQL request failed: ${res.status} ${res.statusText}`,
      res.status,
      await res.text(),
    );
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new GraphQLError(
      `GraphQL errors: ${json.errors.map((e: { message: string }) => e.message).join(', ')}`,
      200,
      json.errors,
    );
  }

  return json.data as T;
}
