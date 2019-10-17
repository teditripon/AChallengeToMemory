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
            { name: "4 x 5", col: 4, row: 5 },
            { name: "5 x 6", col: 5, row: 6 },
            { name: "6 x 7", col: 6, row: 7 },
            { name: "7 x 8", col: 7, row: 8 },
            { name: "8 x 9", col: 8, row: 9 }
        ];
    }

    onTapHandler(option) {
        this.router.navigate(["board"], { queryParams: option });
    }
    getFloor(number) {
        return Math.floor(number);
    }
}
