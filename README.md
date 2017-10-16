# REACT 3D INFOGRAPHIC

run dev:
`npm run start`
`yarn start`



<div className="module">
  <Iconator icon={category.slug_name} size="background"/>
  <div className="stillbox">
    <Link to={{ pathname: `/${category.slug_name}`}}>
      <h2 className="category-title-6 categ">
        <div className="ico-prov ico-small"/>
        {category.name}
      </h2>
    </Link>
    
    <div className="box-2">
      <h2 className="categ-color6">
        {subCategory.name}
      </h2>
      <div className="category-detail6-0  box-items categ-color6">
        
        {subCategory.items.map((i,index) =>(
          <ItemModal data={i} index={index} >
            <div className="item c-tooltip">
              <h4 className="company" style={{ backgroundImage: `url(${i.calculated.resized_logo})`}} data-placement="top" title="Bosch">
              </h4>
              <div className="company-name">
                {i.name}
              </div>
            </div>
          </ItemModal>
        ))}
      </div>
      <Link
        to={{
          pathname: `/${category.slug_name}`,
          // this is the trick!
          state: { modal: true }
        }}
      >
        <i className="arrow left icon"/> Back to {category.name}
      </Link>
    </div>
  </div>
</div>