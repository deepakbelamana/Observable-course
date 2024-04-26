import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  constructor() {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    // this.subs = interval(2000).subscribe((num : any )=> {
    //   console.log(num);
    // })

    /**
     * creating a custom observable
     */
    let id = 0;
    const customObservable = Observable.create((observer) => {
      setInterval(() => {
        if (id == 19) {
          observer.complete();
        }
        if (id > 20) {
          observer.error(new Error('id greater than 3'));
        }
        observer.next(id);
        id++;
      }, 1000);
    });

    this.subs = customObservable
      .pipe(
        filter((data: number) => {
          return data % 2 == 0;
        }),
        map((data: number) => {
          return Math.pow(data, 2);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => console.log(err.message),
        () => {
          alert('observable completed');
        }
      );
  }
}
