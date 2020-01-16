import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { fetchLanguages, setLanguage, setTrendingPeriod, fetchData } from '../../controllers';
import './index.css';

class Trends extends React.Component {
  componentDidMount() {
    this.props.fetchLanguages();
  }

  changeFilter = async (filter, value) => {
    await this.props[filter](value);
    this.props.fetchData();
  };

  renderSelect(options, value, filter) {
    return (
      <Col className="FilterWrapper">
        <Select options={options} value={value} onChange={val => this.changeFilter(filter, val)} />
      </Col>
    );
  }

  render() {
    const { languages, currentLanguage, trends, currentTrendingPeriod } = this.props;

    return (
      <Row style={{ display: 'flex' }}>
        <Col className="Header" style={{ width: '80%' }}></Col>
        {this.renderSelect(languages, currentLanguage, 'setLanguage')}
        {this.renderSelect(trends, currentTrendingPeriod, 'setTrendingPeriod')}
        <Col className="Header" style={{ width: '10%' }}></Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  const {
    languages,
    currentLanguage,
    trendingPeriods: trends,
    trendingPeriod: currentTrendingPeriod,
  } = state.filters;
  return { languages, currentLanguage, currentTrendingPeriod, trends };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    fetchLanguages: () => dispatch(fetchLanguages()),
    setLanguage: language => dispatch(setLanguage(language)),
    setTrendingPeriod: trend => dispatch(setTrendingPeriod(trend)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
