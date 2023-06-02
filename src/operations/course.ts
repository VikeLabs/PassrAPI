import { get } from 'http';
import getDb from '../initDB';
import { Course, CourseCreate, CourseUpdate,} from '../models';

const db = getDb();

export const createCourse = async (course: CourseCreate): Promise<Course> => {
  return db.course.create({ data: course });
};

export const getCourseById = async (
  id: number,
  ownerId: string
): Promise<Course> => {
  try {
    const course = await db.course.findFirst({ where: { id, ownerId } });
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (e) {
    throw new Error('Course not found');
  }
};

export const getCoursesByOwnerId = async (
  ownerId: string
): Promise<Course[]> => {
  try {
    const courses = await db.course.findMany({ where: { ownerId } });
    if (!courses) {
      throw new Error('Courses not found');
    }
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
    const course = await getCourseById(id, ownerId);
    return db.course.update({ where: { id: course.id }, data });
  } catch (e) {
    throw new Error('Course not found');
  }
};

export const deleteCourse = async (id: number, ownerId: string): Promise<Course> => {
  try {
    const course = await getCourseById(id, ownerId);
    return db.course.delete({ where: { id: course.id } });
  } catch (e) {
    throw new Error('Course not found');
  }
};