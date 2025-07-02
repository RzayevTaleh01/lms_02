import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import devcodeLogo from "@assets/devcode_1751464886804.png";
import { 
  BookOpen, 
  Users,
  Phone, 
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
  Briefcase,
  Laptop,
  Database,
  PenTool,
  Rocket,
  ChevronRight,
  GraduationCap,
  Trophy,
  Users2,
  BookMarked
} from "lucide-react";

export default function Landing() {
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
    select: (data: any[]) => data.slice(0, 3),
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-orange-100/20 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-devcode-orange/10 border border-devcode-orange/20 rounded-full">
                  <span className="text-sm font-medium text-devcode-orange-dark">Hər kəs üçün açıq</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-devcode-dark leading-tight">
                  Gələcəyə buradan 
                  <span className="bg-devcode-gradient bg-clip-text text-transparent block">
                    keç!
                  </span>
                </h1>
                <p className="text-xl text-devcode-gray leading-relaxed max-w-lg">
                  DevCode Academy gələcək innovasiyaları bu gündən duyub ona uyğun 
                  mütəxəssislər hazırlayan müasir təhsil platformasıdır.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-devcode-gradient hover:bg-devcode-orange-dark text-white px-8 py-4 text-lg font-semibold shadow-devcode">
                  <Rocket className="w-5 h-5 mr-2" />
                  Keçid et
                </Button>
                <Link href="/courses">
                  <Button variant="outline" size="lg" className="border-2 border-devcode-orange/20 text-devcode-dark hover:bg-devcode-orange/5 hover:border-devcode-orange px-8 py-4 text-lg font-semibold">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Kursları Gör
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-devcode-dark">500+</div>
                  <div className="text-sm text-devcode-gray">Tələbə</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-devcode-dark">50+</div>
                  <div className="text-sm text-devcode-gray">Kurs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-devcode-dark">95%</div>
                  <div className="text-sm text-devcode-gray">Məmnunluq</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-devcode-gradient rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-devcode-lg border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-6 bg-white/60 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-center w-14 h-14 bg-devcode-gradient rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Code className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-devcode-dark text-lg mb-1">Frontend</h3>
                    <p className="text-devcode-gray text-sm">React, Vue, Angular</p>
                  </Card>
                  
                  <Card className="p-6 bg-white/60 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Database className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-devcode-dark text-lg mb-1">Backend</h3>
                    <p className="text-devcode-gray text-sm">Node.js, Python, PHP</p>
                  </Card>
                  
                  <Card className="p-6 bg-white/60 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-center w-14 h-14 bg-purple-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-devcode-dark text-lg mb-1">Mobile</h3>
                    <p className="text-devcode-gray text-sm">React Native, Flutter</p>
                  </Card>
                  
                  <Card className="p-6 bg-white/60 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-devcode-dark text-lg mb-1">Data Science</h3>
                    <p className="text-devcode-gray text-sm">Python, SQL, AI/ML</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program sahələri Section */}
      <section className="py-20 bg-devcode-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-devcode-dark mb-6">
              Tədris <span className="text-devcode-orange">Proqramları</span>
            </h2>
            <p className="text-xl text-devcode-gray max-w-3xl mx-auto">
              Müxtəlif sahələrdə peşəkar bacarıqlar əldə edin və kariyeranızı növbəti səviyyəyə çatdırın
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group cursor-pointer hover:shadow-devcode-lg transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-devcode-gradient rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-devcode-dark mb-3">Frontend Development</h3>
                <p className="text-devcode-gray leading-relaxed">React, Vue, Angular və modern frontend texnologiyaları ilə istifadəçi interfeysi yaradın</p>
                <div className="mt-4 text-devcode-orange font-semibold flex items-center">
                  Daha çox <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-devcode-lg transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-devcode-dark mb-3">Backend Development</h3>
                <p className="text-devcode-gray leading-relaxed">Node.js, Python, PHP və verilənlər bazası idarəetməsi ilə server tərəf çözümləri</p>
                <div className="mt-4 text-devcode-orange font-semibold flex items-center">
                  Daha çox <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-devcode-lg transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-devcode-dark mb-3">Mobile Development</h3>
                <p className="text-devcode-gray leading-relaxed">React Native, Flutter ilə iOS və Android platformaları üçün app development</p>
                <div className="mt-4 text-devcode-orange font-semibold flex items-center">
                  Daha çox <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-devcode-lg transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-devcode-dark mb-3">Data Science & AI</h3>
                <p className="text-devcode-gray leading-relaxed">Python, Machine Learning, AI və Big Data texnologiyaları ilə data analizi</p>
                <div className="mt-4 text-devcode-orange font-semibold flex items-center">
                  Daha çox <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Niyə DevCode Academy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-devcode-dark mb-6">
              Niyə <span className="text-devcode-orange">DevCode Academy?</span>
            </h2>
            <p className="text-xl text-devcode-gray max-w-4xl mx-auto">
              Azərbaycanda proqramlaşdırma sahəsində liderlik edən təhsil platforması olaraq, 
              dünya standartlarında təhsil və praktiki təcrübə təqdim edirik.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-devcode-gradient rounded-full flex items-center justify-center mx-auto shadow-devcode group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-devcode-gradient rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold text-devcode-dark mb-4">Beynəlxalq Standartlar</h3>
              <p className="text-devcode-gray leading-relaxed">
                Dünya səviyyəsində kurikulum və müasir təhsil metodları ilə 
                tələbələrimizi qlobal rəqabətə hazırlayırıq. Silicon Valley və 
                Avropa standartlarına uyğun proqramlar.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users2 className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold text-devcode-dark mb-4">Ekspert Komanda</h3>
              <p className="text-devcode-gray leading-relaxed">
                10+ il təcrübəsi olan senior developerlər, Google, Microsoft, 
                Amazon kimi beynəlxalq şirkətlərdə çalışmış mütəxəssislər 
                komandamızda sizə mentorluq edirlər.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-4 bg-purple-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold text-devcode-dark mb-4">Sertifikatlaşdırma</h3>
              <p className="text-devcode-gray leading-relaxed">
                Kursları uğurla bitirən tələbələr beynəlxalq səviyyədə tanınan 
                sertifikatlar əldə edirlər. Portfolio layihələri və real iş 
                təcrübəsi ilə kariyeraya start verin.
              </p>
            </div>
          </div>
          
          {/* Success Stats */}
          <div className="mt-20 bg-devcode-gradient rounded-3xl p-12 text-center text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-white/80">Məzun Tələbə</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-white/80">İş Yerləşdirmə</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-white/80">Aktiv Kurs</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Dəstək Xidməti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DevCode Learning Platform */}
      <section className="py-20 bg-devcode-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-devcode-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-devcode-orange-light rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-devcode-dark mb-6">
              <span className="bg-devcode-gradient bg-clip-text text-transparent">
                DevCode LMS Sistemi
              </span>
            </h2>
            <p className="text-xl text-devcode-gray max-w-4xl mx-auto">
              Müasir təhsil idarəetmə sistemi ilə proqramlaşdırmada peşəkar səviyyəyə çatın. 
              Bütün təhsil prosesi bir platformada - dərslər, tapşırıqlar, qiymətləndirmə və sertifikatlaşdırma.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Student Dashboard */}
            <div className="bg-white rounded-3xl p-8 shadow-devcode-lg hover:shadow-devcode transition-all duration-300 border-0 hover:-translate-y-1">
              <div className="w-20 h-20 bg-devcode-gradient rounded-2xl flex items-center justify-center mb-6 shadow-devcode">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-devcode-dark mb-6">Tələbə Paneli</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-xl bg-devcode-light/50">
                  <div className="w-3 h-3 bg-devcode-orange rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">HD Video Dərslər</div>
                    <div className="text-devcode-gray text-sm">Peşəkar çəkilmiş dərslər və praktiki nümunələr</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-xl bg-devcode-light/50">
                  <div className="w-3 h-3 bg-devcode-orange rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">Real-time İrəliləyiş</div>
                    <div className="text-devcode-gray text-sm">Hər dərsin tamamlanma faizi və ümumi proqres</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-xl bg-devcode-light/50">
                  <div className="w-3 h-3 bg-devcode-orange rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">İnteraktiv Tapşırıqlar</div>
                    <div className="text-devcode-gray text-sm">Mərhələli tapşırıqlar və avtomatik qiymətləndirmə</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-xl bg-devcode-light/50">
                  <div className="w-3 h-3 bg-devcode-orange rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">Sertifikatlaşdırma</div>
                    <div className="text-devcode-gray text-sm">Kurs tamamlandıqda avtomatik sertifikat yaradılması</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Dashboard */}
            <div className="bg-white rounded-3xl p-8 shadow-devcode-lg hover:shadow-devcode transition-all duration-300 border-0 hover:-translate-y-1">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <BookMarked className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-devcode-dark mb-6">Müəllim Paneli</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-xl bg-blue-50">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">Kurs İdarəetməsi</div>
                    <div className="text-devcode-gray text-sm">Tam kurs yaradılması, dərs planlaması və material yükləmə</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-xl bg-blue-50">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">Tələbə İzləmə</div>
                    <div className="text-devcode-gray text-sm">Hər tələbənin proqresi və performansının detallı analizi</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-xl bg-blue-50">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">Qiymətləndirmə Sistemi</div>
                    <div className="text-devcode-gray text-sm">Avtomatik və manual qiymətləndirmə alətləri</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-xl bg-blue-50">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-devcode-dark">Kommunikasiya</div>
                    <div className="text-devcode-gray text-sm">Tələbələrlə ünsiyyət və feedback sistemi</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics & Progress Dashboard */}
            <div className="bg-white rounded-3xl p-8 shadow-devcode-lg hover:shadow-devcode transition-all duration-300 border-0 hover:-translate-y-1">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-devcode-dark mb-6">Vizual Analitika</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-green-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-devcode-dark flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        React & JavaScript
                      </span>
                      <span className="text-sm text-green-600 font-bold">85%</span>
                    </div>
                    <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full animate-float" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-blue-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-devcode-dark flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        Node.js Backend
                      </span>
                      <span className="text-sm text-blue-600 font-bold">72%</span>
                    </div>
                    <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full animate-float" style={{width: '72%', animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-purple-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-devcode-dark flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                        Database Design
                      </span>
                      <span className="text-sm text-purple-600 font-bold">90%</span>
                    </div>
                    <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full animate-float" style={{width: '90%', animationDelay: '1s'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-devcode-light/50 rounded-xl p-4">
                  <div className="flex items-end justify-between h-16 gap-2">
                    <div className="bg-devcode-orange rounded animate-bounce" style={{height: '60%', width: '12px', animationDelay: '0s'}}></div>
                    <div className="bg-blue-500 rounded animate-bounce" style={{height: '80%', width: '12px', animationDelay: '0.2s'}}></div>
                    <div className="bg-green-500 rounded animate-bounce" style={{height: '45%', width: '12px', animationDelay: '0.4s'}}></div>
                    <div className="bg-purple-500 rounded animate-bounce" style={{height: '70%', width: '12px', animationDelay: '0.6s'}}></div>
                    <div className="bg-devcode-orange-light rounded animate-bounce" style={{height: '90%', width: '12px', animationDelay: '0.8s'}}></div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <span className="text-xs text-devcode-gray font-medium">Real-time Performans</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-4 bg-devcode-gradient rounded-xl text-white">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span className="font-bold">Ümumi İrəliləyiş: 82%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Özellikleri */}
          <div className="bg-devcode-gradient rounded-3xl p-12 text-white shadow-devcode-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">Güclü Təhsil Platforması</h3>
              <p className="text-xl text-white/80">Müəllimlər və tələbələr üçün tam idarəetmə sistemi</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2">Kurs Sistemi</h4>
                <p className="text-white/80">HD video dərslər, materiallar və interaktiv tapşırıqlar</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2">Proqres İzləmə</h4>
                <p className="text-white/80">Real vaxt performans analizi və vizual statistikalar</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <Users2 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2">Komanda İşi</h4>
                <p className="text-white/80">Collaborative öyrənmə və qrup layihələri</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2">Sertifikatlaşdırma</h4>
                <p className="text-white/80">Beynəlxalq səviyyədə tanınan rəsmi sertifikatlar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aktiv Kurslar Bölməsi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-devcode-dark mb-6">
              Populyar <span className="text-devcode-orange">Kurslarımız</span>
            </h2>
            <p className="text-xl text-devcode-gray max-w-4xl mx-auto">
              İndustry standartlarına uyğun, praktiki və real layihə əsaslı təhsil proqramları
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.length > 0 ? (
              courses.map((course: any) => (
                <Card key={course.id} className="border-0 shadow-devcode hover:shadow-devcode-lg transition-all duration-300 hover:-translate-y-2 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-devcode-orange/10 text-devcode-orange border-devcode-orange/20 hover:bg-devcode-orange/20">
                        Aktiv
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-devcode-gray font-medium">4.9</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-devcode-dark leading-tight">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-devcode-gray mb-6 line-clamp-3">
                      {course.description || "Bu kurs proqramlaşdırma sahəsində bilik və bacarıqlarınızı inkişaf etdirmək üçün nəzərdə tutulub."}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-devcode-gray">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>25+ tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>12 həftə</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/courses">
                      <Button className="w-full bg-devcode-gradient hover:bg-devcode-orange-dark text-white font-semibold shadow-devcode">
                        Kursa Qoşul
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Placeholder courses if no data
              [1, 2, 3].map((i) => (
                <Card key={i} className="border-0 shadow-devcode hover:shadow-devcode-lg transition-all duration-300 hover:-translate-y-2 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-devcode-orange/10 text-devcode-orange border-devcode-orange/20">
                        Yeni
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-devcode-gray font-medium">4.9</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-devcode-dark">
                      {i === 1 && "FullStack Proqramlaşdırma"}
                      {i === 2 && "Mobile App Development"}
                      {i === 3 && "Data Science & AI"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-devcode-gray mb-6">
                      {i === 1 && "React, Node.js və modern web texnologiyaları ilə tam proqramlaşdırma kursunda sıfırdan professional səviyyəyə qədər öyrənin."}
                      {i === 2 && "React Native və Flutter istifadə edərək iOS və Android platformaları üçün müasir mobil applikasiyalar yaradın."}
                      {i === 3 && "Python, Machine Learning və AI texnologiyaları ilə data analizi və süni intellekt sahəsində mütəxəssis olun."}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-devcode-gray">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>30+ tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>16 həftə</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/courses">
                      <Button className="w-full bg-devcode-gradient hover:bg-devcode-orange-dark text-white font-semibold shadow-devcode">
                        Kursa Qoşul
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
              <Button variant="outline" size="lg" className="border-2 border-devcode-orange text-devcode-orange hover:bg-devcode-orange hover:text-white px-8 py-4 text-lg font-semibold">
                Bütün Kursları Gör
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}