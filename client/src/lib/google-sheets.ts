import type { InsertClass } from "@shared/schema";

const SHEETS_URL = "https://docs.google.com/spreadsheets/d/1qL0Q5KVq3V1_fmprm9sAMz97a8P3wXjxVUpCrZbXRTM/export?format=csv&gid=1358384554";

// Time slot mappings from the spreadsheet
const timeSlots = {
  "1": { start: "08:00", end: "08:50" },
  "2": { start: "08:55", end: "09:45" },
  "3": { start: "09:50", end: "10:40" },
  "4": { start: "10:45", end: "11:35" },
  "5": { start: "11:40", end: "12:30" },
  "6": { start: "12:35", end: "13:25" },
  "7": { start: "13:30", end: "14:20" },
  "8": { start: "14:25", end: "15:15" },
  "9": { start: "15:20", end: "16:05" },
};

// Sample data based on the actual spreadsheet structure until Google Sheets API access is properly configured
function getSampleClassData(): InsertClass[] {
  return [
    // BCS-1K Classes (your class) - Monday
    { classCode: "BCS-1K", subject: "ICP", teacher: "Jahan Ara (VF)", room: "E-29 Academic Block II (52)", day: "Monday", timeSlot: "4", startTime: "10:45", endTime: "11:35" },
    { classCode: "BCS-1K", subject: "IST", teacher: "Abdullah Siddqui", room: "E-30 Academic Block II (52)", day: "Monday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BCS-1K", subject: "CAL", teacher: "Asma Masood", room: "E-30 Academic Block II (52)", day: "Monday", timeSlot: "3", startTime: "09:50", endTime: "10:40" },
    { classCode: "BCS-1K", subject: "FE", teacher: "Javeria Ali Wadho", room: "E-32 Academic Block II (52)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BCS-1K", subject: "FE", teacher: "Javeria Ali Wadho", room: "E-32 Academic Block II (52)", day: "Monday", timeSlot: "7", startTime: "13:30", endTime: "14:20" },

    // BCS-1K Classes - Tuesday
    { classCode: "BCS-1K", subject: "PF", teacher: "Syed Ahmed Khan", room: "D-28 Academic Block II (50)", day: "Tuesday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BCS-1K", subject: "FE", teacher: "Qurat ul Ain", room: "D-28 Academic Block II (50)", day: "Tuesday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    { classCode: "BCS-1K", subject: "ICP", teacher: "Jahan Ara (VF)", room: "D-28 Academic Block II (50)", day: "Tuesday", timeSlot: "9", startTime: "15:20", endTime: "16:05" },

    // BCS-1K Classes - Wednesday  
    { classCode: "BCS-1K", subject: "CAL", teacher: "Asma Masood", room: "E-30 Academic Block II (52)", day: "Wednesday", timeSlot: "3", startTime: "09:50", endTime: "10:40" },
    { classCode: "BCS-1K", subject: "AP", teacher: "Ishtiaq Ahmed", room: "D-28 Academic Block II (50)", day: "Wednesday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },

    // BCS-1K Classes - Thursday
    { classCode: "BCS-1K", subject: "FE", teacher: "Javeriya Ahmed", room: "D-28 Academic Block II (50)", day: "Thursday", timeSlot: "4", startTime: "10:45", endTime: "11:35" },
    { classCode: "BCS-1K", subject: "ICP", teacher: "Khushboo", room: "D-28 Academic Block II (50)", day: "Thursday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },

    // BCS-1K Classes - Friday
    { classCode: "BCS-1K", subject: "CAL", teacher: "Asma Masood", room: "E-30 Academic Block II (52)", day: "Friday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BCS-1K", subject: "AP", teacher: "Ishtiaq Ahmed", room: "E-30 Academic Block II (52)", day: "Friday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    
    // BSEE-1B Classes - Monday
    { classCode: "BSEE-1B", subject: "ENG", teacher: "Ms. Huma Hafeez", room: "C-13 Academic Block II (50)", day: "Monday", timeSlot: "3", startTime: "09:50", endTime: "10:40" },
    { classCode: "BSEE-1B", subject: "AC", teacher: "Engr. Aamir Ali", room: "C-14 Academic Block II (50)", day: "Monday", timeSlot: "4", startTime: "10:45", endTime: "11:35" },
    { classCode: "BSEE-1B", subject: "IST", teacher: "Dr. Hassan Saeed", room: "C-12 Academic Block II (50)", day: "Monday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },
    { classCode: "BSEE-1B", subject: "IST", teacher: "Dr. Hassan Saeed", room: "C-12 Academic Block II (50)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    
    // BSEE-1B Classes - Tuesday  
    { classCode: "BSEE-1B", subject: "ENA", teacher: "Dr. Junaid Rabbani", room: "C-13 Academic Block II (50)", day: "Tuesday", timeSlot: "1", startTime: "08:00", endTime: "08:50" },
    { classCode: "BSEE-1B", subject: "ENA", teacher: "Dr. Junaid Rabbani", room: "C-13 Academic Block II (50)", day: "Tuesday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BSEE-1B", subject: "ENA", teacher: "Dr. Junaid Rabbani", room: "C-13 Academic Block II (50)", day: "Tuesday", timeSlot: "4", startTime: "10:45", endTime: "11:35" },
    { classCode: "BSEE-1B", subject: "ENA", teacher: "Dr. Junaid Rabbani", room: "C-13 Academic Block II (50)", day: "Tuesday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },
    
    // BSEE-1C Classes
    { classCode: "BSEE-1C", subject: "IST", teacher: "Dr. Shahzad Shaikh", room: "C-14 Academic Block II (50)", day: "Monday", timeSlot: "1", startTime: "08:00", endTime: "08:50" },
    { classCode: "BSEE-1C", subject: "IST", teacher: "Dr. Shahzad Shaikh", room: "C-14 Academic Block II (50)", day: "Monday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BSEE-1C", subject: "AC", teacher: "Engr. Qurat ul Ain", room: "C-15 Academic Block II (50)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BSEE-1C", subject: "ENG", teacher: "Ms. Tahira", room: "C-13 Academic Block II (50)", day: "Monday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    { classCode: "BSEE-1C", subject: "ENG", teacher: "Ms. Tahira", room: "C-13 Academic Block II (50)", day: "Monday", timeSlot: "9", startTime: "15:20", endTime: "16:05" },
    
    // BSEE-1A Classes
    { classCode: "BSEE-1A", subject: "ENG", teacher: "Ms. Huma Hafeez", room: "C-15 Academic Block II (50)", day: "Monday", timeSlot: "1", startTime: "08:00", endTime: "08:50" },
    { classCode: "BSEE-1A", subject: "ENG", teacher: "Ms. Huma Hafeez", room: "C-15 Academic Block II (50)", day: "Monday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BSEE-1A", subject: "AC", teacher: "Engr. Qurat ul Ain", room: "C-14 Academic Block II (50)", day: "Monday", timeSlot: "3", startTime: "09:50", endTime: "10:40" },
    { classCode: "BSEE-1A", subject: "UoS", teacher: "Dr. Hassan Saeed", room: "C-14 Academic Block II (50)", day: "Monday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    
    // Other BCS classes for variety
    { classCode: "BCS-1A", subject: "PF", teacher: "Sobia Iftikhar", room: "D-26 Academic Block II (50)", day: "Monday", timeSlot: "7", startTime: "13:30", endTime: "14:20" },
    { classCode: "BCS-1A", subject: "AP", teacher: "Muhammad Rahim", room: "E-29 Academic Block II (52)", day: "Monday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },
    { classCode: "BCS-1A", subject: "CAL", teacher: "Aneesa Nawaz", room: "E-29 Academic Block II (52)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    
    { classCode: "BCS-1B", subject: "AP", teacher: "Ishtiaq Ahmed", room: "D-26 Academic Block II (50)", day: "Monday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },
    { classCode: "BCS-1B", subject: "PF", teacher: "Sobia Iftikhar", room: "D-26 Academic Block II (50)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BCS-1B", subject: "ICP", teacher: "Muhammad Adeel", room: "D-26 Academic Block II (50)", day: "Monday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    
    { classCode: "BCS-1C", subject: "FE", teacher: "Faiza Mumtaz", room: "D-27 Academic Block II (50)", day: "Monday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },
    { classCode: "BCS-1C", subject: "AP", teacher: "Muhammad Rahim", room: "D-27 Academic Block II (50)", day: "Monday", timeSlot: "7", startTime: "13:30", endTime: "14:20" },
    { classCode: "BCS-1C", subject: "CAL", teacher: "Aneesa Nawaz", room: "D-27 Academic Block II (50)", day: "Monday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    { classCode: "BCS-1C", subject: "ICP", teacher: "Khushboo", room: "D-27 Academic Block II (50)", day: "Monday", timeSlot: "9", startTime: "15:20", endTime: "16:05" },
    
    { classCode: "BCS-1D", subject: "PF", teacher: "Hajra Ahmed", room: "D-26 Academic Block II (50)", day: "Monday", timeSlot: "1", startTime: "08:00", endTime: "08:50" },
    { classCode: "BCS-1D", subject: "FE", teacher: "Javeriya Ahmed", room: "D-26 Academic Block II (50)", day: "Monday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BCS-1D", subject: "ICP", teacher: "Muhammad Adeel", room: "D-27 Academic Block II (50)", day: "Monday", timeSlot: "4", startTime: "10:45", endTime: "11:35" },
    { classCode: "BCS-1D", subject: "AP", teacher: "Ishtiaq Ahmed", room: "D-28 Academic Block II (50)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BCS-1D", subject: "IST", teacher: "Farhan Ali Memon", room: "D-28 Academic Block II (50)", day: "Monday", timeSlot: "7", startTime: "13:30", endTime: "14:20" },
    { classCode: "BCS-1D", subject: "ICP", teacher: "Muhammad Adeel", room: "D-26 Academic Block II (50)", day: "Monday", timeSlot: "9", startTime: "15:20", endTime: "16:05" },
    
    // BSCE Classes
    { classCode: "BSCE-1A", subject: "ICP", teacher: "Dr. Shahnawaz", room: "C-15 Academic Block II (50)", day: "Monday", timeSlot: "3", startTime: "09:50", endTime: "10:40" },
    { classCode: "BSCE-1A", subject: "ICP", teacher: "Dr. Shahnawaz", room: "C-15 Academic Block II (50)", day: "Monday", timeSlot: "4", startTime: "10:45", endTime: "11:35" },
    { classCode: "BSCE-1A", subject: "IST", teacher: "Dr. Shahzad Shaikh", room: "C-13 Academic Block II (50)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BSCE-1A", subject: "IST", teacher: "Dr. Shahzad Shaikh", room: "C-13 Academic Block II (50)", day: "Monday", timeSlot: "7", startTime: "13:30", endTime: "14:20" },
    
    { classCode: "BSCE-1B", subject: "IST", teacher: "Dr. Shahzad Shaikh", room: "C-14 Academic Block II (50)", day: "Monday", timeSlot: "1", startTime: "08:00", endTime: "08:50" },
    { classCode: "BSCE-1B", subject: "IST", teacher: "Dr. Shahzad Shaikh", room: "C-14 Academic Block II (50)", day: "Monday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BSCE-1B", subject: "AC", teacher: "Engr. Qurat ul Ain", room: "C-15 Academic Block II (50)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BSCE-1B", subject: "ENG", teacher: "Ms. Tahira", room: "C-13 Academic Block II (50)", day: "Monday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    { classCode: "BSCE-1B", subject: "ENG", teacher: "Ms. Tahira", room: "C-13 Academic Block II (50)", day: "Monday", timeSlot: "9", startTime: "15:20", endTime: "16:05" },
    
    // Higher semester classes
    { classCode: "BCS-3A", subject: "DS", teacher: "Dr. Jawwad Shamsi", room: "R-12 Academic Block I (70)", day: "Monday", timeSlot: "2", startTime: "08:55", endTime: "09:45" },
    { classCode: "BCS-3A", subject: "COAL", teacher: "Aashir Mehboob", room: "A-7 Academic Block II (50)", day: "Monday", timeSlot: "1", startTime: "08:00", endTime: "08:50" },
    { classCode: "BCS-3A", subject: "TOA", teacher: "Ubaidullah", room: "C-17 Academic Block II (59)", day: "Monday", timeSlot: "4", startTime: "10:45", endTime: "11:35" },
    { classCode: "BCS-3A", subject: "Discrete", teacher: "Dr. Nouman Durrani", room: "C-17 Academic Block II (59)", day: "Monday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },
    
    { classCode: "BCS-5A", subject: "DAA", teacher: "Muhammad Kashif", room: "E-1 Academic Block I (50)", day: "Monday", timeSlot: "5", startTime: "11:40", endTime: "12:30" },
    { classCode: "BCS-5A", subject: "DBS", teacher: "Hajra Ahmed", room: "E-1 Academic Block I (50)", day: "Monday", timeSlot: "6", startTime: "12:35", endTime: "13:25" },
    { classCode: "BCS-5A", subject: "CN", teacher: "Dr. Farrukh Salim", room: "E-1 Academic Block I (50)", day: "Monday", timeSlot: "8", startTime: "14:25", endTime: "15:15" },
    { classCode: "BCS-5A", subject: "SDA", teacher: "Engr. Abdul Rahman", room: "E-1 Academic Block I (50)", day: "Monday", timeSlot: "9", startTime: "15:20", endTime: "16:05" },
  ];
}

export async function parseGoogleSheetsData(): Promise<InsertClass[]> {
  try {
    // For now, return the sample data that includes your BCS-1K classes
    // In a production app, this would parse the actual Google Sheets data
    const classes = getSampleClassData();
    
    console.log("Loading sample timetable data");
    console.log("Total classes loaded:", classes.length);
    const bcs1kClasses = classes.filter(c => c.classCode.includes('BCS-1K'));
    const bseeClasses = classes.filter(c => c.classCode.includes('BSEE-1B'));
    console.log("BCS-1K classes found:", bcs1kClasses.length);
    console.log("BSEE-1B classes found:", bseeClasses.length);
    
    return classes;
  } catch (error) {
    console.error("Failed to load timetable data:", error);
    return [];
  }
}
