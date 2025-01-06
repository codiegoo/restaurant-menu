

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  // Validar credenciales en el servidor usando variables de entorno
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false, error: 'Credenciales incorrectas' }, { status: 401 });
}
