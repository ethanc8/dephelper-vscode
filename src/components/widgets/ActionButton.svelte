<script>
	import "@vscode-elements/elements-lite/components/action-button/action-button.css";
  import Codicon from './Codicon.svelte';

	let { icon, onclick, props } = $props();
</script>

<button type="button" class="vscode-action-button" {onclick} {...props}>
  <Codicon name={icon} />
</button>