// import { setAllHealthTopics } from "redux/actions/common";
import { common } from "redux/reducers/common";

describe("Common Reducer", () => {
  const initialState = {
    healthTopics: [],
    articles: [],
    uploadedLink: "",
    searchLocationIsAtHome: null,
    searchedString: "",
  };

  it("should return the initial state", () => {
    expect(common(undefined, {})).toEqual(initialState);
  });
});
