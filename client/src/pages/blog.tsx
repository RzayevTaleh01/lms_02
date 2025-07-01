import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen, User, MessageCircle } from "lucide-react";

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  // Mock blog posts for demonstration since there's no real data
  const mockPosts = [
    {
      id: 1,
      title: "JavaScript ES2024: Yeni Xüsusiyyətlər və İmkanlar",
      content: "JavaScript dilinin ən son versiyasında əlavə edilən yeni xüsusiyyətlər haqqında ətraflı məlumat və praktik nümunələr.",
      excerpt: "ES2024-də əlavə edilən Array.prototype.toSorted(), Object.groupBy() və digər yeni xüsusiyyətləri öyrənin.",
      category: "JavaScript",
      author: { firstName: "Fərid", lastName: "Əliyev" },
      createdAt: "2024-12-20",
      readTime: "8 dəqiqə"
    },
    {
      id: 2,
      title: "React 18 Concurrent Features ilə Performans Artırma",
      content: "React 18-də təqdim edilən Concurrent Features-ları istifadə edərək tətbiqinizin performansını necə artıra biləcəyinizi öyrənin.",
      excerpt: "useTransition, useDeferredValue və Suspense ilə daha yaxşı user experience yaradın.",
      category: "React",
      author: { firstName: "Leyla", lastName: "Hacıyeva" },
      createdAt: "2024-12-18",
      readTime: "12 dəqiqə"
    },
    {
      id: 3,
      title: "Node.js 20: Performance və Security Yeniləmələri",
      content: "Node.js 20 versiyasında gələn yeni security xüsusiyyətləri və performance təkmilləşdirmələri haqqında.",
      excerpt: "Node.js 20-də Test Runner, Single Executable Applications və digər yeni imkanlar.",
      category: "Node.js",
      author: { firstName: "Əli", lastName: "Məmmədov" },
      createdAt: "2024-12-15",
      readTime: "10 dəqiqə"
    },
    {
      id: 4,
      title: "2024-də Öyrənməli Olduğunuz Top 5 Backend Texnologiyası",
      content: "Backend development sahəsində ən populyar və perspektivli texnologiyalar haqqında təfərrüatlı bələdçi.",
      excerpt: "Express.js, FastAPI, Spring Boot, Django və ASP.NET Core - hansını seçmək lazımdır?",
      category: "Backend",
      author: { firstName: "Nigar", lastName: "Qasımova" },
      createdAt: "2024-12-12",
      readTime: "15 dəqiqə"
    },
    {
      id: 5,
      title: "Clean Code Prinsipləri: Oxunaqlı Kod Yazmaq Sənəti",
      content: "Kod keyfiyyətini artırmaq və komanda işini asanlaşdırmaq üçün Clean Code prinsiplərinin tətbiqi.",
      excerpt: "Robert Martin-in Clean Code kitabından praktik məsləhətlər və real nümunələr.",
      category: "Best Practices",
      author: { firstName: "Rəşad", lastName: "İbrahimov" },
      createdAt: "2024-12-10",
      readTime: "7 dəqiqə"
    },
    {
      id: 6,
      title: "AI və Machine Learning: Proqramçılar üçün Giriş",
      content: "Süni zəka və maşın öyrənməsi sahəsində proqramçıların bilməli olduğu əsas anlayışlar.",
      excerpt: "Python, TensorFlow və PyTorch ilə machine learning-ə ilk addımlar.",
      category: "AI/ML",
      author: { firstName: "Günay", lastName: "Həsənova" },
      createdAt: "2024-12-08",
      readTime: "20 dəqiqə"
    }
  ];

  // Use mock posts if no real posts exist
  const displayPosts = posts.length > 0 ? posts : mockPosts;

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
      <section className="bg-gradient-to-br from-gray-900 via-orange-900 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img 
              src="/assets/devcode_1751389375943.png" 
              alt="DevCode Academy" 
              className="w-12 h-12"
            />
            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2">
              📝 Texnoloji Bloq
            </Badge>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              DevCode
            </span>
            <br />
            <span className="text-3xl lg:text-4xl text-blue-200">
              Texnoloji Bloq
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Proqramlaşdırma trendləri, <strong className="text-orange-300">hibrid təhsil metodları</strong> və 
            <strong className="text-blue-300">rəqəmsal texnologiyalar</strong> haqqında ekspert təhlilləri və tutorial-lar.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {displayPosts[0] && (
          <Card className="mb-12 border-0 shadow-2xl overflow-hidden">
            <div className="lg:flex">
              <div className="lg:w-1/2 h-64 lg:h-96 bg-gradient-to-br from-blue-600 to-purple-700 relative">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-6 left-6">
                  <Badge className="bg-orange-500 text-white">
                    ⭐ Seçilmiş Məqalə
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-white/20 text-white mb-3">
                    {displayPosts[0].category}
                  </Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {displayPosts[0].title}
                  </h2>
                </div>
              </div>
              <CardContent className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(displayPosts[0].createdAt).toLocaleDateString('az-AZ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{displayPosts[0].readTime}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {displayPosts[0].excerpt}
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {displayPosts[0].author?.firstName?.charAt(0) || 'D'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {displayPosts[0].author?.firstName} {displayPosts[0].author?.lastName}
                    </div>
                    <div className="text-sm text-gray-500">Senior Developer & Instructor</div>
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Məqaləni Oxu
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Kategoriyalar</h3>
          <div className="flex flex-wrap gap-3">
            {["Hamısı", "JavaScript", "React", "Node.js", "Backend", "Best Practices", "AI/ML"].map((category) => (
              <Badge 
                key={category}
                variant={category === "Hamısı" ? "default" : "secondary"}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  category === "Hamısı" 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Son Məqalələr</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span>{displayPosts.length} məqalə</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.slice(1).map((post: any) => (
              <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-indigo-900">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-200 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.createdAt).toLocaleDateString('az-AZ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm">
                          {post.author?.firstName?.charAt(0) || 'D'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.author?.firstName} {post.author?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">Instructor</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="group-hover:bg-blue-50">
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Bloq Xəbərlərini Qaçırmayın</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Yeni məqalələr, tutorial-lar və proqramlaşdırma trendləri haqqında 
              xəbərlər almaq üçün abunə olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="E-mail ünvanınız"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 border-0"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Abunə Ol
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}