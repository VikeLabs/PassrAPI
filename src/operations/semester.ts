import { SemesterCreate, SemesterUpdate, Semester } from '../models'; // Replace with the correct import path for your interfaces
import getDb from '../initDB'; // Replace with the correct import path for your getDb function

const prisma = getDb();

export async function createSemester(data: SemesterCreate): Promise<Semester> {
  return prisma.semester.create({
    data: {
      name: data.name,
      ownerId: data.ownerId,
    },
  });
}

export async function getSemesterById(
  id: number,
  ownerId: string
): Promise<Semester> {
  try {
    const semester = await prisma.semester.findFirst({
      where: { id, ownerId },
    });
    if (!semester) throw new Error('');
    return semester;
  } catch (e) {
    throw new Error('Semester not found');
  }
}

export async function getSemestersByOwnerId(
  ownerId: string
): Promise<Semester[]> {
  try {
    return prisma.semester.findMany({
      where: { ownerId },
    });
  } catch (e) {
    throw new Error('Semesters not found');
  }
}

export async function updateSemester(
  id: number,
  ownerId: string,
  data: SemesterUpdate
): Promise<Semester> {
  try {
    const semester = await getSemesterById(id, ownerId);
    return prisma.semester.update({
      where: { id: semester.id },
      data: {
        name: data.name,
      },
    });
  } catch (e) {
    throw new Error('Semester not found');
  }
}

export async function deleteSemester(
  id: number,
  ownerId: string
): Promise<Semester> {
  try {
    const semester = await getSemesterById(id, ownerId);
    return prisma.semester.delete({
      where: { id: semester.id },
    });
  } catch (e) {
    throw new Error('Semester not found');
  }
}
