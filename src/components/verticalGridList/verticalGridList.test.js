import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import VerticalGridList from "components/verticalGridList";

describe("VerticalGridList", () => {
  const list = [
    {
      healthTopicId: "sZX6do6jozYrHnYfBVeH",
      title: "Aging 2",
      picture:
        "https://firebasestorage.googleapis.com/v0/b/doccords-55659.appspot.com/o/1625396784996-Aging.jpeg_1625396785947?alt=media",
      createdAt: "2021-07-04T11:06:38.485Z",
    },
  ];

  it("rendering without Error", () => {
    const wrapper = shallow(
      <VerticalGridList healthTopics={list} handleClick={() => {}} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
