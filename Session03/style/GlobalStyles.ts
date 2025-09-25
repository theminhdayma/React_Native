import type { FlexAlignType } from 'react-native';


export const COLORS = {
  primary: '#3B82F6',
  secondary: '#22C55E',
  text: '#222',
  background: '#fff',
  error: '#EF4444',
  border: '#ccc',
  placeholder: '#888',
  inputBg: '#fafafa',
};

export const FONT_SIZES = {
  small: 14,
  medium: 16,
  large: 18,
  title: 22,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
export const CONTAINER_STYLES = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' as FlexAlignType,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
};