import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';

const Profiles = (props) => {
  useEffect(() => {
    getProfiles();
  }, getProfiles);
  return <div></div>;
};

Profiles.propTypes = {};

export default connect(null)(Profiles);
