import { type User, type InsertUser, type Class, type InsertClass, type Assignment, type InsertAssignment, type UserClass, type InsertUserClass } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllClasses(): Promise<Class[]>;
  getClassesByCode(classCode: string): Promise<Class[]>;
  getClassesByDay(day: string): Promise<Class[]>;
  searchClasses(query: string): Promise<Class[]>;
  createClass(classData: InsertClass): Promise<Class>;
  bulkCreateClasses(classes: InsertClass[]): Promise<Class[]>;
  
  getAllAssignments(): Promise<Assignment[]>;
  getAssignment(id: string): Promise<Assignment | undefined>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  updateAssignment(id: string, assignment: Partial<Assignment>): Promise<Assignment | undefined>;
  deleteAssignment(id: string): Promise<boolean>;
  
  getUserClasses(userId: string): Promise<UserClass[]>;
  addUserClass(userClass: InsertUserClass): Promise<UserClass>;
  removeUserClass(userId: string, classId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private classes: Map<string, Class>;
  private assignments: Map<string, Assignment>;
  private userClasses: Map<string, UserClass>;

  constructor() {
    this.users = new Map();
    this.classes = new Map();
    this.assignments = new Map();
    this.userClasses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllClasses(): Promise<Class[]> {
    return Array.from(this.classes.values());
  }

  async getClassesByCode(classCode: string): Promise<Class[]> {
    return Array.from(this.classes.values()).filter(
      (cls) => cls.classCode.toLowerCase().includes(classCode.toLowerCase())
    );
  }

  async getClassesByDay(day: string): Promise<Class[]> {
    return Array.from(this.classes.values()).filter(
      (cls) => cls.day.toLowerCase() === day.toLowerCase()
    );
  }

  async searchClasses(query: string): Promise<Class[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.classes.values()).filter(
      (cls) => 
        cls.classCode.toLowerCase().includes(searchTerm) ||
        cls.subject.toLowerCase().includes(searchTerm) ||
        cls.teacher.toLowerCase().includes(searchTerm) ||
        cls.room.toLowerCase().includes(searchTerm)
    );
  }

  async createClass(classData: InsertClass): Promise<Class> {
    const id = randomUUID();
    const classItem: Class = { ...classData, id };
    this.classes.set(id, classItem);
    return classItem;
  }

  async bulkCreateClasses(classes: InsertClass[]): Promise<Class[]> {
    const createdClasses: Class[] = [];
    for (const classData of classes) {
      const created = await this.createClass(classData);
      createdClasses.push(created);
    }
    return createdClasses;
  }

  async getAllAssignments(): Promise<Assignment[]> {
    return Array.from(this.assignments.values());
  }

  async getAssignment(id: string): Promise<Assignment | undefined> {
    return this.assignments.get(id);
  }

  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const id = randomUUID();
    const newAssignment: Assignment = { 
      ...assignment, 
      id, 
      completed: assignment.completed || false,
      createdAt: new Date()
    };
    this.assignments.set(id, newAssignment);
    return newAssignment;
  }

  async updateAssignment(id: string, assignment: Partial<Assignment>): Promise<Assignment | undefined> {
    const existing = this.assignments.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...assignment };
    this.assignments.set(id, updated);
    return updated;
  }

  async deleteAssignment(id: string): Promise<boolean> {
    return this.assignments.delete(id);
  }

  async getUserClasses(userId: string): Promise<UserClass[]> {
    return Array.from(this.userClasses.values()).filter(
      (uc) => uc.userId === userId
    );
  }

  async addUserClass(userClass: InsertUserClass): Promise<UserClass> {
    const id = randomUUID();
    const newUserClass: UserClass = { ...userClass, id };
    this.userClasses.set(id, newUserClass);
    return newUserClass;
  }

  async removeUserClass(userId: string, classId: string): Promise<boolean> {
    const userClass = Array.from(this.userClasses.values()).find(
      (uc) => uc.userId === userId && uc.classId === classId
    );
    if (userClass) {
      return this.userClasses.delete(userClass.id);
    }
    return false;
  }
}

export const storage = new MemStorage();
