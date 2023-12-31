import { Component, Listen } from '@in/common';

@Component({
  selector: 'in-tr',
  custom: { extends: 'tr' },
  // style: ``,
  // template: `<slot></slot>`
})
export class TrComponent extends HTMLTableRowElement {
  public $rowData: any;

  constructor() {
    super();
  }

  @Listen('data')
  setValue(ev: CustomEvent) {
    this.$rowData = ev.detail;
    debugger;
    console.log('this.$rowData:', this.$rowData);
  }
}
