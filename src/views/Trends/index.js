import React from 'react';
import './index.css';

import { connect } from 'react-redux';
import { fetchData } from '../../controllers/trends/developers';

class Trends extends React.Component {
  componentDidMount() {
    this.props.fetchData(
      // 'https://github-trending-api.now.sh/developers?language=javascript&since=weekly',
      'http://localhost:3001/api/v1/trends/developers?language=javascript&since=weekly',
    );
  }

  render() {
    console.log('data', this.props.data);
    console.log('isLoading', this.props.isLoading);
    console.log('errored', this.props.errored);
    return (
      <div className="Trends">
        <header className="Trends-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="Trends-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.developers.data,
    errored: state.developers.errored,
    isLoading: state.developers.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(fetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
