export * from "./types"


export function helloWorld() {
  console.log('Hello World')
}


export function playSong() {
  // Créer un nouvel objet Audio
  var audio = new Audio("../Samples/808Bass/B1S.mp3");
  // Jouer le son
  audio.play();
}
