import React from 'react';
import { Image } from 'react-native';

export enum ResizeMode {
  contain = 'contain',
  cover = 'cover',
  stretch = 'stretch',
  center = 'center',
}

const FastImage = (props: any) => React.createElement(Image, props);
FastImage.resizeMode = ResizeMode;
FastImage.priority = { low: 'low', normal: 'normal', high: 'high' };
FastImage.cacheControl = { immutable: 'immutable', web: 'web', cacheOnly: 'cacheOnly' };

export default FastImage;
