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

  // Blog posts
  const blogPosts = [
    {
      title: "AI-POWERED GAME DESIGN",
      subtitle: "Övladınız bu yay ilk oyununu yaratmağa hazırdır?",
      gradient: "from-orange-500 to-red-500",
      date: "2025-01-02",
      readTime: "6-7 dəq oxuma vaxtı"
    },
    {
      title: "PROQRAMÇI AI-DAN QORXMALIDIR YOXSA ONUNLA ƏMƏKDAŞLIQ ETMƏLİDİR?",
      gradient: "from-blue-500 to-purple-500",
      date: "2025-06-25",
      readTime: "5-6 dəq oxuma vaxtı"
    },
    {
      title: "DATA ANALİTİKADA BİG DATA VS SMALL DATA:",
      subtitle: "Hansını seçək?",
      gradient: "from-pink-500 to-red-500",
      date: "2025-06-19",
      readTime: "4-7 dəq oxuma vaxtı"
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
                    
                    {/* Right Illustration */}
                    <div className="relative">
                      <div className="flex items-center justify-center">
                        {/* Animated 3D-style illustration */}
                        <div className="relative w-96 h-80 animate-floatSlow">
                          {/* Main platform/steps */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <div className="w-64 h-8 bg-gray-300 rounded-full opacity-20 blur-sm"></div>
                          </div>
                          
                          {/* Animated Steps */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-x-16 animate-bounceHorizontal">
                            <div className="w-32 h-6 bg-gray-200 rounded transform rotate-3 shadow-lg"></div>
                          </div>
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-x-8 animate-bounceHorizontal delay-100">
                            <div className="w-32 h-6 bg-gray-300 rounded transform -rotate-3 shadow-lg"></div>
                          </div>
                          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounceHorizontal delay-200">
                            <div className="w-32 h-6 bg-gray-400 rounded transform rotate-1 shadow-lg"></div>
                          </div>
                          
                          {/* Animated Flag */}
                          <div className="absolute top-8 right-16 animate-slowBounce">
                            <div className="w-1 h-32 bg-gray-400"></div>
                            <div className="absolute top-0 left-1 w-16 h-12 bg-devcode-orange rounded-r transform origin-left animate-flagWave"></div>
                          </div>
                          
                          {/* Animated Cloud */}
                          <div className="absolute top-4 left-8 animate-floatSlow delay-300">
                            <div className="w-24 h-16 bg-green-400 rounded-full shadow-lg"></div>
                            <div className="absolute -left-4 top-2 w-16 h-12 bg-green-400 rounded-full shadow-lg"></div>
                            <div className="absolute -right-2 top-4 w-12 h-8 bg-green-400 rounded-full shadow-lg"></div>
                          </div>
                          
                          {/* Animated decorative elements */}
                          <div className="absolute top-16 right-8 w-4 h-4 bg-devcode-yellow rounded-full animate-pulse shadow-lg"></div>
                          <div className="absolute bottom-20 left-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce shadow-lg"></div>
                          <div className="absolute top-32 left-24 w-2 h-2 bg-devcode-orange rounded-full animate-ping shadow-lg"></div>
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
            {/* Front-end Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* 3D Illustration matching reference */}
                  <div className="relative">
                    {/* Main card/screen */}
                    <div className="w-24 h-16 bg-white rounded-lg shadow-lg transform rotate-12 relative">
                      <div className="p-2">
                        <div className="w-4 h-4 bg-blue-400 rounded mb-1"></div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-200 rounded w-full"></div>
                          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                    {/* Code symbols */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">&lt;/&gt;</span>
                    </div>
                    <div className="absolute -bottom-2 right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-0 right-4 w-3 h-3 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Front-end əsası full stack
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Gələcəyin əsasını burada məzun olmuş müxtəssis.
                </p>
              </div>
            </div>

            {/* Back-end Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Server/Database illustration */}
                  <div className="relative">
                    {/* Server cylinder */}
                    <div className="w-16 h-20 bg-blue-600 rounded-xl relative shadow-lg">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-300 rounded-full"></div>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-300 rounded"></div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-300 rounded"></div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Back-end əsası full stack
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Hər yerin layihəsi əlbəttəki ən əsas adım olan dayaq.
                </p>
              </div>
            </div>

            {/* Graphic Design Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Design tools illustration */}
                  <div className="relative">
                    {/* Monitor/screen */}
                    <div className="w-20 h-14 bg-white rounded-lg shadow-lg relative">
                      <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-orange-200 rounded-lg p-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mb-1"></div>
                        <div className="space-y-1">
                          <div className="h-1 bg-orange-300 rounded w-full"></div>
                          <div className="h-1 bg-orange-300 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                    {/* Design elements */}
                    <div className="absolute -top-2 -right-1 w-4 h-4 bg-orange-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="absolute top-2 right-6 w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Qrafik Dizayn və Vizual Ko...
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Gələcəyin dizayn etməyə bu gündən kəçid.
                </p>
              </div>
            </div>

            {/* UX/UI Design Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Mobile/UI illustration */}
                  <div className="relative">
                    {/* Mobile frame */}
                    <div className="w-14 h-24 bg-white rounded-xl shadow-lg relative border-2 border-gray-200">
                      <div className="p-2 space-y-2">
                        <div className="h-1 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-orange-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                    {/* UI elements */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    UX/UI Dizayn
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Digital məlumat texriblərini hər kəsə...
                </p>
              </div>
            </div>

            {/* Digital Marketing Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* 3D Building illustration */}
                  <div className="relative">
                    {/* Building base */}
                    <div className="w-16 h-16 bg-gray-300 rounded-lg relative shadow-lg">
                      <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-500 rounded"></div>
                      <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-500 rounded"></div>
                      <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-500 rounded"></div>
                      <div className="absolute bottom-2 right-2 w-3 h-3 bg-yellow-500 rounded"></div>
                    </div>
                    {/* Roof */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-6 border-transparent border-b-yellow-500"></div>
                    {/* Decorative elements */}
                    <div className="absolute -top-1 -right-2 w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Digital Memariq və 3D
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Memarlıq və 3D dizaynlər əmin olun ki gələcək.
                </p>
              </div>
            </div>

            {/* 2D Motion Design Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Music/Motion illustration */}
                  <div className="relative">
                    {/* Speaker/audio */}
                    <div className="w-16 h-20 bg-gray-700 rounded-xl relative shadow-lg">
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full"></div>
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-500 rounded-full"></div>
                    </div>
                    {/* Music note */}
                    <div className="absolute -top-1 right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">♪</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    2D Motion Dizayn
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Yaradıcılıq harakətini qarışıq gətirif.
                </p>
              </div>
            </div>

            {/* Digital Marketing Professional Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Marketing/Analytics illustration */}
                  <div className="relative">
                    {/* Computer screen with chart */}
                    <div className="w-20 h-14 bg-white rounded-lg shadow-lg relative">
                      <div className="p-2">
                        <div className="w-full h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded flex items-end space-x-1">
                          <div className="w-2 h-4 bg-purple-500 rounded-t"></div>
                          <div className="w-2 h-6 bg-pink-500 rounded-t"></div>
                          <div className="w-2 h-3 bg-purple-400 rounded-t"></div>
                        </div>
                      </div>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Digital Marketing Professio...
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  Digital kampanyanızın avtarları.
                </p>
              </div>
            </div>

            {/* Cyber Security Course */}
            <div className="group cursor-pointer">
              <div className="relative mb-4">
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Security/Network illustration */}
                  <div className="relative">
                    {/* Shield/network */}
                    <div className="w-16 h-16 bg-green-500 rounded-lg relative shadow-lg transform rotate-45">
                      <div className="absolute inset-2 border-2 border-green-300 rounded"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    {/* Network nodes */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-300 rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-300 rounded-full"></div>
                    <div className="absolute top-2 right-4 w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Kiber Təhlükəsizlik
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">
                  kiber təhlükəsizlik nədir?
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

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bloq yazıları
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
                <div className={`h-48 bg-gradient-to-br ${post.gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-2 leading-tight">
                      {post.title}
                    </h3>
                    {post.subtitle && (
                      <p className="text-white/90 text-sm">
                        {post.subtitle}
                      </p>
                    )}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Yay tətiil ucağı üçün yeniz əylənərək devif, rəng də yaxi 
                    bacardıql ezəçməlik için çunki-çumunə fürsəti nizənsələr...
                  </p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full"
            >
              Daha çox
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}