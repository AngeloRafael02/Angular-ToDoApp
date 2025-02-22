import { Component,OnInit } from '@angular/core';
import { PostgresService } from '../../services/postgres.service';
@Component({
  selector: 'app-to-do-list',
  imports: [],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit {

  constructor(
    private psql:PostgresService
  ){}

  public sampleData:unknown;

  ngOnInit(): void {
    this.sampleData = this.psql.ToDoListSampleData()
  }



}
