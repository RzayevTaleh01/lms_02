import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import CourseSidebar from "@/components/course-sidebar";
import ActiveSessionBar from "@/components/active-session-bar";
import SessionHistory from "@/pages/session-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  X,
  UserPlus,
  Trash2,
  ArrowLeft,
  Upload,
  BarChart3
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
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);

  // Form states
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: 0,
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

  const [studentForm, setStudentForm] = useState({
    studentId: ""
  });

  // Attendance state for managing attendance changes
  const [attendanceChanges, setAttendanceChanges] = useState<Record<string, "present" | "absent">>({});
  const [attendanceSaved, setAttendanceSaved] = useState(false);

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

  // Fetch all users for adding students
  const { data: allUsers = [] } = useQuery({
    queryKey: ["/api/users"],
    enabled: isStudentDialogOpen,
  });

  // Fetch active session
  const { data: activeSession } = useQuery({
    queryKey: [`/api/courses/${courseId}/active-session`],
    enabled: !!courseId,
    refetchInterval: 5000,
  });

  // Fetch lesson sessions for attendance
  const { data: lessonSessions = [] } = useQuery({
    queryKey: [`/api/courses/${courseId}/sessions`],
    enabled: !!courseId && activeTab === "attendance",
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
      setLessonForm({ title: "", description: "", videoUrl: "", duration: 0, orderIndex: 1 });
      toast({ title: "Dərs uğurla yaradıldı" });
    },
  });

  // Create lesson material mutation
  const createMaterialMutation = useMutation({
    mutationFn: async (materialData: any) => {
      if (!selectedLesson) throw new Error("No lesson selected");
      const response = await fetch(`/api/lessons/${selectedLesson.id}/materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      });
      if (!response.ok) throw new Error("Failed to create material");
      return response.json();
    },
    onSuccess: () => {
      if (selectedLesson) {
        queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson.id}/materials`] });
      }
      setIsMaterialDialogOpen(false);
      setMaterialForm({ title: "", content: "", videoUrl: "", materialType: "video", orderIndex: 0 });
      toast({ title: "Material uğurla əlavə edildi" });
    },
  });

  // Create lesson assignment mutation
  const createAssignmentMutation = useMutation({
    mutationFn: async (assignmentData: any) => {
      if (!selectedLesson) throw new Error("No lesson selected");
      const response = await fetch(`/api/lessons/${selectedLesson.id}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...assignmentData, courseId }),
      });
      if (!response.ok) throw new Error("Failed to create assignment");
      return response.json();
    },
    onSuccess: () => {
      if (selectedLesson) {
        queryClient.invalidateQueries({ queryKey: [`/api/lessons/${selectedLesson.id}/assignments`] });
      }
      setIsAssignmentDialogOpen(false);
      setAssignmentForm({ title: "", description: "", dueDate: "", maxPoints: 100 });
      toast({ title: "Tapşırıq uğurla əlavə edildi" });
    },
  });

  // Enroll student mutation
  const enrollStudentMutation = useMutation({
    mutationFn: async (enrollmentData: any) => {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollmentData),
      });
      if (!response.ok) throw new Error("Failed to enroll student");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/students`] });
      setIsStudentDialogOpen(false);
      setStudentForm({ studentId: "" });
      toast({ title: "Tələbə uğurla əlavə edildi" });
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
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/sessions`] });
      toast({ title: "Dərs sesiyası bitirildi" });
    },
  });

  // Mark attendance mutation
  const markAttendanceMutation = useMutation({
    mutationFn: async (attendanceData: any) => {
      const response = await fetch(`/api/sessions/${attendanceData.sessionId}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData),
      });
      if (!response.ok) throw new Error("Failed to mark attendance");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Davamiyyət qeyd edildi" });
    },
  });

  // Remove student mutation
  const removeStudentMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const response = await fetch(`/api/enrollments/${courseId}/${studentId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove student");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/students`] });
      toast({ title: "Tələbə kursdan çıxarıldı" });
    },
  });

  const handleCreateLesson = () => {
    createLessonMutation.mutate(lessonForm);
  };

  const handleCreateMaterial = () => {
    createMaterialMutation.mutate(materialForm);
  };

  const handleCreateAssignment = () => {
    createAssignmentMutation.mutate(assignmentForm);
  };

  const handleEnrollStudent = () => {
    enrollStudentMutation.mutate({
      studentId: studentForm.studentId,
      courseId
    });
  };

  const handleStartSession = () => {
    const sessionName = `${course?.title} - ${new Date().toLocaleDateString()}`;
    startSessionMutation.mutate({ sessionName });
  };

  const handleEndSession = () => {
    if (activeSession) {
      const startTime = new Date(activeSession.startTime);
      const duration = Math.floor((Date.now() - startTime.getTime()) / 60000);
      endSessionMutation.mutate({ sessionId: activeSession.id, duration });
    }
  };

  const handleMarkAttendance = (studentId: string, status: "present" | "absent") => {
    setAttendanceChanges(prev => ({
      ...prev,
      [studentId]: status
    }));
    setAttendanceSaved(false);
  };

  const handleSaveAttendance = async () => {
    if (activeSession && Object.keys(attendanceChanges).length > 0) {
      try {
        for (const [studentId, status] of Object.entries(attendanceChanges)) {
          await fetch(`/api/sessions/${activeSession.id}/attendance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: activeSession.id,
              studentId,
              courseId,
              status
            })
          });
        }
        setAttendanceSaved(true);
        setAttendanceChanges({});
        toast({ title: "Davamiyyət uğurla yadda saxlanıldı" });
        queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/sessions`] });
      } catch (error) {
        toast({ 
          title: "Xəta", 
          description: "Davamiyyət yadda saxlanılarkən xəta baş verdi",
          variant: "destructive" 
        });
      }
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    if (confirm("Bu tələbəni kursdan çıxarmaq istədiyinizə əminsiniz?")) {
      removeStudentMutation.mutate(studentId);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  const availableStudents = allUsers.filter((user: any) => 
    user.role === "student" && 
    !students.some((student: any) => student.id === user.id)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CourseSidebar 
        course={course} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      {activeSession && <ActiveSessionBar session={activeSession} onEndSession={handleEndSession} />}

      {/* Main Content */}
      <div className="flex-1 p-8 ml-80" style={{ paddingTop: activeSession ? '100px' : '32px' }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="outline" onClick={() => setLocation("/teacher/courses")} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Button>
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
        {(activeTab === "session-history" || activeTab === "sessions") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Dərs Sessiyaları Tarixi</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Sessiya Tarixi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {lessonSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-devcode-gray">Hələ heç bir dərs sessiyası keçirilməyib</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tarix</TableHead>
                        <TableHead>Başlama Saatı</TableHead>
                        <TableHead>Müddət</TableHead>
                        <TableHead>İştirak</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lessonSessions.map((session: any) => (
                        <TableRow key={`session-${session.id}`}>
                          <TableCell>
                            {new Date(session.startTime).toLocaleDateString('az-AZ')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(session.startTime).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </TableCell>
                          <TableCell>
                            {session.duration ? `${Math.floor(session.duration / 60)} dəq` : "Davam edir"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {session.attendanceCount || 0} iştirak
                              </Badge>
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                {(students?.length || 0) - (session.attendanceCount || 0)} yox
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={session.endTime ? "secondary" : "default"}>
                              {session.endTime ? "Bitmiş" : "Aktiv"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        )}

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
                          value={lessonForm.duration || ""}
                          onChange={(e) => setLessonForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                          placeholder="45"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lesson-order">Sıra</Label>
                        <Input
                          id="lesson-order"
                          type="number"
                          value={lessonForm.orderIndex}
                          onChange={(e) => setLessonForm(prev => ({ ...prev, orderIndex: parseInt(e.target.value) || 1 }))}
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Tələbələr ({students.length})</h2>
              <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-devcode-orange hover:bg-orange-600">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Tələbə Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Kursa Tələbə Əlavə Et</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="student-select">Tələbə Seç</Label>
                      <Select
                        value={studentForm.studentId}
                        onValueChange={(value) => setStudentForm({ studentId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tələbə seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableStudents.map((student: any) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.firstName} {student.lastName} ({student.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleEnrollStudent}
                      disabled={enrollStudentMutation.isPending || !studentForm.studentId}
                      className="bg-devcode-orange hover:bg-orange-600"
                    >
                      {enrollStudentMutation.isPending ? "Əlavə edilir..." : "Tələbə Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student: any, index: number) => (
                      <TableRow key={`student-${student.id}-${index}`}>
                        <TableCell className="font-medium">
                          {student.firstName} {student.lastName}
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          {student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString('az-AZ') : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {student.progress || 0}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {student.grade ? `${student.grade}/100` : "Qiymətləndirilməyib"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                            onClick={() => handleRemoveStudent(student.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Sil
                          </Button>
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Davamiyyət ({students.length} tələbə)</h2>
              {activeSession && (
                <Badge variant="outline" className="px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Aktiv Dərs: Davamiyyət qeyd edilə bilər
                </Badge>
              )}
            </div>
            
            {/* Monthly Attendance Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Son 1 Ay Davamiyyət Statistikası</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">Orta Davamiyyət</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Toplam Dərslər</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-gray-600">Qeyb Olanlar</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Tələbə Davamiyyəti</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tələbə</TableHead>
                      <TableHead>Son 1 Ay Davamiyyət</TableHead>
                      <TableHead>Toplam Dərslər</TableHead>
                      <TableHead>İştirak Etdi</TableHead>
                      <TableHead>Qeyb Oldu</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student: any, index: number) => {
                      const attendanceRate = Math.floor(Math.random() * 30) + 70; // Mock data for demo
                      const totalSessions = 12;
                      const attendedSessions = Math.floor((attendanceRate / 100) * totalSessions);
                      const missedSessions = totalSessions - attendedSessions;
                      
                      return (
                        <TableRow key={`attendance-${student.id}-${index}`}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-devcode-orange rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{student.firstName} {student.lastName}</div>
                                <div className="text-sm text-devcode-gray">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                                <div 
                                  className={`h-2 rounded-full ${
                                    attendanceRate >= 80 ? 'bg-green-500' : 
                                    attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${attendanceRate}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{attendanceRate}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{totalSessions}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {attendedSessions}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {missedSessions}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {activeSession && (
                                <>
                                  <Button
                                    variant={attendanceChanges[student.id] === "present" ? "default" : "outline"}
                                    size="sm"
                                    className={`${
                                      attendanceChanges[student.id] === "present" 
                                        ? "bg-green-600 hover:bg-green-700 text-white" 
                                        : "text-green-600 hover:text-green-700 hover:border-green-300"
                                    }`}
                                    onClick={() => handleMarkAttendance(student.id, "present")}
                                  >
                                    <CheckSquare className="w-4 h-4 mr-1" />
                                    İştirak Edir
                                  </Button>
                                  <Button
                                    variant={attendanceChanges[student.id] === "absent" ? "default" : "outline"}
                                    size="sm"
                                    className={`${
                                      attendanceChanges[student.id] === "absent" 
                                        ? "bg-red-600 hover:bg-red-700 text-white" 
                                        : "text-red-600 hover:text-red-700 hover:border-red-300"
                                    }`}
                                    onClick={() => handleMarkAttendance(student.id, "absent")}
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Yoxdur
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Save Attendance Button - Only show when session is active and changes were made */}
            {activeSession && Object.keys(attendanceChanges).length > 0 && (
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={handleSaveAttendance}
                  className="bg-devcode-orange hover:bg-orange-600"
                  disabled={attendanceSaved}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {attendanceSaved ? "Yadda Saxlanıldı" : "Davamiyyəti Yadda Saxla"}
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Kurs Analitikası</h2>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ümumi Davamiyyət</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {students?.length > 0 ? 
                      Math.round((lessonSessions?.reduce((acc: number, session: any) => acc + (session.attendanceCount || 0), 0) / (students.length * lessonSessions?.length || 1)) * 100) 
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Orta davamiyyət
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Qiymətləndirilmiş Tapşırıqlar</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Ümumi tapşırıq sayı
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aktiv Tələbələr</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Qeydiyyatdan keçmiş
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Son Fəaliyyətlər
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessonSessions?.slice(0, 5).map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-devcode-orange text-white rounded-full flex items-center justify-center text-sm font-medium">
                          D
                        </div>
                        <div>
                          <p className="font-medium">Dərs Sessiyası</p>
                          <p className="text-sm text-devcode-gray">
                            {new Date(session.startTime).toLocaleDateString('az-AZ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {session.attendanceCount || 0} iştirak
                        </p>
                        <p className="text-sm text-devcode-gray">
                          {session.duration ? `${Math.floor(session.duration / 60)} dəq` : "Aktiv"}
                        </p>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-devcode-gray">Hələ fəaliyyət yoxdur</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Session Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sessiya Statistikaları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-devcode-gray">Ümumi sessiya sayı:</span>
                    <span className="font-medium">{lessonSessions?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-devcode-gray">Aktiv sessiyalar:</span>
                    <span className="font-medium">
                      {lessonSessions?.filter((s: any) => !s.endTime).length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-devcode-gray">Bitmiş sessiyalar:</span>
                    <span className="font-medium">
                      {lessonSessions?.filter((s: any) => s.endTime).length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-devcode-gray">Orta sessiya müddəti:</span>
                    <span className="font-medium">
                      {lessonSessions?.length > 0 ? 
                        Math.round(lessonSessions.reduce((acc: number, s: any) => acc + (s.duration || 0), 0) / lessonSessions.length / 60) || 0
                        : 0} dəq
                    </span>
                  </div>
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
            onCreateMaterial={() => setIsMaterialDialogOpen(true)}
            onCreateAssignment={() => setIsAssignmentDialogOpen(true)}
          />
        )}
      </div>

      {/* Material Dialog */}
      <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dərs Materialı Əlavə Et</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="material-title">Material Adı</Label>
              <Input
                id="material-title"
                value={materialForm.title}
                onChange={(e) => setMaterialForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Material başlığı"
              />
            </div>
            <div>
              <Label htmlFor="material-type">Material Növü</Label>
              <Select
                value={materialForm.materialType}
                onValueChange={(value) => setMaterialForm(prev => ({ ...prev, materialType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Material növünü seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="pdf">PDF Sənəd</SelectItem>
                  <SelectItem value="document">Word Sənəd</SelectItem>
                  <SelectItem value="link">Əlavə Link</SelectItem>
                  <SelectItem value="presentation">Təqdimat</SelectItem>
                  <SelectItem value="image">Şəkil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {materialForm.materialType === "video" && (
              <div>
                <Label htmlFor="material-video">Video URL</Label>
                <Input
                  id="material-video"
                  value={materialForm.videoUrl}
                  onChange={(e) => setMaterialForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=... və ya digər video linki"
                />
              </div>
            )}
            {(materialForm.materialType === "pdf" || materialForm.materialType === "document" || 
              materialForm.materialType === "presentation" || materialForm.materialType === "image") && (
              <div>
                <Label htmlFor="material-file">Fayl URL/Yol</Label>
                <Input
                  id="material-file"
                  value={materialForm.videoUrl}
                  onChange={(e) => setMaterialForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="Fayl linkini və ya yolunu daxil edin"
                />
                <p className="text-sm text-gray-500 mt-1">
                  PDF, Word, PowerPoint və ya şəkil faylları üçün link daxil edin
                </p>
              </div>
            )}
            {materialForm.materialType === "link" && (
              <div>
                <Label htmlFor="material-link">Web Link</Label>
                <Input
                  id="material-link"
                  value={materialForm.videoUrl}
                  onChange={(e) => setMaterialForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
            )}
            <div>
              <Label htmlFor="material-content">Açıqlama</Label>
              <Textarea
                id="material-content"
                value={materialForm.content}
                onChange={(e) => setMaterialForm(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Material haqqında əlavə məlumat, təlimatlar və ya qeydlər"
                rows={4}
              />
            </div>
            <Button 
              onClick={handleCreateMaterial}
              disabled={createMaterialMutation.isPending || !materialForm.title}
              className="bg-devcode-orange hover:bg-orange-600"
            >
              {createMaterialMutation.isPending ? "Əlavə edilir..." : "Material Əlavə Et"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assignment Dialog */}
      <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dərs Tapşırığı Əlavə Et</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="assignment-title">Tapşırıq Adı</Label>
              <Input
                id="assignment-title"
                value={assignmentForm.title}
                onChange={(e) => setAssignmentForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="HTML səhifə yaradın"
              />
            </div>
            <div>
              <Label htmlFor="assignment-description">Tapşırıq Təsviri</Label>
              <Textarea
                id="assignment-description"
                value={assignmentForm.description}
                onChange={(e) => setAssignmentForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Tapşırığın ətraflı təsviri"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignment-due">Son Tarix</Label>
                <Input
                  id="assignment-due"
                  type="datetime-local"
                  value={assignmentForm.dueDate}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="assignment-points">Max Qiymət</Label>
                <Input
                  id="assignment-points"
                  type="number"
                  value={assignmentForm.maxPoints}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, maxPoints: parseInt(e.target.value) || 100 }))}
                  placeholder="100"
                />
              </div>
            </div>
            <Button 
              onClick={handleCreateAssignment}
              disabled={createAssignmentMutation.isPending}
              className="bg-devcode-orange hover:bg-orange-600"
            >
              {createAssignmentMutation.isPending ? "Əlavə edilir..." : "Tapşırıq Əlavə Et"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Lesson Detail Component
function LessonDetailView({ 
  lesson, 
  courseId, 
  onBack, 
  onCreateMaterial, 
  onCreateAssignment 
}: { 
  lesson: any; 
  courseId: number; 
  onBack: () => void;
  onCreateMaterial: () => void;
  onCreateAssignment: () => void;
}) {
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

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveSubTab("materials")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSubTab === "materials"
                ? "border-devcode-orange text-devcode-orange"
                : "border-transparent text-devcode-gray hover:text-devcode-dark"
            }`}
          >
            Materiallar
          </button>
          <button
            onClick={() => setActiveSubTab("assignments")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSubTab === "assignments"
                ? "border-devcode-orange text-devcode-orange"
                : "border-transparent text-devcode-gray hover:text-devcode-dark"
            }`}
          >
            Tapşırıqlar
          </button>
        </nav>
      </div>

      {activeSubTab === "materials" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Materialları</h3>
            <Button onClick={onCreateMaterial} className="bg-devcode-orange hover:bg-orange-600">
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
                    <div className="flex-1">
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-devcode-gray">{material.materialType}</p>
                      {material.videoUrl && (
                        <a href={material.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                          Video linki
                        </a>
                      )}
                      {material.content && (
                        <p className="text-sm mt-2">{material.content}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {materials.length === 0 && (
              <div className="text-center py-8 text-devcode-gray">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Hələ material əlavə edilməyib</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === "assignments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dərs Tapşırıqları</h3>
            <Button onClick={onCreateAssignment} className="bg-devcode-orange hover:bg-orange-600">
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
                        {assignment.description && (
                          <p className="text-sm mt-2">{assignment.description}</p>
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
            {assignments.length === 0 && (
              <div className="text-center py-8 text-devcode-gray">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Hələ tapşırıq əlavə edilməyib</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}