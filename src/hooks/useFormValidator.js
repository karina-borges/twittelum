import {useState} from 'react'

export default function useFormValidator(validations) {
  const [erros, setErros] = useState(createInitialState())
  const [isFormValid, setIsFormValid] = useState(false)

  function createInitialState() {
    const defaultErros = {}

    for (let props in validations) {
      defaultErros[props] = ''
    }

    return defaultErros
  }

  function validate(event) {
    const {name, value} = event.target
    erros[name] = validations[name](value)
    setErros({ ...erros})
    updateStatus()
  }

  function updateStatus() {
    let status = Object.values(erros).every(erro => erro.trim() === '')
    setIsFormValid(status)
  }

  return {erros, isFormValid, validate}
}
