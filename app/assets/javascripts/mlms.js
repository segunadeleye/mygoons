"use strict";
var Mlm = function() {
}

Mlm.prototype.init = function() {
  var self = this;
  var regexNumber = /^[0-9]+$/;
  var regexPercent = /([0-9]{1,2})(\.[0-9]{1,2})?/;

  //total income from merchant sales
  $('#income_id').keyup(function() {
    self.total_income = document.getElementById("income_id").value;      
    
    if(self.total_income.length == 0) {
      self.producePrompt("income is required", "income_prompt", "red");
    }  
    else if(regexNumber.test(self.total_income)) {
      self.producePrompt("valid input", "income_prompt", "green");
      self.validTotalIncome = parseFloat(self.total_income, 10);
    }
    else {
      self.producePrompt("invalid input", "income_prompt", "maroon");
    }
  });

  //total commission from merchant sales
  $('#total_comm_id').keyup(function() {
    self.totalComm = document.getElementById("total_comm_id").value;

    if(self.totalComm.length == 0) {
      self.producePrompt("total commission is required", "total_comm_prompt", "red");
    }
    else if(regexPercent.test(self.totalComm) && self.totalComm <= 100) {
      self.producePrompt("valid input", "total_comm_prompt", "green");
      self.validTotalComm = parseFloat(self.totalComm, 10);
    }       
    else {
      self.producePrompt("invalid input", "total_comm_prompt", "maroon");
    } 
  });

  //Deal Dey's commission from merchant sales
  $('#dd_comm_id').keyup(function() {
    self.ddComm = document.getElementById("dd_comm_id").value;

    if(self.ddComm.length == 0) {
      self.producePrompt("DD's commission is required", "dd_com_prompt", "red");
    } 
    else if(regexPercent.test(self.ddComm) && self.ddComm <= self.validTotalComm) {
      self.producePrompt("valid input", "dd_com_prompt", "green");
      self.validddComm = parseFloat(self.ddComm, 10);
      self.difference = Number(self.validTotalComm) - Number(self.validddComm);

      self.percentageAssigned = parseFloat(self.validddComm, 10)+ parseFloat(self.validl1Comm, 10) + parseFloat(self.validl2Comm, 10) + parseFloat(self.validOtherComm, 10);
      self.percentageAssigned = (40/100)*self.percentageAssigned;

      self.percentageOverflow =  100 - self.percentageAssigned;
      var htmlPercentAssigned = `<p style="color:green">Assigned: ${self.percentageAssigned}%</p>`;
      var htmlPercentRemain = `<p style="color:olive">Overflow: ${self.percentageOverflow}% <sub>will be added to Deal Dey account</sub></p>`;
      $('#assigned').html(htmlPercentAssigned);
      $('#remain').html(htmlPercentRemain);
    }
    else {
      self.producePrompt("invalid input", "dd_com_prompt", "maroon");
    }      
  });

  //Level 1 merchant's commission from merchant sales
  $('#level_one_comm_id').keyup(function() {

    self.l1Comm = document.getElementById("level_one_comm_id").value;
    self.sum = Number(self.l1Comm) + Number(self.ddComm);

    if(self.l1Comm.length == 0) {
      self.producePrompt("level 1 commission is required", "level_one_comm_prompt", "red");
    } 
    else if(self.sum > self.totalComm) {
      self.producePrompt("exceeds available commission", "level_one_comm_prompt", "maroon");
    }
    else if(regexPercent.test(self.l1Comm) && self.l1Comm < self.validddComm) {
      self.producePrompt("valid input", "level_one_comm_prompt", "green");
      self.validl1Comm = parseFloat(self.l1Comm, 10); 
      self.l1Comm = parseInt(self.l1Comm, 10);

      self.percentageAssigned = parseFloat(self.validddComm, 10)+ parseFloat(self.validl1Comm, 10) + parseFloat(self.validl2Comm, 10) + parseFloat(self.validOtherComm, 10);
      self.percentageAssigned = (100/40)*self.percentageAssigned;

      self.percentageOverflow =  100 - self.percentageAssigned;
      var htmlPercentAssigned = `<p style="color:green">Assigned: ${self.percentageAssigned}%</p>`;
      var htmlPercentRemain = `<p style="color:olive">Overflow: ${self.percentageOverflow}% <sub>will be added to Deal Dey account</sub></p>`;
      $('#assigned').html(htmlPercentAssigned);
      $('#remain').html(htmlPercentRemain);
    } 
    else if(self.l1Comm >= self.validddComm) {
      self.producePrompt("should be less than DD's commission", "level_one_comm_prompt", "maroon");        
    }
    else if(self.l1Comm >= self.difference) {
      self.producePrompt("Not enough commission to be shared", "level_one_comm_prompt", "maroon");
    }
    else {
      self.producePrompt("invalid input", "level_one_comm_prompt", "maroon");
    }
  });

  //Level 2 merchant's commission from merchant sales
  $('#level_two_comm_id').keyup(function() {
    self.l2Comm = document.getElementById("level_two_comm_id").value;
    self.sum = Number(self.l1Comm) + Number(self.l2Comm) + Number(self.ddComm);

    if(self.l2Comm.length == 0) {
      self.producePrompt("level 2 commission is required", "level_two_comm_prompt", "red");
    }
    else if(self.sum > self.totalComm) {
      self.producePrompt("exceeds available commission", "level_two_comm_prompt", "maroon");
    }
    else if(regexPercent.test(self.l2Comm) && self.l2Comm < self.l1Comm) {
      self.producePrompt("valid input", "level_two_comm_prompt", "green");
      self.validl2Comm = parseFloat(self.l2Comm);

      self.percentageAssigned = parseFloat(self.validddComm, 10)+ parseFloat(self.validl1Comm, 10) + parseFloat(self.validl2Comm, 10) + parseFloat(self.validOtherComm, 10);
      self.percentageAssigned = (100/40)*self.percentageAssigned;

      self.percentageOverflow =  100 - self.percentageAssigned;
      var htmlPercentAssigned = `<p style="color:green">Assigned: ${self.percentageAssigned}%</p>`;
      var htmlPercentRemain = `<p style="color:olive">Overflow: ${self.percentageOverflow}% <sub>will be added to Deal Dey account</sub></p>`;
      $('#assigned').html(htmlPercentAssigned);
      $('#remain').html(htmlPercentRemain);
    }
    else if(self.l2Comm >= self.l1Comm) {
      self.producePrompt("level 2 merchant should earn less", "level_two_comm_prompt", "maroon");
    }
    else {
      self.producePrompt("invalid input", "level_two_comm_prompt", "red");        
    }       
  });

  //Other merchants' commission from merchant sales
  $('#other_comm_id').keyup(function() {
    self.otherComm = document.getElementById("other_comm_id").value;
    self.sum = Number(self.l1Comm) + Number(self.l2Comm) + Number(self.ddComm) + Number(self.otherComm);

    if(self.otherComm.length == 0) {
      self.producePrompt("Other commission is required", "other_comm_prompt", "red");
    } 
    else if(self.otherComm >= self.l2Comm) {
      self.producePrompt("other merchants should earn less", "other_comm_prompt", "maroon");
    } 
    else if(self.sum > self.totalComm) {
      self.producePrompt("exceeds available commission", "other_comm_prompt", "maroon");
    } 
    else if(regexPercent.test(self.otherComm) && self.otherComm < self.l2Comm) {
      self.producePrompt("valid input", "other_comm_prompt", "green");        
      self.otherComm = parseInt(self.otherComm, 10);
      self.validOtherComm = self.otherComm;

      self.percentageAssigned = parseFloat(self.validddComm, 10)+ parseFloat(self.validl1Comm, 10) + parseFloat(self.validl2Comm, 10) + parseFloat(self.validOtherComm, 10);
      self.percentageAssigned = (100/40)*self.percentageAssigned;

      self.percentageOverflow =  100 - self.percentageAssigned;
      var htmlPercentAssigned = `<p style="color:green">Assigned: ${self.percentageAssigned}%</p>`;
      var htmlPercentRemain = `<p style="color:olive">Overflow: ${self.percentageOverflow}% <sub>will be added to Deal Dey account</sub></p>`;
      $('#assigned').html(htmlPercentAssigned);
      $('#remain').html(htmlPercentRemain);
    }
    else {
      self.producePrompt("invalid input", "other_comm_prompt", "maroon");
    }      
  });

  //Number of levels from merchant sales
  $('#number_of_levels_id').keyup(function() {
    self.levelnumber = document.getElementById("number_of_levels_id").value;       

    if(self.levelnumber.length == 0) {
      self.producePrompt("Number of levels is required", "number_of_levels_prompt", "red");
    } 
    else if(!regexNumber.test(self.levelnumber)) {
      self.producePrompt("invalid format", "number_of_levels_prompt", "maroon");
    }  
    else if(regexNumber.test(self.levelnumber) && self.levelnumber != null && self.levelnumber.trim() != '') {
      self.producePrompt("valid format", "number_of_levels_prompt", "green");
      console.log(self.validllevelnumber = self.levelnumber);
    }
  });
         
  $('#myBtn').click(function(event) {
    event.preventDefault(); 

    self.calculate();
    if(self.totalCommission) {
      var html = '';
      console.log(html)
      $('#result').html(html);
      html += `<p>Total commission: &#8358 ${self.totalCommission}</p>`;
      html += `<p>Deal Dey commission: &#8358 ${self.dealDeyCommission} <i style="color:olive">+ overflow of ${self.percentageOverflow}% (&#8358 ${self.overFlow}) = &#8358 ${self.total}</i></p>`;
      html += `<p>Level 1 Merchant Commission: &#8358 ${self.level1Commission}</p>`;
      html += `<p>Level 2 Merchant Commission: &#8358 ${self.level2Commission}</p>`;
      html += `<p>Other Merchants: &#8358 ${self.otherLevelsCommission}</p>`;
      html += `<p>Total Sum for Other Merchants: &#8358 ${self.totalOtherLevelsCommission} each</p>`;
      console.log('gets here======')
      $('#result').html(html);
    }
    else {
      var html = '';
      html += `<p style="color:red">*incorrect or empty field(s)`;
      $('#result').html(html);
    }
  });
  this.calculate();
}

Mlm.prototype.calculate = function() {
  this.totalCommission = (this.validTotalIncome)*(this.validTotalComm/100);
  this.dealDeyCommission = (this.totalCommission)*(this.validddComm/100);
  this.level1Commission = (this.totalCommission)*(this.validl1Comm/100);
  this.level2Commission = (this.totalCommission)*(this.validl2Comm/100);
  this.otherLevelsCommission = (this.totalCommission)*(this.validOtherComm/100);
  this.totalOtherLevelsCommission = ((this.totalCommission)*(this.validOtherComm/100))/this.validllevelnumber;
  this.validSum = this.totalCommission - (this.dealDeyCommission + this.level1Commission + this.level2Commission + this.otherLevelsCommission);
  this.overFlow = (this.percentageOverflow/100)*this.totalCommission;
  this.total = this.overFlow + this.dealDeyCommission;
}

Mlm.prototype.moneyFormat = function(num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

Mlm.prototype.producePrompt = function(message, promptLocation, color) {
  document.getElementById(promptLocation).innerHTML = message;
  document.getElementById(promptLocation).style.color = color;
}

$(document).ready(function() {
  var mlm = new Mlm();
  mlm.init();
});
