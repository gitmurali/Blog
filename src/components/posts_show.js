import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';


class PostsShow extends Component {

    componentDidMount() {
        if(!this.props.post){
            const {id} = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const {post} = this.props;
        if (post) {
            return (
                <div>
                    <Link to="/">Back to Posts</Link>
                    <button className="btn btn-danger pull-xs-right"
                            onClick={this.onDeleteClick.bind(this)}

                    >Delete Post</button>
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

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
