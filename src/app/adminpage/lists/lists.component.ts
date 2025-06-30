import { Component, inject, OnInit } from '@angular/core';
import { ListsService } from '../services/lists.service';

@Component({
  selector: 'app-lists',
  imports: [],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
})
export class ListsComponent implements OnInit {
  private listService = inject(ListsService);
  lists = this.listService.getListsSignal();

  ngOnInit(): void {
    this.listService.getLists().subscribe((data) => {
      this.lists.set(data);
    });
  }
}
