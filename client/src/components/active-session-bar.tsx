
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, StopCircle } from "lucide-react";

interface ActiveSessionBarProps {
  session: any;
  onEndSession: () => void;
}

export default function ActiveSessionBar({ session, onEndSession }: ActiveSessionBarProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(session.startTime);
      const now = new Date();
      const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60); // minutes
      setDuration(diff);
    }, 60000); // Update every minute

    // Initial calculation
    const start = new Date(session.startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
    setDuration(diff);

    return () => clearInterval(interval);
  }, [session.startTime]);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-green-600 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">Canlı Dərs Davam Edir</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {duration} dəqiqə
            </span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Aktiv Sessiya
          </Badge>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEndSession}
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
        >
          <StopCircle className="w-4 h-4 mr-2" />
          Dərsi Bitir
        </Button>
      </div>
    </div>
  );
}
