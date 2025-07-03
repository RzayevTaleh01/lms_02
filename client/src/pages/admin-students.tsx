
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  UserPlus,
  Eye,
  Menu,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Award,
  BarChart3,
  GraduationCap
} from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: string;
  updatedAt: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructorId: string;
  isActive: boolean;
  enrollmentCount: number;
  createdAt: string;
}

interface Enrollment {
  id: number;
  studentId: string;
  courseId: number;
  enrolledAt: string;
  progress: number;
  student: User;
  course: Course;
}

interface Submission {
  id: number;
  assignmentId: number;
  studentId: string;
  content: string;
  fileUrl?: string;
  grade?: number;
  feedback?: string;
  submittedAt: string;
  assignment: {
    id: number;
    title: string;
    lessonId: number;
    lesson: {
      title: string;
      course: Course;
    };
  };
}

interface Attendance {
  id: number;
  studentId: string;
  sessionId: number;
  isPresent: boolean;
  session: {
    id: number;
    title: string;
    courseId: number;
    startedAt: string;
    course: Course;
  };
}

export default function AdminStudents() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form states
  const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
  const [isAddToCourseOpen, setIsAddToCourseOpen] = useState(false);
  
  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [editingStudent, setEditingStudent] = useState<User | null>(null);

  // Fetch all students
  const { data: students = [], isLoading: studentsLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    select: (users) => users.filter((u: User) => u.role === 'student'),
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all courses
  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch enrollments for selected student
  const { data: studentEnrollments = [], isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: [`/api/students/${selectedStudent?.id}/enrollments`],
    queryFn: async () => {
      if (!selectedStudent) return [];
      const response = await apiRequest("GET", `/api/enrollments`);
      const allEnrollments = await response.json();
      return allEnrollments.filter((e: Enrollment) => e.studentId === selectedStudent.id);
    },
    enabled: !!selectedStudent?.id,
    retry: false,
  });

  // Fetch submissions for selected student
  const { data: studentSubmissions = [], isLoading: submissionsLoading } = useQuery<Submission[]>({
    queryKey: [`/api/students/${selectedStudent?.id}/submissions`],
    queryFn: async () => {
      if (!selectedStudent) return [];
      const response = await apiRequest("GET", `/api/submissions`);
      const allSubmissions = await response.json();
      return allSubmissions.filter((s: Submission) => s.studentId === selectedStudent.id);
    },
    enabled: !!selectedStudent?.id,
    retry: false,
  });

  // Fetch attendance for selected student
  const { data: studentAttendance = [], isLoading: attendanceLoading } = useQuery<Attendance[]>({
    queryKey: [`/api/students/${selectedStudent?.id}/attendance`],
    queryFn: async () => {
      if (!selectedStudent) return [];
      const response = await apiRequest("GET", `/api/attendance/student/${selectedStudent.id}`);
      return response.json();
    },
    enabled: !!selectedStudent?.id,
    retry: false,
  });

  // Create student mutation
  const createStudentMutation = useMutation({
    mutationFn: async (studentData: typeof studentForm) => {
      const response = await apiRequest("POST", "/api/auth/register", {
        ...studentData,
        role: 'student'
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Tələbə uğurla yaradıldı",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsCreateStudentOpen(false);
      setStudentForm({ firstName: '', lastName: '', email: '', password: '' });
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Tələbə yaradılarkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Update student mutation
  const updateStudentMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<typeof studentForm>) => {
      const response = await apiRequest("PATCH", `/api/users/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Tələbə məlumatları uğurla yeniləndi",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsEditStudentOpen(false);
      setEditingStudent(null);
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Tələbə yenilənərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Delete student mutation
  const deleteStudentMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const response = await apiRequest("DELETE", `/api/users/${studentId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Tələbə uğurla silindi",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      if (selectedStudent) {
        setSelectedStudent(null);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Tələbə silinərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Enroll student to course mutation
  const enrollStudentMutation = useMutation({
    mutationFn: async ({ studentId, courseId }: { studentId: string, courseId: number }) => {
      const response = await apiRequest("POST", "/api/enrollments", { studentId, courseId });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Tələbə kursa uğurla əlavə edildi",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/students/${selectedStudent?.id}/enrollments`] });
      setIsAddToCourseOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Tələbə kursa əlavə edilərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "İcazə yoxdur",
        description: "Sistemə daxil olmağınız lazımdır",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">İcazə yoxdur</h1>
          <p className="text-gray-600">Bu səhifəyə giriş icazəniz yoxdur.</p>
        </div>
      </div>
    );
  }

  const handleCreateStudent = () => {
    if (!studentForm.firstName || !studentForm.lastName || !studentForm.email || !studentForm.password) {
      toast({
        title: "Xəta",
        description: "Bütün sahələri doldurun",
        variant: "destructive",
      });
      return;
    }
    createStudentMutation.mutate(studentForm);
  };

  const handleEditStudent = (student: User) => {
    setEditingStudent(student);
    setStudentForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: ''
    });
    setIsEditStudentOpen(true);
  };

  const handleUpdateStudent = () => {
    if (!editingStudent || !studentForm.firstName || !studentForm.lastName || !studentForm.email) {
      toast({
        title: "Xəta",
        description: "Zəruri sahələri doldurun",
        variant: "destructive",
      });
      return;
    }
    
    const updateData = {
      firstName: studentForm.firstName,
      lastName: studentForm.lastName,
      email: studentForm.email,
      ...(studentForm.password && { password: studentForm.password })
    };
    
    updateStudentMutation.mutate({ id: editingStudent.id, ...updateData });
  };

  const availableCourses = courses.filter((course: Course) => 
    !studentEnrollments.some((enrollment: Enrollment) => enrollment.courseId === course.id)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-white shadow-md"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 lg:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tələbə İdarəetməsi</h1>
            <p className="text-gray-600 text-sm lg:text-base">Tələbələri idarə edin və izləyin</p>
          </div>
          <Dialog open={isCreateStudentOpen} onOpenChange={setIsCreateStudentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Tələbə
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Tələbə Əlavə Et</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      value={studentForm.firstName}
                      onChange={(e) => setStudentForm({...studentForm, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      value={studentForm.lastName}
                      onChange={(e) => setStudentForm({...studentForm, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Parol</Label>
                  <Input
                    id="password"
                    type="password"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({...studentForm, password: e.target.value})}
                  />
                </div>
                <Button 
                  onClick={handleCreateStudent} 
                  className="w-full"
                  disabled={createStudentMutation.isPending}
                >
                  {createStudentMutation.isPending ? "Əlavə edilir..." : "Tələbə Əlavə Et"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Student List or Detail View */}
        {!selectedStudent ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bütün Tələbələr</CardTitle>
              </CardHeader>
              <CardContent>
                {studentsLoading ? (
                  <div className="text-center py-8">Tələbələr yüklənir...</div>
                ) : students.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Hələlik tələbə yoxdur
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TƏLƏBƏ</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">KURSLAR</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">QEYDİYYAT TARİXİ</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">STATUS</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">ƏMƏLİYYATLAR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student: User) => {
                          const enrollmentCount = studentEnrollments.filter(e => e.studentId === student.id).length;
                          return (
                            <tr key={student.id} className="border-b border-gray-100">
                              <td className="py-4 px-2">
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarFallback className="bg-gray-500 text-white">
                                      {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                                    <div className="text-sm text-gray-500">{student.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <Badge variant="outline">{enrollmentCount || 0} kurs</Badge>
                              </td>
                              <td className="py-4 px-2 text-sm text-gray-500">
                                {format(new Date(student.createdAt), 'dd MMM yyyy')}
                              </td>
                              <td className="py-4 px-2">
                                <Badge variant="outline" className="text-green-800 border-green-200">
                                  Aktiv
                                </Badge>
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedStudent(student)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditStudent(student)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="sm" className="text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Tələbəni Sil</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Bu tələbəni silmək istədiyinizə əminsiniz? Bu əməliyyatı geri qaytarmaq mümkün deyil.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Ləğv et</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => deleteStudentMutation.mutate(student.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Sil
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Student Detail View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="outline" onClick={() => setSelectedStudent(null)} className="mb-4">
                  ← Geri
                </Button>
                <h2 className="text-2xl font-semibold">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h2>
                <p className="text-gray-600">{selectedStudent.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleEditStudent(selectedStudent)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Düzəliş Et
                </Button>
                <Dialog open={isAddToCourseOpen} onOpenChange={setIsAddToCourseOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Kursa Əlavə Et
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tələbəni Kursa Əlavə Et</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select onValueChange={(value) => enrollStudentMutation.mutate({ 
                        studentId: selectedStudent.id, 
                        courseId: parseInt(value) 
                      })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kurs seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCourses.length > 0 ? (
                            availableCourses.map((course: Course) => (
                              <SelectItem key={course.id} value={course.id.toString()}>
                                {course.title}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-courses" disabled>
                              Əlavə ediləcək kurs yoxdur
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Tabs defaultValue="courses" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="courses">Kurslar</TabsTrigger>
                <TabsTrigger value="grades">Qiymətlər</TabsTrigger>
                <TabsTrigger value="attendance">Davamiyyət</TabsTrigger>
                <TabsTrigger value="analytics">Analitika</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tələbənin Kursları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {enrollmentsLoading ? (
                      <div className="text-center py-8">Kurslar yüklənir...</div>
                    ) : studentEnrollments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Bu tələbə hələlik heç bir kursa qeydiyyatdan keçməyib
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {studentEnrollments.map((enrollment: Enrollment) => (
                          <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <BookOpen className="w-8 h-8 text-blue-600" />
                              <div>
                                <h3 className="font-medium text-gray-900">{enrollment.course?.title}</h3>
                                <p className="text-sm text-gray-500">
                                  Qeydiyyat: {format(new Date(enrollment.enrolledAt), 'dd MMM yyyy')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="text-sm text-gray-500">Tərəqqi</div>
                                <div className="font-medium">{enrollment.progress || 0}%</div>
                              </div>
                              <Progress value={enrollment.progress || 0} className="w-20" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="grades" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Qiymətlər və Tapşırıqlar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {submissionsLoading ? (
                      <div className="text-center py-8">Qiymətlər yüklənir...</div>
                    ) : studentSubmissions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Hələlik qiymət yoxdur
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TAPŞIRIQ</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">KURS</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">QİYMƏT</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">GÖNDƏRİLMƏ TARİXİ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentSubmissions.map((submission: Submission) => (
                              <tr key={submission.id} className="border-b border-gray-100">
                                <td className="py-4 px-2">
                                  <div className="font-medium text-gray-900">{submission.assignment?.title}</div>
                                  <div className="text-sm text-gray-500">{submission.assignment?.lesson?.title}</div>
                                </td>
                                <td className="py-4 px-2">
                                  <div className="text-sm text-gray-900">{submission.assignment?.lesson?.course?.title}</div>
                                </td>
                                <td className="py-4 px-2">
                                  {submission.grade !== null ? (
                                    <Badge variant={submission.grade >= 70 ? "default" : "destructive"}>
                                      {submission.grade}/100
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary">Qiymətləndirilməyib</Badge>
                                  )}
                                </td>
                                <td className="py-4 px-2 text-sm text-gray-500">
                                  {format(new Date(submission.submittedAt), 'dd MMM yyyy HH:mm')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Davamiyyət</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {attendanceLoading ? (
                      <div className="text-center py-8">Davamiyyət yüklənir...</div>
                    ) : studentAttendance.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Hələlik davamiyyət qeydi yoxdur
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">DƏRS</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">KURS</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TARİX</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentAttendance.map((attendance: Attendance) => (
                              <tr key={attendance.id} className="border-b border-gray-100">
                                <td className="py-4 px-2">
                                  <div className="font-medium text-gray-900">{attendance.session?.title}</div>
                                </td>
                                <td className="py-4 px-2">
                                  <div className="text-sm text-gray-900">{attendance.session?.course?.title}</div>
                                </td>
                                <td className="py-4 px-2 text-sm text-gray-500">
                                  {format(new Date(attendance.session?.startedAt), 'dd MMM yyyy HH:mm')}
                                </td>
                                <td className="py-4 px-2">
                                  <Badge variant={attendance.isPresent ? "default" : "destructive"}>
                                    {attendance.isPresent ? "İştirak edib" : "İştirak etməyib"}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Kurslar</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentEnrollments.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Qeydiyyatdan keçdiyi kurslar
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Orta Qiymət</CardTitle>
                      <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {studentSubmissions.length > 0 && studentSubmissions.filter(s => s.grade !== null).length > 0
                          ? Math.round(
                              studentSubmissions
                                .filter(s => s.grade !== null)
                                .reduce((sum, s) => sum + (s.grade || 0), 0) / 
                              studentSubmissions.filter(s => s.grade !== null).length
                            )
                          : 0}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Bütün tapşırıqların ortalaması
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Davamiyyət</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {studentAttendance.length > 0
                          ? Math.round((studentAttendance.filter(a => a.isPresent).length / studentAttendance.length) * 100)
                          : 0}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Davamiyyət faizi
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Tərəqqi Məlumatları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentEnrollments.map((enrollment: Enrollment) => (
                        <div key={enrollment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                            <div>
                              <div className="font-medium">{enrollment.course?.title}</div>
                              <div className="text-sm text-gray-500">
                                Qeydiyyat: {format(new Date(enrollment.enrolledAt), 'dd MMM yyyy')}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${enrollment.progress || 0}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{enrollment.progress || 0}%</span>
                          </div>
                        </div>
                      ))}
                      {studentEnrollments.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Kurs qeydiyyatı yoxdur
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Edit Student Dialog */}
        <Dialog open={isEditStudentOpen} onOpenChange={setIsEditStudentOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tələbə Məlumatlarını Düzəliş Et</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-firstName">Ad</Label>
                  <Input
                    id="edit-firstName"
                    value={studentForm.firstName}
                    onChange={(e) => setStudentForm({...studentForm, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-lastName">Soyad</Label>
                  <Input
                    id="edit-lastName"
                    value={studentForm.lastName}
                    onChange={(e) => setStudentForm({...studentForm, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-password">Yeni Parol (ixtiyari)</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({...studentForm, password: e.target.value})}
                  placeholder="Parolun dəyişdirilməsi üçün daxil edin"
                />
              </div>
              <Button 
                onClick={handleUpdateStudent} 
                className="w-full"
                disabled={updateStudentMutation.isPending}
              >
                {updateStudentMutation.isPending ? "Yenilənir..." : "Məlumatları Yenilə"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
