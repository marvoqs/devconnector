import React from 'react';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({ education, deleteEducation }) => {
  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map((item) => (
            <tr key={item._id}>
              <td>{item.school}</td>
              <td className='hide-sm'>{item.degree}</td>
              <td className='hide-sm'>
                <Moment format='YYYY/MM/DD'>{item.from}</Moment> - {item.current ? 'Now' : <Moment format='YYYY/MM/DD'>{item.to}</Moment>}
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteEducation(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
