import { Component, attachShadow, html, css } from '@in/common';

@Component({
  selector: 'in-tablecard',
  style: css``,
  template: html`<div class="table-card"></div>`,
})
export class TableCardComponent extends HTMLElement {
  constructor() {
    super();
    attachShadow(this);
  }
}
