import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrent, getPost, deletePost } from "../../actions/post";
const PostItem = ({ posts, setCurrent, getPost, deletePost }) => {
   useEffect(() => {
      getPost();
   }, [getPost]);
   return (
      <>
         {posts.map((post) => {
            return (
               <>
                  <div className="post_container" key={post._id}>
                     <h4>{post.image}</h4>
                     <h3>{post.name}</h3>
                     <div className="btn_container">
                        <button className="btn btn-outline-warning" onClick={() => setCurrent(post)}>
                           upd
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => deletePost(post._id)}>
                           del
                        </button>
                     </div>
                  </div>
               </>
            );
         })}
      </>
   );
};

export default connect(null, { setCurrent, getPost, deletePost })(PostItem);
