<template>
  <div>
    <div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
      <div style="width: 400px">
        <form action="">
          <h3>Login</h3>
          <div class="form-group">
            <label>Username</label>
            <input class="form-control" name="username" placeholder="Username">
            <small class="form-text text-muted">username</small>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <button type="button" class="btn btn-light" onclick="location.href='/sign'">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>