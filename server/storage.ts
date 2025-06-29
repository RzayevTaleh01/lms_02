import {
  users,
  courses,
  lessons,
  enrollments,
  assignments,
  submissions,
  blogPosts,
  certificates,
  contactSubmissions,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Lesson,
  type InsertLesson,
  type Enrollment,
  type InsertEnrollment,
  type Assignment,
  type InsertAssignment,
  type Submission,
  type InsertSubmission,
  type BlogPost,
  type InsertBlogPost,
  type Certificate,
  type InsertCertificate,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, like, and, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: UpsertUser & { passwordHash: string }): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getCoursesByInstructor(instructorId: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course | undefined>;

  // Lesson operations
  getLessonsByCourse(courseId: number): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Enrollment operations
  getStudentEnrollments(studentId: string): Promise<(Enrollment & { course: Course })[]>;
  enrollStudent(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: number, progress: number): Promise<void>;

  // Assignment operations
  getAssignmentsByCourse(courseId: number): Promise<Assignment[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;

  // Submission operations
  getSubmissionsByStudent(studentId: string): Promise<(Submission & { assignment: Assignment & { course: Course } })[]>;
  getSubmissionsByAssignment(assignmentId: number): Promise<(Submission & { student: User })[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  gradeSubmission(id: number, grade: number, feedback: string, gradedBy: string): Promise<void>;

  // Blog operations
  getPublishedBlogPosts(): Promise<(BlogPost & { author: User })[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Certificate operations
  getCertificateById(certificateId: string): Promise<(Certificate & { student: User; course: Course }) | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;

  // Contact operations
  createContactSubmission(contact: InsertContactSubmission): Promise<ContactSubmission>;

  // Statistics
  getSystemStats(): Promise<{
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalCertificates: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: UpsertUser & { passwordHash: string }): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(desc(courses.createdAt));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async getCoursesByInstructor(instructorId: string): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.instructorId, instructorId));
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  async updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course | undefined> {
    const [updatedCourse] = await db
      .update(courses)
      .set({ ...course, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return updatedCourse;
  }

  // Lesson operations
  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(and(eq(lessons.courseId, courseId), eq(lessons.isActive, true)))
      .orderBy(lessons.orderIndex);
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [newLesson] = await db.insert(lessons).values(lesson).returning();
    return newLesson;
  }

  // Enrollment operations
  async getStudentEnrollments(studentId: string): Promise<(Enrollment & { course: Course })[]> {
    return await db
      .select()
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.studentId, studentId))
      .then(rows => rows.map(row => ({ ...row.enrollments, course: row.courses })));
  }

  async enrollStudent(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [newEnrollment] = await db.insert(enrollments).values(enrollment).returning();

    // Update course enrollment count
    await db
      .update(courses)
      .set({ enrollmentCount: sql`${courses.enrollmentCount} + 1` })
      .where(eq(courses.id, enrollment.courseId));

    return newEnrollment;
  }

  async updateEnrollmentProgress(id: number, progress: number): Promise<void> {
    await db
      .update(enrollments)
      .set({ progress })
      .where(eq(enrollments.id, id));
  }

  // Assignment operations
  async getAssignmentsByCourse(courseId: number): Promise<Assignment[]> {
    return await db
      .select()
      .from(assignments)
      .where(and(eq(assignments.courseId, courseId), eq(assignments.isActive, true)))
      .orderBy(desc(assignments.createdAt));
  }

  async getAssignment(id: number): Promise<Assignment | undefined> {
    const [assignment] = await db.select().from(assignments).where(eq(assignments.id, id));
    return assignment;
  }

  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const [newAssignment] = await db.insert(assignments).values(assignment).returning();
    return newAssignment;
  }

  // Submission operations
  async getSubmissionsByStudent(studentId: string): Promise<(Submission & { assignment: Assignment & { course: Course } })[]> {
    return await db
      .select()
      .from(submissions)
      .innerJoin(assignments, eq(submissions.assignmentId, assignments.id))
      .innerJoin(courses, eq(assignments.courseId, courses.id))
      .where(eq(submissions.studentId, studentId))
      .orderBy(desc(submissions.submittedAt))
      .then(rows => rows.map(row => ({ 
        ...row.submissions, 
        assignment: { ...row.assignments, course: row.courses }
      })));
  }

  async getSubmissionsByAssignment(assignmentId: number): Promise<(Submission & { student: User })[]> {
    return await db
      .select()
      .from(submissions)
      .innerJoin(users, eq(submissions.studentId, users.id))
      .where(eq(submissions.assignmentId, assignmentId))
      .orderBy(desc(submissions.submittedAt))
      .then(rows => rows.map(row => ({ ...row.submissions, student: row.users })));
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [newSubmission] = await db.insert(submissions).values(submission).returning();
    return newSubmission;
  }

  async gradeSubmission(id: number, grade: number, feedback: string, gradedBy: string): Promise<void> {
    await db
      .update(submissions)
      .set({ grade, feedback, gradedBy, gradedAt: new Date() })
      .where(eq(submissions.id, id));
  }

  // Blog operations
  async getPublishedBlogPosts(): Promise<(BlogPost & { author: User })[]> {
    return await db
      .select()
      .from(blogPosts)
      .innerJoin(users, eq(blogPosts.authorId, users.id))
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt))
      .then(rows => rows.map(row => ({ ...row.blog_posts, author: row.users })));
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  // Certificate operations
  async getCertificateById(certificateId: string): Promise<(Certificate & { student: User; course: Course }) | undefined> {
    const [result] = await db
      .select()
      .from(certificates)
      .innerJoin(users, eq(certificates.studentId, users.id))
      .innerJoin(courses, eq(certificates.courseId, courses.id))
      .where(eq(certificates.certificateId, certificateId));

    if (!result) return undefined;

    return { ...result.certificates, student: result.users, course: result.courses };
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const [newCertificate] = await db.insert(certificates).values(certificate).returning();
    return newCertificate;
  }

  // Contact operations
  async createContactSubmission(contact: InsertContactSubmission): Promise<ContactSubmission> {
    const [newContact] = await db.insert(contactSubmissions).values(contact).returning();
    return newContact;
  }

  // Statistics
  async getSystemStats(): Promise<{
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalCertificates: number;
  }> {
    const [userCount] = await db.select({ count: count() }).from(users);
    const [courseCount] = await db.select({ count: count() }).from(courses);
    const [enrollmentCount] = await db.select({ count: count() }).from(enrollments);
    const [certificateCount] = await db.select({ count: count() }).from(certificates);

    return {
      totalUsers: userCount.count,
      totalCourses: courseCount.count,
      totalEnrollments: enrollmentCount.count,
      totalCertificates: certificateCount.count,
    };
  }
}

export const storage = new DatabaseStorage();