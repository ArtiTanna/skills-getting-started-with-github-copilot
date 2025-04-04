document.addEventListener("DOMContentLoaded", () => {
  const activitiesContainer = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Example data structure for activities
  const activities = [
    {
      name: "Basketball",
      description: "Join the basketball team and improve your skills!",
      participants: ["john.doe@mergington.edu", "jane.smith@mergington.edu"],
    },
    {
      name: "Drama Club",
      description: "Express yourself through acting and theater.",
      participants: ["alice.jones@mergington.edu"],
    },
  ];

  // Clear the loading message
  activitiesContainer.innerHTML = "";

  // Populate activities
  activities.forEach((activity) => {
    const activityCard = document.createElement("div");
    activityCard.classList.add("activity-card");

    activityCard.innerHTML = `
      <h4>${activity.name}</h4>
      <p>${activity.description}</p>
      <div class="participants">
        <h5>Participants:</h5>
        <ul>
          ${activity.participants
            .map((participant) => `<li>${participant}</li>`)
            .join("")}
        </ul>
      </div>
    `;

    activitiesContainer.appendChild(activityCard);

    // Add option to select dropdown
    const option = document.createElement("option");
    option.value = activity.name;
    option.textContent = activity.name;
    activitySelect.appendChild(option);
  });

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });
});
