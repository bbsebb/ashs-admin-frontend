import {Component, computed, effect, inject, Signal} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ScrollDispatcher, ViewportRuler} from "@angular/cdk/overlay";
import {Observable, scan, skip, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs/operators";

import {animate, state, style, transition, trigger} from "@angular/animations";
import {SidenavOpeningService} from "../services/sidenav-opening.service";

@Component({
    selector: 'app-header',
    imports: [
        MatToolbar,
        MatIcon,
        MatIconButton,
        NgOptimizedImage,
        MatAnchor,
        MatIconAnchor,
        RouterLink
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    animations: [
        trigger('toolbarAnimation', [
            state('open', style({ transform: 'translateY(0px)' })),
            state('close', style({ transform: 'translateY(-100px)' })),
            transition('open => close', [animate('300ms ease-out')]),
            transition('close  => open', [animate('300ms ease-in')]),
        ]),
    ]
})

export class HeaderComponent {
  // Injection du service pour l'ouverture du volet latéral
  protected readonly sidenavOpeningService :SidenavOpeningService = inject(SidenavOpeningService);
  // Signal pour gérer l'affichage de la barre d'outils
  showToolbar: Signal<boolean>;
  private readonly topLimitShowToolbar = 349;

  constructor(private scrollDispatcher: ScrollDispatcher, private viewportRuler: ViewportRuler) {
    const scrollLimit = toSignal(this.scrollLimit(scrollDispatcher,viewportRuler,this.topLimitShowToolbar),{ initialValue: true }) ;
    const directionScroll = toSignal(this.scrollDirection(scrollDispatcher,viewportRuler),{ initialValue: true });
    // Calcul pour déterminer si la barre d'outils doit être affichée
    this.showToolbar = computed(() => directionScroll() || scrollLimit() || this.sidenavOpeningService.isOpen());
    // Effet pour appliquer le changement d'état de la barre d'outils
    effect(() => {
      this.showToolbar();
    });
  }
  // Création d'un flux observable pour la position de défilement de la fenêtre
  getScrollTop(scrollDispatcher:ScrollDispatcher,viewportRuler:ViewportRuler): Observable<number> {
    return scrollDispatcher.scrolled().pipe(
      map(() => viewportRuler.getViewportScrollPosition().top),
    );
  }
  // Définition de la limite de défilement pour afficher la barre d'outils
  scrollLimit(scrollDispatcher:ScrollDispatcher, viewportRuler:ViewportRuler, limit:number): Observable<boolean> {
    return this.getScrollTop(scrollDispatcher,viewportRuler).pipe(
      map((top) => top < limit),
    );
  }
  // Détermination de la direction du défilement pour afficher ou masquer la barre d'outils
  scrollDirection(scrollDispatcher:ScrollDispatcher, viewportRuler:ViewportRuler): Observable<boolean> {
    return this.getScrollTop(scrollDispatcher,viewportRuler).pipe(
      scan((acc: number[], current: number) => [acc[1], current], [viewportRuler.getViewportScrollPosition().top, 0]),
      skip(1), // On a besoin d'au moins deux valeurs pour savoir si le défilement monte ou descent
      map(([prev, current]) => prev >= current),
    );
  }

}
