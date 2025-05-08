
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Image,
  Search,
  Users,
  User,
  MapPin,
} from "lucide-react";

// Mock user data
const currentUser = {
  id: "user1",
  name: "John Kamau",
  image: null,
};

// Mock social posts data
const posts = [
  {
    id: 1,
    user: {
      id: "user2",
      name: "Mary Wanjiku",
      location: "Kiambu County",
      image: null,
    },
    content:
      "I just harvested my maize crop and the yield was much better than last season! Using the drought-resistant seeds really made a difference during the dry spell we had in June.",
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"],
    likes: 24,
    comments: 5,
    time: "2 hours ago",
    liked: false,
  },
  {
    id: 2,
    user: {
      id: "user3",
      name: "David Ochieng",
      location: "Kisumu County",
      image: null,
    },
    content:
      "Has anyone used this new organic pesticide for tomatoes? I'm having trouble with spider mites and would appreciate any advice.",
    images: [],
    likes: 8,
    comments: 12,
    time: "5 hours ago",
    liked: true,
  },
  {
    id: 3,
    user: {
      id: "user4",
      name: "Sarah Njeri",
      location: "Nakuru County",
      image: null,
    },
    content:
      "Today I'm teaching other women in my community about the new irrigation techniques I learned from the agricultural extension officer. Knowledge sharing is how we all grow!",
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"],
    likes: 45,
    comments: 8,
    time: "1 day ago",
    liked: false,
  },
  {
    id: 4,
    user: {
      id: "user5",
      name: "James Mwangi",
      location: "Nyeri County",
      image: null,
    },
    content:
      "My dairy cows have been producing more milk since I started using the feed mix recommended by this app. I'm getting about 20% more yield with the same number of cows!",
    images: ["https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"],
    likes: 32,
    comments: 6,
    time: "2 days ago",
    liked: false,
  },
];

// Mock trending topics
const trendingTopics = [
  { name: "Drought resistant crops", count: 128 },
  { name: "Organic farming", count: 86 },
  { name: "Milk prices", count: 72 },
  { name: "Irrigation methods", count: 54 },
  { name: "Pest control", count: 43 },
];

// Mock user suggestions
const suggestedUsers = [
  {
    id: "user6",
    name: "Alice Wairimu",
    location: "Meru County",
    specialty: "Coffee Farming",
    image: null,
  },
  {
    id: "user7",
    name: "Peter Kariuki",
    location: "Narok County",
    specialty: "Wheat Farming",
    image: null,
  },
  {
    id: "user8",
    name: "Grace Muthoni",
    location: "Machakos County",
    specialty: "Poultry Keeping",
    image: null,
  },
];

const Post = ({
  post,
  onLike,
}: {
  post: typeof posts[0];
  onLike: (postId: number) => void;
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start mb-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={post.user.image || ""} alt={post.user.name} />
            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{post.user.name}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" /> {post.user.location} • {post.time}
            </div>
          </div>
        </div>

        <p className="mb-4">{post.content}</p>

        {post.images.length > 0 && (
          <div className="mb-4">
            <img
              src={post.images[0]}
              alt="Post image"
              className="rounded-lg w-full object-cover max-h-[300px]"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t py-3 px-6">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${
            post.liked ? "text-farm-green-600 font-medium" : ""
          }`}
          onClick={() => onLike(post.id)}
        >
          <ThumbsUp className="h-4 w-4" /> {post.likes}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" /> {post.comments}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

const Social = () => {
  const [postContent, setPostContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [postsData, setPostsData] = useState(posts);

  const handleCreatePost = () => {
    if (postContent.trim() === "") return;

    const newPost = {
      id: postsData.length + 1,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        location: "Your Location",
        image: currentUser.image,
      },
      content: postContent,
      images: [],
      likes: 0,
      comments: 0,
      time: "Just now",
      liked: false,
    };

    setPostsData([newPost, ...postsData]);
    setPostContent("");
  };

  const handleLike = (postId: number) => {
    setPostsData(
      postsData.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      })
    );
  };

  const filteredPosts = postsData.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Farmer Community</h1>
        <p className="text-muted-foreground">
          Connect with other farmers, share knowledge, and learn from each other's experiences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 order-2 lg:order-1">
          <div className="mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={currentUser.image || ""} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground">Share something with the community...</span>
                </div>

                <Textarea
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="mb-4"
                />

                <div className="flex justify-between items-center">
                  <Button variant="outline" className="flex items-center">
                    <Image className="h-4 w-4 mr-2" /> Add Photo
                  </Button>
                  <Button onClick={handleCreatePost} disabled={!postContent.trim()}>
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post key={post.id} post={post} onLike={handleLike} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No posts found matching your search.</p>
              {searchTerm && (
                <Button
                  variant="link"
                  onClick={() => setSearchTerm("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 order-1 lg:order-2">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-farm-green-600" /> Suggested Farmers
                </h3>

                <div className="space-y-4">
                  {suggestedUsers.map((user) => (
                    <div key={user.id} className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {user.location}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {user.specialty}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Trending Topics</h3>

                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <Badge variant="outline" className="font-normal py-1">
                        #{topic.name.replace(/\s+/g, "")}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{topic.count} posts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-farm-green-600" /> Your Profile
                </h3>

                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage src={currentUser.image || ""} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold text-base">{currentUser.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">Farmer</p>
                  
                  <div className="flex justify-center gap-4 w-full mb-3">
                    <div className="text-center">
                      <div className="font-semibold">28</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">142</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">96</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
