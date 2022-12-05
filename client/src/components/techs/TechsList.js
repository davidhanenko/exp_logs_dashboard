import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  fetchTechs,
  selectAllTechs,
} from '../../features/techs/techsSlice';
import Preloader from '../layout/Preloader';

const TechsList = () => {
  const techs = useSelector(selectAllTechs);
  const techStatus = useSelector(
    state => state.techs.status
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTechs());
  }, [dispatch]);

  if (techStatus === 'loading' || techs === null) {
    return <Preloader />;
  }

  return (
    <>
      <h4>Techs</h4>
      <ul className='tech-list'>
        {techs.map(t => (
          <li
            key={t._id}
            className='initials center-align tooltipped'
            data-position='right'
            data-tooltip='I am a tooltip'
          >
            <strong>
              {t.firstName[0]}
              {t.lastName[0]}
            </strong>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TechsList;
