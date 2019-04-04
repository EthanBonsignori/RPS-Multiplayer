const userList = $('#user-list')
const form = $('#new-user-form')

// Show all data in the users firestore collection on screen
function renderUsers (doc) {
  let li = $('<li>')
  let username = $('<span>')

  li.attr('data-id', doc.id)
  username.text(doc.data().username)

  li.append(username)

  userList.append(li)
}

// Grabs data from firestore
db.collection('users').get()
  .then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderUsers(doc)
    })
  })

// Save new user to firestore
form.submit(function (e) {
  e.preventDefault()
  // Convert form input into an array
  let input = $(this).serializeArray()
  console.log(input)
  // Add new user info to firestore
  db.collection('users').add({
    username: input[0].value,
    email: input[1].value,
    password: input[2].value
  })
  // clear the form
  form.find('input:text').val('')
})

// $(document).on('click', '#input-submit-button', function () {
//   let displayName = $('#input-displayname').val()
//   let email = $('#input-email').val()
//   let password = $('#input-password').val()

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(function (user) {
//       user.updateProfile{{displayName: displayName}}
//     })
// })
