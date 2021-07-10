import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MyCarousel from "components/shared/carousel/Carousel";

describe("MyCarousel", () => {
  const list = [
    {
      title: "Item 1",
    },
    {
      title: "Item 2",
    },
  ];

  it("rendering without Error", () => {
    const wrapper = shallow(<MyCarousel data={list} handleClick={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
