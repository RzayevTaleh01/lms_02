import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  Clock,
  User,
  Calendar,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Blog posts with colorful gradient cards - matching your reference
  const blogPosts = [
    {
      id: 1,
      title: "AI-POWERED GAME DESIGN",
      subtitle: "Övladınız bu yay ilk oyununu yaratmağa hazırdır?",
      content: "Yay tətiil ucağı üçün yeniz əylənərək devif, rəng də yaxi bacardıql ezəçməlik için çunki-çumunə fürsəti nizənsələr. Künstlich intellekt və oyun dizaynı sahəsində yeni yanaşmalar...",
      gradient: "from-orange-500 to-red-500",
      date: "2025-01-02",
      readTime: "6-7 dəq oxuma vaxtı",
      category: "AI & Technology",
      author: "Code Academy"
    },
    {
      id: 2,
      title: "PROQRAMÇI AI-DAN QORXMALIDIR YOXSA ONUNLA ƏMƏKDAŞLIQ ETMƏLİDİR?",
      content: "Texnologiya sürtü inkişaf etməyə davam edir. Bu dəyişim mərkəzində AI-nin intellekt və proqramçılara qarşı doyar. Proqramçı AI-dən qorxmalı yoxsa onunla əməkdaşlıq etməlidir?",
      gradient: "from-blue-500 to-purple-500",
      date: "2025-06-25",
      readTime: "5-6 dəq oxuma vaxtı",
      category: "AI & Technology",
      author: "Code Academy"
    },
    {
      id: 3,
      title: "DATA ANALİTİKADA BİG DATA VS SMALL DATA:",
      subtitle: "Hansını seçək?",
      content: "Effektiv Data Analitika yapmasında təlxica malümat toplanması dərəl, döğru malümat bəşakəsi istifadə etməklə. Big Data vs Small Data: Hansını seçmək nə dərə mahiyyətlidir?",
      gradient: "from-pink-500 to-red-500",
      date: "2025-06-19",
      readTime: "4-7 dəq oxuma vaxtı",
      category: "Data Science",
      author: "Code Academy"
    },
    {
      id: 4,
      title: "UX/UI DIZAYNDA MODERN TRENDLƏRİ",
      subtitle: "2025-ci ildə nə gözləyir?",
      content: "İstifadəçi təcrübəsi və interfeys dizaynında ən son trendlər. Minimalizm, dark mode, micro-interactions və digər müasir yanaşmalar haqqında ətraflı məlumat.",
      gradient: "from-green-500 to-teal-500",
      date: "2025-05-15",
      readTime: "8-10 dəq oxuma vaxtı",
      category: "Design",
      author: "Code Academy"
    },
    {
      id: 5,
      title: "FULLSTACK DEVELOPER NECƏ OLUNUR?",
      subtitle: "Tam təlimat və roadmap",
      content: "Frontend və backend texnologiyalarını öyrənmək üçün addım-addım təlimat. React, Node.js, verilənlər bazası və digər vacib bacarıqlar haqqında.",
      gradient: "from-purple-500 to-indigo-500",
      date: "2025-04-28",
      readTime: "12-15 dəq oxuma vaxtı",
      category: "Development",
      author: "Code Academy"
    },
    {
      id: 6,
      title: "KIBER TƏHLÜKƏSİZLİK: NƏ BİLMƏLİYİK?",
      subtitle: "Əsaslar və təhlükələr",
      content: "Rəqəmsal dünyada özümüzü necə qoruyaq? Kiber təhlükəsizlik əsasları, ümumi təhlükələr və qorunma yolları haqqında faydalı məlumatlar.",
      gradient: "from-red-500 to-pink-500",
      date: "2025-04-10",
      readTime: "6-8 dəq oxuma vaxtı",
      category: "Security",
      author: "Code Academy"
    }
  ];

  const categories = [
    { id: "all", name: "Hamısı", count: blogPosts.length },
    { id: "AI & Technology", name: "AI və Texnologiya", count: 2 },
    { id: "Data Science", name: "Data Science", count: 1 },
    { id: "Design", name: "Dizayn", count: 1 },
    { id: "Development", name: "Proqramlaşdırma", count: 1 },
    { id: "Security", name: "Təhlükəsizlik", count: 1 }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Bloq yazıları
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Texnologiya, proqramlaşdırma və dizayn sahəsində ən son məqalələr və faydalı məşvərətlər
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Məqalə axtarın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base rounded-lg border-gray-200 focus:border-devcode-orange focus:ring-devcode-orange"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-2 text-sm ${
                  selectedCategory === category.id
                    ? "bg-devcode-orange hover:bg-devcode-orange/90 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
                  <div className={`h-48 bg-gradient-to-br ${post.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                      <h3 className="font-bold text-lg mb-2 leading-tight">
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
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      
                      <Link href={`/blog/${post.id}`}>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-devcode-orange hover:text-devcode-orange/80 p-0 h-auto font-medium"
                        >
                          Oxu <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl opacity-20 mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Heç bir məqalə tapılmadı
              </h3>
              <p className="text-gray-600 mb-6">
                Axtarış kriteriyalarınızı dəyişərək yenidən cəhd edin
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                variant="outline"
              >
                Filtrləri təmizlə
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Yeniliklərdən xəbərdar olun
          </h3>
          <p className="text-gray-600 mb-8">
            Texnologiya sahəsindəki ən son məqalələr və xəbərləri birbaşa e-mail ünvanınıza göndərək
          </p>
          
          <div className="flex max-w-md mx-auto gap-3">
            <Input
              placeholder="E-mail ünvanınız"
              className="flex-1"
            />
            <Button className="bg-devcode-orange hover:bg-devcode-orange/90 text-white">
              Abunə ol
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}