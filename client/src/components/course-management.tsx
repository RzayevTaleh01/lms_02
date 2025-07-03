
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Users, FileText, Calendar, CheckSquare, Upload } from "lucide-react";

export default function CourseManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Course Creation State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    level: "beginner",
    price: "",
    duration: "",
    imageUrl: ""
  });

  // Lesson Management State
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    orderIndex: 1
  });

  // Assignment Management State
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100
  });

  // Attendance State
  const [isAttendanceActive, setIsAttendanceActive] = useState(false);
  const [attendanceStudents, setAttendanceStudents] = useState<any[]>([]);

  // Fetch courses
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  // Fetch lessons for selected course
  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${selectedCourse?.id}/lessons`],
    enabled: !!selectedCourse?.id,
  });

  // Fetch assignments for selected course
  const { data: assignments = [] } = useQuery({
    queryKey: [`/api/courses/${selectedCourse?.id}/assignments`],
    enabled: !!selectedCourse?.id,
  });

  // Fetch students for selected course
  const { data: students = [] } = useQuery({
    queryKey: [`/api/courses/${selectedCourse?.id}/students`],
    enabled: !!selectedCourse?.id,
  });

  // Create course mutation
  const createCourseMutation = useMutation({
    mutationFn: async (courseData: any) => {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) throw new Error("Failed to create course");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setIsCreateDialogOpen(false);
      setCourseForm({
        title: "",
        description: "",
        shortDescription: "",
        category: "",
        level: "beginner",
        price: "",
        duration: "",
        imageUrl: ""
      });
      toast({ title: "Kurs uğurla yaradıldı!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Kurs yaradılarkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Create lesson mutation
  const createLessonMutation = useMutation({
    mutationFn: async (lessonData: any) => {
      const response = await fetch(`/api/courses/${selectedCourse.id}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });
      if (!response.ok) throw new Error("Failed to create lesson");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${selectedCourse?.id}/lessons`] });
      setIsLessonDialogOpen(false);
      setLessonForm({
        title: "",
        description: "",
        videoUrl: "",
        duration: "",
        orderIndex: 1
      });
      toast({ title: "Dərs uğurla əlavə edildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Dərs əlavə edilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  // Create assignment mutation
  const createAssignmentMutation = useMutation({
    mutationFn: async (assignmentData: any) => {
      const response = await fetch(`/api/courses/${selectedCourse.id}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentData),
      });
      if (!response.ok) throw new Error("Failed to create assignment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${selectedCourse?.id}/assignments`] });
      setIsAssignmentDialogOpen(false);
      setAssignmentForm({
        title: "",
        description: "",
        dueDate: "",
        maxPoints: 100
      });
      toast({ title: "Tapşırıq uğurla əlavə edildi!" });
    },
    onError: () => {
      toast({ title: "Xəta", description: "Tapşırıq əlavə edilərkən xəta baş verdi", variant: "destructive" });
    }
  });

  const handleCreateCourse = () => {
    const courseData = {
      ...courseForm,
      price: parseFloat(courseForm.price) || 0,
    };
    createCourseMutation.mutate(courseData);
  };

  const handleCreateLesson = () => {
    const lessonData = {
      ...lessonForm,
      duration: parseInt(lessonForm.duration) || 0,
      orderIndex: lessons.length + 1
    };
    createLessonMutation.mutate(lessonData);
  };

  const handleCreateAssignment = () => {
    const assignmentData = {
      ...assignmentForm,
      dueDate: assignmentForm.dueDate ? new Date(assignmentForm.dueDate).toISOString() : null,
      maxPoints: parseInt(assignmentForm.maxPoints.toString()) || 100
    };
    createAssignmentMutation.mutate(assignmentData);
  };

  const handleStartAttendance = () => {
    setIsAttendanceActive(true);
    setAttendanceStudents(students.map((student: any) => ({ ...student, present: false })));
    toast({ title: "Davamiyyət başladıldı!" });
  };

  const toggleStudentAttendance = (studentId: string) => {
    setAttendanceStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  if (isLoading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-devcode-orange mx-auto"></div>;
  }

  return (
    <div className="space-y-6">
      {/* Course Creation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Kurs İdarəçiliyi</CardTitle>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-devcode-orange hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Kurs
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Yeni Kurs Yarat</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Kurs Adı</Label>
                    <Input
                      id="title"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Məs: Frontend Proqramlaşdırma"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Kateqoriya</Label>
                    <Input
                      id="category"
                      value={courseForm.category}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Məs: Web Development"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shortDescription">Qısa Təsvir</Label>
                  <Input
                    id="shortDescription"
                    value={courseForm.shortDescription}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                    placeholder="Kursun qısa təsviri"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Ətraflı Təsvir</Label>
                  <Textarea
                    id="description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Kursun ətraflı təsviri"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="level">Səviyyə</Label>
                    <Select value={courseForm.level} onValueChange={(value) => setCourseForm(prev => ({ ...prev, level: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Başlanğıc</SelectItem>
                        <SelectItem value="intermediate">Orta</SelectItem>
                        <SelectItem value="advanced">İrəli</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Qiymət</Label>
                    <Input
                      id="price"
                      type="number"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Müddət</Label>
                    <Input
                      id="duration"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="8 həftə"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="imageUrl">Şəkil URL</Label>
                  <Input
                    id="imageUrl"
                    value={courseForm.imageUrl}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <Button onClick={handleCreateCourse} disabled={createCourseMutation.isPending}>
                  {createCourseMutation.isPending ? "Yaradılır..." : "Kursu Yarat"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {courses.length === 0 ? (
              <p className="text-center text-devcode-gray py-8">Hələ kurs yaratmamısınız. İlk kursunuzu yaradın!</p>
            ) : (
              courses.map((course: any) => (
                <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedCourse(course)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-devcode-dark">{course.title}</h3>
                        <p className="text-sm text-devcode-gray">{course.shortDescription}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{course.level}</Badge>
                          <span className="text-sm text-devcode-gray">{course.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-devcode-orange">{course.price}</div>
                        <div className="text-sm text-devcode-gray">{course.enrollmentCount || 0} tələbə</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Course Details */}
      {selectedCourse && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedCourse.title} - İdarəçilik</CardTitle>
              <Button 
                onClick={handleStartAttendance}
                className="bg-green-600 hover:bg-green-700"
                disabled={isAttendanceActive}
              >
                <Play className="w-4 h-4 mr-2" />
                {isAttendanceActive ? "Dərs Davam Edir" : "Dərsi Başlat"}
              </Button>
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
                  <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Dərs Əlavə Et
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
                        <Button onClick={handleCreateLesson} disabled={createLessonMutation.isPending}>
                          {createLessonMutation.isPending ? "Əlavə edilir..." : "Dərsi Əlavə Et"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-2">
                  {lessons.length === 0 ? (
                    <p className="text-center text-devcode-gray py-4">Bu kursda hələ dərs yoxdur.</p>
                  ) : (
                    lessons.map((lesson: any, index: number) => (
                      <Card key={lesson.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-devcode-orange rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-devcode-dark">{lesson.title}</h4>
                              <p className="text-sm text-devcode-gray">{lesson.description}</p>
                              {lesson.videoUrl && (
                                <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="text-devcode-orange text-sm hover:underline">
                                  Videoya bax
                                </a>
                              )}
                            </div>
                            <div className="text-sm text-devcode-gray">
                              {lesson.duration} dəq
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Tapşırıqlar</h3>
                  <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Tapşırıq Əlavə Et
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yeni Tapşırıq Əlavə Et</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="assignmentTitle">Tapşırıq Adı</Label>
                          <Input
                            id="assignmentTitle"
                            value={assignmentForm.title}
                            onChange={(e) => setAssignmentForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Məs: Portfolio Saytı Yaradın"
                          />
                        </div>
                        <div>
                          <Label htmlFor="assignmentDescription">Təsvir</Label>
                          <Textarea
                            id="assignmentDescription"
                            value={assignmentForm.description}
                            onChange={(e) => setAssignmentForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Tapşırığın ətraflı təsviri"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="dueDate">Son Tarix</Label>
                            <Input
                              id="dueDate"
                              type="datetime-local"
                              value={assignmentForm.dueDate}
                              onChange={(e) => setAssignmentForm(prev => ({ ...prev, dueDate: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="maxPoints">Maksimum Bal</Label>
                            <Input
                              id="maxPoints"
                              type="number"
                              value={assignmentForm.maxPoints}
                              onChange={(e) => setAssignmentForm(prev => ({ ...prev, maxPoints: parseInt(e.target.value) || 100 }))}
                              placeholder="100"
                            />
                          </div>
                        </div>
                        <Button onClick={handleCreateAssignment} disabled={createAssignmentMutation.isPending}>
                          {createAssignmentMutation.isPending ? "Əlavə edilir..." : "Tapşırığı Əlavə Et"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-2">
                  {assignments.length === 0 ? (
                    <p className="text-center text-devcode-gray py-4">Bu kursda hələ tapşırıq yoxdur.</p>
                  ) : (
                    assignments.map((assignment: any) => (
                      <Card key={assignment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-devcode-dark">{assignment.title}</h4>
                              <p className="text-sm text-devcode-gray">{assignment.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-devcode-gray flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString('az-AZ') : 'Son tarix yoxdur'}
                                </span>
                                <span className="text-sm text-devcode-gray flex items-center">
                                  <CheckSquare className="w-4 h-4 mr-1" />
                                  {assignment.maxPoints} bal
                                </span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              İşlərə Bax
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-4">
                <h3 className="text-lg font-semibold">Kursa Yazılan Tələbələr</h3>
                <div className="space-y-2">
                  {students.length === 0 ? (
                    <p className="text-center text-devcode-gray py-4">Bu kursa hələ heç kim yazılmayıb.</p>
                  ) : (
                    students.map((student: any) => (
                      <Card key={student.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-devcode-orange rounded-full flex items-center justify-center text-white font-semibold">
                                {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium text-devcode-dark">{student.firstName} {student.lastName}</h4>
                                <p className="text-sm text-devcode-gray">{student.email}</p>
                              </div>
                            </div>
                            <div className="text-sm text-devcode-gray">
                              Progress: {student.progress || 0}%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Davamiyyət</h3>
                  {isAttendanceActive && (
                    <Badge variant="default" className="bg-green-600">
                      Dərs Aktiv
                    </Badge>
                  )}
                </div>
                {!isAttendanceActive ? (
                  <div className="text-center py-8">
                    <p className="text-devcode-gray mb-4">Davamiyyət üçün əvvəlcə dərsi başladın.</p>
                    <Button onClick={handleStartAttendance} className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Dərsi Başlat
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {attendanceStudents.map((student: any) => (
                      <Card key={student.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-devcode-orange rounded-full flex items-center justify-center text-white font-semibold">
                                {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium text-devcode-dark">{student.firstName} {student.lastName}</h4>
                                <p className="text-sm text-devcode-gray">{student.email}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant={student.present ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleStudentAttendance(student.id)}
                                className={student.present ? "bg-green-600 hover:bg-green-700" : ""}
                              >
                                {student.present ? "İştirak Edir" : "Qeyd Et"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
