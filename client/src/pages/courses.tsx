import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Users, Star, Clock, ArrowRight, Filter } from "lucide-react";

export default function Courses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ["/api/enrollments"],
    enabled: !!user && user.role === "student",
  });

  const enrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      if (!response.ok) throw new Error("Failed to enroll");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      toast({ title: "Uğurla qeydiyyatdan keçdiniz!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Qeydiyyat zamanı xəta baş verdi", variant: "destructive" });
    }
  });

  const isEnrolled = (courseId: number) => {
    return enrollments.some((enrollment: any) => enrollment.courseId === courseId);
  };

  const handleEnroll = (courseId: number) => {
    if (!user) {
      toast({ title: "Giriş Tələb Olunur", description: "Kursa qeydiyyat üçün daxil olun", variant: "destructive" });
      return;
    }
    if (user.role !== "student") {
      toast({ title: "Giriş Rədd Edildi", description: "Yalnız tələbələr kurslara qeydiyyat keçə bilər", variant: "destructive" });
      return;
    }
    enrollMutation.mutate(courseId);
  };

  const filteredCourses = courses.filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-900 hover:bg-blue-200">
            🎓 Kurs Kataloqu
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Proqramlaşdırma Kursları</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Sənaye ekspertləri tərəfindən hazırlanmış kurslarımızla proqramlaşdırma 
            səyahətinizə başlayın və karyeranızı növbəti səviyyəyə qaldırın.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Kursları Filtrləyin</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Kurs axtarın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Kateqoriya" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Bütün Kateqoriyalar</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Səviyyə" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Bütün Səviyyələr</SelectItem>
                <SelectItem value="beginner">Başlanğıc</SelectItem>
                <SelectItem value="intermediate">Orta</SelectItem>
                <SelectItem value="advanced">İrəli</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredCourses.length}</span> kurs tapıldı
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BookOpen className="w-4 h-4" />
            <span>Ən yaxşı kurslarımız</span>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 && courses.length === 0 ? (
          // Show placeholder courses when no real data
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className="bg-white/90 text-blue-900">
                      Başlanğıc
                    </Badge>
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-900">4.8</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-lg">
                      {index === 0 && "JavaScript Fundamentals"}
                      {index === 1 && "React Development"}
                      {index === 2 && "Node.js Backend"}
                      {index === 3 && "Python Programming"}
                      {index === 4 && "Vue.js Framework"}
                      {index === 5 && "Full-Stack Development"}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {index === 0 && "JavaScript proqramlaşdırma dilinin əsaslarını öyrənin və müasir web development-ə giriş edin."}
                    {index === 1 && "React kitabxanası ilə interaktiv və müasir web tətbiqləri hazırlamağı öyrənin."}
                    {index === 2 && "Node.js ilə güçlü backend sistemləri və API-lər yaratmağı öyrənin."}
                    {index === 3 && "Python proqramlaşdırma dili ilə data science və web development öyrənin."}
                    {index === 4 && "Vue.js framework-u ilə progressive web applications yaradın."}
                    {index === 5 && "Frontend və backend texnologiyaları ilə tam funksional web tətbiqləri yaradın."}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>120+ tələbə</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>8 həftə</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      Qeydiyyatdan Keç
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      Ətraflı Məlumat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Heç bir kurs tapılmadı</h3>
            <p className="text-gray-600 mb-6">
              Axtarış meyarlarınızı dəyişdirə və ya bütün kursları görə bilərsiniz.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setLevelFilter("all");
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Filtrlər Sıfırla
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: any) => (
              <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className="bg-white/90 text-blue-900">
                      {course.level === 'beginner' ? 'Başlanğıc' : course.level === 'intermediate' ? 'Orta' : 'İrəli'}
                    </Badge>
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-900">4.8</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-lg">
                      {course.title}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.shortDescription || course.description || "Bu kursda müasir proqramlaşdırma texnologiyalarını öyrənəcək və real layihələr üzərində işləyəcəksiniz."}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{course.enrollmentCount || 120}+ tələbə</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration || '8 həftə'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {user && user.role === "student" && !isEnrolled(course.id) && (
                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrollMutation.isPending}
                      >
                        {enrollMutation.isPending ? "Qeydiyyat..." : "Qeydiyyatdan Keç"}
                      </Button>
                    )}
                    
                    {user && user.role === "student" && isEnrolled(course.id) && (
                      <Badge className="w-full justify-center py-2 bg-green-100 text-green-800">
                        ✓ Qeydiyyatdan keçdiniz
                      </Badge>
                    )}
                    
                    <Link href={`/course/${course.id}`}>
                      <Button variant="outline" className="w-full">
                        Ətraflı Məlumat
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
