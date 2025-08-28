import { Clock, User, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Class } from "@shared/schema";

interface ClassCardProps {
  classData: Class;
  isInMyClasses: boolean;
  onAddToMyClasses: () => void;
  onRemoveFromMyClasses: () => void;
}

const dayColors = {
  monday: "bg-accent/20 text-accent-foreground",
  tuesday: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  wednesday: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  thursday: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  friday: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

export default function ClassCard({ 
  classData, 
  isInMyClasses, 
  onAddToMyClasses, 
  onRemoveFromMyClasses 
}: ClassCardProps) {
  const dayColor = dayColors[classData.day.toLowerCase() as keyof typeof dayColors] || dayColors.monday;

  return (
    <Card className="class-card bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1" data-testid={`class-subject-${classData.id}`}>
              {classData.subject}
            </h4>
            <p className="text-sm text-muted-foreground" data-testid={`class-code-${classData.id}`}>
              {classData.classCode}
            </p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${dayColor}`}>
            {classData.day}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <span data-testid={`class-time-${classData.id}`}>
              {classData.startTime} - {classData.endTime}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-muted-foreground" />
            <span data-testid={`class-teacher-${classData.id}`}>
              {classData.teacher}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            <span data-testid={`class-room-${classData.id}`}>
              {classData.room}
            </span>
          </div>
        </div>
        
        <Button
          variant={isInMyClasses ? "destructive" : "outline"}
          size="sm"
          className="w-full"
          onClick={isInMyClasses ? onRemoveFromMyClasses : onAddToMyClasses}
          data-testid={`${isInMyClasses ? 'remove' : 'add'}-class-${classData.id}`}
        >
          {isInMyClasses ? "Remove from My Classes" : "Add to My Classes"}
        </Button>
      </CardContent>
    </Card>
  );
}
