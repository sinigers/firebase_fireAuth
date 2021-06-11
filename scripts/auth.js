

//listen for auth status changes. to know if user is login or out
auth.onAuthStateChanged(user =>{
  console.log(user);
  if(user){
    // console.log('user logged in:', user);

    // get data from fireStore
    db.collection('guides').get().then(snapshot =>{
      setupGuides(snapshot.docs);

    setupUI(user); 
});
  }else{
    // console.log('user logged out');
    setupUI();
    setupGuides([]);
  }
});

//create new guide or post
const createForm=document.querySelector('#create-form');
createForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  //get value from inputs and convert to firestore db document. async method
   db.collection('guides').add({
     title: createForm['title'].value,
      content: createForm['content'].value

   }).then(() =>{
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err =>{
    console.log(err.message);
  })
});




// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  // console.log(email, password);

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // console.log(cred.user);
    
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut()
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred =>{
    // console.log(cred.user);
    //close the login modal and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  })
})