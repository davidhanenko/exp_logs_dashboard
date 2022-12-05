import React, { useCallback, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import {
  fetchLogs,
  deleteLog,
  selectAllLogs,
} from '../../features/logs/logsSlice';

import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = () => {
  const dispatch = useDispatch();

  const logStatus = useSelector(state => state.logs.status);
  const logs = useSelector(selectAllLogs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  const onDelete = useCallback(id => {
    dispatch(deleteLog(id)).then(() =>
      dispatch(fetchLogs())
    );
    M.toast({ html: 'Log deleted' });
  }, []);

  if (logStatus === 'loading' || logs === null) {
    return <Preloader />;
  }

  return (
    <div id='logs'>
      <ul className='collection with-header logs-collection'>
        <li className='collection-header'>
          <h4 className='center'>System Logs</h4>
        </li>
        {logStatus !== 'loading' && logs.length === 0 ? (
          <p className='center'>No logs to show...</p>
        ) : (
          logs.map(log => (
            <LogItem
              log={log}
              key={log._id}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default Logs;
