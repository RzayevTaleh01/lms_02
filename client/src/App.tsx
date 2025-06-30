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
import VerifyCertificate from "./pages/verify-certificate";
import LessonDetail from "./pages/lesson-detail";
import AssignmentSubmissions from "./pages/assignment-submissions";
import NotFound from "./pages/not-found";

// Dashboard pages
import AdminDashboard from "@/pages/admin-dashboard";
import TeacherDashboard from "@/pages/teacher-dashboard";
import TeacherCourses from "@/pages/teacher-courses";
import TeacherStudents from "@/pages/teacher-students";
import TeacherStudentDetail from "@/pages/teacher-student-detail";
import StudentDashboard from "@/pages/student-dashboard";
import CourseManagementPage from "@/pages/course-management";



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
      <Route path="/blog" component={Blog} />
      <Route path="/verify" component={VerifyCertificate} />
      <Route path="/verify-certificate/:certificateId" component={VerifyCertificate} />
      <Route path="/courses/:courseId/lessons/:lessonId" component={LessonDetail} />
      <Route path="/assignments/:assignmentId/submissions" component={AssignmentSubmissions} />
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