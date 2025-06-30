
import { useParams, Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, FileText, Upload, Calendar, Clock, CheckCircle, XCircle, Edit, Plus, Eye } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Material states
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [materialForm, setMaterialForm] = useState({
    title: "",
    content: "",
    materialType: "document",
    fileUrl: ""
  });

  // Assignment states
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  // Submission states
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    content: "",
    githubUrl: "",
    fileUrl: ""
  });

  // Fetch lesson details
  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: [`/api/courses/${courseId}/lessons/${lessonId}`],
  });

  // Fetch course details
  const { data: course } = useQuery({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId,
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

  // Create material mutation
  const createMaterialMutation = useMutation({
    mutationFn: async (materialData: any) => {
      const response = await fetch(`/api/lessons/${lessonId}/materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      });
      if (!response.ok) throw new Error("Failed to create material");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lessonId}/materials`] });
      setIsMaterialDialogOpen(false);
      setMaterialForm({
        title: "",
        content: "",
        materialType: "document",
        fileUrl: ""
      });
    },
  });

  // Create assignment mutation
  const createAssignmentMutation = useMutation({
    mutationFn: async (assignmentData: any) => {
      const response = await fetch(`/api/lessons/${lessonId}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...assignmentData,
          courseId: parseInt(courseId!)
        }),
      });
      if (!response.ok) throw new Error("Failed to create assignment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lessonId}/assignments`] });
      setIsAssignmentDialogOpen(false);
      setAssignmentForm({
        title: "",
        description: "",
        dueDate: "",
        maxPoints: 100
      });
    },
  });

  // Submit assignment mutation
  const submitAssignmentMutation = useMutation({
    mutationFn: async ({ assignmentId, submissionData }: any) => {
      const response = await fetch(`/api/assignments/${assignmentId}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) throw new Error("Failed to submit assignment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lessonId}/assignments`] });
      setIsSubmissionDialogOpen(false);
      setSubmissionForm({
        content: "",
        githubUrl: "",
        fileUrl: ""
      });
    },
  });

  const handleCreateMaterial = () => {
    createMaterialMutation.mutate(materialForm);
  };

  const handleCreateAssignment = () => {
    createAssignmentMutation.mutate(assignmentForm);
  };

  const handleSubmitAssignment = (assignmentId: number) => {
    submitAssignmentMutation.mutate({
      assignmentId,
      submissionData: submissionForm
    });
  };

  if (lessonLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-devcode-dark mb-4">Dərs Tapılmadı</h1>
            <p className="text-devcode-gray mb-8">Axtardığınız dərs mövcud deyil.</p>
            <Link href={`/courses/${courseId}`}>
              <Button>Kursa Qayıt</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation(`/courses/${courseId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kursa Qayıt
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-devcode-dark">{lesson.title}</h1>
            <p className="text-devcode-gray">{course?.title}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg">
                  {lesson.videoUrl ? (
                    <iframe
                      src={lesson.videoUrl}
                      className="w-full h-full rounded-t-lg"
                      allowFullScreen
                      title={lesson.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Video yüklənməyib</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Dərs Haqqında</h2>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: lesson.description || "Dərs təsviri əlavə edilməyib." }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Materials and Assignments Tabs */}
            <Tabs defaultValue="materials" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="materials">Materiallar</TabsTrigger>
                <TabsTrigger value="assignments">Tapşırıqlar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="materials" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Dərs Materialları</h3>
                  {user?.role === 'teacher' && (
                    <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Material Əlavə Et
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Yeni Material Əlavə Et</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="materialTitle">Başlıq</Label>
                            <Input
                              id="materialTitle"
                              value={materialForm.title}
                              onChange={(e) => setMaterialForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Material başlığı"
                            />
                          </div>
                          <div>
                            <Label htmlFor="materialType">Material Tipi</Label>
                            <Select value={materialForm.materialType} onValueChange={(value) => setMaterialForm(prev => ({ ...prev, materialType: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="document">Sənəd</SelectItem>
                                <SelectItem value="link">Link</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="materialUrl">Fayl/Link URL</Label>
                            <Input
                              id="materialUrl"
                              value={materialForm.fileUrl}
                              onChange={(e) => setMaterialForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                              placeholder="PDF, link və ya digər fayl URL-i"
                            />
                          </div>
                          <div>
                            <Label>Məzmun</Label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={materialForm.content}
                              onChange={(_, editor) => {
                                const data = editor.getData();
                                setMaterialForm(prev => ({ ...prev, content: data }));
                              }}
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
                    <p className="text-center text-devcode-gray py-8">Hələ material əlavə edilməyib.</p>
                  ) : (
                    materials.map((material: any) => (
                      <Card key={material.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-devcode-dark">{material.title}</h4>
                              <div 
                                className="prose prose-sm max-w-none mt-2"
                                dangerouslySetInnerHTML={{ __html: material.content }}
                              />
                              <Badge variant="outline" className="mt-2 capitalize">
                                {material.materialType}
                              </Badge>
                            </div>
                            {material.fileUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-2" />
                                  Yüklə
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="assignments" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Tapşırıqlar</h3>
                  {user?.role === 'teacher' && (
                    <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Tapşırıq Əlavə Et
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Yeni Tapşırıq Əlavə Et</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="assignmentTitle">Tapşırıq Adı</Label>
                            <Input
                              id="assignmentTitle"
                              value={assignmentForm.title}
                              onChange={(e) => setAssignmentForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Tapşırıq adı"
                            />
                          </div>
                          <div>
                            <Label>Tapşırıq Təsviri</Label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={assignmentForm.description}
                              onChange={(_, editor) => {
                                const data = editor.getData();
                                setAssignmentForm(prev => ({ ...prev, description: data }));
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="dueDate">Son Tarix</Label>
                              <Input
                                id="dueDate"
                                type="datetime-local"
                                value={assignmentForm.dueDate}
                                onChange={(e) => setAssignmentForm(prev => ({ ...prev, dueDate: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="maxPoints">Maksimum Bal</Label>
                              <Input
                                id="maxPoints"
                                type="number"
                                value={assignmentForm.maxPoints}
                                onChange={(e) => setAssignmentForm(prev => ({ ...prev, maxPoints: parseInt(e.target.value) }))}
                              />
                            </div>
                          </div>
                          <Button onClick={handleCreateAssignment} className="w-full">
                            Tapşırıq Əlavə Et
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                
                <div className="space-y-4">
                  {assignments.length === 0 ? (
                    <p className="text-center text-devcode-gray py-8">Hələ tapşırıq əlavə edilməyib.</p>
                  ) : (
                    assignments.map((assignment: any) => (
                      <Card key={assignment.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{assignment.title}</CardTitle>
                              <div className="flex items-center space-x-4 text-sm text-devcode-gray mt-2">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Son tarix: {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {assignment.maxPoints} bal
                                </div>
                              </div>
                            </div>
                            {user?.role === 'student' && (
                              <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button size="sm">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Tapşırığı Təhvil Ver
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Tapşırığı Təhvil Ver</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="submissionContent">Qeydlər</Label>
                                      <Textarea
                                        id="submissionContent"
                                        value={submissionForm.content}
                                        onChange={(e) => setSubmissionForm(prev => ({ ...prev, content: e.target.value }))}
                                        placeholder="Tapşırıq haqqında qeydləriniz"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="githubUrl">GitHub Repository URL</Label>
                                      <Input
                                        id="githubUrl"
                                        value={submissionForm.githubUrl}
                                        onChange={(e) => setSubmissionForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                                        placeholder="https://github.com/username/repo"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="fileUrl">Fayl URL</Label>
                                      <Input
                                        id="fileUrl"
                                        value={submissionForm.fileUrl}
                                        onChange={(e) => setSubmissionForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                                        placeholder="Tapşırıq faylının URL-i"
                                      />
                                    </div>
                                    <Button onClick={() => handleSubmitAssignment(assignment.id)} className="w-full">
                                      Təhvil Ver
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            {user?.role === 'teacher' && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/assignments/${assignment.id}/submissions`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Cavabları Gör
                                </Link>
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: assignment.description }}
                          />
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Dərs Məlumatları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.duration && (
                  <div className="flex items-center justify-between">
                    <span className="text-devcode-gray">Müddət:</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{lesson.duration} dəqiqə</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-devcode-gray">Materiallar:</span>
                  <span className="font-medium">{materials.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-devcode-gray">Tapşırıqlar:</span>
                  <span className="font-medium">{assignments.length}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/courses/${courseId}`}>
                      Kurs Səhifəsi
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
