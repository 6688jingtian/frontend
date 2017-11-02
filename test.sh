a=`node -v`
b="v7"
#echo $b
echo $a
if [[ "$a" > "v7" ]]
then
    echo "> v7"
else
    echo $a;
fi


