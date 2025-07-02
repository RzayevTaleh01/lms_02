import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Search, CheckCircle, XCircle, Calendar, User, BookOpen, Award } from "lucide-react";

interface CertificateData {
  id: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  grade?: string;
  instructor?: string;
  isValid: boolean;
}

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [error, setError] = useState("");

  const verifyMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest('GET', `/api/certificates/verify/${id}`);
      if (!response.ok) {
        throw new Error('Sertifikat tapılmadı');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setCertificate(data);
      setError("");
    },
    onError: (error: any) => {
      setError(error.message || 'Sertifikat yoxlanılarkən xəta baş verdi');
      setCertificate(null);
    }
  });

  const handleVerify = () => {
    if (!certificateId.trim()) {
      setError("Zəhmət olmasa sertifikat ID daxil edin");
      return;
    }
    verifyMutation.mutate(certificateId.trim());
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-devcode-purple rounded-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-devcode-dark mb-4">
              Sertifikat Yoxlama
            </h1>
            <p className="text-xl text-devcode-gray max-w-2xl mx-auto">
              DevCode Academy tərəfindən verilən sertifikatların doğruluğunu yoxlayın
            </p>
          </div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-clean-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-devcode-dark">
                Sertifikat ID-ni Daxil Edin
              </CardTitle>
              <p className="text-devcode-gray">
                Sertifikatınızın alt hissəsində olan unikal ID-ni daxil edin
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="certificate-id" className="text-devcode-dark font-medium">
                  Sertifikat ID
                </Label>
                <Input
                  id="certificate-id"
                  placeholder="DEVCODE-2024-XXXX-XXXX"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="text-lg py-3"
                />
              </div>
              
              <Button 
                onClick={handleVerify}
                disabled={verifyMutation.isPending}
                className="w-full bg-devcode-purple hover:bg-devcode-purple-dark text-white py-3 text-lg"
              >
                {verifyMutation.isPending ? (
                  "Yoxlanılır..."
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Sertifikatı Yoxla
                  </>
                )}
              </Button>
              
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Certificate Result */}
      {certificate && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-0 shadow-clean-xl">
              <CardHeader className="bg-gradient-to-r from-devcode-purple to-devcode-blue text-white text-center py-8">
                <div className="flex justify-center mb-4">
                  {certificate.isValid ? (
                    <CheckCircle className="w-16 h-16 text-white" />
                  ) : (
                    <XCircle className="w-16 h-16 text-white" />
                  )}
                </div>
                <CardTitle className="text-3xl mb-2">
                  {certificate.isValid ? "Sertifikat Doğrulandı" : "Sertifikat Etibarsızdır"}
                </CardTitle>
                <p className="text-white/90">
                  {certificate.isValid 
                    ? "Bu sertifikat DevCode Academy tərəfindən rəsmi olaraq verilmişdir"
                    : "Bu sertifikat ID-si mövcud deyil və ya etibarsızdır"
                  }
                </p>
              </CardHeader>
              
              {certificate.isValid && (
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-devcode-purple" />
                          <Label className="font-medium text-devcode-dark">Tələbə Adı</Label>
                        </div>
                        <p className="text-lg font-semibold text-devcode-dark">{certificate.studentName}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-devcode-purple" />
                          <Label className="font-medium text-devcode-dark">Kurs Adı</Label>
                        </div>
                        <p className="text-lg font-semibold text-devcode-dark">{certificate.courseName}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-devcode-purple" />
                          <Label className="font-medium text-devcode-dark">Tamamlanma Tarixi</Label>
                        </div>
                        <p className="text-lg font-semibold text-devcode-dark">
                          {new Date(certificate.completionDate).toLocaleDateString('az-AZ')}
                        </p>
                      </div>
                      
                      {certificate.grade && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-devcode-purple" />
                            <Label className="font-medium text-devcode-dark">Nəticə</Label>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                            {certificate.grade}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {certificate.instructor && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <Label className="font-medium text-devcode-dark">Müəllim</Label>
                      <p className="text-devcode-gray">{certificate.instructor}</p>
                    </div>
                  )}
                  
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        Bu sertifikat 100% doğru və etibarlıdır
                      </span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </section>
      )}

      {/* How to Verify Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-devcode-dark mb-4">
              Sertifikat Necə Yoxlanır?
            </h2>
            <p className="text-lg text-devcode-gray">
              DevCode Academy sertifikatlarını yoxlamaq üçün aşağıdakı addımları izləyin
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-devcode-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-devcode-purple font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-devcode-dark mb-2">ID-ni Tapın</h3>
              <p className="text-devcode-gray text-sm">
                Sertifikatınızın alt hissəsində olan unikal ID kodunu tapın
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-devcode-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-devcode-purple font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-devcode-dark mb-2">Daxil Edin</h3>
              <p className="text-devcode-gray text-sm">
                ID-ni yuxarıdakı xanaya daxil edin və "Yoxla" düyməsini basın
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-devcode-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-devcode-purple font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-devcode-dark mb-2">Nəticəni Görün</h3>
              <p className="text-devcode-gray text-sm">
                Sertifikatın doğruluğu və bütün məlumatları dərhal görüləcək
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}