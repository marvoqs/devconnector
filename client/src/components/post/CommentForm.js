import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ post, addComment }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(post._id, text);
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form className='form my-1' onSubmit={(e) => handleSubmit(e)}>
        <textarea name='text' cols='30' rows='5' placeholder='Comment on this post' value={text} onChange={(e) => handleChange(e)} required></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
