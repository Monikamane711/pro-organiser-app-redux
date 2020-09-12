import React from "react";
import CreateBoardForm from "./CreateBoardForm";
import { shallow } from "enzyme";

describe("Create Board Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreateBoardForm></CreateBoardForm>);
  });

  test("must have only 3 inputs", () => {
    const inputs = wrapper.find("Input");
    expect(inputs).toHaveLength(3);
  });
  test("Must have board name input", () => {
    const name = wrapper.find("Input#name");
    expect(name).toHaveLength(1);
  });
  test("Must have team members input", () => {
    const team = wrapper.find("Input#team");
    expect(team).toHaveLength(1);
  });
  test("Must have board type input", () => {
    const type = wrapper.find("Input#type");
    expect(type).toHaveLength(1);
  });
  test("Must have Create Board button", () => {
    let button = wrapper.find("Button#CreateBoard");
    expect(button).toHaveLength(1);
  });
});
