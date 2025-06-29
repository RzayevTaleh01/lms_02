import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, BookOpen, Video, Users, Calendar, CheckSquare, FileText, Play, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const courseSchema = z.object({
  title: z.string().min(1, "Kurs adı tələb olunur"),
  description: z.string().min(1, "Təsvir tələb olunur"),
  shortDescription: z.string().min(1, "Qısa təsvir tələb olunur"),
  category: z.string().min(1, "Kateqoriya tələb olunur"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  price: z.string().min(1, "Qiymət tələb olunur"),
  duration: z.string().min(1, "Müddət tələb olunur"),
  imageUrl: z.string().optional(),
});

const lessonSchema = z.object({
  title: z.string().min(1, "Dərs adı tələb olunur"),
  description: z.string().min(1, "Təsvir tələb olunur"),
  videoUrl: z.string().url("Düzgün video link daxil edin"),
  duration: z.number().min(1, "Müddət tələb olunur"),
  orderIndex: z.number().min(0, "Sıra nömrəsi tələb olunur"),
});

const assignmentSchema = z.object({
  title: z.string().min(1, "Tapşırıq adı tələb olunur"),
  description: z.string().min(1, "Təsvir tələb olunur"),
  dueDate: z.string().min(1, "Son tarix tələb olunur"),
  maxPoints: z.number().min(1, "Maksimum bal tələb olunur"),
});

interface Course {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: string;
  price: string;
  duration: string;
  imageUrl?: string;
  enrollmentCount: number;
  rating: string;
}

interface Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
  isActive: boolean;
}

