import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
  standalone: true
})
export class CircleComponent implements AfterViewInit {
  @ViewChild('circle', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() backgroundColor: string = 'white';

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(25, 25, 20, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}
