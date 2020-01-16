import React from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';
import { fetchLanguages, setLanguage, setTrendingPeriod, fetchData } from '../../controllers';

import { Row, Col } from 'react-bootstrap';

class Trends extends React.Component {
  componentDidMount() {
    this.props.fetchLanguages();
  }

  changeFilter = async (filter, value) => {
    await this.props[filter](value);
    this.props.fetchData();
  };

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
    fetchData: () => dispatch(fetchData()),
    fetchLanguages: url => dispatch(fetchLanguages(url)),
    setLanguage: language => dispatch(setLanguage(language)),
    setTrendingPeriod: trend => dispatch(setTrendingPeriod(trend)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
