import { useState, ChangeEvent, FormEvent } from 'react';
import supabase from '~/supabaseClient';

interface Profile {
    user_id: string;
    name: string;
    age: number;
    height: number;
}

export default function Signin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    // Sign in user
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error);
      return;
    }

    const user = data.user;
    if (!user) {
      console.error('User not found after sign in');
      return;
    }

    // Fetch user profile
    const { data: profileData, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching profile:', fetchError);
    } else {
      setProfile(profileData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      {profile && (
        <div>
          <h2>Welcome, {profile.name}</h2>
          <p>Age: {profile.age}</p>
          <p>Height: {profile.height}</p>
        </div>
      )}
    </div>
  );
}
