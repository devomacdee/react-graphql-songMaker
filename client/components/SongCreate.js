import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {title: ''}
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }
  render() {
    return (
      <div>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            type="text"
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
          />
        </form>
        <Link to="/" className="btn-floating btn-lg red right">
          <i className="material-icons">keyboard_arrow_left</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      title
      lyrics {
        id
      }
    }
  }
`

export default graphql(mutation)(SongCreate);
