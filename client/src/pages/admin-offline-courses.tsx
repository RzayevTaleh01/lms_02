import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  DollarSign, 
  Plus,
  Edit2,
  Trash2,
  Eye,
  UserCheck
} from "lucide-react";

interface OfflineCourse {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  imageUrl?: string;
  instructorId: string;
  price: number;
  maxStudents: number;
  currentStudents: number;
  location: string;
  schedule: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  requirements: string;
  syllabus: string;
}

// Mock data for demonstration
const mockOfflineCourses: OfflineCourse[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals - Offline",
    description: "Əsas JavaScript konseptləri və praktiki tətbiqləri",
    shortDescription: "JavaScript əsasları üzrə intensiv 3 aylıq kurs",
    level: "beginner",
    duration: "3 ay",
    instructorId: "teacher_1",
    price: 450,
    maxStudents: 20,
    currentStudents: 15,
    location: "DevCode Academy, Nizami küç. 123",
    schedule: '{"days": ["Bazar ertəsi", "Çərşənbə", "Cümə"], "time": "18:00-20:00"}',
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    isActive: true,
    requirements: "Kompüter bilgisi, əsas internet istifadəsi",
    syllabus: '{"modules": ["HTML/CSS əsasları", "JavaScript sintaksisi", "DOM manipulyasiyası", "Event handling", "Final layihə"]}'
  },
  {
    id: 2,
    title: "React.js Professional - Offline",
    description: "Professional React.js development üçün ətraflı kurs",
    shortDescription: "React.js ilə modern web aplikasiyalar yaratma",
    level: "intermediate",
    duration: "4 ay",
    instructorId: "teacher_2",
    price: 650,
    maxStudents: 15,
    currentStudents: 12,
    location: "DevCode Academy, Nizami küç. 123",
    schedule: '{"days": ["Şənbə", "Bazar"], "time": "10:00-13:00"}',
    startDate: "2025-01-15",
    endDate: "2025-05-15",
    isActive: true,
    requirements: "JavaScript bilgisi, HTML/CSS təcrübəsi",
    syllabus: '{"modules": ["React əsasları", "State Management", "Hooks", "Router", "Redux", "Testing", "Final layihə"]}'
  }
];

