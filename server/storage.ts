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
  lessonSessions,
  attendance,
  lessonMaterials,
  lessonAssignments,
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
  type LessonSession,
  type InsertLessonSession,
  type Attendance,
  type InsertAttendance,
  type LessonMaterial,
  type InsertLessonMaterial,
  type LessonAssignment,
  type InsertLessonAssignment,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, like, and, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
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

  getCourseStudents(courseId: number): Promise<
    {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      enrolledAt: Date;
      progress: number;
      grade: number;
    }[]
  >;

  // Lesson session operations
  createLessonSession(session: InsertLessonSession): Promise<LessonSession>;
  endLessonSession(sessionId: number, duration: number): Promise<void>;
  getActiveLessonSession(courseId: number): Promise<LessonSession | undefined>;
  getLessonSessions(courseId: number): Promise<LessonSession[]>;
  getLessonSessionById(sessionId: number): Promise<LessonSession | undefined>;

  // Attendance operations
  markAttendance(attendance: InsertAttendance): Promise<Attendance>;
  getSessionAttendance(sessionId: number): Promise<(Attendance & { student: User })[]>;
  getStudentAttendance(courseId: number, studentId: string): Promise<Attendance[]>;

  // Lesson materials operations
  createLessonMaterial(material: InsertLessonMaterial): Promise<LessonMaterial>;
  getLessonMaterials(lessonId: number): Promise<LessonMaterial[]>;
  updateLessonMaterial(id: number, material: Partial<InsertLessonMaterial>): Promise<LessonMaterial | undefined>;

  // Lesson assignments operations
  createLessonAssignment(assignment: InsertLessonAssignment): Promise<LessonAssignment>;
  getLessonAssignments(lessonId: number): Promise<LessonAssignment[]>;
  getAssignmentSubmissions(assignmentId: number): Promise<(Submission & { student: User })[]>;

  // Course enrollment operations
  removeStudentFromCourse(courseId: number, studentId: string): Promise<void>;

  // Active session operations
  getAllActiveSessions(): Promise<(LessonSession & { courseName: string })[]>;
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

  async getAllUsers(): Promise<User[]> {
    return await db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt
    }).from(users).orderBy(users.firstName, users.lastName);
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

  async getCourseStudents(courseId: number): Promise<
    {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      enrolledAt: Date;
      progress: number;
      grade: number;
    }[]
  > {
    const result = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        enrolledAt: enrollments.enrolledAt,
        progress: enrollments.progress,
        grade: enrollments.grade,
      })
      .from(enrollments)
      .innerJoin(users, eq(enrollments.studentId, users.id))
      .where(and(eq(enrollments.courseId, courseId), eq(users.role, 'student')))
      .orderBy(users.firstName, users.lastName);

    return result;
  }

  // Lesson session operations
  async createLessonSession(session: InsertLessonSession): Promise<LessonSession> {
    const [newSession] = await db.insert(lessonSessions).values(session).returning();
    return newSession;
  }

  async endLessonSession(sessionId: number, duration: number): Promise<void> {
    await db
      .update(lessonSessions)
      .set({ 
        endTime: new Date(), 
        duration,
        isActive: false 
      })
      .where(eq(lessonSessions.id, sessionId));
  }

  async getActiveLessonSession(courseId: number): Promise<LessonSession | undefined> {
    const [session] = await db
      .select()
      .from(lessonSessions)
      .where(and(eq(lessonSessions.courseId, courseId), eq(lessonSessions.isActive, true)));
    return session;
  }

  async getLessonSessions(courseId: number): Promise<LessonSession[]> {
    return await db
      .select()
      .from(lessonSessions)
      .where(eq(lessonSessions.courseId, courseId))
      .orderBy(desc(lessonSessions.startTime));
  }

  async getLessonSessionById(sessionId: number): Promise<LessonSession | undefined> {
    const [session] = await db
      .select()
      .from(lessonSessions)
      .where(eq(lessonSessions.id, sessionId));
    return session;
  }

  // Attendance operations
  async markAttendance(attendanceData: InsertAttendance): Promise<Attendance> {
    const [newAttendance] = await db.insert(attendance).values(attendanceData).returning();
    return newAttendance;
  }

  async getSessionAttendance(sessionId: number): Promise<(Attendance & { student: User })[]> {
    return await db
      .select()
      .from(attendance)
      .innerJoin(users, eq(attendance.studentId, users.id))
      .where(eq(attendance.sessionId, sessionId))
      .then(rows => rows.map(row => ({ ...row.attendance, student: row.users })));
  }

  async getStudentAttendance(courseId: number, studentId: string): Promise<Attendance[]> {
    return await db
      .select()
      .from(attendance)
      .where(and(eq(attendance.courseId, courseId), eq(attendance.studentId, studentId)))
      .orderBy(desc(attendance.markedAt));
  }

  // Lesson materials operations
  async createLessonMaterial(material: InsertLessonMaterial): Promise<LessonMaterial> {
    const [newMaterial] = await db.insert(lessonMaterials).values(material).returning();
    return newMaterial;
  }

  async getLessonMaterials(lessonId: number): Promise<LessonMaterial[]> {
    return await db
      .select()
      .from(lessonMaterials)
      .where(and(eq(lessonMaterials.lessonId, lessonId), eq(lessonMaterials.isActive, true)))
      .orderBy(lessonMaterials.orderIndex);
  }

  async updateLessonMaterial(id: number, material: Partial<InsertLessonMaterial>): Promise<LessonMaterial | undefined> {
    const [updatedMaterial] = await db
      .update(lessonMaterials)
      .set(material)
      .where(eq(lessonMaterials.id, id))
      .returning();
    return updatedMaterial;
  }

  // Lesson assignments operations
  async createLessonAssignment(assignment: InsertLessonAssignment): Promise<LessonAssignment> {
    const [newAssignment] = await db.insert(lessonAssignments).values(assignment).returning();
    return newAssignment;
  }

  async getLessonAssignments(lessonId: number): Promise<LessonAssignment[]> {
    return await db
      .select()
      .from(lessonAssignments)
      .where(and(eq(lessonAssignments.lessonId, lessonId), eq(lessonAssignments.isActive, true)))
      .orderBy(desc(lessonAssignments.createdAt));
  }

  async getAssignmentSubmissions(assignmentId: number): Promise<(Submission & { student: User })[]> {
    return await db
      .select()
      .from(submissions)
      .innerJoin(users, eq(submissions.studentId, users.id))
      .where(eq(submissions.assignmentId, assignmentId))
      .orderBy(desc(submissions.submittedAt))
      .then(rows => rows.map(row => ({ ...row.submissions, student: row.users })));
  }

  async removeStudentFromCourse(courseId: number, studentId: string): Promise<void> {
    await db.delete(enrollments)
      .where(and(
        eq(enrollments.courseId, courseId),
        eq(enrollments.studentId, studentId)
      ));
  }

  async getAllActiveSessions(): Promise<(LessonSession & { courseName: string })[]> {
    const activeSessions = await db.select({
      id: lessonSessions.id,
      courseId: lessonSessions.courseId,
      teacherId: lessonSessions.teacherId,
      sessionName: lessonSessions.sessionName,
      startTime: lessonSessions.startTime,
      endTime: lessonSessions.endTime,
      duration: lessonSessions.duration,
      isActive: lessonSessions.isActive,
      createdAt: lessonSessions.createdAt,
      courseName: courses.title
    })
    .from(lessonSessions)
    .innerJoin(courses, eq(lessonSessions.courseId, courses.id))
    .where(eq(lessonSessions.isActive, true));

    return activeSessions;
  }
}

