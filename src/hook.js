import React, { useContext, useEffect } from 'react';
import { Image as RNImage } from 'react-native';
import { context } from './context';

const useImagesLoaded = (uri) => {
    const { dispatch, state, setLoaded } = useContext(context);
    const enabled = !!state; // If we dont have a state object the Context provider was not found;
    const imageLoaded = enabled && uri ? state.images[uri] === 'loaded' : true;

    const preLoadImage = async () => {
        dispatch({
            type: 'image/add',
            payload: uri,
        });

        const cachedImages = await RNImage.queryCache([uri]);

        // If the image wasn't found in the cache we prefetch it
        if (!cachedImages[uri]) await RNImage.prefetch(uri);

        dispatch({
            type: 'image/loaded',
            payload: uri,
        });

        setLoaded();
    };

    useEffect(() => {
        if (enabled && uri && !imageLoaded) preLoadImage();
    }, [uri]);

    return !imageLoaded;
};

export default useImagesLoaded;
