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
      Environment=PORT=3000
      Environment=JWT_SECRET=${jwt_secret}
    
      [Install]
      WantedBy=multi-user.target

  - path: /etc/caddy/Caddyfile
    permissions: '0644'
    content: |
      https://${frontend_subdomain}.${domain} {
          root * /opt/sep-business/frontend
          file_server
      }

      https://${api_subdomain}.${domain} {
          reverse_proxy localhost:3000
      }

runcmd:
  # Allow new SSH connections on port 22
  - iptables -I INPUT 1 -p tcp --dport 22 -m conntrack --ctstate NEW -j ACCEPT
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

  # Clone the source code (default branch: main)
  - git clone --depth 1 https://github.com/sm-techlabs/sep-business /opt/sep-business

  # Replace the frontend config with the correct API URL
  - API_BASE_URL='https://${api_subdomain}.${domain}'
  - >
    sed -i -E
    "s|(API_BASE_URL[[:space:]]*:[[:space:]]*\")[^\"]*(\")|\1$${API_BASE_URL}\2|"
    /opt/sep-business/frontend/js/config.js

  # Set permissions (directories: 755, files: 644)
  - find /opt/sep-business -type d -exec chmod 755 {} \;
  - find /opt/sep-business -type f -exec chmod 644 {} \;
  - chown -R www-data:www-data /opt

  # # Format and mount the block volume
  # - |
  #   for device in /dev/oracleoci/oraclevd*; do
  #     if oci-iscsi-config -c "$device" | grep -q "unknown"; then
  #       mkfs.ext4 "$device"
  #       echo "$device /var/lib/caddy ext4 defaults,noatime,_netdev,nofail 0 2" >> /etc/fstab
  #       break
  #     fi
  #   done
  # - mkdir -p /var/lib/caddy
  # - mount -a

  # Backend setup
  - cd /opt/sep-business/backend
  - npm install --omit=dev

  # Enable and start backend service
  - systemctl daemon-reload
  - systemctl enable --now sep-business-backend

  # Restart Caddy
  - systemctl restart caddy

final_message: "The system is now configured and ready to use."
