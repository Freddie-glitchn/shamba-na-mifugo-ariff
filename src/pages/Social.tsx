
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Heart, MessageCircle, Share, MoreHorizontal, 
  Image, Smile, MapPin, Users, Calendar, Search, Bell,
  ThumbsUp, Bookmark, UserPlus, User, Filter
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock social data
const socialData = {
  posts: [
    {
      id: 1,
      authorName: "John Farmer",
      authorImage: "https://i.pravatar.cc/150?u=john",
      authorLocation: "Kiambu County",
      content: "Just harvested my first batch of tomatoes using the new irrigation system! The yield is much better than last season.",
      images: ["https://images.unsplash.com/photo-1518977822534-7049a61ee0c2"],
      postedAt: "2 hours ago",
      likes: 24,
      comments: 5,
      isLiked: false,
      isBookmarked: false,
      tags: ["Tomatoes", "Irrigation", "Success"],
      commentsList: [
        {
          id: 101,
          authorName: "Mary Wanjiku",
          authorImage: "https://i.pravatar.cc/150?u=mary",
          content: "They look amazing! Which variety are you growing?",
          postedAt: "1 hour ago",
          likes: 2
        },
        {
          id: 102,
          authorName: "John Farmer",
          authorImage: "https://i.pravatar.cc/150?u=john",
          content: "Thanks! I'm growing Roma VF. They've been very resistant to local pests.",
          postedAt: "45 minutes ago",
          likes: 1,
          isReply: true
        },
      ]
    },
    {
      id: 2,
      authorName: "Agrovet Specialists",
      authorImage: "https://i.pravatar.cc/150?u=agrovet",
      authorLocation: "Nairobi",
      content: "ADVISORY: We're seeing an increase in Fall Armyworm across central counties. Check your maize fields regularly and apply appropriate controls if you spot symptoms. Contact us for recommended treatments.",
      images: [],
      postedAt: "5 hours ago",
      likes: 56,
      comments: 12,
      isLiked: true,
      isBookmarked: true,
      tags: ["PestAlert", "Maize", "Farming"],
      commentsList: []
    },
    {
      id: 3,
      authorName: "Wambui Kariuki",
      authorImage: "https://i.pravatar.cc/150?u=wambui",
      authorLocation: "Nakuru County",
      content: "My dairy herd has increased milk production by 30% since implementing the feeding techniques I learned in last month's workshop. Thank you to everyone who shared their knowledge!",
      images: ["https://images.unsplash.com/photo-1594753154882-4e91132ee2ed"],
      postedAt: "1 day ago",
      likes: 42,
      comments: 8,
      isLiked: false,
      isBookmarked: false,
      tags: ["Dairy", "Livestock", "Success"],
      commentsList: []
    },
    {
      id: 4,
      authorName: "Kenya Met Department",
      authorImage: "https://i.pravatar.cc/150?u=metdept",
      authorLocation: "Nationwide",
      content: "WEATHER UPDATE: Expect above-average rainfall in Western and Central regions over the next two weeks. Farmers should prepare drainage systems and consider delaying certain field activities.",
      images: [],
      postedAt: "1 day ago",
      likes: 85,
      comments: 15,
      isLiked: false,
      isBookmarked: true,
      tags: ["Weather", "Rainfall", "Advisory"],
      commentsList: []
    }
  ],
  events: [
    {
      id: 1,
      title: "Agricultural Trade Fair",
      location: "Nairobi Exhibition Centre",
      date: "May 15, 2025",
      time: "8:00 AM - 5:00 PM",
      description: "Annual trade fair showcasing the latest in agricultural technology and practices.",
      image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9",
      attendees: 120,
      isAttending: false
    },
    {
      id: 2,
      title: "Soil Health Workshop",
      location: "Kiambu Agricultural Centre",
      date: "May 20, 2025",
      time: "10:00 AM - 2:00 PM",
      description: "Learn practical techniques for improving soil health and fertility.",
      image: "https://images.unsplash.com/photo-1530836176759-510f58baebf4",
      attendees: 45,
      isAttending: true
    },
    {
      id: 3,
      title: "Dairy Farmers Cooperative Meeting",
      location: "Nakuru Town Hall",
      date: "May 25, 2025",
      time: "2:00 PM - 4:00 PM",
      description: "Monthly meeting to discuss market prices, challenges, and opportunities.",
      image: "https://images.unsplash.com/photo-1493815793585-d94ccbc86df8",
      attendees: 75,
      isAttending: false
    }
  ],
  groups: [
    {
      id: 1,
      name: "Organic Farming Kenya",
      members: 1250,
      image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8",
      isMember: true,
      description: "A community of farmers practicing organic methods across Kenya."
    },
    {
      id: 2,
      name: "Dairy Farmers Network",
      members: 872,
      image: "https://images.unsplash.com/photo-1492683962492-deef0ec456c0",
      isMember: false,
      description: "Support group for dairy farmers to share experiences and best practices."
    },
    {
      id: 3,
      name: "Smallholder Irrigators",
      members: 534,
      image: "https://images.unsplash.com/photo-1633158829799-96bb13cab779",
      isMember: true,
      description: "Group focused on small-scale irrigation technologies and practices."
    },
    {
      id: 4,
      name: "Market Access Alliance",
      members: 675,
      image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef",
      isMember: false,
      description: "Working together to improve market access and fair prices for farmers."
    }
  ]
};

