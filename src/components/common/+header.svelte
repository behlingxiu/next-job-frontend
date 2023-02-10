<script>
  import { goto } from '$app/navigation';
  import { loggedIn } from '../../utils/auth';
  import { logOut } from '../../utils/auth';

  async function logout() {
    const res = await logOut();

    if(res) {
      goto('/users/login')
    }
  }
  
</script>




<header>
    <div>
      <a href="/" class ="btn btn-ghost normal-case left-btn">NEXT Jobs DB</a>
    </div>
    <div>
      <a href="/postjob" class="btn btn-ghost normal-case right-btn">Post a Job</a>
      {#if $loggedIn}
      <button on:click={logout} class="btn btn-ghost normal-case right-btn">Log Out</button>
      {:else}
      <a href="/users/login" class="btn btn-ghost normal-case right-btn">Log In</a>
      {/if}
    </div>
  </header>

  <style>
    header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }

    .left-btn {
      font-size: 20px;
      margin-left: 10px;
    }

    .right-btn {
      font-size: 15px;
      margin-right: 10px;
      font-weight: 400;
    }
  </style>