<script>
import { useRouter } from 'vue-router'

export default {
	setup() {
		const router = useRouter()
		return { router }
	}
}
</script>
<template>
	<main class="guide">
		<header class="guide-header">
			<p class="eyebrow">A quick rules reference</p>
			<h1>Look at the Stars</h1>
			<p>Build a night sky of constellations before the sun comes up.</p>
		</header>

		<section class="rules-section">
			<h2>Get ready</h2>
			<p>Each player takes a different night-sky board and a marker. Shuffle the 30 night cards, make three face-down decks of six cards, and return the remaining cards to the box. Shuffle the two bonus-card decks separately and reveal one card from each.</p>
		</section>

		<section class="rules-section">
			<h2>Play 18 turns</h2>
			<p>On each turn, reveal the top night card. Everyone simultaneously copies its two-line shape onto their own board. The shape may be rotated in any direction, but not mirrored. You may skip a card, but you must draw both lines or neither.</p>
			<ul>
				<li>Each line connects two adjacent stars, horizontally, vertically, or diagonally.</li>
				<li>Lines may cross or share stars, but may not overlap.</li>
				<li>A line cannot touch a planet or another object.</li>
			</ul>
			<p>After the first deck is used, the bottom two rows are closed to new lines. After the second deck, the bottom four rows are closed.</p>
		</section>

		<section class="rules-section">
			<h2>Shooting stars</h2>
			<p>Shooting-star cards are optional. Draw one as a diagonal path of one, two, or three lines. It cannot touch a star that has already been used, and other lines cannot touch it. Score one point for each line in the shooting star.</p>
		</section>

		<section class="rules-section">
			<h2>Score the sky</h2>
			<ul>
				<li>A constellation is a connected group of lines; lines connect by crossing or sharing a star. It must contain 3 to 8 lines. Score points equal to its number of lines.</li>
				<li>You can score only one constellation of each size. A group of 1, 2, or 9 or more lines scores no constellation points.</li>
				<li>Each planet scores one point for every adjacent constellation, even if constellations are the same size.</li>
				<li>Bonus cards award points or special effects when you reproduce their pictured shape. Follow each card's instructions; the same line can count for different bonuses, but not twice for the same bonus.</li>
			</ul>
			<p>After the last card of the third deck, total your points. The player with the most points wins.</p>
		</section>

		<footer class="guide-footer">
			<a href="https://studiobombyx.com/assets/LOOKATTHESTAR_rulebook_EN.pdf" target="_blank" rel="noopener noreferrer">Official rulebook (PDF)</a>
			<button class="navigation-button" type="button" @click="router.push('/')">Back to main page</button>
			<button class="navigation-button" type="button" @click="router.push('/game')">Start playing</button>
		</footer>
	</main>
</template>

<style scoped>
.guide {
	width: min(100%, 54rem);
	margin: 0 auto;
	padding: 1rem 0 2rem;
}

.guide-header {
	padding: 1.5rem 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.28);
}

.guide-header h1 {
	margin: 0.25rem 0 0.5rem;
}

.guide-header p:last-child {
	margin-bottom: 0;
}

.eyebrow {
	margin: 0;
	color: #b6d9ff;
	font-size: 0.8rem;
	text-transform: uppercase;
}

.rules-section {
	padding: 1.25rem 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.18);
	line-height: 1.6;
}

.rules-section h2 {
	margin: 0 0 0.6rem;
	color: #b6d9ff;
	font-size: 1.2rem;
}

.rules-section p {
	margin: 0.5rem 0;
}

.rules-section ul {
	margin: 0.5rem 0;
	padding-left: 1.4rem;
}

.guide-footer {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 1rem;
	padding-top: 1.5rem;
}

.guide-footer a {
	color: #b6d9ff;
}

.guide-footer :deep(.navigation-button) {
	margin: 0;
}

@media (max-width: 36rem) {
	.guide {
		padding-top: 0;
	}

	.guide-header {
		padding-top: 0.75rem;
	}
}
</style>