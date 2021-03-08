import React, { useEffect } from "react";
import { ListItem, List } from "../List";
import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { UPDATE_POSTS, REMOVE_POST, LOADING } from "../../utils/actions";

const PostsList = () => {
  const [state, dispatch] = useStoreContext();
  let posts;
  const handleDelete = (id) => {
    API.deletePost(id).then(() => {
      dispatch({
        type: REMOVE_POST,
        id: id
      })
    })
    .catch(err => console.log(err));
  }
  
  const getPosts = () => {
    dispatch({ type: LOADING });
    API.getPosts()
    .then(results => {
      dispatch({
        type: UPDATE_POSTS,
        posts: results.data
      })
      posts = state.posts.length;
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <h1>All Blog Posts</h1>
      <h3 className="my-2">Click on a post to view</h3>
      {state.loading ? <i className="fas fa-sync fa-spin position-relative text-secondary" 
      style={{top: 40, left: "45%", zIndex: 2, fontSize: "2rem"}}></i> : ""}
      {!posts ? (
        <List>
          {state.posts.map(post => (
            <ListItem key={post._id}>
              <Link to={"/posts/" + post._id}>
                <strong>
                  {post.title} by {post.author}
                </strong>
              </Link>
              <DeleteBtn onClick={() => handleDelete(post._id)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3>You haven't added any posts yet!</h3>
      )}
      <div className="mt-5">
        <Link to="favorites">View favorites</Link>
      </div>
    </div>
  );
};

export default PostsList;
