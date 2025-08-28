import type { InsertClass } from "@shared/schema";

const SHEETS_URL = "https://docs.google.com/spreadsheets/d/1qL0Q5KVq3V1_fmprm9sAMz97a8P3wXjxVUpCrZbXRTM/export?format=csv&gid=1358384554";

// Time slot mappings from the spreadsheet
const timeSlots = {
  "1": { start: "8:00 AM", end: "8:50 AM" },
  "2": { start: "8:55 AM", end: "9:45 AM" },
  "3": { start: "9:50 AM", end: "10:40 AM" },
  "4": { start: "10:45 AM", end: "11:35 AM" },
  "5": { start: "11:40 AM", end: "12:30 PM" },
  "6": { start: "12:35 PM", end: "1:25 PM" },
  "7": { start: "1:30 PM", end: "2:20 PM" },
  "8": { start: "2:25 PM", end: "3:15 PM" },
  "9": { start: "3:20 PM", end: "4:05 PM" },
};

// Your actual BCS-1K timetable based on your Google Sheets data
function getSampleClassData(): InsertClass[] {
  return [
    // BCS-1K Monday Classes - based on your actual spreadsheet
    { classCode: "BCS-1K", subject: "ICP", teacher: "Jahan Ara (VF)", room: "E-29 Academic Block II (52)", day: "Monday", timeSlot: "4", startTime: "10:45 AM", endTime: "11:35 AM" },
    { classCode: "BCS-1K", subject: "IST", teacher: "Abdullah Siddqui", room: "E-30 Academic Block II (52)", day: "Monday", timeSlot: "2", startTime: "8:55 AM", endTime: "9:45 AM" },
    { classCode: "BCS-1K", subject: "CAL", teacher: "Asma Masood", room: "E-30 Academic Block II (52)", day: "Monday", timeSlot: "3", startTime: "9:50 AM", endTime: "10:40 AM" },
    { classCode: "BCS-1K", subject: "FE", teacher: "Javeria Ali Wadho", room: "E-32 Academic Block II (52)", day: "Monday", timeSlot: "6", startTime: "12:35 PM", endTime: "1:25 PM" },
    { classCode: "BCS-1K", subject: "FE", teacher: "Javeria Ali Wadho", room: "E-32 Academic Block II (52)", day: "Monday", timeSlot: "7", startTime: "1:30 PM", endTime: "2:20 PM" },

    // BCS-1K Tuesday Classes - Based on your actual schedule
    { classCode: "BCS-1K", subject: "IST", teacher: "Abdullah Siddqui", room: "E-30 Academic Block II (52)", day: "Tuesday", timeSlot: "1", startTime: "8:00 AM", endTime: "8:50 AM" },
    { classCode: "BCS-1K", subject: "CAL", teacher: "Asma Masood", room: "E-30 Academic Block II (52)", day: "Tuesday", timeSlot: "2", startTime: "8:55 AM", endTime: "9:45 AM" },
    { classCode: "BCS-1K", subject: "PF", teacher: "Uzma Raza (VF)", room: "C-17 Academic Block II (59)", day: "Tuesday", timeSlot: "4", startTime: "10:45 AM", endTime: "11:35 AM" },
    { classCode: "BCS-1K", subject: "ICP", teacher: "Jahan Ara (VF)", room: "E-30 Academic Block II (52)", day: "Tuesday", timeSlot: "5", startTime: "11:40 AM", endTime: "12:30 PM" },
    { classCode: "BCS-1K", subject: "FE Lab", teacher: "Javeriya Ahmed", room: "LLC Academic Block I (R7) (50)", day: "Tuesday", timeSlot: "7", startTime: "1:30 PM", endTime: "4:05 PM" },

    // Wednesday - NO BCS-1K classes

    // BCS-1K Thursday Classes  
    { classCode: "BCS-1K", subject: "FE", teacher: "Javeriya Ahmed", room: "D-28 Academic Block II (50)", day: "Thursday", timeSlot: "4", startTime: "10:45 AM", endTime: "11:35 AM" },
    { classCode: "BCS-1K", subject: "ICP", teacher: "Muhammad Adeel", room: "D-28 Academic Block II (50)", day: "Thursday", timeSlot: "5", startTime: "11:40 AM", endTime: "12:30 PM" },

    // BCS-1K Friday Classes
    { classCode: "BCS-1K", subject: "CAL", teacher: "Asma Masood", room: "E-30 Academic Block II (52)", day: "Friday", timeSlot: "6", startTime: "12:35 PM", endTime: "1:25 PM" },
    { classCode: "BCS-1K", subject: "AP", teacher: "Ishtiaq Ahmed", room: "E-30 Academic Block II (52)", day: "Friday", timeSlot: "8", startTime: "2:25 PM", endTime: "3:15 PM" },
    
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

// Helper function to convert 24-hour time to 12-hour format
function convertTo12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minutes} ${ampm}`;
}

// Helper function to parse class code from cell content
function parseClassCode(cellContent: string): string | null {
  const match = cellContent.match(/([A-Z]+(?:-\d+[A-Z]?)+)/);
  return match ? match[1] : null;
}

// Helper function to parse subject from cell content
function parseSubject(cellContent: string): string {
  const parts = cellContent.split('<br>')[0].trim();
  const classCodeMatch = parts.match(/^([A-Z]+(?:\s+[A-Z]+)*)\s+([A-Z]+(?:-\d+[A-Z]?)+)/);
  return classCodeMatch ? classCodeMatch[1] : parts.split(' ')[0];
}

// Helper function to parse teacher from cell content
function parseTeacher(cellContent: string): string {
  const parts = cellContent.split('<br>');
  return parts.length > 1 ? parts[1].trim() : '';
}

export async function parseGoogleSheetsData(): Promise<InsertClass[]> {
  try {
    console.log("Fetching real data from Google Sheets...");
    const response = await fetch(SHEETS_URL);
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const classes: InsertClass[] = [];
    
    // Find Monday section
    let currentDay = '';
    let venueRowIndex = -1;
    let timeRowIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Detect day headers
      if (line.includes('MONDAY')) {
        currentDay = 'Monday';
        continue;
      } else if (line.includes('TUESDAY')) {
        currentDay = 'Tuesday';
        continue;
      } else if (line.includes('WEDNESDAY')) {
        currentDay = 'Wednesday';
        continue;
      } else if (line.includes('THURSDAY')) {
        currentDay = 'Thursday';
        continue;
      } else if (line.includes('FRIDAY')) {
        currentDay = 'Friday';
        continue;
      }
      
      // Find time slots row
      if (line.includes('08:00-8:50') || line.includes('Venues/time')) {
        timeRowIndex = i;
        const timeRow = line.split(',');
        continue;
      }
      
      // Process classroom rows
      if (currentDay && line.includes('Academic Block') && !line.includes('CLASSROOMS')) {
        const cells = line.split(',');
        const roomName = cells[0]?.trim();
        
        if (!roomName) continue;
        
        // Process each time slot (skip first cell which is room name)
        for (let slotIndex = 1; slotIndex < Math.min(cells.length, 10); slotIndex++) {
          const cellContent = cells[slotIndex]?.trim();
          
          if (!cellContent || cellContent === '') continue;
          
          // Parse class information
          const classCode = parseClassCode(cellContent);
          const subject = parseSubject(cellContent);
          const teacher = parseTeacher(cellContent);
          
          if (!classCode || !subject) continue;
          
          // Get time slot
          const timeSlot = timeSlots[slotIndex.toString() as keyof typeof timeSlots];
          if (!timeSlot) continue;
          
          classes.push({
            classCode,
            subject,
            teacher,
            room: roomName,
            day: currentDay,
            timeSlot: slotIndex.toString(),
            startTime: timeSlot.start,
            endTime: timeSlot.end
          });
        }
      }
    }
    
    console.log("Real data loaded successfully!");
    console.log("Total classes loaded:", classes.length);
    const bcs1kClasses = classes.filter(c => c.classCode === 'BCS-1K');
    const bseeClasses = classes.filter(c => c.classCode.includes('BSEE'));
    console.log("BCS-1K classes found:", bcs1kClasses.length);
    console.log("BSEE classes found:", bseeClasses.length);
    
    return classes;
  } catch (error) {
    console.error("Failed to parse Google Sheets data:", error);
    console.log("Falling back to sample data");
    const fallbackClasses = getSampleClassData();
    console.log("Fallback data loaded:", fallbackClasses.length);
    return fallbackClasses;
  }
}
