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
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-blue-100 text-blue-900 hover:bg-blue-200">
                🚀 Yeni Nəsil Təhsil Platforması
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                DevCode Academy
                <span className="block text-blue-200 text-3xl lg:text-4xl mt-2">
                  Gələcəyin Proqramçıları Burada Yetişir
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                Azərbaycanda ən müasir proqramlaşdırma təhsili. Peşəkar müəllimlərdən 
                real layihələr üzərində öyrənin və karyeranızı yeni səviyyəyə qaldırın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/courses">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Kurslara Bax
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Demo İzlə
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-200">1,500+ Aktiv Tələbə</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-200">25+ Ekspert Müəllim</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-200">30+ Proqramlaşdırma Kursu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-orange-200">95% Uğur Nisbəti</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
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
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-900">
              🎯 İdarəetmə Sistemi
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              DevCode Kurs İdarəetmə Sistemi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tələbə, müəllim və administratorlar üçün tam inteqrasiya olunmuş 
              təhsil idarəetmə platforması.
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
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    <span className="font-semibold">Müəllim Paneli</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Aktiv Tələbələr</span>
                      <span className="text-2xl font-bold text-green-600">42</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Yeni Tapşırıqlar</span>
                      <span className="text-2xl font-bold text-blue-600">8</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium">Proqres Orta</span>
                      <span className="text-2xl font-bold text-orange-600">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Tələbə Paneli</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">JavaScript Fundamentals</span>
                      <span className="ml-auto text-xs text-green-600 font-medium">100%</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-5 h-5 rounded-full bg-blue-200 border-2 border-blue-500"></div>
                      <span className="text-sm">React Development</span>
                      <span className="ml-auto text-xs text-blue-600 font-medium">65%</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-gray-300"></div>
                      <span className="text-sm">Node.js Backend</span>
                      <span className="ml-auto text-xs text-gray-500 font-medium">0%</span>
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
