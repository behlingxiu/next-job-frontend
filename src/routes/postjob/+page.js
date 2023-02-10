import { goto } from '$app/navigation';
import { isLoggedIn } from '../../utils/auth';
import { alert } from '../../utils/alert';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
  // check if user is logged in, if not throw redirect to /users/new with an alert message asking them to "Please sign up before creating a job"
    if (!(await isLoggedIn())) {
        
        throw redirect(302, '/users/new')
    };
}


  // if not logged in
    // set alert message
    // throw redirect(302, '/users/new')
