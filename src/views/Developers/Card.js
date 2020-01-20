import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import Link from './Link';
import './styles.css';

export default ({ developer }) => {
  return (
    <Card className="CardContainer">
      <Link href={developer.url}>
        <Card.Img src={developer.avatar} className="ProfileIcon" />
      </Link>
      <Card body className="DeveloperDetails">
        <DeveloperDetails developer={developer} />
        <RepoDetails repo={developer.repo} />
      </Card>
    </Card>
  );
};

const DeveloperDetails = ({ developer }) => {
  return (
    <Card.Title className="DeveloperDetailsTitle">
      {developer.name}
      <span className="Username"> ({developer.username})</span>
      {developer.type !== 'user' && <span className="Username"> ({developer.type})</span>}
    </Card.Title>
  );
};

const RepoDetails = ({ repo }) => {
  return (
    <ListGroup.Item>
      <Card body className="RepoDetails">
        <Button className="RepoLink">
          <Link href={repo.url}>{repo.name}</Link>
        </Button>
        <ListGroup.Item className="RepoDescription">{repo.description.trim()}</ListGroup.Item>
      </Card>
    </ListGroup.Item>
  );
};
