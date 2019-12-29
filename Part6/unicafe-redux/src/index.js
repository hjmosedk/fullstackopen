import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const action = type => {
    return () => {
      store.dispatch({
        type,
      });
    };
  };

  return (
    <div>
      <button onClick={action('GOOD')}>Good</button>
      <button onClick={action('OK')}>Neutral</button>
      <button onClick={action('BAD')}>Bad</button>
      <button onClick={action('ZERO')}>Reset Stats</button>
      <div>Good {store.getState().good}</div>
      <div>Neutral {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
