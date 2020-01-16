import React from 'react';
import './index.css';
import Developers from './Developers';
import Filters from './Filters';
import { Container } from 'react-bootstrap';

export default class Trends extends React.Component {
  render() {
    return (
      <Container>
        <div className="Header">
          <h2>Developer Trends</h2>
        </div>
        <Filters />
        <div className="Trends">
          <Developers />
        </div>
      </Container>
    );
  }
}
