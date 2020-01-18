import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import List from '../../views/Developers/List';
import { en } from '../../utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialLanguages = [{ value: null, label: 'Select any Language' }];
const trendingPeriods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const developers = [
  {
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
  },
];

const initialState = {
  developers: {
    data: developers,
    isLoading: false,
    errored: false,
  },
  filters: {
    languages: initialLanguages,
    currentLanguage: initialLanguages[0],
    trendingPeriods,
    trendingPeriod: trendingPeriods[0],
  },
};

describe('List Component', () => {
  test('Matches the snapshot with text', () => {
    const store = mockStore(initialState);
    const list = create(
      <Provider store={store}>
        <List />
      </Provider>,
    );
    expect(list.toJSON()).toMatchSnapshot();
  });
});

describe('List Component', () => {
  test('Matches the snapshot loading', () => {
    const store = mockStore({
      ...initialState,
      filters: { ...initialState.filters, loading: true },
    });
    const list = create(
      <Provider store={store}>
        <List />
      </Provider>,
    );
    expect(list.toJSON()).toMatchSnapshot();
  });
});

describe('List Component', () => {
  test('Matches the snapshot errored', () => {
    const store = mockStore({
      ...initialState,
      filters: { ...initialState.filters, errored: true },
    });
    const list = create(
      <Provider store={store}>
        <List />
      </Provider>,
    );
    expect(list.toJSON()).toMatchSnapshot();
  });
});

describe('List Component', () => {
  test('Matches the snapshot no data', () => {
    const store = mockStore({
      ...initialState,
      developers: {
        ...initialState.developers,
        data: [],
        alert: en({ since: 'daily', language: 'ruby' }).noData,
      },
    });
    const list = create(
      <Provider store={store}>
        <List />
      </Provider>,
    );
    expect(list.toJSON()).toMatchSnapshot();
  });
});
