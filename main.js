const extendableLetters = [
    'ج','ح','خ','ه','ع','غ','ف','ق','ث','ص','ض',
    'ط','ك','م','ن','ت','ل','ب','س','ش',
    'ظ','ي'
]

const dotLessLetters = [
    {letter: 'ذ', alts: ['د']},
    {letter: 'ش', alts: ['ٮٮٮ']},
    {letter: 'س', alts: ['ٮٮٮ']},
    {letter: 'ؤ', alts: ['و']},
    {letter: 'ن', alts: ['ں']},
    {letter: 'ظ', alts: ['ط']},
    {letter: 'ض', alts: ['ص']},
    {letter: 'ز', alts: ['ر']},
    {letter: 'ت', alts: ['ٮ']},
    {letter: 'ث', alts: ['ٮ']},
    {letter: 'ب', alts: ['ٮ']},
    {letter: 'ة', alts: ['ه']},
    {letter: 'خ', alts: ['ح']},
    {letter: 'ج', alts: ['ح']},
    {letter: 'ف', alts: ['ڡ']},
    {letter: 'ق', alts: ['ڡ']},
    {letter: 'ي', alts: ['ى']},
    {letter: 'ئ', alts: ['ى']}
]

const weirdLetters = [
    {letter: 'ذ', alts: ['ڼ']},
    {letter: 'س', alts: ['ٮٮٮ']},
    {letter: 'ش', alts: ['ښ','ڜ']},
    {letter: 'ل', alts: ['ࢦ']},
    {letter: 'م', alts: ['۾', 'ݦ']},
    {letter: 'ؤ', alts: ['ۉ']},
    {letter: 'ن', alts: ['ڼ']},
    {letter: 'ظ', alts: ['ڟ']},
    {letter: 'ص', alts: ['ڝ']},
    {letter: 'ز', alts: ['ژ', 'ڙ']},
    {letter: 'ر', alts: ['ڔ', 'ړ']},
    {letter: 'د', alts: ['ډ', 'ڊ', 'ډ']},
    {letter: 'ت', alts: ['ټ']},
    {letter: 'ة', alts: ['ۀ']},
    {letter: 'خ', alts: ['ځ']},
    {letter: 'ج', alts: ['چ', 'ڃ', 'ڄ']},
    {letter: 'ف', alts: ['؋']},
    {letter: 'ي', alts: ['ې']},
    {letter: 'ك', alts: ['گ', 'ګ']}
]

const BTN_COPY_TEXT_BEFORE = "نسخ النص"
const BTN_COPY_TEXT_AFTER  = "تم النسخ ✔"



const text_UI   = document.querySelector(".text")
const result_UI = document.querySelector(".result")
const btnTrans_UI    = document.querySelector(".btn")
const btnCopy_UI     = document.querySelector(".btn.copy")

const rangeExtendLength_UI    = document.querySelector(".inp-extend-length")
const checkboxExtendRandom_UI = document.querySelector(".inp-extend-rand")
const checkboxDotless_UI      = document.querySelector(".inp-dotless")
const checkboxWeird_UI        = document.querySelector(".inp-weird")

let useRandomExtend   = false
let extendLength      = 0
let useDotLessLetters = false
let useWeirdLetters   = false



btnCopy_UI.addEventListener("click", e => {
    copyToClipboard(result_UI)
    btnCopy_UI.innerText = BTN_COPY_TEXT_AFTER
    btnCopy_UI.disabled = true
    btnCopy_UI.classList.add("clicked")
    setTimeout(()=>{
        btnCopy_UI.innerText = BTN_COPY_TEXT_BEFORE
        btnCopy_UI.disabled = false
        btnCopy_UI.classList.remove("clicked")
    }, 1100)
})


btnTrans_UI.addEventListener("click", e => {
    let text = text_UI.value
    useRandomExtend   = checkboxExtendRandom_UI.checked
    extendLength      = rangeExtendLength_UI.value
    useDotLessLetters = checkboxDotless_UI.checked
    useWeirdLetters   = checkboxWeird_UI.checked

    text = extendSentence(text)
    text = transformAllLetters(text)

    result_UI.value = text
})


function extendSentence(sentence){
    let textExtended = ""
    sentence.split(' ').forEach(word => textExtended+=extendWord(word)+' ')
    return textExtended
}


function extendWord(word){
    let result = ""
        
    for (let i = 0; i < word.length-1; i++) {
        const letter = word[i]
        result += letter

        if (isLetterExtendable(letter)) {
            let length = extendLength

            if (useRandomExtend)
                length = rand(0, length)

            for (let j = 0; j < length; j++)
                result += 'ـ'
        }
        
    }

    result += word[word.length-1]

    return result
}


function transformAllLetters(text){
    let result = ""

    text.split("").forEach(letter=>{
        if (!useDotLessLetters && !useWeirdLetters)
            result += letter

        else if (useDotLessLetters && !useWeirdLetters)
            result += transformLetter(letter, dotLessLetters)

        else if (!useDotLessLetters && useWeirdLetters)
            result += transformLetter(letter, weirdLetters)

        else if (useDotLessLetters && useWeirdLetters){
            const r = rand(0, 1)
            result += transformLetter(letter, r==0? weirdLetters:dotLessLetters)
        }
    })
    return result
}

function transformLetter(letter, lettersAlts){
    let alt = lettersAlts.find(_alt => _alt.letter == letter)

        if (alt)
            return alt.alts.getRandomItem(0, alt.alts.length-1)
        else
            return letter
}


function isLetterExtendable(letter){
    return extendableLetters.find(l=>l==letter)
}




// Load Settings
window.onload = e => {
    rangeExtendLength_UI.value 
      = parseInt(localStorage.getItem("decorabic-settings-extendLength")) || 0
      
    checkboxExtendRandom_UI.checked 
      = localStorage.getItem("decorabic-settings-isExtendRand") === "true"

    checkboxDotless_UI.checked 
      = localStorage.getItem("decorabic-settings-isDotless") === "true"

    checkboxWeird_UI.checked 
      = localStorage.getItem("decorabic-settings-isWeird") === "true"
}

// Save settings
rangeExtendLength_UI.addEventListener("input",e=>
    localStorage.setItem("decorabic-settings-extendLength", rangeExtendLength_UI.value))

checkboxExtendRandom_UI.addEventListener("input",e=>
    localStorage.setItem("decorabic-settings-isExtendRand", checkboxExtendRandom_UI.checked))

checkboxDotless_UI.addEventListener("input",e=>
    localStorage.setItem("decorabic-settings-isDotless", checkboxDotless_UI.checked))

checkboxWeird_UI.addEventListener("input",e=>
    localStorage.setItem("decorabic-settings-isWeird", checkboxWeird_UI.checked))






function rand(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


Array.prototype.getRandomItem = function(from, to) {
    return this[rand(from, to)]
}


function copyToClipboard(input) {
    navigator.clipboard.writeText(input.value)
}