export default function AdminOfflineCourses() {
  const [courses, setCourses] = useState<OfflineCourse[]>(mockOfflineCourses);
  const [selectedCourse, setSelectedCourse] = useState<OfflineCourse | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newCourse, setNewCourse] = useState<Partial<OfflineCourse>>({
    title: "",
    description: "",
    shortDescription: "",
    level: "beginner",
    duration: "",
    price: 0,
    maxStudents: 20,
    location: "",
    schedule: "",
    startDate: "",
    endDate: "",
    requirements: "",
    syllabus: ""
  });

  const handleCreateCourse = () => {
    const course: OfflineCourse = {
      id: Date.now(),
      ...newCourse as OfflineCourse,
      instructorId: "admin_temp",
      currentStudents: 0,
      isActive: true
    };
    setCourses([...courses, course]);
    setIsCreateDialogOpen(false);
    setNewCourse({
      title: "",
      description: "",
      shortDescription: "",
      level: "beginner",
      duration: "",
      price: 0,
      maxStudents: 20,
      location: "",
      schedule: "",
      startDate: "",
      endDate: "",
      requirements: "",
      syllabus: ""
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const parseSchedule = (schedule: string) => {
    try {
      const parsed = JSON.parse(schedule);
      return `${parsed.days.join(", ")} - ${parsed.time}`;
    } catch {
      return schedule;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offline Kurslar</h1>
          <p className="text-gray-600">Fiziki sinifdə keçirilən kursları idarə edin</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Offline Kurs
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Offline Kurs Yarat</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Kurs Adı</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="Məs: React.js Professional"
                  />
                </div>
                
                <div>
                  <Label htmlFor="shortDescription">Qısa Təsvir</Label>
                  <Input
                    id="shortDescription"
                    value={newCourse.shortDescription}
                    onChange={(e) => setNewCourse({...newCourse, shortDescription: e.target.value})}
                    placeholder="Qısa təsvir yazın..."
                  />
                </div>

                <div>
                  <Label htmlFor="level">Səviyyə</Label>
                  <Select value={newCourse.level} onValueChange={(value: any) => setNewCourse({...newCourse, level: value})}>
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
                  <Label htmlFor="duration">Müddət</Label>
                  <Input
                    id="duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                    placeholder="Məs: 3 ay"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Qiymət</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: Number(e.target.value)})}
                    placeholder="450"
                  />
                </div>

                <div>
                  <Label htmlFor="maxStudents">Maksimum Tələbə Sayı</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={newCourse.maxStudents}
                    onChange={(e) => setNewCourse({...newCourse, maxStudents: Number(e.target.value)})}
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Yer</Label>
                  <Input
                    id="location"
                    value={newCourse.location}
                    onChange={(e) => setNewCourse({...newCourse, location: e.target.value})}
                    placeholder="DevCode Academy, Nizami küç. 123"
                  />
                </div>

                <div>
                  <Label htmlFor="schedule">Cədvəl</Label>
                  <Input
                    id="schedule"
                    value={newCourse.schedule}
                    onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                    placeholder='{"days": ["Bazar ertəsi", "Çərşənbə"], "time": "18:00-20:00"}'
                  />
                </div>

                <div>
                  <Label htmlFor="startDate">Başlama Tarixi</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCourse.startDate}
                    onChange={(e) => setNewCourse({...newCourse, startDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">Bitmə Tarixi</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newCourse.endDate}
                    onChange={(e) => setNewCourse({...newCourse, endDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Tələblər</Label>
                  <Textarea
                    id="requirements"
                    value={newCourse.requirements}
                    onChange={(e) => setNewCourse({...newCourse, requirements: e.target.value})}
                    placeholder="Kurs üçün lazım olan ön şərtlər..."
                  />
                </div>
              </div>

              <div className="col-span-2 space-y-4">
                <div>
                  <Label htmlFor="description">Ətraflı Təsvir</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    placeholder="Kursun ətraflı təsviri..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="syllabus">Kurrikulum (JSON format)</Label>
                  <Textarea
                    id="syllabus"
                    value={newCourse.syllabus}
                    onChange={(e) => setNewCourse({...newCourse, syllabus: e.target.value})}
                    placeholder='{"modules": ["Modul 1", "Modul 2", "Modul 3"]}'
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Ləğv et
                  </Button>
                  <Button onClick={handleCreateCourse} className="bg-orange-500 hover:bg-orange-600">
                    Kurs Yarat
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ümumi Kurslar</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aktiv Tələbələr</p>
                <p className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.currentStudents, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aktiv Kurslar</p>
                <p className="text-2xl font-bold">{courses.filter(c => c.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Orta Qiymət</p>
                <p className="text-2xl font-bold">{Math.round(courses.reduce((sum, course) => sum + course.price, 0) / courses.length)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.shortDescription}</p>
                </div>
                <Badge className={getLevelColor(course.level)}>
                  {course.level === "beginner" ? "Başlanğıc" : 
                   course.level === "intermediate" ? "Orta" : "İrəli"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{course.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{course.currentStudents}/{course.maxStudents}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 truncate">Ofis</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {new Date(course.startDate).toLocaleDateString('az-AZ')} - {new Date(course.endDate).toLocaleDateString('az-AZ')}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Cədvəl:</strong> {parseSchedule(course.schedule)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Dialog open={isViewDialogOpen && selectedCourse?.id === course.id} onOpenChange={(open) => {
                  setIsViewDialogOpen(open);
                  if (!open) setSelectedCourse(null);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Bax
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{selectedCourse?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedCourse && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Təsvir</h4>
                          <p className="text-gray-600">{selectedCourse.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Yer</h4>
                          <p className="text-gray-600">{selectedCourse.location}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Tələblər</h4>
                          <p className="text-gray-600">{selectedCourse.requirements}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Kurrikulum</h4>
                          <pre className="text-sm bg-gray-100 p-3 rounded">
                            {JSON.stringify(JSON.parse(selectedCourse.syllabus || "{}"), null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-1" />
                  Redaktə
                </Button>

                <Button variant="outline" size="sm">
                  <UserCheck className="w-4 h-4 mr-1" />
                  Tələbələr
                </Button>

                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Doluluk</span>
                  <span className="text-gray-600">
                    {Math.round((course.currentStudents / course.maxStudents) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.currentStudents / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}