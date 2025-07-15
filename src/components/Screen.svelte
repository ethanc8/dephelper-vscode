<script>
  import { nav, navigateTo, registerScreen } from '../nav.svelte.js';

  let { children, name, callback } = $props();

  registerScreen(name, callback);
</script>

<div
  style:display={name == nav.current_screen ? 'block' : 'none'}
  style:height="100%"
>
  {@render children?.()}
</div>
