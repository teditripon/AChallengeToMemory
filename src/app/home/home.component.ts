import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']

})
export class HomeComponent {
    public constructor(private router: Router) { }

    onTap(){
        this.router.navigate(["selection"]);
    }
}
