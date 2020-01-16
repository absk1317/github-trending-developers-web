import React from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';
import { fetchLanguages, setLanguage, setTrendingPeriod, fetchData } from '../../controllers';

import { Row, Col } from 'react-bootstrap';
import { LANGUAGES_FETCH_API, TRENDING_DEVELOPERS_API } from '../../utils';

class Trends extends React.Component {
  componentDidMount() {
    this.props.fetchLanguages(LANGUAGES_FETCH_API);
  }

  changeFilter = async (filter, value) => {
    await this.props[filter](value);
    this.refreshData();
  };

  refreshData() {
    const { currentLanguage, currentTrendingPeriod, fetchData } = this.props,
      language = currentLanguage.value,
      since = currentTrendingPeriod.value;

    fetchData(TRENDING_DEVELOPERS_API, { language, since });
  }

  renderSelect(options, value, filter) {
    const styles = { width: '20%', padding: '0.1%', backgroundColor: '#282c34' };

    return (
      <Col style={styles}>
        <Select
          options={options}
          value={value}
          onChange={value => this.changeFilter(filter, value)}
        />
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
        <Col className="Header" style={{ width: '8%' }}></Col>
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
    fetchData: (url, params) => dispatch(fetchData(url, params)),
    fetchLanguages: url => dispatch(fetchLanguages(url)),
    setLanguage: language => dispatch(setLanguage(language)),
    setTrendingPeriod: trend => dispatch(setTrendingPeriod(trend)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
