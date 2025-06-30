import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Trophy, Target, Clock, Users } from "lucide-react";
import { Link } from "wouter";

export default function StudentDashboard() {
  const { user } = useUser();

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ["/api/enrollments"],
    enabled: !!user
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["/api/submissions"],
    enabled: !!user
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Xoş gəlmisiniz, {user?.firstName}!</h1>
          <p className="text-muted-foreground mt-2">Təhsil səyahətinizi davam etdirin</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="px-3 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Tələbə
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktiv Kurslar</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments.length}</div>
            <p className="text-xs text-muted-foreground">
              Qeydiyyatdan keçdiyiniz kurslar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Təqdim edilmiş</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
            <p className="text-xs text-muted-foreground">
              Göndərdiyiniz tapşırıqlar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qiymətləndirilmiş</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submissions.filter((s: any) => s.grade).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Qiymət almış tapşırıqlar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orta Qiymət</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submissions.filter((s: any) => s.grade).length > 0
                ? Math.round(
                    submissions
                      .filter((s: any) => s.grade)
                      .reduce((sum: number, s: any) => sum + s.grade, 0) /
                    submissions.filter((s: any) => s.grade).length
                  )
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Bütün tapşırıqlardan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Kurslarım</h2>
        
        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-10">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hələ kursa qeydiyyat keçməmisiniz</h3>
              <p className="text-muted-foreground mb-4">
                Təhsilinizə başlamaq üçün kurslara baxın və qeydiyyat keçin
              </p>
              <Link href="/courses">
                <Button>Kursları Gör</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((enrollment: any) => (
              <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{enrollment.course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {enrollment.course.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tamamlanma</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {enrollment.course.duration || "∞"} saat
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {enrollment.course.level || "Başlanğıc"}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/student/course/${enrollment.course.id}`}>
                      <Button className="w-full">
                        {enrollment.progress > 0 ? "Davam Et" : "Başla"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Submissions */}
      {submissions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Son Tapşırıqlar</h2>
          <div className="space-y-2">
            {submissions.slice(0, 5).map((submission: any) => (
              <Card key={submission.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{submission.assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {submission.assignment.course.title}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={submission.grade ? "default" : "secondary"}
                      >
                        {submission.grade ? `${submission.grade} bal` : "Gözləyir"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(submission.submittedAt).toLocaleDateString('az-AZ')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}