import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import CourseSidebar from "@/components/course-sidebar";
import ActiveSessionBar from "@/components/active-session-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Upload
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
    if (activeSession) {
      markAttendanceMutation.mutate({
        sessionId: activeSession.id,
        studentId,
        courseId,
        status
      });
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

      {activeSession && <ActiveSessionBar session={activeSession} onEnd={handleEndSession} />}

      {/* Main Content */}
      <div className="flex-1 p-8 ml-80" style={{ marginTop: activeSession ? '80px' : '0' }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="outline" onClick={() => setLocation("/teacher/dashboard")} className="mb-4">
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

            {activeSession && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cari Dərs - Davamiyyət Qeyd Et</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student: any) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{student.firstName} {student.lastName}</p>
                          <p className="text-sm text-devcode-gray">{student.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleMarkAttendance(student.id, "present")}
                          >
                            İştirak Edir
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAttendance(student.id, "absent")}
                          >
                            Yoxdur
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Dərs Sesiyaları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessonSessions.map((session: any) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{session.sessionName}</h4>
                          <p className="text-sm text-devcode-gray">
                            {new Date(session.startTime).toLocaleString()}
                            {session.duration && ` - ${session.duration} dəqiqə`}
                          </p>
                        </div>
                        <Badge variant={session.isActive ? "default" : "secondary"}>
                          {session.isActive ? "Aktiv" : "Bitib"}
                        </Badge>
                      </div>
                    </div>
                  ))}
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
        <DialogContent>
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
                placeholder="Video başlığı"
              />
            </div>
            <div>
              <Label htmlFor="material-video">Video URL</Label>
              <Input
                id="material-video"
                value={materialForm.videoUrl}
                onChange={(e) => setMaterialForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div>
              <Label htmlFor="material-content">Açıqlama</Label>
              <Textarea
                id="material-content"
                value={materialForm.content}
                onChange={(e) => setMaterialForm(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Material haqqında əlavə məlumat"
                rows={4}
              />
            </div>
            <Button 
              onClick={handleCreateMaterial}
              disabled={createMaterialMutation.isPending}
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