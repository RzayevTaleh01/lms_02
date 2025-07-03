import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, User, UserMinus } from "lucide-react";

export default function TeacherStudents() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Remove student mutation
  const removeStudentMutation = useMutation({
    mutationFn: async (enrollmentId: number) => {
      const response = await fetch(`/api/enrollments/${enrollmentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove student');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/all-enrollments"] });
      toast({
        title: "Success",
        description: "Tələbə uğurla kursdan çıxarıldı",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Tələbə çıxarılarkən xəta baş verdi",
        variant: "destructive",
      });
    },
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
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

  const handleRemoveStudent = (enrollmentId: number, studentName: string) => {
    if (window.confirm(`${studentName} adlı tələbəni kursdan çıxarmaq istədiyinizə əminsiniz?`)) {
      removeStudentMutation.mutate(enrollmentId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <GlobalActiveSession />
      <TeacherSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 16rem)' }}>
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Mənim Tələbələrim</h1>
                <p className="text-sm text-gray-600">
                  Bütün kurslarınızdakı tələbələrin siyahısı və onların məlumatları.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Tələbə adı, soyadı, email və ya kurs adı ilə axtarın..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{studentsWithCourses.length}</div>
                <div className="text-sm text-gray-500">Ümumi Tələbə</div>
              </CardContent>
            </Card>
          </div>

          {/* Students Table */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Users className="w-5 h-5 mr-2 text-gray-500" />
                Tələbələr Siyahısı
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStudents.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? "Axtarış nəticəsi tapılmadı" : "Hələ tələbəniz yoxdur"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm 
                      ? "Axtarış şərtlərini dəyişdirərək yenidən cəhd edin."
                      : "Tələbələr kurslarınıza qeydiyyatdan keçdikdən sonra burada görünəcəklər."
                    }
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tələbə</TableHead>
                      <TableHead>Kurslar</TableHead>
                      <TableHead>Orta Tərəqqi</TableHead>
                      <TableHead>Orta Bal</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student: any) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
                              {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {student.courses.slice(0, 2).map((course: any) => (
                              <div key={course.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 truncate max-w-xs">
                                  {course.title}
                                </span>
                                <Badge variant="outline" className="text-xs ml-2 border-gray-300 text-gray-600">
                                  {course.progress}%
                                </Badge>
                              </div>
                            ))}
                            {student.courses.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{student.courses.length - 2} əlavə kurs
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="text-lg font-bold text-gray-900">
                              {Math.round(student.averageProgress)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-lg font-bold text-gray-900">
                            {Math.round(student.averageGrade)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link href={`/teacher/students/${student.id}`}>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-gray-600 border-gray-300 hover:bg-gray-50"
                              >
                                <User className="w-4 h-4 mr-1" />
                                Ətraflı
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}