import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Star, 
  ChevronRight,
  CheckCircle,
  PlayCircle,
  Clock,
  FileText,
  Calendar,
  MessageCircle,
  Code,
  Palette,
  Sparkles,
  BarChart3,
  Video,
  Globe,
  Monitor,
  Database,
  Smartphone,
  PenTool,
  Server,
  User,
  Zap,
  Shield
} from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  instructor: string;
  rating: number;
  students: number;
  thumbnail?: string;
}

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  const featuredCourses = courses?.slice(0, 8) || [];

  // Hero slides data
  const heroSlides = [
    {
      title: "Gələcəyə buradan keç!",
      subtitle: "#gələcəkburada",
      description: "Code Academy gələcək innovasiyaları bu gündən duyub ona uyğun mütəxəssislər hazırlayan tədrəis müəssisəsidir.",
      buttonText: "Keçid et",
      bgColor: "bg-gray-50"
    },
    {
      title: "Texnologiyanı öyrən!",
      subtitle: "#texnologiyaburada",
      description: "Müasir texnologiyalar və praktiki təcrübə ilə gələcəyinizi qurun. Peşəkar mütəxəssislər həmişə yanınızda.",
      buttonText: "İndi başla",
      bgColor: "bg-blue-50"
    },
    {
      title: "Karyeranı qur!",
      subtitle: "#karyeraburada",
      description: "Real layihələr üzərində çalışın və iş bazarında rəqabət qabiliyyətli mütəxəssis olun. 100% praktiki təhsil.",
      buttonText: "Qeydiyyat ol",
      bgColor: "bg-green-50"
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Course categories with 3D-style icons
  const courseCategories = [
    {
      title: "Front-end əsası full stack",
      description: "Gələcəyin əsasını burada məzun olmuş siz bura müraciət edin",
      icon: <Monitor className="w-12 h-12 text-blue-500" />,
      gradient: "from-blue-100 to-purple-100",
      iconBg: "from-blue-500 to-purple-500"
    },
    {
      title: "Back-end əsası full stack",
      description: "Hər yerin layihəsi əlbəttəki ən əsas adım olan dayaq",
      icon: <Database className="w-12 h-12 text-green-500" />,
      gradient: "from-green-100 to-emerald-100",
      iconBg: "from-green-500 to-emerald-500"
    },
    {
      title: "Qrafik Dizayn və Vizual Ko...",
      description: "Gələcəyin dizayn etməyə bu gündən kəçid",
      icon: <PenTool className="w-12 h-12 text-pink-500" />,
      gradient: "from-pink-100 to-red-100",
      iconBg: "from-pink-500 to-red-500"
    },
    {
      title: "UX/UI Dizayn",
      description: "Digital məlumat texriblərini hər kəsə...",
      icon: <Smartphone className="w-12 h-12 text-orange-500" />,
      gradient: "from-orange-100 to-yellow-100",
      iconBg: "from-orange-500 to-yellow-500"
    },
    {
      title: "Digital Memariq və 3D",
      description: "Memarlıq və 3D dizaynlər əmin olun ki gələcək",
      icon: <Award className="w-12 h-12 text-indigo-500" />,
      gradient: "from-indigo-100 to-purple-100",
      iconBg: "from-indigo-500 to-purple-500"
    },
    {
      title: "2D Motion Dizayn",
      description: "Yaradıcılıq harakətini qarışıq gətirif",
      icon: <Video className="w-12 h-12 text-yellow-500" />,
      gradient: "from-yellow-100 to-orange-100",
      iconBg: "from-yellow-500 to-orange-500"
    },
    {
      title: "Digital Marketing Professio...",
      description: "Digital kampanyanızın avtarları",
      icon: <TrendingUp className="w-12 h-12 text-purple-500" />,
      gradient: "from-purple-100 to-pink-100",
      iconBg: "from-purple-500 to-pink-500"
    },
    {
      title: "Kiber Təhlükəsizlik",
      description: "kiber təhlükəsizlik nədir?",
      icon: <Globe className="w-12 h-12 text-green-600" />,
      gradient: "from-green-100 to-teal-100",
      iconBg: "from-green-600 to-teal-500"
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden">
        {/* Navigation dots - Top Right */}
        <div className="absolute top-8 right-8 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-devcode-yellow shadow-lg scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="relative h-[600px]">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide 
                  ? 'translate-x-0 opacity-100' 
                  : index < currentSlide 
                    ? '-translate-x-full opacity-0' 
                    : 'translate-x-full opacity-0'
              }`}
            >
              <div className={`pt-32 pb-20 h-full ${slide.bgColor}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                  <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
                    {/* Left Content */}
                    <div className="transform transition-all duration-700 delay-200">
                      <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-2 bg-devcode-yellow rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600 font-medium">Code Academy</span>
                      </div>
                      
                      <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        <span className="inline-block animate-fadeInUp">{slide.title}</span>
                        <br />
                        <span className="text-gray-900 inline-block animate-fadeInUp delay-100">{slide.subtitle}</span>
                      </h1>
                      
                      <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed animate-fadeInUp delay-200">
                        {slide.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-300">
                        <Button 
                          size="lg" 
                          className="bg-devcode-yellow hover:bg-devcode-yellow/90 text-black font-semibold px-8 py-3 rounded-lg text-base transform hover:scale-105 transition-all duration-200"
                        >
                          {slide.buttonText}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Right Illustration - Programming Theme */}
                    <div className="relative">
                      <div className="flex items-center justify-center">
                        {/* Programming themed illustration */}
                        <div className="relative w-96 h-80 animate-floatSlow">
                          {/* Main computer/laptop */}
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                            <div className="w-48 h-32 bg-gray-800 rounded-lg shadow-2xl relative">
                              {/* Screen */}
                              <div className="w-full h-24 bg-gray-900 rounded-t-lg p-3 relative overflow-hidden">
                                {/* Code lines with syntax highlighting */}
                                <div className="space-y-2 animate-fadeInUp">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-green-400 text-xs">const</span>
                                    <span className="text-blue-400 text-xs">devcode</span>
                                    <span className="text-white text-xs">=</span>
                                    <span className="text-yellow-400 text-xs">"future"</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-purple-400 text-xs">function</span>
                                    <span className="text-blue-400 text-xs">learn()</span>
                                    <span className="text-white text-xs">{"{"}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 ml-4">
                                    <span className="text-green-400 text-xs">return</span>
                                    <span className="text-yellow-400 text-xs">"success"</span>
                                  </div>
                                  <div className="text-white text-xs">{"}"}</div>
                                </div>
                                {/* Blinking cursor */}
                                <div className="absolute bottom-2 left-3 w-1 h-3 bg-green-400 animate-pulse"></div>
                              </div>
                              {/* Keyboard */}
                              <div className="w-full h-8 bg-gray-700 rounded-b-lg flex items-center justify-center">
                                <div className="grid grid-cols-8 gap-1">
                                  {Array.from({length: 8}).map((_, i) => (
                                    <div key={i} className="w-2 h-1 bg-gray-600 rounded-sm"></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Floating code symbols */}
                          <div className="absolute top-4 left-8 animate-slowBounce">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center">
                              <span className="text-white font-bold text-lg">JS</span>
                            </div>
                          </div>
                          
                          <div className="absolute top-16 right-12 animate-bounceHorizontal">
                            <div className="w-10 h-10 bg-green-500 rounded-lg shadow-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{"</>"}</span>
                            </div>
                          </div>
                          
                          <div className="absolute bottom-20 left-12 animate-floatSlow delay-300">
                            <div className="w-8 h-8 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center">
                              <span className="text-white font-bold text-xs">+</span>
                            </div>
                          </div>
                          
                          <div className="absolute top-32 right-4 animate-pulse">
                            <div className="w-14 h-14 bg-orange-500 rounded-lg shadow-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">CSS</span>
                            </div>
                          </div>
                          
                          {/* Database icon */}
                          <div className="absolute bottom-4 right-8 animate-slowBounce delay-200">
                            <div className="w-12 h-16 bg-gray-600 rounded-lg shadow-lg relative">
                              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-400 rounded-full"></div>
                              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-400 rounded"></div>
                              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-400 rounded"></div>
                            </div>
                          </div>
                          
                          {/* Git branch visualization */}
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-fadeInUp delay-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                              <div className="w-8 h-1 bg-green-400"></div>
                              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                              <div className="w-8 h-1 bg-yellow-400"></div>
                              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Animated particles */}
                          <div className="absolute top-12 left-4 w-2 h-2 bg-devcode-yellow rounded-full animate-ping"></div>
                          <div className="absolute bottom-16 right-16 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="absolute top-20 right-8 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tədris proqramları
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* JavaScript Fundamentals */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* JS Logo */}
                    <div className="w-20 h-20 bg-yellow-400 rounded-lg shadow-lg flex items-center justify-center relative">
                      <span className="text-black font-bold text-2xl">JS</span>
                    </div>
                    {/* Code brackets */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-xs font-bold">{"{"}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-xs font-bold">{"}"}</span>
                    </div>
                    <div className="absolute top-2 right-6 w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    JavaScript Əsasları
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Müasir web development üçün JavaScript əsaslarını öyrənin.
                </p>
              </div>
            </div>

            {/* React Development */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* React Logo */}
                    <div className="w-20 h-20 bg-cyan-400 rounded-full shadow-lg flex items-center justify-center relative">
                      <div className="w-8 h-8 border-2 border-white rounded-full relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    {/* Orbital rings */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-8 border-2 border-cyan-300 rounded-full rotate-45"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-8 border-2 border-cyan-300 rounded-full -rotate-45"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    React Development
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Modern interaktiv UI yaratmaq üçün React framework.
                </p>
              </div>
            </div>

            {/* Node.js Backend */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* Node.js Logo */}
                    <div className="w-20 h-20 bg-green-500 rounded-lg shadow-lg flex items-center justify-center relative">
                      <span className="text-white font-bold text-lg">NODE</span>
                    </div>
                    {/* Server connections */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-400 rounded-full"></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-600 rounded-full"></div>
                    <div className="absolute top-2 right-6 w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="absolute bottom-4 left-6 w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Node.js Backend
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Server tərəfi proqramlaşdırma və API yaradılması.
                </p>
              </div>
            </div>

            {/* Full-Stack Development */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* Full-Stack Symbol */}
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center relative">
                      <div className="text-white font-bold text-sm">
                        <div className="text-center">
                          <div>FULL</div>
                          <div>STACK</div>
                        </div>
                      </div>
                    </div>
                    {/* Frontend/Backend indicators */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">F</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                    <div className="absolute top-2 right-6 w-3 h-3 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Full-Stack Development
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Frontend və backend birləşərək tam web development.
                </p>
              </div>
            </div>

            {/* Python Programming */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-yellow-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* Python Logo */}
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-lg shadow-lg flex items-center justify-center relative">
                      <span className="text-white font-bold text-lg">PY</span>
                    </div>
                    {/* Snake-like elements */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600 rounded-full"></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full"></div>
                    <div className="absolute top-2 right-6 w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Python Proqramlaşdırma
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Sadə və güclü Python dili ilə proqramlaşdırma öyrənin.
                </p>
              </div>
            </div>

            {/* Database & SQL */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* Database cylinder */}
                    <div className="w-16 h-20 bg-gray-600 rounded-xl relative shadow-lg">
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gray-400 rounded-full"></div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-400 rounded"></div>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-400 rounded"></div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-400 rounded"></div>
                    </div>
                    {/* SQL elements */}
                    <div className="absolute -top-2 -right-2 w-8 h-6 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">SQL</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Database və SQL
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Verilənlər bazası idarəetməsi və SQL sorğuları.
                </p>
              </div>
            </div>

            {/* Mobile App Development */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* Mobile phones */}
                    <div className="w-12 h-20 bg-gray-800 rounded-xl shadow-lg relative border-2 border-gray-600">
                      <div className="w-full h-16 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-lg m-1">
                        <div className="p-2 space-y-1">
                          <div className="h-1 bg-white/70 rounded w-full"></div>
                          <div className="h-2 bg-white/70 rounded w-3/4"></div>
                          <div className="h-1 bg-white/70 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                    {/* App icons */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📱</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Mobile App Development
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  iOS və Android üçün mobil tətbiq yaradılması.
                </p>
              </div>
            </div>

            {/* DevOps & Cloud */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gradient-to-br from-orange-50 to-red-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    {/* Cloud/Server cluster */}
                    <div className="w-20 h-16 bg-gray-700 rounded-lg shadow-lg relative">
                      <div className="absolute top-2 left-2 w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-orange-400 rounded"></div>
                    </div>
                    {/* Cloud elements */}
                    <div className="absolute -top-2 -right-2 w-8 h-6 bg-orange-500 rounded-full"></div>
                    <div className="absolute -top-1 -right-4 w-6 h-4 bg-orange-400 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    DevOps və Cloud
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Server idarəetmə, deploy və cloud texnologiyaları.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 rounded-full"
            >
              Daha çox
            </Button>
          </div>
        </div>
      </section>

      {/* DevCode LMS System Architecture */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-devcode-orange to-devcode-yellow bg-clip-text text-transparent text-lg font-semibold mb-4 block">
              Müasir Texnologiyalar
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              DevCode LMS Sistem Arxitekturası
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Enterprise səviyyəli təhsil platforması - TypeScript, React, PostgreSQL və müasir DevOps ilə qurulmuş
            </p>
          </div>

          {/* Architecture Layers */}
          <div className="grid lg:grid-cols-4 gap-8 mb-20">
            {/* User Layer */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">User Layer</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Admin Panel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Teacher Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Student Interface</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Public Pages</span>
                </div>
              </div>
            </div>

            {/* Frontend Layer */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Frontend</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">React 18 + TypeScript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">TailwindCSS + Shadcn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">TanStack Query</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Vite Build System</span>
                </div>
              </div>
            </div>

            {/* Backend Layer */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Backend</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Node.js + Express</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">TypeScript ESM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">RESTful APIs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Replit Auth</span>
                </div>
              </div>
            </div>

            {/* Database Layer */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Database</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">PostgreSQL 15</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Drizzle ORM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">25+ Data Tables</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Session Store</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Flow Diagram */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Sistem Data Flow Diaqramı</h3>
            
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              {/* User */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">İstifadəçi</p>
                <p className="text-xs text-gray-500">React UI</p>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <ChevronRight className="w-6 h-6 text-green-500" />
              </div>

              {/* API */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">REST API</p>
                <p className="text-xs text-gray-500">Express.js</p>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-orange-500"></div>
                <ChevronRight className="w-6 h-6 text-orange-500" />
              </div>

              {/* Database */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-10 h-10 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">PostgreSQL</p>
                <p className="text-xs text-gray-500">Drizzle ORM</p>
              </div>

              {/* Arrow 3 */}
              <div className="flex items-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500"></div>
                <ChevronRight className="w-6 h-6 text-purple-500" />
              </div>

              {/* Response */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">Real-time</p>
                <p className="text-xs text-gray-500">Data Sync</p>
              </div>
            </div>
          </div>

          {/* System Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Video Streaming</h4>
              <p className="text-gray-600 text-sm mb-4">YouTube integration, progress tracking, lesson materials və assignment engine</p>
              <div className="flex items-center text-devcode-orange text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Production Ready
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Analytics Engine</h4>
              <p className="text-gray-600 text-sm mb-4">Real-time progress tracking, attendance monitoring və submission analytics</p>
              <div className="flex items-center text-devcode-orange text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Enterprise Level
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PenTool className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Assignment Engine</h4>
              <p className="text-gray-600 text-sm mb-4">Rich text editor, file upload, GitHub integration və automated grading</p>
              <div className="flex items-center text-devcode-orange text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                AI Powered
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Certificate System</h4>
              <p className="text-gray-600 text-sm mb-4">Automated certificate generation unique ID verification və blockchain ready</p>
              <div className="flex items-center text-devcode-orange text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Blockchain Ready
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Security & Auth</h4>
              <p className="text-gray-600 text-sm mb-4">OpenID Connect, role-based access control və session management</p>
              <div className="flex items-center text-devcode-orange text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Enterprise Security
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Live Sessions</h4>
              <p className="text-gray-600 text-sm mb-4">Real-time class management, attendance tracking və interactive learning</p>
              <div className="flex items-center text-devcode-orange text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Real-time
              </div>
            </div>
          </div>

          {/* Architecture Benefits */}
          <div className="bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-3xl p-8 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Sistem Üstünlükləri</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-lg">Scalable Architecture - Minlərlə istifadəçi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-lg">Type Safety - 100% TypeScript coverage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-lg">Modern Stack - Industry standards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-lg">Cloud Native - Production ready</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-6xl mb-4">🚀</div>
                <h4 className="text-2xl font-bold mb-4">Texnologiyanın Gələcəyi</h4>
                <p className="text-white/90 text-lg">
                  DevCode LMS - education technology sahəsində yeni standart!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
