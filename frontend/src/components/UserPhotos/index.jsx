import React from "react";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import fetchModelData from "../../lib/fetchModelData";
import fetchModels from "../../lib/fetchModelData";
function UserPhotos() {
  // const userPhotos = models.photoOfUserModel(userId);
  // const { userId } = useParams();
  const userid = useParams().userId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchModelData.fetchPhotoOfUserModel(userid);
        console.log(response)
        setData(response);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [userid]);
  console.log(data);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       console.log(data);
  //       const photos = data.map(photo => photo._id);
  //       console.log(photos);
  //       // const comments = await fetchModels.fetchCommentOfPhotoModel(data.map((photo) => photo._id));
  //       console.log(comments);
  //       setComments(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchComments();
  // }, [])

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleCommentSubmit = async (event, photoId) => {
    event.preventDefault();

    try {
      console.log(newComment);
      const response = await fetchModelData.fetchNewComment(photoId, newComment);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNewComment('');
      // Fetch the photo and its comments again to update the view
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // console.log(data.map((photo) => photo.comments.map))
  return (
    <div>
      {data.map((photo) => (
        <Card key={photo._id}>
          <CardMedia
            component="img"
            sx={{
              aspectRatio: "16/9",
              width: "100%",
            }}
            image={`/images/${photo.file_name}`}
            alt={photo.file_name}
          />
          <CardContent>
            <Typography variant="body1">
              Created at: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            {photo.comments &&
              photo.comments.map((comment) => (
                <div key={comment._id}>
                  <Typography variant="body1">
                    <a href={`/users/${comment.user_id._id}`}>
                      {/* {fetchModels.fetchUserModel(comment.user_id).first_name} */}
                      <Typography variant="body1">
                        User comment: {comment.user_id.first_name}
                        {/* {console.log(comment.user_id)} */}
                      </Typography>
                    </a>
                  </Typography>
                  <Typography variant="body1">
                    User comment at: {comment.date_time}
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                </div>
              ))}
            {/* {console.log(photo._id)} */}
          </CardContent>
          <form onSubmit={(event) => handleCommentSubmit(event, photo._id)}>
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
                required
              />
              <button type="submit">Submit Comment</button>
            </form>

        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
