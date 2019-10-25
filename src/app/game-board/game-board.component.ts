import { Component, OnInit } from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";
import { ActivatedRoute } from "@angular/router";


const BACKGROUND_COLOR = "#DEB887";
const BACKGROUND_IMAGE = "linear-gradient(45deg, blue,red,aqua,yellow,violet,green)";
const COLOR_NAMES = [
    '#000000', '#000080', '#00FF00', '#800080', '#008080', '#00BFFF', '#00FA9A', '#1E90FF', '#228B22', '#2F4F4F',
    '#483D8B', '#4B0082', '#556B2F', '#6A5ACD', '#7CFC00', '#0000FF', '#800000', '#9ACD32', '#A52A2A', '#CD5C5C',
    '#D2691E', '#D3D3D3', '#DAA520', '#4169E1', '#E0FFFF', '#FDF5E6', '#FF0000', '#008B8B', '#FF00FF', '#FFC0CB',
    '#FFD700', '#40E0D0', '#FFFF00', '#F5FFFA', '#B22222', '#6495ED'];

@Component({
    selector: "game-board",
    templateUrl: "./game-board.component.html",
    styleUrls: ["./game-board.component.css"]
})
export class GameBoardComponent implements OnInit {
    public pairFlipsCounter = 0;
    public matchedCounter = 0;
    public score = 0;
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
    public getFloor(number) {
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

    private createTiles() {
        let currentRow = 0;
        let colorsArr = this.generateColorsArray(this.numberOfCardsInDeck, 2);

        let tiles = [];
        tiles = this.shuffleArray(colorsArr).map((color, index) => {
            let tile = {
                shownColor: BACKGROUND_COLOR,
                backgroundImage: BACKGROUND_IMAGE,
                color: color,
                hidden: false,
                noTap: false,
                index: index,
                row: currentRow,// this.getFloor(index % this.numberOfRows),
                col: (index % this.numberOfColumns)
            };
            //
            if (index % this.numberOfColumns === this.numberOfColumns - 1) {
                currentRow++;
            }
            return tile;
        });
        this.tiles = tiles;
    }

    onTapHandler(tile) {
        if (!this.preventTap ) {
            tile.shownColor = tile.color;
            tile.backgroundImage = '';
            if (this.selectedTile) {

                if (this.selectedTile.index === tile.index) return; // taped same card again
                
                this.pairFlipsCounter++;
                this.preventTap = true;
                setTimeout(() => {
                    if (
                        this.selectedTile.color === tile.color &&
                        this.selectedTile.index !== tile.index
                    ) {

                        this.selectedTile.hidden = true;
                        tile.hidden = true;
                        this.score += 100;
                        this.matchedCounter++;
                        this.preventTap = false;
                        this.selectedTile = undefined;
                        if (this.matchedCounter * 2 === this.numberOfCardsInDeck) {
                            alert(this.alertOptions).then(() => {
                                this.startNewGame();
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
                tile.noTap = true;
                this.selectedTile = tile;
            }
        }
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

    private generateColorsArray(numberOfCards, numberOfMatches) {
        let colorSets = [];
        let colors = [];
        let colorsLength = COLOR_NAMES.length;
        for (let index = 0; index < (numberOfCards / (numberOfMatches * 2)); index++) {
            colors.push(COLOR_NAMES[index]);
            colors.push(COLOR_NAMES[colorsLength - index]);
        }
        for (let index = 0; index < numberOfMatches; index++) {
            colorSets.push(...colors);
        }
        return colorSets;
    }

    private startNewGame(){
        this.score = 0;
        this.pairFlipsCounter = 0;
        this.matchedCounter = 0;
        this.preventTap = false;

        this.createTiles();
    }
}
