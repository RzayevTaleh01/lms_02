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
          <h1 className="text-4xl font-bold text-devcode-dark mb-4">Certificate Verification</h1>
          <p className="text-lg text-devcode-gray">
            Verify the authenticity of DevCode Academy certificates using the unique certificate ID.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Verify Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="certificateId">Certificate ID</Label>
                <Input
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., DCA-2024-001234)"
                  className="text-center"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-devcode-orange hover:bg-orange-600"
                disabled={verifyMutation.isPending || !certificateId.trim()}
              >
                {verifyMutation.isPending ? "Verifying..." : "Verify Certificate"}
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
                          <span className="font-semibold text-green-800">Certificate Verified ✓</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium">Student:</span>{" "}
                            {verificationResult.data.student.firstName} {verificationResult.data.student.lastName}
                          </div>
                          <div>
                            <span className="font-medium">Course:</span>{" "}
                            {verificationResult.data.course.title}
                          </div>
                          <div>
                            <span className="font-medium">Completion Date:</span>{" "}
                            {new Date(verificationResult.data.issuedAt).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Grade:</span>{" "}
                            {verificationResult.data.grade ? `${verificationResult.data.grade}%` : "Pass"}
                          </div>
                        </div>
                        <div className="mt-4">
                          <Badge className="bg-green-100 text-green-800">
                            Valid Certificate
                          </Badge>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-semibold">Certificate Not Found</div>
                      <div className="mt-1">
                        The certificate ID you entered could not be verified. Please check the ID and try again.
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to find your Certificate ID:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Certificate IDs follow the format: DCA-YYYY-XXXXXX</li>
                <li>• You can find it on your digital certificate</li>
                <li>• Check your email for the certificate delivery notification</li>
                <li>• Log in to your student dashboard to view all certificates</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
