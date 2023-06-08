import {Timestamp} from "@angular/fire/firestore";
import {push} from "@angular/fire/database";

export interface ProjectDAO {
  id: string;
  code: string;
  description: string;
  finished?: Timestamp;
}

export interface WorkLogDAO {
  id: string;
  projectId: string;
  personId: string;
  date: Timestamp;
  hours: number;
  note: string;
}

export interface Project {
  id: string;
  code: string;
  description: string;
  finished?: Date;
}

export interface Person {
  id: string;
  name: string;
}

export interface WorkLog {
  id: string;
  project: Project;
  person: Person;
  date: Date;
  hours: number;
  note: string;
}

export interface User {
  id: string;
  roles: string[];
}

export class ProjectWorkLog {

  public totalHours: number = 0;
  public log: WorkLogItem[] = [];

  public init(workLog: WorkLog[]) {
    this.totalHours = 0;
    this.log = [];

    for (const w of workLog) {
      if (!this.log.some(l => l.name == w.person.name)) {
        this.log.push({
          name: w.person.name,
          totalHours: 0,
          log: []
        })
      }
      const pw: WorkLogItem | undefined = this.log.find(l => l.name == w.person.name);
      if (!!pw) {
        pw.totalHours += w.hours;
        pw.log.push(w);
        this.totalHours += w.hours;
        pw.log.sort((a, b) => {
          return (a.date < b.date) ? -1 : 1;
        })
      }
    }
    this.log.sort((a, b) => {
      return (a.totalHours >= b.totalHours) ? -1 : 1;
    })
  }
}


export class PersonWorkLog {

  public totalHours: number = 0;
  public log: WorkLogItem[] = [];

  public init(workLog: WorkLog[]) {
    this.totalHours = 0;
    this.log = [];

    for (const w of workLog) {
      if (!this.log.some(l => l.name == w.project.description)) {
        this.log.push({
          name: w.project.description,
          totalHours: 0,
          log: []
        })
      }
      const pw: WorkLogItem | undefined = this.log.find(l => l.name == w.project.description);
      if (!!pw) {
        pw.totalHours += w.hours;
        pw.log.push(w);
        this.totalHours += w.hours;
        pw.log.sort((a, b) => {
          return (a.date < b.date) ? -1 : 1;
        })
      }
    }
    this.log.sort((a, b) => {
      return (a.totalHours >= b.totalHours) ? -1 : 1;
    })
  }
}


export interface WorkLogItem {
  name: string;
  totalHours: number;
  log: WorkLog[];
}
