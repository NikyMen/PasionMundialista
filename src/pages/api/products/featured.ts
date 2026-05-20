import type { APIRoute } from 'astro';
import { db } from '../../../lib/database';

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
};

export const GET: APIRoute = async () => {
  try {
    const featuredProducts = await db.products.getFeatured();
    
    return new Response(JSON.stringify(featuredProducts), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener productos destacados' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  }
};
