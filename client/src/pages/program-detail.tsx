import { useParams, Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Plus, Download, User, Calendar, Book, Clock, MessageSquare, Star, Users, ChevronDown, CheckCircle, ArrowLeft, FileText, BookOpen } from "lucide-react";

export default function ProgramDetail() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});
  const [activeSection, setActiveSection] = useState('program');
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
  };

  // Training program sections
  const programSections = [
    {
      title: "Grafik dizayna giriş (Vektor qrafika)",
      description: "Adobe Illustrator ilə vektor qrafika əsasları, logo dizayn və brend identifikasiyası",
      duration: "2 həftə",
      lessons: 8
    },
    {
      title: "Tipoqrafiya və mətnlərlə iş",
      description: "Font seçimi, mətn kompozisiyası və tipoqrafik dizayn prinsipləri",
      duration: "1.5 həftə",
      lessons: 6
    },
    {
      title: "Rəstr qrafika",
      description: "Adobe Photoshop ilə rəstr qrafika, foto editing və digital art",
      duration: "3 həftə",
      lessons: 12
    },
    {
      title: "Manipulyasiya və foto redaktə",
      description: "Professional foto redaktə texnikaları və yaradıcı manipulyasiya",
      duration: "2 həftə",
      lessons: 8
    },
    {
      title: "Vizual kommunikasiyada üslublar və kompozisiyalar",
      description: "Rəng nəzəriyyəsi, kompozisiya qaydaları və vizual iyerarxiya",
      duration: "2 həftə",
      lessons: 8
    },
    {
      title: "Grafik dizaynda 3D",
      description: "3D modelləşdirmə, render və grafik dizaynda 3D elementlər",
      duration: "3 həftə",
      lessons: 12
    },
    {
      title: "Çoxsahəli materialların dizaynı (Editorial dizayn)",
      description: "Kitab, jurnal və çap materiallarının dizaynı",
      duration: "2.5 həftə",
      lessons: 10
    },
    {
      title: "Brending",
      description: "Brand strategiyası, logo dizayn və korporativ kimlik yaradılması",
      duration: "3 həftə",
      lessons: 12
    },
    {
      title: "Qablaşdırma və etiket dizayn",
      description: "Məhsul qablaşdırması və etiket dizaynının əsasları",
      duration: "2 həftə",
      lessons: 8
    },
    {
      title: "Hərəkətli Qrafika (2D Motion)",
      description: "After Effects ilə animasiya və motion graphics",
      duration: "3 həftə",
      lessons: 12
    }
  ];

  const sidebarItems = [
    { id: 'advantages', label: 'Kursun üstünlükləri', icon: User },
    { id: 'certificate', label: 'Təhsil nazirliyi sertifikatı', icon: Calendar },
    { id: 'program', label: 'Tədris proqramı', icon: Book },
    { id: 'schedule', label: 'Dərs saatları', icon: Clock },
    { id: 'contact', label: 'Müraciət formu', icon: MessageSquare },
    { id: 'instructors', label: 'Təlimçilərimiz', icon: Star },
    { id: 'students', label: 'Tələbələr üçün', icon: Users }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'advantages':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kursun Üstünlükləri</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Professional Təlimçilər</h3>
                    <p className="text-gray-600">5+ il təcrübəli grafik dizaynerlər tərəfindən tədris</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Real Layihələr</h3>
                    <p className="text-gray-600">Həqiqi müştəri layihələri üzərində praktiki təcrübə</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Portfolio Hazırlığı</h3>
                    <p className="text-gray-600">Kurs sonunda professional portfolio hazırlığı</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Karyera Dəstəyi</h3>
                    <p className="text-gray-600">İş tapmada kömək və karyera məsləhətləri</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Kiçik Qruplar</h3>
                    <p className="text-gray-600">Maksimum 12 nəfərlik qruplarda fərdi yanaşma</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Ömürboyu Dəstək</h3>
                    <p className="text-gray-600">Kurs bitdikdən sonra da davamlı təlimçi dəstəyi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Təhsil Nazirliyi Sertifikatı</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Rəsmi Sertifikat</h3>
                <p className="text-gray-700 mb-4">
                  Kursunuzu uğurla başa vurdukdan sonra Azərbaycan Respublikası Təhsil Nazirliyi tərəfindən 
                  təsdiqlənmiş rəsmi sertifikat əldə edəcəksiniz.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">Beynəlxalq səviyyədə tanınan sertifikat</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">CV-də istifadə üçün uyğun</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">Online yoxlama imkanı</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dərs Saatları</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Həftə içi qrupları</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Bazar ertəsi, Çərşənbə, Cümə</span>
                    <span className="text-devcode-orange">19:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Çərşənbə axşamı, Bazar ertəsi, Cümə</span>
                    <span className="text-devcode-orange">17:00 - 19:00</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Həftə sonu qrupları</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Şənbə, Bazar</span>
                    <span className="text-devcode-orange">10:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Şənbə, Bazar</span>
                    <span className="text-devcode-orange">14:00 - 17:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'instructors':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Təlimçilərimiz</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-devcode-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AH</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Anar Həsənov</h3>
                    <p className="text-gray-600">Senior Grafik Dizayner</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  8 il təcrübə, 200+ tələbə, Adobe sertifikatlı mütəxəssis
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-devcode-yellow rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">SM</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Səbinə Məmmədova</h3>
                    <p className="text-gray-600">Art Director</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  6 il təcrübə, brending və UI/UX mütəxəssisi
                </p>
              </div>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tələbələr üçün Məlumat</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tələbə Resursları</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Online LMS platforması</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Video dərslər və materiallar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Praktiki tapşırıqlar və feedback</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Peer-to-peer öğrənmə</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sualınız var?</h2>
                <p className="text-devcode-yellow font-semibold text-lg mb-4">Gəlin görüşək!</p>
                <p className="text-gray-600 mb-6">
                  Bizimlə görüş təyin edin, dərslərimiz, müəllimlərimiz və tədris prosesimizlə şəxsən tanış olun.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-devcode-orange rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Cavab müddəti: 24 saat ərzində</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-devcode-yellow rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-gray-700">Pulsuz məsləhət görüşü</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Ad"
                    value={contactForm.firstName}
                    onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                  <Input
                    placeholder="Soyad"
                    value={contactForm.lastName}
                    onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
                <Input
                  placeholder="Telefon nömrəsi"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="bg-gray-50 border-gray-200"
                />
                <Input
                  placeholder="E-poçt ünvanı"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="bg-gray-50 border-gray-200"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-devcode-orange hover:bg-orange-600 text-white"
                >
                  Göndər
                </Button>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Program Overview */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tədris Proqramı</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-devcode-orange/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-devcode-orange">24</div>
                    <div className="text-sm text-gray-600">Həftə</div>
                  </div>
                  <div className="bg-devcode-yellow/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">86</div>
                    <div className="text-sm text-gray-600">Dərs saatı</div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">10</div>
                    <div className="text-sm text-gray-600">Modul</div>
                  </div>
                </div>
              </div>

              {/* Program Sections */}
              <div className="space-y-3">
                {programSections.map((section, index) => (
                  <Collapsible key={index} open={openSections[index]} onOpenChange={() => toggleSection(index)}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                      <div className="flex items-center space-x-4">
                        <span className="w-8 h-8 bg-devcode-orange text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.duration} • {section.lessons} dərs</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openSections[index] ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="pl-12 pt-3 border-l-2 border-gray-100 ml-4">
                        <p className="text-gray-700 mb-4">{section.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Əhatə olunan mövzular:</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                              <li>• Nəzəri əsaslar və konseptlər</li>
                              <li>• Praktiki tapşırıqlar</li>
                              <li>• Real layihə nümunələri</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Öyrənəcəkləriniz:</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                              <li>• Professional texnikalar</li>
                              <li>• Sənaye standartları</li>
                              <li>• Portfolio layihələri</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Fixed and properly positioned */}
        <div className="fixed left-0 top-0 w-64 bg-white shadow-lg border-r border-gray-200 h-full z-40 overflow-y-auto">
          <div className="p-4">
            <Link href="/courses" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kurslara qayıt
            </Link>

            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-900 mb-4">Tədris Proqramı</div>

              <div className="space-y-2">
                <div className="flex items-center p-2 bg-orange-50 rounded-lg">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-medium text-orange-600 mr-3">
                    G
                  </div>
                  <div>
                    <div className="text-sm font-medium">Grafik Dizayn</div>
                    <div className="text-xs text-gray-500">Müasir dizayn əsasları</div>
                  </div>
                </div>

                <div className="space-y-2 pl-4">
                  <div className="flex items-center text-sm text-gray-600 py-1 hover:text-gray-900 cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Kursun tələbləri
                  </div>
                  <div className="flex items-center text-sm text-gray-600 py-1 hover:text-gray-900 cursor-pointer">
                    <FileText className="w-4 h-4 mr-2" />
                    Təlim nəticələri və sertifikat
                  </div>
                  <div className="flex items-center text-sm text-orange-600 py-1 font-medium bg-orange-50 rounded px-2 -mx-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Tədris proqramı
                  </div>
                  <div className="flex items-center text-sm text-gray-600 py-1 hover:text-gray-900 cursor-pointer">
                    <Users className="w-4 h-4 mr-2" />
                    Müraciət formu
                  </div>
                  <div className="flex items-center text-sm text-gray-600 py-1 hover:text-gray-900 cursor-pointer">
                    <Star className="w-4 h-4 mr-2" />
                    Təlimçilər
                  </div>
                  <div className="flex items-center text-sm text-gray-600 py-1 hover:text-gray-900 cursor-pointer">
                    <Clock className="w-4 h-4 mr-2" />
                    Tələbələr üçün
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg text-white">
              <div className="text-sm font-medium mb-2">Növbəti qrup: 5 Avqust 2024</div>
              <div className="text-xs mb-3">
                Qeydiyyat açıq / 12 nəfər yazılıb
              </div>
              <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Müraciət et
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Added left margin for sidebar */}
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}