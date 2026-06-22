import { Platform } from 'react-native';

export const shadows = {
  boxShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: 'rgba(197, 197, 197, 0.5)',
          shadowOpacity: 0.5,
          shadowRadius: 4,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        }
      : {
          elevation: 2,
        },
};
