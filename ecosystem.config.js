module.exports = {
  apps: [
    {
      name: "assessment-main",
      cwd: "/home/webprod/apps/assessment/assessment", // <-- apne project ka path
      script: "npm",
      args: "start",
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3050
      }
    }
  ]
};
