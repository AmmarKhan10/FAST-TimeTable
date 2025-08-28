import type { InsertClass } from "@shared/schema";

const SHEETS_URL = "https://docs.google.com/spreadsheets/d/1qL0Q5KVq3V1_fmprm9sAMz97a8P3wXjxVUpCrZbXRTM/gviz/tq?tqx=out:csv";

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

export async function parseGoogleSheetsData(): Promise<InsertClass[]> {
  try {
    const response = await fetch(SHEETS_URL);
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const classes: InsertClass[] = [];
    
    // Skip header rows and find the data section
    let currentDay = '';
    let roomName = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const cells = line.split(',').map(cell => cell.replace(/"/g, '').trim());
      
      // Check if this is a day header
      if (cells[0] && cells[0].toUpperCase().includes('MONDAY')) {
        currentDay = 'Monday';
        continue;
      } else if (cells[0] && cells[0].toUpperCase().includes('TUESDAY')) {
        currentDay = 'Tuesday';
        continue;
      } else if (cells[0] && cells[0].toUpperCase().includes('WEDNESDAY')) {
        currentDay = 'Wednesday';
        continue;
      } else if (cells[0] && cells[0].toUpperCase().includes('THURSDAY')) {
        currentDay = 'Thursday';
        continue;
      } else if (cells[0] && cells[0].toUpperCase().includes('FRIDAY')) {
        currentDay = 'Friday';
        continue;
      }
      
      // Check if this is a room row (contains room identifier)
      if (cells[0] && (cells[0].includes('E-') || cells[0].includes('R-') || cells[0].includes('A-') || cells[0].includes('B-') || cells[0].includes('C-') || cells[0].includes('D-'))) {
        roomName = cells[0];
        
        // Parse class data from this row
        for (let slotIndex = 1; slotIndex < cells.length && slotIndex <= 9; slotIndex++) {
          const cellContent = cells[slotIndex];
          if (cellContent && cellContent.length > 3 && !cellContent.includes('Reserved')) {
            
            // Parse class information from cell content
            const lines = cellContent.split('\n').filter(line => line.trim());
            if (lines.length >= 2) {
              const subjectLine = lines[0].trim();
              const teacherLine = lines[1].trim();
              
              // Extract subject and class code
              const subjectParts = subjectLine.split(' ');
              const classCode = subjectParts[subjectParts.length - 1];
              const subject = subjectParts.slice(0, -1).join(' ');
              
              if (subject && classCode && teacherLine && currentDay) {
                const timeSlot = timeSlots[slotIndex.toString() as keyof typeof timeSlots];
                
                if (timeSlot) {
                  classes.push({
                    classCode,
                    subject,
                    teacher: teacherLine,
                    room: roomName,
                    day: currentDay,
                    timeSlot: slotIndex.toString(),
                    startTime: timeSlot.start,
                    endTime: timeSlot.end,
                  });
                }
              }
            }
          }
        }
      }
    }
    
    return classes;
  } catch (error) {
    console.error("Failed to parse Google Sheets data:", error);
    return [];
  }
}
