import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "game-selection",
    templateUrl: "./game-selection.component.html",
    styleUrls: ["./game-selection.component.css"]
})
export class GameSelectionComponent implements OnInit {
    constructor(private router: Router) { }

    public gameOptions = [];
    ngOnInit() {
        console.log("ingame selecion");
        this.gameOptions = [{ name: "4 x 4", columns: 4, rows: 4 }];
    }

    onTapHandler(option) {
        this.router.navigate(["board"], option);
    }
}
