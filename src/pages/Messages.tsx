
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, Phone, Video, Info } from "lucide-react";

// Mock user data
const currentUser = {
  id: "user1",
  name: "John Kamau",
  image: null,
};

// Mock contacts data
const contacts = [
  {
    id: "admin1",
    name: "Farm Support (Admin)",
    role: "admin",
    image: null,
    status: "online",
    lastSeen: "Now",
    lastMessage: "Yes, we can help with that issue.",
    unread: 0,
  },
  {
    id: "admin2",
    name: "Agricultural Expert",
    role: "admin",
    image: null,
    status: "offline",
    lastSeen: "2 hours ago",
    lastMessage: "Try using organic pesticides for your tomato crop.",
    unread: 2,
  },
  {
    id: "user2",
    name: "Mary Wanjiku",
    role: "farmer",
    image: null,
    status: "online",
    lastSeen: "Now",
    lastMessage: "How is your maize crop doing after the rain?",
    unread: 0,
  },
  {
    id: "user3",
    name: "David Ochieng",
    role: "farmer",
    image: null,
    status: "online",
    lastSeen: "Now",
    lastMessage: "Are you coming to the farmer's meeting this Saturday?",
    unread: 1,
  },
  {
    id: "user4",
    name: "Sarah Njeri",
    role: "farmer",
    image: null,
    status: "offline",
    lastSeen: "1 day ago",
    lastMessage: "Thank you for sharing your farming techniques!",
    unread: 0,
  },
];

