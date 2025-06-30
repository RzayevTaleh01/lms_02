
import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, 
  FileText, 
  Link as LinkIcon, 
  Calendar, 
  Award, 
  Download,
  Edit,
  Trash2,
  Plus,
  Video,
  File,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LessonDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // State for material management
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [materialForm, setMaterialForm] = useState({
    title: "",
    content: "",
    videoUrl: "",
    materialType: "video"
  });

  // State for assignment management
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  // Fetch lesson data
  const { data: lesson } = useQuery({
    queryKey: [`/api/lessons/${id}`],
    enabled: !!id,
  });

  // Fetch materials
  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${id}/materials`],
    enabled: !!id,
  });

  // Fetch assignments
  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${id}/assignments`],
    enabled: !!id,
  });

  // Material mutations
  const createMaterialMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/${id}/materials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create material');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${id}/materials`] });
      setIsMaterialDialogOpen(false);
      resetMaterialForm();
      toast({ title: "Material uğurla əlavə edildi" });
    },
  });

  const deleteMaterialMutation = useMutation({
    mutationFn: async (materialId: number) => {
      const response = await fetch(`/api/lessons/materials/${materialId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete material');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${id}/materials`] });
      toast({ title: "Material uğurla silindi" });
    },
  });

  // Assignment mutations
  const createAssignmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/${id}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${id}/assignments`] });
      setIsAssignmentDialogOpen(false);
      resetAssignmentForm();
      toast({ title: "Tapşırıq uğurla əlavə edildi" });
    },
  });

  const deleteAssignmentMutation = useMutation({
    mutationFn: async (assignmentId: number) => {
      const response = await fetch(`/api/lessons/assignments/${assignmentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete assignment');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${id}/assignments`] });
      toast({ title: "Tapşırıq uğurla silindi" });
    },
  });

  const resetMaterialForm = () => {
    setMaterialForm({
      title: "",
      content: "",
      videoUrl: "",
      materialType: "video"
    });
    setEditingMaterial(null);
  };

  const resetAssignmentForm = () => {
    setAssignmentForm({
      title: "",
      description: "",
      dueDate: "",
      maxPoints: 100
    });
    setEditingAssignment(null);
  };

  const handleCreateMaterial = () => {
    if (materialForm.title.trim()) {
      createMaterialMutation.mutate(materialForm);
    }
  };

  const handleCreateAssignment = () => {
    if (assignmentForm.title.trim()) {
      const data = {
        ...assignmentForm,
        dueDate: assignmentForm.dueDate ? new Date(assignmentForm.dueDate) : null,
        maxPoints: parseInt(assignmentForm.maxPoints.toString())
      };
      createAssignmentMutation.mutate(data);
    }
  };

  const getMaterialIcon = (material: any) => {
    if (material.videoUrl) {
      return <Video className="w-5 h-5 text-red-500" />;
    } else if (material.content && material.content.includes('.pdf')) {
      return <File className="w-5 h-5 text-red-600" />;
    } else {
      return <LinkIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleMaterialClick = (material: any) => {
    if (material.videoUrl) {
      // Open video in new tab or embed
      window.open(material.videoUrl, '_blank');
    } else if (material.content) {
      // If it's a link, open it
      if (material.content.startsWith('http')) {
        window.open(material.content, '_blank');
      } else if (material.content.includes('.pdf')) {
        // Open PDF
        window.open(material.content, '_blank');
      }
    }
  };

  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';

  if (!lesson) {
    return <div className="p-6">Dərs tapılmadı</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back button */}
      <Button 
        variant="outline" 
        onClick={() => setLocation(`/student/courses/${lesson.courseId}`)}
        className="mb-6"
      >
        ← Kursa Qayıt
      </Button>

      {/* Lesson Header */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          {lesson.description && (
            <div 
              className="text-gray-600 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.description }}
            />
          )}
        </CardHeader>
        {lesson.videoUrl && (
          <CardContent>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={lesson.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Button size="lg" className="rounded-full">
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="materials">Materiallar ({materials.length})</TabsTrigger>
          <TabsTrigger value="assignments">Tapşırıqlar ({assignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Dərs Materialları</h3>
            {isTeacher && (
              <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Material Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Material</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Başlıq</Label>
                      <Input
                        value={materialForm.title}
                        onChange={(e) => setMaterialForm({...materialForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Tip</Label>
                      <Select value={materialForm.materialType} onValueChange={(value) => setMaterialForm({...materialForm, materialType: value})}>
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
                    {materialForm.materialType === 'video' && (
                      <div>
                        <Label>Video URL</Label>
                        <Input
                          value={materialForm.videoUrl}
                          onChange={(e) => setMaterialForm({...materialForm, videoUrl: e.target.value})}
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                    )}
                    <div>
                      <Label>Məzmun/Link</Label>
                      <Textarea
                        value={materialForm.content}
                        onChange={(e) => setMaterialForm({...materialForm, content: e.target.value})}
                        placeholder="Material təsviri və ya link"
                      />
                    </div>
                    <Button onClick={handleCreateMaterial} className="w-full">
                      Material Əlavə Et
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-3">
            {materials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Hələ material əlavə edilməyib
              </div>
            ) : (
              materials.map((material: any) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        {getMaterialIcon(material)}
                        <div className="flex-1">
                          <h4 className="font-medium">{material.title}</h4>
                          {material.content && (
                            <p className="text-sm text-gray-600 mt-1">{material.content}</p>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMaterialClick(material)}
                          className="ml-auto"
                        >
                          {material.videoUrl ? <Play className="w-4 h-4 mr-1" /> : <ExternalLink className="w-4 h-4 mr-1" />}
                          {material.videoUrl ? 'İzlə' : 'Aç'}
                        </Button>
                      </div>
                      {isTeacher && (
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingMaterial(material);
                              setMaterialForm({
                                title: material.title,
                                content: material.content || '',
                                videoUrl: material.videoUrl || '',
                                materialType: material.materialType || 'video'
                              });
                              setIsMaterialDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm('Bu materialı silmək istədiyinizə əminsiniz?')) {
                                deleteMaterialMutation.mutate(material.id);
                              }
                            }}
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

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Dərs Tapşırıqları</h3>
            {isTeacher && (
              <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Tapşırıq Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Tapşırıq</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Başlıq</Label>
                      <Input
                        value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Təsvir</Label>
                      <Textarea
                        value={assignmentForm.description}
                        onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Son Tarix</Label>
                      <Input
                        type="datetime-local"
                        value={assignmentForm.dueDate}
                        onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Maksimum Bal</Label>
                      <Input
                        type="number"
                        value={assignmentForm.maxPoints}
                        onChange={(e) => setAssignmentForm({...assignmentForm, maxPoints: parseInt(e.target.value)})}
                      />
                    </div>
                    <Button onClick={handleCreateAssignment} className="w-full">
                      Tapşırıq Əlavə Et
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-3">
            {assignments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Hələ tapşırıq əlavə edilməyib
              </div>
            ) : (
              assignments.map((assignment: any) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                        {assignment.description && (
                          <p className="text-sm text-gray-600">{assignment.description}</p>
                        )}
                        {!isTeacher && (
                          <Button 
                            className="mt-3"
                            onClick={() => setLocation(`/student/courses/${lesson.courseId}/assignments/${assignment.id}`)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Cavabları Gör
                          </Button>
                        )}
                      </div>
                      {isTeacher && (
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingAssignment(assignment);
                              setAssignmentForm({
                                title: assignment.title,
                                description: assignment.description || '',
                                dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 16) : '',
                                maxPoints: assignment.maxPoints
                              });
                              setIsAssignmentDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm('Bu tapşırığı silmək istədiyinizə əminsiniz?')) {
                                deleteAssignmentMutation.mutate(assignment.id);
                              }
                            }}
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
