let openpackSnd = new Audio("../media/sounds/openpack.mp3"),
	cardflipSnd = new Audio("../media/sounds/flipcard.mp3"),
	overlapCardFlipSnd = new Audio("../media/sounds/flipcard.mp3"),
	rareSnd = new Audio("../media/sounds/rare.mp3"),
	epicSnd = new Audio("../media/sounds/epic.mp3"),
	legendarySnd = new Audio("../media/sounds/legendary.mp3"),
	alreadyHasRare = new Boolean(false);

// creates the pack html element
function createPack() {
	const packPack = document.createElement('div'),
		packs = document.getElementById('body'),
		imgpack = document.createElement("IMG");

	packPack.classList.add("pack");
	imgpack.classList.add("pack-image");
	imgpack.src = "../media/images/pack.png";
	imgpack.setAttribute('draggable', false);

	packs.appendChild(packPack);
	packPack.appendChild(imgpack);
	return packPack;
}

// creates a common card element
function createCommonCard() {
	const containerDiv = document.getElementById('containerOpenPack'),
		flipCard = document.createElement('div'),
		innerFlipCard = document.createElement('div'),
		frontFlipCard = document.createElement('div'),
		backFlipCard = document.createElement('div'),
		imgFlipCard = document.createElement("IMG");

	imgFlipCard.src = "../media/images/legendcardback.png";
	flipCard.classList.add("flip-card, flip-card-common");
	innerFlipCard.classList.add("flip-card-inner");
	frontFlipCard.classList.add("flip-card-front");
	backFlipCard.classList.add("card-face, flip-card-back");
	backFlipCard.innerHTML = "This feature has not yet been developed!";
	imgFlipCard.style.width = "100%";
	imgFlipCard.style.height = "100%";

	containerDiv.appendChild(flipCard);
	flipCard.appendChild(innerFlipCard);
	innerFlipCard.appendChild(frontFlipCard);
	frontFlipCard.appendChild(imgFlipCard);
	innerFlipCard.appendChild(backFlipCard);

	switch (document.getElementById('containerOpenPack').childElementCount) {
		case 0:
			flipCard.style.top = "18%";
			flipCard.style.left = "38%";
			break;
		case 1:
			flipCard.style.top = "10%";
			flipCard.style.left = "51.5%";
			break;
		case 2:
			flipCard.style.top = "18%";
			flipCard.style.left = "67.5%";
			break;
		case 3:
			flipCard.style.top = "57%";
			flipCard.style.left = "43%";
			break;
		case 4:
			flipCard.style.top = "57.5%";
			flipCard.style.left = "60%";
			break;
		default:
			break;
	}

	return flipCard;
}

// creates a rare card element
function createRareCard() {
	const containerDiv = document.getElementById('containerOpenPack'),
		flipCard = document.createElement('div'),
		innerFlipCard = document.createElement('div'),
		frontFlipCard = document.createElement('div'),
		backFlipCard = document.createElement('div'),
		imgFlipCard = document.createElement("IMG");

	imgFlipCard.src = "../media/images/legendcardback.png";
	flipCard.classList.add("flip-card, flip-card-rare");
	innerFlipCard.classList.add("flip-card-inner");
	frontFlipCard.classList.add("flip-card-front");
	backFlipCard.classList.add("card-face, flip-card-back");
	backFlipCard.innerHTML = "This feature has not yet been developed!";
	imgFlipCard.style.width = "100%";
	imgFlipCard.style.height = "100%";

	containerDiv.appendChild(flipCard);
	flipCard.appendChild(innerFlipCard);
	innerFlipCard.appendChild(frontFlipCard);
	frontFlipCard.appendChild(imgFlipCard);
	innerFlipCard.appendChild(backFlipCard);

	switch (document.getElementById('containerOpenPack').childElementCount) {
		case 0:
			flipCard.style.top = "18%";
			flipCard.style.left = "38%";
			break;
		case 1:
			flipCard.style.top = "10%";
			flipCard.style.left = "51.5%";
			break;
		case 2:
			flipCard.style.top = "18%";
			flipCard.style.left = "67.5%";
			break;
		case 3:
			flipCard.style.top = "57%";
			flipCard.style.left = "43%";
			break;
		case 4:
			flipCard.style.top = "57.5%";
			flipCard.style.left = "60%";
			break;
		default:
			break;
	}

	return flipCard;
}
// creates a epic card element
function createEpicCard() {
	const containerDiv = document.getElementById('containerOpenPack'),
		flipCard = document.createElement('div'),
		innerFlipCard = document.createElement('div'),
		frontFlipCard = document.createElement('div'),
		backFlipCard = document.createElement('div'),

		imgFlipCard = document.createElement("IMG");
	imgFlipCard.src = "../media/images/legendcardback.png";
	flipCard.classList.add("flip-card, flip-card-epic");
	innerFlipCard.classList.add("flip-card-inner");
	frontFlipCard.classList.add("flip-card-front");
	backFlipCard.classList.add("card-face, flip-card-back");
	backFlipCard.innerHTML = "This feature has not yet been developed!";
	imgFlipCard.style.width = "100%";
	imgFlipCard.style.height = "100%";

	containerDiv.appendChild(flipCard);
	flipCard.appendChild(innerFlipCard);
	innerFlipCard.appendChild(frontFlipCard);
	frontFlipCard.appendChild(imgFlipCard);
	innerFlipCard.appendChild(backFlipCard);

	switch (document.getElementById('containerOpenPack').childElementCount) {
		case 0:
			flipCard.style.top = "18%";
			flipCard.style.left = "38%";
			break;
		case 1:
			flipCard.style.top = "10%";
			flipCard.style.left = "51.5%";
			break;
		case 2:
			flipCard.style.top = "18%";
			flipCard.style.left = "67.5%";
			break;
		case 3:
			flipCard.style.top = "57%";
			flipCard.style.left = "43%";
			break;
		case 4:
			flipCard.style.top = "57.5%";
			flipCard.style.left = "60%";
			break;
		default:
			break;
	}

	return flipCard;
}

