import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API"
import { SET_CURRENT_POST, ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/actions";

function Detail(props) {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
   API.getPost(props.match.params.id)
   .then(res => {
     dispatch({ type: SET_CURRENT_POST, post: res.data});
    }) 
   .catch(err => console.log(err));
  }, []);

  const addToFavorites = () => {
    dispatch({ type: ADD_FAVORITE, post: state.currentPost});
  } 

  const removeFromFavorites = () => {
    dispatch({ type: REMOVE_FAVORITE, id: state.currentPost._id});
    console.log(state.favorites);
  } 

  return (
    <>{state.currentPost ? (
      <Container >
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>{state.currentPost.title} by {state.currentPost.author}</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Content:</h1>
              <p>{state.currentPost.body}</p>
            </article>
          </Col>
          {/* Replace `false` to check if the current post is in the favorites list */}
          { state.favorites.indexOf(state.currentPost) !== -1 ? (
            <button className="btn btn-danger" onClick={removeFromFavorites}>Remove from Favorites!</button>
          ) : (
            <button className="btn" onClick={addToFavorites}>
             ❤️ Add to Favorites</button>
          )}
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Posts</Link>
          </Col>
        </Row>
      </Container>
    ) : (
      <div>loading...</div>
    )}</>
  );
}

export default Detail;
