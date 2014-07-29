#!/bin/bash

# create variables
while read L; do
	k="`echo "$L" | cut -d '=' -f 1`"
	v="`echo "$L" | cut -d '=' -f 2`"
	export "$k=$v"
done < <(grep -e '^\(title\|artist\|album\|stationName\|songStationName\|pRet\|pRetStr\|wRet\|wRetStr\|songDuration\|songPlayed\|rating\|coverArt\|stationCount\|station[0-9]*\)=' /dev/stdin) # don't overwrite $1...




case "$1" in
	songstart)

		echo "$title -- $artist" > $HOME/.config/pianobar/nowplaying

	url="http://127.0.0.1:3000/?title=${title}&artist=${artist}&coverArt=${coverArt}&album=${album}"
	echo $url >> /tmp/out

	clean=$(echo $url | sed 's/ /%20/g')
	echo $clean>> /tmp/out

	curl -s -XPOST ${clean} >/dev/null 2>&1



#		if [ "$rating" -eq 1 ]
#		then
#			kdialog --title pianobar --passivepopup "'$title' by '$artist' on '$album' - LOVED" 10
#		else
#			kdialog --title pianobar --passivepopup "'$title' by '$artist' on '$album'" 10
#		fi
#		# or whatever you like...
		;;

#	songfinish)
#		;;

#	songlove)
#		;;

#	songshelf)
#		;;

#	songban)
#		;;

#	songbookmark)
#		;;

#	artistbookmark)
#		;;

esac

