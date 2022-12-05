import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchLogs } from '../../features/logs/logsSlice';
import AddBtn from './AddBtn';

const SearchBar = () => {
  const text = useRef('');

  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(searchLogs(text.current.value));
  };

  const closeSearch = () => {
    dispatch(searchLogs(''));
    text.current.value = '';
  };

  return (
    <>
      <div
        id='top-bar'
        className='row container valign-wrapper'
      >
        <div id='search-bar' className='col s12 m8'>
          <form>
            <div className='input-field light-green lighten-2 valign-wrapper'>
              <label
                className='label-icon'
                htmlFor='search'
              >
                <i className='material-icons'>search</i>
              </label>
              <input
                id='search'
                type='search'
                placeholder='Search Logs...'
                ref={text}
                onChange={onChange}
                className='center-align'
              />

              <i
                className='material-icons close-btn'
                onClick={closeSearch}
              >
                close
              </i>
            </div>
          </form>
        </div>

        <div className='col s12 m4 right-align'>
          <div id='add-btn'>
            <AddBtn />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
