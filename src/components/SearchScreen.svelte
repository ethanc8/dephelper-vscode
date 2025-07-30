<script>
  import SearchResult from "./SearchResult.svelte";
  import Screen from "./Screen.svelte";
  import ActionButton from "./widgets/ActionButton.svelte";

  import "@vscode-elements/elements/dist/vscode-scrollable/index.js";
  import { navigateTo } from "../nav.svelte";

  

  // let fakePackage = {
  //   "pypi_name": "wheel",
  //   "gh_repo": "pypa/wheel",
  //   "stars": 533,
  //   "monthly_downloads": 267_394_077,
  //   "description": "A built-package format for Python"
  // };

  // let packages = $state(Array(20).fill(fakePackage));
  let packages = $state([]);

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

  async function processSearch() {
    const pkgname = searchTerm;
    const pkg_response = await fetch(`https://api.deps.dev/v3/systems/PyPI/packages/${pkgname}`);
    if (!pkg_response.ok) {
      console.log(`Received HTTP ${pkg_response.status} when fetching https://api.deps.dev/v3/systems/PyPI/packages/${pkgname}`);
      return;
    }
    const pkgres = await pkg_response.json();
    if (!pkgres.versions) { return; }

    console.log(`Successfully found package ${pkgname}`);
    let defaultVersionKey = pkgres.versions.find(version => version.isDefault === true).versionKey;
    if(!defaultVersionKey) {
      defaultVersionKey = pkgres.versions.reduce((latest, current) => {
        return new Date(current.publishedAt) > new Date(latest.publishedAt) ? current : latest;
      });
    }
    console.log(defaultVersionKey);
    const ver_response = await fetch(`https://api.deps.dev/v3/systems/${defaultVersionKey.system}/packages/${defaultVersionKey.name}/versions/${defaultVersionKey.version}`);
    if (!ver_response.ok) {
      throw new Error(`Received HTTP ${ver_response.status} when fetching https://api.deps.dev/v3/systems/${defaultVersionKey.system}/packages/${defaultVersionKey.name}/versions/${defaultVersionKey.version}`);
    }
    const version = await ver_response.json();
    console.log(version);
    let projectId, prj_response, project, has_project;
    // FIXME: We need to deal with the case of having multiple projects
    if(version.relatedProjects !== undefined && version.relatedProjects.length != 0) {
      projectId = version.relatedProjects[0].projectKey.id;
      console.log(`Project ID: ${projectId}`)
      prj_response = await fetch(`https://api.deps.dev/v3/projects/${encodeURIComponent(projectId)}`);
      if (!prj_response.ok) {
        throw new Error(`Received HTTP ${prj_response.status} when fetching https://api.deps.dev/v3/projects/${encodeURIComponent(projectId)}`);
      }
      project = await prj_response.json();
      has_project = true;
    }

    // TODO: need to proxy the download stats because it's behind CORS
    const has_download_stats = false;
    if(has_download_stats) {
      const dld_response = await fetch(`https://pypistats.org/api/packages/${defaultVersionKey.name}/recent`);
      if(!dld_response.ok) {
        throw new Error(`Received HTTP ${dld_response.status} when fetching https://pypistats.org/api/packages/${defaultVersionKey.name}/recent`);
      }
      const download_stats = await dld_response.json();
    }

    packages = [
      {
        "pypi_name": defaultVersionKey.name,
        "gh_repo": has_project ? projectId : "[unknown]",
        "stars": has_project ? project.starsCount : 0,
        "monthly_downloads": has_download_stats ? download_stats.data.last_month : 0,
        // FIXME: We'll need to serve PyPI metadata descriptions ourselves
        "description": has_project ? project.description : "No description found"
      }
    ]

    console.log(packages[0]);
  }
</script>

<Screen name="search" {callback}>
  <div class="vscode-textfield">
    <input type="text"
      placeholder="Search PyPI..."
      bind:value={searchTerm}
      oninput={processSearch}
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

    No more results
  </div>
</Screen>
