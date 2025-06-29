import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, DollarSign } from "lucide-react";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description?: string;
    shortDescription?: string;
    category?: string;
    level: string;
    price: string;
    duration?: string;
    imageUrl?: string;
    enrollmentCount?: number;
    rating?: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'web development':
        return 'bg-blue-100 text-blue-800';
      case 'data science':
        return 'bg-green-100 text-green-800';
      case 'mobile development':
        return 'bg-purple-100 text-purple-800';
      case 'devops':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      {/* Course Image */}
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        {course.imageUrl ? (
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-devcode-orange to-orange-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">💻</div>
              <div className="text-sm font-medium">{course.category || 'Programming'}</div>
            </div>
          </div>
        )}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`capitalize ${getLevelColor(course.level)}`}>
            {course.level}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-3">
          {course.category && (
            <Badge variant="secondary" className={`capitalize ${getCategoryColor(course.category)}`}>
              {course.category}
            </Badge>
          )}
          
          {course.rating && (
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm text-devcode-gray">
                {course.rating} ({course.enrollmentCount || 0})
              </span>
            </div>
          )}
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-semibold text-devcode-dark mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Course Description */}
        <p className="text-devcode-gray mb-4 line-clamp-3">
          {course.shortDescription || course.description || "Learn programming with hands-on projects and expert guidance."}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-devcode-gray">
          <div className="flex items-center space-x-4">
            {course.duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{course.duration}</span>
              </div>
            )}
            
            {course.enrollmentCount !== undefined && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{course.enrollmentCount} students</span>
              </div>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-devcode-orange" />
            <span className="text-2xl font-bold text-devcode-dark">
              {course.price}
            </span>
          </div>
          
          <Link href={`/course/${course.id}`}>
            <Button className="bg-devcode-orange hover:bg-orange-600 transition-colors">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
