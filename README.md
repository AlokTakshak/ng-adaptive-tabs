[![npm version](https://img.shields.io/badge/npm-v0.0.2-blue?style=flat-square)](https://www.npmjs.com/package/adaptive-tabs)

# AdaptiveTabs 
This library creates a tabs component which adjust automatically based on the screen size and shows overflowing tabs inside a dropdown.

![demo](https://raw.githubusercontent.com/AlokTakshak/ng-adaptive-tabs/master/demo.gif)

## Interface

```
interface AdaptiveTab {
  title: string;
  id?: string; //optional
  disabled?: boolean //optional
}
```

## Props
| Property   | Type             | Default             | Required? | Description                                                                                                                                                                                                                               |
| :--------- | :--------------- | :--------------- | :-------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tabs      | AdaptiveTab[]           |         |     ✓     | This is list of tabs we want ot render.                                                                                                                                                        |
| activeTab | String | `1st` tab      |           |  This is the current active Tab |
| activeTabChangeEvent   | string          |  |           | Emites the  selected tabs id.


### Input
```
tabs: AdaptiveTab[]; // array of tabs to render
activeTab: string // id of the selected tabs
```
By default 1st tab is selected and.<br/>
if you don't pass id it will take `title` as `id` and render only unique one.<br>

### Output
```
activeTabChangeEvent: string // emits the id of the selected tab
```

## Usage

```
app.component.html

<ng-adaptive-tabs [tabs]="tabs" (activeTabChangeEvent)="tabChanged($event)">
</ng-adaptive-tabs>

app.component.ts 

tabs: AdaptiveTab = [ { title: 'Tab-1' }, { title: 'Tab-2' }]

public tabChanged(id: stirng) {
    console.log('selected tab id ', id);
}

```

### `*Note` - Compiled with `enableIvy: false`