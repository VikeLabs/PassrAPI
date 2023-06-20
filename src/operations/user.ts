import getDb from '../initDB';
import { UserCreate, User } from '../models';

const prisma = getDb();

export async function createUser({ id }: UserCreate): Promise<User> {
  return prisma.user.create({
    data: {
      id,
    },
  });
}
export async function getUser(id: string): Promise<User> {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (!user) throw new Error('User not found');
  return user;
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}
