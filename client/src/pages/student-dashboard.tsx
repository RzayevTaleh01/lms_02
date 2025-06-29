import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Clock, Award, TrendingUp, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function StudentDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: enrollments = [] } = useQuery({
    queryKey: ["/api/enrollments"],
    retry: false,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["/api/submissions"],
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  if (!user || user.role !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-devcode-dark mb-4">Access Denied</h1>
          <p className="text-devcode-gray">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const upcomingDeadlines = [
    {
      id: 1,
      title: "JavaScript Project Submission",
      dueDate: "Tomorrow",
      priority: "high",
      course: "Complete JavaScript Bootcamp"
    },
    {
      id: 2,
      title: "React Component Quiz",
      dueDate: "In 3 days",
      priority: "medium",
      course: "React Frontend Development"
    },
    {
      id: 3,
      title: "Portfolio Website",
      dueDate: "In 1 week",
      priority: "low",
      course: "Full Stack Development"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "completed",
      title: "Completed \"Arrays and Objects\" lesson",
      time: "2 hours ago",
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 2,
      type: "submitted",
      title: "Submitted \"DOM Manipulation\" assignment",
      time: "Yesterday",
      icon: FileText,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 3,
      type: "earned",
      title: "Earned \"JavaScript Fundamentals\" badge",
      time: "2 days ago",
      icon: Award,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const mockEnrollments = enrollments.length > 0 ? enrollments : [
    {
      id: 1,
      course: {
        id: 1,
        title: "Complete JavaScript Bootcamp",
        description: "Master JavaScript from basics to advanced concepts"
      },
      progress: 75
    },
    {
      id: 2,
      course: {
        id: 2,
        title: "React Frontend Development",
        description: "Build modern web applications with React"
      },
      progress: 45
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="student" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-devcode-dark">
            Welcome back, {user.firstName || user.email?.split('@')[0]}!
          </h1>
          <p className="text-devcode-gray">Continue your learning journey and track your progress.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEnrollments.length}</div>
              <p className="text-xs text-muted-foreground">2 nearing completion</p>
              <div className="w-12 h-12 bg-devcode-orange bg-opacity-20 rounded-xl flex items-center justify-center mt-2">
                <BookOpen className="w-6 h-6 text-devcode-orange" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
              <p className="text-xs text-muted-foreground">Next due tomorrow</p>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mt-2">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 this month</p>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mt-2">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockEnrollments.map((enrollment: any) => (
                <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-devcode-dark">{enrollment.course.title}</h3>
                    <span className="text-sm text-devcode-gray">{enrollment.progress}% Complete</span>
                  </div>
                  <Progress value={enrollment.progress} className="mb-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-devcode-gray">
                      Next: {enrollment.progress > 50 ? "Advanced Concepts" : "Fundamentals"}
                    </span>
                    <Button size="sm" className="bg-devcode-orange hover:bg-orange-600">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
              
              {mockEnrollments.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-devcode-gray mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-devcode-dark mb-2">No enrolled courses</h3>
                  <p className="text-devcode-gray mb-4">Start your learning journey by enrolling in a course.</p>
                  <Button className="bg-devcode-orange hover:bg-orange-600">
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className={`flex items-start space-x-4 p-3 rounded-lg ${
                  deadline.priority === 'high' ? 'bg-red-50' :
                  deadline.priority === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    deadline.priority === 'high' ? 'bg-red-500' :
                    deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-devcode-dark">{deadline.title}</h3>
                    <p className="text-sm text-devcode-gray">{deadline.dueDate}</p>
                    <Button variant="link" size="sm" className="text-devcode-orange hover:text-orange-600 p-0 h-auto">
                      {deadline.priority === 'high' ? 'Submit Assignment' : 
                       deadline.priority === 'medium' ? 'Start Quiz' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                      <IconComponent className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-devcode-dark">{activity.title}</p>
                      <p className="text-sm text-devcode-gray">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
