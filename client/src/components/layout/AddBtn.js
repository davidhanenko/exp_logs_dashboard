import React from 'react';

const AddBtn = () => {
  return (
    <div className='fixed-action-btn '>
      <div className='btn-floating btn-large blue darken-2 pulse'>
        <i className='large material-icons'>add</i>
      </div>
      <ul>
        <li>
          <a
            href='#tech-list-modal'
            className='btn-floating yellow modal-trigger tooltipped'
            data-position='bottom'
            data-tooltip='View techs'
          >
            <i className='material-icons'>person</i>
          </a>
        </li>
        <li>
          <a
            href='#add-tech-modal'
            className='large btn-floating red modal-trigger tooltipped'
            data-position='bottom'
            data-tooltip='Add tech person'
          >
            <i className='material-icons'>person_add</i>
          </a>
        </li>
        <li>
          <a
            href='#add-log-modal'
            className='btn-floating green modal-trigger tooltipped'
            data-position='bottom'
            data-tooltip='Add new log'
          >
            <i className='large material-icons'>
              library_add
            </i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
