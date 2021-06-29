import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Typography, Button, TextField } from "@material-ui/core";
import { setUploadedImageURL } from "redux/actions/common";
import { useDispatch, useSelector, connect } from "react-redux";
import Spinner from "components/shared/spinner";
import { createNewArticle } from "apiRequests/admin";
import { makeStyles } from "@material-ui/core/styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { fetchAllArticles } from "apiRequests/common";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      width: "80%",
    },
    "& MuiFormControl-root": {
      width: "80%",
    },
  },
}));
const AdminArticle = ({ createNewArticle, healthTopics, fetchAllArticles }) => {
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
  const [title] = useState("");
  const [articleId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    title: {
      status: false,
      text: "",
    },
    description: {
      status: false,
      text: "",
    },
  });
  // Handling file selection from input
  const onFileSelected = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setIsDisabled(false); // Enabling upload button
      setButtonText("Let's upload this!");
    }
  };
  useEffect(() => {
    fetchAllArticles();
  }, []);

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
          url: "http://localhost:5001/api/v1/admin/upload/image",
          data: fileData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        await setIsLoading(false);
        await setIsSuccess(true);
        dispatch(setUploadedImageURL(res.data.fileLocation));
        console.log(res);

        // Reset to default values after 3 seconds
        // setTimeout(() => {
        //   setSelectedFile(null);
        //   setPreview(null);
        //   setIsSuccess(false);
        //   setFileName(null);
        //   setButtonText("Select your file first");
        // }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setFileName(null);

      // setTimeout(() => {
      //   setIsError(false);
      //   setButtonText("Select your file first");
      // }, 3000);
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
  const checkForErrors = () => {
    if (title.length < 1) {
      setError({
        ...error,
        title: {
          status: true,
          text: "Should not be empty",
        },
      });
    } else if (description.length < 1) {
      setError({
        ...error,
        description: {
          status: true,
          text: "Should not be empty",
        },
      });
    }
  };
  const onCreate = () => {
    checkForErrors();
    console.log(error);
    if (error.title.status && error.description.status) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      createNewArticle(title, description, uploadedLink, history);
    }
  };
  const onUpdate = () => {};

  const renderUpload = () => {
    if (!uploadedLink.length > 0) {
      return (
        <div className="photo_upload">
          <Typography variant="h5" style={{ marginTop: "1rem" }}>
            Create new article
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
            // error={error.title.status}
            id="title"
            label="Please enter title here"
            variant="outlined"
            width="10rem"
            size="medium"
            // helperText={error.title.text}
            // onChange={handleChange}
            value={title}
          />
          <div>
            {healthTopics.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <FormControl variant="outlined" style={{ width: "80%" }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Age
                  </InputLabel>

                  <InputLabel id="demo-simple-select-outlined-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={healthTopics[0].healthTopicId}
                    // onChange={handleChange}
                    label="Age"
                  >
                    {healthTopics.map((topic) => (
                      <MenuItem
                        key={topic.healthTopicId}
                        value={topic.healthTopicId}
                      >
                        {topic.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
          <div style={{ marginTop: "2rem" }}>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>

          {!articleId && (
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
          {articleId && (
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

AdminArticle.propTypes = {
  title: PropTypes.string,
  healthTopics: PropTypes.array,
  // location: PropTypes.shape({}),
  createNewArticle: PropTypes.func.isRequired,
  fetchAllArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    uploadedLink: state.common.uploadedLink,
    healthTopics: state.common.healthTopics,
    articles: state.common.articles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchAllArticles: () => dispatch(fetchAllArticles()),
  createNewArticle: (title, description, picture, history) =>
    dispatch(createNewArticle(title, description, picture, history)),
  // updateHealthTopic: (healthTopicId, title, picture, history) =>
  //   dispatch(updateHealthTopic(healthTopicId, title, picture, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminArticle);
