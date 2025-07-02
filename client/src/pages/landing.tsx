import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, 
  Users,
  Phone, 
  Award, 
  Monitor, 
  Code,
  Smartphone,
  ArrowRight,
  Star,
  Globe,
  Shield,
  Clock,
  Database,
  Rocket,
  ChevronRight,
  GraduationCap,
  BarChart3,
  CheckCircle,
  Play,
  Zap
} from "lucide-react";

export default function Landing() {
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
    select: (data: any[]) => data.slice(0, 3),
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-devcode-purple/10 text-devcode-purple text-sm font-medium rounded-full border border-devcode-purple/20">
                Professional IT Təhsil
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-devcode-dark mb-6 leading-tight">
              Gələcəyin Texnologiyalarını
              <br />
              <span className="text-devcode-purple">Bu Gündən Öyrənin</span>
            </h1>
            
            <p className="text-xl text-devcode-gray max-w-3xl mx-auto mb-10 leading-relaxed">
              DevCode Academy - proqramlaşdırma və texnologiya sahəsində professional bacarıqlar
              əldə etmək üçün müasir təhsil platforması.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-devcode-purple hover:bg-devcode-purple-dark text-white px-8 py-4 text-lg font-medium rounded-lg">
                <Rocket className="w-5 h-5 mr-2" />
                Başla
              </Button>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="border-devcode-purple text-devcode-purple hover:bg-devcode-purple/5 px-8 py-4 text-lg font-medium rounded-lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Kursları Gör
                </Button>
              </Link>
            </div>
            
            {/* Simple Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-devcode-dark">500+</div>
                <div className="text-sm text-devcode-gray">Tələbə</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-devcode-dark">50+</div>
                <div className="text-sm text-devcode-gray">Kurs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-devcode-dark">98%</div>
                <div className="text-sm text-devcode-gray">Uğur</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-devcode-dark mb-4">
              Texnologiya Sahələri
            </h2>
            <p className="text-lg text-devcode-gray max-w-2xl mx-auto">
              Müasir texnologiyalarda professional səviyyəyə çatmaq üçün seçimlər
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-clean-lg transition-shadow">
              <div className="w-12 h-12 bg-devcode-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-devcode-purple" />
              </div>
              <h3 className="font-semibold text-devcode-dark mb-2">Frontend</h3>
              <p className="text-sm text-devcode-gray">React, Vue, Angular</p>
            </Card>
            
            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-clean-lg transition-shadow">
              <div className="w-12 h-12 bg-devcode-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-devcode-blue" />
              </div>
              <h3 className="font-semibold text-devcode-dark mb-2">Backend</h3>
              <p className="text-sm text-devcode-gray">Node.js, Python</p>
            </Card>
            
            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-clean-lg transition-shadow">
              <div className="w-12 h-12 bg-devcode-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-devcode-teal" />
              </div>
              <h3 className="font-semibold text-devcode-dark mb-2">Mobile</h3>
              <p className="text-sm text-devcode-gray">React Native, Flutter</p>
            </Card>
            
            <Card className="p-6 text-center border-0 shadow-clean hover:shadow-clean-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-devcode-dark mb-2">Data Science</h3>
              <p className="text-sm text-devcode-gray">Python, AI/ML</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-devcode-dark mb-4">
              Nə üçün DevCode Academy?
            </h2>
            <p className="text-lg text-devcode-gray max-w-2xl mx-auto">
              Professional təhsil və praktiki təcrübə üçün ideal seçim
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-devcode-purple rounded-lg flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-devcode-dark mb-3">Beynəlxalq Standart</h3>
              <p className="text-devcode-gray">
                Dünya səviyyəsində kurikulum və müasir təhsil metodları
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-devcode-blue rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-devcode-dark mb-3">Ekspert Komanda</h3>
              <p className="text-devcode-gray">
                10+ il təcrübəli müəllimlər və industry mütəxəssisləri
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-devcode-teal rounded-lg flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-devcode-dark mb-3">Sertifikatlaşdırma</h3>
              <p className="text-devcode-gray">
                Beynəlxalq səviyyədə tanınan rəsmi sertifikatlar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-devcode-dark mb-4">
              Populyar Kurslar
            </h2>
            <p className="text-lg text-devcode-gray max-w-2xl mx-auto">
              Ən çox seçilən və tələb olunan texnologiya kursları
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.length > 0 ? (
              courses.map((course: any) => (
                <Card key={course.id} className="border-0 shadow-clean hover:shadow-clean-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Aktiv
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-devcode-gray">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-devcode-dark">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-devcode-gray mb-4 text-sm">
                      {course.description || "Professional səviyyədə proqramlaşdırma bacarıqları əldə edin"}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-xs text-devcode-gray">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>25+ tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>12 həftə</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/courses">
                      <Button className="w-full bg-devcode-purple hover:bg-devcode-purple-dark text-white">
                        Ətraflı
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              [
                { title: "FullStack Development", desc: "React və Node.js ilə tam proqramlaşdırma" },
                { title: "Mobile Development", desc: "React Native ilə mobil app yaradın" },
                { title: "Data Science", desc: "Python və AI/ML texnologiyaları" }
              ].map((course, i) => (
                <Card key={i} className="border-0 shadow-clean hover:shadow-clean-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Populyar
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-devcode-gray">4.9</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-devcode-dark">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-devcode-gray mb-4 text-sm">{course.desc}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-xs text-devcode-gray">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>30+ tələbə</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>16 həftə</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/courses">
                      <Button className="w-full bg-devcode-purple hover:bg-devcode-purple-dark text-white">
                        Ətraflı
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="border-devcode-purple text-devcode-purple hover:bg-devcode-purple/5">
                Bütün Kursları Gör
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-devcode-purple to-devcode-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Texnologiya karyeranıza bu gün başlayın
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Professional təhsil, praktiki layihələr və karyera dəstəyi ilə gələcəyinizi qurun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-devcode-purple hover:bg-gray-50 px-8 py-3">
              <Phone className="w-5 h-5 mr-2" />
              Əlaqə
            </Button>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                Kursları Araşdır
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}