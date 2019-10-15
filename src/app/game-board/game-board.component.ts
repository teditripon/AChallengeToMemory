import { Component, OnInit, ɵangular_packages_core_core_o } from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";
import { ActivatedRoute } from "@angular/router";

const BACKGROUND_COLOR = "white";
const BACKGROUND_IMAGE = "linear-gradient(45deg, blue,red,aqua,yellow,violet,green)";

@Component({
    selector: "game-board",
    templateUrl: "./game-board.component.html",
    styleUrls: ["./game-board.component.css"]
})
export class GameBoardComponent implements OnInit {
    public preventTap = false;
    public tiles = [];

    public rows: number;
    public cols: number;

    private selectedTile;
    private alertOptions = {
        title: "Congratulations!!!",
        message: "You win!!!",
        okButtonText: "New Game",
        cancelable: false
    };
    private colors = ["black", "blue", "brown", "gray", "green", "purple", "red", "yellow", "black",
        "blue", "brown", "gray", "green", "purple", "red", "yellow"];

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.cols = params['col'];
            this.rows = params['row'];
        });
    }   // Use the component constructor to inject providers.

    ngOnInit(): void {
        console.log(this.cols, this.rows);
        this.createTiles();
    }
    getFloor(number) {
        return Math.floor(number);
    }
    

    private createTiles() {
        let colorsArr = [...this.colors];
        let tiles = [];
        let colCount = 0;
        let rowCount = 0;
        tiles = this.shuffleArray(colorsArr).map((color, index) => {
            let tile = {
                shownColor: BACKGROUND_COLOR,
                backgroundImage: BACKGROUND_IMAGE,
                color: color,
                col: colCount,
                row: rowCount,
                index: index,
                text: "?"
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
            tile.backgroundImage = '';
            tile.text = "";
            if (this.selectedTile) {
                this.preventTap = true;
                setTimeout(() => {
                    if (
                        this.selectedTile.color === tile.color &&
                        this.selectedTile.index !== tile.index
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
                        this.selectedTile.shownColor = BACKGROUND_COLOR;
                        this.selectedTile.backgroundImage = BACKGROUND_IMAGE
                        this.selectedTile.text = "?";
                        this.selectedTile = undefined;
                        tile.shownColor = BACKGROUND_COLOR;
                        tile.backgroundImage = BACKGROUND_IMAGE;
                        tile.text = "?";
                        this.preventTap = false;
                    }
                }, 500);
            } else {
                this.selectedTile = tile;
            }
        }
    }
}
