import { get } from 'http';
import getDb from '../initDB';
import { CourseItem, CourseItemCreate, CourseItemUpdate } from '../models';

const db = getDb();

export const createCourseItem = async (
  courseItem: CourseItemCreate
): Promise<CourseItem> => {
  return db.courseItem.create({ data: courseItem });
};

export const getCourseItemById = async (
  id: number,
  ownerId: string
): Promise<CourseItem> => {
  try {
    const courseItem = await db.courseItem.findFirst({
      where: { id, ownerId },
    });
    if (!courseItem) {
      throw new Error('CourseItem not found');
    }
    return courseItem;
  } catch (e) {
    throw new Error('CourseItem not found');
  }
};

export const getCourseItemsByOwnerId = async (
  ownerId: string
): Promise<CourseItem[]> => {
  try {
    const courseItems = await db.courseItem.findMany({
      where: { ownerId },
    });
    if (!courseItems) {
      throw new Error('CourseItems not found');
    }
    return courseItems;
  } catch (e) {
    throw new Error('CourseItems not found');
  }
};

export const updateCourseItem = async (
  id: number,
  ownerId: string,
  data: CourseItemUpdate
): Promise<CourseItem> => {
  try {
    const courseItem = await getCourseItemById(id, ownerId);
    return db.courseItem.update({ where: { id: courseItem.id }, data });
  } catch (e) {
    throw new Error('CourseItem not found');
  }
};

export const deleteCourseItem = async (id: number, ownerId: string): Promise<CourseItem> => {
  try {
    const courseItem = await getCourseItemById(id, ownerId);
    return db.courseItem.delete({ where: { id: courseItem.id } });
  } catch (e) {
    throw new Error('CourseItem not found');
  }
};
