import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductVariation, VariationAttribute } from 'src/app/models';

@Component({
  selector: 'app-product-variation-select',
  templateUrl: './product-variation-select.component.html',
  styleUrls: ['./product-variation-select.component.scss']
})
export class ProductVariationSelectComponent implements OnInit {
  private variations: ProductVariation[] = [];
  private selectedProductVariation: ProductVariation;
  private variationAttributes: VariationAttribute[] =[];
  variationNames: string[] = [];
  variationValues: string[][] =[]; 
  selectedValues: string[] = []; //[name_value]
  variationOptionLength = 0;
  // selectedValue: string='';

  @Output() guideEvent = new EventEmitter<any>();
  @Output() selectedProductVariationEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  // store new name if not found
  getNameIndex(name: string): number{
    let index = -1;
    let found = false;
    for(const n of this.variationNames){
      index++;
      if(n?.toString().toLowerCase()?.includes(name.toLowerCase()))
      {
        found = true;
        // console.log('found');
        return index;
      }
    }

    if(!found){
      this.variationNames.push(name);
      return (this.variationNames?.length-1)
    }
    return -1;
  }


  @Input() set ProductVariations(variations: ProductVariation[]) {
    this.variations = variations;
    this.variationAttributes = [];
    this.variationNames = [];
    this.variationValues=[];

    this.variations?.forEach(v=> {
      this.variationAttributes = this.variationAttributes?.concat(v?.attributes)
      this.variationOptionLength = v?.attributes.length;
    });

    this.variationAttributes.forEach(att=>{
      const index = this.getNameIndex(att?.name);

      // console.log(index);

      // first time, create a container if name is not encountered yet
      if(index >= this.variationValues?.length) this.variationValues.push([]);
      if(!this.variationValues[index]?.includes(att.option))
        this.variationValues[index]?.push(att.option);
    })

    // console.log(this.variationAttributes);
    // console.log(this.variationValues);

  }


  get ProductVariations() {
    return this.variations;
  }

  get SelectedProductVariation() {
    return this.selectedProductVariation?.id
  }

  set SelectedValue(value: any) {
    // this.selectedValue = value;
    // insert a new selected value 
    let found = false;
    this.selectedValues?.forEach((v,i) => {
      if(value.split('_')[0] == v.split('_')[0]){
        this.selectedValues[i] = value;
        found = true;
      }
    });
    if(!found){
      this.selectedValues?.push(value);
    }
    // console.log(this.selectedValues)

    // search for the selected varition id
    if(this.selectedValues?.length == this.variationOptionLength){
      this.getVariationId();
    }

  }

  // get SelectedValue(){
  //   // return this.selectedValue;
  //   return '';
  // }

  getVariationId(): ProductVariation{
      for(const varia of this.variations){
        let counter = 0;
        this.selectedValues?.forEach(v=> {
        const v_=v.split('_')
        // console.log(JSON.stringify(varia.attributes?.toString()))
        let found = false;
        varia.attributes?.forEach(at=>{
          // console.log(at.option)
          // console.log(v_[1])
          if(at.option === v_[1]){
            found = true;
          }
        });

        if(found){
          counter++;
          console.log('searching')
        }
      })

      if(counter === this.variationOptionLength){
        this.selectedProductVariationEvent.emit(varia);
        return varia;
      }
    }
    return undefined;
  }

  goToGuide(guide: string) {
    this.guideEvent.emit(guide);
  }

}
