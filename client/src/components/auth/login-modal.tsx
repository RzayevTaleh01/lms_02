import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ open, onOpenChange, onSwitchToSignup }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Giriş uğursuz');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Uğurlu giriş",
        description: "Xoş gəlmisiniz!"
      });
      onOpenChange(false);
      window.location.reload();
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
    loginMutation.mutate({ email, password });
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
          <DialogTitle className="text-2xl font-bold text-devcode-dark">Xoş gəlmisiniz</DialogTitle>
          <p className="text-devcode-gray">Öyrənmə səyahətinizə davam edin</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>
            <Button variant="link" size="sm" className="text-devcode-orange hover:text-orange-600 p-0">
              Forgot password?
            </Button>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-devcode-orange hover:bg-orange-600"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Giriş edilir..." : "Daxil ol"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <span className="text-devcode-gray">Hesabınız yoxdur? </span>
          <Button 
            variant="link" 
            size="sm" 
            className="text-devcode-orange hover:text-orange-600 p-0"
            onClick={onSwitchToSignup}
          >
            Qeydiyyat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
