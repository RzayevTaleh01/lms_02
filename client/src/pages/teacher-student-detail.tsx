import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Mail, 
  Clock, 
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react";

export default function TeacherStudentDetail() {
  const { studentId } = useParams();
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch student details
  const { data: allUsers = [] } = useQuery({
    queryKey: ["/api/users"],
  });

  // Fetch teacher's courses
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
  });

  // Fetch all enrollments
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

  // Fetch submissions for this student
  const { data: submissions = [] } = useQuery({
    queryKey: ["/api/submissions"],
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

  // Find the student
  const student = Array.isArray(allUsers) 
    ? allUsers.find((u: any) => u.id === studentId && u.role === 'student')
    : null;

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tələbə Tapılmadı</h1>
          <p className="text-gray-600">Bu tələbə mövcud deyil və ya sizin kurslarınızda deyil.</p>
          <Link href="/teacher/students">
            <Button className="mt-4">Tələbələr Siyahısına Qayıt</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get teacher's course IDs
  const teacherCourseIds = Array.isArray(courses) ? courses.map((course: any) => course.id) : [];

  // Get student's enrollments in teacher's courses
  const studentEnrollments = Array.isArray(enrollments) 
    ? enrollments.filter((enrollment: any) => 
        enrollment.studentId === studentId && teacherCourseIds.includes(enrollment.courseId)
      )
    : [];

  // Get student's courses with details
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

  // Get student's submissions
  const studentSubmissions = Array.isArray(submissions) 
    ? submissions.filter((submission: any) => submission.studentId === studentId)
    : [];

  // Calculate statistics
  const totalCourses = studentCourses.length;
  const averageProgress = totalCourses > 0 
    ? studentCourses.reduce((acc: number, course: any) => acc + course.progress, 0) / totalCourses 
    : 0;
  const averageGrade = totalCourses > 0 
    ? studentCourses.reduce((acc: number, course: any) => acc + course.grade, 0) / totalCourses 
    : 0;
  const completedCourses = studentCourses.filter((course: any) => course.progress >= 100).length;
  const totalSubmissions = studentSubmissions.length;
  const gradedSubmissions = studentSubmissions.filter((sub: any) => sub.grade !== null).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <GlobalActiveSession />
      <TeacherSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/teacher/students">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tələbələr Siyahısı
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{student.firstName} {student.lastName}</h1>
                  <p className="text-sm text-gray-600">Tələbə məlumatları və statistikalar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Student Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-xl font-semibold">
                {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{student.firstName} {student.lastName}</h2>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Qeydiyyat: {new Date(student.createdAt).toLocaleDateString('az-AZ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalCourses}</div>
                    <div className="text-sm text-gray-600">Ümumi Kurs</div>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{Math.round(averageProgress)}%</div>
                    <div className="text-sm text-gray-600">Orta Tərəqqi</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{Math.round(averageGrade)}</div>
                    <div className="text-sm text-gray-600">Orta Bal</div>
                  </div>
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{completedCourses}</div>
                    <div className="text-sm text-gray-600">Tamamlanmış</div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Courses Progress */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Kurs Tərəqqisi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studentCourses.length === 0 ? (
                  <p className="text-center text-gray-600 py-4">Bu tələbə sizin heç bir kursunuzda qeydiyyatdan keçməyib.</p>
                ) : (
                  studentCourses.map((course: any) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">
                            Qeydiyyat: {new Date(course.enrolledAt).toLocaleDateString('az-AZ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{course.progress}%</div>
                          <Badge variant={course.progress >= 100 ? "default" : "secondary"}>
                            {course.progress >= 100 ? "Tamamlandı" : "Davam edir"}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      {course.grade > 0 && (
                        <div className="text-sm text-gray-600">
                          Son qiymət: <span className="font-medium">{course.grade} bal</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Submission History */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Tapşırıq Tarixçəsi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{totalSubmissions}</div>
                      <div className="text-sm text-gray-600">Ümumi Göndərmə</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{gradedSubmissions}</div>
                      <div className="text-sm text-gray-600">Qiymətləndirilmiş</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {studentSubmissions.slice(0, 5).map((submission: any) => (
                      <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Tapşırıq #{submission.assignmentId}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(submission.submittedAt).toLocaleDateString('az-AZ')}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.grade !== null ? (
                            <>
                              <Badge variant="default">{submission.grade} bal</Badge>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </>
                          ) : (
                            <>
                              <Badge variant="secondary">Gözləyir</Badge>
                              <Clock className="w-4 h-4 text-yellow-600" />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {studentSubmissions.length === 0 && (
                      <p className="text-center text-gray-600 py-4">Hələ tapşırıq göndərməyib.</p>
                    )}
                    
                    {studentSubmissions.length > 5 && (
                      <div className="text-center">
                        <Button variant="outline" size="sm">
                          Hamısını Gör ({studentSubmissions.length - 5} əlavə)
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}