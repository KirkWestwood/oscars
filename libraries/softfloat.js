var SoftFloat = function(value, damping, attraction){
  var self = this;
  self.ATTRACTION = 0.2;
  self.DAMPING = 0.5;
  self.value = 0;
  self.acceleration = 0;
  self.velocity = 0;

  if(value != undefined){
    self.value = value;
  }

  if(damping != undefined){
    self.damping = damping;
  } else {
    self.damping = self.DAMPING;
  }

  if(attraction != undefined){
    self.attraction = attraction;
  } else {
    self.attraction = self.ATTRACTION;
  }
  self.target = self.value;

  self.set = function(v){
    self.value = v;
    self.target = v;
    self.targeting = false;
  }

  self.get = function(){
    return self.value;
  }

  self.update = function(){
    if(self.targeting){
      self.acceleration += self.attraction * (self.target - self.value);
      self.velocity = (self.velocity + self.acceleration) * self.damping;
      self.value += self.velocity;
      self.acceleration = 0;
      if(Math.abs(self.velocity) > 0.0001){
        return true;
      }
      self.value = self.target;
      self.targeting = false;
      
    }
    return false;
  }

  self.setTarget = function(t){
    self.targeting = true;
    self.target = t;
  }

  self.atTarget = function(){
    if(!self.targeting){
      return true;
    }
    return Math.abs(self.value - self.target) < 0.0001;
  }

  self.isTargeting = function(){
    return self.targeting;
  }

  self.noTarget = function(){
    self.targeting = false;
  }

  self.get = function(){
    return self.value;
  }

  self.getTarget = function(){
    return self.target;
  }
}