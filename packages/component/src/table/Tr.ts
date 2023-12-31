import { Component } from "@in/common";

@Component({
  selector: "in-tr",
  custom: { extends: "tr" },
  // style: ``,
  // template: `<slot></slot>`
})
export class TrComponent extends HTMLTableRowElement {
  constructor() {
    super();
  }
}