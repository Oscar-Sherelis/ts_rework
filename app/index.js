import './styles/styles.scss';

// window.onload = () => {
//   const heading = document.querySelector('.heading');
//   heading.textContent = 'It\'s working!';
// };

function addTd(tr, tdValue) {
  let td = document.createElement('td');
  td.append(tdValue);
  tr.append(td);
}

function addUser(result, userObject, td3) {
  result.push({
    name: userObject.name,
    email: userObject.email
  });

  let p = document.createElement('p');
  p.append(userObject.name + ' ' + userObject.email);
  td3.append(p);
}

let result = [];
let tbody = document.querySelector('tbody');
fetch('http://localhost:3000/companies')
  .then(res => {
    return res.json();
  })
  .then(res => {
    res.forEach(companiesObject => {
      result[companiesObject.name] = [];
      fetch('http://localhost:3000/users')
        .then(res => {
          return res.json();
        })
        .then(res => {
          let tr = document.createElement('tr');
          let td3 = document.createElement('td');

          // add first td = "company_name"
          addTd(tr, companiesObject.name);

          res.forEach(userObject => {
            if (companiesObject.uri === userObject.uris.company) {
              // add third td workers data
              addUser(result[companiesObject.name], userObject, td3);
            }
          }); // forEach end

          // add second td number of workers
          addTd(tr, result[companiesObject.name].length);
          tr.append(td3);
          tbody.append(tr);
        });
    });
  });
