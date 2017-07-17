import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';
import {Link} from 'react-router-dom';


class PostsShow extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    render() {
        const {post} = this.props;
        if (post) {
            return (
                <div>
                    <Link to="/">Back to Posts</Link>
                    <h3>{post.title}</h3>
                    <h6>{post.categories}</h6>
                    <div>{post.content}</div>
                </div>
            );
        }else {
            return <div>Loading...</div>
        }
    }
}

PostsShow.propTypes = {};
PostsShow.defaultProps = {};

function mapStateToProps({posts}, ownProps) {
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost})(PostsShow);
