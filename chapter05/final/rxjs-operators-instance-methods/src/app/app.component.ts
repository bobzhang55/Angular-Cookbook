import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  cartoonsStreamData = ['thunder cats', 'Dragon Ball Z', 'Ninja Turtles'];
  outputStreamData = [];

  ngOnInit() {}

  startStream() {

    const inputStreamData = interval(1500).pipe(
      map((output) => output % this.inputStreamData.length),
      map((index) => this.inputStreamData[index])
    );

    const cartoonStreamSource = interval(5000).pipe(
      map((output) => output % this.cartoonsStreamData.length),
      map((index) => this.cartoonsStreamData[index])
    );
    // Merging the two streams
    this.subscription = inputStreamData.pipe(merge(cartoonStreamSource))
      .subscribe((element) => {
        this.outputStreamData.push(element);
      });
  }

  stopStream() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
