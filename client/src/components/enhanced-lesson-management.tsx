import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  FileText, 
  Download, 
  ExternalLink,
  Calendar,
  CheckCircle,
  Upload,
  Clock,
  Video,
  File,
  Link
} from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EnhancedLessonManagementProps {
  courseId: number;
  selectedLesson: any;
  onSelectLesson: (lesson: any) => void;
}

export default function EnhancedLessonManagement({ 
  courseId, 
  selectedLesson, 
  onSelectLesson 
}: EnhancedLessonManagementProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Dialog states
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  
  // Form states
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    content: "",
    videoUrl: "",
    duration: ""
  });
  
  const [materialForm, setMaterialForm] = useState({
    title: "",
    content: "",
    videoUrl: "",
    materialType: "video" as "video" | "document" | "link",
    fileUrl: "",
    orderIndex: 0
  });
  
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  // Fetch lessons
  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${courseId}/lessons`],
    enabled: !!courseId,
  });

  // Fetch materials for selected lesson
  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${selectedLesson?.id}/materials`],
    enabled: !!selectedLesson?.id,
  });

  // Fetch assignments for selected lesson
  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${selectedLesson?.id}/assignments`],
    enabled: !!selectedLesson?.id,
  });

  // Create lesson mutation
  const createLessonMutation = useMutation({
    mutationFn: async (lessonData: any) => {
      return apiRequest("POST", `/api/courses/${courseId}/lessons`, lessonData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/lessons`] });
      setIsLessonDialogOpen(false);
      setLessonForm({ title: "", description: "", content: "", videoUrl: "", duration: "" });
      toast({ title: "Dərs uğurla əlavə edildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Dərs əlavə edilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Create material mutation
  const createMaterialMutation = useMutation({
    mutationFn: async (materialData: any) => {
      return apiRequest("POST", `/api/lessons/${selectedLesson.id}/materials`, materialData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/materials`] });
      setIsMaterialDialogOpen(false);
      setMaterialForm({ title: "", content: "", videoUrl: "", materialType: "video", fileUrl: "", orderIndex: 0 });
      toast({ title: "Material uğurla əlavə edildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Material əlavə edilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Create assignment mutation
  const createAssignmentMutation = useMutation({
    mutationFn: async (assignmentData: any) => {
      return apiRequest("POST", `/api/lessons/${selectedLesson.id}/assignments`, {
        ...assignmentData,
        courseId,
        lessonId: selectedLesson.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/assignments`] });
      setIsAssignmentDialogOpen(false);
      setAssignmentForm({ title: "", description: "", dueDate: "", maxPoints: 100 });
      toast({ title: "Tapşırıq uğurla əlavə edildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Tapşırıq əlavə edilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  const handleCreateLesson = () => {
    if (!lessonForm.title.trim()) {
      toast({ title: "Xəta", description: "Dərs başlığını daxil edin", variant: "destructive" });
      return;
    }
    
    createLessonMutation.mutate({
      title: lessonForm.title,
      description: lessonForm.description,
      content: lessonForm.content,
      videoUrl: lessonForm.videoUrl,
      duration: lessonForm.duration ? parseInt(lessonForm.duration) : null
    });
  };

  const handleCreateMaterial = () => {
    if (!materialForm.title.trim()) {
      toast({ title: "Xəta", description: "Material başlığını daxil edin", variant: "destructive" });
      return;
    }
    
    createMaterialMutation.mutate(materialForm);
  };

  const handleCreateAssignment = () => {
    if (!assignmentForm.title.trim()) {
      toast({ title: "Xəta", description: "Tapşırıq başlığını daxil edin", variant: "destructive" });
      return;
    }
    
    createAssignmentMutation.mutate({
      ...assignmentForm,
      dueDate: assignmentForm.dueDate ? new Date(assignmentForm.dueDate).toISOString() : null
    });
  };

  // Extract YouTube video ID
  const extractYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (!selectedLesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Dərslər</h2>
          {user?.role === "teacher" && (
            <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-devcode-orange hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Dərs
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Yeni Dərs Yaradın</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lessonTitle">Başlıq *</Label>
                      <Input
                        id="lessonTitle"
                        value={lessonForm.title}
                        onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                        placeholder="Dərsin başlığı"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lessonDuration">Müddət (dəqiqə)</Label>
                      <Input
                        id="lessonDuration"
                        type="number"
                        value={lessonForm.duration}
                        onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                        placeholder="45"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="lessonDescription">Qısa Təsvir</Label>
                    <Textarea
                      id="lessonDescription"
                      value={lessonForm.description}
                      onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                      placeholder="Dərsin qısa təsviri"
                      className="h-20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input
                      id="videoUrl"
                      value={lessonForm.videoUrl}
                      onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>

                  <div>
                    <Label>Dərs Məzmunu (Detallı Təsvir)</Label>
                    <div className="mt-2">
                      <ReactQuill
                        theme="snow"
                        value={lessonForm.content}
                        onChange={(content) => setLessonForm({ ...lessonForm, content })}
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['link', 'blockquote'],
                            ['clean']
                          ]
                        }}
                        style={{ height: '200px', marginBottom: '50px' }}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleCreateLesson} 
                    disabled={createLessonMutation.isPending}
                    className="bg-devcode-orange hover:bg-orange-600 w-full"
                  >
                    {createLessonMutation.isPending ? "Yaradılır..." : "Dərs Yaradın"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-4">
          {lessons.length === 0 ? (
            <Card>
              <CardContent className="text-center py-10">
                <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Bu kursa hələ dərs əlavə edilməyib</p>
              </CardContent>
            </Card>
          ) : (
            lessons.map((lesson: any, index: number) => (
              <Card key={lesson.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6" onClick={() => onSelectLesson(lesson)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-devcode-orange/10 rounded-full flex items-center justify-center">
                        <span className="text-devcode-orange font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        {lesson.duration && (
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.duration} dəqiqə
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {lesson.videoUrl && (
                        <Badge variant="secondary">
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        Görüntülə
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  // Lesson detail view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={() => onSelectLesson(null)} className="mb-4">
            ← Dərslər Siyahısı
          </Button>
          <h2 className="text-2xl font-semibold">{selectedLesson.title}</h2>
          {selectedLesson.description && (
            <p className="text-muted-foreground mt-1">{selectedLesson.description}</p>
          )}
        </div>
      </div>

      {/* Video Section */}
      {selectedLesson.videoUrl && (
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video">
              {extractYouTubeId(selectedLesson.videoUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(selectedLesson.videoUrl)}`}
                  className="w-full h-full rounded-t-lg"
                  allowFullScreen
                  title={selectedLesson.title}
                />
              ) : (
                <div className="w-full h-full bg-muted rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Video yüklənmir</p>
                    <a 
                      href={selectedLesson.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-devcode-orange hover:underline"
                    >
                      Birbaşa baxın
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lesson Content */}
      {selectedLesson.content && (
        <Card>
          <CardHeader>
            <CardTitle>Dərs Məzmunu</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
            />
          </CardContent>
        </Card>
      )}

      {/* Tabs for Materials and Assignments */}
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="materials">Materiallar ({materials.length})</TabsTrigger>
          <TabsTrigger value="assignments">Tapşırıqlar ({assignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Materialları</h3>
            {user?.role === "teacher" && (
              <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-devcode-orange hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Material Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Yeni Material Əlavə Et</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="materialTitle">Başlıq *</Label>
                        <Input
                          id="materialTitle"
                          value={materialForm.title}
                          onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                          placeholder="Material başlığı"
                        />
                      </div>
                      <div>
                        <Label htmlFor="materialType">Material Növü</Label>
                        <Select
                          value={materialForm.materialType}
                          onValueChange={(value: "video" | "document" | "link") => 
                            setMaterialForm({ ...materialForm, materialType: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="document">Sənəd/PDF</SelectItem>
                            <SelectItem value="link">Xarici Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {materialForm.materialType === "video" && (
                      <div>
                        <Label htmlFor="materialVideoUrl">Video URL</Label>
                        <Input
                          id="materialVideoUrl"
                          value={materialForm.videoUrl}
                          onChange={(e) => setMaterialForm({ ...materialForm, videoUrl: e.target.value })}
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                    )}

                    {(materialForm.materialType === "document" || materialForm.materialType === "link") && (
                      <div>
                        <Label htmlFor="materialFileUrl">
                          {materialForm.materialType === "document" ? "Fayl URL" : "Link URL"}
                        </Label>
                        <Input
                          id="materialFileUrl"
                          value={materialForm.fileUrl}
                          onChange={(e) => setMaterialForm({ ...materialForm, fileUrl: e.target.value })}
                          placeholder={materialForm.materialType === "document" ? "PDF və ya digər fayl linki" : "Xarici sayt linki"}
                        />
                      </div>
                    )}

                    <div>
                      <Label>Material Təsviri</Label>
                      <div className="mt-2">
                        <ReactQuill
                          theme="snow"
                          value={materialForm.content}
                          onChange={(content) => setMaterialForm({ ...materialForm, content })}
                          modules={{
                            toolbar: [
                              [{ 'header': [1, 2, 3, false] }],
                              ['bold', 'italic', 'underline'],
                              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                              ['link', 'blockquote'],
                              ['clean']
                            ]
                          }}
                          style={{ height: '150px', marginBottom: '50px' }}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleCreateMaterial} 
                      disabled={createMaterialMutation.isPending}
                      className="bg-devcode-orange hover:bg-orange-600 w-full"
                    >
                      {createMaterialMutation.isPending ? "Əlavə edilir..." : "Material Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid gap-4">
            {materials.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Bu dərsə hələ material əlavə edilməyib</p>
                </CardContent>
              </Card>
            ) : (
              materials.map((material: any) => (
                <Card key={material.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-devcode-orange/10 rounded-lg flex items-center justify-center">
                          {material.materialType === "video" && <Video className="w-5 h-5 text-devcode-orange" />}
                          {material.materialType === "document" && <File className="w-5 h-5 text-devcode-orange" />}
                          {material.materialType === "link" && <Link className="w-5 h-5 text-devcode-orange" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{material.title}</h4>
                          {material.content && (
                            <div 
                              className="text-sm text-muted-foreground mt-2 prose prose-sm"
                              dangerouslySetInnerHTML={{ __html: material.content }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {material.videoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={material.videoUrl} target="_blank" rel="noopener noreferrer">
                              <Play className="w-4 h-4 mr-1" />
                              İzlə
                            </a>
                          </Button>
                        )}
                        {material.fileUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Aç
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Tapşırıqları</h3>
            {user?.role === "teacher" && (
              <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-devcode-orange hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Tapşırıq Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Yeni Tapşırıq Əlavə Et</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="assignmentTitle">Tapşırıq Adı *</Label>
                        <Input
                          id="assignmentTitle"
                          value={assignmentForm.title}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                          placeholder="Tapşırıq başlığı"
                        />
                      </div>
                      <div>
                        <Label htmlFor="assignmentPoints">Maksimum Bal</Label>
                        <Input
                          id="assignmentPoints"
                          type="number"
                          value={assignmentForm.maxPoints}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, maxPoints: parseInt(e.target.value) || 100 })}
                          placeholder="100"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="assignmentDueDate">Son Tarix</Label>
                      <Input
                        id="assignmentDueDate"
                        type="datetime-local"
                        value={assignmentForm.dueDate}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Tapşırıq Təsviri</Label>
                      <div className="mt-2">
                        <ReactQuill
                          theme="snow"
                          value={assignmentForm.description}
                          onChange={(description) => setAssignmentForm({ ...assignmentForm, description })}
                          modules={{
                            toolbar: [
                              [{ 'header': [1, 2, 3, false] }],
                              ['bold', 'italic', 'underline'],
                              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                              ['link', 'blockquote'],
                              ['clean']
                            ]
                          }}
                          style={{ height: '150px', marginBottom: '50px' }}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleCreateAssignment} 
                      disabled={createAssignmentMutation.isPending}
                      className="bg-devcode-orange hover:bg-orange-600 w-full"
                    >
                      {createAssignmentMutation.isPending ? "Əlavə edilir..." : "Tapşırıq Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid gap-4">
            {assignments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10">
                  <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Bu dərsə hələ tapşırıq əlavə edilməyib</p>
                </CardContent>
              </Card>
            ) : (
              assignments.map((assignment: any) => (
                <Card key={assignment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold">{assignment.title}</h4>
                          <Badge variant="secondary">{assignment.maxPoints} bal</Badge>
                          {assignment.dueDate && (
                            <Badge variant="outline">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}
                            </Badge>
                          )}
                        </div>
                        {assignment.description && (
                          <div 
                            className="text-sm text-muted-foreground prose prose-sm"
                            dangerouslySetInnerHTML={{ __html: assignment.description }}
                          />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {user?.role === "teacher" && (
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            Cavabları Gör
                          </Button>
                        )}
                        {user?.role === "student" && (
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-1" />
                            Cavab Yüklə
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}