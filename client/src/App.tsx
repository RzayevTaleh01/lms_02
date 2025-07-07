import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
// Public pages
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Blog from "@/pages/blog";
import VerifyCertificate from "@/pages/verify-certificate";
import Contact from "@/pages/contact";
import DevCodeLMS from "@/pages/devcode-lms";

// Dashboard pages
import AdminDashboard from "@/pages/admin-dashboard";
import AdminCourses from "./pages/admin-courses";
import AdminTeachers from "@/pages/admin-teachers";
import AdminStudents from "@/pages/admin-students";
import AdminOfflineCourses from "./pages/admin-offline-courses";
import TeacherDashboard from "@/pages/teacher-dashboard";
import TeacherCourses from "@/pages/teacher-courses";
import TeacherStudents from "@/pages/teacher-students";
import TeacherStudentDetail from "@/pages/teacher-student-detail";
import StudentDashboard from "@/pages/student-dashboard";
import StudentCourse from "@/pages/student-course";
import StudentCourses from "@/pages/student-courses";
import StudentAttendance from "@/pages/student-attendance";
import StudentGrades from "@/pages/student-grades";
import StudentProfile from "@/pages/student-profile";
import CourseManagementPage from "@/pages/course-management";
import LessonDetail from "@/pages/lesson-detail";
import StudentAssignments from "@/pages/student-assignments";
import SessionHistoryPage from "@/pages/session-history-page";

import NotFound from "@/pages/not-found";

// Layout Wrapper for Public Pages
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}

// Protected Route Component
function ProtectedRoute({ 
  children, 
  allowedRoles, 
  isAuthenticated, 
  userRole 
}: { 
  children: React.ReactNode; 
  allowedRoles?: string[]; 
  isAuthenticated: boolean; 
  userRole?: string;
}) {
  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <Landing />
      </PublicLayout>
    );
  }
  
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <NotFound />;
  }
  
  return <>{children}</>;
}

// Component to handle dashboard redirection
function DashboardRedirect() {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user?.role) {
    // Render the appropriate dashboard component directly
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return (
          <PublicLayout>
            <Landing />
          </PublicLayout>
        );
    }
  }
  
  return (
    <PublicLayout>
      <Landing />
    </PublicLayout>
  );
}

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <DashboardRedirect />
      </Route>
      <Route path="/courses">
        <PublicLayout>
          <Courses />
        </PublicLayout>
      </Route>
      <Route path="/course/:id">
        <PublicLayout>
          <CourseDetail />
        </PublicLayout>
      </Route>
      <Route path="/courses/:courseId/lessons/:lessonId">
        <PublicLayout>
          <LessonDetail />
        </PublicLayout>
      </Route>
      <Route path="/blog">
        <PublicLayout>
          <Blog />
        </PublicLayout>
      </Route>
      <Route path="/verify">
        <PublicLayout>
          <VerifyCertificate />
        </PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout>
          <Contact />
        </PublicLayout>
      </Route>
      <Route path="/lms">
        <PublicLayout>
          <DevCodeLMS />
        </PublicLayout>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <ProtectedRoute allowedRoles={['admin']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/teachers">
        <ProtectedRoute allowedRoles={['admin']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <AdminTeachers />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/courses">
        <ProtectedRoute allowedRoles={['admin']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <AdminCourses />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/students">
        <ProtectedRoute allowedRoles={['admin']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <AdminStudents />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/offline-courses">
        <ProtectedRoute allowedRoles={['admin']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <AdminOfflineCourses />
        </ProtectedRoute>
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher">
        <ProtectedRoute allowedRoles={['teacher']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <TeacherDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/teacher/courses">
        <ProtectedRoute allowedRoles={['teacher']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <TeacherCourses />
        </ProtectedRoute>
      </Route>
      <Route path="/teacher/courses/:id">
        <ProtectedRoute allowedRoles={['teacher']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <CourseManagementPage />
        </ProtectedRoute>
      </Route>
      <Route path="/teacher/students">
        <ProtectedRoute allowedRoles={['teacher']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <TeacherStudents />
        </ProtectedRoute>
      </Route>
      <Route path="/teacher/students/:studentId">
        <ProtectedRoute allowedRoles={['teacher']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <TeacherStudentDetail />
        </ProtectedRoute>
      </Route>
      <Route path="/session-history">
        <ProtectedRoute allowedRoles={['teacher', 'admin']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <SessionHistoryPage />
        </ProtectedRoute>
      </Route>

      {/* Student Routes */}
      <Route path="/student">
        <ProtectedRoute allowedRoles={['student']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <StudentDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/student/courses">
        <ProtectedRoute allowedRoles={['student']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <StudentCourses />
        </ProtectedRoute>
      </Route>
      <Route path="/student/course/:id">
        <ProtectedRoute allowedRoles={['student']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <StudentCourse />
        </ProtectedRoute>
      </Route>
      <Route path="/student/assignments">
        <ProtectedRoute allowedRoles={['student']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <StudentAssignments />
        </ProtectedRoute>
      </Route>
      <Route path="/student/attendance">
        <ProtectedRoute allowedRoles={['student']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <StudentAttendance />
        </ProtectedRoute>
      </Route>
      <Route path="/student/grades">
        <ProtectedRoute allowedRoles={['student']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <StudentGrades />
        </ProtectedRoute>
      </Route>
      <Route path="/student/profile">
        <ProtectedRoute allowedRoles={['student']} isAuthenticated={isAuthenticated} userRole={user?.role}>
          <StudentProfile />
        </ProtectedRoute>
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;