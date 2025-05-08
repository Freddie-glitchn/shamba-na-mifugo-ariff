
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Calendar, Users, MessageCircle, BarChart3, Cloud } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Plant Knowledge Base",
    description: "Access information on local crops and edible plants including growing tips, nutrition data, and pest management.",
    link: "/plants"
  },
  {
    icon: Cloud,
    title: "Weather & Market Data",
    description: "Get real-time weather forecasts and market prices to make informed farming decisions.",
    link: "/weather"
  },
  {
    icon: Calendar,
    title: "Farm Management",
    description: "Track your crops, livestock, and farm activities with our easy-to-use dashboard.",
    link: "/dashboard"
  },
  {
    icon: Users,
    title: "Farmer Community",
    description: "Connect with other farmers, share knowledge, and learn from each other's experiences.",
    link: "/social"
  },
  {
    icon: MessageCircle,
    title: "Expert Advice",
    description: "Chat directly with agricultural experts to get personalized advice for your farm.",
    link: "/messages"
  },
  {
    icon: BarChart3,
    title: "Sales & Inventory",
    description: "Manage your produce, track sales, and optimize your farm business.",
    link: "/dashboard"
  }
];

const Index = () => {
  return (
    <div className="page-container">
      <section className="py-12 md:py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-6 space-y-6 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-farm-green-800 leading-tight">
            Empowering Kenyan Farmers with Technology
          </h1>
          <p className="text-lg text-muted-foreground">
            Mifugo Shamba Arifa brings modern farming tools, knowledge, and community to your fingertips. 
            Manage your farm smarter, access expert advice, and connect with fellow farmers.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/signup">
              <Button size="lg" className="bg-farm-green-600 hover:bg-farm-green-700">Get Started</Button>
            </Link>
            <Link to="/plants">
              <Button size="lg" variant="outline">Explore Plants</Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
            alt="Kenyan farm with crops" 
            className="rounded-lg shadow-lg w-full object-cover max-h-[400px]"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-farm-green-700">Our Features</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed in farming, all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <feature.icon className="h-10 w-10 text-farm-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link to={feature.link}>
                <Button variant="link" className="p-0 text-farm-green-600 hover:text-farm-green-800">
                  Learn more →
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-farm-green-50 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-farm-green-700">Join Our Growing Community</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Thousands of Kenyan farmers are already benefiting from our platform. Be part of this transformative journey.
          </p>
        </div>

        <div className="flex justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-farm-green-600 hover:bg-farm-green-700">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
