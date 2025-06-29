import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  User, 
  BookOpen, 
  Calendar, 
  Mail, 
  Clock, 
  TrendingUp,
  Award,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function TeacherStudentDetail() {
  const { studentId } = useParams();
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch student details
  const { data: allUsers = [] } = useQuery({
    queryKey: ["/api/users"],
  });

  // Fetch teacher's courses
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
  });

  // Fetch enrollments
  const { data: enrollments = [] } = useQuery({
    queryKey: ["/api/enrollments"],
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

  // Find the student
  const student = Array.isArray(allUsers) 
    ? allUsers.find((u: any) => u.id === studentId && u.role === 'student')
    : null;

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-devcode-dark mb-4">Tələbə Tapılmadı</h1>
          <p className="text-devcode-gray">Bu tələbə mövcud deyil və ya sizin kurslarınızda deyil.</p>
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
    <div className="flex min-h-screen bg-gray-50">
      <GlobalActiveSession />
      <Sidebar userRole="teacher" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 pt-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/teacher/students">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tələbələr Siyahısı
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-devcode-orange rounded-full flex items-center justify-center text-white text-xl font-bold">
              {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-devcode-dark">{student.firstName} {student.lastName}</h1>
              <div className="flex items-center space-x-4 text-devcode-gray">
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-devcode-dark">{totalCourses}</div>
                  <div className="text-sm text-devcode-gray">Ümumi Kurs</div>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-devcode-dark">{Math.round(averageProgress)}%</div>
                  <div className="text-sm text-devcode-gray">Orta Tərəqqi</div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-devcode-dark">{Math.round(averageGrade)}</div>
                  <div className="text-sm text-devcode-gray">Orta Bal</div>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-devcode-dark">{completedCourses}</div>
                  <div className="text-sm text-devcode-gray">Tamamlanmış</div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Courses Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Kurs Tərəqqisi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentCourses.length === 0 ? (
                <p className="text-center text-devcode-gray py-4">Bu tələbə sizin heç bir kursunuzda qeydiyyatdan keçməyib.</p>
              ) : (
                studentCourses.map((course: any) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-devcode-dark">{course.title}</h4>
                        <p className="text-sm text-devcode-gray">
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
                      <div className="text-sm text-devcode-gray">
                        Son qiymət: <span className="font-medium">{course.grade} bal</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Submission History */}
          <Card>
            <CardHeader>
              <CardTitle>Tapşırıq Tarixçəsi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-devcode-dark">{totalSubmissions}</div>
                    <div className="text-sm text-devcode-gray">Ümumi Göndərmə</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-devcode-dark">{gradedSubmissions}</div>
                    <div className="text-sm text-devcode-gray">Qiymətləndirilmiş</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {studentSubmissions.slice(0, 5).map((submission: any) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-devcode-dark">Tapşırıq #{submission.assignmentId}</div>
                        <div className="text-sm text-devcode-gray">
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
                    <p className="text-center text-devcode-gray py-4">Hələ tapşırıq göndərməyib.</p>
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
  );
}