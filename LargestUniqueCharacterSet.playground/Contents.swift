//: Playground - noun: a place where people can play

import UIKit

let sampleText = "If you want to jumpstart the process of talking to us about this role, here’s a little challenge: write a program that outputs the largest unique set of characters that can be removed from this paragraph without letting its length drop below 50."

func largestRemovableUniqueSet(_ text: String) -> [Character] {
    var totalChars = text.count
    
    let characterCountDicionary = Array(text.lowercased()).reduce(into: [Character: Int]()) { (res: inout [Character: Int], char) -> () in
        res[char, default: 0] += 1
    }
    
    print("Total unique characters in text: \(characterCountDicionary.count)")
    
    let sortedCharacterCounts = characterCountDicionary.sorted { (a, b) -> Bool in
        return a.value < b.value
    }
    
    let removedCharacters = sortedCharacterCounts.reduce(into: [Character]()) { (res: inout [Character], characterCountPair) in
        let character = characterCountPair.key
        let count = characterCountPair.value
        
        totalChars = totalChars - count
        
        if (totalChars >= 50) {
            res.append(character)
        }
    }
    
    return removedCharacters
}

let removedCharacters = largestRemovableUniqueSet(sampleText)
print("largest set of unique characters we can remove: \(removedCharacters)")
print("removed \(removedCharacters.count) characters")
var remainingText = sampleText
for char in removedCharacters {
    remainingText = remainingText.replacingOccurrences(of: String(char), with: "")
}
print("remaining text: \(remainingText)")


