interface CCMainButtonSizeConfig {
  height?: number;
  paddingHorizontal?: number;
}

interface CCBoxBorderRadiusConfig {
  small?: number;
  mid?: number;
  large?: number;
}

export interface ComponentSchema {
  CCMainButton?: {
    sizes?: {
      small?: CCMainButtonSizeConfig;
      medium?: CCMainButtonSizeConfig;
      large?: CCMainButtonSizeConfig;
    };
  };
  CCBox?: {
    borderRadius?: CCBoxBorderRadiusConfig;
  };
}
