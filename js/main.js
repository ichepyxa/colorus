const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', e => {
	if (e.code.toLowerCase() === 'space') {
		setRandomColors()
	}
})

const setRandomColors = () => {
	cols.forEach(col => {
		const text = col.querySelector('h2')
		const button = col.querySelector('button')
		const color = chroma.random()

		text.innerText = color
		col.style.background = color

		setElementColor(text, color)
		setElementColor(button, color)
	})
}

const setElementColor = (element, color) => {
	const luminance = chroma(color).luminance()

	luminance > 0.5
		? element.classList.add('black')
		: element.classList.remove('black')
}

setRandomColors()
console.dir()
