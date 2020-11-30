import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';

const Post = ({
  match: {
    params: { postId },
  },
  post: { post, loading },
  getPostById,
}) => {
  useEffect(() => {
    getPostById(postId);
  }, [getPostById, postId]);

  return post === null || loading ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className='round-img' src={post.avatar} alt={post.name} />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{post.text}</p>
        </div>
      </div>

      <CommentForm />

      <div className='comments'>
        <div className='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img className='round-img' src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200' alt='' />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className='my-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus nesciunt soluta suscipit nobis. Amet
              accusamus distinctio cupiditate blanditiis dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p className='post-date'>Posted on 04/16/2019</p>
          </div>
        </div>

        <div className='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img className='round-img' src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200' alt='' />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className='my-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus nesciunt soluta suscipit nobis. Amet
              accusamus distinctio cupiditate blanditiis dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p className='post-date'>Posted on 04/16/2019</p>
            <button type='button' className='btn btn-danger'>
              <i className='fas fa-times'></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(Post);
