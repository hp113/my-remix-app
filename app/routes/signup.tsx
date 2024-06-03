import { ActionFunction, json, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import supabase from '~/supabaseClient';

interface SupabaseError {
  message: string;
  // Add other properties if needed
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw new Error((error as SupabaseError).message);
        return redirect('/');  // Redirect on successful signup
    } catch (error) {
        return json({ error: (error as SupabaseError).message }, { status: 400 });
    }
};

export default function Signup() {
    
    return (
        <div>
            <form method="post">  {/* method="post" is crucial here */}
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="text" name="name" placeholder="Name" required />
                <input type="number" name="age" placeholder="Age" required />
                <input type="number" name="height" placeholder="Height" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
