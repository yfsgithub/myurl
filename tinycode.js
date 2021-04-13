const anyBase = require('any-base');
function TinyCode() {

    // const base62codetable = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const base62codetable = 'LBClqO43AIbTMDy8G1eVZmF0hutRkzXdQ6wNfiKEJaxWHPSg57rj9nosY2vUcp';

    this.code10to62 = function (num) {
        let translatorHex2Base62 = anyBase(anyBase.DEC, base62codetable);
        return translatorHex2Base62(num);
    }

    this.code62to10 = function (str) {
        let translatorBase62_Hex = anyBase(base62codetable, anyBase.DEC);
        var hex_uuid = translatorBase62_Hex(str);
        return hex_uuid;
    }

}
var TinyCodeObj = null;
if(!TinyCodeObj) TinyCodeObj = new TinyCode();
module.exports = TinyCodeObj;

// test 
// let t = new TinyCode();
// let a = t.code10to62('1');
// let b = t.code62to10(a);
// console.log(a);
// console.log(b);
