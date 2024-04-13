export function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch('https://661a2428125e9bb9f29b658b.mockapi.io/userdetails')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createUser(data) {
  return new Promise((resolve, reject) => {
    fetch('https://661a2428125e9bb9f29b658b.mockapi.io/userdetails', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateUser(data) {
  return new Promise((resolve, reject) => {
    fetch(`https://661a2428125e9bb9f29b658b.mockapi.io/userdetails/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://661a2428125e9bb9f29b658b.mockapi.io/userdetails/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}