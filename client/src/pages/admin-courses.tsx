
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  UserPlus,
  GraduationCap,
  BarChart3,
  TrendingUp,
  Eye,
  Settings,
  Menu,
  Calendar,
  CheckCircle,
  Clock,
  FileText
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
  instructor?: User;
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

export default function AdminCourses() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form states
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    instructorId: ''
  });

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Fetch all courses
  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all users
  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch enrollments for selected course
  const { data: courseEnrollments = [], isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: [`/api/courses/${selectedCourse?.id}/enrollments`],
    enabled: !!selectedCourse?.id,
    retry: false,
  });

  // Fetch course analytics
  const { data: courseAnalytics } = useQuery({
    queryKey: [`/api/courses/${selectedCourse?.id}/analytics`],
    enabled: !!selectedCourse?.id,
    retry: false,
  });

  // Create course mutation
  const createCourseMutation = useMutation({
    mutationFn: async (courseData: typeof courseForm) => {
      const response = await apiRequest("POST", "/api/courses", courseData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Kurs uğurla yaradıldı",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setIsCreateCourseOpen(false);
      setCourseForm({ title: '', description: '', instructorId: '' });
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Kurs yaradılarkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Update course mutation
  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<typeof courseForm>) => {
      const response = await apiRequest("PATCH", `/api/courses/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Kurs uğurla yeniləndi",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setIsEditCourseOpen(false);
      setEditingCourse(null);
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Kurs yenilənərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Delete course mutation
  const deleteCourseMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await apiRequest("DELETE", `/api/courses/${courseId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Kurs uğurla silindi",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      if (selectedCourse) {
        setSelectedCourse(null);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Kurs silinərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Add teacher to course mutation
  const addTeacherMutation = useMutation({
    mutationFn: async ({ courseId, teacherId }: { courseId: number, teacherId: string }) => {
      const response = await apiRequest("PATCH", `/api/courses/${courseId}`, { instructorId: teacherId });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Müəllim uğurla təyin edildi",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setIsAddTeacherOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Müəllim təyin edilərkən xəta baş verdi",
        variant: "destructive",
      });
    }
  });

  // Add student to course mutation
  const addStudentMutation = useMutation({
    mutationFn: async ({ courseId, studentId }: { courseId: number, studentId: string }) => {
      const response = await apiRequest("POST", "/api/enrollments", { courseId, studentId });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğur",
        description: "Tələbə uğurla əlavə edildi",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${selectedCourse?.id}/enrollments`] });
      setIsAddStudentOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Tələbə əlavə edilərkən xəta baş verdi",
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

  const handleCreateCourse = () => {
    if (!courseForm.title || !courseForm.description || !courseForm.instructorId) {
      toast({
        title: "Xəta",
        description: "Bütün sahələri doldurun",
        variant: "destructive",
      });
      return;
    }
    createCourseMutation.mutate(courseForm);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      instructorId: course.instructorId
    });
    setIsEditCourseOpen(true);
  };

  const handleUpdateCourse = () => {
    if (!editingCourse || !courseForm.title || !courseForm.description) {
      toast({
        title: "Xəta",
        description: "Bütün sahələri doldurun",
        variant: "destructive",
      });
      return;
    }
    updateCourseMutation.mutate({ id: editingCourse.id, ...courseForm });
  };

  const teachers = users.filter((u: User) => u.role === 'teacher');
  const students = users.filter((u: User) => u.role === 'student');
  const availableStudents = students.filter((student: User) => 
    !courseEnrollments.some((enrollment: Enrollment) => enrollment.studentId === student.id)
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Kurs İdarəetməsi</h1>
            <p className="text-gray-600 text-sm lg:text-base">Kursları yaradın, düzəliş edin və idarə edin</p>
          </div>
          <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Kurs
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Kurs Yarat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Kurs Adı</Label>
                  <Input
                    id="title"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Təsvir</Label>
                  <Textarea
                    id="description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="instructor">Müəllim</Label>
                  <Select value={courseForm.instructorId} onValueChange={(value) => setCourseForm({...courseForm, instructorId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Müəllim seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher: User) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.firstName} {teacher.lastName} ({teacher.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleCreateCourse} 
                  className="w-full"
                  disabled={createCourseMutation.isPending}
                >
                  {createCourseMutation.isPending ? "Yaradılır..." : "Kurs Yarat"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Course List */}
        {!selectedCourse ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bütün Kurslar</CardTitle>
              </CardHeader>
              <CardContent>
                {coursesLoading ? (
                  <div className="text-center py-8">Kurslar yüklənir...</div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Hələlik kurs yoxdur
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">KURS</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">MÜƏLLİM</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TƏLƏBƏLƏR</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">STATUS</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TARİX</th>
                          <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">ƏMƏLİYYATLAR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course: Course) => {
                          const instructor = users.find((u: User) => u.id === course.instructorId);
                          return (
                            <tr key={course.id} className="border-b border-gray-100">
                              <td className="py-4 px-2">
                                <div>
                                  <div className="font-medium text-gray-900">{course.title}</div>
                                  <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {course.description}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex items-center space-x-2">
                                  <Avatar>
                                    <AvatarFallback className="bg-gray-500 text-white">
                                      {instructor?.firstName?.charAt(0)}{instructor?.lastName?.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="text-sm text-gray-900">
                                    {instructor ? `${instructor.firstName} ${instructor.lastName}` : 'Təyin olunmayıb'}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <Badge variant="outline">{course.enrollmentCount || 0}</Badge>
                              </td>
                              <td className="py-4 px-2">
                                <Badge variant={course.isActive ? "default" : "secondary"}>
                                  {course.isActive ? "Aktiv" : "Qeyri-aktiv"}
                                </Badge>
                              </td>
                              <td className="py-4 px-2 text-sm text-gray-500">
                                {format(new Date(course.createdAt), 'dd MMM yyyy')}
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedCourse(course)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditCourse(course)}
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
                                        <AlertDialogTitle>Kursu Sil</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Bu kursu silmək istədiyinizə əminsiniz? Bu əməliyyatı geri qaytarmaq mümkün deyil.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Ləğv et</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => deleteCourseMutation.mutate(course.id)}
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
          /* Course Detail View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="outline" onClick={() => setSelectedCourse(null)} className="mb-4">
                  ← Geri
                </Button>
                <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
                <p className="text-gray-600">{selectedCourse.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleEditCourse(selectedCourse)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Düzəliş Et
                </Button>
              </div>
            </div>

            <Tabs defaultValue="students" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="students">Tələbələr</TabsTrigger>
                <TabsTrigger value="teacher">Müəllim</TabsTrigger>
                <TabsTrigger value="analytics">Analitika</TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Kurs Tələbələri</CardTitle>
                      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Tələbə Əlavə Et
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Tələbə Əlavə Et</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Select onValueChange={(value) => addStudentMutation.mutate({ courseId: selectedCourse.id, studentId: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Tələbə seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableStudents.length > 0 ? (
                                  availableStudents.map((student: User) => (
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
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {enrollmentsLoading ? (
                      <div className="text-center py-8">Tələbələr yüklənir...</div>
                    ) : courseEnrollments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Bu kursda hələlik tələbə yoxdur
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TƏLƏBƏ</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TƏRƏQQİ</th>
                              <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">QEYDİYYAT TARİXİ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseEnrollments.map((enrollment: Enrollment) => (
                              <tr key={enrollment.id} className="border-b border-gray-100">
                                <td className="py-4 px-2">
                                  <div className="flex items-center space-x-3">
                                    <Avatar>
                                      <AvatarFallback className="bg-gray-500 text-white">
                                        {enrollment.student?.firstName?.charAt(0)}{enrollment.student?.lastName?.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {enrollment.student?.firstName} {enrollment.student?.lastName}
                                      </div>
                                      <div className="text-sm text-gray-500">{enrollment.student?.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                      <div 
                                        className="bg-blue-600 h-2 rounded-full" 
                                        style={{ width: `${enrollment.progress || 0}%` }}
                                      />
                                    </div>
                                    <span className="text-sm text-gray-600">{enrollment.progress || 0}%</span>
                                  </div>
                                </td>
                                <td className="py-4 px-2 text-sm text-gray-500">
                                  {format(new Date(enrollment.enrolledAt), 'dd MMM yyyy')}
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

              <TabsContent value="teacher" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Kurs Müəllimi</CardTitle>
                      <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Müəllim Təyin Et
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Müəllim Təyin Et</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Select onValueChange={(value) => addTeacherMutation.mutate({ courseId: selectedCourse.id, teacherId: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Müəllim seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                {teachers.map((teacher: User) => (
                                  <SelectItem key={teacher.id} value={teacher.id}>
                                    {teacher.firstName} {teacher.lastName} ({teacher.email})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const instructor = users.find((u: User) => u.id === selectedCourse.instructorId);
                      return instructor ? (
                        <div className="flex items-center space-x-4 p-4 border rounded-lg">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-gray-500 text-white">
                              {instructor.firstName?.charAt(0)}{instructor.lastName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {instructor.firstName} {instructor.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">{instructor.email}</p>
                            <p className="text-xs text-gray-400">
                              Qeydiyyat tarixi: {format(new Date(instructor.createdAt), 'dd MMM yyyy')}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          Bu kursa hələlik müəllim təyin olunmayıb
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ümumi Tələbələr</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{courseEnrollments.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Qeydiyyatdan keçmiş tələbələr
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Orta Tərəqqi</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {courseEnrollments.length > 0 
                          ? Math.round(courseEnrollments.reduce((acc, e) => acc + (e.progress || 0), 0) / courseEnrollments.length)
                          : 0}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Bütün tələbələrin orta nəticəsi
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Kurs Statusu</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {selectedCourse.isActive ? "Aktiv" : "Qeyri-aktiv"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cari kurs statusu
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Tələbə Tərəqqisi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courseEnrollments.map((enrollment: Enrollment) => (
                        <div key={enrollment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gray-500 text-white">
                                {enrollment.student?.firstName?.charAt(0)}{enrollment.student?.lastName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {enrollment.student?.firstName} {enrollment.student?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{enrollment.student?.email}</div>
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
                      {courseEnrollments.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Tələbə yoxdur
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Edit Course Dialog */}
        <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Kursu Düzəliş Et</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Kurs Adı</Label>
                <Input
                  id="edit-title"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Təsvir</Label>
                <Textarea
                  id="edit-description"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-instructor">Müəllim</Label>
                <Select value={courseForm.instructorId} onValueChange={(value) => setCourseForm({...courseForm, instructorId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Müəllim seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher: User) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName} ({teacher.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleUpdateCourse} 
                className="w-full"
                disabled={updateCourseMutation.isPending}
              >
                {updateCourseMutation.isPending ? "Yenilənir..." : "Yenilə"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
