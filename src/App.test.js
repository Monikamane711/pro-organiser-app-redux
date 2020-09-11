import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("App component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  test("Must have Components", () => {});
});
