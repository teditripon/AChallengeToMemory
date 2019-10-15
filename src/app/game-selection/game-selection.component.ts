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
        this.gameOptions = [
            { name: "4 x 4", col: 4, row: 4 },
            { name: "5 x 5", col: 6, row: 5 },
            { name: "7 x 6", col: 6, row: 5 },
            { name: "9 x 7", col: 9, row: 7 }];
    }




    onTapHandler(option) {
        this.router.navigate(["board"], { queryParams: option });
    }
    getFloor(number) {
        return Math.floor(number);
    }
}
