import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { apiRequest } from "@/lib/queryClient";
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  Download, 
  ExternalLink,
  Calendar,
  CheckCircle,
  Upload,
  Clock,
  Edit,
  Trash2,
  Link as LinkIcon,
  Video,
  FileIcon,
  AlertCircle
} from "lucide-react";

interface Material {
  id: number;
  lessonId: number;
  title: string;
  content: string;
  videoUrl?: string;
  materialType: 'video' | 'document' | 'link';
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
}

interface Assignment {
  id: number;
  lessonId: number;
  courseId: number;
  title: string;
  description: string;
  dueDate?: string;
  maxPoints: number;
  isActive: boolean;
  createdAt: string;
}

interface Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
}

interface Submission {
  id: number;
  assignmentId: number;
  studentId: string;
  content: string;
  fileUrl?: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned';
  submittedAt: string;
  gradedAt?: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [feedback, setFeedback] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);

  // Fetch lesson details
  const { data: lesson, isLoading: lessonLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${lessonId}`],
    enabled: !!lessonId,
  });

  // Fetch lesson materials
  const { data: materials = [] } = useQuery<Material[]>({
    queryKey: [`/api/lessons/${lessonId}/materials`],
    enabled: !!lessonId,
  });

  // Fetch lesson assignments
  const { data: assignments = [] } = useQuery<Assignment[]>({
    queryKey: [`/api/lessons/${lessonId}/assignments`],
    enabled: !!lessonId,
  });

  // Fetch submissions (for teachers)
  const { data: submissions = [] } = useQuery<Submission[]>({
    queryKey: [`/api/assignments/${assignments[0]?.id}/submissions`],
    enabled: !!assignments[0]?.id && user?.role === 'teacher',
  });

  // Delete material mutation
  const deleteMaterialMutation = useMutation({
    mutationFn: (materialId: number) => 
      apiRequest(`/api/lessons/materials/${materialId}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lessonId}/materials`] });
      toast({
        title: "Material silindi",
        description: "Material uğurla silindi",
      });
    },
    onError: () => {
      toast({
        title: "Xəta",
        description: "Material silinərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Delete assignment mutation
  const deleteAssignmentMutation = useMutation({
    mutationFn: (assignmentId: number) => 
      apiRequest(`/api/lessons/assignments/${assignmentId}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lessonId}/assignments`] });
      toast({
        title: "Tapşırıq silindi",
        description: "Tapşırıq uğurla silindi",
      });
    },
    onError: () => {
      toast({
        title: "Xəta",
        description: "Tapşırıq silinərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Return task for revision mutation
  const returnTaskMutation = useMutation({
    mutationFn: ({ submissionId, feedback }: { submissionId: number; feedback: string }) => 
      apiRequest(`/api/submissions/${submissionId}/return`, "PATCH", { feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/assignments/${assignments[0]?.id}/submissions`] });
      toast({
        title: "Tapşırıq geri qaytarıldı",
        description: "Tələbə tapşırığı düzəldə bilər",
      });
      setFeedback("");
      setSelectedSubmission(null);
    },
    onError: () => {
      toast({
        title: "Xəta",
        description: "Tapşırıq qaytarılarkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  if (lessonLoading) {
    return <div className="flex justify-center items-center h-64">Yüklənir...</div>;
  }

  if (!lesson) {
    return <div className="text-center text-red-500">Dərs tapılmadı</div>;
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  const getMaterialIcon = (materialType: string) => {
    switch (materialType) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileIcon className="h-5 w-5 text-green-500" />;
      case 'link':
        return <LinkIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const openMaterial = (material: Material) => {
    if (material.materialType === 'link' && material.videoUrl) {
      window.open(material.videoUrl, '_blank');
    } else if (material.materialType === 'document' && material.videoUrl) {
      // For PDF documents, open in new tab for download
      window.open(material.videoUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (user?.role === 'teacher') {
              setLocation(`/teacher/course/${courseId}`);
            } else {
              setLocation(`/student/course/${courseId}`);
            }
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geriyə
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-gray-600 mt-1">{lesson.description}</p>
        </div>
      </div>

      {/* Video Section */}
      {lesson.videoUrl && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              {getYouTubeEmbedUrl(lesson.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(lesson.videoUrl)!}
                  title={lesson.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4" />
                    <p>Video mövcud deyil</p>
                  </div>
                </div>
              )}
            </div>
            {lesson.duration && (
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration} dəqiqə</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lesson Content */}
      {lesson.content && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dərs Məzmunu</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </CardContent>
        </Card>
      )}

      {/* Materials and Assignments Tabs */}
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="materials">Materiallar ({materials.length})</TabsTrigger>
          <TabsTrigger value="assignments">Tapşırıqlar ({assignments.length})</TabsTrigger>
        </TabsList>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          {materials.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Hələlik material yoxdur
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {materials.map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {getMaterialIcon(material.materialType)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{material.title}</h3>
                          {material.content && (
                            <div 
                              className="text-sm text-gray-600 mt-1"
                              dangerouslySetInnerHTML={{ __html: material.content }}
                            />
                          )}
                        </div>
                        
                        {/* Student Actions */}
                        {user?.role === 'student' && (
                          <div className="flex gap-2">
                            {material.materialType === 'link' && material.videoUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openMaterial(material)}
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Aç
                              </Button>
                            )}
                            {material.materialType === 'document' && material.videoUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openMaterial(material)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Yüklə
                              </Button>
                            )}
                            {material.materialType === 'video' && material.videoUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openMaterial(material)}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                İzlə
                              </Button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Teacher Actions */}
                      {user?.role === 'teacher' && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Materialı sil</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bu materialı silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Ləğv et</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMaterialMutation.mutate(material.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Sil
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          {assignments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Hələlik tapşırıq yoxdur
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                          <Badge variant="secondary">{assignment.maxPoints} bal</Badge>
                        </div>
                        
                        {assignment.description && (
                          <div 
                            className="text-sm text-gray-600 mb-3"
                            dangerouslySetInnerHTML={{ __html: assignment.description }}
                          />
                        )}
                        
                        {assignment.dueDate && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Son tarix: {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}</span>
                          </div>
                        )}

                        {/* Teacher: Show submissions */}
                        {user?.role === 'teacher' && submissions.length > 0 && (
                          <div className="mt-4 border-t pt-4">
                            <h4 className="font-medium mb-2">Təqdim edilmiş işlər:</h4>
                            <div className="space-y-2">
                              {submissions.map((submission) => (
                                <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <p className="font-medium">{submission.student.firstName} {submission.student.lastName}</p>
                                    <p className="text-sm text-gray-600">
                                      Təqdim edilib: {new Date(submission.submittedAt).toLocaleDateString('az-AZ')}
                                    </p>
                                    <Badge variant={
                                      submission.status === 'graded' ? 'default' : 
                                      submission.status === 'returned' ? 'destructive' : 'secondary'
                                    }>
                                      {submission.status === 'graded' ? 'Qiymətləndirilib' :
                                       submission.status === 'returned' ? 'Geri qaytarılıb' : 'Təqdim edilib'}
                                    </Badge>
                                  </div>
                                  
                                  {submission.status === 'submitted' && (
                                    <div className="flex gap-2">
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => setSelectedSubmission(submission.id)}
                                          >
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            Geri qaytар
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Tapşırığı geri qaytар</DialogTitle>
                                            <DialogDescription>
                                              Tələbəyə düzəliş üçün rəy yazın
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <Textarea
                                              placeholder="Düzəliş üçün rəy yazın..."
                                              value={feedback}
                                              onChange={(e) => setFeedback(e.target.value)}
                                              rows={4}
                                            />
                                          </div>
                                          <DialogFooter>
                                            <Button
                                              onClick={() => {
                                                if (selectedSubmission && feedback.trim()) {
                                                  returnTaskMutation.mutate({ 
                                                    submissionId: selectedSubmission, 
                                                    feedback: feedback.trim() 
                                                  });
                                                }
                                              }}
                                              disabled={!feedback.trim() || returnTaskMutation.isPending}
                                            >
                                              Geri qaytар
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Teacher Actions */}
                      {user?.role === 'teacher' && (
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Tapşırığı sil</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bu tapşırığı silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Ləğv et</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteAssignmentMutation.mutate(assignment.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Sil
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}