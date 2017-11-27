import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import _ from 'lodash';
import ItemModal from './../../components/ItemModal';
import Iconator from './../../components/Iconator';
import Mapping from './utilities/Mapping';

const SubCategoryView = ({ cat, match, data, filters }) => {
  const category = data.landscape[cat];
  
  const subCategory = category.subcategories[match.params.id];
  const sorted = _.sortBy(subCategory.items, [function sort(o) { return o.name; }]);
  
  const filter1 = filters.cncf.status;
  const filter2 = filters.oss.status;
  const filter3 = filters.commercial.status;
  
  const thisCat = `cat_${Mapping(category.slug_name)}`;
  
  if (!subCategory) {
    return <div>No Sub Category called like that</div>;
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
          <div className={ClassNames('box-items', { f_cncf: filter1 }, { f_oss: filter2 }, { f_commercial: filter3 })}>
            
            {sorted.map((i, index) => (
              <ItemModal
                data={i}
                cat={category.name}
                subcat={subCategory.name}
                index={index}
                key={i.slug_name}
              >
                <div className="item c-tooltip" >
                  <div
                    className={ClassNames('company', { no_oss: !i.oss }, { cncf: i.cncf })}
                    style={{ backgroundImage: `url(${i.raw_logo})` }}
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

