import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

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
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />

      <div className='comments'>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={postId} />)
        ) : (
          <h4>There is no comment yet.</h4>
        )}
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
