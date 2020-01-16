import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

export default ({ developer }) => {
  return (
    <Card style={{ width: '18rem', padding: 20 }}>
      <a
        href={developer.url}
        target="_blank"
        style={{ textDecoration: 'none' }}
        rel="noopener noreferrer"
      >
        <Card.Img src={developer.avatar} style={{ width: '200px', height: '200px' }} />
      </a>
      <Card body className="DeveloperDetails">
        <Card.Title style={{ marginBottom: 20, textAlign: 'center' }}>
          {developer.name}
          <span className="username"> ({developer.username})</span>
          {developer.type !== 'user' && <span className="username"> ({developer.type})</span>}
        </Card.Title>

        <ListGroup.Item>
          <Card body style={{ textAlign: 'center' }}>
            <Button variant="primary" size="lg" className="RepoLink">
              <a
                href={developer.repo.url}
                target="_blank"
                style={{ textDecoration: 'none' }}
                rel="noopener noreferrer"
              >
                {developer.repo.name}
              </a>
            </Button>
            <ListGroup.Item className="RepoDescription">
              {developer.repo.description.trim()}
            </ListGroup.Item>
          </Card>
        </ListGroup.Item>
      </Card>
    </Card>
  );
};
