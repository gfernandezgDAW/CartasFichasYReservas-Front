import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { TabsPage } from './shared-modules/ui/tabs/views/tabs.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'menu',
    component: TabsPage,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: 'menu',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'board-games',
        loadChildren: () =>
          import('./board-games/board-games.module').then(
            (m) => m.BoardGamesModule
          ),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('./bookings/bookings.module').then((m) => m.BookignsModule),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'suggestions',
        loadChildren: () =>
          import('./suggestions/suggestions.module').then(
            (m) => m.SuggestionsModule
          ),
        canActivate: [IsAuthenticatedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
