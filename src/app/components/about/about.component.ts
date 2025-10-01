import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { MiscService } from '../../services/misc/misc.service';

@Component({
  selector: 'app-about',
  imports: [
    MarkdownModule
  ], 
  template: `
  <div id="aboutContainer" style="overflow-y:scroll;">
  <p>
  <markdown  class="variable-binding" [data]="FileContent"></markdown>

  </p>     
  </div>


  `,
  styles: `
    h2,p{color:white;}
    #aboutContainer{
      padding-left:30px;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
    }
  `
})
export class AboutComponent implements OnInit {

  constructor(
    private misc:MiscService
  ){}
  public FileContent:string = '';

  ngOnInit(): void {
    this.misc.getFileContent('/assets/About.md').subscribe({
      next: (content: string) => {
        this.FileContent = content;
        //console.log('Server file content:', this.FileContent);
      },
      error: (err) => {
        //console.error('Error reading server file:', err);
      }
    });
  }
}
