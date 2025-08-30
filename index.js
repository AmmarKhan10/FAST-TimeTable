// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  classes;
  assignments;
  userClasses;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.classes = /* @__PURE__ */ new Map();
    this.assignments = /* @__PURE__ */ new Map();
    this.userClasses = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllClasses() {
    return Array.from(this.classes.values());
  }
  async getClassesByCode(classCode) {
    return Array.from(this.classes.values()).filter(
      (cls) => cls.classCode.toLowerCase().includes(classCode.toLowerCase())
    );
  }
  async getClassesByDay(day) {
    return Array.from(this.classes.values()).filter(
      (cls) => cls.day.toLowerCase() === day.toLowerCase()
    );
  }
  async searchClasses(query) {
    const searchTerm = query.toLowerCase();
    return Array.from(this.classes.values()).filter(
      (cls) => cls.classCode.toLowerCase().includes(searchTerm) || cls.subject.toLowerCase().includes(searchTerm) || cls.teacher.toLowerCase().includes(searchTerm) || cls.room.toLowerCase().includes(searchTerm)
    );
  }
  async createClass(classData) {
    const id = randomUUID();
    const classItem = { ...classData, id };
    this.classes.set(id, classItem);
    return classItem;
  }
  async bulkCreateClasses(classes2) {
    const createdClasses = [];
    for (const classData of classes2) {
      const existing = Array.from(this.classes.values()).find(
        (cls) => cls.classCode === classData.classCode && cls.subject === classData.subject && cls.teacher === classData.teacher && cls.room === classData.room && cls.day === classData.day && cls.timeSlot === classData.timeSlot
      );
      if (!existing) {
        const created = await this.createClass(classData);
        createdClasses.push(created);
      } else {
        createdClasses.push(existing);
      }
    }
    return createdClasses;
  }
  async getAllAssignments() {
    return Array.from(this.assignments.values());
  }
  async getAssignment(id) {
    return this.assignments.get(id);
  }
  async createAssignment(assignment) {
    const id = randomUUID();
    const newAssignment = {
      ...assignment,
      id,
      completed: assignment.completed || false,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.assignments.set(id, newAssignment);
    return newAssignment;
  }
  async updateAssignment(id, assignment) {
    const existing = this.assignments.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...assignment };
    this.assignments.set(id, updated);
    return updated;
  }
  async deleteAssignment(id) {
    return this.assignments.delete(id);
  }
  async getUserClasses(userId) {
    return Array.from(this.userClasses.values()).filter(
      (uc) => uc.userId === userId
    );
  }
  async addUserClass(userClass) {
    const id = randomUUID();
    const newUserClass = { ...userClass, id };
    this.userClasses.set(id, newUserClass);
    return newUserClass;
  }
  async removeUserClass(userId, classId) {
    const userClass = Array.from(this.userClasses.values()).find(
      (uc) => uc.userId === userId && uc.classId === classId
    );
    if (userClass) {
      return this.userClasses.delete(userClass.id);
    }
    return false;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var classes = pgTable("classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classCode: text("class_code").notNull(),
  subject: text("subject").notNull(),
  teacher: text("teacher").notNull(),
  room: text("room").notNull(),
  day: text("day").notNull(),
  timeSlot: text("time_slot").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull()
});
var assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  dueDate: text("due_date").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var userClasses = pgTable("user_classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  classId: varchar("class_id").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertClassSchema = createInsertSchema(classes).omit({
  id: true
});
var insertAssignmentSchema = createInsertSchema(assignments).omit({
  id: true,
  createdAt: true
});
var insertUserClassSchema = createInsertSchema(userClasses).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/classes", async (req, res) => {
    try {
      const { day, search, classCode } = req.query;
      console.log(`API request - day: '${day}', search: '${search}', classCode: '${classCode}'`);
      let classes2;
      if (search) {
        classes2 = await storage.searchClasses(search);
        console.log(`Search returned ${classes2.length} classes`);
        if (day && day !== "all") {
          classes2 = classes2.filter((cls) => cls.day.toLowerCase() === day.toLowerCase());
          console.log(`After day filter: ${classes2.length} classes`);
        }
      } else if (classCode) {
        classes2 = await storage.getClassesByCode(classCode);
        console.log(`ClassCode search returned ${classes2.length} classes`);
        if (day && day !== "all") {
          classes2 = classes2.filter((cls) => cls.day.toLowerCase() === day.toLowerCase());
          console.log(`After day filter: ${classes2.length} classes`);
        }
      } else if (day && day !== "all") {
        classes2 = await storage.getClassesByDay(day);
        console.log(`Day '${day}' filter returned ${classes2.length} classes`);
      } else {
        classes2 = await storage.getAllClasses();
        console.log(`GetAll returned ${classes2.length} classes`);
      }
      res.json(classes2);
    } catch (error) {
      console.error("API error:", error);
      res.status(500).json({ message: "Failed to fetch classes" });
    }
  });
  app2.post("/api/classes/bulk", async (req, res) => {
    try {
      const classesData = z.array(insertClassSchema).parse(req.body);
      const classes2 = await storage.bulkCreateClasses(classesData);
      res.json(classes2);
    } catch (error) {
      res.status(400).json({ message: "Invalid class data" });
    }
  });
  app2.get("/api/assignments", async (req, res) => {
    try {
      const assignments2 = await storage.getAllAssignments();
      res.json(assignments2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assignments" });
    }
  });
  app2.post("/api/assignments", async (req, res) => {
    try {
      const assignmentData = insertAssignmentSchema.parse(req.body);
      const assignment = await storage.createAssignment(assignmentData);
      res.json(assignment);
    } catch (error) {
      res.status(400).json({ message: "Invalid assignment data" });
    }
  });
  app2.patch("/api/assignments/:id", async (req, res) => {
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
  app2.delete("/api/assignments/:id", async (req, res) => {
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
  app2.get("/api/user-classes/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userClasses2 = await storage.getUserClasses(userId);
      res.json(userClasses2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user classes" });
    }
  });
  app2.post("/api/user-classes", async (req, res) => {
    try {
      const userClassData = insertUserClassSchema.parse(req.body);
      const userClass = await storage.addUserClass(userClassData);
      res.json(userClass);
    } catch (error) {
      res.status(400).json({ message: "Invalid user class data" });
    }
  });
  app2.delete("/api/user-classes/:userId/:classId", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
