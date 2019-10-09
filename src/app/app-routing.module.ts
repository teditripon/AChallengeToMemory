import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { GameSelectionComponent } from "./game-selection/game-selection.component";
import { GameBoardComponent } from "./game-board/game-board.component";
const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "selection", component: GameSelectionComponent },
    { path: "board", component: GameBoardComponent }
];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
