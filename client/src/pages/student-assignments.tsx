import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, FileText, Award, CheckCircle, AlertCircle, Menu } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { StudentSidebar } from "@/components/student-sidebar";

const getGradeColor = (grade: number | null, maxPoints: number) => {
  if (grade === null) return "text-gray-500";
  const percentage = (grade / maxPoints) * 100;
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 80) return "text-blue-600";
  if (percentage >= 70) return "text-yellow-600";
  if (percentage >= 60) return "text-orange-600";
  return "text-red-600";
};

const getStatusBadge = (submission: any) => {
  if (!submission) {
    return <Badge variant="secondary">Göndərilməyib</Badge>;
  }
  if (submission.grade !== null) {
    return <Badge variant="default">Qiymətləndirildi</Badge>;
  }
  return <Badge variant="outline">Gözləyir</Badge>;
};

export default function StudentAssignments() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["/api/submissions"],
    enabled: !!user
  });

  // Get assignment statistics
  const totalAssignments = submissions.length;
  const gradedAssignments = submissions.filter((s: any) => s.grade !== null);
  const pendingAssignments = submissions.filter((s: any) => s.grade === null);
  const averageGrade = gradedAssignments.length > 0 
    ? gradedAssignments.reduce((sum: number, s: any) => sum + s.grade, 0) / gradedAssignments.length 
    : 0;

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
                <h1 className="text-2xl font-bold text-gray-900">Tapşırıqlarım</h1>
                <p className="text-gray-600">Bütün tapşırıqlarım və qiymətlərim</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ümumi Tapşırıq</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAssignments}</div>
                <p className="text-xs text-muted-foreground">
                  Göndərilmiş tapşırıq
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qiymətləndirilmiş</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {gradedAssignments.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalAssignments} tapşırıqdan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gözləyən</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {pendingAssignments.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Qiymətləndirmə gözləyir
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orta Qiymət</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", getGradeColor(averageGrade, 100))}>
                  {averageGrade.toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  100 bal üzərindən
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hələ tapşırıq göndərməmisiniz</h3>
                  <p className="text-gray-600 text-center">
                    Kurslarınıza daxil olub tapşırıqları tamamlayın
                  </p>
                  <Link href="/student/courses">
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Kurslara Get
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              submissions.map((submission: any) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              {submission.assignment.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Kurs: {submission.assignment.course.title}
                            </p>
                          </div>
                          {getStatusBadge(submission)}
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Göndərildi: {new Date(submission.submittedAt).toLocaleDateString('az-AZ')}
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            Maksimum: {submission.assignment.maxPoints} bal
                          </div>
                          {submission.grade !== null && (
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span className={getGradeColor(submission.grade, submission.assignment.maxPoints)}>
                                Aldığınız: {submission.grade} bal
                              </span>
                            </div>
                          )}
                        </div>

                        {submission.content && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Cavab məzmunu:</p>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                              {submission.content}
                            </p>
                          </div>
                        )}

                        {submission.githubUrl && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">GitHub linki:</p>
                            <a 
                              href={submission.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {submission.githubUrl}
                            </a>
                          </div>
                        )}

                        {submission.feedback && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Müəllim rəyi:</p>
                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                              {submission.feedback}
                            </p>
                          </div>
                        )}

                        {submission.gradedAt && (
                          <div className="text-xs text-gray-500">
                            Qiymətləndirmə tarixi: {new Date(submission.gradedAt).toLocaleString('az-AZ')}
                          </div>
                        )}
                      </div>

                      <div className="ml-6">
                        {submission.grade !== null ? (
                          <div className="text-center">
                            <div className={cn("text-3xl font-bold", getGradeColor(submission.grade, submission.assignment.maxPoints))}>
                              {submission.grade}
                            </div>
                            <div className="text-sm text-gray-500">
                              {submission.assignment.maxPoints} bal
                            </div>
                            <div className="mt-2">
                              <Progress 
                                value={(submission.grade / submission.assignment.maxPoints) * 100} 
                                className="w-16 h-2"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Gözləyir</p>
                          </div>
                        )}
                      </div>
                    </div>
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