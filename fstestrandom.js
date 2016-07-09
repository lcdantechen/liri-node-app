var fs = require('fs');
fs.readFile("random.txt", 'utf8', function(error, data){
  if (error){
  	console.log("there is an error");
  } else{
      console.log(data);
      var result = data.split(',');
      console.log(result);
      /*for (i=0; i<result.length; i++){
  	  // console.log(result[i]);
  	  totalAmount = totalAmount + parseFloat(result[i]);
  	  console.log(totalAmount);

		  }*/

  	}
});