import { NgModule } from '@angular/core';
import { AdaptiveTabsComponent } from './adaptive-tabs.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"


@NgModule({
  declarations: [AdaptiveTabsComponent],
  imports: [ CommonModule,
    NgbModule
  ],
  exports: [AdaptiveTabsComponent, CommonModule, NgbModule]
})
export class AdaptiveTabsModule { }
