import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, User, BookOpen, Calendar, TrendingUp } from "lucide-react";

export default function TeacherStudents() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users to find students enrolled in this teacher's courses
  const { data: allUsers = [] } = useQuery({
    queryKey: ["/api/users"],
  });

  // Fetch teacher's courses to get enrolled students
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
  });

  // Fetch all enrollments (not just teacher's enrollments)
  const { data: enrollments = [] } = useQuery({
    queryKey: ["/api/all-enrollments"],
    queryFn: async () => {
      const response = await fetch("/api/enrollments/all");
      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }
      return response.json();
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

  // Get course IDs for this teacher
  const teacherCourseIds = Array.isArray(courses) ? courses.map((course: any) => course.id) : [];

  // Get enrollments for teacher's courses
  const teacherEnrollments = Array.isArray(enrollments) 
    ? enrollments.filter((enrollment: any) => teacherCourseIds.includes(enrollment.courseId))
    : [];

  // Get unique student IDs from enrollments
  const enrollmentStudentIds = teacherEnrollments.map((enrollment: any) => enrollment.studentId);
  const studentIds = enrollmentStudentIds.filter((id, index) => enrollmentStudentIds.indexOf(id) === index);

  // Get student details and their course information
  const studentsWithCourses = studentIds.map(studentId => {
    const studentInfo = Array.isArray(allUsers) 
      ? allUsers.find((u: any) => u.id === studentId && u.role === 'student')
      : null;
    
    if (!studentInfo) return null;

    const studentEnrollments = teacherEnrollments.filter((enrollment: any) => enrollment.studentId === studentId);
    const studentCourses = studentEnrollments.map((enrollment: any) => {
      const course = Array.isArray(courses) 
        ? courses.find((c: any) => c.id === enrollment.courseId)
        : null;
      return {
        ...course,
        enrollmentId: enrollment.id,
        progress: enrollment.progress || 0,
        grade: enrollment.grade || 0,
        enrolledAt: enrollment.enrolledAt
      };
    }).filter(Boolean);

    return {
      ...studentInfo,
      courses: studentCourses,
      totalCourses: studentCourses.length,
      averageProgress: studentCourses.length > 0 
        ? studentCourses.reduce((acc: number, course: any) => acc + course.progress, 0) / studentCourses.length 
        : 0,
      averageGrade: studentCourses.length > 0 
        ? studentCourses.reduce((acc: number, course: any) => acc + course.grade, 0) / studentCourses.length 
        : 0
    };
  }).filter(Boolean);

  // Filter students based on search term
  const filteredStudents = studentsWithCourses.filter((student: any) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName?.toLowerCase().includes(searchLower) ||
      student.lastName?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.courses?.some((course: any) => course.title?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <GlobalActiveSession />
      <Sidebar userRole="teacher" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 pt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-devcode-dark">Mənim Tələbələrim</h1>
          <p className="text-devcode-gray">
            Bütün kurslarınızdakı tələbələrin siyahısı və onların məlumatları.
          </p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-devcode-gray w-4 h-4" />
              <Input
                placeholder="Tələbə adı, soyadı, email və ya kurs adı ilə axtarın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-devcode-dark">{studentsWithCourses.length}</div>
              <div className="text-sm text-devcode-gray">Ümumi Tələbə</div>
            </CardContent>
          </Card>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-16 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-devcode-gray opacity-50" />
                  <h3 className="text-lg font-semibold text-devcode-dark mb-2">
                    {searchTerm ? "Axtarış nəticəsi tapılmadı" : "Hələ tələbəniz yoxdur"}
                  </h3>
                  <p className="text-devcode-gray">
                    {searchTerm 
                      ? "Axtarış şərtlərini dəyişdirərək yenidən cəhd edin."
                      : "Tələbələr kurslarınıza qeydiyyatdan keçdikdən sonra burada görünəcəklər."
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredStudents.map((student: any) => (
              <Card key={student.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-devcode-orange rounded-full flex items-center justify-center text-white font-semibold">
                      {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{student.firstName} {student.lastName}</CardTitle>
                      <p className="text-sm text-devcode-gray">{student.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Student Stats */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-devcode-dark">{student.totalCourses}</div>
                      <div className="text-xs text-devcode-gray">Kurs</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-devcode-dark">{Math.round(student.averageProgress)}%</div>
                      <div className="text-xs text-devcode-gray">Tərəqqi</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-devcode-dark">{Math.round(student.averageGrade)}</div>
                      <div className="text-xs text-devcode-gray">Bal</div>
                    </div>
                  </div>

                  {/* Student Courses */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-devcode-dark">Kurslar:</h4>
                    <div className="space-y-1">
                      {student.courses.slice(0, 2).map((course: any) => (
                        <div key={course.id} className="flex items-center justify-between text-sm">
                          <span className="text-devcode-gray truncate">{course.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {course.progress}%
                          </Badge>
                        </div>
                      ))}
                      {student.courses.length > 2 && (
                        <div className="text-xs text-devcode-gray">
                          +{student.courses.length - 2} əlavə kurs
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/teacher/students/${student.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-devcode-orange border-devcode-orange hover:bg-orange-50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Ətraflı Bax
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}