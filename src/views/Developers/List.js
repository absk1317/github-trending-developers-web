import React from 'react';

import { connect } from 'react-redux';
import { fetchData } from '../../controllers';

import { Container } from 'react-bootstrap';

import { TRENDING_DEVELOPERS_API, en } from '../../utils';

import DeveloperCard from './Card';

class List extends React.Component {
  componentDidMount() {
    const { currentLanguage, currentTrendingPeriod, fetchData } = this.props,
      language = currentLanguage.value,
      since = currentTrendingPeriod.value;

    fetchData(TRENDING_DEVELOPERS_API, { language, since });
  }

  render() {
    const { data, text } = this.props;

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
  const { data, errored, isLoading } = state.developers,
    { currentLanguage, trendingPeriod: currentTrendingPeriod } = state.filters;
  let text = null;

  if (data.length === 0) text = en.noData;
  if (isLoading) text = en.loading;
  if (errored) text = en.errored;

  return { data, errored, isLoading, currentLanguage, currentTrendingPeriod, text };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, params) => dispatch(fetchData(url, params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
