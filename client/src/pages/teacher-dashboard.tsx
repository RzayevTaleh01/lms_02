import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Users, Calendar, CheckSquare, Plus, FileText, UserPlus, CalendarPlus } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function TeacherDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

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

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-devcode-dark mb-4">Access Denied</h1>
          <p className="text-devcode-gray">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const mockCourses = [
    {
      id: 1,
      title: "Mathematics 101",
      students: 24,
      room: "Room 201",
      time: "Today 10:00 AM",
      code: "M1",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Algebra II",
      students: 18,
      room: "Room 305",
      time: "Today 2:00 PM",
      code: "A2",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Calculus I",
      students: 22,
      room: "Room 301",
      time: "Tomorrow 9:00 AM",
      code: "C1",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const mockSchedule = [
    { name: "Math 101", time: "10:00 - 11:30 AM", color: "bg-green-500" },
    { name: "Algebra II", time: "2:00 - 3:30 PM", color: "bg-blue-500" },
    { name: "Calculus I", time: "Tomorrow 9:00 AM", color: "bg-purple-500" },
    { name: "Statistics", time: "Wed 11:00 AM", color: "bg-yellow-500" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="teacher" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-devcode-dark">Dashboard Overview</h1>
          <p className="text-devcode-gray">
            Welcome back, {user.firstName || 'Teacher'}! Here's what's happening with your classes today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">+2 from last semester</p>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mt-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mt-2">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Due this week</p>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mt-2">
                <CheckSquare className="w-6 h-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Next at 10:00 AM</p>
              <div className="w-12 h-12 bg-devcode-orange bg-opacity-20 rounded-xl flex items-center justify-center mt-2">
                <Calendar className="w-6 h-6 text-devcode-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-devcode-dark text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                New Assignment
              </Button>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
              <Button variant="outline">
                <CalendarPlus className="w-4 h-4 mr-2" />
                Schedule Class
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${course.color}`}>
                    <span className="font-semibold">{course.code}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-devcode-dark">{course.title}</h3>
                    <p className="text-sm text-devcode-gray">{course.students} students • {course.room}</p>
                  </div>
                  <span className="text-sm text-devcode-gray">{course.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* This Week Schedule */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>This Week</CardTitle>
                <Button variant="link" size="sm" className="text-devcode-orange hover:text-orange-600">
                  View Full Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSchedule.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-devcode-dark">{item.name}</div>
                    <div className="text-sm text-devcode-gray">{item.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
