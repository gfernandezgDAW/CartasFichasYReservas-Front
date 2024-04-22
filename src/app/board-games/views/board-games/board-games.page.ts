import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs';

import { IonSelect, ModalController } from '@ionic/angular';
import { UtilsService } from '../../../common/utils.service';
import { BoardGamesService } from '../../board-games.service';
import { BGCategory } from '../../classes/bg-category.class';
import { BoardGame } from '../../classes/board-game.class';
import { BoardGameModalPage } from '../board-game/board-game.modal';

@Component({
  selector: 'app-board-games',
  templateUrl: 'board-games.page.html',
  styleUrls: ['board-games.page.scss'],
})
export class BoardGamesPage implements OnInit {
  displayedGames = 10;
  @ViewChild('selectCategoryFilter') selectCategoryFilterElement: IonSelect;
  boardGames: BoardGame[] = [];
  displayedBoardGames: BoardGame[] = [];
  bgCategories: BGCategory[] = [];
  activeFilterType: 'text' | 'category' = 'text';
  searchBarText = '';

  constructor(
    private boardGamesService: BoardGamesService,
    protected utilsService: UtilsService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.boardGamesService
      .getAllBoardGames()
      .pipe(first())
      .subscribe((res) => {
        this.boardGames = this.utilsService.orderArrayByProperty(
          res,
          'title',
          'ASC'
        );
        this.displayedBoardGames = [...this.boardGames];
      });

    this.boardGamesService
      .getAllBGCategories()
      .pipe(first())
      .subscribe((res) => {
        this.bgCategories = this.utilsService.orderArrayByProperty(
          res,
          'title',
          'ASC'
        );
      });
  }

  resetdisplayedBoardGames() {
    this.displayedBoardGames = this.boardGames;
  }

  filterTypeChanged(event: CustomEvent) {
    this.activeFilterType = event.detail.value;
    this.displayedBoardGames = this.boardGames;

    if (this.activeFilterType === 'category') {
      this.searchBarText = '';
    }
  }

  onSearchBarTextChange(event: CustomEvent) {
    this.searchBarText = event.detail.value.trim().toLocaleLowerCase();
    this.displayedBoardGames = this.boardGames.filter(
      (boardGame) =>
        boardGame.title.toLocaleLowerCase().includes(this.searchBarText) ||
        boardGame.introduction.toLocaleLowerCase().includes(this.searchBarText)
    );
  }

  onSelectedCategoryChange(event: CustomEvent) {
    const selectedCategory = event.detail.value;
    this.displayedBoardGames = this.boardGames.filter((boardGame) => {
      if (!boardGame.categories) {
        return;
      }

      return boardGame.categories.find(
        (category) => category.title === selectedCategory
      );
    });
  }

  cancelSelectedCategoryFilter() {
    this.resetdisplayedBoardGames();
    this.selectCategoryFilterElement.value = '';
  }

  getBoardGameTitle(boardGame: BoardGame) {
    return `${boardGame.title} : ${boardGame.introduction}`;
  }

  async openGameDetailModal(boardGame: BoardGame) {
    await this.utilsService.openModal(
      BoardGameModalPage,
      this.modalController,
      boardGame
    );
  }
}
