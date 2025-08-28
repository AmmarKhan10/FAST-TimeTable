import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Assignment, InsertAssignment } from "@shared/schema";

export default function AssignmentManager() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    dueDate: "",
  });
  const { toast } = useToast();

  const { data: assignments = [], isLoading } = useQuery<Assignment[]>({
    queryKey: ["/api/assignments"],
  });

  const createMutation = useMutation({
    mutationFn: async (assignment: InsertAssignment) => {
      const response = await apiRequest("POST", "/api/assignments", assignment);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assignments"] });
      setFormData({ title: "", subject: "", dueDate: "" });
      setShowForm(false);
      toast({ title: "Assignment added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add assignment", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Assignment> }) => {
      const response = await apiRequest("PATCH", `/api/assignments/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assignments"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/assignments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assignments"] });
      toast({ title: "Assignment deleted" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.subject && formData.dueDate) {
      createMutation.mutate({
        ...formData,
        completed: false,
      });
    }
  };

  const toggleComplete = (assignment: Assignment) => {
    updateMutation.mutate({
      id: assignment.id,
      updates: { completed: !assignment.completed },
    });
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isOverdue = date < today && !(assignments as Assignment[]).find((a: Assignment) => a.dueDate === dateString)?.completed;
    
    return {
      formatted: date.toLocaleDateString(),
      isOverdue,
    };
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Assignment Manager</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowForm(!showForm)}
            data-testid="add-assignment-btn"
          >
            <Plus className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Add Assignment Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <Input
              placeholder="Assignment title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              data-testid="assignment-title-input"
            />
            <Input
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              data-testid="assignment-subject-input"
            />
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              data-testid="assignment-due-date-input"
            />
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                size="sm" 
                className="flex-1"
                disabled={createMutation.isPending}
                data-testid="save-assignment-btn"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ title: "", subject: "", dueDate: "" });
                }}
                data-testid="cancel-assignment-btn"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Assignments List */}
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-background rounded-lg p-3 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-1"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))
          ) : (assignments as Assignment[]).length === 0 ? (
            <div className="text-center py-8" data-testid="empty-assignments">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No assignments yet</p>
              <p className="text-xs text-muted-foreground">Click + to add your first assignment</p>
            </div>
          ) : (
            (assignments as Assignment[]).map((assignment: Assignment) => {
              const { formatted, isOverdue } = formatDueDate(assignment.dueDate);
              
              return (
                <div
                  key={assignment.id}
                  className={`assignment-item bg-background rounded-lg p-3 border border-border transition-all ${
                    assignment.completed ? "opacity-50" : ""
                  }`}
                  data-testid={`assignment-${assignment.id}`}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={assignment.completed}
                      onCheckedChange={() => toggleComplete(assignment)}
                      className="mt-1"
                      data-testid={`assignment-checkbox-${assignment.id}`}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-medium text-foreground ${
                        assignment.completed ? "line-through" : ""
                      }`}>
                        {assignment.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                      <p className={`text-xs ${
                        assignment.completed 
                          ? "text-green-600" 
                          : isOverdue 
                          ? "text-destructive" 
                          : "text-muted-foreground"
                      }`}>
                        {assignment.completed 
                          ? "Completed" 
                          : `Due: ${formatted}`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteMutation.mutate(assignment.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`delete-assignment-${assignment.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
