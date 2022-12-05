import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import TechSelectOptions from '../techs/TechSelectOptions';

import {
  updateLog,
  selectCurrentLog,
  fetchLogs,
} from '../../features/logs/logsSlice';

const EditLogModal = () => {
  // local state for form
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const currentLog = useSelector(selectCurrentLog);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLog) {
      setMessage(currentLog.message);
      setAttention(currentLog.attention);
      setTech(currentLog.tech);
    }
  }, [currentLog]);

  const onSubmit = async () => {
    if (message === '' || tech === '') {
      M.toast({
        html: "Please enter a message and tech's name",
      });
    } else {
      const updatedLog = {
        id: currentLog._id,
        message,
        attention,
        tech,
        date: new Date(),
      };

      await dispatch(updateLog(updatedLog)).then(() => {
        dispatch(fetchLogs());
      });
      M.toast({ html: `Log Updated by ${tech}` });

      // // Clear Fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div
      id='edit-log-modal'
      className='modal'
      style={modalStyle}
    >
      <div className='modal-content'>
        <h4>Edit System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span className='black-text'>
                  Needs Attention
                </span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <button
          onClick={onSubmit}
          className='modal-close waves-effect waves-light btn blue'
        >
          Enter
        </button>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

export default EditLogModal;
