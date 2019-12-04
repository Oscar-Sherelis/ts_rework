export async function ccompanies () {
    const companies = await fetch('http://localhost:3000/companies');
    return await companies.json();
}

export async function users () {
    const users = await fetch('http://localhost:3000/users');
    return await users.json();
}