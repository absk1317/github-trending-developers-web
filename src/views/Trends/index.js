import React from 'react';
import './index.css';
import Select from 'react-select';

import { connect } from 'react-redux';
import { fetchData } from '../../controllers/trends/developers';
import {
  fetchLanguages,
  setLanguage,
  setTrendingPeriod,
} from '../../controllers/filters';

import { Card, Container, ListGroup, Row, Col, Button } from 'react-bootstrap';

class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.languageChange = this.languageChange.bind(this);
    this.trendingPeriodChange = this.trendingPeriodChange.bind(this);
  }
  componentDidMount() {
    this.refreshData();
    this.props.fetchLanguages('http://localhost:3001/api/v1/languages');
  }

  refreshData() {
    let params = {
      language: this.props.language.value,
      since: this.props.trendingPeriod.value,
    };
    this.props.fetchData(
      'http://localhost:3001/api/v1/trends/developers',
      params,
    );
  }

  async languageChange(language) {
    await this.props.setLanguage(language);
    this.refreshData();
  }

  async trendingPeriodChange(trendingPeriod) {
    await this.props.setTrendingPeriod(trendingPeriod);
    this.refreshData();
  }

  renderContent() {
    const { isLoading, data, errored, languages } = this.props;
    if (isLoading)
      return (
        <Container style={{ flex: 'auto' }}>
          <h3>Loading...</h3>
        </Container>
      );
    if (errored)
      return (
        <Container style={{ flex: 'auto' }}>
          <h3>Some Error Occurred. Please retry...</h3>
        </Container>
      );

    if (data.length === 0)
      return (
        <Container style={{ flex: 'auto' }}>
          <h3>No trending users in this section</h3>
        </Container>
      );

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
    console.log(this.props.trendingPeriods);
    let selectedLanguage = this.props.language;
    if (!selectedLanguage.value) selectedLanguage = null;
    return (
      <>
        <div className="Header">
          <h2>Developer Trends</h2>
        </div>
        <Row style={{ display: 'flex' }}>
          <Col style={{ width: '49%' }}>
            <Select
              options={this.props.languages}
              value={selectedLanguage}
              onChange={this.languageChange}
              placeholder={'Select any language'}
            />
          </Col>
          <Col className="Header" style={{ width: '2%' }}></Col>
          <Col style={{ width: '49%' }}>
            <Select
              options={this.props.trendingPeriods}
              value={this.props.trendingPeriod}
              onChange={this.trendingPeriodChange}
            />
          </Col>
        </Row>

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
    languages: state.filters.languages,
    language: state.filters.currentLanguage,
    trendingPeriod: state.filters.trendingPeriod,
    trendingPeriods: state.filters.trendingPeriods,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, params) => dispatch(fetchData(url, params)),
    fetchLanguages: url => dispatch(fetchLanguages(url)),
    setLanguage: language => dispatch(setLanguage(language)),
    setTrendingPeriod: trendingPeriod =>
      dispatch(setTrendingPeriod(trendingPeriod)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
