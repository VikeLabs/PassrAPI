import { get } from 'http';
import getDb from '../initDB';
import { Course, CourseCreate, CourseUpdate,} from '../models';

const db = getDb();

export const createCourse = async (course: CourseCreate): Promise<Course> => {
  return db.course.create({ data: course });
};

export const getCourse = async (
  id: number,
  ownerId: string
): Promise<Course> => {
  try {
    const course = await db.course.findFirstOrThrow({ where: { id, ownerId } });
    return course;
  } catch (e) {
    throw new Error('Course not found');
  }
};

export const getCourses = async (
  ownerId: string,
  semesterId?: number
): Promise<Course[]> => {
  try {
    const courses = await db.course.findMany({
      where: { ownerId, semesterId },
    });
    return courses;
  } catch (e) {
    throw new Error('Courses not found');
  }
};

export const updateCourse = async (
  id: number,
  ownerId: string,
  data: CourseUpdate
): Promise<Course> => {
  try {
    const course = await getCourse(id, ownerId);
    return db.course.update({ where: { id: course.id }, data });
  } catch (e) {
    throw new Error('Course not found');
  }
};

export const deleteCourse = async (
  id: number,
  ownerId: string
): Promise<Course> => {
  try {
    const course = await getCourse(id, ownerId);
    return db.course.delete({ where: { id: course.id } });
  } catch (e) {
    throw new Error('Course not found');
  }
};
