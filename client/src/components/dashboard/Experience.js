import React from 'react';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ experience, deleteExperience }) => {
  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience.map((item) => (
            <tr key={item._id}>
              <td>{item.company}</td>
              <td className='hide-sm'>{item.title}</td>
              <td className='hide-sm'>
                <Moment format='YYYY/MM/DD'>{item.from}</Moment> - {item.current ? 'Now' : <Moment format='YYYY/MM/DD'>{item.to}</Moment>}
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteExperience(item._id)}>
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

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
