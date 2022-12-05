import React from 'react';
import capitalizeStr from '../../helpers/capitalizeStr';

const TechItem = ({
  tech: { _id: id, firstName, lastName },
  onDelete,
}) => {
  firstName = capitalizeStr(firstName);
  lastName = capitalizeStr(lastName);

  return (
    <li className='collection-item'>
      <div>
        {firstName} {lastName}
        <a
          href='#!'
          className='secondary-content'
          onClick={() => onDelete(id, firstName, lastName)}
        >
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

export default TechItem;
