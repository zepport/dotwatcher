import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Figure = styled.figure`${tachyons}`;
const Img = styled.img`${tachyons}`;

const Image = ({src, alt}) => {
	const format = src.match(/\.png$/) ? '&fm=jpg' : ''
	return (
		<Img img db bg_light_gray mb4
			alt={alt}
			src={`${src}?w=400${format}&q=60`}
			srcSet={`${src}?w=600${format}&q=60 1024w,
				${src}?w=400${format}&q=60 768w,
				${src}?w=320${format}&q=60 320w`}
			sizes="200vw"
		/>
	);
};

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired
};

export default Image;
