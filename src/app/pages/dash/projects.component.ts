import {Component, computed, effect, signal, Signal, WritableSignal} from '@angular/core';
import {firstValueFrom, lastValueFrom, map, Observable} from "rxjs";
import {Person, Project, WorkLog} from "../../model/data";
import {toSignal} from "@angular/core/rxjs-interop";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TableRowSelectEvent} from "primeng/table";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../page.component.scss', './projects.component.scss']
})
export class ProjectsComponent {

  public items: Signal<Project[]> = signal([]);
  public selectedItem: WritableSignal<Project | undefined> = signal(undefined);
  public selectedItemText: Signal<string | undefined>;
  public workLog: WorkLog[] = [];

  constructor(
    private readonly fs: AngularFirestore
  ){
    this.items = toSignal(this.fs.collection('projects').valueChanges({ idField: 'id' })) as unknown as Signal<Project[]>;

    this.selectedItemText = computed(() => {
      return JSON.stringify(this.selectedItem(), null, 2);
    })

    effect(async () => {
      const selectedProject = this.selectedItem();
      if (!!selectedProject) {
        console.log(`selected: ${selectedProject.id}`);
        this.workLog = await firstValueFrom(this.fs.collection('time', ref => ref.where('projectId', '==', selectedProject.id)).valueChanges({ idField: 'id' }).pipe(
          map(items => {
            const ims: any = items.map((item: any) => {return {...item, date: item.date.toDate()}});
            console.log(JSON.stringify(ims));
            return ims;
          })
        )) as unknown as WorkLog[];
        console.log(this.workLog);
      }
    })
  }

  public onItemSelect($event: TableRowSelectEvent) {
    this.selectedItem.set($event.data as Project | undefined);
  }

  public onItemUnselect() {
    this.selectedItem.set(undefined);
  }

}
