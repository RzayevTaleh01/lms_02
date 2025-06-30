import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
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
  Link2
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function StudentCourse() {
  const { id } = useParams();
  const { user } = useUser();
  const { toast } = useToast();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [submissionForm, setSubmissionForm] = useState({
    content: "",
    githubUrl: "",
    fileUrl: ""
  });

  // Fetch course data
  const { data: course } = useQuery({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id
  });

  // Fetch lessons
  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${id}/lessons`],
    enabled: !!id
  });

  // Fetch lesson materials
  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${selectedLesson?.id}/materials`],
    enabled: !!selectedLesson
  });

  // Fetch lesson assignments
  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${selectedLesson?.id}/assignments`],
    enabled: !!selectedLesson
  });

  // Fetch student submissions
  const { data: submissions = [] } = useQuery({
    queryKey: ["/api/submissions"],
    enabled: !!user
  });

  // Submit assignment mutation
  const submitAssignmentMutation = useMutation({
    mutationFn: async ({ assignmentId, content, githubUrl, fileUrl }: {
      assignmentId: number;
      content: string;
      githubUrl?: string;
      fileUrl?: string;
    }) => {
      return apiRequest("POST", `/api/assignments/${assignmentId}/submissions`, {
        content,
        githubUrl,
        fileUrl,
        studentId: user?.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/submissions"] });
      setSubmissionForm({ content: "", githubUrl: "", fileUrl: "" });
      toast({ title: "Tapşırıq uğurla göndərildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Tapşırıq göndərilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Auto-select first lesson if none selected
  if (lessons.length > 0 && !selectedLesson) {
    setSelectedLesson(lessons[0]);
  }

  const renderYouTubeVideo = (url: string) => {
    if (!url) return null;
    
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    }
    
    if (videoId) {
      return (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Video className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Video dəstəklənmir</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
            Linki açın
          </a>
        </div>
      </div>
    );
  };

  if (!course) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Course Content */}
      <div className="w-80 border-r bg-background">
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold">{course.title}</h1>
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-2">
            {lessons.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Hələ dərs əlavə edilməyib</p>
              </div>
            ) : (
              lessons.map((lesson: any, index: number) => (
                <Button
                  key={lesson.id}
                  variant={selectedLesson?.id === lesson.id ? "default" : "ghost"}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      {selectedLesson?.id === lesson.id ? (
                        <PlayCircle className="w-4 h-4" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{lesson.title}</div>
                      {lesson.duration && (
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.duration} dəqiqə
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {selectedLesson ? (
          <>
            {/* Video Section */}
            <div className="p-6 border-b">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{selectedLesson.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {selectedLesson.duration && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedLesson.duration} dəqiqə
                    </div>
                  )}
                </div>
              </div>
              
              {selectedLesson.videoUrl && (
                <div className="mb-6">
                  {renderYouTubeVideo(selectedLesson.videoUrl)}
                </div>
              )}
            </div>

            {/* Content Tabs */}
            <div className="flex-1 p-6">
              <Tabs defaultValue="content" className="h-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Məzmun</TabsTrigger>
                  <TabsTrigger value="materials">Materiallar ({materials.length})</TabsTrigger>
                  <TabsTrigger value="assignments">Tapşırıqlar ({assignments.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="h-full">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="prose prose-sm max-w-none">
                      {selectedLesson.content ? (
                        <div dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Bu dərsin məzmunu yoxdur</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="materials" className="h-full">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-4">
                      {materials.length === 0 ? (
                        <div className="text-center py-8">
                          <Download className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Bu dərsin materialı yoxdur</p>
                        </div>
                      ) : (
                        materials.map((material: any) => (
                          <Card key={material.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-1">{material.title}</h4>
                                  <Badge variant="outline" className="mb-2">
                                    {material.type === "video" ? "Video" : 
                                     material.type === "document" ? "Sənəd" : "Link"}
                                  </Badge>
                                  {material.description && (
                                    <div 
                                      className="text-sm text-muted-foreground prose prose-sm"
                                      dangerouslySetInnerHTML={{ __html: material.description }}
                                    />
                                  )}
                                </div>
                                {material.url && (
                                  <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 ml-4"
                                  >
                                    <Button size="sm" variant="outline">
                                      <Link2 className="w-4 h-4 mr-1" />
                                      Aç
                                    </Button>
                                  </a>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="assignments" className="h-full">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-4">
                      {assignments.length === 0 ? (
                        <div className="text-center py-8">
                          <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Bu dərsin tapşırığı yoxdur</p>
                        </div>
                      ) : (
                        assignments.map((assignment: any) => {
                          const studentSubmission = submissions.find((s: any) => s.assignmentId === assignment.id);
                          
                          return (
                            <Card key={assignment.id}>
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  {/* Assignment Header */}
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="text-lg font-semibold mb-2">{assignment.title}</h4>
                                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                                        <div className="flex items-center">
                                          <Award className="w-4 h-4 mr-1" />
                                          {assignment.maxPoints} bal
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
                                        variant={studentSubmission.grade ? "default" : "secondary"}
                                        className="ml-4"
                                      >
                                        {studentSubmission.grade ? `${studentSubmission.grade} bal` : "Gözləyir"}
                                      </Badge>
                                    )}
                                  </div>

                                  {/* Assignment Description */}
                                  {assignment.description && (
                                    <div 
                                      className="prose prose-sm"
                                      dangerouslySetInnerHTML={{ __html: assignment.description }}
                                    />
                                  )}

                                  <Separator />

                                  {/* Submission Section */}
                                  {!studentSubmission ? (
                                    <div className="space-y-4">
                                      <h5 className="font-medium">Tapşırığı göndər</h5>
                                      <div className="space-y-3">
                                        <div>
                                          <label className="text-sm font-medium">Cavab məzmunu</label>
                                          <Textarea
                                            placeholder="Tapşırığın cavabını buraya yazın..."
                                            value={submissionForm.content}
                                            onChange={(e) => setSubmissionForm(prev => ({ ...prev, content: e.target.value }))}
                                            rows={4}
                                          />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">GitHub linki (istəyə bağlı)</label>
                                          <Input
                                            placeholder="https://github.com/..."
                                            value={submissionForm.githubUrl}
                                            onChange={(e) => setSubmissionForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                                          />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Fayl linki (istəyə bağlı)</label>
                                          <Input
                                            placeholder="Fayl linkini daxil edin..."
                                            value={submissionForm.fileUrl}
                                            onChange={(e) => setSubmissionForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                                          />
                                        </div>
                                        <Button
                                          onClick={() => {
                                            if (submissionForm.content.trim()) {
                                              submitAssignmentMutation.mutate({
                                                assignmentId: assignment.id,
                                                content: submissionForm.content,
                                                githubUrl: submissionForm.githubUrl || undefined,
                                                fileUrl: submissionForm.fileUrl || undefined
                                              });
                                            }
                                          }}
                                          disabled={!submissionForm.content.trim() || submitAssignmentMutation.isPending}
                                          className="w-full"
                                        >
                                          <Upload className="w-4 h-4 mr-2" />
                                          {submitAssignmentMutation.isPending ? "Göndərilir..." : "Tapşırığı Göndər"}
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="space-y-3">
                                      <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-green-600">Tapşırıq göndərilib</span>
                                      </div>
                                      
                                      <div className="bg-muted p-4 rounded-lg space-y-2">
                                        <p className="text-sm"><strong>Cavab:</strong> {studentSubmission.content}</p>
                                        {studentSubmission.githubUrl && (
                                          <p className="text-sm">
                                            <strong>GitHub:</strong> 
                                            <a href={studentSubmission.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                              {studentSubmission.githubUrl}
                                            </a>
                                          </p>
                                        )}
                                        {studentSubmission.fileUrl && (
                                          <p className="text-sm">
                                            <strong>Fayl:</strong>
                                            <a href={studentSubmission.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                              Faylı yüklə
                                            </a>
                                          </p>
                                        )}
                                        {studentSubmission.feedback && (
                                          <p className="text-sm">
                                            <strong>Müəllim rəyi:</strong> {studentSubmission.feedback}
                                          </p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                          Göndərilmə tarixi: {new Date(studentSubmission.submittedAt).toLocaleString('az-AZ')}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Dərs seçin</h3>
              <p className="text-muted-foreground">Soldan dərsi seçərək öyrənməyə başlayın</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}