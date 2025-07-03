import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Helper function to get dashboard route based on user role
  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'teacher':
        return '/teacher';
      case 'student':
        return '/student';
      default:
        return '/';
    }
  };

  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ['/api/auth/user'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/auth/user');
        return await response.json();
      } catch (error: any) {
        if (error.message?.includes('401')) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return await response.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/auth/user'], userData);
      toast({
        title: "Uğurla giriş edildi",
        description: "Xoş gəlmisiniz!",
      });
      // Automatically redirect to dashboard based on user role
      if (userData?.role) {
        const dashboardRoute = getDashboardRoute(userData.role);
        setLocation(dashboardRoute);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Giriş xətası",
        description: error.message || "Giriş zamanı xəta baş verdi",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      return await response.json();
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(['/api/auth/user'], userData);
      toast({
        title: "Qeydiyyat tamamlandı",
        description: "Hesabınız uğurla yaradıldı!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Qeydiyyat xətası",
        description: error.message || "Qeydiyyat zamanı xəta baş verdi",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/auth/logout');
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/auth/user'], null);
      queryClient.clear();
      toast({
        title: "Çıxış edildi",
        description: "Uğurla çıxış edildi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Çıxış xətası",
        description: error.message || "Çıxış zamanı xəta baş verdi",
        variant: "destructive",
      });
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}
