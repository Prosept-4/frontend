export function clearName(name) {
  return name
    .toLowerCase()
    .replace(/[^а-яёa-z0-9]/gi, '')
    .replace(/ё/gi, 'е')
}