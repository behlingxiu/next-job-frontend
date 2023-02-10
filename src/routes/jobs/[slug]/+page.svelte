<script>
    import SvelteMarkdown from 'svelte-markdown';
    import humanize from "humanize-plus";
	  import { get_root_for_style } from 'svelte/internal';
    import { goto } from "$app/navigation";
    import { PUBLIC_BACKEND_BASE_URL } from "$env/static/public";
	  import { getTokenFromLocalStorage, getUserId } from '../../../utils/auth';

    export let data;
  
    const user = getUserId()

    function editJob() {
      goto(`/jobs/${data.job.id}/update`)
    }

    async function deleteJob() {
        const res = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': getTokenFromLocalStorage(),
        'mode': 'cors'
        },
      })    
      console.log(res)
      if (res.status == 204){
        goto('/')
      } else {
        const resp = await res.json()
        alert.setAlert(resp.message, "error")
      }
    }


  
  </script>
  
  <div class="mt-10">
    <div class="flex">
      <div class="flex-1">
        <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
        <p class="text-xl">{data.job.employer}</p>
      </div>
      {#if user === data.job.user}
      <div>
        <button on:click={editJob} class="btn btn-ghost normal-case ">EDIT</button>
        <button on:click={deleteJob} class="btn btn-ghost normal-case ">DELETE</button>
      </div>
      {/if}
    </div>
  
    <div class="flex flex-row w-full mt-8">
      <div class="basis-2/3 prose max-w-none w-full">
        <h2 class="text-xl font-thin">Description</h2>
        <SvelteMarkdown source={data.job.description} />
        <div>
          {data.job.description}
        </div>
        <div class="mt-6" />
        <h2 class="text-xl font-thin">Requirements</h2>
        <SvelteMarkdown source={data.job.requirements} />
        <div>
          {data.job.requirements}
          <div />
          <div class="mt-6" />
          <h2 class="text-xl font-thin">How to Apply?</h2>
          <p>{data.job.applicationInstructions}</p>
        </div>
        <div class="basis-1/3 ml-4">
          <h2 class="text-xl font-thin">Location</h2>
          <p>{data.job.location}</p>
          <div class="mt-6" />
          <h2 class="text-xl font-thin">Salary Range</h2>
          <p>
            USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD
            {humanize.formatNumber( data.job.maxAnnualCompensation )}
          </p>
        </div>
      </div>
    </div>
  </div>
