import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CourseCard from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Courses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-devcode-dark mb-4">All Courses</h1>
          <p className="text-devcode-gray text-lg">
            Explore our comprehensive catalog of programming courses designed to take you from beginner to expert.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-devcode-gray h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="min-w-[150px]">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-[120px]">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-devcode-dark mb-2">Kurs tapılmadı</h3>
            <p className="text-devcode-gray">
              {searchTerm || categoryFilter !== "all" || levelFilter !== "all" 
                ? "Axtarış şərtlərini dəyişdirərək daha çox kurs görə bilərsiniz."
                : "Kurslar platforma əlavə edildikdən sonra burada görünəcək."
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: any) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-devcode-orange to-orange-600 relative">
                  {course.imageUrl ? (
                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-6xl text-white opacity-20">📚</div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                      {course.level === 'beginner' ? 'Başlanğıc' : course.level === 'intermediate' ? 'Orta' : 'İrəli'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-devcode-gray">{course.category}</span>
                    <span className="text-lg font-bold text-devcode-orange">{course.price} AZN</span>
                  </div>
                  <h3 className="text-xl font-semibold text-devcode-dark mb-2">{course.title}</h3>
                  <p className="text-devcode-gray text-sm mb-4 line-clamp-2">{course.shortDescription || course.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-devcode-gray">👥 {course.enrollmentCount || 0} tələbə</span>
                    <span className="text-sm text-devcode-gray">⏱️ {course.duration}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.location.href = `/courses/${course.id}`}
                    >
                      Ətraflı
                    </Button>
                    {user?.role === "student" && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-devcode-orange hover:bg-orange-600"
                        onClick={() => handleEnroll(course.id)}
                        disabled={isEnrolled(course.id) || enrollMutation.isPending}
                      >
                        {isEnrolled(course.id) ? "Qeydiyyatdan Keçmişsiniz" : enrollMutation.isPending ? "Qeydiyyat..." : "Qeydiyyat"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
