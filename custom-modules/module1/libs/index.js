

export function fn () {
  console.log('......成功引入module1/libs/index');
  return 'module1/libs/index'
}

export const callName = '111111111111'
const fn2 = () => {
  console.log('......module1 - fn2');
}
export default fn2