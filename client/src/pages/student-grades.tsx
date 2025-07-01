import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, FileText, TrendingUp, Target, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { StudentSidebar } from "@/components/student-sidebar";

export default function StudentGrades() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch submissions to get grades
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["/api/submissions"],
    enabled: !!user
  });

  // Fetch enrollments to get courses
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["/api/enrollments"],
    enabled: !!user
  });

  const isLoading = submissionsLoading || enrollmentsLoading;

  // Process grades data
  const gradedSubmissions = submissions.filter(s => s.grade !== null && s.grade !== undefined);
  const averageGrade = gradedSubmissions.length > 0 
    ? gradedSubmissions.reduce((sum, s) => sum + Number(s.grade || 0), 0) / gradedSubmissions.length 
    : 0;

  // Group submissions by course
  const gradesByCourse = enrollments.map(enrollment => {
    const courseSubmissions = submissions.filter(s => s.assignment?.courseId === enrollment.courseId);
    const coursegraded = courseSubmissions.filter(s => s.grade !== null && s.grade !== undefined);
    const courseAverage = coursegraded.length > 0
      ? coursegraded.reduce((sum, s) => sum + Number(s.grade || 0), 0) / coursegraded.length
      : 0;

    return {
      courseId: enrollment.courseId,
      courseName: enrollment.course?.title || 'Naməlum Kurs',
      submissions: courseSubmissions,
      gradedCount: coursegraded.length,
      totalCount: courseSubmissions.length,
      average: courseAverage
    };
  });

  const getGradeColor = (grade: number) => {
    if (!grade || isNaN(grade)) return "text-gray-500";
    if (grade >= 95) return "text-green-600"; // Maksimum bal üçün yaşıl
    if (grade >= 90) return "text-green-500";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    if (grade >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeBadgeVariant = (grade: number) => {
    if (!grade || isNaN(grade)) return "outline";
    if (grade >= 95) return "default"; // Maksimum bal üçün default (yaşıl)
    if (grade >= 90) return "secondary";
    if (grade >= 60) return "outline";
    return "destructive";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-0 flex items-center justify-center">
          <div className="text-center">Yüklənir...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Qiymətlərim</h1>
                <p className="text-gray-600">Tapşırıq və imtahan nəticələriniz</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orta Qiymət</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", getGradeColor(averageGrade))}>
                  {averageGrade > 0 ? averageGrade.toFixed(1) : "0.0"}
                </div>
                <p className="text-xs text-muted-foreground">
                  100 bal üzərindən
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qiymətləndirilmiş</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {gradedSubmissions.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {submissions.length} tapşırıqdan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ən Yüksək Qiymət</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {gradedSubmissions.length > 0 ? Math.max(...gradedSubmissions.map(s => s.grade || 0)) : 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Maksimum nəticə
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamamlanma</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {submissions.length > 0 ? Math.round((gradedSubmissions.length / submissions.length) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Qiymətləndirilmə faizi
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Course Grades */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Kurs üzrə Qiymətlər</h2>

            {gradesByCourse.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Qiymət məlumatı yoxdur
                  </h3>
                  <p className="text-gray-600">
                    Hələ heç bir tapşırıq təqdim etməmisiniz
                  </p>
                </CardContent>
              </Card>
            ) : (
              gradesByCourse.map((course) => (
                <Card key={course.courseId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{course.courseName}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getGradeBadgeVariant(course.average)}>
                          Orta: {course.average > 0 ? course.average.toFixed(1) : "0.0"}
                        </Badge>
                        <Badge variant="outline">
                          {course.gradedCount}/{course.totalCount} qiymətləndirildi
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {course.submissions.length === 0 ? (
                      <p className="text-gray-600 text-center py-4">Bu kursda tapşırıq yoxdur</p>
                    ) : (
                      <div className="space-y-3">
                        {course.submissions.map((submission) => (
                          <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {submission.assignment?.title || 'Tapşırıq'}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Təqdim tarixi: {new Date(submission.submittedAt).toLocaleDateString('az-AZ')}
                              </p>
                              {submission.feedback && (
                                <p className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Rəy:</span> {submission.feedback}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              {submission.grade !== null && submission.grade !== undefined ? (
                                <div>
                                  <div className={cn("text-xl font-bold", getGradeColor(Number(submission.grade)))}>
                                    {Number(submission.grade).toFixed(1)}
                                  </div>
                                  <p className="text-xs text-gray-500">100-dən</p>
                                </div>
                              ) : (
                                <Badge variant="outline">
                                  Qiymətləndirilməyib
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}