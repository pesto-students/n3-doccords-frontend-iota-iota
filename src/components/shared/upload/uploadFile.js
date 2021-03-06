import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner from "components/shared/spinner";
import { Button } from "@material-ui/core";
import { setUploadedImageURL } from "redux/actions/common";
import DescriptionIcon from "@material-ui/icons/Description";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const UploadAvatar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [fileName, setFileName] = useState(null);
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
      // setFileName(e.target.files[0].name);
      setPreview(URL.createObjectURL(event.target.files[0]));
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
          url: "https://doccords-api.herokuapp.com/api/v1/users/upload/file",
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
      // setFileName(null);
    }
  };
  const deleteUploadedUrl = () => {
    dispatch(setUploadedImageURL(""));
    setSelectedFile(null);
    setPreview(null);
    setIsSuccess(false);
    // setFileName(null);
    setButtonText("Select your file first");
  };

  if (!uploadedLink.length > 0) {
    return (
      <div className="photo_upload">
        <main style={{ marginTop: "1rem" }}>
          <form
            onSubmit={(e) => handleFileUpload(e)
          >
            <label className="uploader" style={{ width: "15rem" }}>
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
                            <DescriptionIcon
                              color="secondary"
                              style={{ fontSize: "3rem" }}
                            />
                          </div>
                        ) : (
                          // <i className="icon-upload"></i>
                          <CloudUploadIcon style={{ fontSize: "3rem" }} />
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
              {isError ||
                (isSuccess && (
                  <p className={isSuccess ? "success" : "error"}>
                    {isSuccess
                      ? "Upload successful!"
                      : "Something went wrong ..."}
                  </p>
                ))}
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
        <div style={{ width: "8rem", height: "8rem" }}>
          <a href={uploadedLink} target="_blank" rel="noreferrer">
            <DescriptionIcon color="secondary" style={{ fontSize: "6rem" }} />
          </a>
        </div>
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

export default UploadAvatar;
