 import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTechs,
  selectAllTechs,
} from '../../features/techs/techsSlice';

const TechSelectOptions = () => {
  const dispatch = useDispatch();

  const techStatus = useSelector(
    state => state.techs.status
  );

  const techs = useSelector(selectAllTechs);

  useEffect(() => {
    dispatch(fetchTechs());
  }, [dispatch]);

  return (
    techStatus !== 'loading' &&
    techs !== null &&
    techs.map(t => (
      <option
        key={t._id}
        value={`${t.firstName} ${t.lastName}`}
      >
        {t.firstName} {t.lastName}
      </option>
    ))
  );
};

export default TechSelectOptions;
