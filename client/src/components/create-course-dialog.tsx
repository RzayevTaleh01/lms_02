import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CourseForm {
  title: string;
  description: string;
  level: string;
  duration: string;
}

export default function CreateCourseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<CourseForm>({
    title: "",
    description: "",
    level: "",
    duration: "",
  });

  const createCourseMutation = useMutation({
    mutationFn: async (courseData: CourseForm) => {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...courseData, price: 0 }),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Uğur!",
        description: "Kurs uğurla yaradıldı.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setIsOpen(false);
      setForm({
        title: "",
        description: "",
        level: "",
        duration: "",
      });
      // Redirect to the new course management page
      window.location.href = `/teacher/courses/${data.id}`;
    },
    onError: (error) => {
      toast({
        title: "Xəta",
        description: "Kurs yaradılarkən xəta baş verdi.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.level) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa bütün məcburi sahələri doldurun.",
        variant: "destructive",
      });
      return;
    }

    createCourseMutation.mutate(form);
  };

  const updateForm = (field: keyof CourseForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-devcode-orange text-white hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Kurs
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Yeni Kurs Yarat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title">Kurs Adı *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Məsələn: JavaScript Əsasları"
              />
            </div>

            <div>
              <Label htmlFor="description">Təsvir *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Kurs haqqında qısa məlumat..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="level">Səviyyə *</Label>
              <Select value={form.level} onValueChange={(value) => updateForm("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Səviyyə seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Başlanğıc</SelectItem>
                  <SelectItem value="intermediate">Orta</SelectItem>
                  <SelectItem value="advanced">İrəliləmiş</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration">Müddət</Label>
              <Input
                id="duration"
                value={form.duration}
                onChange={(e) => updateForm("duration", e.target.value)}
                placeholder="Məsələn: 8 həftə, 40 saat"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={createCourseMutation.isPending}
            >
              Ləğv et
            </Button>
            <Button
              type="submit"
              disabled={createCourseMutation.isPending}
              className="bg-devcode-orange hover:bg-orange-600"
            >
              {createCourseMutation.isPending ? "Yaradılır..." : "Kursu Yarat"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}