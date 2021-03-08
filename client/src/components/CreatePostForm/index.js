import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import  {ADD_POST, LOADING } from '../../utils/actions'
import API from "../../utils/API";


const CreatePostForm = () => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const nameRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({type: LOADING});
    API.savePost({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      author: nameRef.current.value
    })
    .then(result => {
      dispatch({
        type: ADD_POST,
        post: result.data,
      });
    })
    .catch(err => console.log(err));
    
    titleRef.current.value = "";
    bodyRef.current.value = "";
    nameRef.current.value = "";
  };

  return (
    <div>
      <div className="jumbotron p-1 mt-2" style={{width: 400, height: "auto"}}>
        <img
          className="img-fluid img-thumbnail"
          src="https://images.pexels.com/photos/459688/pexels-photo-459688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Blog"
        />
      </div>
      <h1>Create a blog post</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <input className="form-control mb-2" required placeholder="Title" ref={titleRef}/>
        <textarea className="form-control mb-2" required placeholder="Body" ref={bodyRef}/>
        <input className="form-control mb-2" placeholder="Screen name" ref={nameRef}/>
        <button className="btn btn-success mt-3 mb-5" disabled={state.loading} type="submit">
          Save Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
