import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPost, addPost, updatePost, clearCurrent } from "../../actions/post";
import PostItem from "./PostItem";
const Post = ({ post: { posts, current }, getPost, addPost, updatePost, clearCurrent }) => {
   const [data, setData] = useState({
      image: "",
      name: "",
   });

   useEffect(() => {
      if (current) {
         setData({
            image: current.image,
            name: current.name,
         });
      }
   }, [current]);

   const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
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
         await addPost(data);
         setData({
            image: "",
            name: "",
         });
      }
   };
   return (
      <>
         <div className="form_container">
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  {/* img */}
                  <input type="text" name="image" className="form-control" value={data.image} onChange={handleChange} />
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
                  <button className="form-control btn btn-primary">{current ? "update" : "Submit"}</button>
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

export default connect(mapStateToProps, { getPost, addPost, updatePost, clearCurrent })(Post);
