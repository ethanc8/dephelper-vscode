<script>
  import "@vscode-elements/elements-lite/components/badge/badge.css";

  let { type = "", children } = $props();
</script>

<span class="vscode-badge {type}">{@render children?.()}</span>
