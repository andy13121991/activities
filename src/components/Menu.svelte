<script>
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';

    export let open;
</script>

{#if open}
    <div class="menu">
        {#each ['Home', 'CV', 'Skills', 'Portfolio'] as link, i}
            <p transition:fly={{ y: -15, delay: 50 * i }}>
                {link}
            </p>
        {/each}
    </div>

    <div class="bar" transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
{/if}

<style>

.menu {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 0.15em;
    padding: 1em;
    padding-top: 0;
    color: black;
}
p {
    cursor: pointer;
    width: max-content;
    margin: 1rem auto;
}
p:hover {
    text-decoration: underline;
}
.bar {
    border-style: solid;
    border-color: black;
    border-width: 1px;
    height: 0;
}
</style>