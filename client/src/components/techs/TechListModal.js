import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTechs,
  deleteTech,
} from '../../features/techs/techsSlice';
import M from 'materialize-css/dist/js/materialize.min.js';
import TechItem from './TechItem';

const TechListModal = () => {
  const dispatch = useDispatch();

  const techs = useSelector(state => state.techs.techs);

  useEffect(() => {
    dispatch(fetchTechs());
  }, [dispatch]);

  const onDelete = useCallback((id, fName, lName) => {
    dispatch(deleteTech(id)).then(() => {
      dispatch(fetchTechs());
    });
    M.toast({
      html: `Technician ${fName} ${lName} has been deleted`,
    });
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          {techs !== null &&
            techs.map(tech => (
              <TechItem
                tech={tech}
                key={tech._id}
                onDelete={onDelete}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
