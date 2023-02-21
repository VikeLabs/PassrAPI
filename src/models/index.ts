export interface User {
	id: string;
	semesters: Semester[];
	courses: Course[];
	items: CourseItem[];

	createdAt: Date;
	updatedAt: Date;
}

export interface Semester {
	id: number;
	name: string;
	courses: Course[];
	ownerId: number;
	owner: User;

	createdAt: Date;
	updatedAt: Date;
}

export interface Course {
	id: number;
	name: string;
	items: CourseItem[];
	desiredGrade?: number | null;
	ownerId: number;
	semesterId: number;
	owner: User;
	semester: Semester;

	createdAt: Date;
	updatedAt: Date;
}

export interface CourseItem {
	id: number;
	name: string;
	weight?: number | null;
	numerator?: number;
	denominator?: number | null;
	dueDate?: Date;
	ownerId: number;
	courseId: number;
	owner: User;
	course: Course;

	createdAt: Date;
	updatedAt: Date;
}
