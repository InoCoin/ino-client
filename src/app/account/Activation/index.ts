import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProvider, LoaderProvider } from '../../providers'
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'activation',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Activation implements OnInit {

  error;

  constructor(
    private Router: Router,
    private UserProvider: UserProvider,
    private LoaderProvider: LoaderProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.LoaderProvider.show();
    this.ActivatedRoute.params.pipe(flatMap((params) => {
      if (params.token) {
        return this.UserProvider.postActivation(params.token);
      }
      return of();
    })).subscribe((res: any) => {
      if(res.error){
        this.error = res.error;
        return this.ChangeDetectorRef.markForCheck();
      }
      this.LoaderProvider.hide();
      return this.Router.navigate(['/account/wallet'])
    })
  }

}
