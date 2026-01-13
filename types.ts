
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar: string;
  enrolledCourses: string[];
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  description: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  category: string;
  modules: Module[];
}

export interface CourseProgress {
  courseId: string;
  completedLessons: string[]; // lesson IDs
  lastAccessed: number;
}

export interface AppState {
  user: User | null;
  courses: Course[];
  progress: Record<string, CourseProgress>;
}
