import type { Express } from "express";
import { createServer, type Server } from "http";
import session from 'express-session';
import { Pool } from '@neondatabase/serverless';
import ConnectPgSimple from 'connect-pg-simple';
import { storage } from "./storage";
import { hashPassword, verifyPassword, isAuthenticated, attachUser, AuthenticatedRequest } from "./auth";
import { 
  insertCourseSchema, 
  insertLessonSchema, 
  insertEnrollmentSchema,
  insertAssignmentSchema,
  insertSubmissionSchema,
  insertBlogPostSchema,
  insertCertificateSchema,
  insertContactSubmissionSchema,
  insertUserSchema,
  insertLessonSessionSchema,
  insertAttendanceSchema,
  insertLessonMaterialSchema,
  insertLessonAssignmentSchema
} from "@shared/schema";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1, "Ad tələb olunur"),
  lastName: z.string().min(1, "Soyad tələb olunur"),
  email: z.string().email("Düzgün email ünvanı daxil edin"),
  password: z.string().min(6, "Parol ən azı 6 simvol olmalıdır"),
  role: z.enum(["student", "teacher"]).default("student")
});

const loginSchema = z.object({
  email: z.string().email("Düzgün email ünvanı daxil edin"),
  password: z.string().min(1, "Parol tələb olunur")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session setup
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const PgSession = ConnectPgSimple(session);

  app.use(session({
    store: new PgSession({
      pool: pool,
      tableName: 'sessions',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  // Attach user to all requests
  app.use(attachUser as any);

  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Bu email artıq istifadə olunub" });
      }

      // Store password as plain text
      const plainPassword = hashPassword(userData.password);

      // Create user
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const user = await storage.createUser({
        id: userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        passwordHash: plainPassword
      });

      // Create session
      req.session.userId = userId;

      res.status(201).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Qeydiyyat zamanı xəta baş verdi" });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);

      // Find user
      const user = await storage.getUserByEmail(loginData.email);
      if (!user) {
        return res.status(401).json({ message: "Email və ya parol yanlışdır" });
      }

      // Verify password
      const isValidPassword = verifyPassword(loginData.password, user.passwordHash!);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Email və ya parol yanlışdır" });
      }

      // Create session
      req.session.userId = user.id;

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Giriş zamanı xəta baş verdi" });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Çıxış zamanı xəta baş verdi" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Uğurla çıxış edildi" });
    });
  });

  app.get('/api/auth/user', async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Course routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post('/api/courses', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can create courses" });
      }

      const { category, ...courseDataWithoutCategory } = req.body;
      const courseData = insertCourseSchema.parse({ ...courseDataWithoutCategory, instructorId: req.user.id });
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  // Update a course
  app.put('/api/courses/:id', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can update courses" });
      }

      const courseId = parseInt(req.params.id);
      const { category, ...courseDataWithoutCategory } = req.body;
      const courseData = insertCourseSchema.parse(courseDataWithoutCategory);

      const updatedCourse = await storage.updateCourse(courseId, courseData);

      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }

      res.json(updatedCourse);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ message: 'Failed to update course' });
    }
  });

  // Delete a course
  app.delete('/api/courses/:id', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can delete courses" });
      }

      const courseId = parseInt(req.params.id);

      await storage.deleteCourse(courseId);
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ message: 'Failed to delete course' });
    }
  });

  // Lesson routes
  app.get('/api/courses/:courseId/lessons', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const lessons = await storage.getLessonsByCourse(courseId);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  app.get('/api/courses/:courseId/lessons/:lessonId', async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  app.post('/api/courses/:courseId/lessons', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can create lessons" });
      }

      const courseId = parseInt(req.params.courseId);
      const lessonData = insertLessonSchema.parse({ ...req.body, courseId });
      const lesson = await storage.createLesson(lessonData);
      res.status(201).json(lesson);
    } catch (error) {
      console.error("Error creating lesson:", error);
      res.status(500).json({ message: "Failed to create lesson" });
    }
  });

  // Enrollment routes
  app.get('/api/enrollments', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      const enrollments = await storage.getStudentEnrollments(req.user!.id);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  // Get all enrollments (for teachers to see their students)
  app.get('/api/enrollments/all', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can view all enrollments" });
      }

      const enrollments = await storage.getAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching all enrollments:", error);
      res.status(500).json({ message: "Failed to fetch all enrollments" });
    }
  });

  app.post('/api/enrollments', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      // If studentId is provided in body (for teachers adding students), use it
      // Otherwise use the current user's ID (for students enrolling themselves)
      const studentId = req.body.studentId || req.user!.id;
      const enrollmentData = insertEnrollmentSchema.parse({ ...req.body, studentId });
      const enrollment = await storage.enrollStudent(enrollmentData);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error creating enrollment:", error);
      res.status(500).json({ message: "Failed to enroll in course" });
    }
  });

  // Get students enrolled in a course
  app.get('/api/courses/:courseId/students', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const students = await storage.getCourseStudents(courseId);
      res.json(students);
    } catch (error) {
      console.error("Error fetching course students:", error);
      res.status(500).json({ message: "Failed to fetch course students" });
    }
  });

  // Assignment routes
  app.get('/api/courses/:courseId/assignments', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const assignments = await storage.getAssignmentsByCourse(courseId);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ message: "Failed to fetch assignments" });
    }
  });

  app.get('/api/assignments/:assignmentId', async (req, res) => {
    try {
      const assignmentId = parseInt(req.params.assignmentId);
      const assignment = await storage.getAssignment(assignmentId);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.json(assignment);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ message: "Failed to fetch assignment" });
    }
  });

  app.post('/api/courses/:courseId/assignments', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can create assignments" });
      }

      const courseId = parseInt(req.params.courseId);
      const assignmentData = insertAssignmentSchema.parse({ ...req.body, courseId });
      const assignment = await storage.createAssignment(assignmentData);
      res.status(201).json(assignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });

  // Submission routes
  app.get('/api/submissions', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      const submissions = await storage.getSubmissionsByStudent(req.user!.id);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get('/api/assignments/:assignmentId/submissions', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can view all submissions" });
      }

      const assignmentId = parseInt(req.params.assignmentId);
      const submissions = await storage.getSubmissionsByAssignment(assignmentId);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.post('/api/assignments/:assignmentId/submissions', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      const assignmentId = parseInt(req.params.assignmentId);

      const submissionData = insertSubmissionSchema.parse({ 
        ...req.body, 
        assignmentId, 
        studentId: req.user!.id 
      });
      const submission = await storage.createSubmission(submissionData);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(500).json({ message: "Failed to submit assignment" });
    }
  });

  app.patch('/api/submissions/:id/grade', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can grade submissions" });
      }

      const id = parseInt(req.params.id);
      const { grade, feedback } = req.body;

      await storage.gradeSubmission(id, grade, feedback, req.user.id);
      res.json({ message: "Submission graded successfully" });
    } catch (error) {
      console.error("Error grading submission:", error);
      res.status(500).json({ message: "Failed to grade submission" });
    }
  });

  // Blog routes
  app.get('/api/blog', async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post('/api/blog', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can create blog posts" });
      }

      const postData = insertBlogPostSchema.parse({ ...req.body, authorId: req.user.id });
      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  // Certificate routes
  app.get('/api/certificates/:certificateId', async (req, res) => {
    try {
      const certificateId = req.params.certificateId;
      const certificate = await storage.getCertificateById(certificateId);

      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }

      res.json(certificate);
    } catch (error) {
      console.error("Error verifying certificate:", error);
      res.status(500).json({ message: "Failed to verify certificate" });
    }
  });

  app.post('/api/certificates', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can issue certificates" });
      }

      const certificateData = insertCertificateSchema.parse(req.body);
      const certificate = await storage.createCertificate(certificateData);
      res.status(201).json(certificate);
    } catch (error) {
      console.error("Error creating certificate:", error);
      res.status(500).json({ message: "Failed to create certificate" });
    }
  });

  // Contact routes
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactSubmissionSchema.parse(req.body);
      const contact = await storage.createContactSubmission(contactData);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Lesson session routes
  app.post('/api/courses/:courseId/sessions', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers can start lessons" });
      }

      const courseId = parseInt(req.params.courseId);

      // Check if there's already an active session
      const activeSession = await storage.getActiveLessonSession(courseId);
      if (activeSession) {
        return res.status(400).json({ message: "There's already an active session for this course" });
      }

      const sessionData = insertLessonSessionSchema.parse({ 
        ...req.body, 
        courseId, 
        teacherId: req.user.id 
      });
      const session = await storage.createLessonSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      console.error("Error starting lesson session:", error);
      res.status(500).json({ message: "Failed to start lesson session" });
    }
  });

  app.patch('/api/sessions/:sessionId/end', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers can end lessons" });
      }

      const sessionId = parseInt(req.params.sessionId);
      const { duration } = req.body;

      await storage.endLessonSession(sessionId, duration);
      res.json({ message: "Lesson session ended successfully" });
    } catch (error) {
      console.error("Error ending lesson session:", error);
      res.status(500).json({ message: "Failed to end lesson session" });
    }
  });

  app.get('/api/courses/:courseId/active-session', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const session = await storage.getActiveLessonSession(courseId);
      res.json(session || null);
    } catch (error) {
      console.error("Error fetching active session:", error);
      res.status(500).json({ message: "Failed to fetch active session" });
    }
  });

  app.get('/api/courses/:courseId/sessions', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const sessions = await storage.getLessonSessions(courseId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching lesson sessions:", error);
      res.status(500).json({ message: "Failed to fetch lesson sessions" });
    }
  });

  // Get session history for teacher
  app.get('/api/sessions/history', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers can view session history" });
      }

      const sessions = await storage.getTeacherSessionHistory(req.user.id);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching session history:", error);
      res.status(500).json({ message: "Failed to fetch session history" });
    }
  });

  // Remove student from course
  app.delete('/api/enrollments/:courseId/:studentId', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      const { studentId, courseId } = req.params;
      await storage.removeStudentFromCourse(parseInt(courseId), studentId);
      res.json({ message: 'Student removed from course successfully' });
    } catch (error) {
      console.error('Error removing student from course:', error);
      res.status(500).json({ message: 'Failed to remove student from course' });
    }
  });

  // Attendance routes
  app.post('/api/sessions/:sessionId/attendance', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers can mark attendance" });
      }

      const sessionId = parseInt(req.params.sessionId);
      const attendanceData = insertAttendanceSchema.parse({ 
        ...req.body, 
        sessionId,
        markedBy: req.user.id 
      });
      const attendance = await storage.markAttendance(attendanceData);
      res.status(201).json(attendance);
    } catch (error) {
      console.error("Error marking attendance:", error);
      res.status(500).json({ message: "Failed to mark attendance" });
    }
  });

  app.get('/api/sessions/:sessionId/attendance', async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const attendance = await storage.getSessionAttendance(sessionId);
      res.json(attendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ message: "Failed to fetch attendance" });
    }
  });

  // Lesson materials routes
  app.post('/api/lessons/:lessonId/materials', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers can add lesson materials" });
      }

      const lessonId = parseInt(req.params.lessonId);
      const materialData = insertLessonMaterialSchema.parse({ ...req.body, lessonId });
      const material = await storage.createLessonMaterial(materialData);
      res.status(201).json(material);
    } catch (error) {
      console.error("Error creating lesson material:", error);
      res.status(500).json({ message: "Failed to create lesson material" });
    }
  });

  app.get('/api/lessons/:lessonId/materials', async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const materials = await storage.getLessonMaterials(lessonId);
      res.json(materials);
    } catch (error) {
      console.error("Error fetching lesson materials:", error);
      res.status(500).json({ message: "Failed to fetch lesson materials" });
    }
  });

  // Lesson assignments routes
  app.post('/api/lessons/:lessonId/assignments', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers can create lesson assignments" });
      }

      const lessonId = parseInt(req.params.lessonId);
      const assignmentData = insertLessonAssignmentSchema.parse({ ...req.body, lessonId });
      const assignment = await storage.createLessonAssignment(assignmentData);
      res.status(201).json(assignment);
    } catch (error) {
      console.error("Error creating lesson assignment:", error);
      res.status(500).json({ message: "Failed to create lesson assignment" });
    }
  });

  app.get('/api/lessons/:lessonId/assignments', async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const assignments = await storage.getLessonAssignments(lessonId);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching lesson assignments:", error);
      res.status(500).json({ message: "Failed to fetch lesson assignments" });
    }
  });

  // Get all users (for teacher to add students to course)
  app.get('/api/users', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can view users" });
      }

      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Statistics routes (admin only)
  app.get('/api/stats', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Only admins can view system statistics" });
      }

      const stats = await storage.getSystemStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Remove student from course (delete enrollment)
  app.delete('/api/enrollments/:courseId/:studentId', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      const { courseId, studentId } = req.params;
      await storage.removeStudentFromCourse(parseInt(courseId), studentId);
      res.json({ message: 'Student removed from course successfully' });
    } catch (error) {
      console.error('Error removing student from course:', error);
      res.status(500).json({ message: 'Failed to remove student from course' });
    }
  });

    // Get enrollments for a specific course
  app.get('/api/courses/:id/enrollments', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can view enrollments" });
      }
      const courseId = parseInt(req.params.id);
      const enrollments = await storage.getCourseEnrollments(courseId);
      res.json(enrollments);
    } catch (error) {
      console.error('Error fetching course enrollments:', error);
      res.status(500).json({ message: 'Failed to fetch course enrollments' });
    }
  });

  // Delete an enrollment
  app.delete('/api/enrollments/:id', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can delete enrollments" });
      }

      const enrollmentId = parseInt(req.params.id);
      await storage.deleteEnrollment(enrollmentId);
      res.json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      res.status(500).json({ message: 'Failed to delete enrollment' });
    }
  });


  // Get all active sessions
  app.get('/api/active-sessions', isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
    try {
      const activeSessions = await storage.getAllActiveSessions();
      res.json(activeSessions);
    } catch (error) {
      console.error('Error fetching active sessions:', error);
      res.status(500).json({ message: 'Failed to fetch active sessions' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}