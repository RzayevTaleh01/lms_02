import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  FileText, 
  Video, 
  File, 
  Link, 
  ExternalLink,
  Clock, 
  Calendar, 
  Target, 
  Users,
  ArrowLeft
} from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Lesson Creation Interface Component
function LessonCreationInterface({ courseId, onLessonCreated }: { courseId: number; onLessonCreated: (lesson: any) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    content: "",
    videoUrl: "",
    duration: ""
  });

  const createLessonMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/courses/${courseId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create lesson');
      return response.json();
    },
    onSuccess: (newLesson) => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/lessons`] });
      toast({ title: "Dərs uğurla yaradıldı!" });
      onLessonCreated(newLesson);
    },
    onError: () => {
      toast({ title: "Xəta", description: "Dərs yaradılarkən xəta baş verdi", variant: "destructive" });
    }
  });

  const handleCreateLesson = () => {
    if (!lessonForm.title.trim()) {
      toast({ title: "Xəta", description: "Dərs başlığını daxil edin", variant: "destructive" });
      return;
    }

    createLessonMutation.mutate({
      ...lessonForm,
      duration: lessonForm.duration ? parseInt(lessonForm.duration) : null
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="w-16 h-16 mx-auto text-devcode-orange mb-4" />
        <h2 className="text-2xl font-bold mb-2">İlk Dərsinizi Yaradın</h2>
        <p className="text-muted-foreground">Bu kursda hələ dərs yoxdur. İlk dərsinizi yaratmaq üçün aşağıdakı formu doldurun.</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Yeni Dərs Əlavə Et</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lessonTitle">Dərs Başlığı *</Label>
              <Input
                id="lessonTitle"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                placeholder="Məsələn: JavaScript əsasları"
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
                min="1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="lessonDescription">Qısa Təsvir</Label>
            <Textarea
              id="lessonDescription"
              value={lessonForm.description}
              onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
              placeholder="Bu dərsdə nə öyrənəcəksiniz?"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="lessonVideoUrl">Video URL (məcburi deyil)</Label>
            <Input
              id="lessonVideoUrl"
              value={lessonForm.videoUrl}
              onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
              placeholder="YouTube və ya digər video linki"
            />
          </div>

          <div>
            <Label>Dərs Məzmunu</Label>
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
                    ['link', 'blockquote', 'code'],
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
            size="lg"
          >
            {createLessonMutation.isPending ? "Yaradılır..." : "Dərs Yarat"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Lesson Selection Interface Component
function LessonSelectionInterface({ lessons, onSelectLesson }: { lessons: any[]; onSelectLesson: (lesson: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Dərs seçin</h3>
        <p className="text-muted-foreground">Material və tapşırıqları idarə etmək üçün dərs seçin</p>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson: any) => (
          <Card key={lesson.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectLesson(lesson)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{lesson.title}</h4>
                  {lesson.description && (
                    <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    {lesson.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration} dəq</span>
                      </div>
                    )}
                    {lesson.videoUrl && (
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4" />
                        <span>Video</span>
                      </div>
                    )}
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

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

  // Form states
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

  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    content: "",
    videoUrl: "",
    duration: ""
  });

  // Dialog states
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("materials");
  
  // Edit states
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);

  // Queries
  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${courseId}/lessons`],
    enabled: !!courseId
  });

  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${selectedLesson?.id}/materials`],
    enabled: !!selectedLesson?.id
  });

  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${selectedLesson?.id}/assignments`],
    enabled: !!selectedLesson?.id
  });

  // Create material mutation
  const createMaterialMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/${selectedLesson.id}/materials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create material');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/materials`] });
      setIsMaterialDialogOpen(false);
      setEditingMaterial(null);
      setMaterialForm({ title: "", content: "", videoUrl: "", materialType: "video", fileUrl: "", orderIndex: 0 });
      toast({ title: "Material əlavə edildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Material əlavə edilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Update material mutation
  const updateMaterialMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/materials/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update material');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/materials`] });
      setIsMaterialDialogOpen(false);
      setEditingMaterial(null);
      setMaterialForm({ title: "", content: "", videoUrl: "", materialType: "video", fileUrl: "", orderIndex: 0 });
      toast({ title: "Material yeniləndi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Material yenilənərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Delete material mutation
  const deleteMaterialMutation = useMutation({
    mutationFn: async (materialId: number) => {
      const response = await fetch(`/api/lessons/materials/${materialId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete material');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/materials`] });
      toast({ title: "Material silindi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Material silinərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Create assignment mutation
  const createAssignmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/${selectedLesson.id}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/assignments`] });
      setIsAssignmentDialogOpen(false);
      setEditingAssignment(null);
      setAssignmentForm({ title: "", description: "", dueDate: "", maxPoints: 100 });
      toast({ title: "Tapşırıq əlavə edildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Tapşırıq əlavə edilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Update assignment mutation
  const updateAssignmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/assignments/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/assignments`] });
      setIsAssignmentDialogOpen(false);
      setEditingAssignment(null);
      setAssignmentForm({ title: "", description: "", dueDate: "", maxPoints: 100 });
      toast({ title: "Tapşırıq yeniləndi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Tapşırıq yenilənərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Delete assignment mutation
  const deleteAssignmentMutation = useMutation({
    mutationFn: async (assignmentId: number) => {
      const response = await fetch(`/api/lessons/assignments/${assignmentId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/assignments`] });
      toast({ title: "Tapşırıq silindi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Tapşırıq silinərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Create lesson mutation
  const createLessonMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/courses/${courseId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create lesson');
      return response.json();
    },
    onSuccess: (newLesson) => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/lessons`] });
      toast({ title: "Dərs uğurla yaradıldı!" });
      onSelectLesson(newLesson);
    },
    onError: () => {
      toast({ title: "Xəta", description: "Dərs yaradılarkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Handlers
  const handleCreateLesson = () => {
    if (!lessonForm.title.trim()) {
      toast({ title: "Xəta", description: "Dərs başlığını daxil edin", variant: "destructive" });
      return;
    }

    createLessonMutation.mutate({
      ...lessonForm,
      duration: lessonForm.duration ? parseInt(lessonForm.duration) : null
    });
  };

  const handleCreateMaterial = () => {
    if (!materialForm.title.trim()) {
      toast({ title: "Xəta", description: "Material başlığını daxil edin", variant: "destructive" });
      return;
    }

    if (editingMaterial) {
      updateMaterialMutation.mutate({
        id: editingMaterial.id,
        ...materialForm
      });
    } else {
      createMaterialMutation.mutate(materialForm);
    }
  };

  const handleCreateAssignment = () => {
    if (!assignmentForm.title.trim()) {
      toast({ title: "Xəta", description: "Tapşırıq başlığını daxil edin", variant: "destructive" });
      return;
    }

    if (editingAssignment) {
      updateAssignmentMutation.mutate({
        id: editingAssignment.id,
        ...assignmentForm,
        dueDate: assignmentForm.dueDate ? new Date(assignmentForm.dueDate).toISOString() : null
      });
    } else {
      createAssignmentMutation.mutate({
        ...assignmentForm,
        dueDate: assignmentForm.dueDate ? new Date(assignmentForm.dueDate).toISOString() : null
      });
    }
  };

  const handleEditMaterial = (material: any) => {
    setEditingMaterial(material);
    setMaterialForm({
      title: material.title,
      content: material.content || "",
      videoUrl: material.videoUrl || "",
      materialType: material.materialType || "video",
      fileUrl: material.fileUrl || "",
      orderIndex: material.orderIndex || 0
    });
    setIsMaterialDialogOpen(true);
  };

  const handleDeleteMaterial = (materialId: number) => {
    if (window.confirm('Bu materialı silmək istədiyinizə əminsiniz?')) {
      deleteMaterialMutation.mutate(materialId);
    }
  };

  const handleEditAssignment = (assignment: any) => {
    setEditingAssignment(assignment);
    setAssignmentForm({
      title: assignment.title,
      description: assignment.description || "",
      dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 16) : "",
      maxPoints: assignment.maxPoints || 100
    });
    setIsAssignmentDialogOpen(true);
  };

  const handleDeleteAssignment = (assignmentId: number) => {
    if (window.confirm('Bu tapşırığı silmək istədiyinizə əminsiniz?')) {
      deleteAssignmentMutation.mutate(assignmentId);
    }
  };

  if (!selectedLesson) {
    // Show lesson creation interface if no lessons exist
    if (lessons.length === 0) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto text-devcode-orange mb-4" />
            <h2 className="text-2xl font-bold mb-2">İlk Dərsinizi Yaradın</h2>
            <p className="text-muted-foreground">Bu kursda hələ dərs yoxdur. İlk dərsinizi yaratmaq üçün aşağıdakı formu doldurun.</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Yeni Dərs Əlavə Et</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lessonTitle">Dərs Başlığı *</Label>
                  <Input
                    id="lessonTitle"
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    placeholder="Məsələn: JavaScript əsasları"
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
                    min="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lessonDescription">Qısa Təsvir</Label>
                <Textarea
                  id="lessonDescription"
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                  placeholder="Bu dərsdə nə öyrənəcəksiniz?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="lessonVideoUrl">Video URL (məcburi deyil)</Label>
                <Input
                  id="lessonVideoUrl"
                  value={lessonForm.videoUrl}
                  onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                  placeholder="YouTube və ya digər video linki"
                />
              </div>

              <div>
                <Label>Dərs Məzmunu</Label>
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
                        ['link', 'blockquote', 'code'],
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
                size="lg"
              >
                {createLessonMutation.isPending ? "Yaradılır..." : "Dərs Yarat"}
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    // Show lesson selection interface if lessons exist
    return (
      <div className="space-y-6">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Dərs seçin</h3>
          <p className="text-muted-foreground">Material və tapşırıqları idarə etmək üçün dərs seçin</p>
        </div>

        <div className="grid gap-4">
          {lessons.map((lesson: any) => (
            <Card key={lesson.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectLesson(lesson)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{lesson.title}</h4>
                    {lesson.description && (
                      <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      {lesson.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration} dəq</span>
                        </div>
                      )}
                      {lesson.videoUrl && (
                        <div className="flex items-center space-x-1">
                          <Video className="w-4 h-4" />
                          <span>Video</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectLesson(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{selectedLesson.title}</h2>
            <p className="text-muted-foreground">{selectedLesson.description}</p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {selectedLesson.videoUrl && (
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video">
              {selectedLesson.videoUrl.includes('youtube.com') || selectedLesson.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={selectedLesson.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedLesson.videoUrl}
                  controls
                  className="w-full h-full rounded-lg"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Section */}
      {selectedLesson.content && (
        <Card>
          <CardContent className="p-6">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
            />
          </CardContent>
        </Card>
      )}

      {/* Materials and Assignments Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  <Button 
                    size="sm" 
                    className="bg-devcode-orange hover:bg-orange-600"
                    onClick={() => {
                      setEditingMaterial(null);
                      setMaterialForm({ title: "", content: "", videoUrl: "", materialType: "video", fileUrl: "", orderIndex: 0 });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Material Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingMaterial ? "Material Düzəlt" : "Yeni Material Əlavə Et"}</DialogTitle>
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
                            <SelectItem value="document">Sənəd</SelectItem>
                            <SelectItem value="link">Link</SelectItem>
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
                          placeholder="YouTube və ya digər video linki"
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
                          style={{ height: '200px', marginBottom: '50px' }}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleCreateMaterial} 
                      disabled={createMaterialMutation.isPending || updateMaterialMutation.isPending}
                      className="bg-devcode-orange hover:bg-orange-600 w-full"
                    >
                      {(createMaterialMutation.isPending || updateMaterialMutation.isPending) ? 
                        (editingMaterial ? "Yenilənir..." : "Əlavə edilir...") : 
                        (editingMaterial ? "Material Yenilə" : "Material Əlavə Et")
                      }
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
                        {user?.role === "teacher" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditMaterial(material)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
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
                  <Button 
                    size="sm" 
                    className="bg-devcode-orange hover:bg-orange-600"
                    onClick={() => {
                      setEditingAssignment(null);
                      setAssignmentForm({ title: "", description: "", dueDate: "", maxPoints: 100 });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tapşırıq Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingAssignment ? "Tapşırıq Düzəlt" : "Yeni Tapşırıq Əlavə Et"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="assignmentTitle">Başlıq *</Label>
                      <Input
                        id="assignmentTitle"
                        value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                        placeholder="Tapşırıq başlığı"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="assignmentMaxPoints">Maksimum Bal</Label>
                        <Input
                          id="assignmentMaxPoints"
                          type="number"
                          value={assignmentForm.maxPoints}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, maxPoints: parseInt(e.target.value) || 100 })}
                          min={1}
                          max={1000}
                        />
                      </div>
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
                              ['link', 'blockquote', 'code'],
                              ['clean']
                            ]
                          }}
                          style={{ height: '200px', marginBottom: '50px' }}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleCreateAssignment} 
                      disabled={createAssignmentMutation.isPending || updateAssignmentMutation.isPending}
                      className="bg-devcode-orange hover:bg-orange-600 w-full"
                    >
                      {(createAssignmentMutation.isPending || updateAssignmentMutation.isPending) ? 
                        (editingAssignment ? "Yenilənir..." : "Əlavə edilir...") : 
                        (editingAssignment ? "Tapşırıq Yenilə" : "Tapşırıq Əlavə Et")
                      }
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
                  <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
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
                          <Target className="w-5 h-5 text-devcode-orange" />
                          <h4 className="font-semibold">{assignment.title}</h4>
                          <Badge variant="outline">{assignment.maxPoints} bal</Badge>
                        </div>
                        {assignment.description && (
                          <div 
                            className="text-sm text-muted-foreground prose prose-sm"
                            dangerouslySetInnerHTML={{ __html: assignment.description }}
                          />
                        )}
                        {assignment.dueDate && (
                          <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Son tarix: {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}</span>
                          </div>
                        )}
                      </div>
                      {user?.role === "teacher" && (
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditAssignment(assignment)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteAssignment(assignment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
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