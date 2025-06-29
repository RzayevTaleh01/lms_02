
import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import CourseSidebar from "@/components/course-sidebar";
import ActiveSessionBar from "@/components/active-session-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Play, 
  Plus, 
  Video, 
  FileText, 
  Users, 
  CheckSquare, 
  Calendar,
  Clock,
  Edit,
  Save,
  X
} from "lucide-react";

export default function CourseManagement() {
  const { id } = useParams();
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const courseId = parseInt(id || "0");
  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  
  // Dialog states
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  
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
    videoUrl: "",
    materialType: "video",
    orderIndex: 0
  });
  
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  // Fetch course data
  const { data: course } = useQuery({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId,
  });

  // Fetch lessons
  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${courseId}/lessons`],
    enabled: !!courseId,
  });

  // Fetch students
  const { data: students = [] } = useQuery({
    queryKey: [`/api/courses/${courseId}/students`],
    enabled: !!courseId,
  });

  // Fetch active session
  const { data: activeSession } = useQuery({
    queryKey: [`/api/courses/${courseId}/active-session`],
    enabled: !!courseId,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Create lesson mutation
  const createLessonMutation = useMutation({
    mutationFn: async (lessonData: any) => {
      const response = await fetch(`/api/courses/${courseId}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });
      if (!response.ok) throw new Error("Failed to create lesson");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/lessons`] });
      setIsLessonDialogOpen(false);
      setLessonForm({ title: "", description: "", videoUrl: "", duration: "", orderIndex: 1 });
      toast({ title: "Dərs uğurla yaradıldı" });
    },
  });

  // Start lesson session mutation
  const startSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await fetch(`/api/courses/${courseId}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData),
      });
      if (!response.ok) throw new Error("Failed to start session");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/active-session`] });
      toast({ title: "Dərs sesiyası başladıldı" });
    },
  });

  // End lesson session mutation
  const endSessionMutation = useMutation({
    mutationFn: async ({ sessionId, duration }: { sessionId: number; duration: number }) => {
      const response = await fetch(`/api/sessions/${sessionId}/end`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      });
      if (!response.ok) throw new Error("Failed to end session");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/active-session`] });
      toast({ title: "Dərs sesiyası bitirildi" });
    },
  });

  const handleCreateLesson = () => {
    createLessonMutation.mutate(lessonForm);
  };

  const handleStartSession = () => {
    const sessionName = `${course?.title} - ${new Date().toLocaleDateString()}`;
    startSessionMutation.mutate({ sessionName });
  };

  const handleEndSession = () => {
    if (activeSession) {
      const startTime = new Date(activeSession.startTime);
      const duration = Math.floor((Date.now() - startTime.getTime()) / 60000); // in minutes
      endSessionMutation.mutate({ sessionId: activeSession.id, duration });
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CourseSidebar 
        course={course} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      {activeSession && <ActiveSessionBar session={activeSession} onEnd={handleEndSession} />}

      {/* Main Content */}
      <div className="flex-1 p-8 ml-80" style={{ marginTop: activeSession ? '80px' : '0' }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-devcode-dark">{course.title}</h1>
              <p className="text-devcode-gray">{course.description}</p>
            </div>
            <div className="flex space-x-3">
              {!activeSession ? (
                <Button 
                  onClick={handleStartSession}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={startSessionMutation.isPending}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Dərs Başlat
                </Button>
              ) : (
                <Badge variant="outline" className="px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Dərs Aktivdir
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "lessons" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Dərslər</h2>
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
                      <Label htmlFor="lesson-title">Dərs Adı</Label>
                      <Input
                        id="lesson-title"
                        value={lessonForm.title}
                        onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Məs: HTML Əsasları"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lesson-description">Açıqlama</Label>
                      <Textarea
                        id="lesson-description"
                        value={lessonForm.description}
                        onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Dərs haqqında qısa məlumat"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lesson-duration">Müddət (dəqiqə)</Label>
                        <Input
                          id="lesson-duration"
                          type="number"
                          value={lessonForm.duration}
                          onChange={(e) => setLessonForm(prev => ({ ...prev, duration: e.target.value }))}
                          placeholder="45"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lesson-order">Sıra</Label>
                        <Input
                          id="lesson-order"
                          type="number"
                          value={lessonForm.orderIndex}
                          onChange={(e) => setLessonForm(prev => ({ ...prev, orderIndex: parseInt(e.target.value) }))}
                          placeholder="1"
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleCreateLesson}
                      disabled={createLessonMutation.isPending}
                      className="bg-devcode-orange hover:bg-orange-600"
                    >
                      {createLessonMutation.isPending ? "Yaradılır..." : "Dərs Yarat"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {lessons.map((lesson: any) => (
                <Card key={lesson.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-devcode-orange rounded-lg flex items-center justify-center text-white font-semibold">
                          {lesson.orderIndex}
                        </div>
                        <div>
                          <h3 className="font-semibold text-devcode-dark">{lesson.title}</h3>
                          <p className="text-sm text-devcode-gray">{lesson.description}</p>
                          {lesson.duration && (
                            <div className="flex items-center mt-1 text-xs text-devcode-gray">
                              <Clock className="w-3 h-3 mr-1" />
                              {lesson.duration} dəqiqə
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedLesson(lesson);
                            setActiveTab("lesson-detail");
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          İdarə Et
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Tələbələr ({students.length})</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Soyad</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Qeydiyyat Tarixi</TableHead>
                      <TableHead>Tərəqqi</TableHead>
                      <TableHead>Qiymət</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student: any) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.firstName} {student.lastName}
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          {new Date(student.enrolledAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {student.progress}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {student.grade ? `${student.grade}/100` : "Qiymətləndirilməyib"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Davamiyyət</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8 text-devcode-gray">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Davamiyyət sistemi hazırlanmaqdadır</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "lesson-detail" && selectedLesson && (
          <LessonDetailView 
            lesson={selectedLesson} 
            courseId={courseId}
            onBack={() => {
              setSelectedLesson(null);
              setActiveTab("lessons");
            }}
          />
        )}
      </div>
    </div>
  );
}

// Lesson Detail Component
function LessonDetailView({ lesson, courseId, onBack }: { lesson: any; courseId: number; onBack: () => void }) {
  const [activeSubTab, setActiveSubTab] = useState("materials");
  
  const { data: materials = [] } = useQuery({
    queryKey: [`/api/lessons/${lesson.id}/materials`],
  });

  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/lessons/${lesson.id}/assignments`],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            <X className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <h2 className="text-2xl font-semibold">{lesson.title}</h2>
          <p className="text-devcode-gray">{lesson.description}</p>
        </div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="materials">Materiallar</TabsTrigger>
          <TabsTrigger value="assignments">Tapşırıqlar</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Materialları</h3>
            <Button className="bg-devcode-orange hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Material Əlavə Et
            </Button>
          </div>
          
          <div className="grid gap-4">
            {materials.map((material: any) => (
              <Card key={material.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Video className="w-8 h-8 text-devcode-orange" />
                    <div>
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-devcode-gray">{material.materialType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Tapşırıqları</h3>
            <Button className="bg-devcode-orange hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Tapşırıq Əlavə Et
            </Button>
          </div>
          
          <div className="grid gap-4">
            {assignments.map((assignment: any) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-devcode-orange" />
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-devcode-gray">
                          Max qiymət: {assignment.maxPoints}
                        </p>
                        {assignment.dueDate && (
                          <p className="text-xs text-devcode-gray">
                            Son tarix: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Göndərilənlər
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
