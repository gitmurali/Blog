import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPosts} from '../actions';

class PostsNew extends Component {


    renderField(field) {

        const {meta:{touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : '' }`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values){
        this.props.createPosts(values, () => {
            this.props.history.push('/');
        });
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    // console.log(values); -> { title: 'asdf', categories: 'adfads' }
    const errors = {};

    // validate the inputs from values
     if(!values.title){
         errors.title='please enter a title!!';
     }
    if(!values.categories){
        errors.categories='please enter a categories!!';
    }
    if(!values.content){
        errors.content='please enter a content!!';
    }

    // if errors is empty then form is absolutely fine to submit..
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPosts })(PostsNew)
);
