import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Bell, 
  Edit, 
  Trash2, 
  UserPlus,
  GraduationCap,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  School
} from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: string;
  updatedAt: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructorId: string;
  isActive: boolean;
  enrollmentCount: number;
  createdAt: string;
}

interface Enrollment {
  id: number;
  studentId: string;
  courseId: number;
  enrolledAt: string;
  progress: number;
  student: User;
  course: Course;
}

interface Stats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalCertificates: number;
}

export default function AdminDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student' as 'student' | 'teacher' | 'admin'
  });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Fetch system statistics
  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all users
  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all courses
  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all enrollments
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments/all"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Add new user mutation
  const addUserMutation = useMutation({
    mutationFn: async (userData: typeof newUserData) => {
      const response = await apiRequest("POST", "/api/auth/register", userData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setIsAddUserOpen(false);
      setNewUserData({ firstName: '', lastName: '', email: '', password: '', role: 'student' });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add user",
        variant: "destructive",
      });
    }
  });

  // Remove enrollment mutation
  const removeEnrollmentMutation = useMutation({
    mutationFn: async ({ enrollmentId }: { enrollmentId: number }) => {
      const response = await apiRequest("DELETE", `/api/enrollments/${enrollmentId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Enrollment removed successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments/all"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove enrollment",
        variant: "destructive",
      });
    }
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleAddUser = () => {
    if (!newUserData.firstName || !newUserData.lastName || !newUserData.email || !newUserData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    addUserMutation.mutate(newUserData);
  };

  const studentUsers = users.filter((u: User) => u.role === 'student');
  const teacherUsers = users.filter((u: User) => u.role === 'teacher');
  const adminUsers = users.filter((u: User) => u.role === 'admin');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage users, courses, and system settings</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-gray-600 text-white">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                {studentUsers.length} students, {teacherUsers.length} teachers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.totalCourses || 0}</div>
              <p className="text-xs text-muted-foreground">
                {courses.filter((c: Course) => c.isActive).length} active courses
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.totalEnrollments || 0}</div>
              <p className="text-xs text-muted-foreground">
                Active student enrollments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollments.filter((e: Enrollment) => e.progress > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Active learners
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gray-900 text-white hover:bg-gray-800">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={newUserData.firstName}
                              onChange={(e) => setNewUserData({...newUserData, firstName: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={newUserData.lastName}
                              onChange={(e) => setNewUserData({...newUserData, lastName: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUserData.email}
                            onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUserData.password}
                            onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select value={newUserData.role} onValueChange={(value) => setNewUserData({...newUserData, role: value as 'student' | 'teacher' | 'admin'})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={handleAddUser} 
                          className="w-full"
                          disabled={addUserMutation.isPending}
                        >
                          {addUserMutation.isPending ? "Adding..." : "Add User"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">USER</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">ROLE</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">CREATED</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((userData: User) => (
                          <tr key={userData.id} className="border-b border-gray-100">
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback className="bg-gray-500 text-white">
                                    {userData.firstName?.charAt(0)}{userData.lastName?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900">{userData.firstName} {userData.lastName}</div>
                                  <div className="text-sm text-gray-500">{userData.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <Badge 
                                variant={userData.role === 'admin' ? 'default' : userData.role === 'teacher' ? 'secondary' : 'outline'}
                                className="capitalize"
                              >
                                {userData.role}
                              </Badge>
                            </td>
                            <td className="py-4 px-2 text-sm text-gray-500">
                              {format(new Date(userData.createdAt), 'MMM dd, yyyy')}
                            </td>
                            <td className="py-4 px-2">
                              <Badge variant="outline" className="text-green-800 border-green-200">
                                Active
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                {coursesLoading ? (
                  <div className="text-center py-8">Loading courses...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">COURSE</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">INSTRUCTOR</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">ENROLLMENTS</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">STATUS</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">CREATED</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course: Course) => {
                          const instructor = users.find((u: User) => u.id === course.instructorId);
                          return (
                            <tr key={course.id} className="border-b border-gray-100">
                              <td className="py-4 px-2">
                                <div>
                                  <div className="font-medium text-gray-900">{course.title}</div>
                                  <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {course.description}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="text-sm text-gray-900">
                                  {instructor ? `${instructor.firstName} ${instructor.lastName}` : 'Unknown'}
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <Badge variant="outline">{course.enrollmentCount || 0}</Badge>
                              </td>
                              <td className="py-4 px-2">
                                <Badge variant={course.isActive ? "default" : "secondary"}>
                                  {course.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </td>
                              <td className="py-4 px-2 text-sm text-gray-500">
                                {format(new Date(course.createdAt), 'MMM dd, yyyy')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Management</CardTitle>
              </CardHeader>
              <CardContent>
                {enrollmentsLoading ? (
                  <div className="text-center py-8">Loading enrollments...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">STUDENT</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">COURSE</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">PROGRESS</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">ENROLLED</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments.map((enrollment: Enrollment) => (
                          <tr key={enrollment.id} className="border-b border-gray-100">
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback className="bg-gray-500 text-white">
                                    {enrollment.student?.firstName?.charAt(0)}{enrollment.student?.lastName?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {enrollment.student?.firstName} {enrollment.student?.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">{enrollment.student?.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <div className="font-medium text-gray-900">{enrollment.course?.title}</div>
                            </td>
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${enrollment.progress || 0}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600">{enrollment.progress || 0}%</span>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-sm text-gray-500">
                              {format(new Date(enrollment.enrolledAt), 'MMM dd, yyyy')}
                            </td>
                            <td className="py-4 px-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Enrollment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove this enrollment? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => removeEnrollmentMutation.mutate({ enrollmentId: enrollment.id })}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Students</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${users.length > 0 ? (studentUsers.length / users.length) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{studentUsers.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Teachers</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${users.length > 0 ? (teacherUsers.length / users.length) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{teacherUsers.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Admins</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${users.length > 0 ? (adminUsers.length / users.length) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{adminUsers.length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Courses</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {courses.filter((c: Course) => c.isActive).length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Inactive Courses</span>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium">
                          {courses.filter((c: Course) => !c.isActive).length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Enrollments</span>
                      <div className="flex items-center space-x-2">
                        <School className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">{enrollments.length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
