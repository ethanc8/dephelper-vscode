<script>
  import { navigateTo } from "../nav.svelte";
  import Screen from "./Screen.svelte";
  import ActionButton from "./widgets/ActionButton.svelte";
  import Codicon from "./widgets/Codicon.svelte";
  import Collapsible from "./widgets/Collapsible.svelte";
  import Badge from "./widgets/Badge.svelte";
  import "@vscode-elements/elements-lite/components/label/label.css";

  let pkg = $state({
    "pypi_name": "",
    "gh_repo": "",
    "stars": 0,
    "monthly_downloads": 0,
    "description": "",
    "project": {
      projectKey: {
        id: ""
      },
      openIssuesCount: 0,
      starsCount: 0,
      forksCount: 0,
      license: "",
      homepage: "",
      scorecard: {
        overallScore: "3.5",
      }
    },
    "version": {
      versionKey: {
        version: "1.0",
      }
    }
  });

  let projectHost = $derived(pkg.project.projectKey.id.split("/")[0]);

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
      <span class="vscode-label" style:font-weight="normal" style:flex="1"> {pkg.version.versionKey.version}</span>

      <Codicon name="cloud-download" />
      <span class="vscode-label" style:font-weight="normal" style:flex="1">{pkg.monthly_downloads}/mo</span>

      <Codicon name="star-empty" />
      <span class="vscode-label" style:font-weight="normal" style:flex="1">{pkg.stars}</span>
    </div>

    <span class="vscode-label" style:font-weight="normal">{pkg.description}</span>
    <span class="vscode-label" style:font-weight="normal">{pkg.gh_repo}</span>
  </div>

  <Collapsible
    title="Basic info"
    open={true}>
    <a href="https://{pkg.project.projectKey.id}">
      <div
        style:display="flex"
        style:flex-direction="row"
        style:align-content="flex-start"
        style:width="100%"
      >
        <Codicon name="repo" />
        <span class="vscode-label" style:font-weight="normal">Repository</span>
      </div>
    </a>
    {#if pkg.project.homepage}
    <a href="https://{pkg.project.homepage}">
      <div
        style:display="flex"
        style:flex-direction="row"
        style:align-content="flex-start"
        style:width="100%"
      >
        <Codicon name="home" />
        <span class="vscode-label" style:font-weight="normal">Homepage</span>
      </div>
    </a>
    {/if}
    {#if projectHost === "github.com" && pkg.project.openIssuesCount}
    <a href="https://{pkg.project.projectKey.id}/issues">
      <div
        style:display="flex"
        style:flex-direction="row"
        style:align-content="flex-start"
        style:width="100%"
      >
        <Codicon name="bug" />
        <span class="vscode-label" style:font-weight="normal">Issues</span>
        <Badge type="counter">{pkg.project.openIssuesCount}</Badge>
      </div>
    </a>
    {/if}
    {#if projectHost === "github.com" && pkg.project.starsCount}
    <a href="https://{pkg.project.projectKey.id}/stargazers">
      <div
        style:display="flex"
        style:flex-direction="row"
        style:align-content="flex-start"
        style:width="100%"
      >
        <Codicon name="star-empty" />
        <span class="vscode-label" style:font-weight="normal">Stars</span>
        <Badge type="counter">{pkg.project.starsCount}</Badge>
      </div>
    </a>
    {/if}
    {#if projectHost === "github.com" && pkg.project.forksCount}
    <a href="https://{pkg.project.projectKey.id}/forks">
      <div
        style:display="flex"
        style:flex-direction="row"
        style:align-content="flex-start"
        style:width="100%"
      >
        <Codicon name="repo-forked" />
        <span class="vscode-label" style:font-weight="normal">Forks</span>
        <Badge type="counter">{pkg.project.forksCount}</Badge>
      </div>
    </a>
    {/if}
    {#if pkg.project.license}
    <span>
      <div
        style:display="flex"
        style:flex-direction="row"
        style:align-content="flex-start"
        style:width="100%"
      >
        <Codicon name="file" />
        <span class="vscode-label">License: </span>
        <Badge>{pkg.project.license}</Badge>
      </div>
    </span>
    {/if}
  </Collapsible>

  <Collapsible
    title="OpenSSF scorecard"
    open={false}>
    {#snippet decorations()}
      <Badge>{pkg.project.scorecard.overallScore}</Badge>
    {/snippet}
    
  </Collapsible>


</Screen>
