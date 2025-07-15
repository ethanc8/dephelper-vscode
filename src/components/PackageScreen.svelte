<script>
  import { navigateTo } from "../nav.svelte";
  import Screen from "./Screen.svelte";
  import ActionButton from "./widgets/ActionButton.svelte";
  import Codicon from "./widgets/Codicon.svelte";

  let pkg = $state({
    "pypi_name": "",
    "gh_repo": "",
    "stars": 0,
    "monthly_downloads": 0,
    "description": ""
  });

  function callback(props) {
    pkg = props.package;
  }
</script>

<Screen name="package" {callback}>
  <div
    style:display="flex"
    style:flex-direction="row"
    style:align-content="flex-start"
    style:width="100%"
  >
    <ActionButton 
      icon="chevron-left" 
      onclick={() => navigateTo('search', {"shouldChangeSearchTerm": false})}
    />
  </div>
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
</Screen>
