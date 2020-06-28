import React, { createContext, useReducer } from 'react';
import reducer, { initialState } from './reducer';

export const context = createContext(initialState);

export const ImagesLoadedWrapper = ({ children, onImagesLoaded }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let debounce = null;

    const setLoaded = () => {
        clearTimeout(debounce);

        debounce = setTimeout(() => {
            // If all images are not loaded wait a bit more
            if (Object.values(state.images).includes('pending'))
                return setLoaded();

            dispatch({ type: 'images/loaded' });

            // Run the callback if it has been provided
            onImagesLoaded && onImagesLoaded();
        }, 200);
    };

    return React.createElement(
        context.Provider,
        {
            value: {
                state,
                dispatch,
                setLoaded,
            },
        },
        children
    );
};

export default ImagesLoadedWrapper;
