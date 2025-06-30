
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import CreateCourseDialog from "@/components/create-course-dialog";
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, Clock, Edit, Trash2, Save, X } from "lucide-react";

export default function TeacherCourses() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
  });

  // Fetch courses for this teacher
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
  });

  // Delete course mutation
  const deleteMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      toast({
        title: "Success",
        description: "Kurs uğurla silindi",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Kurs silinərkən xəta baş verdi",
        variant: "destructive",
      });
    },
  });

  // Update course mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; courseData: any }) => {
      const response = await fetch(`/api/courses/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.courseData),
      });
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setEditingCourse(null);
      toast({
        title: "Success",
        description: "Kurs uğurla yeniləndi",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Kurs yenilənərkən xəta baş verdi",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-devcode-dark mb-4">Access Denied</h1>
          <p className="text-devcode-gray">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setEditForm({
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
    });
  };

  const handleSaveEdit = () => {
    updateMutation.mutate({
      id: editingCourse.id,
      courseData: { ...editForm, price: 0 },
    });
  };

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm('Bu kursu silmək istədiyinizə əminsiniz?')) {
      deleteMutation.mutate(courseId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <GlobalActiveSession />
      <Sidebar userRole="teacher" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 pt-16">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-devcode-dark">Mənim Kurslarım</h1>
            <p className="text-devcode-gray">
              Bütün kurslarınızı burada idarə edin və yenilərini yaradın.
            </p>
          </div>
          <CreateCourseDialog />
        </div>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Kurslar Siyahısı
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!Array.isArray(courses) || courses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-devcode-gray opacity-50" />
                <h3 className="text-lg font-semibold text-devcode-dark mb-2">Hələ kurs yaratmamısınız</h3>
                <p className="text-devcode-gray mb-6">İlk kursunuzu yaratmaq üçün yuxarıdakı "Yeni Kurs" düyməsini basın.</p>
                <CreateCourseDialog />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kurs Adı</TableHead>
                    <TableHead>Səviyyə</TableHead>
                    <TableHead>Müddət</TableHead>
                    <TableHead>Tələbələr</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course: any) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-devcode-orange text-white text-sm font-semibold">
                            {course.title.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-devcode-gray truncate max-w-xs">
                              {course.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {course.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-devcode-gray" />
                          {course.duration || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-devcode-gray" />
                          {course.enrollmentCount || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.isActive ? "default" : "secondary"}>
                          {course.isActive ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = `/teacher/courses/${course.id}`}
                            className="text-devcode-orange border-devcode-orange hover:bg-orange-50"
                          >
                            İdarə Et
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditCourse(course)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                              <DialogHeader>
                                <DialogTitle>Kursu Redaktə Et</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-title">Kurs Adı</Label>
                                  <Input
                                    id="edit-title"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-description">Təsvir</Label>
                                  <Textarea
                                    id="edit-description"
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-level">Səviyyə</Label>
                                  <Select value={editForm.level} onValueChange={(value) => setEditForm({...editForm, level: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="beginner">Başlanğıc</SelectItem>
                                      <SelectItem value="intermediate">Orta</SelectItem>
                                      <SelectItem value="advanced">İrəliləmiş</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-duration">Müddət</Label>
                                  <Input
                                    id="edit-duration"
                                    value={editForm.duration}
                                    onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setEditingCourse(null)}>
                                    <X className="w-4 h-4 mr-2" />
                                    Ləğv Et
                                  </Button>
                                  <Button onClick={handleSaveEdit} disabled={updateMutation.isPending}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Yadda Saxla
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
