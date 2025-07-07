import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Play, Users, Clock, Star, Check, Share, Heart, Plus, ChevronDown, ChevronRight, Book, Calendar, MessageSquare, User, Phone, Mail } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  
  const { data: course, isLoading } = useQuery({
    queryKey: [`/api/courses/${id}`],
  });

  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${id}/lessons`],
    enabled: !!id,
  });

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted:', contactForm);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kurs Tapılmadı</h1>
          <p className="text-gray-600 mb-8">Axtardığınız kurs mövcud deyil.</p>
          <Link href="/courses">
            <Button>Bütün Kursları Görüntülə</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Curriculum sections based on the first image
  const curriculumSections = [
    "Grafik dizayna giriş (Vektor qrafika)",
    "Tipoqrafiya və mətnlərla iş",
    "Rəstr qrafika",
    "Manipulyasiya və foto redaktə",
    "Vizual kommunikasiyada uslublar və kompozisiyalar",
    "Grafik dizaynda 3D",
    "Çoxsahəli materialların dizaynı (Editorial dizayn)",
    "Brending",
    "Qablaşdırma və etiket dizayn",
    "Hərəkətli Qrafika (2D Motion)"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto">
          <div className="p-6">
            {/* Course Header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-sm text-gray-600">{course.description}</p>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <User className="w-4 h-4" />
                <span className="text-sm">Üstünlüklər barə məlumat</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Təhsil nazirliyi</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg cursor-pointer">
                <Book className="w-4 h-4" />
                <span className="text-sm font-medium">Tədris proqram</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Dərs saatları</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Müraciət formu</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Star className="w-4 h-4" />
                <span className="text-sm">İnstruksionlarımız</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Users className="w-4 h-4" />
                <span className="text-sm">Tələbələrin üçün</span>
              </div>
            </div>

            {/* Next Group Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Növbəti qrup: 4 Avqust 2025</h3>
              <p className="text-xs text-gray-600 mb-3">
                Bu məlumat qrupa yə dünəsi üçün qeydiyyatdan keç
              </p>
              <Button size="sm" className="w-full bg-gray-800 hover:bg-gray-900 text-white mb-2">
                Broşuru yüklə
              </Button>
              <Button size="sm" className="w-full bg-devcode-yellow hover:bg-yellow-500 text-black">
                Müraciət et
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Curriculum Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tədris Proqramı</h2>
              
              <div className="space-y-2">
                {curriculumSections.map((section, index) => (
                  <Collapsible key={index} open={openSections[index]} onOpenChange={() => toggleSection(index)}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900">
                          {index + 1}. {section}
                        </span>
                      </div>
                      {openSections[index] ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="pl-6 pt-2">
                        <p className="text-sm text-gray-600 mb-3">
                          Bu bölümdə {section.toLowerCase()} ilə bağlı ətraflı məlumatlar və praktiki tapşırıqlar yer alır.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            Nəzəri hissə
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            Praktiki tapşırıqlar
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            Layihə işi
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sualın var?</h3>
                  <p className="text-devcode-yellow font-semibold text-lg mb-4">Gəl görüşək!</p>
                  <p className="text-gray-600 text-sm">
                    Bizimlə görüş təyin et, dərslərimiz, 
                    müəllimlərimiz və tədris 
                    prosesimizlə şəxsən tanış ol.
                  </p>
                </div>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Ad"
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                      className="bg-gray-100 border-0"
                    />
                    <Input
                      placeholder="Soyad"
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                      className="bg-gray-100 border-0"
                    />
                  </div>
                  <Input
                    placeholder="Telefon nömrəsi"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="bg-gray-100 border-0"
                  />
                  <Input
                    placeholder="Elektron mail"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="bg-gray-100 border-0"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    Davam et
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
