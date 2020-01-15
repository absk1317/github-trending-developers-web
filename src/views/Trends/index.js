import React from 'react';
import './index.css';

import { connect } from 'react-redux';
import { fetchData } from '../../controllers/trends/developers';

import { Card, Container, ListGroup, Row, Col, Button } from 'react-bootstrap';

class Trends extends React.Component {
  componentDidMount() {
    this.props.fetchData(
      // 'https://github-trending-api.now.sh/developers?language=javascript&since=weekly',
      'http://localhost:3001/api/v1/trends/developers?language=javascript&since=monthly',
    );
  }

  renderContent() {
    const { isLoading, data, errored } = this.props;
    if (isLoading) return <h3>Loading...</h3>;
    if (errored) return <h3>Some Error Occurred. Please retry...</h3>;

    console.log(data[0]);
    return data.map((developer, index) => {
      return (
        <Card style={{ width: '18rem', padding: 20 }} key={index}>
          <a
            href={developer.url}
            key={index}
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noopener noreferrer"
          >
            <Card.Img
              src={developer.avatar}
              style={{ width: '200px', height: '200px' }}
              key={index}
            />
          </a>
          <Card body className="DeveloperDetails">
            <Card.Title style={{ marginBottom: 20, textAlign: 'center' }}>
              {developer.name}
              <span className="username"> ({developer.username})</span>
              {developer.type != 'user' && (
                <span className="username"> ({developer.type})</span>
              )}
            </Card.Title>

            <ListGroup.Item>
              <Card body style={{ textAlign: 'center' }}>
                <Button variant="primary" size="lg" className="RepoLink">
                  <a
                    href={developer.repo.url}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    rel="noopener noreferrer"
                  >
                    {developer.repo.name}
                  </a>
                </Button>
                <ListGroup.Item className="RepoDescription">
                  {developer.repo.description.trim()}
                </ListGroup.Item>
              </Card>
            </ListGroup.Item>
          </Card>
        </Card>
      );
    });
  }

  render() {
    return (
      <>
        <div className="Header">
          <h2>Developer Trends</h2>
        </div>
        <div className="Trends">{this.renderContent()}</div>
      </>
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
