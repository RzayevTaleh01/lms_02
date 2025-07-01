import { useParams, Link, useLocation } from "wouter";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Upload, 
  Calendar, 
  Clock,
  CheckCircle,
  PlayCircle,
  ChevronRight,
  Award,
  Link2,
  Menu,
  Home,
  GraduationCap,
  ClipboardList,
  User,
  LogOut,
  AlertCircle,
  ExternalLink,
  Send,
  Eye
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { StaticSidebar } from "@/components/layout/static-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function StudentCourse() {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [submissionForm, setSubmissionForm] = useState({
    content: "",
    githubUrl: "",
    fileUrl: ""
  });

  // Fetch course data
  const { data: course } = useQuery({
    queryKey: ['/api/courses', id],
    enabled: !!id
  });

  // Fetch lessons
  const { data: lessons = [] } = useQuery({
    queryKey: ['/api/courses', id, 'lessons'],
    enabled: !!id
  });

  // Fetch course progress
  const { data: lessonProgress = [] } = useQuery({
    queryKey: ['/api/courses', id, 'progress'],
    enabled: !!id
  });

  // Fetch submissions
  const { data: submissions = [] } = useQuery({
    queryKey: ['/api/submissions'],
    enabled: !!user
  });

  // Fetch lesson materials when lesson is selected
  const { data: materials = [] } = useQuery({
    queryKey: ['/api/lessons', selectedLesson?.id, 'materials'],
    enabled: !!selectedLesson
  });

  // Fetch lesson assignments when lesson is selected
  const { data: assignments = [] } = useQuery({
    queryKey: ['/api/lessons', selectedLesson?.id, 'assignments'],
    enabled: !!selectedLesson
  });

  // Select first lesson on load
  useEffect(() => {
    if (lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(lessons[0]);
    }
  }, [lessons, selectedLesson]);

  // Clear form when changing lessons
  useEffect(() => {
    setSubmissionForm({
      content: "",
      githubUrl: "",
      fileUrl: ""
    });
  }, [selectedLesson]);

  // Populate form for returned submissions
  useEffect(() => {
    if (assignments.length > 0 && submissions.length > 0) {
      assignments.forEach(assignment => {
        const returnedSubmission = submissions.find(s => 
          s.assignmentId === assignment.id && s.status === 'returned'
        );
        if (returnedSubmission) {
          setSubmissionForm({
            content: returnedSubmission.content || "",
            githubUrl: returnedSubmission.githubUrl || "",
            fileUrl: returnedSubmission.fileUrl || ""
          });
        }
      });
    }
  }, [assignments, submissions]);

  // Lesson completion mutation
  const completeLessonMutation = useMutation({
    mutationFn: (lessonId: number) => 
      apiRequest(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
        body: { courseId: id }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/courses', id, 'progress'] });
      toast({ title: "Dərs tamamlandı!" });
    }
  });

  // Watch time tracking mutation
  const watchTimeMutation = useMutation({
    mutationFn: ({ lessonId, timeSpent }: { lessonId: number; timeSpent: number }) =>
      apiRequest(`/api/lessons/${lessonId}/watch-time`, {
        method: 'POST',
        body: { courseId: id, timeSpent }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/courses', id, 'progress'] });
    }
  });

  // Assignment submission mutation
  const submitAssignmentMutation = useMutation({
    mutationFn: ({ assignmentId, submissionData }: { assignmentId: number; submissionData: any }) =>
      apiRequest(`/api/lesson-assignments/${assignmentId}/submissions`, {
        method: 'POST',
        body: submissionData
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      setSubmissionForm({ content: "", githubUrl: "", fileUrl: "" });
      toast({ title: "Tapşırıq göndərildi!" });
    }
  });

  // Assignment resubmission mutation
  const resubmitAssignmentMutation = useMutation({
    mutationFn: ({ submissionId, submissionData }: { submissionId: number; submissionData: any }) =>
      apiRequest(`/api/submissions/${submissionId}/resubmit`, {
        method: 'PATCH',
        body: submissionData
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      setSubmissionForm({ content: "", githubUrl: "", fileUrl: "" });
      toast({ title: "Tapşırıq yenidən göndərildi!" });
    }
  });

  // Utility functions
  const isLessonCompleted = (lessonId: number) => {
    return lessonProgress.some((progress: any) => 
      progress.lessonId === lessonId && progress.completed
    );
  };

  const getLessonProgress = (lessonId: number) => {
    const progress = lessonProgress.find((p: any) => p.lessonId === lessonId);
    return progress ? progress.progress || 0 : 0;
  };

  const getVideoId = (url: string) => {
    if (!url) return null;
    
    try {
      // Handle youtube.com/watch?v= format
      const watchMatch = url.match(/[?&]v=([^&]+)/);
      if (watchMatch) return watchMatch[1];
      
      // Handle youtu.be/ format
      const shortMatch = url.match(/youtu\.be\/([^?]+)/);
      if (shortMatch) return shortMatch[1];
      
      // Handle youtube.com/embed/ format
      const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/);
      if (embedMatch) return embedMatch[1];
      
      return null;
    } catch {
      return null;
    }
  };

  const handleAssignmentSubmit = (assignment: any) => {
    const existingSubmission = submissions.find((s: any) => s.assignmentId === assignment.id);
    
    const submissionData = {
      ...submissionForm,
      studentId: user?.id,
      courseId: id
    };

    if (existingSubmission && existingSubmission.status === 'returned') {
      // Resubmit
      resubmitAssignmentMutation.mutate({
        submissionId: existingSubmission.id,
        submissionData
      });
    } else {
      // New submission
      submitAssignmentMutation.mutate({
        assignmentId: assignment.id,
        submissionData
      });
    }
  };

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      completeLessonMutation.mutate(selectedLesson.id);
    }
  };

  const calculateOverallProgress = () => {
    if (lessons.length === 0) return 0;
    
    let totalProgress = 0;
    lessons.forEach((lesson: any) => {
      const progress = getLessonProgress(lesson.id);
      totalProgress += progress;
    });
    
    return Math.round(totalProgress / lessons.length);
  };

  if (!course) {
    return (
      <div className="flex h-screen">
        <StaticSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <StaticSidebar />
      
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600 mt-1">Kurs Məzmunu</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Ümumi tərəqqi: {calculateOverallProgress()}%
              </div>
              <Progress value={calculateOverallProgress()} className="w-32" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Lessons Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Dərslər</h2>
              <p className="text-sm text-gray-500">{lessons.length} məzmun</p>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-2">
                {lessons.map((lesson: any, index: number) => {
                  const progress = getLessonProgress(lesson.id);
                  const isCompleted = isLessonCompleted(lesson.id);
                  const isActive = selectedLesson?.id === lesson.id;
                  
                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "p-4 rounded-lg cursor-pointer transition-colors mb-2",
                        isActive
                          ? "bg-orange-50 border-2 border-orange-200"
                          : "hover:bg-gray-50 border border-transparent"
                      )}
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs font-medium text-gray-500">
                              {index + 1}.
                            </span>
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {lesson.title}
                            </h3>
                            {isCompleted && (
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                          
                          {lesson.duration && (
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <Clock className="w-3 h-3 mr-1" />
                              {lesson.duration} dəq
                            </div>
                          )}
                          
                          <Progress value={progress} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">{progress}% tamamlandı</p>
                        </div>
                        
                        <ChevronRight className={cn(
                          "w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2",
                          isActive && "rotate-90"
                        )} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {selectedLesson ? (
              <>
                {/* Lesson Header */}
                <div className="bg-white border-b border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h1 className="text-xl font-bold text-gray-900">{selectedLesson.title}</h1>
                      {selectedLesson.duration && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedLesson.duration} dəqiqə
                        </div>
                      )}
                    </div>
                    
                    <Button
                      onClick={handleCompleteLesson}
                      disabled={isLessonCompleted(selectedLesson.id) || completeLessonMutation.isPending}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isLessonCompleted(selectedLesson.id) ? "Tamamlandı" : "Dərsi Tamamla"}
                    </Button>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="flex-1 overflow-auto">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <TabsList className="w-full justify-start border-b border-gray-200 rounded-none bg-transparent p-0">
                      <TabsTrigger 
                        value="content" 
                        className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
                      >
                        Məzmun
                      </TabsTrigger>
                      <TabsTrigger 
                        value="materials" 
                        className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
                      >
                        Materiallar ({materials.length})
                      </TabsTrigger>
                      <TabsTrigger 
                        value="assignments" 
                        className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
                      >
                        Tapşırıqlar ({assignments.length})
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex-1 overflow-auto">
                      <TabsContent value="content" className="m-0 h-full">
                        <div className="p-6 space-y-6">
                          {/* Video Player */}
                          {selectedLesson.videoUrl && (
                            <Card>
                              <CardContent className="p-0">
                                {(() => {
                                  const videoId = getVideoId(selectedLesson.videoUrl);
                                  if (videoId) {
                                    return (
                                      <div className="relative w-full pt-[56.25%]">
                                        <iframe
                                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                                          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1`}
                                          title={selectedLesson.title}
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                          allowFullScreen
                                        />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className="relative w-full pt-[56.25%] bg-gray-100 rounded-lg flex items-center justify-center">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                          <Video className="w-12 h-12 mb-2" />
                                          <p className="text-sm">Video mövcud deyil</p>
                                          <a 
                                            href={selectedLesson.videoUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline text-sm mt-2 flex items-center"
                                          >
                                            <ExternalLink className="w-3 h-3 mr-1" />
                                            Xarici linkdə aç
                                          </a>
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}
                              </CardContent>
                            </Card>
                          )}

                          {/* Lesson Description */}
                          {selectedLesson.description && (
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Dərs Haqqında</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div 
                                  className="prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: selectedLesson.description }}
                                />
                              </CardContent>
                            </Card>
                          )}

                          {/* Lesson Content */}
                          {selectedLesson.content && (
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Dərs Məzmunu</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div 
                                  className="prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                                />
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="materials" className="m-0 h-full">
                        <div className="p-6">
                          {materials.length === 0 ? (
                            <div className="text-center py-12">
                              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                              <p className="text-gray-500">Bu dərsin materialı yoxdur</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {materials.map((material: any) => (
                                <Card key={material.id} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-2">{material.title}</h3>
                                        {material.description && (
                                          <div 
                                            className="prose prose-sm text-gray-600 mb-3"
                                            dangerouslySetInnerHTML={{ __html: material.description }}
                                          />
                                        )}
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                          <Badge variant="outline">{material.type}</Badge>
                                        </div>
                                      </div>
                                      {material.url && (
                                        <Button variant="outline" size="sm" asChild>
                                          <a href={material.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            Aç
                                          </a>
                                        </Button>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="assignments" className="m-0 h-full">
                        <div className="p-6">
                          {assignments.length === 0 ? (
                            <div className="text-center py-12">
                              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                              <p className="text-gray-500">Bu dərsin tapşırığı yoxdur</p>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {assignments.map((assignment: any) => {
                                const studentSubmission = submissions.find((s: any) => s.assignmentId === assignment.id);
                                const isReturned = studentSubmission?.status === 'returned';
                                const isGraded = studentSubmission?.grade !== null && studentSubmission?.grade !== undefined;
                                
                                return (
                                  <Card key={assignment.id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                      {/* Assignment Header */}
                                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                        <div className="flex-1 mb-4 sm:mb-0">
                                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
                                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                              <Award className="w-4 h-4 mr-1" />
                                              {assignment.points} bal
                                            </div>
                                            {assignment.dueDate && (
                                              <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        {studentSubmission && (
                                          <Badge 
                                            variant={isReturned ? "destructive" : isGraded ? "default" : "secondary"}
                                            className="mb-2 sm:mb-0"
                                          >
                                            {isReturned ? "Yenidən Göndər" :
                                             isGraded ? `${studentSubmission.grade} bal` : "Gözləyir"}
                                          </Badge>
                                        )}
                                      </div>

                                      {/* Assignment Description */}
                                      {assignment.description && (
                                        <>
                                          <div 
                                            className="prose prose-sm max-w-none mb-4"
                                            dangerouslySetInnerHTML={{ __html: assignment.description }}
                                          />
                                          <Separator className="mb-4" />
                                        </>
                                      )}

                                      {/* Submission Section */}
                                      {!studentSubmission || isReturned ? (
                                        <div className="space-y-4">
                                          {/* Returned submission notice */}
                                          {isReturned && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                              <div className="flex items-center space-x-2 mb-2">
                                                <AlertCircle className="w-4 h-4 text-red-600" />
                                                <span className="text-sm font-medium text-red-800">Tapşırıq yenidən göndərilməlidir</span>
                                              </div>
                                              {studentSubmission.feedback && (
                                                <div className="text-sm text-red-700 bg-red-100 rounded p-2">
                                                  <strong>Müəllim rəyi:</strong> {studentSubmission.feedback}
                                                </div>
                                              )}
                                            </div>
                                          )}

                                          {/* Submission Form */}
                                          <div className="space-y-4">
                                            <div>
                                              <Label htmlFor={`content-${assignment.id}`}>Cavab *</Label>
                                              <Textarea
                                                id={`content-${assignment.id}`}
                                                placeholder="Tapşırığınızın cavabını yazın..."
                                                value={submissionForm.content}
                                                onChange={(e) => setSubmissionForm(prev => ({ ...prev, content: e.target.value }))}
                                                className="mt-1"
                                                rows={4}
                                              />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div>
                                                <Label htmlFor={`github-${assignment.id}`}>GitHub URL</Label>
                                                <Input
                                                  id={`github-${assignment.id}`}
                                                  type="url"
                                                  placeholder="https://github.com/..."
                                                  value={submissionForm.githubUrl}
                                                  onChange={(e) => setSubmissionForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                                                  className="mt-1"
                                                />
                                              </div>

                                              <div>
                                                <Label htmlFor={`file-${assignment.id}`}>Fayl URL</Label>
                                                <Input
                                                  id={`file-${assignment.id}`}
                                                  type="url"
                                                  placeholder="https://example.com/file..."
                                                  value={submissionForm.fileUrl}
                                                  onChange={(e) => setSubmissionForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                                                  className="mt-1"
                                                />
                                              </div>
                                            </div>

                                            <Button 
                                              onClick={() => handleAssignmentSubmit(assignment)}
                                              disabled={!submissionForm.content.trim() || submitAssignmentMutation.isPending || resubmitAssignmentMutation.isPending}
                                              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                            >
                                              <Send className="w-4 h-4 mr-2" />
                                              {isReturned ? "Yenidən Göndər" : "Tapşırığı Göndər"}
                                            </Button>
                                          </div>
                                        </div>
                                      ) : (
                                        /* Submission Details */
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                          <div className="flex items-center space-x-2 mb-3">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-800">Tapşırıq göndərilib</span>
                                          </div>
                                          
                                          <div className="space-y-2 text-sm">
                                            <div>
                                              <strong>Cavab:</strong> {studentSubmission.content}
                                            </div>
                                            {studentSubmission.githubUrl && (
                                              <div>
                                                <strong>GitHub:</strong> 
                                                <a href={studentSubmission.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                                  {studentSubmission.githubUrl}
                                                </a>
                                              </div>
                                            )}
                                            <div className="text-xs text-gray-500">
                                              Göndərilmə tarixi: {new Date(studentSubmission.submittedAt).toLocaleDateString('az-AZ')} {new Date(studentSubmission.submittedAt).toLocaleTimeString('az-AZ')}
                                            </div>
                                            
                                            {isGraded && studentSubmission.feedback && (
                                              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                                <div className="text-sm font-medium text-blue-800 mb-1">Müəllim rəyi:</div>
                                                <div className="text-sm text-blue-700">{studentSubmission.feedback}</div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <p>Dərsi seçin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}