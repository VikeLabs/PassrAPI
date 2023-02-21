import { Request } from 'express';
import { CourseInterface } from '../../models/course';
import { CourseItemInterface } from '../../models/courseItem';
import FractionInterface from '../../models/fraction';

export interface BaseBody {
  userId: string;
  id?: string;
  owner?: string;
}

export interface UserBody extends Omit<BaseBody, 'owner'> {
  semesters?: string[];
}

export interface SemesterBody extends BaseBody {
  name: string;
  courses?: string[];
}

export interface CourseBody extends BaseBody {
  name: string;
  desiredGrade?: number | FractionInterface;
  courseItems?: string[];
}

export interface CourseItemBody extends BaseBody {
  name: string;
  weight?: number | FractionInterface;
  grade?: number | FractionInterface;
  date?: string;
}

type _ = Record<string, unknown>;
export type UserRequest = Request<_, UserBody, UserBody>;
