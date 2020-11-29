import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  match: {
    params: { userId },
  },
  auth,
  profile: { profile, loading },
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(userId);
  }, [getProfileById, userId]);

  return profile === null || loading ? (
    <Spinner />
  ) : (
    <>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
        <Link to='/edit-profile' className='btn btn-dark'>
          Edit Profile
        </Link>
      )}

      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />

        {/* <!-- Experience --> */}
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {profile.experience.length > 0 ? (
            <>
              {profile.experience.map((experience) => (
                <ProfileExperience key={experience._id} experience={experience} />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>

        {/* <!-- Education --> */}
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {profile.education.length > 0 ? (
            <>
              {profile.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>

        {/* <!-- Github --> */}
        <div className='profile-github'>
          <h2 className='text-primary my-1'>
            <i className='fab fa-github'></i> Github Repos
          </h2>
          <div className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  Repo One
                </a>
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: 44</li>
                <li className='badge badge-dark'>Watchers: 21</li>
                <li className='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  Repo Two
                </a>
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: 44</li>
                <li className='badge badge-dark'>Watchers: 21</li>
                <li className='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
