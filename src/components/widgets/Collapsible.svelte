<script>
  import "@vscode-elements/elements-lite/components/collapsible/collapsible.css";

  let { title, description, actions, decorations, children, open, showActions } = $props();
</script>

<style>
  .vscode-collapsible .decorations {
    align-items: center;
    display: flex;
    height: 22px;
    margin-left: auto;
    margin-right: 4px;
  }
</style>

<details class="vscode-collapsible {showActions ? "always-show-actions" : ""} " {open}>
  <summary>
    <i class="codicon codicon-chevron-right icon-arrow"></i>
    <h2 class="title">
      {title}
      <!-- -->
      {#if description}
        <span class="description">{description}</span>
      {/if}
    </h2>

    {#if actions}
      <div class="actions">
        {@render actions()}
      </div>
    {/if}
    {#if decorations}
      <div class="decorations">
        {@render decorations()}
      </div>
    {/if}
  </summary>
  <div>
    {@render children?.()}
  </div>
</details>
