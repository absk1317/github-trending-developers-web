import React from 'react';

import { connect } from 'react-redux';
import { fetchData } from '../../controllers/trends/developers';

import { Container } from 'react-bootstrap';

import { TRENDING_DEVELOPERS_API, en } from '../../utils';

import DeveloperCard from './DeveloperCard';

class Developers extends React.Component {
  componentDidMount() {
    const { currentLanguage, currentTrendingPeriod, fetchData } = this.props;
    let params = {
      language: currentLanguage.value,
      since: currentTrendingPeriod.value,
    };

    fetchData(TRENDING_DEVELOPERS_API, params);
  }

  render() {
    const { isLoading, data, errored } = this.props;
    let text = null;

    if (data.length === 0) text = en.noData;
    if (isLoading) text = en.loading;
    if (errored) text = en.errored;

    if (text) {
      return (
        <Container style={{ flex: 'auto' }}>
          <h3>{text}</h3>
        </Container>
      );
    }

    return data.map((developer, index) => {
      return <DeveloperCard key={index} developer={developer} />;
    });
  }
}

const mapStateToProps = state => {
  return {
    data: state.developers.data,
    errored: state.developers.errored,
    isLoading: state.developers.isLoading,
    currentLanguage: state.filters.currentLanguage,
    currentTrendingPeriod: state.filters.trendingPeriod,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, params) => dispatch(fetchData(url, params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Developers);
