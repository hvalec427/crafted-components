interface CCMainButtonSizeConfig {
  height?: number;
  paddingHorizontal?: number;
}

export interface ComponentSchema {
  CCMainButton?: {
    sizes?: {
      small?: CCMainButtonSizeConfig;
      medium?: CCMainButtonSizeConfig;
      large?: CCMainButtonSizeConfig;
    };
  };
}
