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
    if (this.props.alert) {
      return (
        <Container style={{ flex: 'auto' }}>
          <h3>{this.props.alert}</h3>
        </Container>
      );
    }

    return this.props.data.map((developer, index) => {
      return <DeveloperCard key={index} developer={developer} />;
    });
  }
}

const mapStateToProps = state => {
  const { data, errored, isLoading, alert } = state.developers,
    { currentLanguage, trendingPeriod: currentTrendingPeriod } = state.filters;

  return { data, errored, isLoading, currentLanguage, currentTrendingPeriod, alert };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
