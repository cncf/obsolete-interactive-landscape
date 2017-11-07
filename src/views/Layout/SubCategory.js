import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import ItemModal from './../../components/ItemModal';
import Iconator from './../../components/Iconator';
import Mapping from './utilities/Mapping';

const SubCategoryView = ({ cat, match, data }) => {
  const category = data.landscape[cat];
  const subCategory = category.subcategories[match.params.id];
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
          <div className=" box-items">
            
            {subCategory.items.map((i, index) => (
              <ItemModal data={i} cat={category.name} subcat={subCategory.name} index={index} >
                <div className="item c-tooltip" >
                  <div
                    className={ClassNames('company', { no_oss: !i.oss })}
                    style={{ backgroundImage: `url(${i.raw_logo})` }}
                    data-placement="top"
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

