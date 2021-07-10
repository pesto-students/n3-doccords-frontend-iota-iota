import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import DropDown from "components/DropDown/DropDown";

describe("DropDown", () => {
  it("rendering without Error", () => {
    const wrapper = shallow(<DropDown />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
