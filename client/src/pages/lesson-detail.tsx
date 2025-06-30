
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  Play, 
  FileText, 
  Download, 
  ExternalLink, 
  Calendar, 
  Star, 
  Upload,
  BookOpen,
  Assignment,
  PlusCircle,
  Users,
  CheckCircle,
  Clock
} from "lucide-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface LessonDetailProps {
  courseId: string;
  lessonId: string;
}

export default function LessonDetail({ courseId, lessonId }: LessonDetailProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';

  // State for forms
  const [materialForm, setMaterialForm] = useState({
    title: "",
    content: "",
    fileUrl: "",
    materialType: "document" as "document" | "link" | "file"
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  const [submissionForm, setSubmissionForm] = useState({
    content: "",
    fileUrl: "",
    githubUrl: ""
  });

  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isSubmitAssignmentOpen, setIsSubmitAssignmentOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  // Queries
  const { data: lesson } = useQuery({
    queryKey: [`/api/courses/${courseId}/lessons/${lessonId}`],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`);
      if (!response.ok) throw new Error('Failed to fetch lesson');
      return response.json();
    }
  });

  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${lessonId}/materials`],
  });

  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${lessonId}/assignments`],
  });

  const { data: submissions = [] } = useQuery({
    queryKey: [`/api/submissions/lesson/${lessonId}`],
    enabled: !isTeacher
  });

  // Mutations
  const createMaterialMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/${lessonId}/materials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create material');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lessonId}/materials`] });
      setIsAddMaterialOpen(false);
      setMaterialForm({ title: "", content: "", fileUrl: "", materialType: "document" });
      toast({ title: "Material uğurla əlavə edildi" });
    }
  });

  const createAssignmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/lessons/${lessonId}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, courseId: parseInt(courseId) })
      });
      if (!response.ok) throw new Error('Failed to create assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${lessonId}/assignments`] });
      setIsAddAssignmentOpen(false);
      setAssignmentForm({ title: "", description: "", dueDate: "", maxPoints: 100 });
      toast({ title: "Tapşırıq uğurla əlavə edildi" });
    }
  });

  const submitAssignmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/assignments/${selectedAssignment.id}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/submissions/lesson/${lessonId}`] });
      setIsSubmitAssignmentOpen(false);
      setSubmissionForm({ content: "", fileUrl: "", githubUrl: "" });
      toast({ title: "Tapşırıq uğurla təqdim edildi" });
    }
  });

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">Yüklənir...</div>;
  }

  const handleAddMaterial = () => {
    createMaterialMutation.mutate(materialForm);
  };

  const handleAddAssignment = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Lesson Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-devcode-dark">{lesson.title}</h1>
              <p className="text-devcode-gray mt-2">{lesson.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <Badge variant="outline" className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {lesson.duration} dəqiqə
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Dərs #{lesson.orderIndex}
                </Badge>
              </div>
            </div>
          </div>

          {/* Video Player */}
          {lesson.videoUrl && (
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe 
                src={lesson.videoUrl.replace('watch?v=', 'embed/')} 
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Lesson Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Ümumi məlumat</TabsTrigger>
            <TabsTrigger value="materials">Materiallar ({materials.length})</TabsTrigger>
            <TabsTrigger value="assignments">Tapşırıqlar ({assignments.length})</TabsTrigger>
            {!isTeacher && <TabsTrigger value="submissions">Mənim cavablarım</TabsTrigger>}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: lesson.content || lesson.description }} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <div className="space-y-4">
              {isTeacher && (
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Dərs Materialları</h3>
                  <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-devcode-orange hover:bg-orange-600">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Material Əlavə Et
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Yeni Material Əlavə Et</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Material Adı</Label>
                          <Input 
                            value={materialForm.title}
                            onChange={(e) => setMaterialForm({...materialForm, title: e.target.value})}
                            placeholder="Material adını daxil edin"
                          />
                        </div>
                        <div>
                          <Label>Material Tipi</Label>
                          <select 
                            value={materialForm.materialType}
                            onChange={(e) => setMaterialForm({...materialForm, materialType: e.target.value as any})}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="document">Sənəd</option>
                            <option value="link">Xarici Link</option>
                            <option value="file">Fayl</option>
                          </select>
                        </div>
                        <div>
                          <Label>Material Məzmunu</Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={materialForm.content}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setMaterialForm({...materialForm, content: data});
                            }}
                          />
                        </div>
                        <div>
                          <Label>Fayl/Link URL</Label>
                          <Input 
                            value={materialForm.fileUrl}
                            onChange={(e) => setMaterialForm({...materialForm, fileUrl: e.target.value})}
                            placeholder="Fayl linki və ya URL"
                          />
                        </div>
                        <Button onClick={handleAddMaterial} disabled={createMaterialMutation.isPending}>
                          {createMaterialMutation.isPending ? "Əlavə edilir..." : "Material Əlavə Et"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              <div className="grid gap-4">
                {materials.map((material: any) => (
                  <Card key={material.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-devcode-orange rounded-lg flex items-center justify-center text-white">
                            {getFileIcon(material.materialType)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{material.title}</h4>
                            <div className="prose prose-sm mt-2" dangerouslySetInnerHTML={{ __html: material.content }} />
                            {material.fileUrl && (
                              <a 
                                href={material.fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-devcode-orange hover:underline mt-2"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Faylı yüklə
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {materials.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Bu dərs üçün hələ material yoxdur.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <div className="space-y-4">
              {isTeacher && (
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Dərs Tapşırıqları</h3>
                  <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-devcode-orange hover:bg-orange-600">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tapşırıq Əlavə Et
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Yeni Tapşırıq Əlavə Et</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Tapşırıq Adı</Label>
                          <Input 
                            value={assignmentForm.title}
                            onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                            placeholder="Tapşırıq adını daxil edin"
                          />
                        </div>
                        <div>
                          <Label>Tapşırıq Təsviri</Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={assignmentForm.description}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setAssignmentForm({...assignmentForm, description: data});
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Son tarix</Label>
                            <Input 
                              type="datetime-local"
                              value={assignmentForm.dueDate}
                              onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Maksimum bal</Label>
                            <Input 
                              type="number"
                              value={assignmentForm.maxPoints}
                              onChange={(e) => setAssignmentForm({...assignmentForm, maxPoints: parseInt(e.target.value)})}
                            />
                          </div>
                        </div>
                        <Button onClick={handleAddAssignment} disabled={createAssignmentMutation.isPending}>
                          {createAssignmentMutation.isPending ? "Əlavə edilir..." : "Tapşırıq Əlavə Et"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              <div className="grid gap-4">
                {assignments.map((assignment: any) => {
                  const userSubmission = submissions.find((s: any) => s.assignmentId === assignment.id);
                  const isSubmitted = !!userSubmission;
                  const isOverdue = new Date(assignment.dueDate) < new Date();

                  return (
                    <Card key={assignment.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-medium">{assignment.title}</h4>
                              {isSubmitted && <Badge className="bg-green-100 text-green-800">Təqdim edilib</Badge>}
                              {!isSubmitted && isOverdue && <Badge className="bg-red-100 text-red-800">Vaxtı keçib</Badge>}
                            </div>
                            <div className="prose prose-sm mb-4" dangerouslySetInnerHTML={{ __html: assignment.description }} />
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Son tarix: {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                {assignment.maxPoints} bal
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            {!isTeacher && !isSubmitted && !isOverdue && (
                              <Button 
                                onClick={() => {
                                  setSelectedAssignment(assignment);
                                  setIsSubmitAssignmentOpen(true);
                                }}
                                className="bg-devcode-orange hover:bg-orange-600"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Təqdim et
                              </Button>
                            )}
                            {isTeacher && (
                              <Button variant="outline" onClick={() => window.open(`/assignments/${assignment.id}/submissions`, '_blank')}>
                                <Users className="w-4 h-4 mr-2" />
                                Cavabları gör
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {assignments.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Assignment className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Bu dərs üçün hələ tapşırıq yoxdur.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Student Submissions Tab */}
          {!isTeacher && (
            <TabsContent value="submissions">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Mənim Cavablarım</h3>
                <div className="grid gap-4">
                  {submissions.map((submission: any) => (
                    <Card key={submission.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{submission.assignment?.title}</h4>
                            <p className="text-sm text-gray-500">
                              Təqdim tarixi: {new Date(submission.submittedAt).toLocaleDateString('az-AZ')}
                            </p>
                            {submission.grade && (
                              <Badge className="mt-2">
                                Qiymət: {submission.grade}/{submission.assignment?.maxPoints}
                              </Badge>
                            )}
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        {submission.feedback && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm"><strong>Rəy:</strong> {submission.feedback}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {submissions.length === 0 && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-gray-500">Hələ tapşırıq təqdim etməmisiniz.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Submit Assignment Dialog */}
        <Dialog open={isSubmitAssignmentOpen} onOpenChange={setIsSubmitAssignmentOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tapşırıq Təqdim Et: {selectedAssignment?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Cavab Mətni</Label>
                <Textarea 
                  value={submissionForm.content}
                  onChange={(e) => setSubmissionForm({...submissionForm, content: e.target.value})}
                  placeholder="Tapşırığın cavabını daxil edin"
                  rows={4}
                />
              </div>
              <div>
                <Label>Fayl URL (əgər varsa)</Label>
                <Input 
                  value={submissionForm.fileUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, fileUrl: e.target.value})}
                  placeholder="Fayl linkini daxil edin"
                />
              </div>
              <div>
                <Label>GitHub Repository (əgər varsa)</Label>
                <Input 
                  value={submissionForm.githubUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, githubUrl: e.target.value})}
                  placeholder="GitHub repository linkini daxil edin"
                />
              </div>
              <Button onClick={handleSubmitAssignment} disabled={submitAssignmentMutation.isPending}>
                {submitAssignmentMutation.isPending ? "Təqdim edilir..." : "Tapşırığı Təqdim Et"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
