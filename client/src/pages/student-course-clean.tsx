import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Calendar, 
  CheckCircle,
  Link2,
  Menu,
  ClipboardList,
  ExternalLink,
  Send,
  Edit,
  File
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { StudentSidebar } from "@/components/student-sidebar";

interface Course {
  id: number;
  title: string;
  description: string;
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
  updatedAt: string;
}

interface LessonMaterial {
  id: number;
  lessonId: number;
  title: string;
  description: string;
  type: string;
  url: string;
  createdAt: string;
}

interface LessonAssignment {
  id: number;
  lessonId: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string | null;
  points: number;
  createdAt: string;
}

interface Submission {
  id: number;
  assignmentId: number;
  studentId: string;
  content: string;
  githubUrl?: string;
  fileUrl?: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned' | 'resubmitted';
  submittedAt: string;
  gradedAt?: string;
  returnedAt?: string;
  resubmittedAt?: string;
}

interface DetailedProgressData {
  courseId: number;
  overallProgress: number;
  totalLessons: number;
  lessonDetails: {
    lessonId: number;
    lessonTitle: string;
    progressPercentage: number;
    isCompleted: boolean;
    totalAssignments: number;
    completedAssignments: number;
  }[];
}

export default function StudentCourse() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [assignmentContent, setAssignmentContent] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [editingSubmissionId, setEditingSubmissionId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // API Queries
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['/api/courses', courseId],
    enabled: !!courseId
  });

  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ['/api/courses', courseId, 'lessons'],
    enabled: !!courseId
  });

  const { data: progressData, isLoading: progressLoading } = useQuery<DetailedProgressData>({
    queryKey: ['/api/courses', courseId, 'detailed-progress'],
    enabled: !!courseId
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ['/api/submissions'],
    enabled: !!user
  });

  const { data: lessonMaterials = [] } = useQuery({
    queryKey: ['/api/lessons', selectedLessonId, 'materials'],
    enabled: !!selectedLessonId
  });

  const { data: lessonAssignments = [] } = useQuery({
    queryKey: ['/api/lessons', selectedLessonId, 'assignments'],
    enabled: !!selectedLessonId
  });

  // Set default lesson selection
  useEffect(() => {
    if (lessons.length > 0 && !selectedLessonId) {
      setSelectedLessonId(lessons[0].id);
    }
  }, [lessons, selectedLessonId]);

  // Get selected lesson
  const selectedLesson = lessons.find((l: Lesson) => l.id === selectedLessonId);

  // Complete lesson mutation
  const completeLessonMutation = useMutation({
    mutationFn: async (lessonId: number) => {
      return apiRequest(`/api/lessons/${lessonId}/complete`, {
        method: 'POST'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/courses', courseId, 'detailed-progress'] });
      toast({
        title: "Uğur!",
        description: "Dərs tamamlandı olaraq işarələndi",
      });
    },
    onError: () => {
      toast({
        title: "Xəta",
        description: "Dərsi tamamlarkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Submit assignment mutation
  const submitAssignmentMutation = useMutation({
    mutationFn: async ({ assignmentId, content, githubUrl }: {
      assignmentId: number;
      content: string;
      githubUrl?: string;
    }) => {
      return apiRequest(`/api/lesson-assignments/${assignmentId}/submissions`, {
        method: 'POST',
        body: { content, githubUrl }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/courses', courseId, 'detailed-progress'] });
      setAssignmentContent("");
      setGithubUrl("");
      setEditingSubmissionId(null);
      toast({
        title: "Uğur!",
        description: "Tapşırıq göndərildi",
      });
    },
    onError: () => {
      toast({
        title: "Xəta",
        description: "Tapşırığı göndərərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Resubmit assignment mutation
  const resubmitAssignmentMutation = useMutation({
    mutationFn: async ({ submissionId, content, githubUrl }: {
      submissionId: number;
      content: string;
      githubUrl?: string;
    }) => {
      return apiRequest(`/api/submissions/${submissionId}/resubmit`, {
        method: 'PATCH',
        body: { content, githubUrl }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/courses', courseId, 'detailed-progress'] });
      setAssignmentContent("");
      setGithubUrl("");
      setEditingSubmissionId(null);
      toast({
        title: "Uğur!",
        description: "Tapşırıq yenidən göndərildi",
      });
    },
    onError: () => {
      toast({
        title: "Xəta",
        description: "Tapşırığı yenidən göndərərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Get lesson progress data
  const getLessonProgress = (lessonId: number) => {
    return progressData?.lessonDetails.find(ld => ld.lessonId === lessonId) || {
      lessonId,
      lessonTitle: '',
      progressPercentage: 0,
      isCompleted: false,
      totalAssignments: 0,
      completedAssignments: 0
    };
  };

  // Submit assignment handler
  const handleSubmitAssignment = async (assignmentId: number) => {
    if (!assignmentContent.trim()) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa tapşırıq məzmununu doldurun",
        variant: "destructive",
      });
      return;
    }

    if (editingSubmissionId) {
      await resubmitAssignmentMutation.mutateAsync({
        submissionId: editingSubmissionId,
        content: assignmentContent,
        githubUrl: githubUrl || undefined
      });
    } else {
      await submitAssignmentMutation.mutateAsync({
        assignmentId,
        content: assignmentContent,
        githubUrl: githubUrl || undefined
      });
    }
  };

  // Get submission for assignment
  const getSubmissionForAssignment = (assignmentId: number): Submission | undefined => {
    return Array.isArray(submissions) 
      ? submissions.find((s: any) => s.assignmentId === assignmentId)
      : undefined;
  };

  // Edit submission handler
  const handleEditSubmission = (submission: Submission) => {
    setEditingSubmissionId(submission.id);
    setAssignmentContent(submission.content);
    setGithubUrl(submission.githubUrl || "");
    setActiveTab("assignments");
  };

  // Navigation handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Loading states
  if (courseLoading || lessonsLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-white shadow-md"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <StudentSidebar />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course?.title}</h1>
              <p className="text-gray-600 mt-1">{course?.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {progressData && (
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    Ümumi İrəliləyiş: {progressData.overallProgress}%
                  </div>
                  <Progress value={progressData.overallProgress} className="w-32 mt-1" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Lessons Sidebar */}
          <div className="w-80 bg-white border-r h-screen overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dərslər</h2>
              <div className="space-y-2">
                {lessons.map((lesson: Lesson) => {
                  const progress = getLessonProgress(lesson.id);
                  const isSelected = selectedLessonId === lesson.id;
                  
                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-all",
                        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setSelectedLessonId(lesson.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                            progress.isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                          )}>
                            {progress.isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              lesson.orderIndex
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-900">{lesson.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {progress.totalAssignments > 0 && 
                                `${progress.completedAssignments}/${progress.totalAssignments} tapşırıq`
                              }
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-gray-900">
                            {progress.progressPercentage}%
                          </div>
                          <Progress value={progress.progressPercentage} className="w-16 mt-1" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6">
            {selectedLesson ? (
              <div className="space-y-6">
                {/* Lesson Header */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h1>
                    <Button
                      onClick={() => completeLessonMutation.mutate(selectedLesson.id)}
                      disabled={completeLessonMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Tamamlandı
                    </Button>
                  </div>
                  <p className="text-gray-600">{selectedLesson.description}</p>
                </div>

                {/* Lesson Content Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Məzmun</TabsTrigger>
                    <TabsTrigger value="materials">Materiallar</TabsTrigger>
                    <TabsTrigger value="assignments">Tapşırıqlar</TabsTrigger>
                  </TabsList>

                  {/* Content Tab */}
                  <TabsContent value="content" className="space-y-6">
                    {/* Video Section */}
                    {selectedLesson.videoUrl && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Video className="w-5 h-5 mr-2" />
                            Video Dərs
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedLesson.videoUrl.includes('youtube.com') || selectedLesson.videoUrl.includes('youtu.be') ? (
                            <div className="aspect-video">
                              <iframe
                                src={selectedLesson.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                title={selectedLesson.title}
                                className="w-full h-full rounded-lg"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">Video mövcud deyil</p>
                                <a
                                  href={selectedLesson.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline mt-2 inline-block"
                                >
                                  Xarici linkdə aç
                                </a>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Text Content */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BookOpen className="w-5 h-5 mr-2" />
                          Dərs Məzmunu
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div 
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: selectedLesson.content || "Məzmun mövcud deyil" }}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Materials Tab */}
                  <TabsContent value="materials" className="space-y-4">
                    {Array.isArray(lessonMaterials) && lessonMaterials.length > 0 ? (
                      lessonMaterials.map((material: LessonMaterial) => (
                        <Card key={material.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  {material.type === 'video' ? <Video className="w-5 h-5 text-blue-600" /> :
                                   material.type === 'document' ? <FileText className="w-5 h-5 text-blue-600" /> :
                                   material.type === 'link' ? <Link2 className="w-5 h-5 text-blue-600" /> :
                                   <File className="w-5 h-5 text-blue-600" />}
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900">{material.title}</h3>
                                  <p className="text-sm text-gray-600">{material.description}</p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(material.url, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Aç
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Bu dərs üçün material mövcud deyil</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* Assignments Tab */}
                  <TabsContent value="assignments" className="space-y-4">
                    {Array.isArray(lessonAssignments) && lessonAssignments.length > 0 ? (
                      lessonAssignments.map((assignment: LessonAssignment) => {
                        const submission = getSubmissionForAssignment(assignment.id);
                        const isEditing = editingSubmissionId === submission?.id;
                        
                        return (
                          <Card key={assignment.id}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center">
                                  <ClipboardList className="w-5 h-5 mr-2" />
                                  {assignment.title}
                                </CardTitle>
                                <div className="flex items-center space-x-2">
                                  {assignment.points > 0 && (
                                    <Badge variant="secondary">{assignment.points} bal</Badge>
                                  )}
                                  {submission && (
                                    <Badge 
                                      variant={
                                        submission.status === 'graded' ? 'default' :
                                        submission.status === 'returned' ? 'destructive' :
                                        'secondary'
                                      }
                                    >
                                      {submission.status === 'graded' ? 'Qiymətləndirilib' :
                                       submission.status === 'returned' ? 'Qaytarılıb' :
                                       submission.status === 'resubmitted' ? 'Yenidən göndərilib' :
                                       'Göndərilib'}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div 
                                className="prose max-w-none mb-4"
                                dangerouslySetInnerHTML={{ __html: assignment.description }}
                              />
                              
                              {assignment.dueDate && (
                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Son tarix: {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}
                                </div>
                              )}

                              {/* Submission Section */}
                              {submission ? (
                                <div className="border-t pt-4">
                                  {submission.status === 'returned' || isEditing ? (
                                    // Edit form for returned submissions
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="content">Tapşırıq Məzmunu</Label>
                                        <Textarea
                                          id="content"
                                          value={assignmentContent}
                                          onChange={(e) => setAssignmentContent(e.target.value)}
                                          placeholder="Tapşırığınızı burada yazın..."
                                          className="mt-1"
                                          rows={4}
                                        />
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="github">GitHub Linki (ixtiyari)</Label>
                                        <Input
                                          id="github"
                                          type="url"
                                          value={githubUrl}
                                          onChange={(e) => setGithubUrl(e.target.value)}
                                          placeholder="https://github.com/username/repo"
                                          className="mt-1"
                                        />
                                      </div>

                                      <div className="flex space-x-2">
                                        <Button
                                          onClick={() => handleSubmitAssignment(assignment.id)}
                                          disabled={submitAssignmentMutation.isPending || resubmitAssignmentMutation.isPending}
                                        >
                                          <Send className="w-4 h-4 mr-2" />
                                          Yenidən Göndər
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() => {
                                            setEditingSubmissionId(null);
                                            setAssignmentContent("");
                                            setGithubUrl("");
                                          }}
                                        >
                                          Ləğv et
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    // Display submitted work
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Sizin cavabınız:</h4>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                          <p className="text-gray-800">{submission.content}</p>
                                          {submission.githubUrl && (
                                            <a
                                              href={submission.githubUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:underline mt-2 inline-block"
                                            >
                                              GitHub Linki
                                            </a>
                                          )}
                                        </div>
                                      </div>

                                      {submission.grade !== null && (
                                        <div>
                                          <h4 className="font-medium text-gray-900 mb-2">Qiymət:</h4>
                                          <div className="bg-green-50 p-3 rounded-lg">
                                            <p className="text-green-800 font-medium">{submission.grade} / {assignment.points}</p>
                                          </div>
                                        </div>
                                      )}

                                      {submission.feedback && (
                                        <div>
                                          <h4 className="font-medium text-gray-900 mb-2">Müəllim rəyi:</h4>
                                          <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-blue-800">{submission.feedback}</p>
                                          </div>
                                        </div>
                                      )}

                                      {submission.status === 'returned' && (
                                        <Button
                                          onClick={() => handleEditSubmission(submission)}
                                          variant="outline"
                                        >
                                          <Edit className="w-4 h-4 mr-2" />
                                          Düzəliş et
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                // New submission form
                                <div className="border-t pt-4 space-y-4">
                                  <div>
                                    <Label htmlFor="content">Tapşırıq Məzmunu</Label>
                                    <Textarea
                                      id="content"
                                      value={assignmentContent}
                                      onChange={(e) => setAssignmentContent(e.target.value)}
                                      placeholder="Tapşırığınızı burada yazın..."
                                      className="mt-1"
                                      rows={4}
                                    />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="github">GitHub Linki (ixtiyari)</Label>
                                    <Input
                                      id="github"
                                      type="url"
                                      value={githubUrl}
                                      onChange={(e) => setGithubUrl(e.target.value)}
                                      placeholder="https://github.com/username/repo"
                                      className="mt-1"
                                    />
                                  </div>

                                  <Button
                                    onClick={() => handleSubmitAssignment(assignment.id)}
                                    disabled={submitAssignmentMutation.isPending}
                                  >
                                    <Send className="w-4 h-4 mr-2" />
                                    Göndər
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Bu dərs üçün tapşırıq mövcud deyil</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Dərs seçin</h2>
                <p className="text-gray-600">Dərs məzmununu görmək üçün sol paneldən dərs seçin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}