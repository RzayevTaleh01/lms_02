import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Play, Users, Clock, Star, Check, Share, Heart } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  
  const { data: course, isLoading } = useQuery({
    queryKey: [`/api/courses/${id}`],
  });

  const { data: lessons = [] } = useQuery({
    queryKey: [`/api/courses/${id}/lessons`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-devcode-dark mb-4">Course Not Found</h1>
            <p className="text-devcode-gray mb-8">The course you're looking for doesn't exist.</p>
            <Link href="/courses">
              <Button>Browse All Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const learningObjectives = [
    "HTML5, CSS3, and responsive design principles",
    "JavaScript ES6+ and modern web APIs",
    "React.js and component-based architecture",
    "Node.js and Express.js backend development",
    "Database design with MongoDB and SQL",
    "Deployment and DevOps fundamentals"
  ];

  const requirements = [
    "Basic computer skills and familiarity with web browsers",
    "No prior programming experience required",
    "Commitment to 10-15 hours per week of study time",
    "Access to a computer with internet connection"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="capitalize">
                  {course.category}
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm text-devcode-gray">
                    {course.rating} (324 reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-devcode-dark mb-4">{course.title}</h1>
              <p className="text-lg text-devcode-gray mb-6">{course.description}</p>
              
              {/* Instructor Info */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-devcode-orange text-white">
                    {course.instructorId?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-devcode-dark font-semibold">Instructor</div>
                  <div className="text-devcode-gray text-sm">Senior Developer</div>
                </div>
              </div>
            </div>

            {/* Course Video Preview */}
            <div className="bg-black rounded-xl overflow-hidden mb-8">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Button size="lg" className="w-20 h-20 rounded-full bg-devcode-orange hover:bg-orange-600">
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-2xl font-semibold text-devcode-dark mb-4">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-devcode-gray">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-devcode-dark mb-4">Course Requirements</h3>
                  <ul className="space-y-2 text-devcode-gray">
                    {requirements.map((requirement, index) => (
                      <li key={index}>• {requirement}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="mt-8">
                <div className="space-y-4">
                  {lessons.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-devcode-gray">Course curriculum will be available soon.</p>
                    </div>
                  ) : (
                    lessons.map((lesson: any, index: number) => (
                      <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <Link href={`/courses/${id}/lessons/${lesson.id}`} className="block">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-devcode-orange rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-medium text-devcode-dark hover:text-devcode-orange transition-colors">{lesson.title}</h4>
                                  <p className="text-sm text-devcode-gray">{lesson.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-devcode-gray">
                                <Play className="w-4 h-4" />
                                <span>Dərsə başla</span>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-8">
                <div className="text-center py-8">
                  <p className="text-devcode-gray">Reviews will be displayed here once available.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-8">
                <div className="text-center py-8">
                  <p className="text-devcode-gray">Instructor information will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Course Preview Image */}
                <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Button size="lg" className="w-16 h-16 rounded-full bg-white bg-opacity-90 text-devcode-orange hover:bg-opacity-100">
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="text-3xl font-bold text-devcode-dark mb-2">${course.price}</div>
                <div className="text-devcode-gray mb-6">One-time payment • Lifetime access</div>

                <Button className="w-full mb-4 bg-devcode-orange hover:bg-orange-600">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full mb-6 border-devcode-orange text-devcode-orange hover:bg-orange-50">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>

                {/* Course Info */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-devcode-gray">Duration:</span>
                    <span className="text-devcode-dark font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-devcode-gray">Level:</span>
                    <span className="text-devcode-dark font-medium capitalize">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-devcode-gray">Students:</span>
                    <span className="text-devcode-dark font-medium">{course.enrollmentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-devcode-gray">Language:</span>
                    <span className="text-devcode-dark font-medium">English</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-devcode-gray">Certificate:</span>
                    <span className="text-devcode-dark font-medium">Yes</span>
                  </div>
                </div>

                {/* Share Course */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-devcode-gray mb-3">Share this course:</div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Share className="w-4 h-4 mr-2" />
                    Share Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
