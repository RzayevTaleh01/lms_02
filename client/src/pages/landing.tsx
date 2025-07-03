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
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  const featuredCourses = courses?.slice(0, 8) || [];

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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-devcode-yellow rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">Code Academy</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Gələcəyə buradan keç!
                <br />
                <span className="text-gray-900">#gələcəkburada</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Code Academy gələcək innovasiyaları bu gündən duyub ona uyğun 
                mütəxəssislər hazırlayan tədrəis müəssisəsidir.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-devcode-yellow hover:bg-devcode-yellow/90 text-black font-semibold px-8 py-3 rounded-lg text-base"
                >
                  Keçid et
                </Button>
              </div>
            </div>
            
            {/* Right Illustration */}
            <div className="relative">
              <div className="flex items-center justify-center">
                {/* Simple 3D-style illustration similar to the reference */}
                <div className="relative w-96 h-80">
                  {/* Main platform/steps */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-64 h-8 bg-gray-300 rounded-full opacity-20 blur-sm"></div>
                  </div>
                  
                  {/* Steps */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-x-16">
                    <div className="w-32 h-6 bg-gray-200 rounded transform rotate-3"></div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-x-8">
                    <div className="w-32 h-6 bg-gray-300 rounded transform -rotate-3"></div>
                  </div>
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-6 bg-gray-400 rounded transform rotate-1"></div>
                  </div>
                  
                  {/* Flag */}
                  <div className="absolute top-8 right-16">
                    <div className="w-1 h-32 bg-gray-400"></div>
                    <div className="absolute top-0 left-1 w-16 h-12 bg-devcode-orange rounded-r transform origin-left"></div>
                  </div>
                  
                  {/* Cloud */}
                  <div className="absolute top-4 left-8">
                    <div className="w-24 h-16 bg-green-400 rounded-full"></div>
                    <div className="absolute -left-4 top-2 w-16 h-12 bg-green-400 rounded-full"></div>
                    <div className="absolute -right-2 top-4 w-12 h-8 bg-green-400 rounded-full"></div>
                  </div>
                  
                  {/* Small decorative elements */}
                  <div className="absolute top-16 right-8 w-4 h-4 bg-devcode-yellow rounded-full"></div>
                  <div className="absolute bottom-20 left-4 w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="absolute top-32 left-24 w-2 h-2 bg-devcode-orange rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tədris proqramları
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {courseCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg overflow-hidden">
                <div className="p-8">
                  {/* 3D Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                        {category.icon}
                      </div>
                    </div>
                    {/* Floating decorative elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-devcode-yellow rounded-full opacity-80"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-4 flex justify-end">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                  </div>
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