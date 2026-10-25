import type { APIRoute } from 'astro';
import { getSearchIndex } from '../utils/searchIndex';

export const GET: APIRoute = async () => {
  const searchIndex = await getSearchIndex();
  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
