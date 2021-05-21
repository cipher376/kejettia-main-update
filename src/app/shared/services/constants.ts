
export const PRODUCT_FILTERS = [
  'underPrice', 'btnPrice', 'fromToPrice',
  'canned', 'bottled', 'baked', 'bagged', 'alcoholic', 'nonAlcoholic', 'sugary',
  'above2Months', 'btween1and2Months', 'belowAMonth'
];

export const PRODUCT_FILTER_MENU = [
  {
    title: 'Category',
    filters: [
      {
        name: 'canned',
        checked: false
      },
      {
        name: 'bottled',
        checked: false
      },
      {
        name: 'baked',
        checked: false
      },
      {
        name: 'bagged',
        checked: false
      },
      {
        name: 'alcoholic',
        checked: false
      },
      {
        name: 'nonAlcoholic',
        checked: false
      },
      {
        name: 'sugary',
        checked: false
      }
    ]
  },
  {
    title: 'Expiration Condition',
    filters: [
      {
        name: 'above2Months',
        checked: false
      },
      {
        name: 'btween1and2Months',
        checked: false
      },
      {
        name: 'belowAMonth',
        checked: false
      }
    ]
  }
];

export interface ProductFilterItem {
  name: string;
  value1: any;
  value2: any;
  isCustom: boolean;
  on: boolean;
}

export const PRODUCT_FILTER_ITEMS = {
  underPrice: {
    name: 'under_price',
    value1: 0,
    value2: 10,
    isCustom: false,
    on: false
  },
  btnPrice: {
    name: 'btween_price',
    value1: 10,
    value2: 100,
    isCustom: false,
    on: false
  },
  fromToPrice: {
    name: 'btween_price',
    value1: 0,
    value2: 1000,
    isCustom: false,
    on: false
  },

  // Filter Category
  canned: {
    name: 'Canned',
    value1: 'canned',
    value2: '',
    isCustom: false,
    on: false
  },
  bottled: {
    name: 'Bottled',
    value1: 'bottled',
    value2: '',
    isCustom: false,
    on: false
  },
  baked: {
    name: 'Baked',
    value1: 'baked',
    value2: '',
    isCustom: false,
    on: false
  },
  bagged: {
    name: 'Bagged',
    value1: 'bagged',
    value2: '',
    isCustom: false,
    on: false
  },
  alcoholic: {
    name: 'Alcoholic',
    value1: 'alcoholic',
    value2: '',
    isCustom: false,
    on: false
  },
  nonAlcoholic: {
    name: 'Non-Alcoholic',
    value1: 'non-alcoholic',
    value2: '',
    isCustom: false,
    on: false
  },
  sugary: {
    name: 'Sugary',
    value1: 'sugary',
    value2: '',
    isCustom: false,
    on: false
  },


  // Expiration Date filterign
  above2Months: {
    name: 'greater than 2 months',
    value1: 'above2Months',
    value2: '',
    isCustom: false,
    on: false
  },
  btween1and2Months: {
    name: 'Between 1 and 2 months',
    value1: 'btween1and2Months',
    value2: '',
    isCustom: false,
    on: false
  },
  belowAMonth: {
    name: 'Less than a month',
    value1: 'belowAMonth',
    value2: '',
    isCustom: false,
    on: false
  }
};


export enum CATEGORY_TYPE {
  main = 'main',
  sub1 = 'sub1',
  sub2 = 'sub2'
}

export enum GENDER_TYPE {
  MALE = 'male',
  FEMALE = 'female',
  MIXED = 'mixed'
}

