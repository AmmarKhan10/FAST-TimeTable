import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/search-bar";
import DayTabs from "@/components/day-tabs";
import ClassCard from "@/components/class-card";
import AssignmentManager from "@/components/assignment-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarPlus, GraduationCap, Moon, Sun, Download } from "lucide-react";
import { parseGoogleSheetsData } from "@/lib/google-sheets";
import { getMyClasses, addToMyClasses, removeFromMyClasses } from "@/lib/local-storage";
import type { Class } from "@shared/schema";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [selectedDay, setSelectedDay] = useState("all");
  const [selectedView, setSelectedView] = useState<"my" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [myClassIds, setMyClassIds] = useState<string[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
    
    setMyClassIds(getMyClasses());
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Initialize classes from Google Sheets on first load
  useEffect(() => {
    const initializeData = async () => {
      try {
        const sheetsData = await parseGoogleSheetsData();
        if (sheetsData.length > 0) {
          await fetch("/api/classes/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sheetsData),
          });
        }
      } catch (error) {
        console.error("Failed to initialize data:", error);
      }
    };

    initializeData();
  }, []);

  const { data: allClasses = [], isLoading } = useQuery({
    queryKey: ["/api/classes", { day: selectedDay, search: searchQuery }],
    enabled: selectedView === "all",
  });

  const { data: myClasses = [] } = useQuery({
    queryKey: ["/api/classes", { search: "" }],
    select: (classes: Class[]) => classes.filter(cls => myClassIds.includes(cls.id)),
    enabled: selectedView === "my",
  });

  const displayClasses = selectedView === "my" ? myClasses : allClasses;
  const filteredClasses = selectedDay === "all" 
    ? displayClasses 
    : displayClasses.filter(cls => cls.day.toLowerCase() === selectedDay.toLowerCase());

  const handleAddToMyClasses = (classId: string) => {
    addToMyClasses(classId);
    setMyClassIds(prev => [...prev, classId]);
  };

  const handleRemoveFromMyClasses = (classId: string) => {
    removeFromMyClasses(classId);
    setMyClassIds(prev => prev.filter(id => id !== classId));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border glass-effect">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                <GraduationCap className="text-white text-lg" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Fast Timetable</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button className="px-4 py-2 text-primary font-medium border-b-2 border-primary">
                TimeTable
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Events
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="theme-toggle"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                alt="Ammar Khan profile" 
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">Ammar Khan</p>
                <p className="text-xs text-muted-foreground">Computer Science</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Fast Timetable</h2>
              <p className="text-muted-foreground mb-6">
                Search for your class, specific teacher, specific subject
              </p>
              
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                data-testid="search-input"
              />

              {/* View Toggle */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex bg-muted rounded-lg p-1">
                  <Button
                    variant={selectedView === "my" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedView("my")}
                    data-testid="my-classes-btn"
                  >
                    My Classes
                  </Button>
                  <Button
                    variant={selectedView === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedView("all")}
                    data-testid="all-classes-btn"
                  >
                    All Classes
                  </Button>
                </div>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="add-classes-btn"
                >
                  Add My Classes
                </Button>
              </div>
            </div>

            <DayTabs selectedDay={selectedDay} onDayChange={setSelectedDay} />

            {/* Classes Content */}
            {selectedView === "my" && myClasses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <CalendarPlus className="text-2xl text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Classes Added</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your classes to see your personalized timetable
                </p>
                <Button onClick={() => setSelectedView("all")} data-testid="add-classes-empty">
                  Add Classes
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded"></div>
                          <div className="h-3 bg-muted rounded"></div>
                          <div className="h-3 bg-muted rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  filteredClasses.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classData={classItem}
                      isInMyClasses={myClassIds.includes(classItem.id)}
                      onAddToMyClasses={() => handleAddToMyClasses(classItem.id)}
                      onRemoveFromMyClasses={() => handleRemoveFromMyClasses(classItem.id)}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <AssignmentManager />
            
            {/* Download APK Section */}
            <Card className="bg-gradient-to-r from-primary to-accent text-white">
              <CardContent className="p-6 text-center">
                <Download className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Download Mobile App</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get the Fast Timetable app for easy access on your phone
                </p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-gray-100"
                  data-testid="download-apk"
                >
                  Download APK
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Get in Touch</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Choose how you'd like to connect with us
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Submit Feedback</h5>
              <p className="text-xs text-muted-foreground">
                Share your thoughts and help us improve
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Suggest Features</h5>
              <p className="text-xs text-muted-foreground">
                Help shape the future of this app
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Quick Contact</h5>
              <div className="flex space-x-3">
                <a href="mailto:ammar@example.com" className="text-primary hover:text-primary/80">
                  Email
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
