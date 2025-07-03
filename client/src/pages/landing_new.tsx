import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  Award, 
  Star, 
  CheckCircle,
  PlayCircle,
  Code,
  BarChart3,
  Video,
  Database,
  PenTool
} from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      bgColor: "bg-gradient-to-br from-blue-600 to-purple-700",
      title: "JavaScript Fundamentals",
      subtitle: "Sıfırdan Peşəkar səviyyəyə",
      image: "🚀"
    },
    {
      id: 2, 
      bgColor: "bg-gradient-to-br from-green-600 to-blue-600",
      title: "React Development", 
      subtitle: "Modern UI Framework",
      image: "⚛️"
    },
    {
      id: 3,
      bgColor: "bg-gradient-to-br from-purple-600 to-pink-600", 
      title: "Full-Stack Development",
      subtitle: "Frontend + Backend",
      image: "💻"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Proqramlaşdırma Öyrən
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            DevCode Academy - Azərbaycanda ən müasir proqramlaşdırma təhsil platforması
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg">
            İndi Başla
          </Button>
        </div>
      </section>

      {/* Matrix-Style LMS Showcase */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-green-400 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          {/* Floating Code Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none font-mono text-xs">
            <div className="absolute top-10 left-10 animate-pulse">const enterprise = new DevCodeLMS()</div>
            <div className="absolute top-32 right-20 animate-bounce">export default PostgreSQL</div>
            <div className="absolute bottom-20 left-32 animate-ping">npm run production</div>
            <div className="absolute top-1/2 right-1/4 animate-pulse">await db.connect(25)</div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ENTERPRISE.ANALYSIS
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Real enterprise LMS - 25+ database tables, TypeScript backend, həqiqi sistem arxitekturası!
            </p>
          </div>

          {/* Giant Terminal Window */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-black/90 backdrop-blur-sm rounded-xl border border-green-500/30 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-b border-green-500/30">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-green-400 text-lg font-mono">root@devcode-enterprise:~#</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-green-400 text-sm font-mono">PRODUCTION ACTIVE</div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-8 font-mono text-sm leading-relaxed">
                <div className="space-y-4">
                  <div className="text-blue-400">$ cat /var/log/devcode-lms/architecture.json</div>
                  <div className="ml-4 space-y-2">
                    <div className="text-white">{'{'}</div>
                    <div className="ml-4 text-yellow-400">"name": "DevCode Enterprise LMS",</div>
                    <div className="ml-4 text-yellow-400">"status": "Production Ready",</div>
                    <div className="ml-4 text-yellow-400">"tech_stack": {'{'}</div>
                      <div className="ml-8 text-purple-400">"backend": "Node.js + Express + TypeScript",</div>
                      <div className="ml-8 text-purple-400">"frontend": "React 18 + Vite + TailwindCSS",</div>
                      <div className="ml-8 text-purple-400">"database": "PostgreSQL + Drizzle ORM",</div>
                      <div className="ml-8 text-purple-400">"auth": "Replit Auth + OpenID Connect"</div>
                    <div className="ml-4 text-yellow-400">{'},'}</div>
                    <div className="ml-4 text-yellow-400">"database_stats": {'{'}</div>
                      <div className="ml-8 text-cyan-400">"total_tables": 25,</div>
                      <div className="ml-8 text-cyan-400">"relations": 48,</div>
                      <div className="ml-8 text-cyan-400">"constraints": "FULL_REFERENTIAL_INTEGRITY"</div>
                    <div className="ml-4 text-yellow-400">{'},'}</div>
                    <div className="ml-4 text-yellow-400">"enterprise_features": [</div>
                      <div className="ml-8 text-green-400">"Role-based access control (Admin/Teacher/Student)",</div>
                      <div className="ml-8 text-green-400">"Video streaming with YouTube integration",</div>
                      <div className="ml-8 text-green-400">"Assignment engine with GitHub integration",</div>
                      <div className="ml-8 text-green-400">"Real-time attendance tracking system",</div>
                      <div className="ml-8 text-green-400">"Certificate generation with verification",</div>
                      <div className="ml-8 text-green-400">"Blog system with content management"</div>
                    <div className="ml-4 text-yellow-400">]</div>
                    <div className="text-white">{'}'}</div>
                  </div>
                  
                  <div className="text-green-400 mt-6">✓ System health: EXCELLENT</div>
                  <div className="text-green-400">✓ Database connections: STABLE</div>
                  <div className="text-green-400">✓ TypeScript compilation: SUCCESS</div>
                  <div className="text-green-400">✓ Production deployment: ACTIVE</div>
                  
                  <div className="text-white mt-4">root@devcode-enterprise:~# <span className="animate-pulse">_</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 text-center hover:border-green-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-green-400 mb-2">25+</div>
              <div className="text-gray-300 font-semibold">Database Tables</div>
              <div className="text-sm text-gray-500 mt-2">PostgreSQL Schema</div>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 text-center hover:border-blue-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-blue-400 mb-2">3</div>
              <div className="text-gray-300 font-semibold">User Roles</div>
              <div className="text-sm text-gray-500 mt-2">Role-based Access</div>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-center hover:border-purple-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-purple-400 mb-2">TypeScript</div>
              <div className="text-gray-300 font-semibold">Full Stack</div>
              <div className="text-sm text-gray-500 mt-2">Type Safety</div>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30 text-center hover:border-yellow-500/50 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2">Real-time</div>
              <div className="text-gray-300 font-semibold">Analytics</div>
              <div className="text-sm text-gray-500 mt-2">Live Tracking</div>
            </div>
          </div>

          {/* System Flow */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Enterprise Data Flow
            </h3>
            <div className="flex justify-center items-center space-x-8 flex-wrap text-green-400">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/50 rounded-xl flex items-center justify-center">
                  <Database className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/50 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>
            <p className="text-gray-400 mt-4 font-mono text-lg">
              Frontend React → PostgreSQL Backend → Real-time Analytics Engine
            </p>
          </div>
        </div>
      </section>

      {/* Course Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Proqramlaşdırma Kursları
            </h2>
            <p className="text-xl text-gray-600">
              Müasir texnologiyalarla həqiqi bacarıqlar qazanın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <Code className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">JavaScript</h3>
              <p className="text-gray-600 text-sm mb-4">
                Modern web development üçün əsas dil
              </p>
              <div className="text-2xl font-bold text-yellow-600">₼299</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <PlayCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">React</h3>
              <p className="text-gray-600 text-sm mb-4">
                İnteraktiv UI yaratmaq üçün library
              </p>
              <div className="text-2xl font-bold text-blue-600">₼399</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Node.js</h3>
              <p className="text-gray-600 text-sm mb-4">
                Server-side JavaScript development
              </p>
              <div className="text-2xl font-bold text-green-600">₼449</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Full-Stack</h3>
              <p className="text-gray-600 text-sm mb-4">
                Frontend + Backend + Database
              </p>
              <div className="text-2xl font-bold text-purple-600">₼699</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Enterprise LMS - Həqiqi Güc!
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            25+ database table, React + TypeScript frontend, PostgreSQL backend - 
            real enterprise səviyyəli sistem!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button className="bg-white text-orange-500 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full">
              🔥 Sistemə Giriş Et!
            </Button>
            <div className="text-white/90 text-sm">
              ⚡ Replit Auth • 🔒 Role-based Access • 🎯 Real-time Data
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">25+</div>
              <div className="text-white/80">Database Tables</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">3</div>
              <div className="text-white/80">User Roles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">TypeScript</div>
              <div className="text-white/80">Full Stack</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}