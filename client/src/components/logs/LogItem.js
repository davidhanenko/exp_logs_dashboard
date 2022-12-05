import React from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { setCurrentLog } from '../../features/logs/logsSlice';

const LogItem = ({ log, onDelete }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <li className='collection-item'>
        <div>
          <a
            onClick={() => dispatch(setCurrentLog(log))}
            href='#edit-log-modal'
            className={`modal-trigger log-title ${
              log.attention ? 'red-text' : 'blue-text'
            }`}
          >
            <p className='log-message'>{log.message}</p>
          </a>

          <span className='grey-text log-meta'>
            <span className='black-text'>id {log._id}</span>{' '}
            last updated by{' '}
            <span className='black-text log-tech'>
              {' '}
              {log.tech}{' '}
            </span>{' '}
            on{' '}
            <Moment format='MMMM Do YYYY, h:mm:ss A'>
              {log.date}
            </Moment>
          </span>
          <button
            onClick={() => onDelete(log._id)}
            className='secondary-content log-delete'
          >
            <i className='material-icons grey-text'>
              delete
            </i>
          </button>
        </div>
      </li>
    </div>
  );
};

export default LogItem;
