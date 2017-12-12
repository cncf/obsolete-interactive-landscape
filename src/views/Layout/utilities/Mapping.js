
const Mapping = (cat) => {
  let value;
  switch (cat) {
    case 'app_definition_development':
      value = '0';
      break;
    case 'orchestration_and_management':
      value = '1';
      break;
    case 'runtime':
      value = '2';
      break;
    case 'provisioning':
      value = '3';
      break;
    case 'public_cloud':
      value = '4';
      break;
    case 'platform':
      value = '5';
      break;
    case 'observability_analysis':
      value = '6';
      break;
    case 'apis':
      value = '7';
      break;
    case 'data':
      value = '8';
      break;
    default : value = '3';
  }
  return value;
};

export default Mapping;
