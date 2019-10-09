import { Component, OnInit } from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";


@Component({
    selector: "game-board",
    templateUrl: "./game-board.component.html",
    styleUrls: ["./game-board.component.css"]
})
export class GameBoardComponent implements OnInit {
    public preventTap = false;
    public tiles = [];

    private selectedTile;
    private alertOptions = {
        title: "Congratulations!!!",
        message: "You win!!!",
        okButtonText: "New Game",
        cancelable: false
    };
    private colors = ["black", "blue", "brown", "gray", "green", "purple", "red", "yellow", "black",
        "blue", "brown", "gray", "green", "purple", "red", "yellow"];
    constructor(router: Router) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.createTiles();
    }

    private createTiles() {
        let tiles = [];
        let colCount = 0;
        let rowCount = 0;
        tiles = this.shuffleArray(this.colors).map((color, index) => {
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

    private shuffleArray(cards: any[]): any[] {
        // might want to make this imutable
        for (let index = 0; index < cards.length; index++) {
            let randomIndex = this.getRandomInt(cards.length - 2);
            let replacedElementArray = cards.splice(randomIndex, 1);
            cards = cards.concat(replacedElementArray);
        }
        return cards;
    }
    private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    onTapHandler(tile) {
        if (!this.preventTap) {
            tile.shownColor = tile.color;
            if (this.selectedTile) {
                this.preventTap = true;
                setTimeout(() => {
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
                        this.selectedTile.shownColor = "white";
                        this.selectedTile = undefined;
                        tile.shownColor = "white";
                        this.preventTap = false;
                    }
                }, 500);
            } else {
                this.selectedTile = tile;
            }
        }
    }
}
