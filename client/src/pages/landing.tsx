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

  const featuredCourses = courses?.slice(0, 3) || [];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Modern JavaScript Development",
      subtitle: "ES6+, Async/Await, Modules",
      bgColor: "from-yellow-400 to-orange-500",
      icon: "💻",
      code: `// Modern JavaScript
const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};`
    },
    {
      id: 2,
      title: "React & Component Architecture",
      subtitle: "Hooks, Context, State Management",
      bgColor: "from-blue-400 to-cyan-500",
      icon: "⚛️",
      code: `// React Component
const App = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return <div>...</div>;
};`
    },
    {
      id: 3,
      title: "Full-Stack Development",
      subtitle: "Node.js, Express, Database",
      bgColor: "from-green-400 to-teal-500",
      icon: "🌐",
      code: `// Express Server
app.get('/api/courses', async (req, res) => {
  const courses = await db.courses.findAll();
  res.json(courses);
});`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Slider */}
      <section className="relative overflow-hidden">
        <div className="relative h-[600px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`h-full bg-gradient-to-r ${slide.bgColor} flex items-center justify-center`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white">
                      <div className="text-6xl mb-6">{slide.icon}</div>
                      <h1 className="text-5xl font-bold mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-xl mb-8 text-white/90">
                        {slide.subtitle}
                      </p>
                      <div className="flex gap-4">
                        <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
                          Kursları Kəşf Et
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold">
                          Demo İzlə
                        </Button>
                      </div>
                    </div>
                    
                    {/* Right Code Preview */}
                    <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-400 text-sm ml-4">coding-adventure.js</span>
                      </div>
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{slide.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide Navigation */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Course Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proqramlaşdırma Proqramları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sıfırdan professional developer olana qədər - hər səviyyə üçün kurlar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* JavaScript Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-white text-2xl font-bold">JS</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">JavaScript Mastery</h3>
              <p className="text-gray-600 text-sm mb-4">
                Modern JavaScript, ES6+, Async/Await, və daha çox
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Beginner</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">40 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white">
                Kursa Başla
              </Button>
            </div>

            {/* React Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-white text-2xl">⚛️</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">React Development</h3>
              <p className="text-gray-600 text-sm mb-4">
                Hooks, Context API, Redux və modern React patterns
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Intermediate</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">35 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white">
                Kursa Başla
              </Button>
            </div>

            {/* Node.js Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-white text-2xl">🟢</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Node.js Backend</h3>
              <p className="text-gray-600 text-sm mb-4">
                Server-side JavaScript, Express.js və API development
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Intermediate</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">45 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white">
                Kursa Başla
              </Button>
            </div>

            {/* Full Stack Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-white text-2xl">🌐</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full-Stack Development</h3>
              <p className="text-gray-600 text-sm mb-4">
                React + Node.js, Database integration və deployment
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Advanced</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">60 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white">
                Kursa Başla
              </Button>
            </div>

            {/* Python Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-white text-2xl">🐍</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Python Programming</h3>
              <p className="text-gray-600 text-sm mb-4">
                Django, Flask, Data Science və Machine Learning
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Beginner</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">50 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                Kursa Başla
              </Button>
            </div>

            {/* Database Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Database & SQL</h3>
              <p className="text-gray-600 text-sm mb-4">
                PostgreSQL, MySQL, Database Design və optimization
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Intermediate</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">30 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white">
                Kursa Başla
              </Button>
            </div>

            {/* Mobile App Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile App Development</h3>
              <p className="text-gray-600 text-sm mb-4">
                React Native, Flutter, iOS və Android development
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Advanced</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">55 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white">
                Kursa Başla
              </Button>
            </div>

            {/* DevOps Course */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">DevOps & Cloud</h3>
              <p className="text-gray-600 text-sm mb-4">
                Docker, Kubernetes, AWS, CI/CD pipelines
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 mr-2">Advanced</span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1">40 saat</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white">
                Kursa Başla
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DevCode LMS Interactive Showcase */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              🚀 DevCode LMS Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gələcəyin təhsil platforması - AI ilə gücləndirilmiş, real-time analitika və 
              tələbələrin sevəcəyi interaktiv xüsusiyyətlərlə dolu!
            </p>
          </div>

          {/* Interactive Demo Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Side - Live Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser-style header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600 mx-4">
                    devcode-lms.live/dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                  {/* User Welcome */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Salam, Əli! 👋</h3>
                      <p className="text-gray-600">Bugün 3 yeni dərsiniz var</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                  </div>

                  {/* Progress Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 rounded-xl text-white">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm opacity-90">Aktiv Kurs</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 rounded-xl text-white">
                      <div className="text-2xl font-bold">89%</div>
                      <div className="text-sm opacity-90">Tamamlanma</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-4 rounded-xl text-white">
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-sm opacity-90">Sertifikat</div>
                    </div>
                  </div>

                  {/* Active Course */}
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-5 text-white mb-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg">React Development</h4>
                        <p className="text-sm opacity-90">Dərs 12: Advanced Hooks</p>
                        <div className="mt-3 bg-white/20 rounded-full h-2 w-40">
                          <div className="bg-white rounded-full h-2 w-32 animate-pulse"></div>
                        </div>
                        <p className="text-xs mt-1 opacity-90">80% tamamlanıb</p>
                      </div>
                      <PlayCircle className="w-14 h-14 text-white hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4 border border-indigo-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <h5 className="font-semibold text-gray-900">AI Tövsiyələri</h5>
                    </div>
                    <p className="text-sm text-gray-700">
                      Performansınıza əsasən, Redux State Management kursunu tövsiyə edirik
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                🏆 Ən Yaxşı Student
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                ⚡ 7 gün streak
              </div>
            </div>

            {/* Right Side - Feature Highlights */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  💎 Niyə DevCode LMS?
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Sadə LMS deyil - tələbələrin sevəcəyi, AI ilə gücləndirilmiş, 
                  real-time progress tracking olan super platform!
                </p>
              </div>

              <div className="space-y-6">
                {/* AI-Powered Learning */}
                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🤖 AI Şəxsi Müəllim</h4>
                    <p className="text-gray-600">
                      Hər tələbə üçün fərdi öyrənmə planı, real-time performans analizi və 
                      AI-powered tövsiyələr - sanki şəxsi coach!
                    </p>
                  </div>
                </div>

                {/* Gamification */}
                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🎮 Oyun kimi Öyrənmə</h4>
                    <p className="text-gray-600">
                      XP points, achievements, leaderboards və streak sistemi - 
                      tələbələr coding-i oyun kimi sevirlər!
                    </p>
                  </div>
                </div>

                {/* Live Coding */}
                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">💻 Canlı Kod Yazma</h4>
                    <p className="text-gray-600">
                      Real-time code editor, instant feedback, collaborative coding və 
                      GitHub integration - həqiqi developer təcrübəsi!
                    </p>
                  </div>
                </div>

                {/* Social Learning */}
                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">👥 Social Learning</h4>
                    <p className="text-gray-600">
                      Study groups, peer code review, team projects və 
                      developer community - birlikdə öyrənmək daha əyləncəli!
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-2xl text-white text-center mt-8">
                  <h3 className="text-2xl font-bold mb-4">
                    🚀 Platform-u İndi Sınaq Et!
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Böyük proqramlaşdırma aventuranı DevCode LMS ilə başla
                  </p>
                  <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
                    Pulsuz Başla
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              🏆 DevCode LMS Statistikalar
            </h2>
            <p className="text-xl text-gray-300">
              Böyük uğurlar kiçik başlanğıçlardan doğur
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-400 mb-2">1,200+</div>
              <div className="text-gray-300">Aktiv Tələbə</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-300">Proqramlaşdırma Kursu</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-300">Tələbə Məmnuniyyəti</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">800+</div>
              <div className="text-gray-300">Verilən Sertifikat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              🚀 Proqramlaşdırma Dünyanıza Qoşulun!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              DevCode LMS ilə coding adventures başlayın
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300">
              Dərhal Başla - Pulsuz!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}