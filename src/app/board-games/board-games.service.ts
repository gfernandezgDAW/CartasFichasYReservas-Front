import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { BGCategory } from './classes/bg-category.class';
import { BoardGame } from './classes/board-game.class';

@Injectable()
export class BoardGamesService {
  boardGamesUrl = `${environment.apiUrl}board-game`;
  boardCategoriesUrl = `${environment.apiUrl}bg-category`;
  constructor(private http: HttpClient) {}

  getAllBoardGames() {
    return this.http.get<BoardGame[]>(`${this.boardGamesUrl}/all`);
  }

  getAllBGCategories() {
    return this.http.get<BGCategory[]>(`${this.boardCategoriesUrl}/all`);
  }
}
