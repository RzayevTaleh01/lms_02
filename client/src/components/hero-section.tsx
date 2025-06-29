import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-devcode-orange to-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Master Programming with
              <span className="text-yellow-200 block">DevCode Academy</span>
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Learn from industry experts, build real projects, and advance your career 
              with our comprehensive programming courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-devcode-orange hover:bg-gray-100 font-semibold"
                >
                  Browse Courses
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-devcode-orange font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Coding workspace mockup */}
            <div className="bg-devcode-dark rounded-xl p-6 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-green-400 font-mono text-sm">
                <div className="mb-2">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">learner</span> = {"{"}
                </div>
                <div className="ml-4 mb-1">
                  name: <span className="text-yellow-300">'Future Developer'</span>,
                </div>
                <div className="ml-4 mb-1">
                  skills: [<span className="text-yellow-300">'JavaScript'</span>, {" "}
                  <span className="text-yellow-300">'Python'</span>, {" "}
                  <span className="text-yellow-300">'React'</span>],
                </div>
                <div className="ml-4 mb-2">
                  status: <span className="text-yellow-300">'Learning'</span>
                </div>
                <div>{"}"}</div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full opacity-80 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
