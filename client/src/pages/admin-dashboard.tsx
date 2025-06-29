import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, BookOpen, Award, TrendingUp, Bell, Edit, Trash2 } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function AdminDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
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

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-devcode-dark mb-4">Access Denied</h1>
          <p className="text-devcode-gray">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const mockUsers = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "student",
      status: "active",
      lastActive: "2025-01-15"
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Smith",
      email: "sarah@example.com",
      role: "teacher",
      status: "active",
      lastActive: "2025-01-14"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-devcode-dark">Admin Dashboard</h1>
            <p className="text-devcode-gray">Manage users, monitor progress, and view system statistics</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-devcode-orange text-white">
                A
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
              <div className="text-2xl font-bold">{stats?.totalUsers || 1247}</div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mt-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCourses || 24}</div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mt-2">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCertificates || 892}</div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mt-2">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <div className="w-12 h-12 bg-devcode-orange bg-opacity-20 rounded-xl flex items-center justify-center mt-2">
                <TrendingUp className="w-6 h-6 text-devcode-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent User Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent User Activity</CardTitle>
              <Button className="bg-devcode-dark text-white hover:bg-gray-800">
                + Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-medium text-devcode-gray">USER</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-devcode-gray">ROLE</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-devcode-gray">STATUS</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-devcode-gray">LAST ACTIVE</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-devcode-gray">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-blue-500 text-white">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-devcode-dark">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-devcode-gray">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant={user.role === 'student' ? 'secondary' : 'default'} className="capitalize">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className="text-green-800 border-green-200">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-sm text-devcode-gray">{user.lastActive}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
