const form = document.forms.namedItem('register')
const req_labels = form.querySelectorAll('.required')
const inputs = document.querySelectorAll('input')
const patterns = {
        "text": /^[a-z ,.'-]+$/i,
        "email": /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/u,
        "phone": /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
}

inputs.forEach((input) => {
        const name_inp = input.getAttribute('name')
        const patterns_input = patterns[name_inp]
        input.onkeyup = (e) => {
                let val = e.target.value
                let parent = e.target.parentElement
                if (patterns_input.test(val)) {
                        parent.classList.remove('error')
                } else {
                        parent.classList.add('error')
                }
        }
})

form.onsubmit = (e) => {
        e.preventDefault()
        let isError = false

        req_labels.forEach(lbl => {
                const inp = lbl.firstElementChild.nextElementSibling
                const warning_span = lbl.lastElementChild
                if (inp.value.length === 0) {
                        isError = true
                        lbl.classList.add('error')
                        warning_span.innerHTML = `Please enter ${inp.name}`
                } else {
                        lbl.classList.remove('error')
                        warning_span.innerHTML = `Need to fill`
                }
        })

        if(!isError){
                submit()
                return
        }

}

function submit() {
        const user = {}
    
        const fm = new FormData(form)
    
        fm.forEach((val, key) => user[key] = val)
    
        console.log(user);
}