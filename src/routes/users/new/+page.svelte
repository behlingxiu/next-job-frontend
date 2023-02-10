<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto, afterNavigate } from '$app/navigation';
    import { authenticateUser } from './../../../utils/auth.js';
	import { onMount } from 'svelte';
	import { alert } from '../../../utils/alert.js';
    let formErrors = {};
    let signingUp = false

    afterNavigate(() => {
      alert.setAlert('Please sign up before creating a job.', 'warning')
    })
    
    function postSignUp() {
      goto('/postjob');
    }
  
    async function createUser(evt) {
      evt.preventDefault()
  
      if (evt.target['password'].value != evt.target['password-confirmation'].value) {
        formErrors['password'] = { message: 'Password confirmation does not match' };
        return;
      }
  
      const userData = {
        username: evt.target['username'].value,
        email: evt.target['email'].value,
        password: evt.target['password'].value,
        passwordConfirm: evt.target['password-confirmation'].value
      };

      signingUp = true

      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (resp.status == 200) {
        const res = await authenticateUser(userData.username, userData.password);
  
        if (res.success) {
          signingUp = false
          postSignUp();
        } else {
          throw 'Sign up succeeded but authentication failed';
        }
      } else {
        const res = await resp.json();
        formErrors = res.data;
      }
    }
    
  </script>
  
  <h1 class="text-center text-xl">Create an Account to Post a Job</h1>
  <div class="text-center">
      <a class="link-hover italic text-xs" href="/users/login">Already have an account? Click here to login instead.</a>
  </div>
  <div class="flex justify-center items-center mt-8">
      <form on:submit={createUser} class="w-1/3">
          <div class="form-control w-full">
              <label class="label" for="username">
                  <span class="label-text">Username</span>
              </label>
              <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
              {#if 'username' in formErrors}
              <label class="label" for="username">
                  <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="email">
                  <span class="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
              {#if 'email' in formErrors}
              <label class="label" for="email">
                  <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Confirm Password</span>
              </label>
              <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full mt-4">
              <button class="btn btn-md">
                {#if signingUp}
                <div role="status">
                  <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                {/if}
                Create an Account
              </button>
          </div>
      </form>
  </div>

  