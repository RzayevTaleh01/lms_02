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
  lessonProgress,
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
import { eq, and, desc, asc, sql, count, inArray, isNotNull } from "drizzle-orm";

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
  deleteCourse(id: number): Promise<void>;

  // Lesson operations
  getLessonsByCourse(courseId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Enrollment operations
  getStudentEnrollments(studentId: string): Promise<(Enrollment & { course: Course })[]>;
  enrollStudent(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: number, progress: number): Promise<void>;
  getAllEnrollments(): Promise<Enrollment[]>;
  getCourseEnrollments(courseId: number): Promise<any[]>;

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
  updateLessonAssignment(id: number, assignment: Partial<InsertLessonAssignment>): Promise<LessonAssignment | undefined>;
  deleteLessonAssignment(assignmentId: number): Promise<void>;

  // Delete operations
  deleteLessonMaterial(materialId: number): Promise<void>;

  // Task feedback operations
  returnSubmissionForRevision(submissionId: number, feedback: string, teacherId: string): Promise<void>;

  // Course enrollment operations
  removeStudentFromCourse(courseId: number, studentId: string): Promise<void>;

  // Active session operations
  getAllActiveSessions(): Promise<(LessonSession & { courseName: string })[]>;

  getTeacherSessionHistory(teacherId: string): Promise<(LessonSession & { courseName: string; attendanceCount?: number })[]>;

  resubmitAssignment(submissionId: number, content: string, githubUrl?: string, fileUrl?: string, studentId?: string): Promise<void>;

  // Student attendance statistics
  getStudentAttendanceStats(studentId: string): Promise<{ attendanceRate: number; totalSessions: number; attendedSessions: number }>;

  // Course detailed progress for student course page
  getCourseDetailedProgress(courseId: number, studentId: string): Promise<{
    courseId: number;
    overallProgress: number;
    totalLessons: number;
    lessonDetails: Array<{
      lessonId: number;
      lessonTitle: string;
      progressPercentage: number;
      isCompleted: boolean;
      totalAssignments: number;
      completedAssignments: number;
    }>;
  }>;

  getStudentAttendanceRecords(studentId: string): Promise<any>;
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
    const coursesData = await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(desc(courses.createdAt));

    // Get actual enrollment counts for each course
    const coursesWithCounts = await Promise.all(
      coursesData.map(async (course) => {
        const [enrollmentCount] = await db
          .select({ count: count() })
          .from(enrollments)
          .where(eq(enrollments.courseId, course.id));

        return {
          ...course,
          enrollmentCount: enrollmentCount.count
        };
      })
    );

    return coursesWithCounts;
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

  async deleteCourse(id: number): Promise<void> {
    await db.delete(courses).where(eq(courses.id, id));
  }

  // Lesson operations
  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(and(eq(lessons.courseId, courseId), eq(lessons.isActive, true)))
      .orderBy(lessons.orderIndex);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const lesson = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id))
      .limit(1);
    return lesson[0];
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [newLesson] = await db.insert(lessons).values(lesson).returning();
    return newLesson;
  }

  // Enrollment operations
  async getStudentEnrollments(studentId: string): Promise<(Enrollment & { course: Course })[]> {
    return await db
      .select({
        id: enrollments.id,
        studentId: enrollments.studentId,
        courseId: enrollments.courseId,
        enrolledAt: enrollments.enrolledAt,
        completedAt: enrollments.completedAt,
        progress: enrollments.progress,
        grade: enrollments.grade,
        course: {
          id: courses.id,
          title: courses.title,
          description: courses.description,
          instructorId: courses.instructorId,
          isActive: courses.isActive,
          enrollmentCount: courses.enrollmentCount,
          createdAt: courses.createdAt,
          updatedAt: courses.updatedAt
        }
      })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.studentId, studentId));
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

  async deleteEnrollment(id: number): Promise<void> {
    await db.delete(enrollments).where(eq(enrollments.id, id));
  }

   async getAllEnrollments(): Promise<Enrollment[]> {
    return await db.select({
      id: enrollments.id,
      studentId: enrollments.studentId,
      courseId: enrollments.courseId,
      enrolledAt: enrollments.enrolledAt,
      completedAt: enrollments.completedAt,
      progress: enrollments.progress,
      grade: enrollments.grade,
      student: {
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      },
      course: {
        id: courses.id,
        title: courses.title,
        description: courses.description,
        instructorId: courses.instructorId,
        isActive: courses.isActive,
        enrollmentCount: courses.enrollmentCount,
        createdAt: courses.createdAt
      }
    })
    .from(enrollments)
    .innerJoin(users, eq(enrollments.studentId, users.id))
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .orderBy(desc(enrollments.enrolledAt));
  }

  async getCourseEnrollments(courseId: number): Promise<any[]> {
    return await db
      .select({
        id: enrollments.id,
        studentId: enrollments.studentId,
        courseId: enrollments.courseId,
        enrolledAt: enrollments.enrolledAt,
        progress: enrollments.progress,
        grade: enrollments.grade,
        student: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt
        }
      })
      .from(enrollments)
      .innerJoin(users, eq(enrollments.studentId, users.id))
      .where(eq(enrollments.courseId, courseId))
      .orderBy(users.firstName, users.lastName);
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

  async getSubmissionByAssignmentAndStudent(assignmentId: number, studentId: string) {
    const [submission] = await db
      .select()
      .from(submissions)
      .where(and(
        eq(submissions.assignmentId, assignmentId),
        eq(submissions.studentId, studentId)
      ));
    return submission;
  }

  async getSubmissionByLessonAssignmentAndStudent(assignmentId: number, studentId: string) {
    const [submission] = await db
      .select()
      .from(submissions)
      .where(and(
        eq(submissions.assignmentId, assignmentId),
        eq(submissions.studentId, studentId)
      ));
    return submission;
  }

  async getSubmissionsByStudent(studentId: string) {
    // Get regular assignment submissions 
    const regularSubmissions = await db
      .select({
        id: submissions.id,
        assignmentId: submissions.assignmentId,
        studentId: submissions.studentId,
        content: submissions.content,
        githubUrl: submissions.githubUrl,
        submittedAt: submissions.submittedAt,
        grade: submissions.grade,
        feedback: submissions.feedback,
        gradedAt: submissions.gradedAt,
        gradedBy: submissions.gradedBy,
        fileUrl: submissions.fileUrl,
        assignmentTitle: assignments.title,
        assignmentDescription: assignments.description,
        assignmentMaxPoints: assignments.maxPoints,
        assignmentDueDate: assignments.dueDate,
        assignmentCourseId: assignments.courseId,
        assignmentCreatedAt: assignments.createdAt,
        assignmentIsActive: assignments.isActive,
        courseId: courses.id,
        courseTitle: courses.title,
        courseDescription: courses.description,
        courseInstructorId: courses.instructorId,
        courseImageUrl: courses.imageUrl,
        courseDuration: courses.duration,
        courseLevel: courses.level,
        courseEnrollmentCount: courses.enrollmentCount,
        courseIsActive: courses.isActive,
        courseCreatedAt: courses.createdAt,
        courseUpdatedAt: courses.updatedAt,
        courseRating: courses.rating,
        courseShortDescription: courses.shortDescription,
        assignmentType: sql<string>`'regular'`.as('assignmentType')
      })
      .from(submissions)
      .leftJoin(assignments, eq(submissions.assignmentId, assignments.id))
      .leftJoin(courses, eq(assignments.courseId, courses.id))
      .where(eq(submissions.studentId, studentId));

    // Get lesson assignment submissions
    const lessonSubmissions = await db
      .select({
        id: submissions.id,
        assignmentId: submissions.assignmentId,
        studentId: submissions.studentId,
        content: submissions.content,
        githubUrl: submissions.githubUrl,
        submittedAt: submissions.submittedAt,
        grade: submissions.grade,
        feedback: submissions.feedback,
        gradedAt: submissions.gradedAt,
        gradedBy: submissions.gradedBy,
        fileUrl: submissions.fileUrl,
        assignmentTitle: lessonAssignments.title,
        assignmentDescription: lessonAssignments.description,
        assignmentMaxPoints: lessonAssignments.maxPoints,
        assignmentDueDate: lessonAssignments.dueDate,
        assignmentCourseId: lessonAssignments.courseId,
        assignmentCreatedAt: lessonAssignments.createdAt,
        assignmentIsActive: lessonAssignments.isActive,
        courseId: courses.id,
        courseTitle: courses.title,
        courseDescription: courses.description,
        courseInstructorId: courses.instructorId,
        courseImageUrl: courses.imageUrl,
        courseDuration: courses.duration,
        courseLevel: courses.level,
        courseEnrollmentCount: courses.enrollmentCount,
        courseIsActive: courses.isActive,
        courseCreatedAt: courses.createdAt,
        courseUpdatedAt: courses.updatedAt,
        courseRating: courses.rating,
        courseShortDescription: courses.shortDescription,
        assignmentType: sql<string>`'lesson'`.as('assignmentType')
      })
      .from(submissions)
      .leftJoin(lessonAssignments, eq(submissions.assignmentId, lessonAssignments.id))
      .leftJoin(courses, eq(lessonAssignments.courseId, courses.id))
      .where(eq(submissions.studentId, studentId));

    const allSubmissions = [...regularSubmissions, ...lessonSubmissions]
      .filter(row => row.assignmentTitle) // Only include submissions with valid assignments
      .sort((a, b) => new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime());

    return allSubmissions.map(row => ({
      id: row.id,
      assignmentId: row.assignmentId,
      studentId: row.studentId,
      content: row.content,
      githubUrl: row.githubUrl,
      submittedAt: row.submittedAt,
      grade: row.grade,
      feedback: row.feedback,
      gradedAt: row.gradedAt,
      gradedBy: row.gradedBy,
      fileUrl: row.fileUrl,
      assignment: {
        id: row.assignmentId!,
        title: row.assignmentTitle!,
        description: row.assignmentDescription,
        maxPoints: row.assignmentMaxPoints!,
        dueDate: row.assignmentDueDate,
        courseId: row.assignmentCourseId!,
        createdAt: row.assignmentCreatedAt!,
        isActive: row.assignmentIsActive!,
        type: row.assignmentType,
        course: {
          id: row.courseId!,
          title: row.courseTitle!,
          description: row.courseDescription,
          shortDescription: row.courseShortDescription,
          instructorId: row.courseInstructorId!,
          imageUrl: row.courseImageUrl,
          duration: row.courseDuration,
          level: row.courseLevel!,
          enrollmentCount: row.courseEnrollmentCount!,
          rating: row.courseRating!,
          isActive: row.courseIsActive!,
          createdAt: row.courseCreatedAt!,
          updatedAt: row.courseUpdatedAt!
        }
      }
    }));
  }

  async getSubmissionsByAssignment(assignmentId: number): Promise<(Submission & { student: User })[]> {
    return await db
      .select({
        id: submissions.id,
        assignmentId: submissions.assignmentId,
        studentId: submissions.studentId,
        content: submissions.content,
        githubUrl: submissions.githubUrl,
        fileUrl: submissions.fileUrl,
        submittedAt: submissions.submittedAt,
        grade: submissions.grade,
        feedback: submissions.feedback,
        gradedAt: submissions.gradedAt,
        gradedBy: submissions.gradedBy,
        status: submissions.status,
        student: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt
        }
      })
      .from(submissions)
      .innerJoin(users, eq(submissions.studentId, users.id))
      .where(eq(submissions.assignmentId, assignmentId))
      .orderBy(desc(submissions.submittedAt));
  }

  async createSubmission(submissionData: InsertSubmission) {
    const [submission] = await db.insert(submissions).values(submissionData).returning();
    return submission;
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
    const sessions = await db
      .select()
      .from(lessonSessions)
      .where(eq(lessonSessions.courseId, courseId))
      .orderBy(desc(lessonSessions.startTime));

    // Add attendance count for each session
    const sessionsWithAttendance = await Promise.all(
      sessions.map(async (session) => {
        const attendanceCount = await db
          .select({ count: count() })
          .from(attendance)
          .where(eq(attendance.sessionId, session.id));

        return {
          ...session,
          attendanceCount: attendanceCount[0]?.count || 0
        };
      })
    );

    return sessionsWithAttendance;
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
    // Check if attendance record already exists for this student and session
    const [existingAttendance] = await db
      .select()
      .from(attendance)
      .where(and(
        eq(attendance.sessionId, attendanceData.sessionId),
        eq(attendance.studentId, attendanceData.studentId)
      ));

    if (existingAttendance) {
      // Update existing attendance record
      const [updatedAttendance] = await db
        .update(attendance)
        .set({
          status: attendanceData.status,
          markedAt: new Date(),
          markedBy: attendanceData.markedBy
        })
        .where(and(
          eq(attendance.sessionId, attendanceData.sessionId),
          eq(attendance.studentId, attendanceData.studentId)
        ))
        .returning();
      return updatedAttendance;
    } else {
      // Create new attendance record
      const [newAttendance] = await db.insert(attendance).values(attendanceData).returning();
      return newAttendance;
    }
  }

  async getSessionAttendance(sessionId: number): Promise<(Attendance & { student: User })[]> {
    return await db
      .select({
        id: attendance.id,
        studentId: attendance.studentId,
        sessionId: attendance.sessionId,
        courseId: attendance.courseId,
        status: attendance.status,
        markedAt: attendance.markedAt,
        markedBy: attendance.markedBy,
        student: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
      })
      .from(attendance)
      .innerJoin(users, eq(attendance.studentId, users.id))
      .where(eq(attendance.sessionId, sessionId))
      .orderBy(users.firstName, users.lastName);
  }

  async getStudentAttendanceRecords(studentId: string) {
    return await db
      .select({
        id: attendance.id,
        studentId: attendance.studentId,
        sessionId: attendance.sessionId,
        courseId: attendance.courseId,
        status: attendance.status,
        markedAt: attendance.markedAt,
        markedBy: attendance.markedBy,
        session: {
          id: lessonSessions.id,
          sessionName: lessonSessions.sessionName,
          courseId: lessonSessions.courseId,
          startTime: lessonSessions.startTime,
          course: {
            id: courses.id,
            title: courses.title,
          },
        },
      })
      .from(attendance)
      .innerJoin(lessonSessions, eq(attendance.sessionId, lessonSessions.id))
      .innerJoin(courses, eq(lessonSessions.courseId, courses.id))
      .where(eq(attendance.studentId, studentId))
      .orderBy(desc(lessonSessions.startTime));
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

  async updateLessonAssignment(id: number, assignment: Partial<InsertLessonAssignment>): Promise<LessonAssignment | undefined> {
    const [updatedAssignment] = await db
      .update(lessonAssignments)
      .set(assignment)
      .where(eq(lessonAssignments.id, id))
      .returning();
    return updatedAssignment;
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

  // Lesson progress functions
  async markLessonAsCompleted(lessonId: number, studentId: string, courseId: number): Promise<void> {
    const existing = await db.select()
      .from(lessonProgress)
      .where(and(
        eq(lessonProgress.lessonId, lessonId),
        eq(lessonProgress.studentId, studentId)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db.update(lessonProgress)
        .set({
          isCompleted: true,
          completedAt: new Date(),
          lastWatchedAt: new Date()
        })
        .where(eq(lessonProgress.id, existing[0].id));
    } else {
      await db.insert(lessonProgress).values({
        lessonId,
        studentId,
        courseId,
        isCompleted: true,
        completedAt: new Date(),
        lastWatchedAt: new Date()
      });
    }

    // Update course progress
    await this.updateCourseProgress(courseId, studentId);
  }

  async updateLessonWatchTime(lessonId: number, studentId: string, courseId: number, timeSpent: number): Promise<void> {
    const existing = await db.select()
      .from(lessonProgress)
      .where(and(
        eq(lessonProgress.lessonId, lessonId),
        eq(lessonProgress.studentId, studentId)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db.update(lessonProgress)
        .set({
          timeSpent: timeSpent,
          lastWatchedAt: new Date()
        })
        .where(eq(lessonProgress.id, existing[0].id));
    } else {
      await db.insert(lessonProgress).values({
        lessonId,
        studentId,
        courseId,
        timeSpent,
        lastWatchedAt: new Date()
      });
    }
  }

  async getLessonProgress(studentId: string, courseId: number): Promise<any[]> {
    return await db.select()
      .from(lessonProgress)
      .where(and(
        eq(lessonProgress.studentId, studentId),
        eq(lessonProgress.courseId, courseId)
      ));
  }

  async updateCourseProgress(courseId: number, studentId: string): Promise<void> {
    // Get all lessons for this course
    const courseLessons = await db.select({
      id: lessons.id,
      title: lessons.title
    })
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.orderIndex));

    if (courseLessons.length === 0) {
      // No lessons in course, set progress to 0
      await db.update(enrollments)
        .set({
          progress: 0,
          completedAt: null
        })
        .where(and(
          eq(enrollments.courseId, courseId),
          eq(enrollments.studentId, studentId)
        ));
      return;
    }

    // Get lesson progress data
    const lessonProgressData = await db.select()
      .from(lessonProgress)
      .where(and(
        eq(lessonProgress.courseId, courseId),
        eq(lessonProgress.studentId, studentId)
      ));

    // Get lesson assignments for graded assignments
    const lessonAssignmentsList = await db.select({
      lessonId: lessonAssignments.lessonId,
      id: lessonAssignments.id
    })
    .from(lessonAssignments)
    .innerJoin(lessons, eq(lessonAssignments.lessonId, lessons.id))
    .where(eq(lessons.courseId, courseId));

    // Get submissions for lesson assignments
    const assignmentSubmissions = await db.select({
      assignmentId: submissions.assignmentId,
      grade: submissions.grade,
      isLessonAssignment: sql<boolean>`true`
    })
    .from(submissions)
    .innerJoin(lessonAssignments, eq(submissions.assignmentId, lessonAssignments.id))
    .innerJoin(lessons, eq(lessonAssignments.lessonId, lessons.id))
    .where(and(
      eq(lessons.courseId, courseId),
      eq(submissions.studentId, studentId),
      isNotNull(submissions.grade)
    ));

    let totalProgressPoints = 0;
    let earnedProgressPoints = 0;

    // Calculate progress for each lesson (50% view + 50% assignments)
    for (const lesson of courseLessons) {
      // Lesson view progress (50% of lesson progress)
      const lessonViewProgress = lessonProgressData.find(lp => lp.lessonId === lesson.id);
      const isLessonViewed = lessonViewProgress?.isCompleted || false;

      // Lesson assignments progress (50% of lesson progress)
      const lessonAssignmentIds = lessonAssignmentsList
        .filter(la => la.lessonId === lesson.id)
        .map(la => la.id);

      const completedAssignments = assignmentSubmissions.filter(as => 
        lessonAssignmentIds.includes(as.assignmentId)
      );

      let lessonProgress = 0;

      if (lessonAssignmentIds.length === 0) {
        // No assignments, progress based only on lesson view
        lessonProgress = isLessonViewed ? 100 : 0;
      } else {
        // Has assignments: 50% view + 50% assignments
        const viewPoints = isLessonViewed ? 50 : 0;
        const assignmentPoints = lessonAssignmentIds.length > 0 
          ? (completedAssignments.length / lessonAssignmentIds.length) * 50 
          : 0;
        lessonProgress = viewPoints + assignmentPoints;
      }

      totalProgressPoints += 100;
      earnedProgressPoints += lessonProgress;
    }

    // Calculate overall course progress
    const overallProgress = totalProgressPoints > 0 
      ? Math.round((earnedProgressPoints / totalProgressPoints) * 100) 
      : 0;

    // Update enrollment progress
    await db.update(enrollments)
      .set({
        progress: overallProgress,
        completedAt: overallProgress === 100 ? new Date() : null
      })
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

  async getTeacherSessionHistory(teacherId: string): Promise<(LessonSession & { courseName: string; attendanceCount?: number })[]> {
    const sessions = await db.select({
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
    .where(eq(lessonSessions.teacherId, teacherId))
    .orderBy(desc(lessonSessions.startTime));

    // Add attendance count for each session
    const sessionsWithAttendance = await Promise.all(
      sessions.map(async (session) => {
        const attendanceCount = await db
          .select({ count: count() })
          .from(attendance)
          .where(eq(attendance.sessionId, session.id));

        return {
          ...session,
          attendanceCount: attendanceCount[0]?.count || 0
        };
      })
    );

    return sessionsWithAttendance;
  }

  async deleteLessonMaterial(materialId: number): Promise<void> {
    await db.delete(lessonMaterials).where(eq(lessonMaterials.id, materialId));
  }

  async deleteLessonAssignment(assignmentId: number): Promise<void> {
    await db.delete(lessonAssignments).where(eq(lessonAssignments.id, assignmentId));
  }

  async returnSubmissionForRevision(submissionId: number, feedback: string, teacherId: string) {
    await db
      .update(submissions)
      .set({
        feedback,
        gradedBy: teacherId,
        gradedAt: new Date(),
        grade: null, // Clear any existing grade
        status: 'returned' // Set status to returned
      })
      .where(eq(submissions.id, submissionId));
  }

  async resubmitAssignment(submissionId: number, content: string, githubUrl?: string, fileUrl?: string, studentId?: string): Promise<void> {
    await db
      .update(submissions)
      .set({
        content,
        githubUrl,
        fileUrl,
        submittedAt: new Date(),
        grade: null,
        gradedAt: null,
        gradedBy: null,
        status: 'resubmitted' // Set status to resubmitted
      })
      .where(eq(submissions.id, submissionId));
  }

  async getSubmissionHistory(assignmentId: number, studentId: string) {
    try {
      // Get all submissions for this assignment and student ordered by submission date
      const submissionHistory = await db
        .select({
          id: submissions.id,
          content: submissions.content,
          githubUrl: submissions.githubUrl,
          fileUrl: submissions.fileUrl,
          submittedAt: submissions.submittedAt,
          grade: submissions.grade,
          feedback: submissions.feedback,
          gradedAt: submissions.gradedAt,
          status: submissions.status,
          teacherName: sql<string>`COALESCE(CONCAT(${users.firstName}, ' ', ${users.lastName}), 'Naməlum')`.as('teacherName')
        })
        .from(submissions)
        .leftJoin(users, eq(submissions.gradedBy, users.id))
        .where(
          and(
            eq(submissions.assignmentId, assignmentId),
            eq(submissions.studentId, studentId)
          )
        )
        .orderBy(desc(submissions.submittedAt));

      return submissionHistory || [];
    } catch (error) {
      console.error("Error fetching submission history:", error);
      return [];
    }
  }

  // Get student attendance statistics
  async getStudentAttendanceStats(studentId: string): Promise<{ attendanceRate: number; totalSessions: number; attendedSessions: number }> {
    // Get all enrollments for the student
    const studentEnrollments = await db
      .select({ courseId: enrollments.courseId })
      .from(enrollments)
      .where(eq(enrollments.studentId, studentId));

    if (studentEnrollments.length === 0) {
      return { attendanceRate: 0, totalSessions: 0, attendedSessions: 0 };
    }

    const courseIds = studentEnrollments.map(e => e.courseId);

    // Get all sessions for these courses
    const totalSessions = await db
      .select({ count: sql<number>`count(*)` })
      .from(lessonSessions)
      .where(and(
        inArray(lessonSessions.courseId, courseIds),
        isNotNull(lessonSessions.duration)
      ));

    // Get attended sessions
    const attendedSessions = await db
      .select({ count: sql<number>`count(distinct ${attendance.sessionId})` })
      .from(attendance)
      .innerJoin(lessonSessions, eq(attendance.sessionId, lessonSessions.id))
      .where(and(
        eq(attendance.studentId, studentId),
        inArray(lessonSessions.courseId, courseIds)
      ));

    const total = totalSessions[0]?.count || 0;
    const attended = attendedSessions[0]?.count || 0;
    const rate = total > 0 ? Math.round((attended / total) * 100) : 0;

    return {
      attendanceRate: rate,
      totalSessions: total,
      attendedSessions: attended
    };
  }

  async getCourseDetailedProgress(courseId: number, studentId: string): Promise<{
    courseId: number;
    overallProgress: number;
    totalLessons: number;
    lessonDetails: Array<{
      lessonId: number;
      lessonTitle: string;
      progressPercentage: number;
      isCompleted: boolean;
      totalAssignments: number;
      completedAssignments: number;
    }>;
  }> {
    // Get all lessons for this course
    const courseLessons = await db.select({
      id: lessons.id,
      title: lessons.title
    })
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.orderIndex));

    if (courseLessons.length === 0) {
      return {
        courseId,
        overallProgress: 0,
        totalLessons: 0,
        lessonDetails: []
      };
    }

    // Get lesson progress data
    const lessonProgressData = await db.select()
      .from(lessonProgress)
      .where(and(
        eq(lessonProgress.courseId, courseId),
        eq(lessonProgress.studentId, studentId)
      ));

    // Get lesson assignments for graded assignments
    const lessonAssignmentsList = await db.select({
      lessonId: lessonAssignments.lessonId,
      id: lessonAssignments.id
    })
    .from(lessonAssignments)
    .innerJoin(lessons, eq(lessonAssignments.lessonId, lessons.id))
    .where(eq(lessons.courseId, courseId));

    // Get submissions for lesson assignments (only graded ones)
    const assignmentSubmissions = await db.select({
      assignmentId: submissions.assignmentId,
      grade: submissions.grade,
      isLessonAssignment: sql<boolean>`true`
    })
    .from(submissions)
    .innerJoin(lessonAssignments, eq(submissions.assignmentId, lessonAssignments.id))
    .innerJoin(lessons, eq(lessonAssignments.lessonId, lessons.id))
    .where(and(
      eq(lessons.courseId, courseId),
      eq(submissions.studentId, studentId),
      isNotNull(submissions.grade)
    ));

    let totalProgressPoints = 0;
    let earnedProgressPoints = 0;

    // Calculate progress for each lesson
    const lessonDetails = courseLessons.map(lesson => {
      // Lesson view progress (50% of lesson progress)
      const lessonViewProgress = lessonProgressData.find(lp => lp.lessonId === lesson.id);
      const isLessonViewed = lessonViewProgress?.isCompleted || false;

      // Lesson assignments progress (50% of lesson progress)
      const lessonAssignmentIds = lessonAssignmentsList
        .filter(la => la.lessonId === lesson.id)
        .map(la => la.id);

      const completedAssignments = assignmentSubmissions.filter(as => 
        lessonAssignmentIds.includes(as.assignmentId)
      );

      let lessonProgress = 0;

      if (lessonAssignmentIds.length === 0) {
        // No assignments, progress based only on lesson view
        lessonProgress = isLessonViewed ? 100 : 0;
      } else {
        // Has assignments: 50% view + 50% assignments
        const viewPoints = isLessonViewed ? 50 : 0;
        const assignmentPoints = lessonAssignmentIds.length > 0 
          ? (completedAssignments.length / lessonAssignmentIds.length) * 50 
          : 0;
        lessonProgress = viewPoints + assignmentPoints;
      }

      totalProgressPoints += 100;
      earnedProgressPoints += lessonProgress;

      return {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        progressPercentage: Math.round(lessonProgress),
        isCompleted: lessonProgress === 100,
        totalAssignments: lessonAssignmentIds.length,
        completedAssignments: completedAssignments.length
      };
    });

    // Calculate overall course progress
    const overallProgress = totalProgressPoints > 0 
      ? Math.round((earnedProgressPoints / totalProgressPoints) * 100) 
      : 0;

    return {
      courseId,
      overallProgress,
      totalLessons: courseLessons.length,
      lessonDetails
    };
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