import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, 
  Users,
  Award, 
  TrendingUp,
  Target, 
  Monitor, 
  Calendar, 
  FileText, 
  BarChart3,
  CheckCircle,
  Play,
  Code,
  Smartphone,
  ArrowRight,
  Star,
  Globe,
  Zap,
  Shield,
  MapPin,
  Clock,
  GraduationCap,
  PenTool,
  Database,
  Layers,
  Cpu,
  Palette,
  Video,
  MessageCircle,
  ChevronRight,
  MousePointer,
  Sparkles
} from "lucide-react";

export default function Landing() {
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
    select: (data: any[]) => data.slice(0, 4), // Show first 4 courses
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-devcode-orange via-devcode-yellow to-orange-400 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-lg"></div>
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <Code className="w-12 h-12 text-devcode-orange" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">DEVCODE</span>
              <span className="block text-3xl lg:text-4xl font-light text-orange-100">
                Learning Management System
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Proqramlaşdırma təhsilində yeni dövr. Müasir texnologiyalarla dolu, 
              interaktiv öyrənmə təcrübəsi ilə gələcəyinizi qurun.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/courses">
                <Button 
                  size="lg" 
                  className="bg-white text-devcode-orange hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <BookOpen className="w-6 h-6 mr-3" />
                  Kursları Keşfet
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-devcode-orange font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-6 h-6 mr-3" />
                Demo İzlə
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-orange-100">Aktiv Tələbə</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-orange-100">Peşəkar Kurs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-orange-100">Məzun Məmnuniyyəti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Niyə <span className="text-devcode-orange">DEVCODE LMS</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Müasir təhsil idarəetmə sistemi ilə öyrənmə prosesini tamamilə yenidən təşkil edin
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Interactive Learning */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-center group-hover:text-devcode-orange transition-colors">
                  İnteraktiv Dərslər
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center">
                <p className="text-gray-600">
                  Video dərslər, canlı kodlaşdırma seansları və real layihələrlə praktik təcrübə
                </p>
              </CardContent>
            </Card>
            
            {/* Progress Tracking */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-center group-hover:text-devcode-orange transition-colors">
                  Tərəqqi İzləmə
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center">
                <p className="text-gray-600">
                  Detallı analitika və tərəqqi hesabatları ilə öyrənmə səviyyənizi izləyin
                </p>
              </CardContent>
            </Card>
            
            {/* Certification */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-center group-hover:text-devcode-orange transition-colors">
                  Sertifikatlaşdırma
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center">
                <p className="text-gray-600">
                  Beynəlxalq standartlarda tanınan sertifikatlar əldə edin
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Populyar <span className="text-devcode-orange">Kurslar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İndustrial standartlarda hazırlanmış kurs proqramları ilə peşəkar inkişafınızı davam etdirin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend Development */}
            <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="relative z-10 text-white text-center">
                  <Code className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-sm font-medium">Frontend</div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-devcode-orange transition-colors">
                  Frontend Development
                </CardTitle>
                <p className="text-sm text-gray-600">
                  React, Vue.js, Angular və müasir frontend texnologiyaları
                </p>
              </CardHeader>
            </Card>
            
            {/* Backend Development */}
            <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="relative z-10 text-white text-center">
                  <Database className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-sm font-medium">Backend</div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-devcode-orange transition-colors">
                  Backend Development
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Node.js, Python, Java və server-side texnologiyalar
                </p>
              </CardHeader>
            </Card>
            
            {/* Mobile Development */}
            <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="relative z-10 text-white text-center">
                  <Smartphone className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-sm font-medium">Mobile</div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-devcode-orange transition-colors">
                  Mobile Development
                </CardTitle>
                <p className="text-sm text-gray-600">
                  React Native, Flutter və native app development
                </p>
              </CardHeader>
            </Card>
            
            {/* UI/UX Design */}
            <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-devcode-orange to-devcode-yellow flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="relative z-10 text-white text-center">
                  <Palette className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-sm font-medium">Design</div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-devcode-orange transition-colors">
                  UI/UX Design
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Figma, Adobe XD və müasir dizayn prinsipləri
                </p>
              </CardHeader>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white hover:from-devcode-orange-light hover:to-devcode-yellow-light font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Bütün Kursları Gör
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LMS Platform Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-devcode-orange">DEVCODE LMS</span> Platforması
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Müasir texnologiyalarla qurulmuş, istifadəçi dostu təhsil idarəetmə sistemi
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Features List */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tələbə İdarəetməsi</h3>
                  <p className="text-gray-600">
                    Detallı tələbə profilləri, qruplar və individual tərəqqi izləmə
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tapşırıq Sistemi</h3>
                  <p className="text-gray-600">
                    Avtomatik qiymətləndirmə, müddət izləmə və detallı geri bildirim
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dərs Cədvəli</h3>
                  <p className="text-gray-600">
                    Canlı dərslər, görüşlər və hadisələr üçün inteqrasiya edilmiş təqvim
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Kommunikasiya</h3>
                  <p className="text-gray-600">
                    Forum, mesajlaşma və real vaxt dəstəyi ilə güçlü əlaqə
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right - Platform Preview */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">DEVCODE LMS</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-devcode-orange rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                    <div className="text-devcode-orange">85%</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-devcode-yellow rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-32"></div>
                    </div>
                    <div className="text-devcode-yellow">92%</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-28"></div>
                    </div>
                    <div className="text-devcode-orange">78%</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-devcode-orange" />
                    <span className="text-sm font-semibold text-devcode-orange">Növbəti Tapşırıq</span>
                  </div>
                  <div className="text-sm text-gray-600">React Components yaratmaq</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Uğur <span className="text-devcode-orange">Hekayələri</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Məzunlarımızın peşəkar həyatlarında əldə etdiyi nailiyyətlər
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <CardTitle className="text-xl">Aysel Məmmədova</CardTitle>
                <p className="text-sm text-gray-600">Frontend Developer @ Microsoft</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "DEVCODE-da aldığım bilik və təcrübə sayəsində arzularımın şirkətində işləyirəm. 
                  Müəllimlər həqiqətən professional və dəstəkleyici idi."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <CardTitle className="text-xl">Rəşad Əliyev</CardTitle>
                <p className="text-sm text-gray-600">Full Stack Developer @ Google</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Praktik layihələr və real ssenarilərlə öyrənmək mənim üçün çox faydalı oldu. 
                  İndi böyük texnologiya şirkətində çalışıram."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <CardTitle className="text-xl">Leyla Qasımova</CardTitle>
                <p className="text-sm text-gray-600">UI/UX Designer @ Adobe</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Dizayn kursları mənim yaradıcı tələblərimə cavab verdi. 
                  İndi dünya çapında tanınan şirkətdə işləyirəm."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-devcode-orange to-devcode-yellow text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Gələcəyinizi İndi Qurmağa Başlayın
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            DEVCODE LMS platformasında proqramlaşdırma və texnologiya sahəsində 
            peşəkar karyeranızı qurmaq üçün ilk addımınızı atın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button 
                size="lg" 
                className="bg-white text-devcode-orange hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <GraduationCap className="w-6 h-6 mr-3" />
                Kurslara Başla
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-devcode-orange font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Bizimlə Əlaqə
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}