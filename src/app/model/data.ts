export interface Project {
  id: string;
  code: string;
  description: string;
  finished: boolean;
}

export interface Person {
  id: string;
  code: string;
  name: string;
}

export interface WorkLog {
  id: string;
  projectId: string;
  personId: string;
  date: string;
  hours: number;
  note: string;
}
