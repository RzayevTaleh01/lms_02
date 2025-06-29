import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, FileText, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function TeacherDashboard() {
  const { user } = useAuth();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ["/api/enrollments"],
  });

  // Filter courses by current teacher
  const myCourses = courses.filter((course: any) => course.instructorId === user?.id);

  const stats = {
    totalCourses: myCourses.length,
    totalStudents: enrollments.length,
    activeSessions: 0, // Will be updated with live sessions
    completedLessons: 0
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-devcode-dark mb-4">
            Xoş Gəldiniz, {user?.firstName}!
          </h1>
          <p className="text-devcode-gray text-lg">
            Kurslarınızı idarə edin və tələbələrinizin irəliləyişini izləyin.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-devcode-gray mb-1">Ümumi Kurslar</p>
                  <p className="text-3xl font-bold text-devcode-dark">{stats.totalCourses}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-devcode-gray mb-1">Tələbələr</p>
                  <p className="text-3xl font-bold text-devcode-dark">{stats.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-devcode-gray mb-1">Aktiv Sessiyalar</p>
                  <p className="text-3xl font-bold text-devcode-dark">{stats.activeSessions}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-devcode-orange" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-devcode-gray mb-1">Tamamlanan Dərslər</p>
                  <p className="text-3xl font-bold text-devcode-dark">{stats.completedLessons}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Mənim Kurslarım</CardTitle>
            <Link href="/courses">
              <Button className="bg-devcode-orange hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Kurs Yarat
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {myCourses.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-devcode-dark mb-2">Hələ kurs yaratmamısınız</h3>
                <p className="text-devcode-gray mb-4">İlk kursunuzu yaradaraq tədrisi başlayın.</p>
                <Link href="/courses">
                  <Button className="bg-devcode-orange hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Kursunuzu Yaradın
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((course: any) => (
                  <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-devcode-orange to-orange-600 rounded-lg mb-4 flex items-center justify-center">
                        {course.imageUrl ? (
                          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <div className="text-4xl text-white opacity-50">📚</div>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-devcode-dark mb-2">{course.title}</h3>
                      <p className="text-sm text-devcode-gray mb-4 line-clamp-2">
                        {course.shortDescription || course.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="capitalize">
                          {course.level === 'beginner' ? 'Başlanğıc' : course.level === 'intermediate' ? 'Orta' : 'İrəli'}
                        </Badge>
                        <span className="text-sm text-devcode-gray">
                          👥 {course.enrollmentCount || 0} tələbə
                        </span>
                      </div>

                      <Link href={`/course/${course.id}/manage`}>
                        <Button className="w-full bg-devcode-orange hover:bg-orange-600">
                          İdarə Et
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}