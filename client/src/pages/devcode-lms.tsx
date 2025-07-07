import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  Award, 
  BarChart3, 
  Video, 
  FileText, 
  CheckCircle, 
  Clock, 
  Monitor, 
  Smartphone,
  Shield,
  Zap,
  PlayCircle,
  Target,
  TrendingUp,
  MessageSquare,
  Calendar,
  Download,
  Star,
  ChevronRight,
  Database,
  Cloud,
  Code,
  Layers
} from 'lucide-react';
import { Link } from 'wouter';

export default function DevCodeLMS() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-devcode-orange via-devcode-yellow to-orange-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Professional LMS Platform
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                DevCode LMS
                <span className="block text-2xl md:text-3xl lg:text-4xl font-normal mt-2 opacity-90">
                  Müasir Təhsil İdarəetmə Sistemi
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                Proqramlaşdırma təhsili üçün xüsusi hazırlanmış peşəkar LMS platforması. 
                Tələbələr, müəllimlər və adminlər üçün tam funksional təhsil mühiti.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses">
                  <Button size="lg" className="bg-white text-devcode-orange hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    Kursları Görüntülə
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Demo İzlə
                </Button>
              </div>
            </div>
            
            {/* Platform Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500">DevCode LMS Dashboard</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-devcode-orange rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-2 bg-devcode-yellow rounded w-5/6"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-blue-800">Kurslar</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <span className="text-xs text-green-800">Tələbələr</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <span className="text-xs text-purple-800">Sertifikatlar</span>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <BarChart3 className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                    <span className="text-xs text-orange-800">Analitika</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture & Features */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-devcode-orange/10 text-devcode-orange border-devcode-orange/20">
              <Database className="w-4 h-4 mr-2" />
              Real System Specifications
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              DevCode LMS Sistem Arxitekturası
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              25+ cədvəl və münasibətlər, 3-səviyyəli rol sistemi, real vaxt analitikası
            </p>
          </div>

          {/* Architecture Layers */}
          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {/* User Layer */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 mb-4 text-white">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">İstifadəçi Səviyyəsi</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/20 rounded-lg p-2">Admin</div>
                  <div className="bg-white/20 rounded-lg p-2">Müəllim</div>
                  <div className="bg-white/20 rounded-lg p-2">Tələbə</div>
                </div>
              </div>
            </div>

            {/* Frontend Layer */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 mb-4 text-white">
                <Monitor className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Frontend Səviyyəsi</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/20 rounded-lg p-2">React 18</div>
                  <div className="bg-white/20 rounded-lg p-2">TypeScript</div>
                  <div className="bg-white/20 rounded-lg p-2">TailwindCSS</div>
                </div>
              </div>
            </div>

            {/* Backend Layer */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 mb-4 text-white">
                <Code className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Backend Səviyyəsi</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/20 rounded-lg p-2">Express.js</div>
                  <div className="bg-white/20 rounded-lg p-2">Replit Auth</div>
                  <div className="bg-white/20 rounded-lg p-2">Session Store</div>
                </div>
              </div>
            </div>

            {/* Database Layer */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 mb-4 text-white">
                <Database className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Verilənlər Bazası</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/20 rounded-lg p-2">PostgreSQL</div>
                  <div className="bg-white/20 rounded-lg p-2">Drizzle ORM</div>
                  <div className="bg-white/20 rounded-lg p-2">25+ Tables</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Streaming</h3>
                <p className="text-sm text-gray-600">YouTube inteqrasiyası və progress tracking</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-sm text-gray-600">Dərhal analitika və progress izləmə</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Assignment Engine</h3>
                <p className="text-sm text-gray-600">Avtomatik qiymətləndirmə və GitHub inteqrasiyası</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Digital Certificates</h3>
                <p className="text-sm text-gray-600">Unikal ID ilə sertifikat yoxlama sistemi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                <Users className="w-4 h-4 mr-2" />
                Tələbələr üçün
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                İnteraktiv Öğrənmə Təcrübəsi
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Müasir texnologiyalar və istifadəçi dostu interfeys ilə proqramlaşdırma öğrənmək artıq daha asan və əyləncəli.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">HD Video Dərslər</h3>
                    <p className="text-gray-600">YouTube inteqrasiyası ilə keyfiyyətli video məzmun və avtomatik progress tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">İnteraktiv Tapşırıqlar</h3>
                    <p className="text-gray-600">Real kodu yazın, testlərdən keçin və dərhal geri dönüş alın</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Progress Tracking</h3>
                    <p className="text-gray-600">Öğrənmə gedişatınızı izləyin və məqsədlərinizə çatın</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Rəqəmsal Sertifikatlar</h3>
                    <p className="text-gray-600">Kursları tamamladıqdan sonra qlobal keçərli sertifikatlar əldə edin</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Student Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Tələbə Paneli</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>FullStack JavaScript Kursu</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                {/* Course Lessons */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">JavaScript Əsasları</span>
                    <span className="ml-auto text-xs text-green-600">Tamamlandı</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <PlayCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">React Hooks</span>
                    <span className="ml-auto text-xs text-blue-600">İndi öğrənir</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Node.js Backend</span>
                    <span className="ml-auto text-xs text-gray-400">Gözləyir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Teachers Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Teacher Dashboard Mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Müəllim Paneli</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-blue-600">Aktiv Kurs</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">247</div>
                    <div className="text-xs text-green-600">Tələbə</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <FileText className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">18</div>
                    <div className="text-xs text-orange-600">Qiymətləndirilməmiş</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">89</div>
                    <div className="text-xs text-purple-600">Verilmiş Sertifikat</div>
                  </div>
                </div>
                
                {/* Recent Activities */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Son Fəaliyyətlər</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Yeni tapşırıq təyin edildi</span>
                      <span className="text-xs text-gray-500">2 saat əvvəl</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">5 tələbə qeydiyyatdan keçdi</span>
                      <span className="text-xs text-gray-500">1 gün əvvəl</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
                <BookOpen className="w-4 h-4 mr-2" />
                Müəllimlər üçün
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Güclü Kurs İdarəetmə Sistemi
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Kurslarınızı idarə edin, tələbələrinizi izləyin və təhsil keyfiyyətini artırın. Hər şey bir platformada!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Kurs Yaradılması</h3>
                    <p className="text-gray-600">Video dərslər, materiallar və tapşırıqlar ilə tam kurslar hazırlayın</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Real-time Analitika</h3>
                    <p className="text-gray-600">Tələbələrin gedişatını izləyin və detallı hesabatlar alın</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-2">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Avtomatik Qiymətləndirmə</h3>
                    <p className="text-gray-600">Tapşırıqları qiymətləndirin və geri dönüş verin</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Canlı Dərs Sistemi</h3>
                    <p className="text-gray-600">Canlı dərslər keçirin və iştirak qeydiyyatı aparın</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Benefits */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise Level System
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Niyə DevCode LMS Seçməlisiniz?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Müasir texnologiyalar və peşəkar yanaşma ilə hazırlanmış platformamız sizə və tələbələrinizə əvəzsiz təcrübə təqdim edir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Yüksək Təhlükəsizlik</h3>
              <p className="text-gray-300">Replit Auth və PostgreSQL ilə enterprise səviyyəsində təhlükəsizlik</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cloud-Based</h3>
              <p className="text-gray-300">Hər yerdən giriş, avtomatik backup və sürətli performans</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Yüksək Performans</h3>
              <p className="text-gray-300">React 18 və TypeScript ilə sürətli və etibarlı sistem</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobil Uyumlu</h3>
              <p className="text-gray-300">Bütün cihazlarda mükəmməl işləyən responsive dizayn</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Dəstək</h3>
              <p className="text-gray-300">Hər zaman əlçatan texniki dəstək və müəllim köməyi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Keyfiyyət Zəmanəti</h3>
              <p className="text-gray-300">Beynəlxalq standartlara uyğun səviyyəli təhsil platforması</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-devcode-orange to-devcode-yellow">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            DevCode LMS ilə Təhsilə Başlayın
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Müasir texnologiyalar və peşəkar yanaşma ilə proqramlaşdırma öğrənin. 
            Siz də DevCode LMS platformasından yararlanın!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-devcode-orange hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <BookOpen className="mr-2 w-5 h-5" />
                Kursları Keşfet
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
              <Download className="mr-2 w-5 h-5" />
              Brochure Yüklə
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-white/80">Aktiv Tələbə</div>
            </div>
            <div>
              <div className="text-3xl font-bold">25+</div>
              <div className="text-white/80">Kurs Proqramı</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-white/80">Tələbə Məmnuniyyəti</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}