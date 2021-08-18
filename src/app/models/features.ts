export class Features {

  id?: string;
  name?: string;
  value?: string;
  description?: string;
}

export class FeaturesToCartItemThrough {

  id?: string;
  cartItemId: string;
  featuresId: string;

}
