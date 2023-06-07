import {Component, computed, effect, signal, Signal, WritableSignal} from '@angular/core';
import {Observable} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {Person} from "../../model/data";
import {TableRowSelectEvent} from "primeng/table";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['../page.component.scss', './people.component.scss']
})
export class PeopleComponent {

  public items: Signal<Person[]>;
  public selectedItem: WritableSignal<Person | undefined> = signal(undefined);
  public selectedItemText: Signal<string | undefined>;

  constructor(
    private readonly fs: AngularFirestore
  ){
    this.items = toSignal(this.fs.collection('people').valueChanges({ idField: 'id' })) as unknown as Signal<Person[]>;

    this.selectedItemText = computed(() => {
      return JSON.stringify(this.selectedItem(), null, 2);
    })
  }

  public onItemSelect($event: TableRowSelectEvent) {
    this.selectedItem.set($event.data as Person | undefined);
  }

  public onItemUnselect() {
    this.selectedItem.set(undefined);
  }

}
