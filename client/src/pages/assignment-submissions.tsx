
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ExternalLink, Github, FileText, CheckCircle, XCircle, Edit } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AssignmentSubmissions() {
  const { assignmentId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [gradeForm, setGradeForm] = useState({
    grade: "",
    feedback: ""
  });

  // Fetch assignment details
  const { data: assignment, isLoading: assignmentLoading } = useQuery({
    queryKey: [`/api/assignments/${assignmentId}`],
  });

  // Fetch submissions
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: [`/api/assignments/${assignmentId}/submissions`],
    enabled: !!assignmentId,
  });

  // Grade submission mutation
  const gradeSubmissionMutation = useMutation({
    mutationFn: async ({ submissionId, gradeData }: any) => {
      const response = await fetch(`/api/submissions/${submissionId}/grade`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gradeData),
      });
      if (!response.ok) throw new Error("Failed to grade submission");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/assignments/${assignmentId}/submissions`] });
      setIsGradeDialogOpen(false);
      setSelectedSubmission(null);
      setGradeForm({ grade: "", feedback: "" });
    },
  });

  const handleGradeSubmission = () => {
    if (selectedSubmission) {
      gradeSubmissionMutation.mutate({
        submissionId: selectedSubmission.id,
        gradeData: {
          grade: parseFloat(gradeForm.grade),
          feedback: gradeForm.feedback
        }
      });
    }
  };

  const openGradeDialog = (submission: any) => {
    setSelectedSubmission(submission);
    setGradeForm({
      grade: submission.grade?.toString() || "",
      feedback: submission.feedback || ""
    });
    setIsGradeDialogOpen(true);
  };

  if (assignmentLoading || submissionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-devcode-dark">{assignment?.title}</h1>
            <p className="text-devcode-gray">Təhvil verilmiş tapşırıqlar</p>
          </div>
        </div>

        {/* Assignment Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tapşırıq Məlumatları</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none mb-4"
              dangerouslySetInnerHTML={{ __html: assignment?.description || "" }}
            />
            <div className="flex items-center space-x-6 text-sm text-devcode-gray">
              <div>Son tarix: {new Date(assignment?.dueDate).toLocaleDateString('az-AZ')}</div>
              <div>Maksimum bal: {assignment?.maxPoints}</div>
              <div>Təhvil verilmiş: {submissions.length}</div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Tələbə Cavabları</h2>
          
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-devcode-gray">Hələ heç bir tapşırıq təhvil verilməyib.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {submissions.map((submission: any) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {submission.student.firstName} {submission.student.lastName}
                        </CardTitle>
                        <p className="text-sm text-devcode-gray">{submission.student.email}</p>
                        <p className="text-sm text-devcode-gray">
                          Təhvil tarixi: {new Date(submission.submittedAt).toLocaleDateString('az-AZ')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {submission.grade ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {submission.grade}/{assignment?.maxPoints}
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <XCircle className="w-4 h-4 mr-1" />
                            Qiymətləndirilməyib
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openGradeDialog(submission)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Qiymətləndir
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {submission.content && (
                        <div>
                          <h4 className="font-medium mb-2">Qeydlər:</h4>
                          <p className="text-devcode-gray bg-gray-50 p-3 rounded-md">
                            {submission.content}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-3">
                        {submission.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub Repository
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                        
                        {submission.fileUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="w-4 h-4 mr-2" />
                              Fayl
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </div>
                      
                      {submission.feedback && (
                        <div>
                          <h4 className="font-medium mb-2">Müəllim rəyi:</h4>
                          <p className="text-devcode-gray bg-blue-50 p-3 rounded-md">
                            {submission.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Grade Dialog */}
        <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tapşırığı Qiymətləndir</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="grade">Bal (maksimum {assignment?.maxPoints})</Label>
                <Input
                  id="grade"
                  type="number"
                  min="0"
                  max={assignment?.maxPoints}
                  value={gradeForm.grade}
                  onChange={(e) => setGradeForm(prev => ({ ...prev, grade: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="feedback">Rəy</Label>
                <Textarea
                  id="feedback"
                  value={gradeForm.feedback}
                  onChange={(e) => setGradeForm(prev => ({ ...prev, feedback: e.target.value }))}
                  placeholder="Tələbəyə rəyinizi yazın..."
                  rows={4}
                />
              </div>
              <Button onClick={handleGradeSubmission} className="w-full">
                Qiymətləndir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Footer />
    </div>
  );
}
