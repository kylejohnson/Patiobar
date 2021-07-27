#!/usr/bin/env bash
set -euo pipefail

tls_fingerprint=`openssl s_client -connect tuner.pandora.com:443 < /dev/null 2> /dev/null | openssl x509 -noout -fingerprint | tr -d ':' | cut -d'=' -f2`
repo='https://github.com/kylejohnson/Patiobar.git'
clone_path="$HOME/Patiobar"
event_command=${clone_path}/eventcmd.sh
fifo=${clone_path}/ctl
configdir=~/.config/pianobar

if ! which npm &> /dev/null; then
    echo "npm is not installed!"
    echo "Installing NPM is beyond the scope of this installer as methods vary by distro, OS and preference."
    echo "Note that NPM is usually installed with Node.js."
    echo "https://nodejs.org/en/download/ is a decent place to start."
    exit 1
fi

# Don't clone if already in the repo
if [ ! -d $clone_path ]; then
	echo "Cloning $repo in to $clone_path"
	if git clone "${repo}" "${clone_path}"; then
		cd "${clone_path}"
	else
		echo "Could not clone ${repo}"
		exit 1
	fi
else
	echo "$repo already exists at $clone_path.  Moving on."
fi

# Install node packages
echo -n 'Installing node packages...   '
if npm install > /dev/null 2>&1; then
	echo "success"
else
	echo "failure"
	exit 1
fi

# Don't create fifo if it already exists
if [ ! -p "${fifo}" ]; then
	echo -n "Creating ${fifo} control file...   "
	if mkfifo "${fifo}" > /dev/null 2>&1; then
		echo "success"
	else
		echo "failure"
		exit 1
	fi
else
	echo "Control file already exists.  Moving on."
fi


if mkdir -p "${configdir}"; then
    if ! [ -f "${configdir}/config" ]; then
		echo -n "Creating default ~/.config/pianobar/config file...   "
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
			echo "You will need to edit ${configdir}/config with your Pandora username and password."
        else
            echo "failure"
			exit 1
        fi
    else
        echo "${configdir}/config already exists"
		echo "You will need to manually update that file."
		exit
    fi
else
	echo "Failed to create $configdir."
	exit 1
fi
