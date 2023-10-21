const letters = [
    'ج','ح','خ','ه','ع','غ','ف','ق','ث','ص','ض',
    'ط','ك','م','ن','ت','أ','إ','آ','ا','ل','ب','س','ش',
    'د','ظ','ز','و','ة','ي','ئ','ى','ر','ؤ','ء','ذ',
    'x','','ـ','مسح',
]

const Letters = [
    {letter: 'ذ', alts: ['ذ', 'ڼ']},
    {letter: 'س', alts: ['س', 'ښ']},
    {letter: 'ش', alts: ['ش', 'ڜ']},
    {letter: 'ل', alts: ['ل', 'ࢦ']},
    {letter: 'م', alts: ['م', '۾', 'ݦ']},
    {letter: 'ؤ', alts: ['ؤ', 'ۉ']},
    {letter: 'ن', alts: ['ن', 'ڼ', 'ں']},
    {letter: 'ظ', alts: ['ظ', 'ڟ']},
    {letter: 'ص', alts: ['ص', 'ڝ']},
    {letter: 'ز', alts: ['ز', 'ژ', 'ڙ']},
    {letter: 'ر', alts: ['ر', 'ڔ', 'ړ']},
    {letter: 'د', alts: ['د', 'ډ', 'ڊ', 'ډ']},
    {letter: 'ت', alts: ['ت', 'ټ', 'ٮ']},
    {letter: 'ث', alts: ['ث', 'ٿ', 'ٮ']},
    {letter: 'ب', alts: ['ب', 'ٮ']},
    {letter: 'ة', alts: ['ة', 'ۀ']},
    {letter: 'خ', alts: ['خ', 'ځ']},
    {letter: 'ج', alts: ['ج', 'چ', 'ڃ', 'ڄ']},
    {letter: 'ف', alts: ['ف', 'ڡ', '؋', 'ڡ']},
    {letter: 'ق', alts: ['ڡ', 'ق']},
    {letter: 'ي', alts: ['ي', 'ې', 'ى']},
    {letter: 'ئ', alts: ['ئ', 'ى']},
    {letter: 'ك', alts: ['ك', 'گ', 'ګ']}
]


const text_UI   = document.querySelector(".text")
const result_UI = document.querySelector(".result")
const btn_UI    = document.querySelector(".btn")

const rangeExtendLength_UI    = document.querySelector(".inp-extend-length")
const checkboxExtendRandom_UI = document.querySelector(".inp-extend-rand")



btn_UI.addEventListener("click", e => {
    let text = text_UI.value

    let textExtended = ""
    text.split(' ').forEach(word => textExtended+=extendWord(word)+' ')

    text = textExtended
    text = transformLetters(text)

    result_UI.value = text
})


function extendWord(word){
    let result = ""
    const _ = 'ـ'
         
    const nonExtendedLetters = ['و', 'ز', 'ر', 'ذ', 'د', 'أ', 'إ','آ', 'ا', ' ', 'ؤ','ء', 'ئ', 'ى', 'ة']

    for (let i = 0; i < word.length-1; i++) {
        const letter = word[i]
        result += letter

        const isNonExtendedLetter = nonExtendedLetters.find(l=>l==letter)
        if (!isNonExtendedLetter) {
            len = rangeExtendLength_UI.value || 0

            if (checkboxExtendRandom_UI.checked)
                len = rand(0, len)

            for (let j = 0; j < len; j++)
                result += _
        }
        
    }

    result += word[word.length-1]

    return result
}


function transformLetters(text){
    let result = ""
    text.split("").forEach(letter=>{
        let alt = Letters.find(a => a.letter == letter)

        if (alt)
            result += alt.alts.getRandomItem()
        else
            result += letter
    })
    return result
}







// Load Settings
window.onload = e => {
    const extendLength = parseInt(localStorage.getItem("decorabic-settings-extendLength")) || 0
    const extendRandom = localStorage.getItem("decorabic-settings-isExtendRand") === "true"
    rangeExtendLength_UI.value = extendLength
    checkboxExtendRandom_UI.checked = extendRandom
}

// Save settings
rangeExtendLength_UI.addEventListener("input",e=>localStorage.setItem("decorabic-settings-extendLength", rangeExtendLength_UI.value))
checkboxExtendRandom_UI.addEventListener("input",e=>localStorage.setItem("decorabic-settings-isExtendRand", checkboxExtendRandom_UI.checked))






function rand(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


Array.prototype.getRandomItem = function() {
    return this[Math.floor(Math.random()*this.length)]
}
