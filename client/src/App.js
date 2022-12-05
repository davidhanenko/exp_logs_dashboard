import React, { Fragment, useEffect } from 'react';
import TopBar from './components/layout/TopBar';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';
import { Provider } from 'react-redux';
import store from './app/store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import LogsContainer from './components/layout/LogsContainer';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();

    // FAB float to left
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        const elems = document.querySelectorAll(
          '.fixed-action-btn'
        );
        M.FloatingActionButton.init(elems, {
          direction: 'left',
        });
      }
    );
  });

  return (
    <Provider store={store} className='grey lighten-3'>
      <Fragment>
        <TopBar />
        <div className='container grey lighten-3'>
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechListModal />
          <LogsContainer />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
