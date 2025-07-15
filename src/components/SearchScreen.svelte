<script>
  import SearchResult from "./SearchResult.svelte";
  import Screen from "./Screen.svelte";
  import ActionButton from "./widgets/ActionButton.svelte";

  import "@vscode-elements/elements/dist/vscode-scrollable/index.js";
  import { navigateTo } from "../nav.svelte";

  

  let fakePackage = {
    "pypi_name": "wheel",
    "gh_repo": "pypa/wheel",
    "stars": 533,
    "monthly_downloads": 267_394_077,
    "description": "A built-package format for Python"
  };

  let packages = $state(Array(20).fill(fakePackage));

  function navigateToPackageScreen(pkg) {
    navigateTo('package', {"package": pkg});
  }

  let searchTerm = $state("");

	function clearSearchbox() {
		searchTerm = "";
	}

  function callback(props) {
    if(props.shouldChangeSearchTerm) {
      searchTerm = props.searchTerm;
    }
  }
</script>

<Screen name="search" {callback}>
  <div class="vscode-textfield">
    <input type="text"
      placeholder="Search PyPI..."
      bind:value={searchTerm}
    />
    <ActionButton
      icon="clear-all"
      onclick={clearSearchbox}
      title="Clear search field"
    />
  </div>

  <div 
    style:height="100%"
    style:overflow="scroll"
  >
    {#each packages as pkg}
      <SearchResult package={pkg} onclick={() => navigateToPackageScreen(pkg)}/>
    {/each}
  </div>
</Screen>
