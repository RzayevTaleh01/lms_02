import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  Clock,
  Users,
  Star,
  ChevronRight,
  Monitor,
  Database,
  Smartphone,
  PenTool,
  Award,
  Video,
  TrendingUp,
  Globe
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

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  // Course categories with 3D-style icons - matching landing page
  const courseCategories = [
    {
      id: "frontend",
      title: "Front-end əsası full stack",
      description: "Gələcəyin əsasını burada məzun olmuş siz bura müraciət edin",
      icon: <Monitor className="w-8 h-8 text-blue-500" />,
      gradient: "from-blue-100 to-purple-100",
      iconBg: "from-blue-500 to-purple-500",
      count: 12
    },
    {
      id: "backend",
      title: "Back-end əsası full stack",
      description: "Hər yerin layihəsi əlbəttəki ən əsas adım olan dayaq",
      icon: <Database className="w-8 h-8 text-green-500" />,
      gradient: "from-green-100 to-emerald-100",
      iconBg: "from-green-500 to-emerald-500",
      count: 8
    },
    {
      id: "design",
      title: "Qrafik Dizayn və Vizual Ko...",
      description: "Gələcəyin dizayn etməyə bu gündən kəçid",
      icon: <PenTool className="w-8 h-8 text-pink-500" />,
      gradient: "from-pink-100 to-red-100",
      iconBg: "from-pink-500 to-red-500",
      count: 15
    },
    {
      id: "uxui",
      title: "UX/UI Dizayn",
      description: "Digital məlumat texriblərini hər kəsə...",
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      gradient: "from-orange-100 to-yellow-100",
      iconBg: "from-orange-500 to-yellow-500",
      count: 10
    },
    {
      id: "3d",
      title: "Digital Memariq və 3D",
      description: "Memarlıq və 3D dizaynlər əmin olun ki gələcək",
      icon: <Award className="w-8 h-8 text-indigo-500" />,
      gradient: "from-indigo-100 to-purple-100",
      iconBg: "from-indigo-500 to-purple-500",
      count: 6
    },
    {
      id: "motion",
      title: "2D Motion Dizayn",
      description: "Yaradıcılıq harakətini qarışıq gətirif",
      icon: <Video className="w-8 h-8 text-yellow-500" />,
      gradient: "from-yellow-100 to-orange-100",
      iconBg: "from-yellow-500 to-orange-500",
      count: 7
    },
    {
      id: "marketing",
      title: "Digital Marketing Professio...",
      description: "Digital kampanyanızın avtarları",
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      gradient: "from-purple-100 to-pink-100",
      iconBg: "from-purple-500 to-pink-500",
      count: 9
    },
    {
      id: "cyber",
      title: "Kiber Təhlükəsizlik",
      description: "kiber təhlükəsizlik nədir?",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      gradient: "from-green-100 to-teal-100",
      iconBg: "from-green-600 to-teal-500",
      count: 4
    }
  ];

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Tədris proqramları
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Gələcəyin peşələrində mütəxəssis olmaq üçün lazım olan bütün bilik və bacarıqları əldə edin
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Kurs axtarın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base rounded-lg border-gray-200 focus:border-devcode-orange focus:ring-devcode-orange"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseCategories.map((category, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-md overflow-hidden cursor-pointer ${
                  selectedCategory === category.id ? 'ring-2 ring-devcode-orange' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? "all" : category.id)}
              >
                <div className="p-6">
                  {/* 3D Icon Container */}
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.iconBg} rounded-lg flex items-center justify-center shadow-lg`}>
                        {category.icon}
                      </div>
                    </div>
                    {/* Course count badge */}
                    <div className="absolute -top-2 -right-2 bg-devcode-yellow text-black text-xs font-bold px-2 py-1 rounded-full">
                      {category.count}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-3 flex justify-end">
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-devcode-orange transition-colors" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-md overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-6xl opacity-20">📚</div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700">
                        {course.level}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-devcode-yellow text-black">
                        {course.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-devcode-orange transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} tələbə</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {course.instructor}
                      </span>
                      <Link href={`/courses/${course.id}`}>
                        <Button size="sm" className="bg-devcode-orange hover:bg-devcode-orange/90 text-white">
                          Ətraflı
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl opacity-20 mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Heç bir kurs tapılmadı
              </h3>
              <p className="text-gray-600 mb-6">
                Axtarış kriteriyalarınızı dəyişərək yenidən cəhd edin
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
                variant="outline"
              >
                Filtrləri təmizlə
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}