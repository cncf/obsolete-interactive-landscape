
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
      // inverse Mapping
    case 0:
      value = 'app_definition_development';
      break;
    case 1:
      value = 'orchestration_and_management';
      break;
    case 2:
      value = 'runtime';
      break;
    case 3:
      value = 'provisioning';
      break;
    case 4:
      value = 'public_cloud';
      break;
    case 5:
      value = 'platform';
      break;
    case 6:
      value = 'observability_analysis';
      break;
    case 7:
      value = 'apis';
      break;
    case 8:
      value = 'data';
      break;
    default : value = '0';
  }
  return value;
};

export default Mapping;