interface Assignment {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  isActive: boolean;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface CourseManagementProps {
  teacherId: string;
}

export default function CourseManagement({ teacherId }: CourseManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch teacher's courses
  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['/api/courses', 'instructor', teacherId],
    queryFn: async () => {
      const response = await fetch(`/api/courses?instructorId=${teacherId}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
  });

  // Fetch lessons for selected course
  const { data: lessons = [] } = useQuery({
    queryKey: ['/api/courses', selectedCourse?.id, 'lessons'],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${selectedCourse?.id}/lessons`);
      if (!response.ok) throw new Error('Failed to fetch lessons');
      return response.json();
    },
    enabled: !!selectedCourse,
  });

  // Fetch assignments for selected course
  const { data: assignments = [] } = useQuery({
    queryKey: ['/api/courses', selectedCourse?.id, 'assignments'],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${selectedCourse?.id}/assignments`);
      if (!response.ok) throw new Error('Failed to fetch assignments');
      return response.json();
    },
    enabled: !!selectedCourse,
  });

  // Fetch students for selected course
  const { data: students = [] } = useQuery({
    queryKey: ['/api/courses', selectedCourse?.id, 'students'],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${selectedCourse?.id}/students`);
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    },
    enabled: !!selectedCourse,
  });

  // Create course mutation
  const createCourseMutation = useMutation({
    mutationFn: async (data: z.infer<typeof courseSchema>) => {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, instructorId: teacherId }),
      });
      if (!response.ok) throw new Error('Failed to create course');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/courses'] });
      setShowCreateCourse(false);
      toast({ title: "Kurs uğurla yaradıldı" });
    },
    onError: () => {
      toast({ title: "Xəta baş verdi", variant: "destructive" });
    },
  });

  // Create lesson mutation
  const createLessonMutation = useMutation({
    mutationFn: async (data: z.infer<typeof lessonSchema>) => {
      const response = await fetch(`/api/courses/${selectedCourse?.id}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, courseId: selectedCourse?.id }),
      });
      if (!response.ok) throw new Error('Failed to create lesson');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/courses', selectedCourse?.id, 'lessons'] });
      setShowAddLesson(false);
      toast({ title: "Dərs uğurla əlavə edildi" });
    },
    onError: () => {
      toast({ title: "Xəta baş verdi", variant: "destructive" });
    },
  });

  // Create assignment mutation
  const createAssignmentMutation = useMutation({
    mutationFn: async (data: z.infer<typeof assignmentSchema>) => {
      const response = await fetch(`/api/courses/${selectedCourse?.id}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, courseId: selectedCourse?.id }),
      });
      if (!response.ok) throw new Error('Failed to create assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/courses', selectedCourse?.id, 'assignments'] });
      setShowAddAssignment(false);
      toast({ title: "Tapşırıq uğurla əlavə edildi" });
    },
    onError: () => {
      toast({ title: "Xəta baş verdi", variant: "destructive" });
    },
  });

  // Record attendance mutation
  const recordAttendanceMutation = useMutation({
    mutationFn: async (data: { studentId: string; status: 'present' | 'absent' }) => {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse?.id,
          studentId: data.studentId,
          status: data.status,
        }),
      });
      if (!response.ok) throw new Error('Failed to record attendance');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Davamiyyət qeyd edildi" });
    },
  });

  const courseForm = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      shortDescription: "",
      category: "",
      level: "beginner",
      price: "",
      duration: "",
      imageUrl: "",
    },
  });

  const lessonForm = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      duration: 0,
      orderIndex: lessons.length,
    },
  });

  const assignmentForm = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      maxPoints: 100,
    },
  });

  const onCreateCourse = (data: z.infer<typeof courseSchema>) => {
    createCourseMutation.mutate(data);
  };

  const onCreateLesson = (data: z.infer<typeof lessonSchema>) => {
    createLessonMutation.mutate(data);
  };

  const onCreateAssignment = (data: z.infer<typeof assignmentSchema>) => {
    createAssignmentMutation.mutate(data);
  };

  const handleAttendance = (studentId: string, status: 'present' | 'absent') => {
    recordAttendanceMutation.mutate({ studentId, status });
  };

  if (coursesLoading) {
    return <div className="flex items-center justify-center h-64">Yüklənir...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kurs İdarəetməsi</h2>
        <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Kurs
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Kurs Yarat</DialogTitle>
            </DialogHeader>
            <Form {...courseForm}>
              <form onSubmit={courseForm.handleSubmit(onCreateCourse)} className="space-y-4">
                <FormField
                  control={courseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kurs Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Frontend Proqramlaşdırma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={courseForm.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qısa Təsvir</FormLabel>
                      <FormControl>
                        <Input placeholder="HTML, CSS və JavaScript öyrənin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={courseForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ətraflı Təsvir</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Bu kursda nələr öyrənəcəksiniz..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={courseForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kateqoriya</FormLabel>
                        <FormControl>
                          <Input placeholder="Proqramlaşdırma" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={courseForm.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Səviyyə</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Səviyyə seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Başlanğıc</SelectItem>
                            <SelectItem value="intermediate">Orta</SelectItem>
                            <SelectItem value="advanced">İrəli</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={courseForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qiymət (AZN)</FormLabel>
                        <FormControl>
                          <Input placeholder="199" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={courseForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Müddət</FormLabel>
                        <FormControl>
                          <Input placeholder="8 həftə" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={courseForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şəkil URL (ixtiyari)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateCourse(false)}>
                    Ləğv et
                  </Button>
                  <Button type="submit" disabled={createCourseMutation.isPending}>
                    {createCourseMutation.isPending ? "Yaradılır..." : "Kurs Yarat"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: Course) => (
          <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedCourse(course)}>
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <p className="text-sm text-gray-600">{course.shortDescription}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{course.level}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {course.enrollmentCount} tələbə
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCourse && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedCourse.title}</CardTitle>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAttendance(!showAttendance)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Dərsi Başlat
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lessons" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="lessons">Dərslər</TabsTrigger>
                <TabsTrigger value="assignments">Tapşırıqlar</TabsTrigger>
                <TabsTrigger value="students">Tələbələr</TabsTrigger>
                <TabsTrigger value="attendance">Davamiyyət</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Dərslər</h3>
                  <Dialog open={showAddLesson} onOpenChange={setShowAddLesson}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        Dərs Əlavə Et
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yeni Dərs Əlavə Et</DialogTitle>
                      </DialogHeader>
                      <Form {...lessonForm}>
                        <form onSubmit={lessonForm.handleSubmit(onCreateLesson)} className="space-y-4">
                          <FormField
                            control={lessonForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dərs Adı</FormLabel>
                                <FormControl>
                                  <Input placeholder="HTML Əsasları" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={lessonForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Təsvir</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Bu dərsdə HTML-in əsaslarını öyrənəcəksiniz..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={lessonForm.control}
                            name="videoUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Video URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={lessonForm.control}
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Müddət (dəqiqə)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="45" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={lessonForm.control}
                              name="orderIndex"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sıra</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddLesson(false)}>
                              Ləğv et
                            </Button>
                            <Button type="submit" disabled={createLessonMutation.isPending}>
                              {createLessonMutation.isPending ? "Əlavə edilir..." : "Dərs Əlavə Et"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-3">
                  {Array.isArray(lessons) && lessons.map((lesson: Lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Play className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-gray-500">{lesson.duration} dəqiqə</p>
                        </div>
                      </div>
                      <Badge variant="outline">Dərs {lesson.orderIndex + 1}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Tapşırıqlar</h3>
                  <Dialog open={showAddAssignment} onOpenChange={setShowAddAssignment}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Tapşırıq Əlavə Et
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yeni Tapşırıq Əlavə Et</DialogTitle>
                      </DialogHeader>
                      <Form {...assignmentForm}>
                        <form onSubmit={assignmentForm.handleSubmit(onCreateAssignment)} className="space-y-4">
                          <FormField
                            control={assignmentForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tapşırıq Adı</FormLabel>
                                <FormControl>
                                  <Input placeholder="Portfolio saytı yaradın" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={assignmentForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Təsvir</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="HTML və CSS istifadə edərək portfolio saytı yaradın..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={assignmentForm.control}
                              name="dueDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Son Tarix</FormLabel>
                                  <FormControl>
                                    <Input type="datetime-local" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={assignmentForm.control}
                              name="maxPoints"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Maksimum Bal</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="100" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddAssignment(false)}>
                              Ləğv et
                            </Button>
                            <Button type="submit" disabled={createAssignmentMutation.isPending}>
                              {createAssignmentMutation.isPending ? "Əlavə edilir..." : "Tapşırıq Əlavə Et"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-3">
                  {assignments.map((assignment: Assignment) => (
                    <div key={assignment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-gray-500">Son tarix: {new Date(assignment.dueDate).toLocaleDateString('az-AZ')}</p>
                        </div>
                        <Badge variant="secondary">{assignment.maxPoints} bal</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-4">
                <h3 className="text-lg font-semibold">Qeydiyyatdan Keçmiş Tələbələr</h3>
                <div className="space-y-3">
                  {students.map((student: Student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">{student.firstName} {student.lastName}</h4>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Tələbə</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                <h3 className="text-lg font-semibold">Davamiyyət Qeydiyyatı</h3>
                {showAttendance && (
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Dərs başladıldı. Tələbələrin davamiyyətini qeyd edin.
                      </p>
                    </div>
                    {students.map((student: Student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <UserCheck className="h-5 w-5 text-green-500" />
                          <div>
                            <h4 className="font-medium">{student.firstName} {student.lastName}</h4>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-50 hover:bg-green-100 text-green-700"
                            onClick={() => handleAttendance(student.id, 'present')}
                          >
                            İE (İştirak Edir)
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-red-50 hover:bg-red-100 text-red-700"
                            onClick={() => handleAttendance(student.id, 'absent')}
                          >
                            QB (Qiyab)
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!showAttendance && (
                  <div className="text-center p-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Davamiyyət qeydiyyatına başlamaq üçün "Dərsi Başlat" düyməsini basın.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}