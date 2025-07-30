<script>
  // import { Package } from "./package.svelte.ts";
  import Codicon from "./widgets/Codicon.svelte";
  import "@vscode-elements/elements-lite/components/label/label.css";
  let { package: pkg, onclick } = $props();
</script>

<!-- https://gist.github.com/Munawwar/7926618 for hbox/vbox pattern -->
<button
  {onclick}
  style:background-color="var(--vscode-sideBar-background)"
>
<div
  style:display="flex"
  style:flex-direction="column"
  style:align-content="flex-start"
>
  <div
    style:display="flex"
    style:flex-direction="row"
    style:align-content="flex-start"
    style:width="100%"
  >
    <span class="vscode-label" style:flex="1">{pkg.pypi_name}</span>

    <Codicon name="cloud-download" />
    <span class="vscode-label normal" style:flex="1">{pkg.monthly_downloads}/mo</span>

    <Codicon name="star-empty" />
    <span class="vscode-label normal" style:flex="1">{pkg.stars}</span>
  </div>

  <span class="vscode-label normal" style:flex="1">{pkg.description}</span>
  <span class="vscode-label normal" style:flex="1">@{pkg.gh_repo}</span>
</div>
</button>
