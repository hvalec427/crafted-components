import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  label: { color: '#999', fontSize: 10 },
});

const LottieView = React.forwardRef<unknown, any>((props, _ref) => (
  <View style={[styles.container, props.style]}>
    <Text style={styles.label}>▶ Lottie</Text>
  </View>
));

LottieView.displayName = 'LottieView';

export default LottieView;
