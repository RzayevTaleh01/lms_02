
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated } from "./replitAuth";
import { 
  insertCourseSchema, 
  insertLessonSchema, 
  insertEnrollmentSchema,
  insertAssignmentSchema,
  insertSubmissionSchema,
  insertBlogPostSchema,
  insertCertificateSchema,
  insertContactSubmissionSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get authenticated user endpoint
  app.get('/api/auth/user', async (req, res) => {
    try {
      const user = req.user as any;
      if (!user || !user.claims) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // Get user from database to include role
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (!dbUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        role: dbUser.role
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

  app.post('/api/courses', isAuthenticated, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user || (req.user.role !== 'teacher' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Only teachers and admins can create courses" });
      }

      const courseData = insertCourseSchema.parse({ ...req.body, instructorId: req.user.id });
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
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

  app.post('/api/courses/:courseId/lessons', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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
  app.get('/api/enrollments', isAuthenticated, async (req: AuthenticatedRequest, res) => {
    try {
      const enrollments = await storage.getStudentEnrollments(req.user!.id);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.post('/api/enrollments', isAuthenticated, async (req: AuthenticatedRequest, res) => {
    try {
      const enrollmentData = insertEnrollmentSchema.parse({ ...req.body, studentId: req.user!.id });
      const enrollment = await storage.enrollStudent(enrollmentData);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error creating enrollment:", error);
      res.status(500).json({ message: "Failed to enroll in course" });
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

  app.post('/api/courses/:courseId/assignments', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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
  app.get('/api/submissions', isAuthenticated, async (req: AuthenticatedRequest, res) => {
    try {
      const submissions = await storage.getSubmissionsByStudent(req.user!.id);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get('/api/assignments/:assignmentId/submissions', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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

  app.post('/api/assignments/:assignmentId/submissions', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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

  app.patch('/api/submissions/:id/grade', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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

  app.post('/api/blog', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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

  app.post('/api/certificates', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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

  // Statistics routes (admin only)
  app.get('/api/stats', isAuthenticated, async (req: AuthenticatedRequest, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
