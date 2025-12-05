// frontend/src/utils/categoryUtils.js
export const CATEGORIES = {
  ALL: "All",
  SALAD: "Salad",
  ROLLS: "Rolls",
  DESERTS: "Deserts",
  SANDWICH: "Sandwich",
  CAKE: "Cake",
  PURE_VEG: "Pure Veg",
  NON_VEG: "Non Veg",
  PASTA: "Pasta",
  NOODLES: "Noodles",
  BEVERAGES: "Beverages"
};

export const normalizeCategory = (category) => {
  if (!category) return CATEGORIES.ALL;
  
  const normalized = category.trim();
  
  const categoryMap = {
    'dessert': CATEGORIES.DESERTS,
    'desserts': CATEGORIES.DESERTS,
    'desert': CATEGORIES.DESERTS,
    'roll': CATEGORIES.ROLLS,
    'salads': CATEGORIES.SALAD,
    'vegetarian': CATEGORIES.PURE_VEG,
    'veg': CATEGORIES.PURE_VEG,
    'nonveg': CATEGORIES.NON_VEG,
    'non-veg': CATEGORIES.NON_VEG,
    'non vegetarian': CATEGORIES.NON_VEG,
    'pasta dishes': CATEGORIES.PASTA,
    'noodle': CATEGORIES.NOODLES,
    'sandwiches': CATEGORIES.SANDWICH,
    'cakes': CATEGORIES.CAKE,
    'beverage': CATEGORIES.BEVERAGES,
    'drinks': CATEGORIES.BEVERAGES,
    'drink': CATEGORIES.BEVERAGES
  };
  
  return categoryMap[normalized.toLowerCase()] || normalized;
};

export const getCategoryIcon = (category) => {
  // This should match your assets
  const icons = {
    [CATEGORIES.SALAD]: 'salad_icon',
    [CATEGORIES.ROLLS]: 'roll_icon',
    [CATEGORIES.DESERTS]: 'dessert_icon',
    [CATEGORIES.SANDWICH]: 'sandwich_icon',
    [CATEGORIES.CAKE]: 'cake_icon',
    [CATEGORIES.PURE_VEG]: 'pure_veg_icon',
    [CATEGORIES.NON_VEG]: 'non_veg_icon',
    [CATEGORIES.PASTA]: 'pasta_icon',
    [CATEGORIES.NOODLES]: 'noodles_icon',
    [CATEGORIES.BEVERAGES]: 'beverages_icon',
  };
  
  return icons[category] || 'default_icon';
};