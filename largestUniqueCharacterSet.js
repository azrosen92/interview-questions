/**
 * write a program that outputs the largest unique set of characters that 
 * can be removed from this paragraph without letting its length drop below 50.
 */

const largestUniqueSet = (paragraph) => {
  const totalChars = paragraph.split("").length;

  return Object.entries(paragraph.split("").reduce((acc, char) => {
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

const sampleText = "As an early member of Anchor’s Android team, you’ll play a critical role in helping us define the future of audio. We firmly believe that there is endless innovation just waiting to happen in the audio space. You’ll get to work alongside a cross-functional team of engineering, product, content, and community team members. This is a unique opportunity to be one of the very first hires for a consumer-facing and product-driven company that’s backed by some of the best investors in Silicon Valley and NY. This is a full-time role based in New York City."

console.log("SAMPLE TEXT")
console.log("-------------------")
console.log(sampleText)

console.log("REMOVING")
console.log("-------------------")
const removedChars = largestUniqueSet(sampleText)
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
