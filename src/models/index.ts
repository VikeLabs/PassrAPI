import { User, Semester, Course, CourseItem } from '@prisma/client';
export { User, Semester, Course, CourseItem };
export type UserCreate = Pick<User, 'id'>;

export type SemesterCreate = Pick<Semester, 'name' | 'ownerId'>;

export type SemesterUpdate = Partial<Pick<SemesterCreate, 'name'>>;

export type CourseCreate = Pick<Course, 'name' | 'semesterId' | 'ownerId'> &
  Partial<Pick<Course, 'desiredGrade'>>;

export type CourseUpdate = Partial<Pick<Course, 'name' | 'desiredGrade'>>;

export type CourseItemCreate = Pick<
  CourseItem,
  'name' | 'courseId' | 'ownerId'
> &
  Partial<Pick<CourseItem, 'weight' | 'numerator' | 'denominator' | 'dueDate'>>;

export type CourseItemUpdate = Partial<
  Pick<CourseItem, 'name' | 'weight' | 'numerator' | 'denominator' | 'dueDate'>
>;
