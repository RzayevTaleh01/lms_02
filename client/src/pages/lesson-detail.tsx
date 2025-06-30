import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  Clock
} from "lucide-react";
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch lesson details
  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: [`/api/lessons/${lessonId}`],
    enabled: !!lessonId,
  });

  // Fetch lesson materials
  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${lessonId}/materials`],
    enabled: !!lessonId,
  });

  // Fetch lesson assignments
  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${lessonId}/assignments`],
    enabled: !!lessonId,
  });

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (lessonLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="aspect-video bg-muted rounded-lg"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-muted-foreground">Dərs tapılmadı</h1>
          <Button 
            variant="outline" 
            onClick={() => setLocation(`/courses/${courseId}`)}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri qayıt
          </Button>
        </div>
      </div>
    );
  }

  const videoId = extractYouTubeId(lesson.videoUrl);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation(`/courses/${courseId}`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kursa qayıt
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.description}</p>
              </div>
            </div>
            {lesson.duration && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{lesson.duration} dəqiqə</span>
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {videoId && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={lesson.title}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lesson Content */}
            {lesson.content && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Dərs Məzmunu</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Tabs defaultValue="materials" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="materials">Materiallar</TabsTrigger>
                <TabsTrigger value="assignments">Tapşırıqlar</TabsTrigger>
              </TabsList>

              <TabsContent value="materials" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dərs Materialları</CardTitle>
                    <CardDescription>
                      Bu dərsə aid əlavə materiallar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {materials.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Hələ material əlavə edilməyib
                      </p>
                    ) : (
                      materials.map((material: any) => (
                        <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {material.materialType === "video" && <Play className="w-4 h-4 text-blue-500" />}
                            {material.materialType === "document" && <FileText className="w-4 h-4 text-green-500" />}
                            {material.materialType === "link" && <ExternalLink className="w-4 h-4 text-purple-500" />}
                            <div>
                              <p className="font-medium text-sm">{material.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {material.materialType === "video" && "Video"}
                                {material.materialType === "document" && "Sənəd"}
                                {material.materialType === "link" && "Link"}
                              </p>
                            </div>
                          </div>
                          {material.videoUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={material.videoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dərs Tapşırıqları</CardTitle>
                    <CardDescription>
                      Bu dərsə aid tapşırıqlar və onların statusu
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignments.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Hələ tapşırıq əlavə edilməyib
                      </p>
                    ) : (
                      assignments.map((assignment: any) => (
                        <div key={assignment.id} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{assignment.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {assignment.description}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {assignment.maxPoints} bal
                            </Badge>
                          </div>
                          
                          {assignment.dueDate && (
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Son tarix: {new Date(assignment.dueDate).toLocaleDateString("az-AZ")}
                              </span>
                            </div>
                          )}

                          {user?.role === "student" && (
                            <div className="flex items-center space-x-2 pt-2">
                              <Button size="sm" variant="default">
                                <Upload className="w-3 h-3 mr-2" />
                                Cavab yüklə
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}