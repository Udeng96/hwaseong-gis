class Player { constructor(options) {this.element=document.getElementById(options.playerId);if(this.element)this.element.textContent="CCTV adapter disabled";} destroy(){} play(){} stop(){} pause(){} mute(){} unmute(){} setVolume(){} }
export default {Player};
