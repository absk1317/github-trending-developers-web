import React from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';
import { fetchData } from '../../controllers/trends/developers';
import {
  fetchLanguages,
  setLanguage,
  setTrendingPeriod,
} from '../../controllers/filters';

import { Row, Col } from 'react-bootstrap';
import {
  LANGUAGES_FETCH_API,
  TRENDING_DEVELOPERS_API,
} from '../../utils/Routes';

class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.languageChange = this.languageChange.bind(this);
    this.trendingPeriodChange = this.trendingPeriodChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchLanguages(LANGUAGES_FETCH_API);
  }

  refreshData() {
    const { currentLanguage, currentTrendingPeriod, fetchData } = this.props,
      params = {
        language: currentLanguage.value,
        since: currentTrendingPeriod.value,
      };

    fetchData(TRENDING_DEVELOPERS_API, params);
  }

  async languageChange(language) {
    await this.props.setLanguage(language);
    this.refreshData();
  }

  async trendingPeriodChange(trendingPeriod) {
    await this.props.setTrendingPeriod(trendingPeriod);
    this.refreshData();
  }

  render() {
    const {
      languages,
      currentLanguage,
      trendingPeriods,
      currentTrendingPeriod,
    } = this.props;

    return (
      <Row style={{ display: 'flex' }}>
        <Col className="Header" style={{ width: '80%' }}></Col>
        <Col style={{ width: '20%' }}>
          <Select
            options={languages}
            value={currentLanguage}
            onChange={this.languageChange}
          />
        </Col>
        <Col className="Header" style={{ width: '2%' }}></Col>
        <Col style={{ width: '20%' }}>
          <Select
            options={trendingPeriods}
            value={currentTrendingPeriod}
            onChange={this.trendingPeriodChange}
          />
        </Col>
        <Col className="Header" style={{ width: '8%' }}></Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    languages: state.filters.languages,
    currentLanguage: state.filters.currentLanguage,
    currentTrendingPeriod: state.filters.trendingPeriod,
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
