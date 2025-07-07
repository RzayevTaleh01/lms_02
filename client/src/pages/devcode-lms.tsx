import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Database, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Shield, 
  Zap,
  BarChart3,
  Video,
  PenTool,
  Globe,
  Server,
  Monitor,
  Code,
  Smartphone,
  Calendar,
  FileText,
  MessageCircle,
  Star,
  ArrowRight,
  Play,
  Download
} from "lucide-react";

export default function DevCodeLMS() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise-level LMS Solution
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              DevCode LMS
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Təhsil müəssisələri üçün tam avtomatlaşdırılmış, modern və scalable 
              Öyrənmə İdarəetmə Sistemi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl">
                <Play className="w-5 h-5 mr-2" />
                Canlı Demo
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl">
                <Download className="w-5 h-5 mr-2" />
                Texniki Sənədlər
              </Button>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">25+</p>
              <p className="text-gray-600">Məlumat Cədvəli</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-gray-600">İstifadəçi Rolu</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">∞</p>
              <p className="text-gray-600">Kurs Limiti</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">99.9%</p>
              <p className="text-gray-600">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Modern Texnologiya Yığını
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ən son texnologiyalar və best practice-lər ilə qurulmuş, 
              enterprise səviyyəli performans və təhlükəsizlik
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Tech Stack Left */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Frontend</h3>
                    <p className="text-gray-600">Modern UI/UX təcrübəsi</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-blue-600">React 18</p>
                    <p className="text-sm text-gray-600">TypeScript</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-blue-600">TailwindCSS</p>
                    <p className="text-sm text-gray-600">Responsive</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-blue-600">Vite</p>
                    <p className="text-sm text-gray-600">Fast Build</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-blue-600">TanStack</p>
                    <p className="text-sm text-gray-600">Query</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Backend</h3>
                    <p className="text-gray-600">Scalable server arxitekturası</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-green-600">Node.js</p>
                    <p className="text-sm text-gray-600">Express.js</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-green-600">PostgreSQL</p>
                    <p className="text-sm text-gray-600">Drizzle ORM</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-green-600">Replit Auth</p>
                    <p className="text-sm text-gray-600">OpenID</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="font-bold text-green-600">RESTful</p>
                    <p className="text-sm text-gray-600">APIs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Sistem Arxitekturası</h3>
                
                {/* User Layer */}
                <div className="mb-6">
                  <div className="bg-blue-100 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">İstifadəçi Səviyyəsi</h4>
                    <div className="flex justify-around">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs text-blue-700">Admin</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs text-blue-700">Müəllim</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs text-blue-700">Tələbə</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frontend Layer */}
                <div className="mb-6">
                  <div className="bg-green-100 rounded-xl p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Frontend Səviyyəsi</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">React</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">UI/UX</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">Routing</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backend Layer */}
                <div className="mb-6">
                  <div className="bg-purple-100 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Backend Səviyyəsi</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">Express</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">Auth</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">APIs</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Layer */}
                <div>
                  <div className="bg-orange-100 rounded-xl p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Məlumat Bazası</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">PostgreSQL</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">Drizzle</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs font-medium">Session</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Əsas Funksiyalar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tam avtomatlaşdırılmış kurs idarəetməsi, real zamanda analitika və 
              professional sertifikat sistemi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Management */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kurs İdarəetməsi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Limitsiz kurs yaradılması</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Video streaming inteqrasiyası</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Rich content editor</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Ierarxik dərs strukturu</span>
                </li>
              </ul>
            </Card>

            {/* Assignment System */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tapşırıq Sistemi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Rich text tapşırıqlar</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Fayl upload dəstəyi</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>GitHub inteqrasiyası</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Avtomatik qiymətləndirmə</span>
                </li>
              </ul>
            </Card>

            {/* Analytics */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Analitika</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Tələbə proqres izləmə</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Performance dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Davamiyyət monitorinqi</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Ətraflı hesabatlar</span>
                </li>
              </ul>
            </Card>

            {/* Certificate System */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sertifikat Sistemi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Avtomatik yaradılma</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Unikal ID yoxlama</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Publik verifikasiya</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Rəqəmsal imzalar</span>
                </li>
              </ul>
            </Card>

            {/* User Management */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">İstifadəçi İdarəetməsi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>3 səviyyəli rol sistemi</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Replit Auth inteqrasiya</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Session idarəetməsi</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Giriş nəzarəti</span>
                </li>
              </ul>
            </Card>

            {/* Content Management */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Məzmun İdarəetməsi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Blog sistem inteqrasiya</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Material təşkili</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Media idarəetməsi</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Versiya nəzarəti</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Database Schema */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Məlumat Bazası Strukturu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              25+ məlumat cədvəli ilə tam funksional LMS sistemi. 
              PostgreSQL və Drizzle ORM ilə type-safe məlumat idarəetməsi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Core Tables */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Əsas Cədvəllər</h3>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">users</span>
                  <span className="text-sm text-gray-600">İstifadəçilər</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">courses</span>
                  <span className="text-sm text-gray-600">Kurslar</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">lessons</span>
                  <span className="text-sm text-gray-600">Dərslər</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">enrollments</span>
                  <span className="text-sm text-gray-600">Qeydiyyatlar</span>
                </div>
              </div>
            </div>

            {/* Assignment Tables */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">Tapşırıq Cədvəlləri</h3>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">assignments</span>
                  <span className="text-sm text-gray-600">Tapşırıqlar</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">submissions</span>
                  <span className="text-sm text-gray-600">Göndərişlər</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">lesson_assignments</span>
                  <span className="text-sm text-gray-600">Dərs Tapşırıqları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">lesson_materials</span>
                  <span className="text-sm text-gray-600">Dərs Materialları</span>
                </div>
              </div>
            </div>

            {/* Analytics Tables */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-4">Analitika Cədvəlləri</h3>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">lesson_progress</span>
                  <span className="text-sm text-gray-600">Dərs Proqresi</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">attendance</span>
                  <span className="text-sm text-gray-600">Davamiyyət</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">lesson_sessions</span>
                  <span className="text-sm text-gray-600">Dərs Sessiyaları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">certificates</span>
                  <span className="text-sm text-gray-600">Sertifikatlar</span>
                </div>
              </div>
            </div>

            {/* Additional Tables */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-900 mb-4">Əlavə Cədvəllər</h3>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">blog_posts</span>
                  <span className="text-sm text-gray-600">Blog Yazıları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">sessions</span>
                  <span className="text-sm text-gray-600">Sessiyalar</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">course_categories</span>
                  <span className="text-sm text-gray-600">Kurs Kateqoriyaları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">notifications</span>
                  <span className="text-sm text-gray-600">Bildirişlər</span>
                </div>
              </div>
            </div>

            {/* Video & Media */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-teal-900 mb-4">Media Cədvəlləri</h3>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">video_progress</span>
                  <span className="text-sm text-gray-600">Video Proqresi</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">media_files</span>
                  <span className="text-sm text-gray-600">Media Faylları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">file_uploads</span>
                  <span className="text-sm text-gray-600">Fayl Yükləmələri</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">content_versions</span>
                  <span className="text-sm text-gray-600">Məzmun Versiyaları</span>
                </div>
              </div>
            </div>

            {/* System Tables */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sistem Cədvəlləri</h3>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">audit_logs</span>
                  <span className="text-sm text-gray-600">Audit Logları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">system_settings</span>
                  <span className="text-sm text-gray-600">Sistem Ayarları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">api_keys</span>
                  <span className="text-sm text-gray-600">API Açarları</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">backup_logs</span>
                  <span className="text-sm text-gray-600">Backup Logları</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Performance */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Təhlükəsizlik və Performans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise səviyyəli təhlükəsizlik və yüksək performans standartları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Security */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Təhlükəsizlik</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">OpenID Connect Autentifikasiya</h4>
                    <p className="text-gray-600">Replit Auth inteqrasiyası ilə təhlükəsiz giriş</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Role-based Access Control</h4>
                    <p className="text-gray-600">3 səviyyəli istifadəçi hüquqları sistemi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Session Təhlükəsizliyi</h4>
                    <p className="text-gray-600">PostgreSQL session store ilə təhlükəsiz sessiya idarəetməsi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Encryption</h4>
                    <p className="text-gray-600">Həssas məlumatların şifrələnməsi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Performans</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Neon Serverless PostgreSQL</h4>
                    <p className="text-gray-600">Avtomatik scaling və connection pooling</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">React Query Caching</h4>
                    <p className="text-gray-600">İntelligent məlumat cache sistemi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Type-safe API</h4>
                    <p className="text-gray-600">TypeScript və Drizzle ORM ilə type safety</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Updates</h4>
                    <p className="text-gray-600">Canlı proqres izləmə və bildirişlər</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              DevCode LMS ilə Təhsilinizi Rəqəmsallaşdırın
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              25+ məlumat cədvəli, tam avtomatlaşdırma və enterprise səviyyəli təhlükəsizlik ilə 
              təhsil müəssisənizi növbəti səviyyəyə çatdırın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                <Play className="w-5 h-5 mr-2" />
                Canlı Demo Tələb Et
              </Button>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl">
                <Download className="w-5 h-5 mr-2" />
                Texniki Sənədlər
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-blue-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Dəstək</h3>
              <p>24/7 texniki dəstək</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">API</h3>
              <p>RESTful API Documentation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Təhlükəsizlik</h3>
              <p>Enterprise-level security</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}