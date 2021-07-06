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

  /*
    healthTopics: [
        {
          healthTopicId: "gzfNFB37yNGGMmmvnOPU",
          title: "Pregnancy",
          picture:
            "https://firebasestorage.googleapis.com/v0/b/doccords-55659.appspot.com/o/1624764283502-pregnancy.jpeg_1624764283663?alt=media",
          createdAt: "2021-06-27T03:24:46.645Z",
        },
      ],
      articles: [
        {
          articleId: "tC2VrmaHQKRfiOLtjuns",
          title: "Acne Problem",
          description:
            "<p>Acne signs vary depending on the severity of your condition",
          healthTopic: "BqgghnbD0MTX5BLOUsK5",
          picture:
            "https://firebasestorage.googleapis.com/v0/b/doccords-55659.appspot.com/o/1625309607246-acne.jpeg_1625309607345?alt=media",
          createdAt: "2021-07-03T10:54:51.879Z",
        },
      ],
    */

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

  // it('exampleMethod_updatesState Method should update state as expected', () => {
  //     const classInstance = wrapper.instance();
  //     classInstance.exampleMethod_updatesState();
  //     const newState = classInstance.state.hideBtn;
  //     expect(newState).toBe(true);
  // });

  // it('exampleMethod_returnsAValue Method should return value as expected', () => {
  //     const classInstance = wrapper.instance();
  //     const newValue = classInstance.exampleMethod_returnsAValue(6);
  //     expect(newValue).toBe(7);
  // });
});
