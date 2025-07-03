import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import SessionHistory from "@/pages/session-history";
import GlobalActiveSession from "@/components/global-active-session";
import { Menu } from "lucide-react";

export default function SessionHistoryPage() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Giriş rədd edildi</h1>
          <p className="text-gray-600">Bu səhifəyə giriş icazəniz yoxdur.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <GlobalActiveSession />
      <TeacherSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden mr-3"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Dərs Tarixçəsi</h1>
                  <p className="text-sm text-gray-600">Keçmiş dərs sessiyalarını görün</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SessionHistory />
        </div>
      </div>
    </div>
  );
}