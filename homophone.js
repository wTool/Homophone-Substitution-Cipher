function homophone(selector, inputText, t1, t2, t3) {
	if (selector === "encrypt") {
		var cleanText = [];
		var char = "";
		for (var i = 0; i < inputText.length; i++) {
			char = inputText[i].toLowerCase();
			if ((char >= "a") && (char <= "z")) {
				cleanText.push(char)
			}
		}
		console.log("cleaned plaintext")
	}
	if (selector === "decrypt") {
		var cleanText = [];
		var char = "";
		for (var i = 0; i < inputText.length; i += 2) {
			char = inputText[i] + inputText[i + 1];
			if ((char >= "00") && (char <= "99")) {
				cleanText.push(char)
			}
		}
		console.log("chunked ciphertext:")
	}
	console.log(cleanText);
	var homophone100 = "aaaaaaabbcccddddeeeeeeeeeefffgghhhhhhiiiiiijkkllllmmmnnnnnnoooooooppqrrrrrssssssttttttttuuuvvwwwxyyz";
	var homoscytaled = scytale("encrypt", homophone100, t1);
	homoscytaled = scytale("encrypt", homoscytaled, t2);
	homoscytaled = scytale("encrypt", homoscytaled, t3);
	var lower100 = homoscytaled.toLowerCase();
	console.log("homophone100 transposed:");
	console.log(lower100);
	var table = [];
	for (var letter = 0; letter < 26; letter++) {
		table[letter] = []
	}
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < 100; i++) {
		var tmp = alphabet.indexOf(lower100[i]);
		var iS = i.toString();
		if (iS.length !== 2) {
			iS = "0" + iS
		}
		table[tmp].push(iS)
	}
	console.log("plaintext lookup table:");
	console.log(table);
	if (selector === "encrypt") {
		var outputText = [];
		for (var inputIndex = 0; inputIndex < cleanText.length; inputIndex++) {
			var pt = alphabet.indexOf(cleanText[inputIndex]);
			var ct = table[pt].pop();
			outputText.push(ct);
			table[pt].unshift(ct)
		}
	}
	if (selector === "decrypt") {
		var outputText = [];
		for (var inputIndex = 0; inputIndex < cleanText.length; inputIndex++) {
			for (var tableIndex = 0; tableIndex < table.length; tableIndex++) {
				if (table[tableIndex].indexOf(cleanText[inputIndex]) !== -1) {
					outputText.push(alphabet[tableIndex])
				}
			}
		}
	}
	console.log("output:"+outputText);
	var outputString = "";
	for (var o = 0; o < outputText.length; o++) {
		outputString = outputString + outputText[o]
	}
	return outputString
}
function scytale(selector, inputText, sides) {
	var cleanText = [];
	var char = "";
	for (var i = 0; i < inputText.length; i++) {
		char = inputText[i].toLowerCase();
		if ((char >= "a") && (char <= "z")) {
			cleanText.push(char)
		}
	}
	var shortLine = Math.floor(cleanText.length / sides);
	var longLine = shortLine + 1;
	var trailingChars = cleanText.length % sides;
	var charArray = [];
	var inputTextIndex = 0;
	var lineLen = 0;
	var dim1 = 0;
	var dim2 = 0;
	if (selector === "encrypt") {
		for (dim1 = 0; dim1 < sides; dim1++) {
			lineLen = 0;
			charArray[dim1] = [];
			if (dim1 < trailingChars) {
				lineLen = longLine
			} else {
				lineLen = shortLine
			}
			for (dim2 = 0; dim2 < lineLen; dim2++) {
				charArray[dim1][dim2] = cleanText[inputTextIndex];
				inputTextIndex++
			}
		}
	}
	if (selector === "decrypt") {
		if (trailingChars !== 0) {
			lineLen = longLine
		} else {
			lineLen = shortLine
		}
		for (dim2 = 0; dim2 < lineLen; dim2++) {
			charArray[dim2] = [];
			for (dim1 = 0; dim1 < sides; dim1++) {
				charArray[dim2][dim1] = cleanText[inputTextIndex];
				inputTextIndex++
			}
		}
	}
	console.log("scytale table:");
	console.log(charArray);
	var output = [];
	inputTextIndex = 0;
	if (selector === "encrypt") {
		while (inputTextIndex < cleanText.length) {
			if (trailingChars !== 0) {
				lineLen = longLine
			}
			for (dim2 = 0; dim2 < longLine; dim2++) {
				for (dim1 = 0; dim1 < sides; dim1++) {
					if (inputTextIndex < cleanText.length) {
						output.push(charArray[dim1][dim2].toUpperCase());
						inputTextIndex++
					}
				}
			}
		}
	}
	if (selector === "decrypt") {
		while (inputTextIndex < cleanText.length) {
			if (trailingChars !== 0) {
				lineLen = longLine
			}
			for (dim1 = 0; dim1 < sides; dim1++) {
				for (dim2 = 0; dim2 < lineLen; dim2++) {
					if (inputTextIndex < cleanText.length) {
						char = charArray[dim2][dim1];
						if ((char >= "a") && (char <= "z")) {
							output.push(char);
							inputTextIndex++
						}
					}
				}
			}
		}
	}
	var outputString = "";
	for (var o = 0; o < output.length; o++) {
		outputString = outputString + output[o]
	}
	return outputString
};
