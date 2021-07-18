/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "components/shared/spinner";
import { Typography, Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector, connect } from "react-redux";

import { setUploadedImageURL } from "redux/actions/common";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { createNewHealthTopic, updateHealthTopic } from "apiRequests/admin";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      width: "20rem",
    },
  },
}));

const AdminHealthTopic = ({ createNewHealthTopic, updateHealthTopic }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Select your file first");
  const dispatch = useDispatch();
  const uploadedLink = useSelector((state) => state.common.uploadedLink);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [healthTopicId, setHealthTopicId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [suggestedTopicId, setSuggestedTopicId] = useState("");
  const [picture, setPicture] = useState("");
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState({
    title: {
      status: false,
      text: "",
    },
  });
  useEffect(() => {
    if (location.state) {
      if (location.state.type === "suggested") {
        const { title, documentId, suggestedTopicId } =
          location.state.suggestedTopicDetail;
        setTitle(title);
        setDocumentId(documentId);
        setSuggestedTopicId(suggestedTopicId);
      }
      if (location.state.type === "update") {
        const { title, healthTopicId, picture } = location.state;
        setTitle(title);
        setHealthTopicId(healthTopicId);
        setPicture(picture);
        dispatch(setUploadedImageURL(picture));
      }
    }
  }, []);
  // Handling file selection from input
  const onFileSelected = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setIsDisabled(false); // Enabling upload button
      setButtonText("Let's upload this!");
    }
  };

  // Setting image preview
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  // Uploading image to Cloud Storage
  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    setButtonText("Wait we're uploading your file...");

    try {
      if (selectedFile !== "") {
        // Creating a FormData object
        const fileData = new FormData();

        // Adding the 'image' field and the selected file as value to our FormData object
        // Changing file name to make it unique and avoid potential later overrides
        fileData.set(
          "image",
          selectedFile,
          `${Date.now()}-${selectedFile.name}`
        );
        const token = JSON.parse(
          localStorage.getItem("doccords_user")
        ).accessToken;
        const res = await axios({
          method: "post",
          url: "https://doccords-api.herokuapp.com/api/v1/admin/upload/image",
          data: fileData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        await setIsLoading(false);
        await setIsSuccess(true);
        dispatch(setUploadedImageURL(res.data.fileLocation));
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setFileName(null);
    }
  };
  const deleteUploadedUrl = () => {
    dispatch(setUploadedImageURL(""));
    setSelectedFile(null);
    setPreview(null);
    setIsSuccess(false);
    setFileName(null);
    setButtonText("Select your file first");
  };
  const handleChange = (e) => {
    if (e.target.id === "title") {
      setError({
        ...error,
        title: {
          status: false,
          text: "",
        },
      });
    }
    setTitle(e.target.value);
  };
  const checkForErrors = () => {
    if (title.length < 1) {
      setError({
        ...error,
        title: {
          status: true,
          text: "Should not be empty",
        },
      });
    }
  };
  const onCreate = () => {
    checkForErrors();
    if (error.title.status) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      createNewHealthTopic(
        title,
        uploadedLink,
        history,
        documentId,
        suggestedTopicId
      );
    }
  };
  const onUpdate = () => {
    checkForErrors();
    if (error.title.status) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      updateHealthTopic(healthTopicId, title, uploadedLink, history);
    }
  };
  const renderUpload = () => {
    if (!uploadedLink.length > 0) {
      return (
        <div className="photo_upload">
          <Typography variant="h5" style={{ marginTop: "1rem" }}>
            Create new health topics
          </Typography>
          <main style={{ marginTop: "1rem" }}>
            <form onSubmit={(e) => handleFileUpload(e)}>
              <label className="uploader">
                <div className="upload-space">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      {isError || isSuccess ? (
                        <i
                          className={`icon-${isSuccess ? "success" : "error"}`}
                        ></i>
                      ) : (
                        <>
                          {preview ? (
                            <div className="preview">
                              <img
                                src={preview}
                                alt="Preview of the file to be uploaded"
                              />
                            </div>
                          ) : (
                            <i className="icon-upload"></i>
                          )}
                          <input
                            type="file"
                            onChange={onFileSelected}
                            accept="image/*"
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
                {isError || isSuccess ? (
                  <p className={isSuccess ? "success" : "error"}>
                    {isSuccess
                      ? "Upload successful!"
                      : "Something went wrong ..."}
                  </p>
                ) : (
                  <p className="filename">
                    {fileName || "No file selected yet"}
                  </p>
                )}
              </label>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isDisabled}
                style={{
                  textTransform: "none",
                  marginTop: "1rem",
                }}
              >
                {buttonText}
              </Button>
            </form>
          </main>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={uploadedLink}
            style={{ maxWidth: "15rem", height: "auto" }}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{
              color: "#ffffff",
              textTransform: "none",
              width: "fit-content",
              marginTop: "1rem",
            }}
            onClick={deleteUploadedUrl}
            width="auto"
          >
            Delete uploaded image
          </Button>
        </div>
      );
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{
          color: "#ffffff",
          textTransform: "none",
          width: "fit-content",
          margin: "1rem 0",
        }}
        onClick={() => {
          history.goBack();
          dispatch(setUploadedImageURL(""));
        }}
      >
        Go back
      </Button>
      {renderUpload()}
      <div style={{ marginTop: "2rem" }}>
        <form className={classes.root} autoComplete="off">
          <TextField
            error={error.title.status}
            id="title"
            label="Please enter title here"
            variant="outlined"
            width="10rem"
            size="medium"
            helperText={error.title.text}
            onChange={handleChange}
            value={title}
          />
          {!healthTopicId && (
            <Button
              disabled={!uploadedLink}
              variant="contained"
              color="primary"
              style={{
                textTransform: "none",
                width: "fit-content",
                marginTop: "2rem",
                display: "block",
              }}
              onClick={onCreate}
            >
              Create
            </Button>
          )}
          {healthTopicId && (
            <Button
              disabled={!uploadedLink}
              variant="contained"
              color="primary"
              style={{
                textTransform: "none",
                width: "fit-content",
                marginTop: "2rem",
                display: "block",
              }}
              onClick={onUpdate}
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

AdminHealthTopic.propTypes = {
  title: PropTypes.string,
  location: PropTypes.shape({}),
  createNewHealthTopic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    uploadedLink: state.common.uploadedLink,
  };
};
const mapDispatchToProps = (dispatch) => ({
  createNewHealthTopic: (
    title,
    picture,
    history,
    documentId,
    suggestedTopicId
  ) =>
    dispatch(
      createNewHealthTopic(
        title,
        picture,
        history,
        documentId,
        suggestedTopicId
      )
    ),
  updateHealthTopic: (healthTopicId, title, picture, history) =>
    dispatch(updateHealthTopic(healthTopicId, title, picture, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHealthTopic);
