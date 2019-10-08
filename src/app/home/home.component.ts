import { Component, OnInit } from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public preventTap = false;
    public tiles = [];

    private selectedTile;
    private alertOptions = {
        title: "Congratulations!!!",
        message: "You win!!!",
        okButtonText: "New Game",
        cancelable: false
    };
    private colors = [
        "black",
        "blue",
        "brown",
        "gray",
        "green",
        "purple",
        "red",
        "yellow",
        "black",
        "blue",
        "brown",
        "gray",
        "green",
        "purple",
        "red",
        "yellow"
    ];
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
      this.createTiles();
    }

    private createTiles() {
        let tiles = [];
        let colCount = 0;
        let rowCount = 0;
        tiles = this.colors.map((color, index) => {
            let tile = {
                shownColor: "white",
                color: color,
                col: colCount,
                row: rowCount,
                text: index
            };
            rowCount++;

            if (rowCount === 4) {
                colCount++;
                rowCount = 0;
            }
            return tile;
        });
        this.tiles = tiles;
    }

    onTapHandler(tile) {
        if (!this.preventTap) {
            tile.shownColor = tile.color;
            if (this.selectedTile) {
                this.preventTap = true;
                if (
                    this.selectedTile.color === tile.color &&
                    this.selectedTile.text !== tile.text
                ) {
                    this.tiles = this.tiles.filter(
                        elem => elem.color !== tile.color
                    );

                    this.preventTap = false;
                    this.selectedTile = undefined;
                    if (this.tiles.length === 0) {
                        alert(this.alertOptions).then(() => {
                            this.createTiles();
                        });
                    }
                } else {
                    setTimeout(() => {
                        this.selectedTile.shownColor = "white";
                        this.selectedTile = undefined;
                        tile.shownColor = "white";
                        this.preventTap = false;
                    }, 3000);
                }
            } else {
                this.selectedTile = tile;
            }
        }
    }
}
