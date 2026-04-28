import type { APIRoute } from 'astro';
import { db, ensureDatabaseReady } from '../../../lib/database';

export const GET: APIRoute = async () => {
  try {
    await ensureDatabaseReady();

    const featuredProducts = await db.products.getFeatured();
    
    return new Response(JSON.stringify(featuredProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener productos destacados' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
