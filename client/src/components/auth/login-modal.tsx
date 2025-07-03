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
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl">
        {/* Header with DevCode Branding */}
        <DialogHeader className="space-y-4 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DC</span>
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                DevCode LMS
              </DialogTitle>
              <p className="text-sm text-gray-600">Sistemə daxil olun</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail ünvanı
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-gray-200 focus:border-devcode-orange focus:ring-devcode-orange/20"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Şifrə
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-gray-200 focus:border-devcode-orange focus:ring-devcode-orange/20"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow hover:from-devcode-orange/90 hover:to-devcode-yellow/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Giriş edilir...
                </>
              ) : (
                "Daxil ol"
              )}
            </Button>
          </form>
          
          {/* Demo Accounts Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
              Demo Hesabları
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-600">Admin:</span>
                <span className="text-gray-800">admin@test.com / password123</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-600">Müəllim:</span>
                <span className="text-gray-800">teacher@test.com / password123</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-gray-600">Tələbə:</span>
                <span className="text-gray-800">student@test.com / password123</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Yuxarıdakı hesablardan birini istifadə edərək sistemə daxil ola bilərsiniz
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}