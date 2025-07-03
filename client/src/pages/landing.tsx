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
      <section className="relative bg-white overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-devcode-orange/20 to-devcode-yellow/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-devcode-yellow/20 to-devcode-orange/20 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-devcode-orange/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-devcode-yellow/10 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-devcode-orange to-devcode-yellow px-6 py-3 rounded-full shadow-lg animate-fade-in">
                <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
                <span className="text-white font-semibold">Yeni Nəsil Təhsil Platforması</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
                <span className="bg-gradient-to-r from-devcode-orange to-devcode-yellow bg-clip-text text-transparent">
                  DEVCODE
                </span>
                <br />
                <span className="text-4xl lg:text-5xl text-gray-600 font-light">
                  Learning Management
                </span>
                <br />
                <span className="text-4xl lg:text-5xl text-gray-600 font-light">
                  System
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed animate-fade-in delay-300">
                Azərbaycanda ən müasir və texnoloji cəhətdən təkmil öyrənmə idarəetmə sistemi. 
                Proqramlaşdırma sahəsində peşəkar karyeranızı qurmaq üçün bütün vasitələr bir yerdə.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-500">
                <Link href="/courses">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white hover:shadow-2xl font-bold text-lg px-10 py-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <BookOpen className="w-6 h-6 mr-3" />
                    Platformaya Başla
                    <ArrowRight className="w-5 h-5 ml-3 animate-bounce-x" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-300 text-gray-700 hover:border-devcode-orange hover:text-devcode-orange font-bold text-lg px-10 py-6 rounded-2xl transition-all duration-500 transform hover:scale-105"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Demo Videosu
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in delay-700">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-devcode-orange to-devcode-yellow bg-clip-text text-transparent">
                    1000+
                  </div>
                  <div className="text-sm text-gray-500">Məzun</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-devcode-orange to-devcode-yellow bg-clip-text text-transparent">
                    95%
                  </div>
                  <div className="text-sm text-gray-500">İş Təminatı</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-devcode-orange to-devcode-yellow bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-gray-500">Dəstək</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative animate-float-delayed">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">DEVCODE LMS</div>
                </div>
                
                {/* Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                    <div className="bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white px-3 py-1 rounded-full text-sm font-semibold">
                      85%
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-28"></div>
                    </div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      92%
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-20"></div>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Tamamlandı
                    </div>
                  </div>
                </div>
                
                {/* Next Assignment */}
                <div className="mt-6 p-4 bg-gradient-to-r from-devcode-orange/10 to-devcode-yellow/10 rounded-xl border border-devcode-orange/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-devcode-orange" />
                    <span className="text-sm font-semibold text-devcode-orange">Növbəti Tapşırıq</span>
                  </div>
                  <div className="text-sm text-gray-600">React Components & Props</div>
                  <div className="text-xs text-gray-500 mt-1">Son tarix: 3 gün qalıb</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-devcode-yellow to-devcode-orange rounded-full animate-pulse"></div>
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

      {/* LMS Platform Features - Expanded */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-devcode-orange to-devcode-yellow bg-clip-text text-transparent">DEVCODE LMS</span> Platforması
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Azərbaycanda ən təkmil öyrənmə idarəetmə sistemi. Müəllimlər və tələbələr üçün tam inteqrasiya edilmiş, 
              müasir texnologiyalarla qurulmuş güclü platforma.
            </p>
          </div>
          
          {/* Teacher Panel Features */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                <span className="text-devcode-orange">Müəllim Paneli</span> - Tam İdarəetmə
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Kursların yaradılmasından tələbələrin qiymətləndirilməsinə qədər bütün təhsil prosesini idarə edin
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Kurs İdarəetməsi</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Dərs planlaması və məzmun yaradılması
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Video dərslər və materiallar
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Kurs strukturunun təşkili
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Tərəqqi izləmə və hesabatlar
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Tapşırıq Sistemi</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Tapşırıq yaradılması və paylaşılması
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Avtomatik və manual qiymətləndirmə
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Müddət izləmə və xatırlatmalar
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Detallı geri bildirim sistemi
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Tələbə İdarəetməsi</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Tələbə qeydiyyatı və qruplar
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Individual tərəqqi analizi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Davamiyyət izləmə
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Performans hesabatları
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Student & System Features */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Features List */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Vaxt Analitika</h3>
                  <p className="text-gray-600">
                    Canlı performans izləmə, detallı hesabatlar və tərəqqi analizi. 
                    Hər tələbənin güclü və zəif tərəflərini müəyyən edin.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Canlı Dərs Sistemi</h3>
                  <p className="text-gray-600">
                    İnteqrasiya edilmiş video konferens, ekran paylaşımı və interaktiv 
                    whiteboard ilə real vaxt təhsil təcrübəsi.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sertifikat Sistemi</h3>
                  <p className="text-gray-600">
                    Avtomatik sertifikat generasiyası, blockchain təsdiqləməsi və 
                    beynəlxalq tanınan diplomlar.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Çoxdilli Dəstək</h3>
                  <p className="text-gray-600">
                    Azərbaycan, türk və ingilis dillərində tam interfeys və 
                    məzmun dəstəyi ilə qlobal əlçatanlıq.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right - Enhanced Platform Preview */}
            <div className="relative">
              {/* Main Dashboard */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="text-sm text-gray-500 font-medium">DEVCODE LMS</div>
                  </div>
                </div>
                
                {/* Teacher Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm mb-1">React Fundamentals</div>
                      <div className="text-xs text-gray-600">25 tələbə • 12 dərs • 89% tamamlama</div>
                    </div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Aktiv
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm mb-1">JavaScript ES6+ Tapşırıqları</div>
                      <div className="text-xs text-gray-600">18 təslim edilib • 7 gözləyir</div>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Yeni
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm mb-1">Canlı Dərs</div>
                      <div className="text-xs text-gray-600">Bugün 14:00 • Node.js Backend</div>
                    </div>
                    <div className="bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Planlanıb
                    </div>
                  </div>
                </div>
                
                {/* Stats Section */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-devcode-orange">156</div>
                    <div className="text-xs text-gray-600">Tələbələr</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-green-500">98%</div>
                    <div className="text-xs text-gray-600">Məmnuniyyət</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-blue-500">24</div>
                    <div className="text-xs text-gray-600">Kurslar</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Notification */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100 animate-bounce-slow">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">5 yeni təslim</span>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl shadow-lg p-3 text-white animate-float">
                <div className="text-center">
                  <div className="text-lg font-bold">4.9⭐</div>
                  <div className="text-xs opacity-90">Müəllim Reytinqi</div>
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