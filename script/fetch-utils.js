const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUxMDExOCwiZXhwIjoxOTU1MDg2MTE4fQ.n_1ON3spG8iTfcVhhr5SVF_YVwK9zTLL2ChEvI1BSmY';
const SUPABASE_URL = "https://fyyidslbegjzyojgpivl.supabase.co"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function getCity(){
    const response = await client
        .from('city_builder')
        .select()
        .match({ user_id: client.auth.user().id })
        .single();

    return checkError(response);
}

export async function createDefaultCity(city){
    const newCity = {
        ...city,
        user_id: client.auth.user().id
    };

    const response = await client
        .from(`city_builder`)
        .insert([
            {
                ...newCity
            }
        ]);
        
    return checkError(response);
}

export async function updateCity(column, value, id){
    const response = await client
        .from(`city_builder`)
        .update({ [column]: value })
        .match({ user_id: id })
        .single();

    return checkError(response);
}

export async function redirectToBuild() {
    if (await getUser()) {
        location.replace('./cities');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}