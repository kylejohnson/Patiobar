NodeJS Pianobar Frontend
========================

A web frontend for pianobar, which is a CLI frontend for Pandora.

Install
-------
```bash
git clone https://github.com/kylejohnson/nodejs-pianobar-frontend.git
cd nodejs-pianobar-frontend
npm install
mkfifo ctl
mkdir -p ~/.config/pianobar
cat << EOF >> ~/.config/pianobar/config
event_command = ${PWD}/eventcmd.sh
fifo = ${PWD}/ctl
EOF
node index.js
```
