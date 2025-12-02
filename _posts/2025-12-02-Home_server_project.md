---
layout: post
title: "Home server project"
date: 2025-12-02
---

### Planning stage:

- Decide hardware to use: 
  - I had a 4 GB RAM Raspberry Pi 5 which I bought with the intention to set up as a retro gaming console. I do so but wasn't really using much - so I decided to repurpose it as something more practical.
- Needed storage space so ordered a 1TB SATA drive + mounting board.
- Decide software to use: 
  - Quick bit of research found an official Raspberry Pi image for Ubuntu Server - I've used Linux for years so that was perfect.
    - https://ubuntu.com/download/raspberry-pi
  - Some more research suggested Docker as an ideal way to run a few services. (My primary use case was a media centre but if I was going to set up a server I decided I might as well extent its functionality beyond that.)
- Plan Docker containers: 
  - Jellyfin - similar to Plex but fully open source.
  - Nextcloud - another open source application: a self hosted cloud drive.
  - Postgres - database for Nextcloud
  - qBittorrent - my intention was to download directly on the server to avoid copying lots of media from my PC.
  - Glances - monitoring service.

### Initial set up:

- Installing Ubuntu Server on the Pi's SD card was easy - used an application called Raspberry Pi imager. 
  - Can enable SSH + user details during imaging.
  - Post install can either scan network from another machine using nmap to identify its IP or use the server briefly plugged into a monitor. ip addr
- To set a static IP I edited:

$ cat /etc/netplan/50-cloud-init.yaml 

```$
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: no
      addresses:
        - 192.168.0.172/24
      gateway4: 192.168.0.1
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
```

So the IP is 192.168.0.172

- Install Docker:

```#
sudo apt get update
sudo apt get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt get update
```

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

- Set up directories for the various services:

```$
$ ls -la /mnt/storage/
total 48
drwxr-xr-x 9 calum    gpio      4096 Sep 16 15:37 .
drwxr-xr-x 4 root     root      4096 Sep 18 15:23 ..
drwxr-xr-x 3 calum    gpio      4096 Sep  4 18:57 glances
drwxr-xr-x 4 calum    gpio      4096 Sep  4 18:55 jellyfin
drwxr-xr-x 2 calum    gpio     16384 Sep  4 18:36 lost+found
drwxr-xr-x 3 root     root      4096 Sep 14 21:29 media
drwxr-x--- 4 www-data www-data  4096 Sep  4 18:56 nextcloud
drwxr-xr-x 3 calum    gpio      4096 Sep  4 18:56 postgres
drwxr-xr-x 7 calum    calum     4096 Sep 14 22:51 qbittorrent
```

(Show contents of some directories, esp Jellyfin.)

- Create Docker compose file. I did get help from ChatGPT to do this! Mnt points defined in this file are important.

```
$ cat docker-compose.yml 
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    init: true
    container_name: jellyfin
    user: "1000:1000"
    environment:
      - TZ=Europe/London
      - PUID=1000
      - PGID=1000
    volumes:
      - /mnt/storage/jellyfin/config:/config
      - /mnt/storage/jellyfin/media:/media
    ports:
      - "8096:8096"
    restart: unless-stopped

  nextcloud:
    image: nextcloud:latest
    init: true
    container_name: nextcloud
    environment:
      - POSTGRES_DB=nextcloud
      - POSTGRES_USER=nextcloud
      - POSTGRES_PASSWORD=nextcloud
      - POSTGRES_HOST=postgres
      - POSTGRES_PORT=5432
      - TZ=Europe/London
    depends_on:
      - postgres
    volumes:
      - /mnt/storage/nextcloud/config:/var/www/html/config
      - /mnt/storage/nextcloud/data:/var/www/html/data
    ports:
      - "8080:80"
    restart: unless-stopped

  postgres:
    image: postgres:14
    init: true
    container_name: postgres
    environment:
      - POSTGRES_USER=nextcloud
      - POSTGRES_PASSWORD=nextcloud
      - POSTGRES_DB=nextcloud
      - TZ=Europe/London
    volumes:
      - /mnt/storage/postgres/data:/var/lib/postgresql/data
    restart: unless-stopped

  qbittorrent:
    image: linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1003
      - TZ=Europe/London
      - WEBUI_PORT=8080          # Container port (mapped to host 8081)
      - WEBUI_LISTENING_IP=0.0.0.0  # Listen on all IPv4 interfaces
    volumes:
      - /mnt/storage/qbittorrent/config:/config
      - /mnt/storage/media/qbittorrent/completed:/downloads   # Completed downloads
      - /mnt/storage/qbittorrent/incomplete:/downloads/incomplete # Incomplete downloads
    ports:
      - "6881:6881"
      - "6881:6881/udp"
      - "8081:8080"             # Host port : Container port
    restart: unless-stopped

  glances:
    image: nicolargo/glances:latest-full
    container_name: glances
    network_mode: host
    pid: "host"
    environment:
      - GLANCES_OPT=-w
      - GLANCES_EXPORT=influxdb
      - GLANCES_INFLUXDB_HOST=192.168.0.120
      - GLANCES_INFLUXDB_PORT=8086
      - GLANCES_INFLUXDB_DB=glances
      - GLANCES_INFLUXDB_USER=admin
      - GLANCES_INFLUXDB_PASSWORD=admin
    volumes:
      - /mnt/storage/glances/config:/glances
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped
    tty: true
    stdin_open: true
```

