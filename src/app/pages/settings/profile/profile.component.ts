import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() onSignOut: EventEmitter<void> = new EventEmitter();
  activateRoute: ActivatedRoute;
  router: Router;
  id: string;

  constructor(
    public auth: AngularFireAuth,
    private _activateRoute: ActivatedRoute,
    private _router: Router
  ) { 
    this.activateRoute = _activateRoute
    this.router = _router;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  clickTab(id: string){
    this.router.navigate(['/profile/' + id]);
  }

  signOut(): void {
    //g("Sign Out");
    localStorage.removeItem("user");
    this.auth
      .signOut()
      .then(() =>this.onSignOut.emit())
      .catch((e) => console.error("An error happened while signing out!", e));
      window.location.href = "";   
  }
}