// creates a legendary card element
function createLegendaryCard() {
	const containerDiv = document.getElementById('containerOpenPack'),
		flipCard = document.createElement('div'),
		innerFlipCard = document.createElement('div'),
		frontFlipCard = document.createElement('div'),
		backFlipCard = document.createElement('div'),
		imgFlipCard = document.createElement("IMG");

	imgFlipCard.src = "../media/images/legendcardback.png";
	flipCard.classList.add("flip-card, flip-card-legendary");
	innerFlipCard.classList.add("flip-card-inner");
	frontFlipCard.classList.add("flip-card-front");
	backFlipCard.classList.add("card-face, flip-card-back");
	backFlipCard.innerHTML = "This feature has not yet been developed!";
	imgFlipCard.style.width = "100%";
	imgFlipCard.style.height = "100%";
	
	containerDiv.appendChild(flipCard);
	flipCard.appendChild(innerFlipCard);
	innerFlipCard.appendChild(frontFlipCard);
	frontFlipCard.appendChild(imgFlipCard);
	innerFlipCard.appendChild(backFlipCard);

	switch (document.getElementById('containerOpenPack').childElementCount) {
		case 0:
			flipCard.style.top = "18%";
			flipCard.style.left = "38%";
			break;
		case 1:
			flipCard.style.top = "10%";
			flipCard.style.left = "51.5%";
			break;
		case 2:
			flipCard.style.top = "18%";
			flipCard.style.left = "67.5%";
			break;
		case 3:
			flipCard.style.top = "57%";
			flipCard.style.left = "43%";
			break;
		case 4:
			flipCard.style.top = "57.5%";
			flipCard.style.left = "60%";
			break;
		default:
			break;
	}

	return flipCard;
}

let collision = new Boolean(false),
	pack,
	image,
	packw,
	packh,
	packx,
	packy,
	opackx,
	opacky,
	pinx,
	piny,
	pinxperc,
	pinyperc,
	targetx,
	targety,
	rx,
	ry,
	targetrx,
	targetry,
	scale,
	targetscale,
	ww,
	wh,
	md,
	mx,
	my,
	whoosh,
	whooshvol,
	whooshvoltarget,
	majesty,
	majestyvol,
	majestyvoltarget,
	audioloaded;

// loads audio
function audioload() {
	audioloaded++;
	if (audioloaded == 2) {
		document.body.classList.add('loaded');
		majesty.play();
		whoosh.play();
		bindevents();
		loop();
	}
}

