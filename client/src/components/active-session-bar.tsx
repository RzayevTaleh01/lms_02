
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Square } from "lucide-react";

interface ActiveSessionBarProps {
  session: any;
  onEnd: () => void;
}

export default function ActiveSessionBar({ session, onEnd }: ActiveSessionBarProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const startTime = new Date(session.startTime).getTime();
    
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 60000); // in minutes
      setDuration(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [session.startTime]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}s ${mins}d` : `${mins}d`;
  };

  return (
    <div className="fixed top-16 left-0 right-0 bg-green-600 text-white shadow-lg z-50 border-b border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
              <Clock className="w-3 h-3 mr-1" />
              AKTİV SESIYA
            </Badge>
            <div className="text-sm">
              <span className="font-medium">{session.sessionName}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              Müddət: {formatDuration(duration)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onEnd}
              className="bg-white bg-opacity-20 text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-30"
            >
              <Square className="w-3 h-3 mr-1 fill-current" />
              Dərsi Bitir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
