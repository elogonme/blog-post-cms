import React, { useEffect } from "react";
import { ListItem, List } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, REMOVE_FAVORITE, UPDATE_FAVORITES } from "../utils/actions";

function FavoritesList() {
  const [state, dispatch] = useStoreContext();

  const getFavorites = () => {
    dispatch({type: LOADING});
    dispatch({type: UPDATE_FAVORITES});
  }

  const deleteFavorite = (id) => {
    dispatch({type: REMOVE_FAVORITE, _id: id });
  };
 
  useEffect(() => {
    getFavorites()
  }, []);

  return (
    <div className="container mb-5 mt-5">
      <h1 className="text-center">Here's All of Your Favorite Posts</h1>
      {/* Replace true with the condition that the posts array has a length > 0 */}
      {state.favorites.length ? (
        <List>
          <h3 className="mb-5 mt-5">Click on a post to view in detail</h3>
          {state.favorites.map(post => (
            <ListItem key={post._id}>
              <Link to={"/posts/" + post._id}>
                <strong>
                  {post.title} by {post.author}
                </strong>
              </Link>
              <DeleteBtn onClick={() => deleteFavorite(post._id)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3>You haven't added any favorites yet!</h3>
      )}
      <div className="mt-5">
        <Link to="home">Back to home</Link>
      </div>
    </div>
  );
}

export default FavoritesList;
