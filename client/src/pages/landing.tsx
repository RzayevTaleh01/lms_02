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
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-16 lg:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                  <h2 className="text-yellow-600 text-lg font-semibold">Hər kəs üçün</h2>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  Gələcəyə buradan keç!
                  <br />
                  <span className="text-gray-800">#gələcəkburada</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                  Code Academy gələcək innovasiyaları bu gündən duyub ona uyğun 
                  mütəxəssislər hazırlayan təhsil müəssisəsidir.
                </p>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg font-semibold rounded-lg shadow-lg">
                  Keçid et
                </Button>
              </div>
            </div>
            
            {/* Right Visual - 3D Stack */}
            <div className="relative lg:pl-12">
              <div className="relative h-96 flex items-center justify-center">
                {/* Background decorative elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-40"></div>
                </div>
                
                {/* Main 3D Stack */}
                <div className="relative z-10">
                  {/* Back layers */}
                  <div className="absolute bg-gray-100 w-64 h-40 rounded-xl transform rotate-3 translate-x-6 translate-y-4 shadow-lg border border-gray-200"></div>
                  <div className="absolute bg-gray-50 w-64 h-40 rounded-xl transform rotate-1 translate-x-3 translate-y-2 shadow-lg border border-gray-200"></div>
                  
                  {/* Front card */}
                  <div className="relative bg-white w-64 h-40 rounded-xl shadow-2xl border border-gray-200 p-6 transform hover:scale-105 transition-transform duration-300">
                    {/* Header with status indicators */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    
                    {/* Content lines */}
                    <div className="space-y-3">
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-4/5"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-3/5"></div>
                      <div className="h-3 bg-gradient-to-r from-orange-200 to-orange-100 rounded-full w-4/5"></div>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating flag */}
                  <div className="absolute -top-6 -right-4 transform rotate-12">
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-orange-500"></div>
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tədris proqramları Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tədris proqramları</h2>
          </div>
          
          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Front-end Stack */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <Code className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Front-end sosial full stack</h3>
                  <p className="text-sm text-gray-600">Gələcəyin sosial mədya platformını bu gündən büdrətələyim.</p>
                </div>
              </div>
            </div>

            {/* Back-end Stack */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <Monitor className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Back-end sosial full stack</h3>
                  <p className="text-sm text-gray-600">Hər üçün güçlü sistem arxitektu san dayəm.</p>
                </div>
              </div>
            </div>

            {/* Grafik Dizayn */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Grafik Dizayn və Vizual Ko...</h3>
                  <p className="text-sm text-gray-600">Gələcəyin qiyafəti etibaryaqlaşmaya bu gündən başla.</p>
                </div>
              </div>
            </div>

            {/* UX/UI Dizayn */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">UX/UI Dizayn</h3>
                  <p className="text-sm text-gray-600">Digital səfdirlüm təsdirətünü hər kəsim hər yaxın...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-12 space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
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

            {/* Visual Analytics & Progress */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizual İrəliləyiş</h3>
              
              {/* Interactive Charts Simulation */}
              <div className="space-y-6">
                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        React & JavaScript
                      </span>
                      <span className="text-sm text-green-600 font-bold">85%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-float" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        Node.js Backend
                      </span>
                      <span className="text-sm text-blue-600 font-bold">72%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-float" style={{width: '72%', animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                        Database Design
                      </span>
                      <span className="text-sm text-purple-600 font-bold">90%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-float" style={{width: '90%', animationDelay: '1s'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Simple Chart Visualization */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-end justify-between h-20 gap-2">
                    <div className="bg-orange-400 rounded animate-bounce" style={{height: '60%', width: '15px', animationDelay: '0s'}}></div>
                    <div className="bg-blue-400 rounded animate-bounce" style={{height: '80%', width: '15px', animationDelay: '0.2s'}}></div>
                    <div className="bg-green-400 rounded animate-bounce" style={{height: '45%', width: '15px', animationDelay: '0.4s'}}></div>
                    <div className="bg-purple-400 rounded animate-bounce" style={{height: '70%', width: '15px', animationDelay: '0.6s'}}></div>
                    <div className="bg-yellow-400 rounded animate-bounce" style={{height: '90%', width: '15px', animationDelay: '0.8s'}}></div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <span className="text-xs text-gray-500 font-medium">Real-time Statistikalar</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center gap-2 text-green-600">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Ümumi irəliləyiş: 82%</span>
                </div>
              </div>
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