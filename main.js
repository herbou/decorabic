const nonExtendedLetters = ['و', 'ز', 'ر', 'ذ', 'د', 'أ', 'إ','آ', 'ا', ' ', 'ؤ','ء', 'ئ', 'ى', 'ة']

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
const btnTrans_UI    = document.querySelector(".btn")
const btnCopy_UI     = document.querySelector(".btn.copy")

const rangeExtendLength_UI    = document.querySelector(".inp-extend-length")
const checkboxExtendRandom_UI = document.querySelector(".inp-extend-rand")
const checkboxTransformAll_UI = document.querySelector(".inp-trans-all")


const BTN_COPY_TEXT_BEFORE = "نسخ النص"
const BTN_COPY_TEXT_AFTER  = "تم النسخ ✔"



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

    let textExtended = ""
    text.split(' ').forEach(word => textExtended+=extendWord(word)+' ')

    text = textExtended
    text = transformLetters(text)

    result_UI.value = text
})


function extendWord(word){
    let result = ""
    const _ = 'ـ'

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

    const FROM = checkboxTransformAll_UI.checked ? 1 : 0

    text.split("").forEach(letter=>{
        let alt = Letters.find(a => a.letter == letter)

        if (alt)
            result += alt.alts.getRandomItem(FROM, alt.alts.length-1)
        else
            result += letter
    })
    return result
}







// Load Settings
window.onload = e => {
    const extendLength = parseInt(localStorage.getItem("decorabic-settings-extendLength")) || 0
    const extendRandom = localStorage.getItem("decorabic-settings-isExtendRand") === "true"
    const transformAll = localStorage.getItem("decorabic-settings-isTransformAll") === "true"
    rangeExtendLength_UI.value = extendLength
    checkboxExtendRandom_UI.checked = extendRandom
    checkboxTransformAll_UI.checked = transformAll
}

// Save settings
rangeExtendLength_UI.addEventListener("input",e=>
    localStorage.setItem("decorabic-settings-extendLength", rangeExtendLength_UI.value))
checkboxExtendRandom_UI.addEventListener("input",e=>
    localStorage.setItem("decorabic-settings-isExtendRand", checkboxExtendRandom_UI.checked))
checkboxTransformAll_UI.addEventListener("input",e=>
    localStorage.setItem("decorabic-settings-isTransformAll", checkboxTransformAll_UI.checked))






function rand(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


Array.prototype.getRandomItem = function(from, to) {
    return this[rand(from, to)]
}


function copyToClipboard(input) {
    input.select()
    input.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(input.value)
    input.setSelectionRange(0,0)
  }
