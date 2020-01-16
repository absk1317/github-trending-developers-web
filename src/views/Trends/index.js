import React from 'react';
import './index.css';
import DevelopersList from '../Developers/';
import Filters from './Filters';
import { Container } from 'react-bootstrap';

export default () => {
  return (
    <Container>
      <div className="Header">
        <h2>Developer Trends</h2>
      </div>
      <Filters />
      <div className="Trends">
        <DevelopersList />
      </div>
    </Container>
  );
};
