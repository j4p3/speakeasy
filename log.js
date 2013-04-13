function enter(data, label) {
  var pre = "";

  switch (label) {
    case "IP":
      pre="  CONNECTION FROM: ";
      break;
    case "REQUEST":
      pre="    REQUEST FOR: ";
      break;
    case "ROUTE":
      pre="      ROUTING TO: ";
      break;
    case "RH":
      pre="        FUNCTION: ";
      break;
    case 404:
      pre="  ERROR: "
      break;
    default:
      pre="  ";
  } 

  console.log(pre + data);
}

exports.enter = enter;