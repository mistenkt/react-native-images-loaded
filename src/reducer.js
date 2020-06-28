export const initialState = { imagesLoaded: false, images: {} };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'image/add':
            return {
                ...state,
                imagesLoaded: false,
                images: {
                    ...state.images,
                    [payload]: 'pending',
                },
            };
        case 'image/loaded':
            return {
                ...state,
                images: {
                    ...state.images,
                    [payload]: 'loaded',
                },
            };
        case 'images/loaded':
            return {
                ...state,
                imagesLoaded: true,
            };
        default:
            return state;
    }
};

export default reducer;
