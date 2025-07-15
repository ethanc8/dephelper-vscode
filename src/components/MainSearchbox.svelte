<script>
	import "@vscode-elements/elements/dist/bundled.js";
	import ActionButton from "./widgets/ActionButton.svelte";
	import "@vscode-elements/elements-lite/components/textfield/textfield.css";

	let value = $state("");

	function clearSearchbox() {
		console.log(`value: ${value}`);
		value = "";
	}
</script>

<div class="vscode-textfield">
	<input type="text"
		placeholder="Search PyPI..."
		bind:value
	/>
	<ActionButton
		icon="clear-all"
		onclick={clearSearchbox}
		title="Clear search field"
	/>
</div>