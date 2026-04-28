async function signUp() {
alert("app.js loaded");
alert("SignUp clicked");
console.log("signUp function running");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  await supabaseClient.auth.signUp({
    email,
    password
  });

  alert("Check email for confirmation");
}

async function signIn() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (data.user) {
    document.getElementById("app").style.display = "block";
    loadTasks();
  }
}

async function addTask() {
  let task = document.getElementById("task").value;

  let user = (await supabaseClient.auth.getUser()).data.user;

  await supabaseClient.from("tasks").insert([
    {
      user_id: user.id,
      subject: task,
      status: "pending"
    }
  ]);

  loadTasks();
}

async function loadTasks() {
  let user = (await supabaseClient.auth.getUser()).data.user;

  let { data } = await supabaseClient
    .from("tasks")
    .select("*")
    .eq("user_id", user.id);

  let html = "";

  data.forEach(t => {
    html += `<p>${t.subject}</p>`;
  });

  document.getElementById("tasks").innerHTML = html;
}