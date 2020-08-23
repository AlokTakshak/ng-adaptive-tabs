import {
  Component,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChildren,
  Output,
} from '@angular/core';
import { AdaptiveTab } from './models';

@Component({
  selector: 'ng-adaptive-tabs',
  templateUrl: './adaptive-tabs.component.html',
  styleUrls: ['./adaptive-tabs.component.scss'],
})
export class AdaptiveTabsComponent implements AfterViewInit {
  public showDropdown: boolean = false;
  private _activeTab: string;
  private _tabs: AdaptiveTab[];
  private _dropdownTabs: ElementRef[]
  
  @Output() activeTabChangeEvent: EventEmitter<string> = new EventEmitter<
    string
  >();

  @Input('tabs')
  set tabs(tabs: AdaptiveTab[]) {
    const tabswithUniqueid = this.getTabsWithUiqueID(tabs);
    this._tabs = tabswithUniqueid;
    this._activeTab = this._tabs[0].id;
  }

  get tabs(): AdaptiveTab[] {
    return this._tabs;
  }

  @Input('activeTab')
  set activeTab(id: string) {
    this._activeTab = id;
  }

  get activeTab(): string {
    return this._activeTab;
  }

  @ViewChild('adaptive_tabs') private _adaptive_tabs_div: ElementRef;
  @ViewChildren('tab') private _adaptive_tabs: ElementRef[];
  @ViewChildren('dropdownTabs') 
  set dropdowntabs(tabs: ElementRef[]) {
    this._dropdownTabs = tabs;
    this.adaptTabs(this._adaptive_tabs_div.nativeElement.offsetWidth);
  };

  @HostListener('window: resize')
  private windowResize() {
    this.adaptTabs(this._adaptive_tabs_div.nativeElement.offsetWidth);
  }

  constructor() {}

  ngAfterViewInit(): void {
    if (this._adaptive_tabs_div) {
      this.adaptTabs(this._adaptive_tabs_div.nativeElement.offsetWidth);
    }
  }

  public changeTabSelection(event: any) {
    if (event.target && event.target.id) {
      this._activeTab = event.target.id;
      this.activeTabChangeEvent.emit(this.activeTab);
    }
  }

  private getTabsWithUiqueID(tabs: AdaptiveTab[]): AdaptiveTab[] {
    let map: Map<string, AdaptiveTab> = new Map();
    tabs.forEach((tab) => {
      if (!tab.id) {
        tab.id = tab.title;
      }
      if (!map.has(tab.id)) {
        map.set(tab.id, tab);
      }
    });
    return Array.from(map).map((value) => value[1]);
  }

  private adaptTabs(length: number) {
    if (this._adaptive_tabs) {
      this.removeClassFromTabs(this._adaptive_tabs, '--opacity');
      this.removeClassFromTabs(this._dropdownTabs);
      this.showDropdown = false;
      const marginOffset = 16;

      let tabsLength: number = 0;
      let hiddenTab: number[] = [];
      this._adaptive_tabs.forEach((tab, index) => {
        if (
          tab.nativeElement.offsetWidth + marginOffset + tabsLength <
          length
        ) {
          tabsLength += tab.nativeElement.offsetWidth + marginOffset;
        } else {
          hiddenTab.push(index)
          tabsLength += tab.nativeElement.offsetWidth + marginOffset;
          tab.nativeElement.classList.add('--opacity');
        }
      });

      if(hiddenTab.length > 0) {
        this.showDropdown = true;
        (this._dropdownTabs || []).forEach((element, index) => {
          if(!hiddenTab.includes(index)) {
            element.nativeElement.classList.add('--hidden');
          }
        });
      }
    }
  }

  private removeClassFromTabs(tabs: ElementRef[], className = '--hidden') {
    tabs.forEach((tab) => {
      tab.nativeElement.classList.remove(className);
    });
  }
}
