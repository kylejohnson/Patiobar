#!/usr/bin/env bash
set -euo pipefail

tls_fingerprint=`openssl s_client -connect tuner.pandora.com:443 < /dev/null 2> /dev/null | openssl x509 -noout -fingerprint | tr -d ':' | cut -d'=' -f2`
event_command=${PWD}/eventcmd.sh
fifo=${PWD}/ctl
configdir=~/.config/pianobar
repo='https://github.com/kylejohnson/Patiobar.git'

# Don't clone if already in the repo
if [ ! -d .git ]; then
	if git clone "${repo}"; then
		cd Patiobar
	else
		echo "Could not clone ${repo}"
		exit 1
	fi
fi

# Don't run npm install if it has already ran
if [ ! -d node_modules ]; then
	echo -n 'Running `npm install`...   '
	if npm install > /dev/null 2>&1; then
		echo "success"
	else
		echo "failure"
	fi
fi

# Don't create fifo if it already exists
if [ ! -p "${fifo}" ]; then
	echo -n "Creating ${fifo} control file...   "
	if mkfifo "${fifo}" > /dev/null 2>&1; then
		echo "success"
	else
		echo "failure"
	fi
fi

echo -n "Creating default ~/.config/pianobar/config file...   "
if mkdir -p "${configdir}"; then
    if ! [ -f "${configdir}/config" ]; then
	if cat << EOF >> "${configdir}/config"; then
user = user@example.com
password = password
#autostart_station = 123456
audio_quality = high
event_command = ${event_command}
fifo = ${fifo}
tls_fingerprint = ${tls_fingerprint}
EOF
            echo "success"
        else
            echo "failure"
        fi
    else
        echo "${configdir}/config already exists"
    fi
fi
