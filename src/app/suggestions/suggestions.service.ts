import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { Suggestion } from './classes/suggestion.class';

@Injectable()
export class SuggestionsService {
  bookingsUrl = `${environment.apiUrl}suggestion`;
  constructor(private http: HttpClient) {}

  getAllUserSuggestions() {
    return this.http.get<Suggestion[]>(`${this.bookingsUrl}/all/app`);
  }

  postNewSuggestion(title: string, description: string) {
    return this.http.post<Suggestion>(`${this.bookingsUrl}/new`, {
      title,
      description,
    });
  }
}
