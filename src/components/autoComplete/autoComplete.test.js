import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AutoComplete from "components/autoComplete/AutoComplete";

describe("AutoComplete", () => {
  const list = [
    {
      title: "Item 1",
    },
    {
      title: "Item 2",
    },
  ];

  it("rendering without Error", () => {
    const wrapper = shallow(
      <AutoComplete list={list} handleHealthSelection={() => {}} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
