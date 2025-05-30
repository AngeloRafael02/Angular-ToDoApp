import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { MiscService } from '../../services/misc.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; 

@Component({
  selector: 'app-about',
  imports: [
    MarkdownModule
  ], 
  template: `
  <div id="aboutContainer">
    <p>{{FileContent}}asd</p>
  </div>
  `,
  styles: `
    h2,p{color:white;}
    #aboutContainer{padding-left:30px; border: 1px solid red; width:600px;}
  `
})
export class AboutComponent implements OnInit {

  constructor(
    private misc:MiscService
  ){}
  public FileContent:string = '';
  public markdown:string = `## Markdown __rulez__!
---
### Lists
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet

### Blockquote
> Blockquote to the max`;

  ngOnInit(): void {
    this.misc.getFileContent('/src/assets/README.md').subscribe({
      next: (content: string) => {
        this.FileContent = content;
        console.log('Server file content:', this.FileContent);
      },
      error: (err) => {
        console.error('Error reading server file:', err);
      }
    });
  }
}
