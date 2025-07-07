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
      description: "DevCode Akademiya gələcək innovasiyaları bu gündən duyub ona uyğun mütəxəssislər hazırlayan tədris müəssisəsidir.",
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
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20 flex gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-devcode-yellow' 
                  : 'bg-devcode-yellow/50 hover:bg-devcode-yellow/70'
              }`}
            >
              {currentSlide === index && (
                <div className="absolute inset-0 rounded-full border-2 border-white animate-fillProgress"></div>
              )}
            </button>
          ))}
        </div>

        {/* Slides */}
        <div className="relative h-[400px] sm:h-[450px] lg:h-[550px]">
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
              <div className={`pt-6 sm:pt-12 md:pt-16 lg:pt-20 pb-6 sm:pb-10 md:pb-12 lg:pb-16 h-full ${slide.bgColor}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                  <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center h-full">
                    {/* Left Content */}
                    <div className="transform transition-all duration-700 delay-200">
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <div className="w-2 h-2 bg-devcode-yellow rounded-full animate-pulse"></div>
                      </div>

                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                        <span className="inline-block animate-fadeInUp">{slide.title}</span>
                        <br />
                        <span className="text-gray-900 inline-block animate-fadeInUp delay-100">{slide.subtitle}</span>
                      </h1>

                      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-lg leading-relaxed animate-fadeInUp delay-200">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeInUp delay-300">
                        <Button 
                          size="lg" 
                          className="bg-devcode-yellow hover:bg-devcode-yellow/90 text-black font-semibold px-8 py-3 rounded-lg text-base transform hover:scale-105 transition-all duration-200"
                        >
                          {slide.buttonText}
                        </Button>
                      </div>
                    </div>

                    {/* Right Illustration - Programming Theme */}
                    <div className="relative hidden lg:block">
                      <div className="flex items-center justify-center">
                        {/* Programming themed illustration */}
                        <div className="relative w-72 xl:w-96 h-64 xl:h-80 animate-floatSlow">
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

      {/* Programming Courses */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="bg-gradient-to-r from-devcode-orange to-devcode-yellow bg-clip-text text-transparent text-base md:text-lg font-semibold mb-4 block">
              Proqramlaşdırma Kursları
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Tədris proqramları
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Sıfırdan professional səviyyəyə qədər. Real layihələr və təcrübəli mentorlar ilə öyrənin.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* JavaScript Course */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative p-6 md:p-8">
                {/* Course Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-4">
                  ⭐ Populyar
                </div>

                {/* Course Icon */}
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg md:text-xl">JS</span>
                </div>

                {/* Course Content */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  JavaScript Fundamentals
                </h3>

                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                  Web development üçün ən vacib dil. DOM manipulation, ES6+, Async/Await və daha çox.
                </p>

                {/* Course Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>12 həftə intensiv proqram</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>5+ real layihə</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Portfolio yaradılması</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-gray-900">4</span>
                    <span className="text-gray-500 text-sm ml-1">/ay</span>
                  </div>
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 px-4 md:px-6 py-2 rounded-xl text-sm md:text-base">
                    Başla
                  </Button>
                </div>
              </div>
            </div>

            {/* React Course */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative p-8">
                {/* Course Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                  🚀 Advanced
                </div>

                {/* Course Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                  <span className="text-white font-bold text-lg">React</span>
                  <div className="absolute inset-0 border-2 border-cyan-300 rounded-2xl opacity-60 animate-pulse"></div>
                </div>

                {/* Course Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  React Development
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Modern frontend framework. Components, Hooks, Context API, Redux və React Router.
                </p>

                {/* Course Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>10 həftə intensive bootcamp</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>3+ SPA layihələri</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Redux & State management</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">4</span>
                    <span className="text-gray-500 text-sm ml-1">/ay</span>
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 px-6 py-2 rounded-xl">
                    Başla
                  </Button>
                </div>
              </div>
            </div>

            {/* Node.js Course */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative p-8">
                {/* Course Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
                  🔥 Backend
                </div>

                {/* Course Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">NODE</span>
                </div>

                {/* Course Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Node.js Backend
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Server-side JavaScript. Express.js, MongoDB, PostgreSQL, RESTful APIs və Authentication.
                </p>

                {/* Course Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>14 həftə backend mastery</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>API development</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Database integration</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">4</span>
                    <span className="text-gray-500 text-sm ml-1">/ay</span>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-6 py-2 rounded-xl">
                    Başla
                  </Button>
                </div>
              </div>
            </div>

            {/* Full-Stack Course */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-transparent hover:border-orange-200">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative p-8">
                {/* Course Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-devcode-orange to-devcode-yellow mb-4">
                  👑 Premium
                </div>

                {/* Course Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-white font-bold text-xs text-center">
                    <div>FULL</div>
                    <div>STACK</div>
                  </div>
                </div>

                {/* Course Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Full-Stack MERN
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  MongoDB, Express, React, Node.js - tam stack development. 0-dan Senior səviyyəyə.
                </p>

                {/* Course Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>24 həftə complete program</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>10+ real world layihələr</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">8</span>
                    <span className="text-gray-500 text-sm ml-1">/ay</span>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-xl">
                    Başla
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Mobile Development Course */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative p-8">
                {/* Course Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-4">
                  📱 Mobile
                </div>

                {/* Course Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>

                {/* Course Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  React Native & Flutter
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cross-platform mobile development. iOS və Android üçün app yaradın.
                </p>
                
                {/* Course Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>18 həftə mobil mastery</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>App Store deployment</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Native module integration</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">6</span>
                    <span className="text-gray-500 text-sm ml-1">/ay</span>
                  </div>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 px-6 py-2 rounded-xl">
                    Başla
                  </Button>
                </div>
              </div>
            </div>
          </div>
    
        </div>
      </section>

      {/* DevCode LMS Enterprise Showcase */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-lg font-semibold mb-4 block">
              DevCode LMS Platform
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Peşəkar Öyrənmə İdarəetmə Sistemi
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              25+ məlumat cədvəli, tam avtomatlaşdırılmış kurs idarəetməsi və real zamanda analitika ilə 
              institutunuz üçün enterprise səviyyəli LMS həlli
            </p>
          </div>

          {/* System Architecture Overview */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Sistem Arxitekturası və Texniki Üstünlüklər
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Modern TypeScript/React/PostgreSQL texnologiyaları əsasında qurulmuş, tam avtomatlaşdırılmış və scalable həll
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Technical Specs */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Məlumat Bazası İnfruktukturu</h4>
                      <p className="text-gray-600">PostgreSQL əsaslı enterprise həll</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-blue-600">25+</p>
                      <p className="text-sm text-gray-600">Məlumat Cədvəli</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-green-600">100%</p>
                      <p className="text-sm text-gray-600">Type Safety</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-purple-600">3</p>
                      <p className="text-sm text-gray-600">İstifadəçi Rolu</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-orange-600">∞</p>
                      <p className="text-sm text-gray-600">Scalability</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Real-time Funksiyalar</h4>
                      <p className="text-gray-600">Canlı izləmə və avtomatlaşdırma</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Live lesson sessions və attendance tracking</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Real-time progress monitoring və analytics</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Automated certificate generation</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Instant assignment feedback system</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right: Advanced Dashboard Mockup */}
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 transform hover:scale-105 transition-all duration-500">
                  {/* Browser Header */}
                  <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-3 py-1 ml-4">
                      <span className="text-xs text-gray-500">admin.devcode.lms</span>
                    </div>
                  </div>

                  {/* Admin Dashboard Content */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Admin Panel</h3>
                        <p className="text-sm text-gray-600">Enterprise LMS İdarəetmə</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* System Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                        <p className="text-2xl font-bold">1,247</p>
                        <p className="text-xs opacity-90">Aktiv Tələbələr</p>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
                        <p className="text-2xl font-bold">89</p>
                        <p className="text-xs opacity-90">Canlı Kurslar</p>
                      </div>
                    </div>

                    {/* Live Activity Feed */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">Real-time Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 bg-green-50 rounded-lg p-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">15 tələbə assignment göndərdi</p>
                            <p className="text-xs text-gray-500">2 dəqiqə əvvəl</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-blue-50 rounded-lg p-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">Yeni sertifikat yaradıldı</p>
                            <p className="text-xs text-gray-500">5 dəqiqə əvvəl</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* System Performance */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Sistem Performance</span>
                        <span className="text-xs text-green-600">99.9% Uptime</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-11/12"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  🚀 Enterprise Ready
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  🔒 Bank-level Security
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Features Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Enterprise-level LMS Funksiyalar
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tam avtomatlaşdırılmış kurs idarəetməsi, real zamanda analitika və professional sertifikat sistemi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Course Engine */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Kurs Engine</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Unlimited course creation</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Video streaming integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Rich content editor (CKEditor)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Hierarchical lesson structure</li>
                </ul>
              </div>

              {/* Assignment System */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Assignment Engine</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Rich text assignments</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />File upload support</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />GitHub integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Automated grading workflow</li>
                </ul>
              </div>

              {/* Analytics */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Real-time Analytics</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Student progress tracking</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Performance dashboards</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Attendance monitoring</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Comprehensive reporting</li>
                </ul>
              </div>

              {/* Certificate System */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Certificate System</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Automatic generation</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Unique ID verification</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Public verification portal</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Digital signatures</li>
                </ul>
              </div>

              {/* User Management */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">User Management</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />3-level role system</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Replit Auth integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Session management</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Access control</li>
                </ul>
              </div>

              {/* Content Management */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Content Management</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Blog system integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Material organization</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Media management</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Version control</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              DevCode LMS - Müəssisəniz üçün hazır həll
            </h3>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              25+ məlumat cədvəli, tam avtomatlaşdırma və enterprise səviyyəli təhlükəsizlik ilə 
              təhsil müəssisənizi növbəti səviyyəyə çatdırın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                Demo tələb edin
              </Button>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl">
                Texniki məlumat
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}