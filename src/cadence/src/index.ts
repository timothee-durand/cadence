export * from './types'
export {Cadence} from './Cadence'
export function helloWorld() {
	console.log('Hello World')
}


export function playSong() {
	// Créer un nouvel objet Audio
	const audio = new Audio('../Samples/808Bass/B1S.mp3')
	// Jouer le son
	audio.play()
}
