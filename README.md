# react-native-images-loaded
An imagesloaded wrapper with callback for react-native

## Why?
I needed a clean way to wait for all child Image components to prefetch before fading in the parent component. I could manually prefetch all images in the parent component, but id rather have something that dynamically registers all images inside the context and waits for them to be loaded before triggering the callback provided to the context.

## Installation
`yarn add react-native-images-loaded`

## Usage Example
Simple example, you would probably use an animated value and fade in the wrapper once the images are loaded. Works for images in any depth.

````jsx harmony
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
    ImagesLoadedWrapper, 
    Image
} from 'react-native-images-loaded';

const styles = StyleSheet.create({
    hidden: {
        opacity: 0,
        overflow: 'hidden'
    },
    image: {
        width: 500,
        height: 500
    }
});

const Foo = () => { 
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    return (
        <ImagesLoadedWrapper 
            onImagesLoaded={() => setImagesLoaded(true)}
        >
            <View style={!imagesLoaded && styles.hidden}>
                <Image 
                    source={{uri: 'https://placekitten.com/500/500'}}
                    style={styles.image}
                />
                
                <Image 
                    source={{uri: 'https://placekitten.com/600/600'}}
                    style={styles.image}
                />
                {/* 
                    <ComponentWithMoreImages/>
                    <ComponentWithComponentsThatHasImages/>
                */}
            </View>
        </ImagesLoadedWrapper>
    );

};

export default Foo;
````

## Notes

- If no `ImagesLoadedWrapper` is found then images work as normally.
- The `Image` component extends the default RN Image component and passes on any props.

## Todo

- Finish up writing the tests
- Probably support simple fadein animation out of the box, but for now you have to handle it manually.
