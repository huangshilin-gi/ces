interface File {
  file?: string
  fileName: string
}

interface Files {
  file?: string
  fileNames: Array<string | number>
}

// 单图导出方式
export const getAssetsFile = (res: File): string => {
  const path = res.file
    ? `/src/assets/images/${res.file}/${res.fileName}.png`
    : `/src/assets/images/${res.fileName}.png`
  const files = import.meta.globEager('/src/assets/images/**/*.png')
  const modules = files[path]?.default
  if (!modules) {
    console.warn(`${path}图片路径不存在。`)
    return ''
  }
  return modules
}

// 多图导出集合
export const getAssetsFiles = (res: Files): Array<string> => {
  const files = import.meta.globEager('/src/assets/images/**/*.png')
  const modules = res.fileNames.map((item) => {
    const path = res.file
      ? `/src/assets/images/${res.file}/${item}.png`
      : `/src/assets/images/${item}.png`
    const par = files[path]?.default
    if (!par) {
      console.warn(`${item}图片路径不存在。`)
      return ''
    }
    return par
  })
  return modules
}
