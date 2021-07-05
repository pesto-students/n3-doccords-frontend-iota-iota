// import { render, screen } from '@testing-library/react'
// import App from './App'

// test('renders learn react link', () => {
//   render(<App />)
//   const linkElement = screen.getByText(/learn react/i)
//   expect(linkElement).toBeInTheDocument()
// })import React from "react";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "App";

describe("App", () => {
  it("is rendering completely", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
