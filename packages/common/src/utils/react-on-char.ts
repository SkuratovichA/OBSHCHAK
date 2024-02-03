interface ReactOnCharResult {
  prefix: string
  suffix: string
}
interface ReactOnCharProps {
  textBuffer: string
  chunk: string
  direction: 'forward' | 'backward'
  charTrigger?: string
}

/**
 * Splits the provided text chunk at the closest occurrence of any character from the charTrigger set,
 * searching in the specified direction. If a character from charTrigger is found and the additional condition is true,
 * the function splits the chunk at this character. Otherwise, it treats the entire chunk as unsplit.
 *
 * @param {ReactOnCharProps} props - The properties for the function.
 * @param {string} props.textBuffer - The initial text buffer to which the part before the trigger character is appended.
 * @param {string} props.chunk - The text chunk to be processed.
 * @param {'forward' | 'backward'} props.direction - The direction of search for the trigger character in the chunk.
 * @param {string} [props.charTrigger='?.!\n'] - A string of characters that trigger the split. Defaults to '?.!\n'.
 *
 * @returns {ReactOnCharResult}
 *    - buffer: The combined text of textBuffer and the part of chunk before the trigger character (inclusive).
 *    - suffix: The remaining part of chunk after the trigger character, or the combined text of textBuffer and chunk if no trigger character is found or the additional condition is false.
 */
type ReactOnChar = (props: ReactOnCharProps) => ReactOnCharResult

export const reactOnChar: ReactOnChar = ({
  textBuffer,
  chunk,
  direction,
  charTrigger = '?.!\n',
}) => {
  const [mapFunction, comparisonFunction] =
    direction === 'forward'
      ? [(s: string, el: string) => s.indexOf(el), Math.min]
      : [(s: string, el: string) => s.lastIndexOf(el), Math.max]

  const indices = charTrigger
    .split('')
    .map((ch) => mapFunction(chunk, ch))
    .filter((index) => index !== -1)

  const triggerIndex = indices.length > 0 ? comparisonFunction(...indices) : -1

  const textBeforeCharTrigger = chunk.slice(0, triggerIndex + 1)
  const textAfterCharTrigger = chunk.slice(triggerIndex + 1)

  return textBeforeCharTrigger
    ? {
        prefix: textBuffer + textBeforeCharTrigger,
        suffix: textAfterCharTrigger,
      }
    : {
        prefix: '',
        suffix: textBuffer + chunk,
      }
}