// Mock conversations data
const conversations: Record<string, any> = {
  admin1: [
    {
      id: 1,
      senderId: "user1",
      text: "Hello, I'm having issues with my tomato plants. The leaves are turning yellow.",
      time: "Yesterday, 2:30 PM",
    },
    {
      id: 2,
      senderId: "admin1",
      text: "Hi John! I'm sorry to hear about your tomato plants. This could be due to several reasons. Can you send a picture of the affected leaves?",
      time: "Yesterday, 2:35 PM",
    },
    {
      id: 3,
      senderId: "user1",
      text: "Unfortunately I don't have a picture at the moment. The yellowing starts from the bottom leaves and moves upward. The plants are about 5 weeks old.",
      time: "Yesterday, 2:40 PM",
    },
    {
      id: 4,
      senderId: "admin1",
      text: "Based on your description, it sounds like a nitrogen deficiency. This is common in tomatoes, especially if they've been growing for several weeks without additional fertilizer.",
      time: "Yesterday, 2:45 PM",
    },
    {
      id: 5,
      senderId: "admin1",
      text: "I recommend applying a nitrogen-rich fertilizer. You can use commercial fertilizer with a higher first number in the NPK ratio or organic options like composted manure.",
      time: "Yesterday, 2:47 PM",
    },
    {
      id: 6,
      senderId: "user1",
      text: "Thank you for the advice. I'll try that. How often should I apply the fertilizer?",
      time: "Yesterday, 3:00 PM",
    },
    {
      id: 7,
      senderId: "admin1",
      text: "For tomatoes at this stage, apply every 2-3 weeks. Be careful not to overfertilize as this can damage the plants. Water thoroughly after application.",
      time: "Yesterday, 3:05 PM",
    },
    {
      id: 8,
      senderId: "user1",
      text: "Got it. I appreciate the help!",
      time: "Yesterday, 3:10 PM",
    },
    {
      id: 9,
      senderId: "admin1",
      text: "You're welcome! Let me know if you have any other questions or if the problem persists after treatment.",
      time: "Yesterday, 3:15 PM",
    },
    {
      id: 10,
      senderId: "admin1",
      text: "Yes, we can help with that issue.",
      time: "Today, 9:30 AM",
    },
  ],
  admin2: [
    {
      id: 1,
      senderId: "user1",
      text: "Hello, I'm looking for advice on natural pest control for my vegetable garden.",
      time: "2 days ago, 10:15 AM",
    },
    {
      id: 2,
      senderId: "admin2",
      text: "Good morning John! I'd be happy to suggest some organic pest control methods. What specific pests are you dealing with?",
      time: "2 days ago, 10:30 AM",
    },
    {
      id: 3,
      senderId: "user1",
      text: "I'm mainly having issues with aphids on my kale and whiteflies on my tomatoes.",
      time: "2 days ago, 10:45 AM",
    },
    {
      id: 4,
      senderId: "admin2",
      text: "For aphids, try a mixture of 1 tablespoon of liquid soap in 4 liters of water. Spray directly on the affected plants, making sure to get the undersides of leaves where aphids often hide.",
      time: "2 days ago, 11:00 AM",
    },
    {
      id: 5,
      senderId: "admin2",
      text: "For whiteflies on tomatoes, yellow sticky traps work well to catch adults. You can make these by coating yellow cardboard with petroleum jelly.",
      time: "2 days ago, 11:05 AM",
    },
    {
      id: 6,
      senderId: "user1",
      text: "That sounds easy enough to try. Are these methods safe for beneficial insects like bees?",
      time: "2 days ago, 11:20 AM",
    },
    {
      id: 7,
      senderId: "admin2",
      text: "The soap spray should be used in the early morning or evening when beneficial insects are less active. It will affect any insect it contacts, so targeted application is important. The sticky traps are more selective and mainly catch flying insects attracted to yellow.",
      time: "2 days ago, 11:30 AM",
    },
    {
      id: 8,
      senderId: "admin2",
      text: "Another good strategy is to introduce beneficial insects like ladybugs, which eat aphids. Creating habitat for these natural predators can help establish long-term pest control.",
      time: "2 days ago, 11:35 AM",
    },
    {
      id: 9,
      senderId: "user1",
      text: "That's great advice, thank you! I'll start with the soap spray and sticky traps and see how it goes.",
      time: "2 days ago, 11:45 AM",
    },
    {
      id: 10,
      senderId: "admin2",
      text: "Try using organic pesticides for your tomato crop.",
      time: "Today, 8:15 AM",
    },
  ],
};

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(conversations[contacts[0].id] || []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSelect = (contact: typeof contacts[0]) => {
    setSelectedContact(contact);
    setActiveChat(conversations[contact.id] || []);
    // Mark messages as read
    const updatedContacts = contacts.map((c) => {
      if (c.id === contact.id) {
        return { ...c, unread: 0 };
      }
      return c;
    });
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: activeChat.length + 1,
      senderId: currentUser.id,
      text: message,
      time: "Just now",
    };

    const updatedChat = [...activeChat, newMessage];
    setActiveChat(updatedChat);
    conversations[selectedContact.id] = updatedChat;
    setMessage("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="page-container pb-0 mb-0 h-[calc(100vh-5rem)]">
      <div className="flex h-full">
        {/* Contacts Sidebar */}
        <div className="w-full sm:w-80 md:w-96 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-xl mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-start p-3 rounded-lg cursor-pointer mb-1 hover:bg-accent ${
                      selectedContact.id === contact.id ? "bg-accent" : ""
                    }`}
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={contact.image || ""} alt={contact.name} />
                        <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                      </Avatar>
                      {contact.status === "online" && (
                        <span className="absolute bottom-0 right-2 h-3 w-3 rounded-full bg-farm-green-600 border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {contact.lastSeen === "Now" ? contact.lastSeen : contact.lastSeen}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                      {contact.role === "admin" && (
                        <Badge variant="outline" className="mt-1 text-xs font-normal">
                          Admin
                        </Badge>
                      )}
                    </div>
                    {contact.unread > 0 && (
                      <div className="ml-2">
                        <span className="bg-farm-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {contact.unread}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No contacts found
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="hidden sm:flex flex-1 flex-col">
          {selectedContact ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={selectedContact.image || ""} alt={selectedContact.name} />
                    <AvatarFallback>{getInitials(selectedContact.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          selectedContact.status === "online"
                            ? "bg-farm-green-600"
                            : "bg-muted-foreground"
                        } mr-1`}
                      />
                      {selectedContact.status === "online" ? "Online" : selectedContact.lastSeen}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {activeChat.map((msg) => {
                    const isSentByMe = msg.senderId === currentUser.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            isSentByMe
                              ? "bg-farm-green-600 text-white"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isSentByMe ? "text-farm-green-100" : "text-muted-foreground"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">No Conversation Selected</h3>
                <p className="text-muted-foreground">
                  Choose a contact to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
