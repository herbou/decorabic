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
    {letter: 'ة', alts: ['ة', 'ۀ']},
    {letter: 'خ', alts: ['خ', 'ځ']},
    {letter: 'ج', alts: ['ج', 'چ', 'ڃ', 'ڄ']},
    {letter: 'ف', alts: ['ف', 'ڡ', '؋', 'ڡ']},
    {letter: 'ق', alts: ['ڡ', 'ق']},
    {letter: 'ي', alts: ['ي', 'ې']},
    {letter: 'ك', alts: ['ك', 'گ', 'ګ']}
]


const text_UI   = document.querySelector(".text")
const result_UI = document.querySelector(".result")
const btn_UI    = document.querySelector(".btn")


btn_UI.addEventListener("click", e => {
    const text = text_UI.value
    let result = ""

    text.split("").forEach(letter=>{
        let alt = Letters.find(l => l.letter == letter)

        if (alt)
            result += getRandom(alt.alts)
        else
            result += letter
    })

    result_UI.value = result
})


function getRandom(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

