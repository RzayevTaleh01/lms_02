
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-orange-900 to-blue-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            {/* Welcome Badge */}
            <div className="flex items-center justify-center">
              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 text-lg font-medium">
                🎯 Xoş gəldiniz, {user?.firstName || user?.email?.split('@')[0]}!
              </Badge>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  DevCode Academy
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Öyrənmə səyahətinizə davam etməyə hazırsınız? Peşəkar proqramlaşdırma bacarıqlarınızı inkişaf etdirin.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href={getDashboardLink()}>
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300">
                  <Monitor className="w-6 h-6 mr-3" />
                  İdarə Panelinə Keç
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Kursları Araşdır
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sizin <span className="text-orange-500">Statistikanız</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tərəqqinizi izləyin və nailiyyətlərinizi görün
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Role Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Rol</CardTitle>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-gray-900 capitalize mb-2">{user?.role}</div>
                <p className="text-sm text-gray-500">Aktiv istifadəçi</p>
              </CardContent>
            </Card>
            
            {/* Courses Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Kurslar</CardTitle>
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.role === 'student' ? '3' : user?.role === 'teacher' ? '6' : '24'}
                </div>
                <p className="text-sm text-gray-500">
                  {user?.role === 'student' ? 'Qeydiyyatlı' : user?.role === 'teacher' ? 'Tədris edir' : 'Ümumi aktiv'}
                </p>
              </CardContent>
            </Card>
            
            {/* Progress Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Tərəqqi</CardTitle>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.role === 'student' ? '75%' : user?.role === 'teacher' ? '142' : '1,247'}
                </div>
                <p className="text-sm text-gray-500">
                  {user?.role === 'student' ? 'Orta göstərici' : user?.role === 'teacher' ? 'Tələbə' : 'İstifadəçi'}
                </p>
              </CardContent>
            </Card>
            
            {/* Achievements Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Nailiyyətlər</CardTitle>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-gray-900 mb-2">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tez <span className="text-blue-500">Əməliyyatlar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ən çox istifadə olunan funksiyalara tez keçid edin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/courses">
              <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Kursları Araşdır</h3>
                  <p className="text-gray-600">Mövcud kursları görün və qeydiyyatdan keçin</p>
                </CardContent>
              </Card>
            </Link>

            <Link href={getDashboardLink()}>
              <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">İdarə Paneli</h3>
                  <p className="text-gray-600">Ətraflı statistika və idarəetmə alətləri</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog">
              <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Texnoloji Bloq</h3>
                  <p className="text-gray-600">Ən son texnoloji yeniliklər və məqalələr</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/verify">
              <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sertifikat Yoxla</h3>
                  <p className="text-gray-600">Sertifikatların həqiqiliyini təsdiq edin</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl">
              <Zap className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-orange-500">Proqramlaşdırma</span> gələcəyinizi qurun
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Hər gün yeni şeylər öyrənin, praktik layihələr üzərində işləyin və peşəkar inkişafınızı davam etdirin.
            </p>
            <div className="pt-6">
              <Link href="/courses">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-blue-500 text-white hover:from-orange-600 hover:to-blue-600 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-xl transition-all duration-300">
                  <Play className="w-6 h-6 mr-3" />
                  İndi Başla
                  <ArrowRight className="w-5 h-5 ml-3" />
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
