import React from "react";
import { expect } from "chai";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from "react-addons-test-utils";
import SkylightStateless from "../src/skylightstateless";

describe("The SkylightStateless component", () => {
  it("will not render when it is not visible", () => {
    const rendered = renderIntoDocument(<SkylightStateless />);
    const found = scryRenderedDOMComponentsWithClass(rendered, "skylight-wrapper");
    expect(found.length).to.equal(0);
  });

  it("will render when it is visible", () => {
    const rendered = renderIntoDocument(<SkylightStateless isVisible />);
    const found = scryRenderedDOMComponentsWithClass(rendered, "skylight-wrapper");
    expect(found.length).to.equal(1);
  });
});
