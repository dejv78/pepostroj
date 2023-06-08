import {Component, computed, effect, signal, Signal, WritableSignal} from '@angular/core';
import {Person, PersonWorkLog} from "../../model/data";
import {TableRowSelectEvent} from "primeng/table";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['../page.component.scss', './people.component.scss']
})
export class PeopleComponent {

  public items: Signal<Person[]> = signal([]);
  public selectedItem: WritableSignal<Person | undefined> = signal(undefined);
  public selectedItemText: Signal<string | undefined>;
  public workLog: PersonWorkLog = new PersonWorkLog();

  constructor(
    private readonly db: DataService
  ){
    this.items = db.getPeopleSignal();

    this.selectedItemText = computed(() => {
      return JSON.stringify(this.selectedItem(), null, 2);
    })

    effect(async () => {
      const selectedPerson = this.selectedItem();
      if (!!selectedPerson) {
        this.workLog.init(await db.getWorklogForPerson(selectedPerson.id));
      }
    })
  }

  public onItemSelect($event: TableRowSelectEvent) {
    this.selectedItem.set($event.data as Person | undefined);
  }

  public onItemUnselect() {
    this.selectedItem.set(undefined);
  }

}
