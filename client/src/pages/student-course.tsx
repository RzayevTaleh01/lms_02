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
  Eye,
  File,
  Image,
  Music,
  Archive
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { StudentSidebar } from "@/components/student-sidebar";

export default function StudentCoursePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("content");

  // Fetch course details
  const { data: course } = useQuery({
    queryKey: ['/api/courses', id],
    enabled: !!id
  });

  // Fetch lessons for this course
  const { data: lessons = [] } = useQuery({
    queryKey: ['/api/courses', id, 'lessons'],
    queryFn: () => fetch(`/api/courses/${id}/lessons`).then(r => r.json()),
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
    queryFn: () => fetch(`/api/lessons/${selectedLesson?.id}/materials`).then(r => r.json()),
    enabled: !!selectedLesson
  });

  // Fetch lesson assignments when lesson is selected
  const { data: assignments = [] } = useQuery({
    queryKey: ['/api/lessons', selectedLesson?.id, 'assignments'],
    queryFn: () => fetch(`/api/lessons/${selectedLesson?.id}/assignments`).then(r => r.json()),
    enabled: !!selectedLesson
  });

  // Set first lesson as selected by default
  useEffect(() => {
    if (lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(lessons[0]);
    }
  }, [lessons, selectedLesson]);

  const calculateLessonProgress = (lessonId: number) => {
    // Həmin dərsin tapşırıqlarını tap
    const lessonAssignments = assignments.filter((a: any) => a.lessonId === lessonId);
    
    if (lessonAssignments.length === 0) return 100; // Tapşırıq yoxdursa 100%
    
    // Göndərilmiş tapşırıqları say
    const submittedAssignments = lessonAssignments.filter((assignment: any) => 
      submissions.some((s: any) => s.assignmentId === assignment.id)
    );
    
    return Math.round((submittedAssignments.length / lessonAssignments.length) * 100);
  };

  const calculateOverallProgress = () => {
    if (lessons.length === 0) return 0;
    
    const totalProgress = lessons.reduce((sum: number, lesson: any) => {
      return sum + calculateLessonProgress(lesson.id);
    }, 0);
    
    return Math.round(totalProgress / lessons.length);
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const getMaterialIcon = (material: any) => {
    const type = material.materialType?.toLowerCase() || material.type?.toLowerCase() || 'document';
    
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'document':
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'link':
      case 'url':
        return <Link2 className="w-5 h-5 text-blue-500" />;
      case 'image':
      case 'img':
        return <Image className="w-5 h-5 text-green-500" />;
      case 'audio':
        return <Music className="w-5 h-5 text-purple-500" />;
      case 'archive':
      case 'zip':
        return <Archive className="w-5 h-5 text-orange-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleMaterialClick = (material: any) => {
    if (material.videoUrl) {
      window.open(material.videoUrl, '_blank');
    } else if (material.content) {
      // Link olarsa aç
      if (material.content.startsWith('http')) {
        window.open(material.content, '_blank');
      } else if (material.content.includes('.pdf') || material.content.includes('.doc')) {
        window.open(material.content, '_blank');
      }
    }
  };

  if (!course) {
    return (
      <div className="flex h-screen">
        <StudentSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0 flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-gray-600 mt-1">Kurs Məzmunu</p>
              </div>
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
                  const isActive = selectedLesson?.id === lesson.id;
                  const lessonProgress = calculateLessonProgress(lesson.id);
                  
                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "p-4 rounded-lg cursor-pointer transition-colors mb-2",
                        isActive ? "bg-orange-50 border border-orange-200" : "hover:bg-gray-50"
                      )}
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                            lessonProgress === 100
                              ? "bg-green-100 text-green-700"
                              : isActive 
                                ? "bg-orange-100 text-orange-700"
                                : "bg-gray-100 text-gray-600"
                          )}>
                            {lessonProgress === 100 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {lesson.duration || 0} həftə dəqiqə
                            </span>
                          </div>
                          {/* Dərs Progress Bar */}
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Tərəqqi</span>
                              <span className="text-xs font-medium text-gray-700">{lessonProgress}%</span>
                            </div>
                            <Progress 
                              value={lessonProgress} 
                              className="h-1.5" 
                            />
                          </div>
                        </div>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!selectedLesson ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Dərs seçin</h3>
                  <p>Məzmunu görmək üçün sol tərəfdən bir dərs seçin</p>
                </div>
              </div>
            ) : (
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
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="p-6 text-center">
                                      <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                      <p className="text-gray-500">Video mövcud deyil</p>
                                      <p className="text-xs text-gray-400 mt-1">URL: {selectedLesson.videoUrl}</p>
                                    </div>
                                  );
                                }
                              })()}
                            </CardContent>
                          </Card>
                        )}

                        {/* Lesson Info */}
                        <Card>
                          <CardHeader>
                            <CardTitle>{selectedLesson.title}</CardTitle>
                            {selectedLesson.description && (
                              <p className="text-gray-600">{selectedLesson.description}</p>
                            )}
                          </CardHeader>
                          {selectedLesson.content && (
                            <CardContent>
                              <div 
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                              />
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="materials" className="m-0 h-full">
                      <div className="p-6">
                        {materials.length === 0 ? (
                          <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500">Bu dərs üçün material yoxdur</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {materials.map((material: any) => (
                              <Card key={material.id} className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-4" onClick={() => handleMaterialClick(material)}>
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3 flex-1">
                                      {getMaterialIcon(material)}
                                      <div className="flex-1">
                                        <h4 className="font-medium">{material.title}</h4>
                                        {material.description && (
                                          <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                                        )}
                                        <Badge variant="secondary" className="mt-2">
                                          {material.materialType || material.type || 'Sənəd'}
                                        </Badge>
                                      </div>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={(e) => {
                                      e.stopPropagation();
                                      handleMaterialClick(material);
                                    }}>
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Aç
                                    </Button>
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
                            <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500">Bu dərs üçün tapşırıq yoxdur</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {assignments.map((assignment: any) => {
                              const studentSubmission = submissions.find((s: any) => s.assignmentId === assignment.id);
                              const isSubmitted = !!studentSubmission;
                              const isGraded = studentSubmission?.grade !== null;
                              const isReturned = studentSubmission?.status === 'returned';

                              return (
                                <Card key={assignment.id}>
                                  <CardHeader>
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                                        <div 
                                          className="text-sm text-gray-600 mt-2 prose max-w-none"
                                          dangerouslySetInnerHTML={{ __html: assignment.description }}
                                        />
                                      </div>
                                      <div className="flex flex-col items-end space-y-2">
                                        <Badge variant={isSubmitted ? (isGraded ? "default" : "secondary") : "destructive"}>
                                          {isReturned ? "Qaytarılıb" : isGraded ? "Qiymətləndirilib" : isSubmitted ? "Göndərilib" : "Gözləyir"}
                                        </Badge>
                                        {assignment.dueDate && (
                                          <div className="text-xs text-gray-500 flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    {isSubmitted && studentSubmission ? (
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
                                            Göndərilmə tarixi: {new Date(studentSubmission.submittedAt).toLocaleDateString('az-AZ')}
                                          </div>
                                          
                                          {isGraded && studentSubmission.feedback && (
                                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                              <div className="text-sm font-medium text-blue-800 mb-1">Müəllim rəyi:</div>
                                              <div className="text-sm text-blue-700">{studentSubmission.feedback}</div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-center py-8">
                                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                        <p className="text-gray-500 mb-4">Tapşırığı hələ göndərməmisiniz</p>
                                        <Button asChild>
                                          <Link href={`/student/assignments/${assignment.id}`}>
                                            Tapşırığı Göndər
                                          </Link>
                                        </Button>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}