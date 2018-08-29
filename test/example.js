const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should;

should();

describe("Testing" , function (done)  {
    
    it('should say yes', () => {
      expect({great : "name"}).has.property("great").length.greaterThan(3);
      
    })

    it("Should exist", () => {
      const cup = "gre";
      cup.should.be.a("string")
    })
})