var express = require('express');
var router = express.Router();

var gpio = require('gpio');
var gpio4 = gpio.export(4);
var intervals;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/switch', function(req, res){
  var next_state = (gpio4.value == 1)?0:1;
  console.log("Next State : ", next_state);     
  gpio4.set(parseInt(next_state), function(){
   res.json({state : gpio4.value});  
  });
});

router.post('/blink', function(req, res){
  if(req.body.state == 0) {   
    clearInterval(intervals);    
    gpio4.reset();
    return res.json({state : 0});
  }else{
  intervals = setInterval(function(){
    gpio4.set();
    setTimeout(function(){
      gpio4.reset();
    },500)
  },1000)
  return res.json({state : 1});
  }
});


module.exports = router;
