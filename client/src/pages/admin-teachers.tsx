import { useState } from "react";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  UserPlus,
  Eye,
  Trash2
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

interface LessonSession {
  id: number;
  courseId: number;
  teacherId: string;
  title: string;
  description: string;
  startedAt: string;
  endedAt?: string;
  duration?: number;
  course: Course;
  teacher: User;
}

export default function AdminTeachers() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
  const [isTeacherDetailOpen, setIsTeacherDetailOpen] = useState(false);
  const [newTeacherData, setNewTeacherData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  // Fetch all users
  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all courses
  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all enrollments
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments/all"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Fetch all lesson sessions
  const { data: lessonSessions = [], isLoading: sessionsLoading } = useQuery<LessonSession[]>({
    queryKey: ["/api/sessions/history"],
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Add teacher mutation
  const addTeacherMutation = useMutation({
    mutationFn: async (teacherData: typeof newTeacherData) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...teacherData, role: 'teacher' }),
      });
      
      if (!response.ok) {
        throw new Error('Müəllim əlavə edilərkən xəta baş verdi');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      setNewTeacherData({ firstName: '', lastName: '', email: '', password: '' });
      setIsAddTeacherOpen(false);
      toast({
        title: "Uğurlu",
        description: "Müəllim uğurla əlavə edildi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Xəta",
        description: error.message || "Müəllim əlavə edilərkən xəta baş verdi",
        variant: "destructive",
      });
    },
  });

  // Filter teachers
  const teacherUsers = users.filter((u: User) => u.role === 'teacher');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Giriş İcazəsi Yoxdur</h1>
          <p className="text-gray-600">Bu səhifəyə yalnız adminlər daxil ola bilər.</p>
        </div>
      </div>
    );
  }

  const handleAddTeacher = () => {
    if (!newTeacherData.firstName || !newTeacherData.lastName || !newTeacherData.email || !newTeacherData.password) {
      toast({
        title: "Xəta",
        description: "Bütün sahələri doldurun",
        variant: "destructive",
      });
      return;
    }
    addTeacherMutation.mutate(newTeacherData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={false} 
        onClose={() => {}} 
      />
      
      <div className="flex-1 p-8 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Müəllim İdarəetməsi</h1>
            <p className="text-gray-600 mt-2">Sistemdəki müəllimləri idarə edin və onların fəaliyyətini izləyin</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Müəllimlər</CardTitle>
                <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-900 text-white hover:bg-gray-800">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Müəllim Əlavə Et
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yeni Müəllim Əlavə Et</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Ad</Label>
                          <Input
                            id="firstName"
                            value={newTeacherData.firstName}
                            onChange={(e) => setNewTeacherData({...newTeacherData, firstName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Soyad</Label>
                          <Input
                            id="lastName"
                            value={newTeacherData.lastName}
                            onChange={(e) => setNewTeacherData({...newTeacherData, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newTeacherData.email}
                          onChange={(e) => setNewTeacherData({...newTeacherData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Parol</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newTeacherData.password}
                          onChange={(e) => setNewTeacherData({...newTeacherData, password: e.target.value})}
                        />
                      </div>
                      <Button 
                        onClick={handleAddTeacher} 
                        className="w-full"
                        disabled={addTeacherMutation.isPending}
                      >
                        {addTeacherMutation.isPending ? "Əlavə edilir..." : "Müəllim Əlavə Et"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="text-center py-8">Müəllimlər yüklənir...</div>
              ) : teacherUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Hələlik heç bir müəllim yoxdur
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">MÜƏLLİM</th>
                        <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">KURSLAR</th>
                        <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">TƏLƏBƏLƏR</th>
                        <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">YARADILMA TARİXİ</th>
                        <th className="text-left py-4 px-2 text-sm font-medium text-gray-600">ƏMƏLİYYATLAR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherUsers.map((teacher: User) => {
                        const teacherCourses = courses.filter((c: Course) => c.instructorId === teacher.id);
                        const teacherStudents = enrollments.filter((e: Enrollment) => 
                          teacherCourses.some((c: Course) => c.id === e.courseId)
                        );
                        
                        return (
                          <tr key={teacher.id} className="border-b border-gray-100">
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback className="bg-green-500 text-white">
                                    {teacher.firstName?.charAt(0)}{teacher.lastName?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900">{teacher.firstName} {teacher.lastName}</div>
                                  <div className="text-sm text-gray-500">{teacher.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                                {teacherCourses.length} kurs
                              </Badge>
                            </td>
                            <td className="py-4 px-2">
                              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                                {teacherStudents.length} tələbə
                              </Badge>
                            </td>
                            <td className="py-4 px-2 text-sm text-gray-500">
                              {format(new Date(teacher.createdAt), 'dd MMM yyyy')}
                            </td>
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedTeacher(teacher);
                                    setIsTeacherDetailOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  İdarə Et
                                </Button>
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

          {/* Teacher Detail Dialog */}
          <Dialog open={isTeacherDetailOpen} onOpenChange={setIsTeacherDetailOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Müəllim Təfərrüatları: {selectedTeacher?.firstName} {selectedTeacher?.lastName}
                </DialogTitle>
              </DialogHeader>
              
              {selectedTeacher && (
                <Tabs defaultValue="courses" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="courses">Kurslar</TabsTrigger>
                    <TabsTrigger value="students">Tələbələr</TabsTrigger>
                    <TabsTrigger value="sessions">Dərs Sessiyaları</TabsTrigger>
                  </TabsList>

                  <TabsContent value="courses" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Müəllimin Kursları</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {courses.filter((c: Course) => c.instructorId === selectedTeacher.id).length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            Bu müəllimin hələlik kursu yoxdur
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {courses.filter((c: Course) => c.instructorId === selectedTeacher.id).map((course: Course) => (
                              <div key={course.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                                    <p className="text-sm text-gray-500">{course.description}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant={course.isActive ? "default" : "secondary"}>
                                      {course.isActive ? "Aktiv" : "Qeyri-aktiv"}
                                    </Badge>
                                    <Badge variant="outline">
                                      {enrollments.filter((e: Enrollment) => e.courseId === course.id).length} tələbə
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="students" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Müəllimin Tələbələri</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const teacherCourses = courses.filter((c: Course) => c.instructorId === selectedTeacher.id);
                          const teacherStudents = enrollments.filter((e: Enrollment) => 
                            teacherCourses.some((c: Course) => c.id === e.courseId)
                          );
                          
                          return teacherStudents.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              Bu müəllimin hələlik tələbəsi yoxdur
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {teacherStudents.map((enrollment: Enrollment) => (
                                <div key={enrollment.id} className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <Avatar>
                                        <AvatarFallback className="bg-blue-500 text-white">
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
                                    <div className="text-right">
                                      <div className="text-sm font-medium text-gray-900">
                                        {enrollment.course?.title}
                                      </div>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                          <div 
                                            className="bg-blue-600 h-2 rounded-full" 
                                            style={{ width: `${enrollment.progress || 0}%` }}
                                          />
                                        </div>
                                        <span className="text-sm text-gray-600">{enrollment.progress || 0}%</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sessions" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Müəllimin Dərs Sessiyaları</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const teacherSessions = lessonSessions.filter((s: LessonSession) => s.teacherId === selectedTeacher.id);
                          
                          return teacherSessions.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              Bu müəllimin hələlik dərs sessiyası yoxdur
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {teacherSessions.map((session: LessonSession) => (
                                <div key={session.id} className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h3 className="font-medium text-gray-900">{session.title}</h3>
                                      <p className="text-sm text-gray-500">{session.description}</p>
                                      <p className="text-sm text-gray-400 mt-1">
                                        {format(new Date(session.startedAt), 'dd MMM yyyy HH:mm')}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant={session.endedAt ? "default" : "secondary"}>
                                        {session.endedAt ? "Bitib" : "Davam edir"}
                                      </Badge>
                                      <Badge variant="outline">
                                        {session.duration ? `${session.duration} dəq` : 'Bilinmir'}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}