export const storage = new DatabaseStorage();

export async function createDefaultUsers() {
  try {
    // Check if default users already exist
    const existingAdmin = await storage.getUserByEmail('admin@devcode.az');
    const existingTeacher = await storage.getUserByEmail('teacher@devcode.az');
    const existingStudent = await storage.getUserByEmail('student@devcode.az');

    if (existingAdmin && existingTeacher && existingStudent) {
      console.log('Default users already exist');
      return;
    }

    const defaultUsers = [
      {
        id: `admin_${Date.now()}`,
        email: 'admin@devcode.az',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin' as const,
        passwordHash: 'admin123'
      },
      {
        id: `teacher_${Date.now()}`,
        email: 'teacher@devcode.az',
        firstName: 'Teacher',
        lastName: 'User',
        role: 'teacher' as const,
        passwordHash: 'teacher123'
      },
      {
        id: `student_${Date.now()}`,
        email: 'student@devcode.az',
        firstName: 'Student',
        lastName: 'User',
        role: 'student' as const,
        passwordHash: 'student123'
      }
    ];

    for (const userData of defaultUsers) {
      const existing = await storage.getUserByEmail(userData.email);
      if (!existing) {
        await storage.createUser(userData);
        console.log(`Created default ${userData.role}: ${userData.email}`);
      }
    }
  } catch (error) {
    console.error('Error creating default users:', error);
  }
}