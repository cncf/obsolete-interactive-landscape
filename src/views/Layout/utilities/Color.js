
const Color = (cat) =>{
  let value;
  switch (cat) {
    case 'apis':
      value = '1';
      break;
    case 'data':
      value = '1';
      break;
    case 'app_definition_development':
      value = '1';
      break;
    case 'observability_analysis':
      value = '2';
      break;
    case 'platform':
      value = '3';
      break;
    case 'orchestration_and_management':
      value = '4';
      break;
    case 'runtime':
      value = '5';
      break;
    case 'provisioning':
      value = '6';
      break;
    case 'public_cloud':
      value = '7';
      break;
    default : value = '1';
  }
  
  value = 'cat_'+ value;
  return value;
  
};

export default Color;
