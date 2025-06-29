
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CourseSidebar from "@/components/course-sidebar";
import ActiveSessionBar from "@/components/active-session-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Users, FileText, Calendar, CheckSquare, Upload, Video, PenTool } from "lucide-react";

export default function CourseManagement() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedSection, setSelectedSection] = useState("overview");
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  
  // Form states
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    orderIndex: 1
  });

  const [materialForm, setMaterialForm] = useState({
    title: "",
    content: "",
    materialType: "video" as "video" | "text" | "document",
    orderIndex: 1
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  // Fetch course data
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: [`/api/courses/${id}`],
  });

  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${id}/lessons`],
    enabled: !!id,
  });

  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/courses/${id}/assignments`],
    enabled: !!id,
  });

  const { data: students = [] } = useQuery({
    queryKey: [`/api/courses/${id}/students`],
    enabled: !!id,
  });

  const { data: activeLiveSession } = useQuery({
    queryKey: [`/api/courses/${id}/live-session`],
    enabled: !!id,
    refetchInterval: 30000, // Check every 30 seconds
  });

  const { data: lessonMaterials = [] } = useQuery({
    queryKey: [`/api/lessons/${selectedLesson?.id}/materials`],
    enabled: !!selectedLesson?.id,
  });

  // Mutations
  const createLessonMutation = useMutation({
    mutationFn: async (lessonData: any) => {
      const response = await fetch(`/api/courses/${id}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });
      if (!response.ok) throw new Error("Failed to create lesson");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/lessons`] });
      setIsLessonDialogOpen(false);
      setLessonForm({ title: "", description: "", videoUrl: "", duration: "", orderIndex: 1 });
      toast({ title: "Dərs uğurla əlavə edildi!" });
    },
  });

  const createMaterialMutation = useMutation({
    mutationFn: async (materialData: any) => {
      const response = await fetch(`/api/lessons/${selectedLesson.id}/materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      });
      if (!response.ok) throw new Error("Failed to create material");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson?.id}/materials`] });
      setIsMaterialDialogOpen(false);
      setMaterialForm({ title: "", content: "", materialType: "video", orderIndex: 1 });
      toast({ title: "Material uğurla əlavə edildi!" });
    },
  });

  const startLiveSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/courses/${id}/live-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: parseInt(id!), instructorId: user!.id }),
      });
      if (!response.ok) throw new Error("Failed to start session");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/live-session`] });
      toast({ title: "Canlı dərs başladıldı!" });
    },
  });

  const endLiveSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/courses/${id}/live-session`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to end session");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/live-session`] });
      toast({ title: "Canlı dərs tamamlandı!" });
    },
  });

  if (courseLoading) {
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

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-32">
          <h1 className="text-4xl font-bold text-devcode-dark mb-4">Kurs Tapılmadı</h1>
          <p className="text-devcode-gray">Axtardığınız kurs mövcud deyil.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Kurs Məlumatları</CardTitle>
          {!activeLiveSession ? (
            <Button 
              onClick={() => startLiveSessionMutation.mutate()}
              className="bg-green-600 hover:bg-green-700"
              disabled={startLiveSessionMutation.isPending}
            >
              <Play className="w-4 h-4 mr-2" />
              Dərsi Başlat
            </Button>
          ) : (
            <Badge variant="default" className="bg-green-600">
              Dərs Aktiv
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-devcode-dark mb-2">Ümumi Məlumat</h3>
              <p className="text-devcode-gray mb-4">{course.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-devcode-gray">Səviyyə:</span>
                  <Badge variant="secondary" className="capitalize">
                    {course.level === 'beginner' ? 'Başlanğıc' : course.level === 'intermediate' ? 'Orta' : 'İrəli'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-devcode-gray">Müddət:</span>
                  <span className="text-devcode-dark">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-devcode-gray">Qeydiyyat sayı:</span>
                  <span className="text-devcode-dark">{course.enrollmentCount || 0}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-devcode-dark mb-2">Statistika</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{lessons.length}</div>
                  <div className="text-sm text-blue-600">Dərslər</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{students.length}</div>
                  <div className="text-sm text-green-600">Tələbələr</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-devcode-orange">{assignments.length}</div>
                  <div className="text-sm text-devcode-orange">Tapşırıqlar</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-purple-600">Tamamlanan</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-devcode-dark">Dərslər</h2>
        <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-devcode-orange hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Dərs
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Dərs Əlavə Et</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="lessonTitle">Dərs Adı</Label>
                <Input
                  id="lessonTitle"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Məs: HTML Əsasları"
                />
              </div>
              <div>
                <Label htmlFor="lessonDescription">Təsvir</Label>
                <Textarea
                  id="lessonDescription"
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Dərsin təsviri"
                />
              </div>
              <div>
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={lessonForm.videoUrl}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div>
                <Label htmlFor="lessonDuration">Müddət (dəqiqə)</Label>
                <Input
                  id="lessonDuration"
                  type="number"
                  value={lessonForm.duration}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="45"
                />
              </div>
              <Button 
                onClick={() => createLessonMutation.mutate({ 
                  ...lessonForm, 
                  duration: parseInt(lessonForm.duration) || 0,
                  orderIndex: lessons.length + 1 
                })} 
                disabled={createLessonMutation.isPending}
              >
                {createLessonMutation.isPending ? "Əlavə edilir..." : "Dərsi Əlavə Et"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson: any, index: number) => (
          <Card key={lesson.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-devcode-orange rounded-full flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-devcode-dark">{lesson.title}</h3>
                    <p className="text-devcode-gray">{lesson.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-devcode-gray">{lesson.duration} dəq</span>
                      {lesson.videoUrl && (
                        <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="text-devcode-orange text-sm hover:underline">
                          Videoya bax
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setIsMaterialDialogOpen(true);
                    }}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Material Əlavə Et
                  </Button>
                  <Button variant="outline" size="sm">
                    <PenTool className="w-4 h-4 mr-2" />
                    Tapşırıq Əlavə Et
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Material Dialog */}
      <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dərs Materialı Əlavə Et</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="materialTitle">Material Adı</Label>
              <Input
                id="materialTitle"
                value={materialForm.title}
                onChange={(e) => setMaterialForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Məs: Giriş Videosu"
              />
            </div>
            <div>
              <Label htmlFor="materialType">Material Növü</Label>
              <Select value={materialForm.materialType} onValueChange={(value: any) => setMaterialForm(prev => ({ ...prev, materialType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="text">Mətn</SelectItem>
                  <SelectItem value="document">Sənəd</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="materialContent">Məzmun</Label>
              <Textarea
                id="materialContent"
                value={materialForm.content}
                onChange={(e) => setMaterialForm(prev => ({ ...prev, content: e.target.value }))}
                placeholder={materialForm.materialType === 'video' ? 'Video URL və ya embed kod' : 'Mətn məzmunu'}
                rows={6}
              />
            </div>
            <Button 
              onClick={() => createMaterialMutation.mutate({ 
                ...materialForm, 
                lessonId: selectedLesson?.id,
                orderIndex: lessonMaterials.length + 1 
              })} 
              disabled={createMaterialMutation.isPending}
            >
              {createMaterialMutation.isPending ? "Əlavə edilir..." : "Materialı Əlavə Et"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  const renderContent = () => {
    switch (selectedSection) {
      case "overview":
        return renderOverview();
      case "lessons":
        return renderLessons();
      case "assignments":
        return <div>Tapşırıqlar bölməsi</div>;
      case "students":
        return <div>Tələbələr bölməsi</div>;
      case "attendance":
        return <div>Davamiyyət bölməsi</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {activeLiveSession && (
        <ActiveSessionBar 
          session={activeLiveSession} 
          onEndSession={() => endLiveSessionMutation.mutate()} 
        />
      )}
      
      <div className={`flex ${activeLiveSession ? 'pt-20' : 'pt-16'}`}>
        <CourseSidebar 
          course={course}
          lessons={lessons}
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
          activeLiveSession={activeLiveSession}
        />
        
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
