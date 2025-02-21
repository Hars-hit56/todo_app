export function isInputEmpty(value: string) {
  if (value == '') {
    return {msg: '', success: false};
  } else {
    return {msg: '', success: true};
  }
}
