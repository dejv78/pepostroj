import {Component, computed, effect, signal, Signal, WritableSignal} from '@angular/core';
import {Project, ProjectWorkLog} from "../../model/data";
import {TableRowSelectEvent} from "primeng/table";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../page.component.scss', './projects.component.scss']
})
export class ProjectsComponent {

  public items: Signal<Project[]> = signal([]);
  public selectedItem: WritableSignal<Project | undefined> = signal(undefined);
  public selectedItemText: Signal<string | undefined>;
  public workLog: ProjectWorkLog = new ProjectWorkLog();

  constructor(
    private readonly db: DataService
  ){
    this.items = db.getProjectsSignal();

    this.selectedItemText = computed(() => {
      return JSON.stringify(this.selectedItem(), null, 2);
    })

    effect(async () => {
      const selectedProject = this.selectedItem();
      if (!!selectedProject) {
        this.workLog.init(await db.getWorklogForProject(selectedProject.id));
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
