import customAxios from "apiRequests/customAxios";
import {
  DELETE_HEALTH_TOPICS_URL,
  CREATE_HEALTH_TOPICS_URL,
  UPDATE_HEALTH_TOPICS_URL,
} from "apiRequests/constants";
import { setAllHealthTopics, setUploadedImageURL } from "redux/actions/common";

export const deleteHealthTopic =
  (healthTopicId) => async (dispatch, getState) => {
    const deleteHealthTopic = await customAxios.delete(
      `${DELETE_HEALTH_TOPICS_URL}/${healthTopicId}`
    );
    if (deleteHealthTopic.data.success) {
      const removedArr = getState().common.healthTopics.filter(
        (healthTopic) => healthTopic.healthTopicId !== healthTopicId
      );
      dispatch(setAllHealthTopics(removedArr));
    } else {
      console.log(deleteHealthTopic.data);
    }
  };

export const createNewHealthTopic =
  (title, picture, history) => async (dispatch, getState) => {
    const newHealthTopic = await customAxios.post(CREATE_HEALTH_TOPICS_URL, {
      title,
      picture,
    });
    const healthTopicsArray = getState().common.healthTopics;
    if (newHealthTopic.data.success) {
      healthTopicsArray.unshift(newHealthTopic.data.data);
      console.log(healthTopicsArray);
      dispatch(setAllHealthTopics(healthTopicsArray));
      dispatch(setUploadedImageURL(""));
      history.push("/admin/healthTopics");
    }
  };

export const updateHealthTopic =
  (healthTopicId, title, picture, history) => async (dispatch, getState) => {
    const updatedHealthTopic = await customAxios.put(
      `${UPDATE_HEALTH_TOPICS_URL}/${healthTopicId}`,
      {
        title,
        picture,
      }
    );
    if (updatedHealthTopic.status) {
      const healthTopicsArray = getState().common.healthTopics;
      const updatedHealthTopics = healthTopicsArray.map((healthTopic) => {
        if (healthTopic.healthTopicId === healthTopicId) {
          healthTopic.title = updatedHealthTopic.data.title;
          healthTopic.picture = updatedHealthTopic.data.picture;
        }
        return healthTopic;
      });
      dispatch(setAllHealthTopics(updatedHealthTopics));
      dispatch(setUploadedImageURL(""));
      history.push("/admin/healthTopics");
    }
  };
