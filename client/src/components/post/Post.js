import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPost, addPost, updatePost, clearCurrent } from "../../actions/post";
import PostItem from "./PostItem";
const Post = ({
  post: { posts, current },
  getPost,
  addPost,
  updatePost,
  clearCurrent,
}) => {
  const [data, setData] = useState({
    image: "",
    imageName: "",
    name: "",
  });

  useEffect(() => {
    if (current) {
      setData({
        image: current.image,
        imageName: current.imageName,
        name: current.name,
      });
    }
  }, [current]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
      imageName: e.target.files[0].name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (current) {
      await updatePost(current._id, data);
      setData({
        image: "",
        name: "",
      });
      await getPost();
      clearCurrent();
    } else {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("imageName", data.imageName);
      formData.append("name", data.name);

      await addPost(formData);
      setData({
        image: "",
        imageName: "",
        name: "",
      });
    }
  };
  return (
    <>
      <div className="form_container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            {/* img */}
            <input
              type="file"
              // multiple
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="form-control"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button className="form-control btn btn-primary" type="submit">
              {current ? "update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="posts_container">
        <PostItem posts={posts} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, {
  getPost,
  addPost,
  updatePost,
  clearCurrent,
})(Post);
