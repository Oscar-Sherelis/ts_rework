import './styles/styles.scss';
import 'DataTables.net';
import { users, ccompanies } from '../services/fetch'

window.onload = () => {
  work(result);
};


function addTd(tr: HTMLDivElement, tdValue: string) {
  let td = document.createElement('td');
  td.append(tdValue);
  tr.append(td);
}

function addUser(result: Array<Object>, userObject: any, td3: HTMLDivElement) {
  result.push({
    name: userObject.name,
    email: userObject.email
  });

  let p = document.createElement('p');
  p.append(userObject.name + ' ' + userObject.email);
  td3.append(p);
}

async function sortData() {
  try {
    let headID = document.getElementsByTagName('head')[0];

    let propper = document.createElement('script');
    propper.type = 'text/javascript';
    propper.src =
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';

    let jQuery = document.createElement('script');
    jQuery.src =
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';

    let jQueryTable = document.createElement('script');
    jQueryTable.src =
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';

    headID.appendChild(propper);
    (<any>$('.mydatatable')).DataTable({
      order: [[1, 'asc']]
    });

    headID.appendChild(jQuery);
    headID.appendChild(jQueryTable);
  } catch (error) {
    return error;
  }
}

let result: Array<any> = [];

async function work(result: Array<any>) {
  let tbody = document.querySelector('tbody');

  const companies = await fetch('http://localhost:3000/companies');
  let companyResponse = await companies.json();
  // console.log(companyResponse)
  
  const users = await fetch('http://localhost:3000/users');
  let userResponse = await users.json();

  console.log(users)
  companyResponse.forEach((company: any) => {

    result[company.name] = [];
    let tr = document.createElement('tr');
    let td3 = document.createElement('td');

    // add first td = 'company_name'
    addTd(tr, company.name);

    userResponse.forEach((user: any) => {
      if (company.uri === user.uris.company) {
        // add third td workers data
        addUser(result[company.name], user, td3);
      }
    });

    // add second td number of workers
    addTd(tr, result[company.name].length);
    tr.append(td3);
    tbody.append(tr);
  });
  
    await sortData();
}