import React from "react";

function UpdateProfile() {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateProfile;
