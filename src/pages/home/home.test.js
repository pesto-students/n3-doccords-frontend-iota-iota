/* eslint-disable no-unused-vars */
import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr, testStore } from "Utils/testingUtils";
import Home from "pages/home";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<Home store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("Home Component", () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      home: {},
      user: {},
      common: {},
    };
    wrapper = setUp(initialState);
  });

  it("Should render without errors", () => {
    const component = findByTestAtrr(wrapper, "homePage");
    expect(component.length).toBe(1);
  });
});
