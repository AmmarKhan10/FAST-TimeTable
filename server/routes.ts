import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClassSchema, insertAssignmentSchema, insertUserClassSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Classes routes
  app.get("/api/classes", async (req, res) => {
    try {
      const { day, search, classCode } = req.query;
      
      let classes;
      if (search) {
        classes = await storage.searchClasses(search as string);
      } else if (classCode) {
        classes = await storage.getClassesByCode(classCode as string);
      } else if (day && day !== 'all') {
        classes = await storage.getClassesByDay(day as string);
      } else {
        classes = await storage.getAllClasses();
      }
      
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classes" });
    }
  });

  app.post("/api/classes/bulk", async (req, res) => {
    try {
      const classesData = z.array(insertClassSchema).parse(req.body);
      const classes = await storage.bulkCreateClasses(classesData);
      res.json(classes);
    } catch (error) {
      res.status(400).json({ message: "Invalid class data" });
    }
  });

  // Assignments routes
  app.get("/api/assignments", async (req, res) => {
    try {
      const assignments = await storage.getAllAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assignments" });
    }
  });

  app.post("/api/assignments", async (req, res) => {
    try {
      const assignmentData = insertAssignmentSchema.parse(req.body);
      const assignment = await storage.createAssignment(assignmentData);
      res.json(assignment);
    } catch (error) {
      res.status(400).json({ message: "Invalid assignment data" });
    }
  });

  app.patch("/api/assignments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const assignment = await storage.updateAssignment(id, updates);
      
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update assignment" });
    }
  });

  app.delete("/api/assignments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteAssignment(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      
      res.json({ message: "Assignment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete assignment" });
    }
  });

  // User classes routes (for "My Classes" functionality)
  app.get("/api/user-classes/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userClasses = await storage.getUserClasses(userId);
      res.json(userClasses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user classes" });
    }
  });

  app.post("/api/user-classes", async (req, res) => {
    try {
      const userClassData = insertUserClassSchema.parse(req.body);
      const userClass = await storage.addUserClass(userClassData);
      res.json(userClass);
    } catch (error) {
      res.status(400).json({ message: "Invalid user class data" });
    }
  });

  app.delete("/api/user-classes/:userId/:classId", async (req, res) => {
    try {
      const { userId, classId } = req.params;
      const deleted = await storage.removeUserClass(userId, classId);
      
      if (!deleted) {
        return res.status(404).json({ message: "User class not found" });
      }
      
      res.json({ message: "Class removed from user" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove user class" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
