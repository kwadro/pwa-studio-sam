import React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from '../../classify';
import Image from '../Image';
import logo from './logo.svg';

/**
 * A component that renders a logo in the header.
 *
 * @typedef Logo
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = props => {
    const { height, width } = props;
    const classes = mergeClasses({}, props.classes);

    return (
        <Image
            alt="Yonka"
            classes={{ image: classes.logo }}
            height={height}
            src={logo}
            title="Yonka"
            width={width}
        />
    );
};

/**
 * Props for {@link Logo}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Logo component.
 * @property {string} classes.logo classes for logo
 * @property {number} height the height of the logo.
 */
Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    }),
    height: PropTypes.number,
    width: PropTypes.number
};

Logo.defaultProps = {
    height: 100,
    width: 189
};

export default Logo;
