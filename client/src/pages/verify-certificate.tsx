import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const verifyMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("GET", `/api/certificates/${id}`);
      return response.json();
    },
    onSuccess: (data) => {
      setVerificationResult({ success: true, data });
    },
    onError: (error: any) => {
      if (error.message.includes("404")) {
        setVerificationResult({ success: false, error: "Certificate not found" });
      } else {
        setVerificationResult({ success: false, error: "Verification failed" });
      }
    },
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certificateId.trim()) {
      verifyMutation.mutate(certificateId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sertifikat Yoxlanması</h1>
          <p className="text-lg text-gray-600">
            DevCode Academy sertifikatlarının həqiqiliyini unikal sertifikat ID-si ilə yoxlayın.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Sertifikat Yoxla</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="certificateId">Sertifikat ID-si</Label>
                <Input
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Sertifikat ID-sini daxil edin (məsələn: DCA-2024-001234)"
                  className="text-center"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={verifyMutation.isPending || !certificateId.trim()}
              >
                {verifyMutation.isPending ? "Yoxlanılır..." : "Sertifikatı Yoxla"}
              </Button>
            </form>

            {/* Verification Result */}
            {verificationResult && (
              <div className="mt-8">
                {verificationResult.success ? (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-green-800">Sertifikat Təsdiqləndi ✓</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium">Tələbə:</span>{" "}
                            {verificationResult.data.student.firstName} {verificationResult.data.student.lastName}
                          </div>
                          <div>
                            <span className="font-medium">Kurs:</span>{" "}
                            {verificationResult.data.course.title}
                          </div>
                          <div>
                            <span className="font-medium">Bitirmə Tarixi:</span>{" "}
                            {new Date(verificationResult.data.issuedAt).toLocaleDateString('az-AZ')}
                          </div>
                          <div>
                            <span className="font-medium">Qiymət:</span>{" "}
                            {verificationResult.data.grade ? `${verificationResult.data.grade}%` : "Keçdi"}
                          </div>
                        </div>
                        <div className="mt-4">
                          <Badge className="bg-green-100 text-green-800">
                            Etibarlı Sertifikat
                          </Badge>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-semibold">Sertifikat Tapılmadı</div>
                      <div className="mt-1">
                        Daxil etdiyiniz sertifikat ID-si təsdiqlənə bilmədi. ID-ni yoxlayın və yenidən cəhd edin.
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Sertifikat ID-ni necə tapmaq olar:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Sertifikat ID-ləri belə formatdadır: DCA-YYYY-XXXXXX</li>
                <li>• Rəqəmsal sertifikatınızda tapa bilərsiniz</li>
                <li>• Sertifikat çatdırılması bildirişi üçün e-poçtunuzu yoxlayın</li>
                <li>• Bütün sertifikatları görmək üçün tələbə panelinizə daxil olun</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
