import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Square } from "lucide-react";

interface ActiveSessionBarProps {
  session: any;
  onEndSession: () => void;
}

export default function ActiveSessionBar({ session, onEndSession }: ActiveSessionBarProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const startTime = new Date(session.startTime);
    const updateDuration = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 60000);
      setDuration(diff);
    };

    // Update immediately
    updateDuration();

    // Then update every minute
    const interval = setInterval(updateDuration, 60000);

    return () => clearInterval(interval);
  }, [session.startTime]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-green-600 text-white px-6 py-3 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-semibold">Dərs Aktivdir</span>
          </div>
          <span className="text-green-100">{session.sessionName}</span>
          <div className="flex items-center space-x-1 text-green-100">
            <Clock className="w-4 h-4" />
            <span>{duration} dəqiqə</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white text-green-600 hover:bg-gray-100"
          onClick={onEndSession}
        >
          Dərsi Bitir
        </Button>
      </div>
    </div>
  );
}