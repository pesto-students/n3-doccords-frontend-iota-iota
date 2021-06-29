import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner from "components/shared/spinner";
import { Typography, Button } from "@material-ui/core";
import { setUploadedImageURL } from "redux/actions/common";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const UploadFile = () => {
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

  const onFileSelected = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setIsDisabled(false); // Enabling upload button
      setButtonText("Let's upload this!");
    }
  };
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
          url: "http://localhost:5001/api/v1/users/upload/file",
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

  if (!uploadedLink.length > 0) {
    return (
      <div className="photo_upload">
        <Typography variant="h5" style={{ marginTop: "1rem" }}>
          Add a profile
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
                          accept="image/*, application/pdf"
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
                <p className="filename">{fileName || "No file selected yet"}</p>
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
        <a target="_blank" rel="noreferrer" href={uploadedLink}>
          <InsertDriveFileIcon style={{ fontSize: "5rem" }} color="primary" />
        </a>
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
          Delete uploaded file
        </Button>
      </div>
    );
  }
};

export default UploadFile;