// runs on page load
function init() {
	onresize();
	pack = document.querySelector('.pack');
	image = document.querySelector('.pack-image');
	packw = image.width;
	packh = image.height;
	packx = ww / 5 - packw / 2;
	packy = wh / 5 - packh / 2;
	opackx = packx;
	opacky = packy;
	pinx = 0;
	piny = 0;
	pinxperc = 0;
	pinyperc = 0;
	targetx = packx;
	targety = packy;
	rx = 0;
	ry = 0;
	targetrx = 0;
	targetry = 0;
	scale = 1;
	targetscale = scale;
	md = false;
	mx = packx;
	my = packy;
	audioloaded = 0;

	whooshvol = 0;
	whooshvoltarget = 0;
	whoosh = new Audio('../media/sounds/whoosh.ogg');
	whoosh.addEventListener('canplaythrough', audioload);
	whoosh.volume = 0;
	whoosh.loop = true;

	majestyvol = 0;
	majestyvoltarget = 0;
	majesty = new Audio('../media/sounds/majesty.ogg');
	majesty.addEventListener('canplaythrough', audioload);
	majesty.volume = 0;
	majesty.loop = true;
}

// adds event listeners to the packs and window
function bindevents() {
	pack.addEventListener('mousedown', onmousedown);
	pack.addEventListener('mouseup', onmouseup);
	window.addEventListener('mousemove', onmousemove);
	window.addEventListener('resize', onresize);
}

// onmousedown event listener
function onmousedown(e) {
	md = true;
	mx = e.pageX;
	my = e.pageY;
	pinx = packw / 2; // pin to center
	piny = packh / 2; // pin to center
	// pinx = mx - packx; // pin to click point
	// piny = my - packy; // pin to click point
	pinxperc = 100 - (pinx / packw) * 100; // transform based on the pin position
	pinyperc = 100 - (piny / packh) * 100; // transform based on the pin position
}

// onmouseup event listener
function onmouseup() {
	md = false;
	const pkcollisionbox = document.getElementById("pkcollisionbox");
	let packElem = document.querySelector('.pack'),
		aRect = pkcollisionbox.getBoundingClientRect(),
		bRect = packElem.getBoundingClientRect();
	if (((aRect.top + aRect.height) < (bRect.top)) ||
		(aRect.top > (bRect.top + bRect.height)) ||
		((aRect.left + aRect.width) < bRect.left) ||
		(aRect.left > (bRect.left + bRect.width))) {
		collision = true;
	} else {
		let firstPass = secondPass
			= thirdPass
			= fourthPass
			= fifthPass
			= new Boolean(false);
		//let myPacks = Number(localStorage.getItem('myPacks'));
		let myPacks = 0;
		collision = false;
		openpackSnd.play();
		packElem.remove();
		document.getElementById("backfrompackbtn").disabled = true;
		myPacks -= 1;
		// localStorage.setItem('myPacks', myPacks.toString());
		document.getElementById("myPacks").innerText = myPacks;
		$('#packOpenAnimElem')
			.show()
			.addClass('packOpenAnim');

		setTimeout(function () {
			$('#packOpenAnimElem')
				.hide()
				.removeClass('packOpenAnim');
			$('#openpacks')
				.addClass('openPackShakeScreenAnim')
				.css({ 'filter': 'blur(5px)' });
			$('#containerOpenPack').show();
			let numOfCardsInPack = 4; // 4 plus guaranteed 1 rare card
			alreadyHasRare = false;
			for (let i = 0; i < numOfCardsInPack; i++) {
				let chanceModifier = Math.random();
				if (chanceModifier < 0.01) {
					// 1% chance
					createLegendaryCard();
				} else if (chanceModifier < 0.21) {
					// 20% chance
					createEpicCard();
				} else {
					// 30% chance
					createCommonCard();
				}

				if (!alreadyHasRare) {
					createRareCard();
					alreadyHasRare = true;
				}
			}

			// add card animation classes when opening pack
			document.getElementsByClassName("flip-card")[0].classList.add("cardOnePackOpen");
			document.getElementsByClassName("flip-card")[1].classList.add("cardTwoPackOpen");
			document.getElementsByClassName("flip-card")[2].classList.add("cardThreePackOpen");
			document.getElementsByClassName("flip-card")[3].classList.add("cardFourPackOpen");
			document.getElementsByClassName("flip-card")[4].classList.add("cardFivePackOpen");
			for (let i = 0; i < document.getElementById("containerOpenPack").childElementCount; i++) {
				document.getElementsByClassName("flip-card")[i].onclick = function () {
					document.getElementsByClassName("flip-card")[i].classList.add("rotate-card");
					if (document.getElementsByClassName("flip-card")[i].classList.contains("flip-card-common")) {
						if (!cardflipSnd.paused) {
							overlapCardFlipSnd.play();
						} else {
							cardflipSnd.play();
						}
					} else if (document.getElementsByClassName("flip-card")[i].classList.contains("flip-card-rare")) {
						rareSnd.play();
						if (!cardflipSnd.paused) {
							overlapCardFlipSnd.play();
						} else {
							cardflipSnd.play();
						}
						document.getElementsByClassName("flip-card")[i].classList.remove("flip-card-rare");
						document.getElementById("openpacks").classList.add("rareFlipAnim");
						setTimeout(function () {
							document.getElementById("openpacks").classList.remove("rareFlipAnim");
						}, 0.1 * 1000);
					} else if (document.getElementsByClassName("flip-card")[i].classList.contains("flip-card-epic")) {
						epicSnd.play();
						if (!cardflipSnd.paused) {
							overlapCardFlipSnd.play();
						} else {
							cardflipSnd.play();
						}
						document.getElementsByClassName("flip-card")[i].classList.remove("flip-card-epic");
						document.getElementById("openpacks").classList.add("epicFlipAnim");
						setTimeout(function () {
							document.getElementById("openpacks").classList.remove("epicFlipAnim");
						}, 0.15 * 1000);
					} else if (document.getElementsByClassName("flip-card")[i].classList.contains("flip-card-legendary")) {
						legendarySnd.play();
						if (!cardflipSnd.paused) {
							overlapCardFlipSnd.play();
						} else {
							cardflipSnd.play();
						}
						document.getElementsByClassName("flip-card")[i].classList.remove("flip-card-legendary");
						document.getElementById("openpacks").classList.add("legendaryFlipAnim");
						setTimeout(function () {
							document.getElementById("openpacks").classList.remove("legendaryFlipAnim");
						}, 0.25 * 1000);
					}

					if (document.getElementsByClassName("flip-card")[i].classList.contains("rotate-card")) {
						if (i == 0) {
							firstPass = true;
						} else if (i == 1) {
							secondPass = true;
						} else if (i == 2) {
							thirdPass = true;
						} else if (i == 3) {
							fourthPass = true;
						} else if (i == 4) {
							fifthPass = true;
						}

						if (firstPass && secondPass && thirdPass && fourthPass && fifthPass) {
							$('#donepackbutton').show();
						}
					}
					document.getElementsByClassName("flip-card")[i].classList.add("notransition");
				};
			}
		}, 1.7 * 1000);
	}
}
// onmousemove event listener
function onmousemove(e) {
	if (!md) { return; }
	mx = e.pageX;
	my = e.pageY;
}

