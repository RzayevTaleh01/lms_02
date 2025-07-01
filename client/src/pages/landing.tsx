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
  Shield,
  MapPin,
  Clock,
  Briefcase
} from "lucide-react";

export default function Landing() {
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
    select: (data: any[]) => data.slice(0, 3), // Show only first 3 courses
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section - Modern DevCode Style */}
      <section className="relative bg-gradient-to-br from-gray-900 via-orange-900 to-yellow-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-400/15 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <img 
                src="/assets/devcode_1751391029827.png" 
                alt="DevCode Academy" 
                className="w-16 h-16"
              />
              <div className="text-left">
                <h1 className="text-4xl lg:text-5xl font-bold">DevCode Academy</h1>
                <p className="text-orange-200 text-lg">Proqramlaşdırma Təhsil Akademiyası</p>
              </div>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-3xl lg:text-6xl font-bold leading-tight mb-8 max-w-5xl mx-auto">
              <span className="text-yellow-300">Rəqəmsal Karyeranıza</span>
              <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
                Bugündən Başlayın
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-xl lg:text-2xl text-orange-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              DevCode Academy ilə proqramlaşdırma dünyasına addım atın. 
              <strong className="text-yellow-200">0-dan Profesional səviyyəyə</strong> qədər yolculuğunuzu bizimlə keçin və 
              <strong className="text-orange-200">iş təminatı ilə karyeranıza başlayın</strong>.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/courses">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 text-xl font-bold rounded-xl shadow-2xl shadow-orange-500/25 transform hover:scale-105 transition-all">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Kurslara Başla
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-900 px-10 py-4 text-xl backdrop-blur-sm rounded-xl">
                <Play className="w-6 h-6 mr-3" />
                Demo İzlə
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-400 mb-2">500+</div>
                <div className="text-blue-200">Məzun Tələbə</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-blue-200">İş Təminatı</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">25+</div>
                <div className="text-blue-200">Ekspert Müəllim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">300+</div>
                <div className="text-blue-200">Aktiv Tələbə</div>
              </div>
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

      {/* DevCode Learning Platform */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                DevCode LMS Sistemi
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Müasir təhsil idarəetmə sistemi ilə proqramlaşdırmada peşəkar səviyyəyə çatın. 
              Bütün təhsil prosesi bir platformada - dərslər, tapşırıqlar, qiymətləndirmə və sertifikatlaşdırma.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Student Dashboard */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tələbə Paneli</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>HD Video Dərslər</strong> - Peşəkar çəkilmiş dərslər və praktiki nümunələr</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Real-time İrəliləyiş</strong> - Hər dərsin tamamlanma faizi və ümumi proqres</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Tapşırıq Sistemi</strong> - Mərhələli tapşırıqlar və avtomatik qiymətləndirmə</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Sertifikat Alması</strong> - Kurs tamamlandıqda avtomatik sertifikat yaradılması</span>
                </li>
              </ul>
            </div>

            {/* Teacher Dashboard */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Müəllim Paneli</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Kurs İdarəetməsi</strong> - Tam kurs yaradılması, dərs planlaması və material yükləmə</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Tələbə İzləmə</strong> - Hər tələbənin proqresi və performansının detallı analizi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Tapşırıq Qiymətləndirilməsi</strong> - Avtomatik və manual qiymətləndirmə sistemi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Kommunikasiya Alətləri</strong> - Tələbələrlə ünsiyyət və feedback sistemi</span>
                </li>
              </ul>
            </div>

            {/* Admin Control Panel */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Paneli</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Sistem İdarəetməsi</strong> - Bütün platformanın tam nəzarəti və idarəedilməsi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>İstifadəçi Rolu</strong> - Admin, müəllim və tələbə rollarının təyin edilməsi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Analytics Dashboard</strong> - Real-time statistikalar və performans analizi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Sertifikat Sistemi</strong> - Avtomatik sertifikat yaratma və doğrulama</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Platform Features */}
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Güclü Təhsil Platforması</h3>
              <p className="text-xl text-orange-100">Müəllimlər və tələbələr üçün tam idarəetmə sistemi</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Kurs Sistemi</h4>
                <p className="text-sm text-orange-100">Video dərslər, materiallar və tapşırıqlar</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Proqres İzləmə</h4>
                <p className="text-sm text-orange-100">Real vaxt performans və irəliləyiş</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Tələbə Paneli</h4>
                <p className="text-sm text-orange-100">Şəxsi hesab və kurs materialları</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Sertifikatlaşdırma</h4>
                <p className="text-sm text-orange-100">Rəsmi sertifikat və doğrulama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose DevCode */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nə üçün DevCode Academy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Azərbaycanda ən müasir texnologiyalar və innovativ təlim metodları ilə rəqəmsal təhsilin lideri
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sertifikatlaşdırma</h3>
              <p className="text-gray-600 leading-relaxed">
                Beynəlxalq standartlara uyğun sertifikatlar və məzuniyyət diplomları. 
                Həqiqi iş bazarında keçərli olan bilik və bacarıqlar.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Peşəkar Komanda</h3>
              <p className="text-gray-600 leading-relaxed">
                15+ il təcrübəli müəllimlər, industry ekspertləri və real layihə təcrübəsi olan 
                proqramçılar tərəfindən hazırlanmış kurrikulum.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">İş Təminatı</h3>
              <p className="text-gray-600 leading-relaxed">
                Kursları uğurla bitirən tələbələr üçün iş təminatı və karyera inkişafı dəstəyi. 
                300+ əməkdaşlıq müqaviləsi olan şirkətlər.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Populyar Kurslarımız</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İndustry standartlarına uyğun, praktiki və real layihə əsaslı kurslar
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.length > 0 ? (
              courses.map((course: any) => (
                <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                        Aktiv
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {course.description || "Bu kurs proqramlaşdırma sahəsində bilik və bacarıqlarınızı inkişaf etdirmək üçün nəzərdə tutulub."}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>25 tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>12 həftə</span>
                        </div>
                      </div>
                      <Link href={`/course-detail/${course.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Ətraflı
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {/* Placeholder courses for demo */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                        Aktiv
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.9</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">Full-Stack JavaScript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      React, Node.js və MongoDB istifadə edərək müasir web aplikasiyaları yaratmağı öyrənin.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>32 tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>16 həftə</span>
                        </div>
                      </div>
                      <Link href="/courses">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Ətraflı
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Populyar
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">Python & Data Science</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Python ilə data analysis, machine learning və AI üzrə hərtərəfli təhsil.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>28 tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>14 həftə</span>
                        </div>
                      </div>
                      <Link href="/courses">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Ətraflı
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Yeni
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.7</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">Mobile App Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      React Native ilə iOS və Android üçün native mobile aplikasiyalar yaradın.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>18 tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>12 həftə</span>
                        </div>
                      </div>
                      <Link href="/courses">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Ətraflı
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          
          <div className="text-center">
            <Link href="/courses">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white px-8 py-3 text-lg">
                Bütün Kursları Gör
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Rəqəmsal Karyeranıza Bugündən Başlayın
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              DevCode Academy ailəsinə qoşulun və proqramlaşdırma sahəsində uğurlu karyera qurun. 
              Ekspert müəllimlərlə bilikli, praktiki və real iş təcrübəsi əldə edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Kursa Qeydiyyat
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Əlaqə
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