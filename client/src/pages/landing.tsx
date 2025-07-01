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
  Monitor, 
  Calendar, 
  FileText, 
  BarChart3,
  CheckCircle,
  Play,
  ArrowRight,
  Star,
  Globe,
  Zap,
  Shield
} from "lucide-react";

export default function Landing() {
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
    select: (data: any[]) => data.slice(0, 3), // Show only first 3 courses
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          
          {/* Digital Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-white/20"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                <img 
                  src="/assets/devcode_1751389375943.png" 
                  alt="DevCode Academy" 
                  className="w-12 h-12"
                />
                <Badge className="bg-orange-500/20 text-orange-200 border-orange-400/30">
                  🚀 Rəqəmsal Akademiya
                </Badge>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  DevCode
                </span>
                <br />
                <span className="text-3xl lg:text-4xl text-blue-200 font-normal">
                  Hibrid Proqramlaşdırma Akademiyası
                </span>
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Monitor className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">Online Dərslər</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Offline Sinif</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <BarChart3 className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Rəqəmsal İdarəetmə</span>
                </div>
              </div>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                Azərbaycanda ən müasir <strong className="text-orange-300">hibrid təhsil platforması</strong>. 
                Həm online həm offline dərslər, AI dəstəkli rəqəmsal idarəetmə sistemi və 
                real layihələr üzərində praktik təcrübə.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/courses">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg shadow-2xl shadow-orange-500/25">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Kurslara Qoşul
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Canlı Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              {/* Digital Management System Showcase */}
              <div className="relative z-10 space-y-6">
                {/* Main Dashboard Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-white">Rəqəmsal İdarəetmə Paneli</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/30">
                      <div className="text-green-300 text-sm">Aktiv Tələbələr</div>
                      <div className="text-2xl font-bold text-white">1,247</div>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/30">
                      <div className="text-blue-300 text-sm">Online Siniflər</div>
                      <div className="text-2xl font-bold text-white">18</div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-500/20 rounded-lg p-3 border border-orange-400/30">
                    <div className="text-orange-300 text-sm">Hibrid Proqres</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full w-4/5"></div>
                      </div>
                      <span className="text-white font-bold">87%</span>
                    </div>
                  </div>
                </div>
                
                {/* Learning Modes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-blue-400/30">
                    <Monitor className="w-8 h-8 text-blue-400 mb-2" />
                    <div className="text-blue-300 text-sm">Online Dərslər</div>
                    <div className="text-white font-semibold">24/7 Əlçatan</div>
                  </div>
                  <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-4 border border-purple-400/30">
                    <Users className="w-8 h-8 text-purple-400 mb-2" />
                    <div className="text-purple-300 text-sm">Offline Sinif</div>
                    <div className="text-white font-semibold">Canlı Təcrübə</div>
                  </div>
                </div>
                
                {/* Achievement Badges */}
                <div className="flex justify-center gap-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-700"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute top-1/2 -right-12 w-6 h-6 bg-purple-400 rounded-full opacity-40 animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About DevCode Academy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">DevCode Academy Haqqında</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Azərbaycanda proqramlaşdırma sahəsində liderlik edən təhsil institutuyuq. 
              Müasir texnologiyalarla dünya standartlarında təhsil təqdim edirik.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Beynəlxalq Standartlar</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Dünya səviyyəsində kurikulum və müasir təhsil metodları ilə 
                  tələbələrimizi qlobal rəqabətə hazırlayırıq.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Ekspert Komanda</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  20+ il təcrübəsi olan senior developerlər və beynəlxalq 
                  şirkətlərdə çalışmış mütəxəssislər komandamızda.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Sertifikatlaşdırma</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Kursları uğurla bitirən tələbələr beynəlxalq səviyyədə 
                  tanınan sertifikatlar əldə edirlər.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Management System Features */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img 
                src="/assets/devcode_1751389375943.png" 
                alt="DevCode Academy" 
                className="w-8 h-8"
              />
              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2">
                🚀 Rəqəmsal İdarəetmə Sistemi
              </Badge>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              DevCode Hibrid LMS Platforması
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Həm <strong className="text-orange-600">online</strong> həm <strong className="text-blue-600">offline</strong> təhsil üçün 
              AI dəstəkli, tam avtomatlaşdırılmış rəqəmsal idarəetmə sistemi. 
              Tələbə, müəllim və administratorlar üçün vahid platform.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Müəllimlər üçün Güçlü Alətlər
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Kurs Yaratma və İdarəetmə</h4>
                    <p className="text-gray-600">
                      Interaktiv video dərslər, tapşırıqlar və materiallarla tam kurs strukturu yaradın.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Tələbə Proqresi İzləmə</h4>
                    <p className="text-gray-600">
                      Hər tələbənin fərdi proqresini və performansını real vaxtda izləyin.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Avtomatik Qiymətləndirmə</h4>
                    <p className="text-gray-600">
                      Tapşırıqları qiymətləndirin, feedback verin və nəticələri avtomatik hesablayın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-lg">Müəllim Paneli</span>
                      <div className="text-orange-100 text-sm">Hibrid İdarəetmə</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-gradient-to-br from-white to-orange-50">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border-l-4 border-green-500">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Online + Offline Tələbələr</span>
                        <div className="text-xs text-green-600 mt-1">🟢 Aktiv</div>
                      </div>
                      <span className="text-3xl font-bold text-green-600">42</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Rəqəmsal Tapşırıqlar</span>
                        <div className="text-xs text-blue-600 mt-1">📋 Yeni</div>
                      </div>
                      <span className="text-3xl font-bold text-blue-600">8</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border-l-4 border-orange-500">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Hibrid Proqres</span>
                        <div className="text-xs text-orange-600 mt-1">📊 AI Analiz</div>
                      </div>
                      <span className="text-3xl font-bold text-orange-600">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-lg">Tələbə Paneli</span>
                      <div className="text-blue-100 text-sm">Hibrid Öyrənmə</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-gradient-to-br from-white to-blue-50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border-l-4 border-green-500">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">JavaScript + Offline Labs</span>
                        <div className="text-xs text-green-600 mt-1">Online + Offline tamamlandı</div>
                      </div>
                      <span className="text-lg font-bold text-green-600">100%</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border-l-4 border-orange-500">
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium">React + Hibrid Praktika</span>
                        <div className="text-xs text-orange-600 mt-1">Canlı sinif + Online modullar</div>
                      </div>
                      <span className="text-lg font-bold text-orange-600">73%</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border-l-4 border-gray-300">
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-gray-400"></div>
                      <div className="flex-1">
                        <span className="text-sm font-medium">FullStack + Final Layihə</span>
                        <div className="text-xs text-gray-500 mt-1">Rəqəmsal takip sistemi ilə</div>
                      </div>
                      <span className="text-lg font-bold text-gray-500">0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Tələbələr üçün Optimal Təcrübə
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">İnteraktiv Video Dərslər</h4>
                    <p className="text-gray-600">
                      HD keyfiyyətdə video dərslər, kod nümunələri və praktik tapşırıqlar.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Proqres İzləmə</h4>
                    <p className="text-gray-600">
                      Şəxsi proqresinizi izləyin və hədəflərinizə çatmaq üçün planlaşdırın.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Elastik Cədvəl</h4>
                    <p className="text-gray-600">
                      İstədiyiniz vaxt və tempodə öyrənin, həftənin 7 günü əlçatan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Rəqəmlərlə DevCode</h2>
            <p className="text-xl text-gray-600">
              Uğur hekayələrimiz rəqəmlərdə əks olunur
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1,500+</div>
              <div className="text-gray-600 font-medium">Məzun Tələbə</div>
              <div className="text-sm text-gray-500 mt-1">Son 3 ildə</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">30+</div>
              <div className="text-gray-600 font-medium">Proqramlaşdırma Kursu</div>
              <div className="text-sm text-gray-500 mt-1">Müxtəlif səviyyələrdə</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">Tələbə Qiymətləndirməsi</div>
              <div className="text-sm text-gray-500 mt-1">5000+ rəy əsasında</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600 font-medium">İş Tapma Nisbəti</div>
              <div className="text-sm text-gray-500 mt-1">Məzuniyyətdən sonra 6 ay</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-900">
              🎓 Populyar Kurslar
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ən Sevilən Kurslarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sənaye ekspertləri tərəfindən hazırlanmış, real layihələrlə dolu kurslarımızla 
              proqramlaşdırma səyahətinizə başlayın.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.length > 0 ? (
              courses.map((course: any) => (
                <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                        {course.level || 'Başlanğıc'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>120+ tələbə</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span>8 həftə</span>
                      </div>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        Kursa Bax
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Placeholder courses when no data
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                        Başlanğıc
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {index === 0 && "JavaScript Fundamentals"}
                      {index === 1 && "React Development"}
                      {index === 2 && "Full-Stack Web Development"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {index === 0 && "JavaScript proqramlaşdırma dilinin əsaslarını öyrənin və müasir web development-ə giriş edin."}
                      {index === 1 && "React kitabxanası ilə interaktiv web tətbiqləri hazırlamağı öyrənin."}
                      {index === 2 && "Frontend və backend texnologiyaları ilə tam funksional web tətbiqləri yaradın."}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>120+ tələbə</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span>8 həftə</span>
                      </div>
                    </div>
                    <Link href="/courses">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        Kursa Bax
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center">
            <Link href="/courses">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3">
                Bütün Kurslara Bax
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose DevCode */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nəyə görə DevCode Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Müasir təhsil metodları və innovativ yanaşma ilə fərqlənən 
              üstünlüklərimizi kəşf edin.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Praktik Yanaşma</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  70% praktik, 30% nəzəri. Real layihələr üzərində işləyərək 
                  öyrənin və portfolio yaradın.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Kiçik Qruplar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Maksimum 15 nəfərlik qruplarla hər tələbəyə fərdi diqqət 
                  və optimal öyrənmə mühiti.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Karyera Dəstəyi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  CV hazırlama, müsahibə hazırlığı və iş yerləri ilə əlaqə 
                  qurma dəstəyi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
