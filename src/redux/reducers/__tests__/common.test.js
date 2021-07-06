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

  //   it("should update the Health Topic list", () => {
  //     expect(
  //       setAllHealthTopics({
  //         healthTopics: [
  //           {
  //             healthTopicId: "sZX6do6jozYrHnYfBVeH",
  //             title: "Aging 2",
  //             picture:
  //               "https://firebasestorage.googleapis.com/v0/b/doccords-55659.appspot.com/o/1625396784996-Aging.jpeg_1625396785947?alt=media",
  //             createdAt: "2021-07-04T11:06:38.485Z",
  //           },
  //         ],
  //       })
  //     ).toEqual({
  //       healthTopics: [
  //         {
  //           healthTopicId: "sZX6do6jozYrHnYfBVeH",
  //           title: "Aging 2",
  //           picture:
  //             "https://firebasestorage.googleapis.com/v0/b/doccords-55659.appspot.com/o/1625396784996-Aging.jpeg_1625396785947?alt=media",
  //           createdAt: "2021-07-04T11:06:38.485Z",
  //         },
  //       ],
  //       articles: [],
  //       uploadedLink: "",
  //       searchLocationIsAtHome: null,
  //       searchedString: "",
  //     });
  //   });
});
