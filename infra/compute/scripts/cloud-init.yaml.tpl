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

      [Install]
      WantedBy=multi-user.target

  - path: /etc/caddy/Caddyfile
    permissions: '0644'
    content: |
      https://${frontend_subdomain}.${domain} {
          root * /opt/sep-business/frontend/dist
          try_files {path} /index.html
          file_server
          encode gzip zstd
      }

      https://${api_subdomain}.${domain} {
          reverse_proxy localhost:3000
      }

runcmd:
  # Allow new incoming TCP connections on port 80 (HTTP)
  - iptables -I INPUT 5 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT
  # Allow new incoming TCP connections on port 443 (HTTPS)
  - iptables -I INPUT 6 -p tcp --dport 443 -m conntrack --ctstate NEW -j ACCEPT


  # Install Caddy
  - >
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key'
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  - >
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/deb.debian.txt'
    | tee /etc/apt/sources.list.d/caddy-stable.list
  - apt-get update
  - apt-get install -y -o Dpkg::Options::="--force-confold" caddy

  # Clone the repository
  - git clone --depth 1 https://github.com/sm-techlabs/sep-business /opt/sep-business

  # Permissions (recursive + consistent ownership)
  - chown -R www-data:www-data /opt/sep-business
  - find /opt/sep-business -type d -exec chmod 755 {} \;
  - find /opt/sep-business -type f -exec chmod 644 {} \;

  # Frontend setup  
  # Inject environment variables
  - cd /opt/sep-business/frontend
  - sed -i "s#__API_BASE_URL__#https://${api_subdomain}.${domain}#" src/config.js 

  # Build frontend
  - npm ci --omit-dev
  - npm run build

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
