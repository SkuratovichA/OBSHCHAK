export * from './react-on-char'
import { reactOnChar } from './react-on-char'

const CRITICAL_STRING_LENGTH_RATIO = 1 / 4
export const hideCriticalString = (str: string) =>
  str.slice(0, str.length * CRITICAL_STRING_LENGTH_RATIO) +
  Array.from(str)
    .slice(str.length * CRITICAL_STRING_LENGTH_RATIO)
    .map(() => '*')
    .join('')

export const createLabeledList = <T>(
  obj: { [key: string]: T } | undefined,
  ppFun: (key: string, value: T) => string,
  joiner: string = '\n\n',
): string =>
  obj
    ? Object.entries(obj)
        .map(([key, value]) => ppFun(key, value))
        .join(joiner)
    : ''

export const splitSentence = (text: string, chunk: string): ReturnType<typeof reactOnChar> => {
  const minChunkLength = 4
  const sentence = text + chunk
  const correctLengthAndExcludedNumbers =
    sentence.length > minChunkLength && (!sentence.match(/\d\.?$/) || !!sentence.match(/\d\.\d+\./))

  return correctLengthAndExcludedNumbers
    ? reactOnChar({ textBuffer: text, chunk, direction: 'backward' })
    : { prefix: '', suffix: text + chunk }
}

export const deSpacifyBase = (str: string, subWith: string) =>
  str.toLowerCase().replace(/\s/g, subWith)
export const deSpacify = (str: string) => deSpacifyBase(str, '-')
