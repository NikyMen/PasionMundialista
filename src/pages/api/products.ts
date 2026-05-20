import type { APIRoute } from 'astro';
import { db } from '../../lib/database';

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
};

const errorHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store'
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = url.searchParams;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    let products;
    
    if (search) {
      products = await db.products.search(search);
    } else if (category) {
      products = await db.products.getByCategory(category);
    } else {
      products = await db.products.getAll();
    }
    
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener productos' }), {
      status: 500,
      headers: errorHeaders,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const productData = await request.json();
    
    // Validación básica
    if (!productData.name || !productData.price || !productData.category) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: errorHeaders,
      });
    }
    
    const newProduct = await db.products.create(productData);
    
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return new Response(JSON.stringify({ error: 'Error al crear producto' }), {
      status: 500,
      headers: errorHeaders,
    });
  }
};
