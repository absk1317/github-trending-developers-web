import React from 'react';
import { create } from 'react-test-renderer';
import DeveloperCard from '../../views/Developers/Card';

const developer = {
  username: 'SomeUserName',
  name: 'Some Name',
  type: 'User',
  url: 'some url',
  avatar: 'some avatar',
  repo: {
    name: 'RepoName',
    description: 'Repo Description',
    url: 'RepoURL',
  },
};

describe('DeveloperCard Component', () => {
  test('Matches the snapshot', () => {
    const card = create(<DeveloperCard developer={developer} />);
    expect(card.toJSON()).toMatchSnapshot();
  });
});
