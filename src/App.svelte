<script>
import { circOut } from 'svelte/easing'
import { shuffleArray } from './shuffleArray.js'
import { tweened } from 'svelte/motion'
import Activities from './components/Activities.svelte';

	let showModal = false;

	let dialog;

	$: if (dialog && showModal) dialog.showModal();
	
let activity = localStorage.getStuff('notDoneActivity');
let audio = new Audio('/assualt.mp3');

	let activityHasBeenDone = false;
	let animationEnded = false;

	// countdown
	const progress = tweened(0, {
		duration: 2500,
		easing: circOut
	})

	// randomize (choose random book)
	const shuffleActivity = () => {
		activity = localStorage.getStuff('notDoneActivity')
		shuffleArray(activity)

		activityHasBeenDone = false;
		animationEnded = false;

		let index = $progress === 0 ? activity.length - 1 : 0

		progress.set(index).then(() => {
			animationEnded = true;
			audio.play()
		})
	}

	const missionAccomplished = () => {
		let missionAccomplished = localStorage.getStuff('missionAccomplished')
		let notDoneActivity = localStorage.getStuff('notDoneActivity')

		activityHasBeenDone = true;

		missionAccomplished.push(chosenActivity)
		notDoneActivity = notDoneActivity.filter(item => item.id !== chosenActivity.id)

		localStorage.setStuff('missionAccomplished', missionAccomplished)
		localStorage.setStuff('notDoneActivity', notDoneActivity)
	}

	$: chosenActivity = activity[Math.floor($progress)] || activity[0]
</script>

<header>
	<h1>ACTIVITIES™</h1>
</header>
<main>
	<Activities {chosenActivity} {animationEnded} {activityHasBeenDone} />
	<section class="controls">

		<img 
		on:click={shuffleActivity} 
		src="/oldm.png" 
		alt="gun" />

		<img 
		on:click={() => (showModal = true)} 
		src="/joystick.png" 
		alt="anchor" />

	</section>

	<dialog
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => dialog.close()}
		>
		<div on:click|stopPropagation>

			<div class="shutdown">
				<img 
				on:click={() => dialog.close()}
				class="icon-shutdown" 
				src="/shutdown.png" 
				alt="Shutdown" />
			</div>

			<div class="text-modal">

				<h2 class="modal-title">Are you done with activity?</h2>

				<small class="modal-ask">Cancel or Accept</small>

			</div>

			<div class="icon-container">
				
				<div class="close">
					<img 
					on:click={() => dialog.close()}
					class="icon-dialog"
					src="/close.png" 
					alt="Close" />
				</div>

				<div class="done">
					<img 
					on:click={() => dialog.close()} 
					on:click={missionAccomplished}
					class="icon-dialog" 
					src="/done.png" 
					alt="Done" />
				</div>

			</div>

		</div>
	</dialog>
</main>

<style>

dialog {
	max-width: 32em;
	border-radius: 0.9375em;
	border: none;
	padding: 0;
}

dialog::backdrop {
	background: rgba(0, 0, 0, 0.3);
}

dialog > div {
	display: grid;
	grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}

dialog[open] {
	animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes zoom {
	from {
		transform: scale(0.95);
	}
	to {
		transform: scale(1);
	}
}

dialog[open]::backdrop {
	animation: fade 0.2s ease-out;
}

@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.icon-dialog{
	max-width: 3em;
}

.icon-dialog:hover {
	transform: scale(1.2);
}

.icon-dialog:active {
	transform: scale(0.95);
}

.icon-shutdown{
	padding: 0.3em 0.3em 0.3em 0.3em;
	max-width: 2em;
	justify-self: end;
}

.icon-shutdown:hover {
	transform: scale(1.2);
}

.icon-shutdown:active {
	transform: scale(0.95);
}

div.text-modal{
	margin: 0.5em 1em 0 1em;
	display: grid;
	grid-area: main;
	justify-self: center;
	font-size: 1.3em;
}

.modal-title{
	margin: 0 0 2em 0;
	justify-self: center;
}

.modal-ask{
	justify-self: center;
}

div.shutdown{
	padding: 0 0 0 0;
	width: 100%;
	display: grid;
	grid-area: header;
	border-bottom: 1px solid rgba(0, 200, 255, 0.904);
	background-color: rgba(0, 140, 255, 0.904);
	box-shadow: black;
}

.icon-container{
	margin: 1em 1em 1em 1em;
	display: grid;
	grid-area: footer;
	grid-template-rows: 0;
}

div.close{
	max-width: 3em;
	justify-self: start;
}

div.done{
	max-width: 3em;
	justify-self: end;
}
</style>