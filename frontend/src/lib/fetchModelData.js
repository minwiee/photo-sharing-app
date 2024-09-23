const url = 'http://localhost:8081'
function fetchUserListModel() {
  return fetch(url + "/api/user/list", {
    method: "GET",
    credentials: 'include', // Include credentials

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      return data;
    });
}

function fetchUserModel(userId) {
  return fetch(url + "/api/user/" + userId, {
    method: "GET",
    credentials: 'include', // Include credentials

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      return data;
    });
}

function fetchPhotoOfUserModel(userId) {
  return fetch(url + "/api/photo/photosOfUser/" + userId, {
    
    method: "GET",
        credentials: 'include', // Include credentials
        withCredentials: true,

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function fetchCommentOfPhotoModel(photoId) {
  return fetch(
    url + "/api/comment/commentsOfPhoto/" + photoId,
    {
      method: "GET",
      credentials: "include", 
      withCredentials: true,
  
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function fetchRegister(firstName, lastName, email, password, occupation, location, description) {
  return fetch(url + '/api/user/register', {
    method: 'POST',
    body: JSON.stringify({ 
      login_name: email, 
      password: password, 
      first_name: firstName, 
      last_name: lastName, 
      occupation: occupation, 
      location: location, 
      description: description 
    }),
    headers: {
      'Content-Type': 'application/json',
      credentials: "include", 
      withCredentials: true,
  
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function fetchLogin(loginName, loginPassword) {
  console.log(loginName, loginPassword)
  return fetch(url + '/api/user/admin/login', {
    method: 'POST',
    body: JSON.stringify({ login_name: loginName, password: loginPassword }),
    credentials: "include", 
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // console.log("hehehe",res);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // console.log("heheheh",data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error appropriately
    });
}
// console.log(response);
//   if (!response.ok) {
//     throw new Error('Login failed');
//   }

//   const user = await response.json();
//   setUser(user);
// } catch (error) {
//   console.error('Error:', error);
// }
function fetchLogout() {
  return fetch(url + '/api/user/admin/logout', {
    method: 'POST',
    credentials: 'include', // Include credentials
    withCredentials: true,

    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
function fetchNewComment(photoId, newComment) {
  console.log(photoId, newComment)
  return fetch(url + "/api/photo/commentsOfPhoto/" + photoId, {
    method: 'POST',
    credentials: 'include', // Include credentials
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment: newComment }),
  })
    .then(response => {
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// async function fetchNewPhoto(formData) {
//   try {
//     const response = await fetch(url + '/api/photo/photos/new', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Failed to upload photo:', error);
//   }
// }
function fetchNewPhoto(formData) {
  return fetch(url + '/api/photo/photos/new', {
    method: 'POST',
    credentials: "include", withCredentials: true,
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response)
    return response.json();
  })
  .catch(error => {
    console.error('Failed to upload photo:', error);
  });
}
function fetchDeleteUser(userId) {
  return fetch(url + '/api/user/delete/' + userId, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Failed to delete user:', error);
    });
}
const fetchModels = {
  fetchUserListModel: fetchUserListModel,
  fetchUserModel: fetchUserModel,
  fetchPhotoOfUserModel: fetchPhotoOfUserModel,
  fetchCommentOfPhotoModel: fetchCommentOfPhotoModel,
  fetchRegister: fetchRegister,
  fetchLogin: fetchLogin,
  fetchDeleteUser: fetchDeleteUser,
  fetchLogout: fetchLogout,
  fetchNewComment: fetchNewComment,
  fetchNewPhoto: fetchNewPhoto,
};

export default fetchModels;
