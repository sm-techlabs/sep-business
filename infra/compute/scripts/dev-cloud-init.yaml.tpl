#cloud-config
---
package_update: true
package_upgrade: true

packages:
  - nodejs
  - npm
  - git
  - curl
  - apt-transport-https
  - gnupg2
  - ca-certificates

write_files:
  - path: /etc/systemd/system/sep-business-backend.service
    permissions: '0644'
    content: |
      [Unit]
      Description=SEP Business Backend
      After=network.target

      [Service]
      ExecStart=/usr/bin/node /opt/sep-business/backend/src/app.js
      WorkingDirectory=/opt/sep-business/backend
      Restart=always
      User=www-data
      Group=www-data
      Environment="PORT=3000"
      Environment="JWT_SECRET=${jwt_secret}"
      EnvironmentFile=/etc/environment

      [Install]
      WantedBy=multi-user.target

  - path: /etc/caddy/Caddyfile
    permissions: '0644'
    content: |
      {
          email admin@${domain}
          # Optional but recommended: enable automatic HTTPS and logging
          auto_https on
      }

      https://${frontend_subdomain}.${domain} {
          root * /opt/sep-business/frontend
          try_files {path} /index.html
          file_server
          encode gzip zstd
      }

      https://${api_subdomain}.${domain} {
          reverse_proxy localhost:3000
      }

runcmd:
  # Firewall rules (prefer ufw for readability & persistence)
  - ufw allow 80/tcp
  - ufw allow 443/tcp
  - ufw --force enable

  # Install Caddy (cleaner key installation)
  - apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
  - curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor | tee /usr/share/keyrings/caddy.gpg >/dev/null
  - curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/deb.debian.txt' | tee /etc/apt/sources.list.d/caddy.list
  - apt-get update
  - apt-get install -y caddy

  # Clone the repository
  - git clone --depth 1 https://github.com/sm-techlabs/sep-business /opt/sep-business

  # Environment configuration
  - echo "VITE_API_BASE_URL=https://${api_subdomain}.${domain}" | tee -a /etc/environment
  - export VITE_API_BASE_URL="https://${api_subdomain}.${domain}"

  # Permissions (recursive + consistent ownership)
  - chown -R www-data:www-data /opt/sep-business
  - find /opt/sep-business -type d -exec chmod 755 {} \;
  - find /opt/sep-business -type f -exec chmod 644 {} \;

  # Backend setup
  - cd /opt/sep-business/backend
  - npm ci --omit=dev

  # Enable and start backend service
  - systemctl daemon-reload
  - systemctl enable sep-business-backend
  - systemctl restart sep-business-backend

  # Restart Caddy to apply configuration
  - systemctl restart caddy

final_message: "✅ SEP Business instance is now configured and ready!"
