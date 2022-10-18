const cols = document.querySelectorAll('.col')
const modal = document.querySelector('.modal')

document.addEventListener('keydown', e => {
	e.preventDefault()
	if (e.code.toLowerCase() === 'space') {
		setRandomColors(false)
	}
})

document.addEventListener('click', e => {
	const type = e.target.dataset.type

	if (type === 'lock') {
		const node =
			e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0]

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	}

	if (type === 'copy') {
		copyToClipboard(e.target.innerText)
		hideModal()
		modal.classList.remove('hide')
		modal.innerText = `Color was copied to the clipboard`
	}
})

const hideModal = () => {
	setTimeout(() => {
		modal.classList.add('hide')
	}, 2000)
}

const setRandomColors = isInitial => {
	const colors = isInitial ? getColorsFromHash() : []

	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock')
		const text = col.querySelector('h2')
		const button = col.querySelector('button')

		if (isLocked) {
			colors.push(text.innerText)
			return
		}

		const color = isInitial
			? colors[index]
				? colors[index]
				: chroma.random()
			: chroma.random()

		if (!isInitial) {
			colors.push(color)
		}

		text.innerText = color.toString().toUpperCase()
		col.style.background = color

		setElementColor(text, color)
		setElementColor(button, color)
	})

	updateColorsHash(colors)
}

const copyToClipboard = text => navigator.clipboard.writeText(text)

const setElementColor = (element, color) => {
	const luminance = chroma(color).luminance()

	luminance > 0.5
		? element.classList.add('black')
		: element.classList.remove('black')
}

const updateColorsHash = (colors = []) => {
	document.location.hash = colors
		.map(color => color.toString().toUpperCase().substring(1))
		.join('-')
}

const getColorsFromHash = () => {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map(color => `#${color}`)
	}

	return []
}

setRandomColors(true)
hideModal()
