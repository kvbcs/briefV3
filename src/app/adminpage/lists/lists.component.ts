import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Lists } from '../../../model/types';

@Component({
  selector: 'app-lists',
  imports: [],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
})
export class ListsComponent implements OnInit{
  private http = inject(HttpClient);
  lists = signal<Lists[]>([]);

  ngOnInit(): void {
    this.http.get<Lists[]>('/assets/lists.json').subscribe((data) => {

      this.lists.set(data);
    });
  }
}
