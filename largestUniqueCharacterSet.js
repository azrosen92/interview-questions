/**
 * write a program that outputs the largest unique set of characters that 
 * can be removed from this paragraph without letting its length drop below 50.
 */

const largestUniqueSet = (paragraph) => {
  const totalChars = paragraph.split("").length;

  return Object.entries(paragraph.toLowerCase().split("").reduce((acc, char) => {
    acc[char] = (acc[char] || 1) + 1
    return acc
  }, {})).map((characterCount) => {
    if (characterCount[0] === "BLANK") characterCount[0] = " "
    return { character: characterCount[0], count: characterCount[1] } 
  }).sort((a, b) => {
    return a.count - b.count
  }).reduce((removedCharacters, characterCount) => {
    const totalRemovedCharacters = removedCharacters.reduce((acc, x) => {
      return acc + x.count
    }, 0)

    if (totalChars - totalRemovedCharacters > 50) {
      removedCharacters.push(characterCount)
    }

    return removedCharacters
  }, []).map(removedChars => removedChars.character);
}

const sampleText = "If you want to jumpstart the process of talking to us about this role, here’s a little challenge: write a program that outputs the largest unique set of characters that can be removed from this paragraph without letting its length drop below 50."

console.log("SAMPLE TEXT")
console.log("-------------------")
console.log(sampleText)

console.log("REMOVING")
console.log("-------------------")
const removedChars = largestUniqueSet(sampleText).sort()
console.log(removedChars)

const removeCharsFromText = (text, removedChars) => {
  for (var i = 0; i < removedChars.length; i++) {
    text = text.replace(removedChars[i], '')
  }

  return text
}

console.log("RESULTS")
console.log("-----------------")
const newText = removeCharsFromText(sampleText, removedChars)
console.log(newText)
console.log("Chars in new text: " + newText.split("").length)
