import customAxios from "apiRequests/customAxios";
import {
  DELETE_HEALTH_TOPICS_URL,
  CREATE_HEALTH_TOPICS_URL,
  UPDATE_HEALTH_TOPICS_URL,
  ADMIN_ARTICLES_URL,
  SUGGESTED_TOPICS_URL,
} from "apiRequests/constants";
import {
  setAllHealthTopics,
  setUploadedImageURL,
  setAllArticles,
  setNotification,
} from "redux/actions/common";
import { setSuggestedTopics } from "redux/actions/user";

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
      dispatch(
        setNotification({
          status: true,
          body: "Health topic got deleted successfully",
        })
      );
    } else {
      console.log(deleteHealthTopic.data);
    }
  };

export const createNewHealthTopic =
  (title, picture, history, documentId, suggestedTopicId) =>
  async (dispatch, getState) => {
    const newHealthTopic = await customAxios.post(CREATE_HEALTH_TOPICS_URL, {
      title,
      picture,
      documentId,
      suggestedTopicId,
    });
    const healthTopicsArray = getState().common.healthTopics;
    if (newHealthTopic.data.success) {
      healthTopicsArray.unshift(newHealthTopic.data.data);
      dispatch(setAllHealthTopics(healthTopicsArray));
      dispatch(setUploadedImageURL(""));
      dispatch(
        setNotification({
          status: true,
          body: "Health topic got added successfully",
        })
      );
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
      dispatch(
        setNotification({
          status: true,
          body: "Health topic got updated successfully",
        })
      );
      history.push("/admin/healthTopics");
    }
  };

export const createNewArticle =
  (title, description, picture, healthTopicId, history) =>
  async (dispatch, getState) => {
    const createdArticle = await customAxios.post(ADMIN_ARTICLES_URL, {
      title,
      description,
      picture,
      healthTopicId,
    });
    const articlesArray = getState().common.articles;
    if (createdArticle.data.success) {
      articlesArray.unshift(createdArticle.data.data);
      dispatch(setAllArticles(articlesArray));
      dispatch(setUploadedImageURL(""));
      dispatch(
        setNotification({
          status: true,
          body: "Article got added successfully",
        })
      );
      history.push("/admin/articles");
    }
  };

export const updateArticle =
  (articleId, title, description, picture, healthTopicId, history) =>
  async (dispatch, getState) => {
    const updatedArticle = await customAxios.put(
      `${ADMIN_ARTICLES_URL}/${articleId}`,
      {
        title,
        description,
        picture,
        healthTopicId,
      }
    );

    if (updatedArticle.status) {
      const articlesArray = getState().common.articles;
      const updatedArticles = articlesArray.map((article) => {
        if (article.articleId === articleId) {
          article.title = updatedArticle.data.title;
          article.picture = updatedArticle.data.picture;
          article.description = updatedArticle.data.description;
          article.healthTopicId = updatedArticle.data.healthTopicId;
        }
        return article;
      });
      dispatch(setAllArticles(updatedArticles));
      dispatch(setUploadedImageURL(""));
      dispatch(
        setNotification({
          status: true,
          body: "Article got updated successfully",
        })
      );
      history.push("/admin/articles");
    }
  };
export const deleteArticle = (articleId) => async (dispatch, getState) => {
  const deleteArticleRes = await customAxios.delete(
    `${ADMIN_ARTICLES_URL}/${articleId}`
  );
  if (deleteArticleRes.data.success) {
    const removedArr = getState().common.articles.filter(
      (article) => article.articleId !== articleId
    );
    dispatch(setAllArticles(removedArr));
    dispatch(
      setNotification({
        status: true,
        body: "Article got deleted successfully",
      })
    );
  } else {
    console.log(deleteHealthTopic.data);
  }
};
export const getSuggestedTopics = () => async (dispatch, getState) => {
  const suggestedTopics = await customAxios.get(SUGGESTED_TOPICS_URL);
  if (suggestedTopics.data.success) {
    dispatch(setSuggestedTopics(suggestedTopics.data.data));
  }
};
export const declineSuggestion = (data) => async (dispatch, getState) => {
  const { suggestedTopicId, documentId } = data;

  const suggestedTopic = await customAxios.put(SUGGESTED_TOPICS_URL, {
    suggestedTopicId,
    documentId,
  });
  if (suggestedTopic.data.success) {
    dispatch(getSuggestedTopics());
  }
};
