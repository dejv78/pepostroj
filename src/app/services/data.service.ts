import {Injectable, Signal} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Timestamp} from "@angular/fire/firestore";
import {Person, Project, ProjectDAO, WorkLog, WorkLogDAO} from "../model/data";
import {toSignal} from "@angular/core/rxjs-interop";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(
    private readonly db: AngularFirestore
  ){
  }

  public getProjectsSignal(): Signal<Project[]> {
    return toSignal(this.db.collection('projects').valueChanges({ idField: 'id' }).pipe(
      map(items => (items as ProjectDAO[]).map(this.fromProjectDAO))
    )) as unknown as Signal<Project[]>;
  }

  public getPeopleSignal(): Signal<Person[]> {
    return toSignal(this.db.collection('people').valueChanges({ idField: 'id' })) as unknown as Signal<Person[]>;
  }


  public async getWorklogForProject(projectId: string): Promise<WorkLog[]> {
    const wl = await firstValueFrom(this.db.collection('time', ref => ref.where('projectId', '==', projectId)).valueChanges({ idField: 'id' }).pipe(
      map(items => {
        return (items as WorkLogDAO[]).map(async (item: WorkLogDAO) => await this.fromWorkLogDAO(item));
      })
    )) as unknown as WorkLog[];

    const result: WorkLog[] = [];
    for (const w of wl) {
      result.push(await w);
    }
    return result;
  }

  public async getWorklogForPerson(personId: string): Promise<WorkLog[]> {
    const wl = await firstValueFrom(this.db.collection('time', ref => ref.where('personId', '==', personId)).valueChanges({ idField: 'id' }).pipe(
      map(items => {
        return (items as WorkLogDAO[]).map(async (item: WorkLogDAO) => await this.fromWorkLogDAO(item));
      })
    )) as unknown as WorkLog[];

    const result: WorkLog[] = [];
    for (const w of wl) {
      result.push(await w);
    }
    return result;
  }

  public async getProject(projectId: string): Promise<Project> {
    return await firstValueFrom(this.db.doc(`projects/${projectId}`).valueChanges({idField: 'id'}).pipe(
      map(items => this.fromProjectDAO(items as ProjectDAO))
    ))
  }


  public async getPerson(personId: string): Promise<Person> {
    return await firstValueFrom(this.db.doc(`people/${personId}`).valueChanges({idField: 'id'})) as unknown as Person;
  }


  private fromProjectDAO(p: ProjectDAO): Project {
    const f: Timestamp | undefined = p.finished;
    if (!!f) {
      return {
        ...p,
        finished: f.toDate()
      }
    }
    return p as Project;
  }

  private async fromWorkLogDAO(w: WorkLogDAO): Promise<WorkLog> {
    return {
      id: w.id,
      project: await this.getProject(w.projectId),
      person: await this.getPerson(w.personId),
      date: w.date.toDate(),
      hours: w.hours,
      note: w.note,
    }
  }

}
