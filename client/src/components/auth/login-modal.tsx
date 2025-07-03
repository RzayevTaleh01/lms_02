import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginMutation } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Xəta",
        description: "Bütün sahələri doldurun",
        variant: "destructive",
      });
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      onClose();
      setEmail("");
      setPassword("");
      toast({
        title: "Uğurla giriş edildi",
        description: "Xoş gəlmisiniz!",
      });
    } catch (error: any) {
      toast({
        title: "Giriş xətası",
        description: error.message || "Giriş zamanı xəta baş verdi",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Sistemə Giriş
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail ünvanınızı daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Şifrə</Label>
            <Input
              id="password"
              type="password"
              placeholder="Şifrənizi daxil edin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-devcode-yellow hover:bg-devcode-yellow/90 text-black font-semibold"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Giriş edilir...
              </>
            ) : (
              "Daxil ol"
            )}
          </Button>
        </form>
        
        <div className="text-center text-sm text-gray-600">
          <p>Demo hesablar:</p>
          <p>Admin: admin@test.com / password123</p>
          <p>Müəllim: teacher@test.com / password123</p>
          <p>Tələbə: student@test.com / password123</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}