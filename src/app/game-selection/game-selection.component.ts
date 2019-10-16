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
        this.gameOptions = [
            { name: "4 x 4", col: 4, row: 4 },
            { name: "5 x 4", col: 5, row: 4 },
            { name: "7 x 6", col: 7, row: 6 },
            { name: "9 x 8", col: 9, row: 8 }];
    }

    onTapHandler(option) {
        this.router.navigate(["board"], { queryParams: option });
    }
    getFloor(number) {
        return Math.floor(number);
    }
}
