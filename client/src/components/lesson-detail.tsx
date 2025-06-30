import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  FileText, 
  Video, 
  Clock, 
  Download,
  ExternalLink,
  Upload,
  Calendar,
  Award,
  CheckCircle,
  Edit,
  Save,
  X
} from "lucide-react";
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface LessonDetailProps {
  lesson: any;
  courseId: number;
  onBack: () => void;
  onCreateMaterial: () => void;
  onCreateAssignment: () => void;
}

export default function LessonDetail({ lesson, courseId, onBack }: LessonDetailProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';
  const isStudent = user?.role === 'student';

  // State for editing lesson content
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [lessonContent, setLessonContent] = useState(lesson.content || '');
  const [lessonVideoUrl, setLessonVideoUrl] = useState(lesson.videoUrl || '');

  // Material form state
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [materialForm, setMaterialForm] = useState({
    title: "",
    content: "",
    fileUrl: "",
    materialType: "document" as "document" | "link" | "file"
  });

  // Assignment form state
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  // Submission form state
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submissionForm, setSubmissionForm] = useState({
    content: "",
    fileUrl: "",
    githubUrl: ""
  });

  // Data queries
  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${lesson.id}/materials`],
  });

  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${lesson.id}/assignments`],
  });

  const { data: mySubmissions = [] } = useQuery({
    queryKey: [`/api/submissions/lesson/${lesson.id}`],
    enabled: isStudent,
  });

  // Mutations
  const updateLessonMutation = useMutation({
    mutationFn: (data: any) => fetch(`/api/lessons/${lesson.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Dərs uğurla yeniləndi" });
      setIsEditingContent(false);
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/lessons`] });
    },
  });

  const createMaterialMutation = useMutation({
    mutationFn: (materialData: any) => fetch(`/api/lessons/${lesson.id}/materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(materialData),
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Material uğurla əlavə edildi" });
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lesson.id}/materials`] });
      setIsMaterialDialogOpen(false);
      setMaterialForm({ title: "", content: "", fileUrl: "", materialType: "document" });
    },
  });

  const createAssignmentMutation = useMutation({
    mutationFn: (assignmentData: any) => fetch(`/api/lessons/${lesson.id}/assignments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...assignmentData, courseId }),
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Tapşırıq uğurla əlavə edildi" });
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lesson.id}/assignments`] });
      setIsAssignmentDialogOpen(false);
      setAssignmentForm({ title: "", description: "", dueDate: "", maxPoints: 100 });
    },
  });

  const submitAssignmentMutation = useMutation({
    mutationFn: (submissionData: any) => fetch(`/api/assignments/${selectedAssignment.id}/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(submissionData),
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Tapşırıq uğurla göndərildi" });
      queryClient.invalidateQueries({ queryKey: [`/api/submissions/lesson/${lesson.id}`] });
      setIsSubmissionDialogOpen(false);
      setSubmissionForm({ content: "", fileUrl: "", githubUrl: "" });
      setSelectedAssignment(null);
    },
  });

  const handleSaveContent = () => {
    updateLessonMutation.mutate({
      content: lessonContent,
      videoUrl: lessonVideoUrl
    });
  };

  const handleCreateMaterial = () => {
    createMaterialMutation.mutate(materialForm);
  };

  const handleCreateAssignment = () => {
    createAssignmentMutation.mutate(assignmentForm);
  };

  const handleSubmitAssignment = () => {
    submitAssignmentMutation.mutate(submissionForm);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5" />;
      case 'link': return <ExternalLink className="w-5 h-5" />;
      case 'file': return <Download className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const isAssignmentSubmitted = (assignmentId: number) => {
    return mySubmissions.some((sub: any) => sub.assignmentId === assignmentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="text-gray-600">{lesson.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant="outline" className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Dərs #{lesson.orderIndex}
              </Badge>
            </div>
          </div>
        </div>
        {isTeacher && (
          <Button
            variant="outline"
            onClick={() => setIsEditingContent(!isEditingContent)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditingContent ? "Ləğv Et" : "Redaktə Et"}
          </Button>
        )}
      </div>

      {/* Video Section */}
      {(lessonVideoUrl || isEditingContent) && (
        <Card>
          <CardHeader>
            <CardTitle>Video Dərs</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingContent ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={lessonVideoUrl}
                    onChange={(e) => setLessonVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            ) : lessonVideoUrl ? (
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe 
                  src={lessonVideoUrl.includes('youtube.com') ? lessonVideoUrl.replace('watch?v=', 'embed/') : lessonVideoUrl} 
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Video əlavə edilməyib</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Content Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Dərs Məzmunu</CardTitle>
          {isEditingContent && (
            <Button onClick={handleSaveContent} disabled={updateLessonMutation.isPending}>
              <Save className="w-4 h-4 mr-2" />
              Yadda Saxla
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditingContent ? (
            <div className="space-y-4">
              <CKEditor
                editor={ClassicEditor}
                data={lessonContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setLessonContent(data);
                }}
                config={{
                  toolbar: [
                    'heading', '|',
                    'bold', 'italic', 'link', '|',
                    'bulletedList', 'numberedList', '|',
                    'blockQuote', 'insertTable', '|',
                    'undo', 'redo'
                  ]
                }}
              />
            </div>
          ) : (
            <div className="prose max-w-none">
              {lessonContent ? (
                <div dangerouslySetInnerHTML={{ __html: lessonContent }} />
              ) : (
                <p className="text-gray-500 italic">Dərs məzmunu əlavə edilməyib</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs for Materials and Assignments */}
      <Tabs defaultValue="materials" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="materials">Materiallar ({materials.length})</TabsTrigger>
          <TabsTrigger value="assignments">Tapşırıqlar ({assignments.length})</TabsTrigger>
        </TabsList>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Materialları</h3>
            {isTeacher && (
              <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Material Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Yeni Material</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="materialTitle">Material Adı</Label>
                      <Input
                        id="materialTitle"
                        value={materialForm.title}
                        onChange={(e) => setMaterialForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Material başlığı"
                      />
                    </div>
                    <div>
                      <Label htmlFor="materialType">Material Növü</Label>
                      <select
                        className="w-full border border-input rounded-md px-3 py-2"
                        value={materialForm.materialType}
                        onChange={(e) => setMaterialForm(prev => ({ ...prev, materialType: e.target.value as any }))}
                      >
                        <option value="document">Sənəd/PDF</option>
                        <option value="link">Xarici Link</option>
                        <option value="file">Fayl</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="materialContent">Məzmun/Təsvir</Label>
                      <Textarea
                        id="materialContent"
                        value={materialForm.content}
                        onChange={(e) => setMaterialForm(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Material haqqında qısa məlumat"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="materialFileUrl">Fayl URL/Link</Label>
                      <Input
                        id="materialFileUrl"
                        value={materialForm.fileUrl}
                        onChange={(e) => setMaterialForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <Button 
                      onClick={handleCreateMaterial} 
                      disabled={createMaterialMutation.isPending}
                      className="w-full"
                    >
                      {createMaterialMutation.isPending ? "Əlavə edilir..." : "Material Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid gap-4">
            {materials.map((material: any) => (
              <Card key={material.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getFileIcon(material.materialType)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{material.content}</p>
                      {material.fileUrl && (
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Yüklə/Bax
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {materials.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Hələ material əlavə edilməyib</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Tapşırıqları</h3>
            {isTeacher && (
              <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Tapşırıq Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Yeni Tapşırıq</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="assignmentTitle">Tapşırıq Adı</Label>
                      <Input
                        id="assignmentTitle"
                        value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Tapşırıq başlığı"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assignmentDescription">Tapşırıq Təsviri</Label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={assignmentForm.description}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setAssignmentForm(prev => ({ ...prev, description: data }));
                        }}
                        config={{
                          toolbar: [
                            'heading', '|',
                            'bold', 'italic', 'link', '|',
                            'bulletedList', 'numberedList', '|',
                            'blockQuote', '|',
                            'undo', 'redo'
                          ]
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="assignmentDueDate">Son Tarix</Label>
                        <Input
                          id="assignmentDueDate"
                          type="datetime-local"
                          value={assignmentForm.dueDate}
                          onChange={(e) => setAssignmentForm(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="assignmentMaxPoints">Maksimum Bal</Label>
                        <Input
                          id="assignmentMaxPoints"
                          type="number"
                          value={assignmentForm.maxPoints}
                          onChange={(e) => setAssignmentForm(prev => ({ ...prev, maxPoints: parseInt(e.target.value) }))}
                          placeholder="100"
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleCreateAssignment} 
                      disabled={createAssignmentMutation.isPending}
                      className="w-full"
                    >
                      {createAssignmentMutation.isPending ? "Əlavə edilir..." : "Tapşırıq Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid gap-4">
            {assignments.map((assignment: any) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{assignment.title}</h4>
                        <Badge variant="outline" className="flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          {assignment.maxPoints} bal
                        </Badge>
                        {isStudent && isAssignmentSubmitted(assignment.id) && (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Göndərilib
                          </Badge>
                        )}
                      </div>
                      <div 
                        className="prose prose-sm max-w-none mb-3"
                        dangerouslySetInnerHTML={{ __html: assignment.description }} 
                      />
                      {assignment.dueDate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Son tarix: {new Date(assignment.dueDate).toLocaleString('az-AZ')}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      {isStudent && !isAssignmentSubmitted(assignment.id) && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            setIsSubmissionDialogOpen(true);
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Cavab Göndər
                        </Button>
                      )}
                      {isTeacher && (
                        <Button variant="outline" size="sm">
                          Cavabları Gör
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {assignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Hələ tapşırıq əlavə edilməyib</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Assignment Submission Dialog */}
      <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tapşırıq Cavabı - {selectedAssignment?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="submissionContent">Cavab Mətni</Label>
              <Textarea
                id="submissionContent"
                value={submissionForm.content}
                onChange={(e) => setSubmissionForm(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tapşırıq cavabınızı yazın..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="submissionFileUrl">Fayl URL (isteğe bağlı)</Label>
              <Input
                id="submissionFileUrl"
                value={submissionForm.fileUrl}
                onChange={(e) => setSubmissionForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                placeholder="https://drive.google.com/... və ya digər fayl linki"
              />
            </div>
            <div>
              <Label htmlFor="submissionGithubUrl">GitHub URL (isteğe bağlı)</Label>
              <Input
                id="submissionGithubUrl"
                value={submissionForm.githubUrl}
                onChange={(e) => setSubmissionForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                placeholder="https://github.com/username/repository"
              />
            </div>
            <Button 
              onClick={handleSubmitAssignment} 
              disabled={submitAssignmentMutation.isPending}
              className="w-full"
            >
              {submitAssignmentMutation.isPending ? "Göndərilir..." : "Cavabı Göndər"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}