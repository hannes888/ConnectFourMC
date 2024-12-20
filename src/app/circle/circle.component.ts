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
  borderColor: string = 'black';

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.backgroundColor === 'red') {
        this.borderColor = this.backgroundColor;
      } else if (this.backgroundColor === 'yellow') {
        this.backgroundColor = '#005cbb';
        this.borderColor = this.backgroundColor;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas to reset drawing
      ctx.beginPath();
      ctx.arc(25, 25, 20, 0, 2 * Math.PI);  // Draw the circle path
      ctx.fillStyle = this.backgroundColor;  // Set the fill color (inside the circle)
      ctx.fill();  // Fill the circle with the current fill color
      ctx.strokeStyle = this.borderColor;
      ctx.stroke();
    }
  }
}
