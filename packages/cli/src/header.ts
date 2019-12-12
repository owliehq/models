import chalk from 'chalk'
import figlet from 'figlet'
import clear from 'clear'

export default (): void => {
  clear()

  const tallText = figlet.textSync('Owlie Models', { horizontalLayout: 'full' })

  const bufferedText = chalk.yellow(tallText)

  console.log(bufferedText)
}
