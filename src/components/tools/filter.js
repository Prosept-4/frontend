function checkName({ name }, inputValue) {
  const nameCheck = name
    .toLowerCase()
    .replace(/[^а-яёa-z0-9]/gi, '')
    .replace(/ё/gi, 'е')
    .includes(
      inputValue
        .toLowerCase()
        .replace(/[^а-яёa-z0-9]/gi, '')
        .replace(/ё/gi, 'е')
    )

  return nameCheck
}

export default function filterByName(product, inputValue) {
  return checkName(product, inputValue)
}
