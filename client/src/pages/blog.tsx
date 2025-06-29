import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["/api/blog"],
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-devcode-dark mb-4">DevCode Blog</h1>
          <p className="text-lg text-devcode-gray">
            Stay updated with the latest programming trends, tutorials, and industry insights.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-devcode-dark mb-2">No blog posts yet</h3>
            <p className="text-devcode-gray">
              Our expert instructors are working on amazing content. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {posts[0] && (
              <Card className="mb-12 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="aspect-video bg-gradient-to-br from-devcode-orange to-orange-600"></div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge className="mb-2">Featured Post</Badge>
                    <h2 className="text-3xl font-bold text-devcode-dark mb-4">{posts[0].title}</h2>
                    <p className="text-devcode-gray mb-6">{posts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-devcode-orange text-white">
                            {posts[0].author?.firstName?.charAt(0) || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-devcode-dark font-medium">
                            {posts[0].author?.firstName} {posts[0].author?.lastName}
                          </div>
                          <div className="text-devcode-gray text-sm flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(posts[0].publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post: any) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900"></div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2 capitalize">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-devcode-dark mb-3">{post.title}</h3>
                    <p className="text-devcode-gray mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-devcode-gray">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>5 min read</span>
                      </div>
                      <div className="flex items-center text-devcode-gray">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
