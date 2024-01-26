<script>
	export let chosenActivity
	export let animationEnded
	export let activityHasBeenDone
</script>

<style>
h2 {
	grid-area: main;
	justify-self: center;
	color: #ff3e00;
	font-size: 3em;
	font-weight: 100;
	font-weight: 900;
	text-transform: uppercase;
	text-shadow: 3px 3px 0 #000;
	-webkit-text-stroke: 2px #710000;
	letter-spacing: -2px;
	margin: 1.5em 1em 2em 1em;
}

@media screen and (max-width: 800px) {
	h2 {
		font-size: 2em;
	}
}
</style>

<h2
	class="animate__animated"
	class:animate__tada={animationEnded}
	class:animate__backOutDown={activityHasBeenDone}>

	<span>{chosenActivity.title}</span>
</h2>