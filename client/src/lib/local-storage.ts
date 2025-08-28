const MY_CLASSES_KEY = "fast-timetable-my-classes";

export function getMyClasses(): string[] {
  try {
    const saved = localStorage.getItem(MY_CLASSES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function addToMyClasses(classId: string): void {
  const myClasses = getMyClasses();
  if (!myClasses.includes(classId)) {
    myClasses.push(classId);
    localStorage.setItem(MY_CLASSES_KEY, JSON.stringify(myClasses));
  }
}

export function removeFromMyClasses(classId: string): void {
  const myClasses = getMyClasses();
  const filtered = myClasses.filter(id => id !== classId);
  localStorage.setItem(MY_CLASSES_KEY, JSON.stringify(filtered));
}

export function clearMyClasses(): void {
  localStorage.removeItem(MY_CLASSES_KEY);
}
