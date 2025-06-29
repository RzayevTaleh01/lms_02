import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ open, onOpenChange, onSwitchToLogin }: SignupModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const { toast } = useToast();

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/auth/register', data);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Qeydiyyat uğursuz');
      }

      return response.json();
    },
    onSuccess: (userData) => {
      toast({
        title: "Uğurla qeydiyyat",
        description: "Hesabınız yaradıldı!"
      });
      onOpenChange(false);

      // Redirect to appropriate dashboard based on user role
      switch (userData.role) {
        case 'admin':
          window.location.href = '/admin';
          break;
        case 'teacher':
          window.location.href = '/teacher';
          break;
        case 'student':
          window.location.href = '/student';
          break;
        default:
          window.location.reload();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Xəta",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Xəta",
        description: "Parollar uyğun gəlmir",
        variant: "destructive"
      });
      return;
    }

    registerMutation.mutate({
      firstName,
      lastName,
      email,
      password,
      role
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-devcode-orange rounded transform rotate-45 relative">
              <div className="absolute inset-1 bg-white rounded transform -rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-devcode-dark">DevCode Academy</span>
          </div>
          <DialogTitle className="text-2xl font-bold text-devcode-dark">Qeydiyyat</DialogTitle>
          <p className="text-devcode-gray">Öyrənmə səyahətinizə başlayın</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Ad</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Adınızı daxil edin"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Soyad</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyadınızı daxil edin"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ünvanınızı daxil edin"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Parol</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolunuzu daxil edin"
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Parolu təkrarlayın</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Parolunuzu təkrar daxil edin"
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Rolunuzu seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Tələbə</SelectItem>
                <SelectItem value="teacher">Müəllim</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit"
            className="w-full bg-devcode-orange hover:bg-orange-600"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Qeydiyyat edilir..." : "Qeydiyyat"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-devcode-gray">Artıq hesabınız var? </span>
          <Button 
            variant="link" 
            size="sm" 
            className="text-devcode-orange hover:text-orange-600 p-0"
            onClick={onSwitchToLogin}
          >
            Daxil olun
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}