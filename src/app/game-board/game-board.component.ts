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

    public numberOfRows: number;
    public numberOfColumns: number;

    public rowsTemplate: string = "";
    public columnsTemplate: string = ""

    private numberOfCardsInDeck = 0;

    private selectedTile;
    private alertOptions = {
        title: "Congratulations!!!",
        message: "You win!!!",
        okButtonText: "New Game",
        cancelable: false
    };
    private colors = [];

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.numberOfColumns = params['col'];
            this.numberOfRows = params['row'];
            this.numberOfCardsInDeck = this.numberOfColumns * this.numberOfRows;
            this.columnsTemplate = this.greateStarsString(this.numberOfColumns);
            this.rowsTemplate = this.greateStarsString(this.numberOfRows);
        });
    }   // Use the component constructor to inject providers.

    ngOnInit(): void {
        this.createTiles();
    }
    private getFloor(number) {
        return Math.floor(number);
    }

    private greateStarsString(starCount): string {
        let starString = ""
        for (let index = 0; index < starCount; index++) {
            starString += "*";
            if (index < starCount - 1) { starString += ", "; };
        }
        return starString;
    }

    private generateColorsArray(numberOfColors, numberOfMatches) {
        let colorSets = [];
        let colors = [];
        let colorDistance = Math.floor(16777215 / (numberOfColors / numberOfMatches));
        for (let index = 1; index <= numberOfColors / numberOfMatches; index++) {
            const color = "#" + (index * colorDistance).toString(16);
            colors.push(color)
        }

        for (let index = 0; index < numberOfMatches; index++) {
            colorSets = colorSets.concat(colors)
        }
        return colorSets;
    }

    private createTiles() {
        let colorsArr = this.generateColorsArray(this.numberOfCardsInDeck, 2);
        let tiles = [];
        tiles = this.shuffleArray(colorsArr).map((color, index) => {
            let tile = {
                shownColor: BACKGROUND_COLOR,
                backgroundImage: BACKGROUND_IMAGE,
                color: color,
                index: index,
            };
            return tile;
        });
        this.tiles = tiles;
    }

    private shuffleArray(cards: any[]): any[] {
        // ight want to make this imutable
        for (let index = 0; index < cards.length; index++) {
            let randomIndex = this.getRandomInt(cards.length - 2);
            let replacedElementArray = cards.splice(randomIndex, 1);
            cards = cards.concat(replacedElementArray);
        }
        return cards;
    }
    private getRandomInt(max) {
        let maximum = max ? max : 1;
        return Math.floor(Math.random() * Math.floor(maximum));
    }

    onTapHandler(tile) {
        if (!this.preventTap) {
            tile.shownColor = tile.color;
            tile.backgroundImage = '';
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
                        this.selectedTile = undefined;
                        tile.shownColor = BACKGROUND_COLOR;
                        tile.backgroundImage = BACKGROUND_IMAGE;
                        this.preventTap = false;
                    }
                }, 500);
            } else {
                this.selectedTile = tile;
            }
        }
    }
}
