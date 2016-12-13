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
Either
`curl -s https://github.com/kylejohnson/Patiobar/blob/master/install.sh | bash`
or 
```bash
git clone https://github.com/kylejohnson/Patiobar.git
cd Patiobar
bash install.sh
```

Usage
-----

We assume that you've installed Patiobar to your users home directory!

1. Follow the Install instructions above
2. Start `pianobar`, perhaps in a screen.  e.g. `screen -S pianobar -d -m pianobar`
3. Login, if you don't have pianobar set to do that automatically
4. Select a station, if one isn't already playing or configured to auto-play
5. Start Patiobar: `cd Patiobar && node index.js`
6. Browse to the IP address or hostname of the machine running pianobar /
   Patiobar on port 3000.  e.g. http://192.168.1.2:3000/

Support
-------

If something doesn't work, please open a
[github issue](https://github.com/kylejohnson/Patiobar/issues).
