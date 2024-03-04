import { prisma } from '@/lib/prisma';
import { createSessionToken } from '@/modules/auth/services/auth-service';
import { compare } from 'bcryptjs';
import z from 'zod';

import { NextRequest } from 'next/server';

export async function POST(res: NextRequest) {
  const request = await res.json();

  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(request);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return Response.json(
      { message: 'Invalid credentials' },
      {
        status: 422,
      },
    );
  }

  const doesPasswordMatches = await compare(password, user.password);

  if (!doesPasswordMatches) {
    return Response.json(
      { message: 'Invalid credentials' },
      {
        status: 422,
      },
    );
  }

  await createSessionToken({
    role: user.role,
    id: user.id,
  });

  return new Response(null, {
    status: 200,
  });
}
