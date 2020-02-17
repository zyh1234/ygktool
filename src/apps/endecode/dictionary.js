import CryptoJS from 'crypto-js';

//字典
var mossCode = [
	//lowerLetter
	'.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..',
	//upperLetter
	'.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..',
	// number 
	'.----', '..---', '...--', '....-', '.....', '-....', '--...', '---..', '----.', '-----',
	// special charactor
	'.-.-', '.-.-.', '.-...', '-...-.-', '-...-', '-.-.-', '...-.-', '...---...',
	// punctuation
	'.-.-.-', '---...', '--..--', '-.-.-.', '..--..', '-...-', '.----.', '-..-.', '-.-.--', '-....-', '..--.-', '.-..-.', '-.--.', '-.--.-', '...-..-', '.-...', '.--.-.', '.-.-.'
];
var textCode = [
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
	'AA', 'AR', 'AS', 'BK', 'BT', 'CT', 'SK', 'SOS',
	'.', ':', ',', ';', '?', '=', "'", '/', '!', '-', '_', '"', '(', ')', '$', '&', '@', '+'
];

function text2Moss(text) {
	console.log('text2Moss', text)
	var cache = text.split("");
	var string = [];
	cache.map(e => {
		var index = textCode.indexOf(e);
		if (index === -1) return '摩斯电码只支持英文、数字、空格'
		string.push(mossCode[index])
	})
	return string.join(' ')
}

function moss2Text(moss) {
	var cache = moss.split(" "); //摩斯电码以空格分隔
	var string = [];
	cache.map(e => {
		var index = mossCode.indexOf(e);
		string.push(textCode[index]);
		//console.log(index)
	})
	return string.join('')
}

function normal2Result(text, key) {
	console.log('统一格式', text)
	var result = {
		text: text,
		rc4: CryptoJS.RC4.encrypt(text, key),
		url: encodeURI(text),
		moss: text2Moss(text),
		md5: CryptoJS.MD5(text)
	}
	return result
}

function start(fromType,inputText,key='') {
	console.log('type', fromType);
	console.log('input', inputText);
	console.log('key',key);
	switch (fromType) {
		case 'text':
			var result = normal2Result(inputText, key);
			return result		
		case 'url':
			var normal = decodeURI(inputText);
			var result = normal2Result(normal, key);
			return result
		case 'moss':
			var normal = moss2Text(inputText);
			var result = normal2Result(normal, key);
			return result
		case 'md5':
			var normal = inputText;
			var result = normal2Result(normal, key);
			return result
		case 'rc4':
			var normal = CryptoJS.RC4.decrypt(inputText, key);
			var result = normal2Result(normal, key);
			return result
	}
}


export default start