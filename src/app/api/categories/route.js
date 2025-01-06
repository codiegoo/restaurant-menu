// /app/api/categories/route.js

import prisma from '@/lib/prisma.js'; // Asegúrate de que la ruta sea correcta

export async function GET(req) {
  console.log('Handler de categorías cargado');
  try {
    const categories = await prisma.category.findMany();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error del servidor', details: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  const { name, image } = await req.json();
  if (!name || !image) {
    return new Response(JSON.stringify({ error: 'El nombre y la imagen son obligatorios' }), { status: 400 });
  }
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        image,
      },
    });
    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al crear categoría', details: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  const { id, name, image } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ error: 'El ID de la categoría es obligatorio' }), { status: 400 });
  }
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(image && { image }),
      },
    });
    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al actualizar categoría', details: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ error: 'El ID de la categoría es obligatorio' }), { status: 400 });
  }
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    return new Response(JSON.stringify({ message: 'Categoría eliminada correctamente' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al eliminar categoría', details: error.message }), { status: 500 });
  }
}
