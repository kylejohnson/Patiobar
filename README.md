Patiobar
========

![Frontend Screenshot](http://i.imgur.com/XyNO2qTl.png)

A web frontend for pianobar, which is a CLI frontend for Pandora.

Provides a simple way for controlling what is playing on the radio.
I use this to allow guests (and myself) to control the music playing
outside on my patio with their phones.  

This was inspired by [Pidora](https://github.com/jacroe/pidora).
I wasn't happy with the way Pidora does templating so instead of
forking that project, I wanted to start fresh.  I also wanted to
learn NodeJS and socket.io (websockets), so this was a great
project for that.

A great way to control Pandora / Pianobar on a Raspberry Pi

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

Support
-------

If something doesn't work, please open a
[github issue](https://github.com/kylejohnson/Patiobar/issues).
