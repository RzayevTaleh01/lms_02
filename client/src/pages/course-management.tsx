import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import CourseSidebar from "@/components/course-sidebar";
import ActiveSessionBar from "@/components/active-session-bar";
import SessionHistory from "@/pages/session-history";
import EnhancedLessonManagement from "@/components/enhanced-lesson-management";
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
  BarChart3,
  UserCheck,
  UserX,
  RotateCcw
} from "lucide-react";

export default function CourseManagement() {
  const { id } = useParams();
  const courseId = id;
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State management
  const [activeTab, setActiveTab] = useState("lessons");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: "", description: "", duration: "" });
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<{[key: string]: string}>({});
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
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
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedLessonForManagement, setSelectedLessonForManagement] = useState<any>(null);
  const [isAttendanceDisabled, setIsAttendanceDisabled] = useState(false);

  // Check URL hash to open specific tab
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === 'assignments') {
      setActiveTab('assignments');
    }
  }, []);

  // Data fetching
  const { data: course } = useQuery({
    queryKey: [`/api/courses/${id}`],
  });

  const { data: students = [] } = useQuery({
    queryKey: [`/api/courses/${id}/students`],
    enabled: !!id,
  });

  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${id}/lessons`],
    enabled: !!id,
  });

  const { data: activeSession } = useQuery({
    queryKey: [`/api/courses/${id}/active-session`],
    refetchInterval: 5000,
    enabled: !!id,
  });

  const { data: lessonSessions = [] } = useQuery({
    queryKey: [`/api/courses/${id}/sessions`],
    enabled: !!id,
  });

  // Get attendance data for each session
  const { data: allSessionsAttendance = {} } = useQuery({
    queryKey: [`/api/courses/${id}/all-attendance`],
    queryFn: async () => {
      const attendanceMap: { [sessionId: number]: any[] } = {};

      for (const session of lessonSessions) {
        try {
          const response = await fetch(`/api/sessions/${session.id}/attendance`, {
            credentials: "include"
          });
          if (response.ok) {
            const sessionAttendance = await response.json();
            attendanceMap[session.id] = sessionAttendance;
          }
        } catch (error) {
          console.error(`Error fetching attendance for session ${session.id}:`, error);
          attendanceMap[session.id] = [];
        }
      }

      return attendanceMap;
    },
    enabled: lessonSessions.length > 0,
  });

  const { data: allUsers = [] } = useQuery({
    queryKey: ["/api/users"],
  });

  // Mutations
  const startSessionMutation = useMutation({
    mutationFn: () => fetch(`/api/courses/${id}/sessions`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        sessionName: `${course?.title} - ${new Date().toLocaleDateString('az-AZ')}`
      })
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Dərs uğurla başladıldı" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/active-session`] });
    },
  });

  const endSessionMutation = useMutation({
    mutationFn: (sessionId: number) => fetch(`/api/sessions/${sessionId}/end`, { 
      method: "PATCH",
      credentials: "include"
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Dərs uğurla bitirildi" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/active-session`] });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/sessions`] });
    },
  });

  const addStudentMutation = useMutation({
    mutationFn: (studentId: string) => fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ courseId: parseInt(id!), studentId }),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to add student');
      }
      return res.json();
    }),
    onSuccess: () => {
      toast({ title: "Tələbə uğurla əlavə edildi" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/students`] });
      setIsAddStudentOpen(false);
      setSelectedStudentId("");
    },
    onError: (error) => {
      console.error("Error adding student:", error);
      toast({ 
        title: "Xəta", 
        description: "Tələbə əlavə edilərkən xəta baş verdi",
        variant: "destructive" 
      });
    }
  });

  const removeStudentMutation = useMutation({
    mutationFn: (studentId: string) => fetch(`/api/enrollments/${id}/${studentId}`, {
      method: "DELETE",
      credentials: "include",
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Tələbə uğurla silindi" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/students`] });
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: (lessonData: any) => fetch(`/api/courses/${id}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(lessonData),
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Dərs uğurla yaradıldı" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/lessons`] });
      setIsCreateLessonOpen(false);
      setNewLesson({ title: "", description: "", duration: "" });
    },
  });

  const updateLessonMutation = useMutation({
    mutationFn: ({ lessonId, ...data }: any) => fetch(`/api/lessons/${lessonId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then(res => res.json()),
    onSuccess: () => {
      toast({ title: "Dərs uğurla yeniləndi" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/lessons`] });
      setEditingLesson(null);
    },
  });

  const saveAttendanceMutation = useMutation({
        mutationFn: async () => {
            if (!activeSession) throw new Error("No active session");

            const attendancePromises = Object.entries(attendanceData).map(([studentId, status]) => 
                fetch(`/api/sessions/${activeSession.id}/attendance`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ 
                        studentId, 
                        status,
                        courseId: parseInt(id!)
                    })
                }).then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to mark attendance');
                    }
                    return res.json();
                })
            );

            return Promise.all(attendancePromises);
        },
        onSuccess: () => {
            toast({ title: "Davamiyyət uğurla yadda saxlanıldı" });
            setAttendanceData({});
            setIsAttendanceDisabled(true);
            // Invalidate all session-related queries for real-time updates
            queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/sessions`] });
            queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/all-attendance`] });
            
            // Force refetch all sessions attendance data immediately
            if (lessonSessions && Array.isArray(lessonSessions)) {
                lessonSessions.forEach((session: any) => {
                    queryClient.invalidateQueries({ queryKey: [`/api/sessions/${session.id}/attendance`] });
                });
            }
            
            // Also invalidate the current active session
            if (activeSession) {
                queryClient.invalidateQueries({ queryKey: [`/api/sessions/${activeSession.id}/attendance`] });
            }
        },
        onError: (error) => {
            console.error("Error saving attendance:", error);
            toast({ 
                title: "Xəta", 
                description: "Davamiyyət yadda saxlanarkən xəta baş verdi",
                variant: "destructive" 
            });
        }
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
                body: JSON.stringify({ ...assignmentData, courseId: parseInt(id!) }),
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

  // Event handlers
  const handleStartSession = () => {
    startSessionMutation.mutate();
  };

  const handleEndSession = () => {
    if (activeSession) {
      endSessionMutation.mutate(activeSession.id);
    }
  };

    const handleCreateMaterial = () => {
        createMaterialMutation.mutate(materialForm);
    };

    const handleCreateAssignment = () => {
        createAssignmentMutation.mutate(assignmentForm);
    };

  const handleAddStudent = () => {
    if (selectedStudentId) {
      addStudentMutation.mutate(selectedStudentId);
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    if (confirm("Bu tələbəni silmək istədiyinizə əminsiniz?")) {
      removeStudentMutation.mutate(studentId);
    }
  };

  const handleCreateLesson = () => {
    createLessonMutation.mutate(newLesson);
  };

    const handleEnrollStudent = () => {
        addStudentMutation.mutate(studentForm.studentId);
    };

  const handleUpdateLesson = () => {
    if (editingLesson) {
      updateLessonMutation.mutate(editingLesson);
    }
  };

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    saveAttendanceMutation.mutate();
  };

    const availableStudents = Array.isArray(allUsers) ? allUsers.filter((user: any) =>
        user.role === "student" &&
        !students.some((student: any) => student.id === user.id)
    ) : [];


    const handleRemoveStudentOriginal = (studentId: string) => {
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CourseSidebar 
        course={course} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      {activeSession && <ActiveSessionBar session={activeSession} onEndSession={handleEndSession} />}

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 lg:ml-80" style={{ paddingTop: activeSession ? '100px' : '32px' }}>
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
        {activeTab === "lessons" && (
          <EnhancedLessonManagement 
            courseId={parseInt(courseId)}
            selectedLesson={selectedLessonForManagement}
            onSelectLesson={setSelectedLessonForManagement}
          />
        )}

        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Tələbələr</h2>
              <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-devcode-orange hover:bg-orange-600">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Tələbə Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tələbə Əlavə Et</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tələbə seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStudents.length > 0 ? (
                          availableStudents.map((student: any) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.firstName} {student.lastName} ({student.email})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-students" disabled>
                            Əlavə ediləcək tələbə yoxdur
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddStudent} disabled={!selectedStudentId || addStudentMutation.isPending} className="bg-devcode-orange hover:bg-orange-600">
                      Əlavə Et
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
                      <TableHead>Ad</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Qoşulma Tarixi</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student: any) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.firstName} {student.lastName}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{new Date(student.enrolledAt).toLocaleDateString('az-AZ')}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveStudent(student.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
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
              <h2 className="text-2xl font-semibold">Davamiyyət</h2>
            </div>

            {/* Attendance marking - only available during active session */}
            {activeSession && (
              <Card>
                <CardHeader>
                  <CardTitle>Cari Dərs Davamiyyəti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student: any) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{student.firstName} {student.lastName}</span>
                        <div className="flex space-x-2">
                          <Button
                            variant={attendanceData[student.id] === "present" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleAttendanceChange(student.id, "present")}
                            className={attendanceData[student.id] === "present" ? "bg-green-600 hover:bg-green-700 text-white" : "text-green-600 hover:text-green-700 hover:border-green-300"}
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            İştirak Edir
                          </Button>
                          <Button
                            variant={attendanceData[student.id] === "absent" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleAttendanceChange(student.id, "absent")}
                            className={attendanceData[student.id] === "absent" ? "bg-red-600 hover:bg-red-700 text-white" : "text-red-600 hover:text-red-700 hover:border-red-300"}
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Yoxdur
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={handleSaveAttendance}
                      disabled={isAttendanceDisabled || Object.keys(attendanceData).length === 0}
                      className="w-full bg-devcode-orange hover:bg-orange-600"
                    >
                      {attendanceSaved ? "Yadda Saxlanıldı" : "Davamiyyəti Yadda Saxla"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Overall attendance table */}
            <Card>
              <CardHeader>
                <CardTitle>Ümumi Davamiyyət</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto border rounded-lg">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tələbə</TableHead>
                      {lessonSessions.map((session: any) => (
                        <TableHead key={session.id} className="text-center">
                          {session.startedAt ? 
                            new Date(session.startedAt).toLocaleDateString('az-AZ', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            }) :
                            new Date(session.createdAt || Date.now()).toLocaleDateString('az-AZ', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                          }
                        </TableHead>
                      ))}
                      <TableHead>Davamiyyət %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student: any) => {
                      let attendanceCount = 0;

                      // Count attendance for this student across all sessions
                      lessonSessions.forEach((session: any) => {
                        const sessionAttendance = allSessionsAttendance[session.id] || [];
                        const studentAttendance = sessionAttendance.find((record: any) => 
                          record.studentId === student.id && record.status === "present"
                        );
                        if (studentAttendance) {
                          attendanceCount++;
                        }
                      });

                      const attendancePercentage = lessonSessions.length > 0 ? 
                        Math.round((attendanceCount / lessonSessions.length) * 100) : 0;

                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.firstName} {student.lastName}
                          </TableCell>
                          {lessonSessions.map((session: any) => {
                            const sessionAttendance = allSessionsAttendance[session.id] || [];
                            const attendance = sessionAttendance.find((record: any) => 
                              record.studentId === student.id
                            );
                            return (
                              <TableCell key={session.id}>
                                {attendance ? (
                                  <Badge variant={attendance.status === "present" ? "default" : "destructive"}>
                                    {attendance.status === "present" ? "✓" : "✗"}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </TableCell>
                            );
                          })}
                          <TableCell>
                            <Badge variant={attendancePercentage >= 80 ? "default" : "destructive"}>
                              {attendancePercentage}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Sessiya Tarixi</h2>
            </div>
            <SessionHistory courseId={parseInt(courseId)}/>
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
                    {(() => {
                      if (!students?.length || !lessonSessions?.length) return "0%";

                      let totalPresentCount = 0;
                      const totalPossibleAttendance = students.length * lessonSessions.length;

                      lessonSessions.forEach((session: any) => {
                        const sessionAttendance = allSessionsAttendance[session.id] || [];
                        totalPresentCount += sessionAttendance.filter((record: any) => record.status === "present").length;
                      });

                      return Math.round((totalPresentCount / totalPossibleAttendance) * 100) + "%";
                    })()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Bütün dərslərdə orta davamiyyət
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dəyərləndirilmiş Tapşırıqlar</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Bu kursda dəyərləndirilmiş tapşırıq sayı
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Son Tapşırıqlar</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Son 7 gündə göndərilən tapşırıqlar
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Additional Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Davamiyyət Trendi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Davamiyyət qrafiki burada göstəriləcək
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tələbə Performansı</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Performans qrafiki burada göstəriləcək
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

          {activeTab === "lesson-detail" && selectedLesson && (
              <LessonDetailView
                  lesson={selectedLesson}
                  courseId={parseInt(id!)}
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
                        <div>                            <Label htmlFor="material-link">Web Link</Label>
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
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeSubTab === "materials"
                            ? "border-devcode-orange text-devcode-orange"
                            : "border-transparent text-devcode-gray hover:text-devcode-dark"
                            }`}
                    >
                        Materiallar
                    </button>
                    <button
                        onClick={() => setActiveSubTab("assignments")}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeSubTab === "assignments"
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