const newPostPlaceholder = "Share farming updates, questions, or advice with the community...";

const Social = () => {
  const [newPost, setNewPost] = useState("");
  const [showComments, setShowComments] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>(
    socialData.posts.filter(post => post.isLiked).map(post => post.id)
  );
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>(
    socialData.posts.filter(post => post.isBookmarked).map(post => post.id)
  );
  const [attendingEvents, setAttendingEvents] = useState<number[]>(
    socialData.events.filter(event => event.isAttending).map(event => event.id)
  );
  const [joinedGroups, setJoinedGroups] = useState<number[]>(
    socialData.groups.filter(group => group.isMember).map(group => group.id)
  );
  const [comment, setComment] = useState("");
  
  const { toast } = useToast();
  
  const toggleComments = (postId: number) => {
    if (showComments.includes(postId)) {
      setShowComments(showComments.filter(id => id !== postId));
    } else {
      setShowComments([...showComments, postId]);
    }
  };
  
  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast({
        title: "Post liked",
        description: "You liked this post",
      });
    }
  };
  
  const toggleBookmark = (postId: number) => {
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId]);
      toast({
        title: "Post saved",
        description: "Post added to your bookmarks",
      });
    }
  };
  
  const toggleAttending = (eventId: number) => {
    if (attendingEvents.includes(eventId)) {
      setAttendingEvents(attendingEvents.filter(id => id !== eventId));
    } else {
      setAttendingEvents([...attendingEvents, eventId]);
      toast({
        title: "RSVP Confirmed",
        description: "You're now attending this event",
      });
    }
  };
  
  const toggleJoinGroup = (groupId: number) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    } else {
      setJoinedGroups([...joinedGroups, groupId]);
      toast({
        title: "Group Joined",
        description: "You've successfully joined this group",
      });
    }
  };
  
  const handlePostSubmit = () => {
    if (newPost.trim()) {
      toast({
        title: "Post created",
        description: "Your post has been shared with the community",
      });
      setNewPost("");
    }
  };
  
  const handleCommentSubmit = (postId: number) => {
    if (comment.trim()) {
      toast({
        title: "Comment added",
        description: "Your comment has been added to the post",
      });
      setComment("");
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Farmer Community</h1>
        <p className="text-muted-foreground">
          Connect with other farmers, share knowledge and experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="md:col-span-2 space-y-6">
          {/* New post card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=user" alt="Your profile" />
                  <AvatarFallback>YP</AvatarFallback>
                </Avatar>
                <Textarea 
                  placeholder={newPostPlaceholder}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="flex-1 resize-none"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Tag
                  </Button>
                </div>
                <Button 
                  onClick={handlePostSubmit}
                  disabled={newPost.trim() === ""}
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="feed">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-6 mt-2">
              {socialData.posts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between">
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={post.authorImage} alt={post.authorName} />
                          <AvatarFallback>{post.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{post.authorName}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {post.authorLocation} · {post.postedAt}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-3">{post.content}</p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {post.images.length > 0 && (
                      <div className={`rounded-md overflow-hidden mb-3 ${post.images.length > 1 ? 'grid grid-cols-2 gap-2' : ''}`}>
                        {post.images.map((img, i) => (
                          <img 
                            key={i}
                            src={img} 
                            alt="Post image"
                            className="w-full object-cover rounded-md"
                            style={{ maxHeight: "300px" }}
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div>{post.likes} likes</div>
                      <div>{post.comments} comments</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 border-t">
                    <div className="grid grid-cols-3 w-full divide-x">
                      <Button 
                        variant="ghost" 
                        className="rounded-none py-5"
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 mr-2 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`} 
                        />
                        Like
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="rounded-none py-5"
                        onClick={() => toggleComments(post.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="rounded-none py-5"
                        onClick={() => toggleBookmark(post.id)}
                      >
                        <Bookmark 
                          className={`h-4 w-4 mr-2 ${bookmarkedPosts.includes(post.id) ? "fill-primary text-primary" : ""}`}
                        />
                        Save
                      </Button>
                    </div>
                  </CardFooter>
                  
                  {showComments.includes(post.id) && (
                    <div className="p-4 bg-muted/50 border-t">
                      {post.commentsList.length > 0 ? (
                        <div className="space-y-4 mb-4">
                          {post.commentsList.map(comment => (
                            <div 
                              key={comment.id} 
                              className={`flex space-x-3 ${comment.isReply ? "ml-10" : ""}`}
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.authorImage} alt={comment.authorName} />
                                <AvatarFallback>{comment.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-background rounded-lg p-3">
                                  <div className="font-medium text-sm">{comment.authorName}</div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                                  <span>{comment.postedAt}</span>
                                  <Button variant="link" size="sm" className="h-auto p-0">Like</Button>
                                  <Button variant="link" size="sm" className="h-auto p-0">Reply</Button>
                                  <span>{comment.likes} likes</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-sm text-muted-foreground mb-4">
                          No comments yet. Be the first to comment!
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://i.pravatar.cc/150?u=user" alt="Your profile" />
                          <AvatarFallback>YP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex">
                          <Input 
                            placeholder="Write a comment..." 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            className="ml-2" 
                            size="sm" 
                            onClick={() => handleCommentSubmit(post.id)}
                            disabled={comment.trim() === ""}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-6 mt-2">
              {socialData.posts.filter(post => bookmarkedPosts.includes(post.id)).length > 0 ? (
                socialData.posts.filter(post => bookmarkedPosts.includes(post.id)).map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between">
                        <div className="flex space-x-3">
                          <Avatar>
                            <AvatarImage src={post.authorImage} alt={post.authorName} />
                            <AvatarFallback>{post.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{post.authorName}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {post.authorLocation} · {post.postedAt}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleBookmark(post.id)}
                        >
                          <Bookmark className="h-4 w-4 fill-primary text-primary" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="mb-3">{post.content}</p>
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {post.images.length > 0 && (
                        <div className={`rounded-md overflow-hidden mb-3`}>
                          {post.images.map((img, i) => (
                            <img 
                              key={i}
                              src={img} 
                              alt="Post image"
                              className="w-full object-cover rounded-md"
                              style={{ maxHeight: "300px" }}
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="px-4 pt-0 pb-4 flex justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{post.likes} likes</span>
                        <MessageCircle className="h-4 w-4 ml-3 mr-1" />
                        <span>{post.comments} comments</span>
                      </div>
                      <Button variant="ghost" size="sm">View Post</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-10 text-center">
                    <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No saved posts yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Bookmark posts to save them for later reference
                    </p>
                    <Button>Browse Feed</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="events" className="space-y-6 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Upcoming Events</h3>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialData.events.map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="h-36 overflow-hidden relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <h3 className="text-white font-medium">{event.title}</h3>
                        <div className="flex items-center text-xs text-white/90">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date} · {event.time}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start mb-3">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendees} people attending</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button
                        variant={attendingEvents.includes(event.id) ? "default" : "outline"}
                        onClick={() => toggleAttending(event.id)}
                      >
                        {attendingEvents.includes(event.id) ? "Attending" : "Attend"}
                      </Button>
                      <Button variant="ghost">More Info</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="space-y-6 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Farmer Groups</h3>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialData.groups.map(group => (
                  <Card key={group.id} className="overflow-hidden">
                    <div className="h-28 overflow-hidden relative">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                        <h3 className="text-white font-medium">{group.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{group.members} members</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button
                        variant={joinedGroups.includes(group.id) ? "default" : "outline"}
                        onClick={() => toggleJoinGroup(group.id)}
                        className="flex-1"
                      >
                        {joinedGroups.includes(group.id) ? (
                          <>
                            <User className="h-4 w-4 mr-2" /> Member
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" /> Join Group
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6 hidden md:block">
          {/* Search and filters */}
          <Card>
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts, groups..."
                  className="pl-9"
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card>
            <CardHeader className="py-3 px-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm">See All</Button>
              </div>
            </CardHeader>
            <CardContent className="py-0 px-4">
              <div className="space-y-3 max-h-[300px] overflow-auto">
                <div className="flex items-start space-x-3 p-2 hover:bg-muted rounded-md transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?u=mary" alt="Mary" />
                    <AvatarFallback>MW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Mary Wanjiku</span> commented on your post
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-1"></div>
                </div>
                
                <div className="flex items-start space-x-3 p-2 hover:bg-muted rounded-md transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?u=agrovet" alt="Agrovet" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Agrovet Specialists</span> posted a new advisory
                    </p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-2 hover:bg-muted rounded-md transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-500">EV</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Soil Health Workshop</span> event is tomorrow
                    </p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Popular topics */}
          <Card>
            <CardHeader className="py-3 px-4">
              <h3 className="font-medium">Popular Topics</h3>
            </CardHeader>
            <CardContent className="py-0 px-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors">
                  <span className="text-sm font-medium">#RainfallAdvisory</span>
                  <span className="text-xs text-muted-foreground">85 posts</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors">
                  <span className="text-sm font-medium">#PestManagement</span>
                  <span className="text-xs text-muted-foreground">67 posts</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors">
                  <span className="text-sm font-medium">#MarketPrices</span>
                  <span className="text-xs text-muted-foreground">54 posts</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors">
                  <span className="text-sm font-medium">#FarmingTips</span>
                  <span className="text-xs text-muted-foreground">43 posts</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="py-3 px-4">
              <Button variant="ghost" size="sm" className="w-full">
                Show More Topics
              </Button>
            </CardFooter>
          </Card>
          
          {/* Suggested connections */}
          <Card>
            <CardHeader className="py-3 px-4">
              <h3 className="font-medium">People You May Know</h3>
            </CardHeader>
            <CardContent className="py-0 px-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?u=james" alt="James" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">James Mwangi</div>
                      <div className="text-xs text-muted-foreground">Dairy Farmer, Nyeri</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <UserPlus className="h-4 w-4" />
                    <span className="sr-only">Connect</span>
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" />
                      <AvatarFallback>SO</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Sarah Odhiambo</div>
                      <div className="text-xs text-muted-foreground">Poultry Farmer, Kisumu</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <UserPlus className="h-4 w-4" />
                    <span className="sr-only">Connect</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="py-3 px-4">
              <Button variant="ghost" size="sm" className="w-full">
                View More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Social;
