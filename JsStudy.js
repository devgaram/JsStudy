'use strict';

exports.foo = (a,b) => {
	if(typeof a !== 'number' || typeof b !== 'number')
		return false;
	return a*b;
};
exports.bar = (coin) => {
	return coin;
};
exports.obExprots = (coin) => {
	return this;
};

