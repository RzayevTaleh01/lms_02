import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
// Public pages
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Blog from "@/pages/blog";
import VerifyCertificate from "@/pages/verify-certificate";
import Contact from "@/pages/contact";

// Dashboard pages
import AdminDashboard from "@/pages/admin-dashboard";
import AdminCourses from "./pages/admin-courses";
import AdminTeachers from "@/pages/admin-teachers";
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

import NotFound from "@/pages/not-found";

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
      <Route path="/">
        {isAuthenticated ? <Home /> : <Landing />}
      </Route>
      <Route path="/courses" component={Courses} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/courses/:courseId/lessons/:lessonId" component={LessonDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/verify" component={VerifyCertificate} />
      <Route path="/contact" component={Contact} />

      {/* Role-based dashboards - only for authenticated users */}
      {isAuthenticated && user?.role === 'admin' && <Route path="/admin" component={AdminDashboard} />}
      {isAuthenticated && user?.role === 'admin' && <Route path="/admin-dashboard" component={AdminDashboard} />}
      {isAuthenticated && user?.role === 'admin' && <Route path="/admin/teachers" component={AdminTeachers} />}
      {isAuthenticated && user?.role === 'admin' && <Route path="/admin/courses" component={AdminCourses} />}
      {isAuthenticated && user?.role === 'teacher' && <Route path="/teacher" component={TeacherDashboard} />}
      {isAuthenticated && user?.role === 'teacher' && <Route path="/teacher/courses" component={TeacherCourses} />}
      {isAuthenticated && user?.role === 'teacher' && <Route path="/teacher/courses/:id" component={CourseManagementPage} />}
      {isAuthenticated && user?.role === 'teacher' && <Route path="/teacher/students" component={TeacherStudents} />}
      {isAuthenticated && user?.role === 'teacher' && <Route path="/teacher/students/:studentId" component={TeacherStudentDetail} />}
      {isAuthenticated && user?.role === 'student' && <Route path="/student" component={StudentDashboard} />}
      <Route path="/student/courses" component={StudentCourses} />
      <Route path="/student/course/:id" component={StudentCourse} />
      {isAuthenticated && user?.role === 'student' && <Route path="/student/assignments" component={StudentAssignments} />}
      {isAuthenticated && user?.role === 'student' && <Route path="/student/attendance" component={StudentAttendance} />}
      {isAuthenticated && user?.role === 'student' && <Route path="/student/grades" component={StudentGrades} />}
      {isAuthenticated && user?.role === 'student' && <Route path="/student/profile" component={StudentProfile} />}

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