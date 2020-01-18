import React from 'react';
import { create } from 'react-test-renderer';
import Link from '../../views/Developers/Link';

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

describe('Link Component', () => {
  test('Matches the snapshot', () => {
    const link = create(<Link href={developer.url} />);
    expect(link.toJSON()).toMatchSnapshot();
  });
});
