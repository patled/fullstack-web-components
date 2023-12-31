import { Component, attachTemplate, attachStyle, html, css } from '@in/common';

export interface Column {
  property: string;
  label: string;
  span?: number;
  align: 'left' | 'center' | 'right' | 'justify';
  index: number;
  colSpan: number;
}

export type ColumnData = Column[];

@Component({
  selector: 'in-table',
  custom: { extends: 'table' },
  style: css`
    [is='in-table'] {
      font-family: var(--font-default);
      font-size: var(--font-body-md);
      font-weight: var(--font-weight-default);
      color: var(--color-neutral-500);
      width: 100%;
    }
    [is='in-table'] th {
      display: table-cell;
      box-sizing: border-box;
      margin-top: var(--margin-xs);
      height: 44px;
      vertical-align: middle;
      font-weight: var(--font-weight-default);
    }
    [is='in-table'] td {
      padding-left: var(--padding-xxs);
      padding-right: var(--padding-xxs);
    }
    [is='in-table'] tr {
      height: 58px;
      vertical-align: middle;
    }
  `,
  template: html` <thead></thead>
    <tbody></tbody>`,
})
export class TableComponent extends HTMLTableElement {
  private channel: BroadcastChannel;
  private columnData: ColumnData;

  get $head() {
    return this.querySelector('thead');
  }

  get $body() {
    return this.querySelector('tbody');
  }

  constructor() {
    super();
    attachTemplate(this);
    attachStyle(this);
  }

  static get observedAttributes() {
    return ['channel'];
  }

  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'channel':
        this.channel = new BroadcastChannel(next);
        this.channel.onmessage = this.onMessage.bind(this);
        break;
    }
  }

  onMessage(event: MessageEvent) {
    switch (event.data.type) {
      case 'data':
        this.onTableData(event.data.detail);
        break;
    }
  }

  onTableData(next) {
    this.renderHeader(next.columnData);
    this.renderRows(next.rowData);
  }

  renderHeader(cols: ColumnData) {
    this.columnData = cols.sort((a, b) => a.index - b.index);
    const tr = document.createElement('tr');
    this.columnData.forEach((col) => {
      const th = document.createElement('th');
      th.innerText = col.label;
      // th.setAttribute('colspan', col.colSpan.toString());
      tr.appendChild(th);
    });
    this.$head.innerHTML = '';
    this.$head.appendChild(tr);
  }

  renderRows(rows: any[]) {
    this.$body.innerHTML = '';
    rows.forEach((row) => {
      const tr = document.createElement('tr');
      this.columnData.forEach((col) => {
        const td = document.createElement('td');
        td.innerText = row[col.property];
        tr.appendChild(td);
      });
      this.$body.appendChild(tr);
    });
  }
}
