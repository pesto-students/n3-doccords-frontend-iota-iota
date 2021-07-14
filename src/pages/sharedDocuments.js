import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSharedDocs } from "apiRequests/user";

const sharedDocuments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sharedDocs = useSelector((state) => state.user.sharedDocuments);

  useEffect(() => {
    fetchSharedDocs(id, dispatch);
  }, [id]);
  return (
    <div>
      {sharedDocs.map((sharedDoc) => (
        <a
          key={sharedDoc.documentId}
          href={sharedDoc.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {sharedDoc.name}
        </a>
      ))}
    </div>
  );
};

export default sharedDocuments;
