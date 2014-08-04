#!/bin/bash

host="http://127.0.0.1"
port=3000
baseurl="${host}:${port}"


# Here be dragons! #
# (Don't change anything below) #
while read L; do
	k="`echo "$L" | cut -d '=' -f 1`"
	v="`echo "$L" | cut -d '=' -f 2`"
	export "$k=$v"
done < <(grep -e '^\(title\|artist\|album\|stationName\|songStationName\|pRet\|pRetStr\|wRet\|wRetStr\|songDuration\|songPlayed\|rating\|coverArt\|stationCount\|station[0-9]*\)=' /dev/stdin) # don't overwrite $1...




post () {
	url=${baseurl}${1}
	curl -s -XPOST $url >/dev/null 2>&1
}

clean () {
	query=$1
	clean=$(echo $query | sed 's/ /%20/g')
	post $clean
}

stationList () {
	for i in $(eval echo "{1..$stationCount}"); do
		sn=station${i}
		eval sn=\$$sn
		echo "${i}:${sn}" > ${PWD}/stationList
	done
}


case "$1" in
	songstart)
		query="/start/?title=${title}&artist=${artist}&coverArt=${coverArt}&album=${album}"
		clean "$query"

		stationList
		;;

#	songfinish)
#		;;

	songlove)
		query="/lovehate/?rating=${rating}"
		clean $query
		;;

#	songshelf)
#		;;

	songban)
		query="/lovehate/?rating=${rating}"
		clean $query
		;;

#	songbookmark)
#		;;

#	artistbookmark)
#		;;

esac