- Spin up the server!

docker compose up -d

- Add SSH keys from PC to server for password less connection.

### Further set up:

- Get content into Jellyfin libraries. 
  - Had media on my PC - SCPed files across into the appropriate directories.
  - Longer term strategy is to use the qBittorrent service to download directly to the Pi. Maaaybe, see later.
- Access the webUIs for the various services to eg set up users, configuration. (Show these on screen.) 

### Issues faced:

- No user could log into Jellyfin!! 
  - Troubleshot this and it turned out to a plugin I'd added. Decided I didn't need it after all so resolved the issue by removing said plugin.
- Encountered intermittent access issues with Jellyfin (UI loaded but server connection refused). Mostly related to permissions of the directories being accessed.
- SD card corruption. Twice my card failed on me and I had to reflash it and rebuild the sever. Using Docker made this fairly painless though. 
- Transcoding. Some video file formats / codecs require transcoding when playing in Jellyfin. I was aware of this but hadn't really planned for it. I first noticed when I tried to watch a certain film and saw my CPU use rocket to basically 100%. The video buffered a lot too and was pretty much unwatchable.
  - This created a problem for my intended workflow of downloading content directly to the Piserver: file converting is too heavy a task to run on the Pi.
  - Plan was to scan new videos to check whether they are likely to need transcoding.
    - The script I had to do this proved totally inaccurate and can't be relied upon.
  - Settled on a mostly manual workflow, automating moving files between PC and server in a couple of places. Confirming transcode / direct play status of content currently needs to be done manually.
  - I still have a qBittorrent container in my stack but will most likely remove this if I can't find a better workflow than above.
- Office applications in Nextcloud. "Out of the box", Nextcloud is more like Dropbox than Google Drive but there are a wide range of apps available to add to it. I tried adding one called OnlyOffice but it was a bit of a resource hog - it needs its own Docker container which easily can consume half a GB of RAM whilst idle! As noted I only have 4GB on my Pi so I decided against running this for now.
  - I may reconsider this after deciding against running qBittorrent on the server, although its container was much less resource demanding than OO.
  - I did discover though that Nextcloud does offer editing of Markdown documents as default - like Dropbox Paper which I was a big fan of in a previous workplace.

### Future considerations:

- Backup strategy:
  - Haven't fully planned this but intention is to build a second server (also running Ubuntu Server + Docker) to back up important data from the main server. (No intention to backup media, the storage space required would be too much.)
- Install a reverse proxy service to expose the server to the internet on a custom domain.
  - Need to approach this with a lot of caution as I am not very knowledgeable in network security and obviously there are risks. According to ChatGPT a good solution is to use Cloudflare.
- Monitoring - I Currently have a Glances dashboard which gives a good overview but may look into a more fully featured monitoring + logging service like Grafana.
  - Use an old phone as an always on monitoring screen.
- More storage - 1TB will not last very long - I do have a spare 500GB SSD which I have fitted to help but will need eg an external 4TB HDD sometime. (HDDs are perfectly fine for serving video content.) 
- Get this knowledge into a GitHub repo so to rebuild the server can just clone and spin up:
  - Directory structure
  - Permissions
  - Netplan config
  - Docker compose file
- Fan control - through Glances I can see that the fan is frequently running over 3000rpm. This is rather high when the CPU temp is around 50 C when idle. Need to look into this and set a better fan curve.
