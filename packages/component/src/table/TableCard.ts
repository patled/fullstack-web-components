import { Component, attachShadow, html, css } from '@in/common';
import { CardComponent } from './../card/Card';

@Component({
  selector: 'in-tablecard',
  style: css``,
  template: html`<in-card>
    <table is="in-table" slot="content"></table>
    <div class="table-footer" slot="footer"></div>
  </in-card>`,
})
export class TableCardComponent extends HTMLElement {
  private channel: BroadcastChannel;

  constructor() {
    super();
    attachShadow(this);
  }

  get $table(): HTMLTableElement {
    return this.shadowRoot.querySelector('table');
  }

  static get observedAttributes() {
    return ['channel'];
  }

  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'channel':
        this.channel = new BroadcastChannel(next);
        this.$table.setAttribute('channel', next);
        break;
    }
  }
}
