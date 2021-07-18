import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSharedDocs } from "apiRequests/user";

const sharedDocuments = () => {
  const { id } = useParams();
  const split = id.split("_");
  const dispatch = useDispatch();
  const sharedDocs = useSelector((state) => state.user.sharedDocuments);

  useEffect(() => {
    fetchSharedDocs(split[0], split[1], dispatch);
  }, [id]);
  return (
    <div style={{ margin: "2rem", display: "flex", flexDirection: "column" }}>
      {sharedDocs.map((sharedDoc) => (
        <a
          key={sharedDoc.documentId}
          href={sharedDoc.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: "1rem", fontSize: "1.5rem" }}
        >
          {sharedDoc.name}
        </a>
      ))}
      {sharedDocs.length <= 0 && (
        <p>User revoked the access for the shared documents</p>
      )}
    </div>
  );
};

export default sharedDocuments;