/* when the window is resized change the ww and wh 
variables to the new window width and height */
function onresize() {
	ww = window.innerWidth;
	wh = window.innerHeight;
}

// function to loop
function loop() {
	requestAnimationFrame(loop)

	// set new target position
	targetx = mx - packx - pinx;
	targety = my - packy - piny;

	// lerp to new position
	packx += targetx * 0.25;
	packy += targety * 0.25;

	// contain pack to window bounds
	if (packx < -packw / 2) {
		packx = -packw / 2;
	}
	if (packx > ww - packw / 2) {
		packx = ww - packw / 2;
	}
	if (packy < -packh / 2) {
		packy = -packh / 2;
	}
	if (packy > wh - packh / 2) {
		packy = wh - packh / 2;
	}

	// get rotation based on how much pack moved
	targetrx = (opacky - packy - rx) * 3;
	targetry = (packx - opackx - ry) * 3;

	// lock rotation so things don't get too crazy
	targetrx = Math.min(targetrx, 90);
	targetrx = Math.max(targetrx, -90);
	targetry = Math.min(targetry, 90);
	targetry = Math.max(targetry, -90);

	// lerp to new rotation
	rx += targetrx * 0.1;
	ry += targetry * 0.1;

	// scale up when the mouse is pressed
	targetscale = md ? 1.2 - scale : 1 - scale;
	scale += targetscale * 0.2;

	// apply the transform to the pack
	pack.style['transform'] = 'translate3d(' + packx + 'px, ' + packy + 'px, 0)';
	image.style['transform-origin'] = pinxperc + '% ' + pinyperc + '%';
	image.style['transform'] = 'scale(' + scale + ') rotateY(' + ry + 'deg) rotateX(' + rx + 'deg)';

	majestyvoltarget = md ? 0.2 : 0;
	majestyvol += (majestyvoltarget - majestyvol) * 0.1;
	majesty.volume = majestyvol;

	whooshvoltarget = (Math.abs((opacky - packy)) + Math.abs((opackx - packx))) * 0.003;
	whooshvol += (whooshvoltarget - whooshvol) * 0.1;
	whoosh.volume = Math.min(whooshvol, 1);

	// store the old pack position
	opackx = packx;
	opacky = packy;
}


