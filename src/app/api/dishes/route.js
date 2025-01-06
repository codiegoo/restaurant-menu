// /app/api/dishes/route.js

import prisma from '@/lib/prisma.js'; // Asegúrate de que la ruta sea correcta

export async function GET(req) {
  const { categoryId } = new URL(req.url).searchParams;

  try {
    // Si no se proporciona un categoryId, obtener todos los platillos con sus categorías
    if (!categoryId) {
      const dishes = await prisma.dish.findMany({
        include: {
          category: true, // Incluir información de la categoría
        },
      });
      return new Response(JSON.stringify(dishes), { status: 200 });
    }

    // Si se proporciona un categoryId, obtener solo los platillos de esa categoría
    const dishesByCategory = await prisma.dish.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: {
        category: true, // Incluir información de la categoría
      },
    });

    return new Response(JSON.stringify(dishesByCategory), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error del servidor', details: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  const { name, price, image, categoryId } = await req.json();

  if (!name || !price || !image || !categoryId) {
    return new Response(JSON.stringify({ error: 'Todos los campos son obligatorios' }), { status: 400 });
  }

  try {
    const newDish = await prisma.dish.create({
      data: {
        name,
        price: parseFloat(price),
        image,
        categoryId: parseInt(categoryId)
      },
    });
    return new Response(JSON.stringify(newDish), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al crear platillo', details: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  const { id, name, price, image, categoryId } = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'El ID del platillo es obligatorio' }), { status: 400 });
  }

  try {
    const updatedDish = await prisma.dish.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(price && { price: parseFloat(price) }),
        ...(image && { image }),
        ...(categoryId && { categoryId }),
      },
    });

    return new Response(JSON.stringify(updatedDish), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al actualizar platillo', details: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'El ID del platillo es obligatorio' }), { status: 400 });
  }

  try {
    await prisma.dish.delete({
      where: { id: parseInt(id) },
    });
    return new Response(JSON.stringify({ message: 'Platillo eliminado correctamente' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al eliminar platillo', details: error.message }), { status: 500 });
  }
}
