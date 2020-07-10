import React from 'react';
import { Image as RNImage } from 'react-native';
import useImagesLoaded from './hook';
import { isObject } from './utils';

const Image = ({ source, uri, ...rest }) => {
    const imageUri =
        uri || (source && isObject(source) && source.uri ? source.uri : null);
    const wait = useImagesLoaded(imageUri);

    if (wait) return null;

    return <RNImage source={source || { uri: uri }} {...rest} />;
};

export default Image;
