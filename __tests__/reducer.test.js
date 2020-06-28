import reducer, { initialState } from '../src/reducer';

describe('Reducer', () => {
    test('It returns initial state', () => {
        const state = reducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('image/add adds an image to the state', () => {
        const state = reducer(initialState, {
            type: 'image/add',
            payload: 'foo.jpg',
        });
        expect(state).toEqual({
            ...initialState,
            images: { 'foo.jpg': 'pending' },
        });

        const secondState = reducer(state, {
            type: 'image/add',
            payload: 'bar.jpg',
        });
        expect(secondState).toEqual({
            ...state,
            images: { ...state.images, 'bar.jpg': 'pending' },
        });
    });

    test('image/loaded updates the status of an image', () => {
        const state = reducer(
            {
                ...initialState,
                images: { 'foo.jpg': 'pending', 'bar.jpg': 'pending' },
            },
            { type: 'image/loaded', payload: 'bar.jpg' }
        );
        expect(state).toEqual({
            ...state,
            images: { ...state.images, 'bar.jpg': 'loaded' },
        });
    });

    test('images/loaded updates the bool for all images loaded', () => {
        const state = reducer(initialState, { type: 'images/loaded' });
        expect(state).toEqual({ ...initialState, imagesLoaded: true });
    });
});
