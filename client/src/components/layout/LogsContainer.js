import React from 'react';
import Logs from '../logs/Logs';
import TechsList from '../techs/TechsList';

const LogsContainer = () => {
  return (
    <div className='row'>
      <div className='col s12 m10'>
        <Logs />
      </div>
      <div className='col s12 m2 center'>
        <TechsList />
      </div>
    </div>
  );
};

export default LogsContainer;
