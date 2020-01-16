import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import DeveloperCard from './Card';
import { en } from '../../utils';
import { fetchData } from '../../controllers';

class List extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if (this.props.text) {
      return (
        <Container style={{ flex: 'auto' }}>
          <h3>{this.props.text}</h3>
        </Container>
      );
    }

    return this.props.data.map((developer, index) => {
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
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
