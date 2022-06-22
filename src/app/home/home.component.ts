import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Observer, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}
  private counterRef: Subscription;

  ngOnInit() {
    // this.counterRef = interval(1000).subscribe((val) => {
    //   console.log(val);
    // });
    const customIntervalObservable: any = new Observable(
      (observer: Observer<any>) => {
        let count: number = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 2) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error("Count is greater #!"));
          }
          count++;
        }, 1000);
      }
    );
    this.counterRef = customIntervalObservable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return `Round ${data + 1}`;
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          console.log("completed");
        }
      );
  }
  ngOnDestroy() {
    this.counterRef.unsubscribe();
  }
}
