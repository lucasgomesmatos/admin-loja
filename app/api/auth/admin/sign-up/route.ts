import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';

export async function POST(res: Request) {
  const request = await res.json();

  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3),
    phone: z.string().nullable(),
    cpf: z.string().nullable(),
  });

  const { email, password, name, cpf, phone } = bodySchema.parse(request);

  const userWithEmailAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithEmailAlreadyExists) {
    return Response.json(
      { message: 'User with this email already exists' },
      {
        status: 422,
      },
    );
  }

  const passwordHash = await hash(password, 6);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
      cpf,
      phone,
    },
  });

  return Response.json(
    { user },
    {
      status: 201,
    },
  );
}
