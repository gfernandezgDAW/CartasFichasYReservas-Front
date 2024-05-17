import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { BookableSpace } from '../classes/bookable-space.class';

@Injectable()
export class BookableSpacesService {
  bookableSpacesUrl = `${environment.apiUrl}bookable-space`;
  constructor(private http: HttpClient) {}

  getAllBookableSpaces() {
    return this.http.get<BookableSpace[]>(`${this.bookableSpacesUrl}/all`);
  }
}
