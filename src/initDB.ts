import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const getDb = () => prisma;

export default getDb;
