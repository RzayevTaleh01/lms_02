
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Users, TrendingUp, Calendar, Target, Zap, ArrowRight, Play, Code, Monitor } from "lucide-react";

export default function Home() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && user) {
      toast({
        title: "Xoş gəlmisiniz!",
        description: `Salam ${user.firstName || user.email}, öyrənməyə davam etməyə hazırsınız?`,
      });
    }
  }, [user, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Yüklənir...</p>
        </div>
      </div>
    );
  }

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'teacher':
        return '/teacher';
      case 'student':
        return '/student';
      default:
        return '/courses';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Welcome Message */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-sm font-medium text-blue-700">
                Xoş gəldiniz, {user?.firstName || user?.email?.split('@')[0]}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                DevCode Academy
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Öyrənmə səyahətinizə davam etməyə hazırsınız? Peşəkar proqramlaşdırma bacarıqlarınızı inkişaf etdirin.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href={getDashboardLink()}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium">
                  <Monitor className="w-5 h-5 mr-2" />
                  İdarə Panelinə Keç
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base font-medium">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Kursları Araşdır
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Sizin Statistikanız
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Tərəqqinizi izləyin və nailiyyətlərinizi görün
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Role Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Rol</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900 capitalize mb-1">{user?.role}</div>
                <p className="text-sm text-gray-500">Aktiv istifadəçi</p>
              </CardContent>
            </Card>
            
            {/* Courses Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Kurslar</CardTitle>
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {user?.role === 'student' ? '3' : user?.role === 'teacher' ? '6' : '24'}
                </div>
                <p className="text-sm text-gray-500">
                  {user?.role === 'student' ? 'Qeydiyyatlı' : user?.role === 'teacher' ? 'Tədris edir' : 'Ümumi aktiv'}
                </p>
              </CardContent>
            </Card>
            
            {/* Progress Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Tərəqqi</CardTitle>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {user?.role === 'student' ? '75%' : user?.role === 'teacher' ? '142' : '1,247'}
                </div>
                <p className="text-sm text-gray-500">
                  {user?.role === 'student' ? 'Orta göstərici' : user?.role === 'teacher' ? 'Tələbə' : 'İstifadəçi'}
                </p>
              </CardContent>
            </Card>
            
            {/* Achievements Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Nailiyyətlər</CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {user?.role === 'student' ? '2' : user?.role === 'teacher' ? '8' : '892'}
                </div>
                <p className="text-sm text-gray-500">
                  {user?.role === 'student' ? 'Sertifikat' : user?.role === 'teacher' ? 'Gözləyən tapşırıq' : 'Tamamlanmış'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Tez Əməliyyatlar
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Ən çox istifadə olunan funksiyalara tez keçid edin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/courses">
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-100 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kursları Araşdır</h3>
                  <p className="text-sm text-gray-600">Mövcud kursları görün və qeydiyyatdan keçin</p>
                </CardContent>
              </Card>
            </Link>

            <Link href={getDashboardLink()}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-100 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">İdarə Paneli</h3>
                  <p className="text-sm text-gray-600">Ətraflı statistika və idarəetmə alətləri</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog">
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-100 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Code className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Texnoloji Bloq</h3>
                  <p className="text-sm text-gray-600">Ən son texnoloji yeniliklər və məqalələr</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/verify">
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-100 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <Award className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sertifikat Yoxla</h3>
                  <p className="text-sm text-gray-600">Sertifikatların həqiqiliyini təsdiq edin</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Proqramlaşdırma gələcəyinizi qurun
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hər gün yeni şeylər öyrənin, praktik layihələr üzərində işləyin və peşəkar inkişafınızı davam etdirin.
            </p>
            <div className="pt-4">
              <Link href="/courses">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium">
                  <Play className="w-5 h-5 mr-2" />
                  İndi Başla
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
