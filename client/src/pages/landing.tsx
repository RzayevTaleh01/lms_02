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
  PenTool
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

      {/* DevCode LMS Platform Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              DevCode LMS - Hər şey Bir Yerdə!
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Təhsil dünyasının ən güclü və müasir platforması. Tələbələr, müəllimlər və administratorlar üçün tam həll.
            </p>
          </div>

          {/* Platform Showcase with Mockup */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Side - Platform Mockup */}
            <div className="relative">
              {/* Main Dashboard Mockup */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
                    devcode.az/dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Salam, Əli Vəliyev!</h3>
                      <p className="text-gray-600">Bugün 3 yeni dərsiniz var</p>
                    </div>
                    <div className="w-12 h-12 bg-devcode-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2"></div>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-sm text-gray-600">Aktiv Kurs</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="w-8 h-8 bg-green-500 rounded-lg mb-2"></div>
                      <p className="text-2xl font-bold text-green-600">85%</p>
                      <p className="text-sm text-gray-600">Progress</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg mb-2"></div>
                      <p className="text-2xl font-bold text-purple-600">7</p>
                      <p className="text-sm text-gray-600">Sertifikat</p>
                    </div>
                  </div>

                  {/* Current Course */}
                  <div className="bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-lg p-4 text-white mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">React Development</h4>
                        <p className="text-sm opacity-90">Dərs 8: State Management</p>
                        <div className="mt-2 bg-white/20 rounded-full h-2 w-32">
                          <div className="bg-white rounded-full h-2 w-24"></div>
                        </div>
                      </div>
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Son Aktivlər</h4>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">JavaScript Tapşırığı tamamlandı</p>
                        <p className="text-xs text-gray-500">2 saat əvvəl</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">React Hooks videosu izləndi</p>
                        <p className="text-xs text-gray-500">Dünən</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce">
                🎯 95% Dəqiqlik
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                ⚡ Real-time
              </div>

              <div className="absolute top-1/2 -right-8 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg transform rotate-12">
                🏆 Pro Level
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  💥 Bu nə qədər güclü sistem!
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  DevCode LMS - tələbələrin "Vayyyy bu nə qədər zordur!" deyəcəyi, 
                  amma istifadəsi super asan olan ən müasir təhsil platforması!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">📱 Mobile App</h4>
                    <p className="text-gray-600">
                      Mobil telefonda da istifadə oluna bilər! İstər evdə, istər metroda, 
                      istənilən yerdə öyrənmək mümkündür.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🎥 Live Training Management</h4>
                    <p className="text-gray-600">
                      Canlı dərslər, real-time suallar, instant cavablar! 
                      Sanki müəllim yanınızda oturub dərs deyir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🎮 Interactive Training</h4>
                    <p className="text-gray-600">
                      Oyun kimi əyləncəli! Kod yazanda real-time nəticə, 
                      hər addımda progress tracking və achievement sistemi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🏆 Gamification</h4>
                    <p className="text-gray-600">
                      Hər tapşırıq üçün xal, hər kurs üçün medal, 
                      leaderboard sistemi - sanki oyun oynayırsınız!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">📊 Advanced Reporting</h4>
                    <p className="text-gray-600">
                      AI ilə dəqiq analiz! Hansı mövzularda zəifsiniz, 
                      nələr öyrənməlisiniz - hamısını göstərir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-devcode-orange to-devcode-yellow p-6 rounded-xl text-white shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-2">🚀 İndi siz də qoşulun!</h4>
                    <p className="mb-4 text-white/90">
                      Bu qədər güclü sistem ilə öyrənməyə başlayın və fərqi hiss edin!
                    </p>
                  </div>
                  <div className="text-6xl">🔥</div>
                </div>
                <Button className="bg-white text-devcode-orange hover:bg-gray-100 font-semibold w-full mt-4">
                  Dərhal Başla - Pulsuz!
                </Button>
              </div>
            </div>
          </div>

          {/* All Features Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🔥 Hər şey bir yerdə - heç nə eksik deyil!
            </h3>
            <p className="text-xl text-gray-600">
              Şəkildə gördüyünüz kimi - bütün xüsusiyyətlər bir platformada birləşib!
            </p>
          </div>

          {/* Features Grid - Exactly like in the image */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">📱 Mobile App</h4>
                <p className="text-sm text-gray-600">
                  Mobil tətbiq ilə hər yerdə öyrənmək mümkündür
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">🎥 Live Training Management</h4>
                <p className="text-sm text-gray-600">
                  Canlı dərslər və real-time interaction
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">🎮 Interactive Training</h4>
                <p className="text-sm text-gray-600">
                  Interaktiv tapşırıqlar və gamification
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">📝 Exam</h4>
                <p className="text-sm text-gray-600">
                  Online imtahan sistemi və avtomatik qiymətləndirmə
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">💰 Course Sale</h4>
                <p className="text-sm text-gray-600">
                  Kurs satışı və ödəniş sistemləri
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-cyan-200">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-cyan-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">🏆 Gamification</h4>
                <p className="text-sm text-gray-600">
                  Oyun elementləri və mükafat sistemi
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">📊 Reporting</h4>
                <p className="text-sm text-gray-600">
                  Detallı hesabat və analitika
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <PenTool className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">📋 Assignments</h4>
                <p className="text-sm text-gray-600">
                  Smart tapşırıq sistemi və tracking
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">🎓 Certification</h4>
                <p className="text-sm text-gray-600">
                  Rəqəmsal sertifikat və blockchain doğrulama
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <PlayCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">⏯️ Watch Again</h4>
                <p className="text-sm text-gray-600">
                  Video təkrar izləmə və bookmark sistemi
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action - Super Impressive */}
          <div className="bg-gradient-to-r from-devcode-orange via-red-500 to-devcode-yellow rounded-2xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-devcode-orange via-red-500 to-devcode-yellow opacity-75 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-4xl font-bold mb-4">
                VAYYYY! Bu nə qədər güclü sistemdir! 
              </h3>
              <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
                DevCode LMS - Azərbaycanda ən müasir və tam təchiz olunmuş təhsil platforması! 
                Bütün xüsusiyyətlər bir yerdə, heç nə eksik deyil!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-white text-devcode-orange hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  🔥 İndi Qoşul - Tamamilə Pulsuz!
                </Button>
                <div className="text-white/90 text-sm">
                  ⚡ 30 saniyədə qeydiyyat • 💯 Pulsuz sınaq • 🎯 Dərhal başla
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold">10,000+</div>
                  <div className="text-white/80">Məmnun Tələbə</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-white/80">Ekspert Müəllim</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-white/80">Aktiv Kurs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}