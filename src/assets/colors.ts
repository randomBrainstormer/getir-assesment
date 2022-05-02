export interface AppThemeColors {
  mainColor: string;
  mainColorShadow: string; // contrast color to mainColor
  mainColorContrast: string; // contrast color to mainColor
  secondaryColor: string;
  secondaryColorContrast: string;
  backgroundColor: string;
  backgroundColorContrast: string; // contrast for bg color
  paginationText: string; //
}

export interface ThemedComponent {
  theme: AppThemeColors;
}

export const lightThemeColors: AppThemeColors = {
  mainColor: '#1EA4CE',
  mainColorShadow: '#147594',
  mainColorContrast: '#FFFFFF',
  secondaryColor: '#F2F0FD',
  secondaryColorContrast: '#1EA4CE',
  backgroundColor: '#FAFAFA',
  backgroundColorContrast: '#FFFFFF',
  paginationText: '#697488',
};

export const darkThemeColors: AppThemeColors = {
  mainColor: '#1EA4CE',
  mainColorShadow: '#147594',
  mainColorContrast: '#FFFFFF',
  secondaryColor: '#F2F0FD',
  secondaryColorContrast: '#1EA4CE',
  backgroundColor: '#E5E5E5',
  backgroundColorContrast: '#FFFFFF',
  paginationText: '#697488',
};
