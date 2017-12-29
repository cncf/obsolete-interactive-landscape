import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import _ from 'lodash';
import ItemModal from './../../components/ItemModal';
import Iconator from './../../components/Iconator';
import Mapping from './utilities/Mapping';

const SubCategoryView = ({ cat, match, data, state }) => {
  const category = data.landscape[cat];
  
  const subCategory = category.subcategories[match.params.id];
  const sorted = _.sortBy(subCategory.items, [function sort(o) { return o.name; }]);
  
  const filter1 = state.filter_cncf;
  const filter2 = state.filter_oss;
  const filter3 = state.filter_com;
  
  const thisCat = `cat_${Mapping(category.slug_name)}`;
  
  if (!subCategory) {
    return <div>No Sub Category called like that</div>;
  }
  
  const renderCalculated = (c) => {
    let element;
    if (c.calculated) {
      if (c.calculated.resized_logo) {
        element = c.calculated.resized_logo;
      }
    }
    return element;
  }
  
  return (
    <div className="module">
      <Iconator icon={category.slug_name} size="background" />
      <div className={ClassNames(`stillbox ${thisCat}`)} >
        
        <div className="box-2 category-box">
          <div className="subcateg-title">
            <Link to={{ pathname: `/${category.slug_name}` }}>
              <span className="category-title">
                {category.name}
              </span>
            </Link>
            <span> / {subCategory.name}</span>
          </div>
          <div className={ClassNames('box-items', { filter_cncf: !filter1 }, { filter_oss: !filter2 }, { filter_commercial: !filter3 })}>
            
            {sorted.map((i, index) => (
              <ItemModal
                data={i}
                cat={category.name}
                subcat={subCategory.name}
                index={index}
                key={i.slug_name}
                className="9714"
              >
                <div
                  className={ClassNames('item c-tooltip', { item_oss: i.oss && !i.cncf }, { item_commercial: !i.oss }, { item_cncf: i.cncf })}
                >
                  <div
                    className="company"
                    style={{ backgroundImage: `url(${renderCalculated(i)})` }}
                    title="Bosch"
                  />
                  
                  <div className="company-name">
                    {i.name} +  {i.oss ? 'OSS' : ''}
                  </div>
                </div>
              </ItemModal>
            ))}
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default SubCategoryView;

