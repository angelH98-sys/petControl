import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'petControl';
  matContainerHeight: number;

  ngOnInit(): void{
    
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    let windowHeight = window.innerHeight;
    this.matContainerHeight = windowHeight - 114;
    document.getElementById('drawerContainer').style.minHeight
       = this.matContainerHeight.toString() + 'px';
  }
}
