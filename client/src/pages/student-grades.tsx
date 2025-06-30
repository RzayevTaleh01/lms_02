
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, FileText, Target, Home, GraduationCap, ClipboardList, User, LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";

const StudentSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: "Ana Səhifə", href: "/student", exact: true },
    { icon: GraduationCap, label: "Kurslarım", href: "/student/courses" },
    { icon: ClipboardList, label: "Davamiyyət", href: "/student/attendance" },
    { icon: Award, label: "Qiymətlərim", href: "/student/grades" },
    { icon: User, label: "Profil", href: "/student/profile" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:relative lg:z-0"
      )}>
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">DevCode Academy</h2>
          <p className="text-sm text-gray-600">Tələbə Paneli</p>
        </div>

        {/* User Info */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location === item.href 
              : location.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Çıxış</span>
          </button>
        </div>
      </div>
    </>
  );
};

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
  const gradedSubmissions = submissions.filter(s => s.grade !== null);
  const averageGrade = gradedSubmissions.length > 0 
    ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length 
    : 0;

  // Group submissions by course
  const gradesByCourse = enrollments.map(enrollment => {
    const courseSubmissions = submissions.filter(s => s.assignment?.courseId === enrollment.courseId);
    const coursegraded = courseSubmissions.filter(s => s.grade !== null);
    const courseAverage = coursegraded.length > 0
      ? coursegraded.reduce((sum, s) => sum + (s.grade || 0), 0) / coursegraded.length
      : 0;

    return {
      courseId: enrollment.courseId,
      courseName: enrollment.course.title,
      submissions: courseSubmissions,
      gradedCount: coursegraded.length,
      totalCount: courseSubmissions.length,
      average: courseAverage
    };
  });

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    if (grade >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeBadgeVariant = (grade: number) => {
    if (grade >= 90) return "default";
    if (grade >= 80) return "secondary";
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
      <div className="flex-1 lg:ml-0">
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
                  {averageGrade.toFixed(1)}
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
                          Orta: {course.average.toFixed(1)}
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
                              {submission.grade !== null ? (
                                <div>
                                  <div className={cn("text-xl font-bold", getGradeColor(submission.grade))}>
                                    {submission.grade}
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
