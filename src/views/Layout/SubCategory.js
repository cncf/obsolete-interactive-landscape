import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ItemModal from './../../components/ItemModal';
import Iconator from './../../components/Iconator';
import Color from './utilities/Color';

const SubCategoryView = ({ cat, match, data }) => {
  const category = data.landscape[cat];
  const subCategory = category.subcategories[match.params.id];
  
  if (!subCategory) {
    return <div>No Sub Category called like that</div>;
  }

  return (
    <div className="module">
      <Iconator icon={category.slug_name} size="background" />
      <div className="stillbox" id={Color(category.slug_name)}>
        <div className="box-2 category-box">
          <div className="subcateg-title">
            <Link to={{ pathname: `/${category.slug_name}` }}>
              <span>
                {category.name}
              </span>
            </Link>
            <span> / {subCategory.name}</span>
          </div>
          <div className=" box-items">
            
            {subCategory.items.map((i, index) => (
              <ItemModal data={i} category={category.slug_name} index={index} >
                <div className="item c-tooltip" >
                  <h4
                    className={classNames('company', { no_oss: !i.oss })}
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

